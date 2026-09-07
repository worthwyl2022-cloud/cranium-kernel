import assert from 'node:assert/strict';
import { GovernedKernelPort, SynapseRuntimeAdapter, createSynapseAttestation, makeTracePayload } from '../src/governance/index';
import { InMemoryReplayGuard } from '../src/kernel/replayGuard';
import { CanonicalEncoder } from '../src/kernel/engine';
import { AuthorityClass, type AuthorityTransitionRequest } from '../src/kernel/types';
import { createInitialKernelState } from '../src/data/initialState';

const envelope = {
  policyPackVersion: 'policy-v1',
  protectedAction: true,
  allowedInterventions: ['NONE', 'STEER', 'RESTRICT', 'ESCALATE', 'ABSTAIN'] as const,
  failSafe: 'BLOCK_PROTECTED' as const,
};

const attestation = createSynapseAttestation({
  assessmentId: 'assessment-001',
  correlationId: 'corr-001',
  modelId: 'open-model-test',
  modelWeightsHash: 'weights-sha256-test',
  inferenceRuntime: 'runtime-test-v1',
  policyPackVersion: 'policy-v1',
  controllerConfigHash: 'controller-sha256-test',
  riskClass: 'LOW',
  riskScore: 0.04,
  confidence: 0.98,
  intervention: 'NONE',
  disposition: 'ALLOW',
  tracePayload: makeTracePayload({ action: 'mock_read', tool: 'mock-records' }),
});

const request: AuthorityTransitionRequest = {
  requestId: 'request-001',
  idempotencyKey: 'idem-001',
  subjectId: 'atom-hypo-004',
  requestedAuthority: { authorityClass: AuthorityClass.WORKING, weight: 0.45 },
  evidence: [],
  justification: 'Controlled promotion after bounded model assessment.',
  requesterId: 'CRANIUM_SYNAPSE',
  timestamp: 1757200000000,
  targetAuthorityVersion: 104,
  synapseAttestation: attestation,
};

const port = new GovernedKernelPort(new InMemoryReplayGuard());
const adapter = new SynapseRuntimeAdapter(port);
const state = createInitialKernelState();
const context = {
  adapterId: 'cranium-synapse-v1',
  requestedBy: 'agent-test',
  purpose: 'integration-check',
  correlationId: 'corr-001',
};

const admission = adapter.admit(request, state, context, envelope);
assert.equal(admission.accepted, true, 'valid Synapse evidence should reach Cranium Core');
assert.ok(admission.governance, 'accepted admission must contain canonical governance evaluation');
assert.equal(admission.governance.evaluation.transition.requestHash.hexDigest, CanonicalEncoder.hashRequest(request).hexDigest);

const changedAssessment = { ...attestation, riskScore: 0.05 };
const changedRequest = { ...request, synapseAttestation: changedAssessment };
assert.notEqual(
  CanonicalEncoder.hashRequest(request).hexDigest,
  CanonicalEncoder.hashRequest(changedRequest).hexDigest,
  'changing Synapse evidence must change the canonical request hash'
);

const mismatch = adapter.admit(
  request,
  state,
  context,
  { ...envelope, policyPackVersion: 'policy-v2' }
);
assert.equal(mismatch.accepted, false, 'policy mismatch must be rejected before authority evaluation');
assert.match(mismatch.reason, /POLICY_VERSION_MISMATCH/);

const blockedAttestation = createSynapseAttestation({
  ...{
    assessmentId: 'assessment-002',
    correlationId: 'corr-001',
    modelId: 'open-model-test',
    modelWeightsHash: 'weights-sha256-test',
    inferenceRuntime: 'runtime-test-v1',
    policyPackVersion: 'policy-v1',
    controllerConfigHash: 'controller-sha256-test',
    riskClass: 'CRITICAL',
    riskScore: 0.99,
    confidence: 0.99,
    intervention: 'ABSTAIN',
    disposition: 'BLOCK',
    tracePayload: 'fail-safe-test',
  },
});
const blocked = adapter.admit(
  { ...request, synapseAttestation: blockedAttestation },
  state,
  context,
  envelope
);
assert.equal(blocked.accepted, false, 'Synapse fail-safe block must prevent protected admission');
assert.match(blocked.reason, /SYNAPSE_FAIL_SAFE_BLOCK/);

console.log('Cranium Synapse integration check passed: admission, hash binding, mismatch rejection, and fail-safe block.');


