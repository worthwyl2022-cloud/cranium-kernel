import assert from 'node:assert/strict';
import path from 'node:path';

const synapseDir = process.env.CRANIUM_SYNAPSE_DIR ?? path.resolve(process.cwd(), '../cranium-synapse');
const contract = await import(path.join(synapseDir, 'src/contract.ts'));
const { isBoundedRiskScore, isSynapseAttestationV1 } = contract;

const base = {
  assessmentId: 'assessment-001',
  correlationId: 'correlation-001',
  modelId: 'model-001',
  policyVersion: 'policy-1',
  riskScore: 0.42,
  disposition: 'CONTINUE' as const,
  intervention: [],
  attestationHash: 'sha256:abc',
};
assert.equal(isBoundedRiskScore(0), true);
assert.equal(isBoundedRiskScore(1), true);
assert.equal(isBoundedRiskScore(-0.01), false);
assert.equal(isBoundedRiskScore(1.01), false);
assert.equal(isBoundedRiskScore(Number.NaN), false);
assert.equal(isSynapseAttestationV1(base), true);
assert.equal(isSynapseAttestationV1({ ...base, riskScore: 2 }), false);
assert.equal(isSynapseAttestationV1({ ...base, intervention: 'NONE' }), false);
assert.equal(isSynapseAttestationV1({ ...base, attestationHash: 42 }), false);
console.log(`Synapse contract smoke test passed using ${synapseDir}.`);
