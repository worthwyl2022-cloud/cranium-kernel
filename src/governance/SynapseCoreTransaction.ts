import { sha256 } from '../kernel/sha256';
import type { TrustedKeyRegistry, SignedPayload } from './Signatures';

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
  signature: SignedPayload;  // Ed25519 over recomputeAttestationHash(), signed by SYNAPSE_RUNTIME
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

export interface ActionExecutionResult {
  executed: boolean;
  reason: string;
  receipt: GovernanceReceipt;
}

function canonicalize(value: TransactionJson): string {
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalize).join(',')}]`;
  return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonicalize(value[key])}`).join(',')}}`;
}

function hash(value: TransactionJson | string | object): string {
  return sha256(typeof value === 'string' ? value : canonicalize(value as TransactionJson));
}

/**
 * Recompute the attestation hash from its contents, excluding the hash
 * and signature fields themselves. If the recomputed hash doesn't match
 * attestationHash, the attestation has been tampered with.
 */
function recomputeAttestationHash(a: SynapseTransactionAttestation): string {
  const { attestationHash, signature, ...rest } = a;
  return hash(rest as unknown as TransactionJson);
}

export class CraniumCoreTransactionGate {
  private readonly committedActionHashes = new Set<string>();
  private readonly receiptChain: GovernanceReceipt[] = [];
  private readonly consumedReceiptIds = new Set<string>();

  constructor(private readonly keys: TrustedKeyRegistry) {}  // inject registry

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

  async authorize(                                            // now async
    request: TransactionJson,
    action: ProposedAction,
    authority: CoreAuthorityEnvelope,
    envelope: CoreIssuedSynapseEnvelope,
    attestation: SynapseTransactionAttestation,
    committedAt: string,
    receiptId = `receipt-${this.receiptChain.length + 1}`
  ): Promise<GovernanceReceipt> {
    const requestHash = hash(request);
    const actionHash = hash(action);
    const decision = await this.evaluate(requestHash, action, actionHash, authority, envelope, attestation, committedAt);
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

  execute(
    receipt: GovernanceReceipt,
    action: ProposedAction,
    authority: CoreAuthorityEnvelope,
    now: string,
    handler: (action: ProposedAction) => void
  ): ActionExecutionResult {
    if (!this.receiptChain.some((entry) => entry.receiptId === receipt.receiptId && entry.receiptHash === receipt.receiptHash)) {
      return { executed: false, reason: 'RECEIPT_NOT_IN_CHAIN', receipt };
    }
    if (receipt.decision !== 'GRANTED') {
      return { executed: false, reason: 'RECEIPT_NOT_GRANTED', receipt };
    }
    if (this.consumedReceiptIds.has(receipt.receiptId)) {
      return { executed: false, reason: 'RECEIPT_ALREADY_CONSUMED', receipt };
    }
    if (receipt.actionHash !== hash(action)) {
      return { executed: false, reason: 'ACTION_HASH_MISMATCH', receipt };
    }
    if (!authority.allowedTools.includes(action.tool)) {
      return { executed: false, reason: 'TOOL_OUTSIDE_AUTHORITY_SCOPE', receipt };
    }
    if (receipt.committedAt > now) {
      return { executed: false, reason: 'RECEIPT_FROM_THE_FUTURE', receipt };
    }
    handler(action);
    this.consumedReceiptIds.add(receipt.receiptId);
    return { executed: true, reason: 'ACTION_EXECUTED_ONCE', receipt };
  }

  private async evaluate(                                     // now async
    requestHash: string,
    action: ProposedAction,
    actionHash: string,
    authority: CoreAuthorityEnvelope,
    envelope: CoreIssuedSynapseEnvelope,
    attestation: SynapseTransactionAttestation,
    now: string
  ): Promise<{ decision: CoreDecision; reason: string }> {
    // --- integrity: contents must match their own hash ---
    if (attestation.attestationHash !== recomputeAttestationHash(attestation)) {
      return { decision: 'ISOLATED', reason: 'ATTESTATION_HASH_MISMATCH' };
    }

    // --- authenticity: signature must verify, be from Synapse, and cover THIS hash ---
    const sig = await this.keys.verify(attestation.signature, now);
    if (!sig.valid)                              return { decision: 'ISOLATED', reason: 'ATTESTATION_SIGNATURE_INVALID' };
    if (sig.subject !== 'SYNAPSE_RUNTIME')       return { decision: 'ISOLATED', reason: 'ATTESTATION_WRONG_SIGNER' };
    if (sig.payload !== attestation.attestationHash) return { decision: 'ISOLATED', reason: 'ATTESTATION_SIGNATURE_PAYLOAD_MISMATCH' };

    // --- existing checks (unchanged) ---
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