const transactionGate = new (await import('../src/governance/SynapseCoreTransaction')).CraniumCoreTransactionGate();
const requestPayload = { userId: 'user-42', task: 'read customer report', sessionId: 'session-77' };
const authorityEnvelope = {
  principalId: 'agent-support-01',
  authorityVersion: 14,
  allowedTools: ['read_customer_record'] as const,
  maximumRiskTier: 'LOW' as const,
  requiresHumanApproval: [] as const,
};
const synapseEnvelope = transactionGate.issueSynapseEnvelope(
  requestPayload,
  authorityEnvelope,
  {
    policyVersion: 'policy-v1',
    modelIdentityHash: 'model-sha256',
    observationProfileHash: 'profile-sha256',
    riskTier: 'LOW',
    monitoredLayers: [12, 8],
    activeRiskAxes: ['tool-poisoning'],
    interventionBudget: { maxNormDelta: 0.1, maxInterventions: 2, allowedLayers: [8, 12] },
    issuedAt: '2026-09-07T10:00:00.000Z',
    expiresAt: '2026-09-07T11:00:00.000Z',
    nonce: 'nonce-001',
  }
);
const action = {
  actionId: 'action-001',
  tool: 'read_customer_record' as const,
  args: { customerId: 'customer-7' },
  requestedAt: '2026-09-07T10:05:00.000Z',
};
const requestHash = (await import('../src/governance/SynapseCoreTransaction')).hashTransactionValue(requestPayload);
const transactionAttestation = {
  schemaVersion: '1.0' as const,
  attestationId: 'attestation-001',
  envelopeId: synapseEnvelope.envelopeId,
  coreEnvelopeHash: synapseEnvelope.coreEnvelopeHash,
  requestHash,
  policyVersion: 'policy-v1',
  authorityVersion: 14,
  modelIdentityHash: 'model-sha256',
  observationProfileHash: 'profile-sha256',
  monitoredLayers: [8, 12],
  activeRiskAxes: ['tool-poisoning'],
  maxRiskScore: 0.04,
  disposition: 'CONTINUE' as const,
  interventionApplied: false,
  interventionCount: 0,
  traceCommitment: 'trace-sha256',
  generatedAt: '2026-09-07T10:05:01.000Z',
  expiresAt: '2026-09-07T11:00:00.000Z',
  attestationHash: 'attestation-sha256',
};
const receipt = transactionGate.authorize(
  requestPayload,
  action,
  authorityEnvelope,
  synapseEnvelope,
  transactionAttestation,
  '2026-09-07T10:05:02.000Z'
);
assert.equal(receipt.decision, 'GRANTED', 'valid Synapse/Core transaction should be granted');
const replayReceipt = transactionGate.authorize(
  requestPayload,
  action,
  authorityEnvelope,
  synapseEnvelope,
  transactionAttestation,
  '2026-09-07T10:05:03.000Z',
  'receipt-replay'
);
assert.equal(replayReceipt.decision, 'DENIED', 'replayed action must be denied');
assert.equal(replayReceipt.decisionReason, 'DUPLICATE_ACTION_REPLAY');
assert.equal(replayReceipt.previousReceiptHash, receipt.receiptHash, 'receipts must form a hash chain');

console.log('Cranium Synapse/Core transaction check passed: envelope binding, authorization, replay denial, and receipt chaining.');


let executedCount = 0;
const executed = transactionGate.execute(
  receipt,
  action,
  authorityEnvelope,
  '2026-09-07T10:06:00.000Z',
  () => { executedCount += 1; }
);
assert.equal(executed.executed, true, 'granted receipt should execute the exact action');
assert.equal(executedCount, 1);
const consumedAgain = transactionGate.execute(
  receipt,
  action,
  authorityEnvelope,
  '2026-09-07T10:06:01.000Z',
  () => { executedCount += 1; }
);
assert.equal(consumedAgain.reason, 'RECEIPT_ALREADY_CONSUMED');
assert.equal(executedCount, 1, 'consumed receipts must not execute twice');
const tamperedAction = { ...action, args: { customerId: 'customer-8' } };
const tampered = transactionGate.execute(
  replayReceipt,
  tamperedAction,
  authorityEnvelope,
  '2026-09-07T10:06:02.000Z',
  () => { executedCount += 1; }
);
assert.equal(tampered.reason, 'RECEIPT_NOT_GRANTED', 'denied receipts must never reach the handler');

const tamperSourceAction = { ...action, actionId: 'action-002', args: { customerId: 'customer-9' } };
const tamperReceipt = transactionGate.authorize(
  requestPayload,
  tamperSourceAction,
  authorityEnvelope,
  synapseEnvelope,
  transactionAttestation,
  '2026-09-07T10:05:04.000Z',
  'receipt-tamper-source'
);
const tamperResult = transactionGate.execute(
  tamperReceipt,
  { ...tamperSourceAction, args: { customerId: 'customer-10' } },
  authorityEnvelope,
  '2026-09-07T10:06:03.000Z',
  () => { executedCount += 1; }
);
assert.equal(tamperResult.reason, 'ACTION_HASH_MISMATCH');
assert.equal(executedCount, 1, 'tampered action must not execute');


const signatures = await import('../src/governance/Signatures');
const keyPair = await signatures.generateEd25519KeyPair();
const publicKey = await signatures.exportPublicKey(keyPair.publicKey);
const keyRegistry = new signatures.TrustedKeyRegistry();
keyRegistry.register({
  keyId: 'core-key-001',
  subject: 'CORE',
  publicKey,
  validFrom: '2026-09-07T00:00:00.000Z',
});
const signedEnvelope = await signatures.signPayload('core-envelope-payload', 'core-key-001', 'CORE', keyPair.privateKey);
const validSignature = await keyRegistry.verify(signedEnvelope, '2026-09-07T10:00:00.000Z');
assert.equal(validSignature.valid, true, 'valid Ed25519 Core signature should verify');
const tamperedSignature = await keyRegistry.verify({ ...signedEnvelope, payload: 'tampered-payload' }, '2026-09-07T10:00:00.000Z');
assert.equal(tamperedSignature.reason, 'SIGNATURE_INVALID');
const wrongRoleSignature = await keyRegistry.verify({ ...signedEnvelope, subject: 'SYNAPSE_RUNTIME' }, '2026-09-07T10:00:00.000Z');
assert.equal(wrongRoleSignature.reason, 'KEY_ROLE_MISMATCH');

console.log('Cranium signature check passed: valid Ed25519 verification, tamper rejection, and role separation.');
