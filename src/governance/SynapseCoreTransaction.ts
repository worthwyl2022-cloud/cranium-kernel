import { sha256 } from '../kernel/sha256';

export type TransactionJson = null | boolean | number | string | TransactionJson[] | { [key: string]: TransactionJson };
export type TransactionRiskTier = 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
export type SynapseDisposition = 'CONTINUE' | 'ELEVATED_RISK' | 'RESTRICT_TOOLS' | 'ABSTAIN' | 'ESCALATE' | 'INTEGRITY_FAILURE';
export type CoreDecision = 'GRANTED' | 'DENIED' | 'ESCALATED' | 'ISOLATED';
export type GovernedTool = 'read_customer_record' | 'send_external_email' | 'transfer_mock_funds' | 'delete_mock_file' | 'deploy_mock_service' | 'change_access_role';

export interface ProposedAction {
  actionId: string;
  tool: GovernedTool;
  args: TransactionJson;
  requestedAt: string;
}

export interface CoreAuthorityEnvelope {
  principalId: string;
  authorityVersion: number;
  allowedTools: GovernedTool[];
  maximumRiskTier: TransactionRiskTier;
  requiresHumanApproval: GovernedTool[];
}

export interface SynapseEnvelopeConfig {
  policyVersion: string;
  modelIdentityHash: string;
  observationProfileHash: string;
  riskTier: TransactionRiskTier;
  monitoredLayers: number[];
  activeRiskAxes: string[];
  interventionBudget: { maxNormDelta: number; maxInterventions: number; allowedLayers: number[] };
  issuedAt: string;
  expiresAt: string;
  nonce: string;
}

export interface CoreIssuedSynapseEnvelope extends SynapseEnvelopeConfig {
  schemaVersion: '1.0';
  envelopeId: string;
  requestHash: string;
  authorityEnvelopeHash: string;
  authorityVersion: number;
  coreEnvelopeHash: string;
}

export interface SynapseTransactionAttestation {
  schemaVersion: '1.0';
  attestationId: string;
  envelopeId: string;
  coreEnvelopeHash: string;
  requestHash: string;
  policyVersion: string;
  authorityVersion: number;
  modelIdentityHash: string;
  observationProfileHash: string;
  monitoredLayers: number[];
  activeRiskAxes: string[];
  maxRiskScore: number;
  disposition: SynapseDisposition;
  interventionApplied: boolean;
  interventionCount: number;
  interventionCommitment?: string;
  traceCommitment: string;
  generatedAt: string;
  expiresAt: string;
  attestationHash: string;
}

export interface GovernanceReceipt {
  receiptId: string;
  previousReceiptHash: string | null;
  requestHash: string;
  actionHash: string;
  policyVersion: string;
  authorityVersion: number;
  synapseAttestationHash: string;
  decision: CoreDecision;
  decisionReason: string;
  committedAt: string;
  receiptHash: string;
}

