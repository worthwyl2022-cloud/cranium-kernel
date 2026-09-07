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