function canonicalize(value: TransactionJson): string {
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalize).join(',')}]`;
  return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonicalize(value[key])}`).join(',')}}`;
}

function hash(value: TransactionJson | string | object): string {
  return sha256(typeof value === 'string' ? value : canonicalize(value as TransactionJson));
}

export class CraniumCoreTransactionGate {
  private readonly committedActionHashes = new Set<string>();
  private readonly receiptChain: GovernanceReceipt[] = [];

  issueSynapseEnvelope(
    request: TransactionJson,
    authority: CoreAuthorityEnvelope,
    config: SynapseEnvelopeConfig,
    envelopeId = 'env-001'
  ): CoreIssuedSynapseEnvelope {
    const unsigned = {
      schemaVersion: '1.0' as const,
      envelopeId,
      requestHash: hash(request),
      policyVersion: config.policyVersion,
      authorityEnvelopeHash: hash(authority),
      authorityVersion: authority.authorityVersion,
      modelIdentityHash: config.modelIdentityHash,
      observationProfileHash: config.observationProfileHash,
      riskTier: config.riskTier,
      monitoredLayers: [...config.monitoredLayers].sort((a, b) => a - b),
      activeRiskAxes: [...config.activeRiskAxes].sort(),
      interventionBudget: config.interventionBudget,
      issuedAt: config.issuedAt,
      expiresAt: config.expiresAt,
      nonce: config.nonce,
    };
    return { ...unsigned, coreEnvelopeHash: hash(unsigned) };
  }

  authorize(
    request: TransactionJson,
    action: ProposedAction,
    authority: CoreAuthorityEnvelope,
    envelope: CoreIssuedSynapseEnvelope,
    attestation: SynapseTransactionAttestation,
    committedAt: string,
    receiptId = `receipt-${this.receiptChain.length + 1}`
  ): GovernanceReceipt {
    const requestHash = hash(request);
    const actionHash = hash(action);
    const decision = this.evaluate(requestHash, action, actionHash, authority, envelope, attestation, committedAt);
    const unsigned = {
      receiptId,
      previousReceiptHash: this.receiptChain.at(-1)?.receiptHash ?? null,
      requestHash,
      actionHash,
      policyVersion: envelope.policyVersion,
      authorityVersion: authority.authorityVersion,
      synapseAttestationHash: attestation.attestationHash,
      decision: decision.decision,
      decisionReason: decision.reason,
      committedAt,
    };
    const receipt = { ...unsigned, receiptHash: hash(unsigned) };
    this.receiptChain.push(receipt);
    if (decision.decision === 'GRANTED') this.committedActionHashes.add(actionHash);
    return receipt;
  }

  receipts(): readonly GovernanceReceipt[] { return this.receiptChain; }

  private evaluate(
    requestHash: string,
    action: ProposedAction,
    actionHash: string,
    authority: CoreAuthorityEnvelope,
    envelope: CoreIssuedSynapseEnvelope,
    attestation: SynapseTransactionAttestation,
    now: string
  ): { decision: CoreDecision; reason: string } {
    if (envelope.expiresAt <= now) return { decision: 'DENIED', reason: 'CORE_ENVELOPE_EXPIRED' };
    if (attestation.expiresAt <= now) return { decision: 'ISOLATED', reason: 'SYNAPSE_ATTESTATION_EXPIRED' };
    if (envelope.requestHash !== requestHash) return { decision: 'ISOLATED', reason: 'REQUEST_HASH_MISMATCH' };
    if (attestation.requestHash !== requestHash) return { decision: 'ISOLATED', reason: 'ATTESTATION_REQUEST_MISMATCH' };
    if (attestation.coreEnvelopeHash !== envelope.coreEnvelopeHash) return { decision: 'ISOLATED', reason: 'ATTESTATION_ENVELOPE_MISMATCH' };
    if (attestation.authorityVersion !== authority.authorityVersion) return { decision: 'DENIED', reason: 'STALE_AUTHORITY_VERSION' };
    if (this.committedActionHashes.has(actionHash)) return { decision: 'DENIED', reason: 'DUPLICATE_ACTION_REPLAY' };
    if (!authority.allowedTools.includes(action.tool)) return { decision: 'DENIED', reason: 'TOOL_OUTSIDE_AUTHORITY_SCOPE' };
    if (attestation.disposition === 'INTEGRITY_FAILURE') return { decision: 'ISOLATED', reason: 'SYNAPSE_INTEGRITY_FAILURE' };
    if (attestation.disposition === 'ABSTAIN') return { decision: 'DENIED', reason: 'SYNAPSE_ABSTENTION' };
    if (attestation.disposition === 'ESCALATE' || authority.requiresHumanApproval.includes(action.tool)) return { decision: 'ESCALATED', reason: 'HUMAN_APPROVAL_REQUIRED' };
    if (attestation.disposition === 'RESTRICT_TOOLS') return { decision: 'DENIED', reason: 'SYNAPSE_RESTRICTED_ACTION_ENVELOPE' };
    return { decision: 'GRANTED', reason: 'AUTHORIZED_WITHIN_SCOPE' };
  }
}

export function hashTransactionValue(value: TransactionJson | string | object): string { return hash(value); }
