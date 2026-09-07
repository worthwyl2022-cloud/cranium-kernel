import { sha256 } from '../kernel/sha256';
import {
  SynapseAttestation,
  AuthorityTransitionRequest,
  KernelState,
} from '../kernel/types';
import {
  GovernanceContext,
  GovernanceEvaluation,
  GovernedKernelPort,
} from './GovernanceBoundary';

export interface SynapsePolicyEnvelope {
  policyPackVersion: string;
  protectedAction: boolean;
  allowedInterventions: SynapseAttestation['intervention'][];
  failSafe: 'ALLOW_SAFE_ONLY' | 'BLOCK_PROTECTED';
}

export interface SynapseAssessmentInput {
  assessmentId: string;
  correlationId: string;
  modelId: string;
  modelWeightsHash: string;
  inferenceRuntime: string;
  policyPackVersion: string;
  controllerConfigHash: string;
  riskClass: SynapseAttestation['riskClass'];
  riskScore: number;
  confidence: number;
  intervention: SynapseAttestation['intervention'];
  disposition: SynapseAttestation['disposition'];
  tracePayload: string;
}

export type SynapseAdmission =
  | {
      accepted: true;
      attestation?: SynapseAttestation;
      governance: GovernanceEvaluation;
    }
  | {
      accepted: false;
      reason: string;
      attestation?: SynapseAttestation;
      governance?: GovernanceEvaluation;
    };

export function createSynapseAttestation(input: SynapseAssessmentInput): SynapseAttestation {
  const traceCommitment = sha256(
    [
      input.assessmentId,
      input.correlationId,
      input.modelId,
      input.modelWeightsHash,
      input.inferenceRuntime,
      input.policyPackVersion,
      input.controllerConfigHash,
      input.riskClass,
      input.riskScore.toFixed(6),
      input.confidence.toFixed(6),
      input.intervention,
      input.disposition,
      input.tracePayload,
    ].join('::')
  );

  return {
    assessmentId: input.assessmentId,
    correlationId: input.correlationId,
    modelId: input.modelId,
    modelWeightsHash: input.modelWeightsHash,
    inferenceRuntime: input.inferenceRuntime,
    policyPackVersion: input.policyPackVersion,
    controllerConfigHash: input.controllerConfigHash,
    riskClass: input.riskClass,
    riskScore: input.riskScore,
    confidence: input.confidence,
    intervention: input.intervention,
    traceCommitment,
    disposition: input.disposition,
  };
}

export function validateSynapseAttestation(
  attestation: SynapseAttestation,
  envelope: SynapsePolicyEnvelope
): string[] {
  const violations: string[] = [];
  if (!attestation.assessmentId || !attestation.correlationId) {
    violations.push('MISSING_ASSESSMENT_IDENTITY');
  }
  if (!attestation.modelId || !attestation.modelWeightsHash || !attestation.inferenceRuntime) {
    violations.push('MISSING_MODEL_PROVENANCE');
  }
  if (attestation.policyPackVersion !== envelope.policyPackVersion) {
    violations.push('POLICY_VERSION_MISMATCH');
  }
  if (!Number.isFinite(attestation.riskScore) || attestation.riskScore < 0 || attestation.riskScore > 1) {
    violations.push('INVALID_RISK_SCORE');
  }
  if (!Number.isFinite(attestation.confidence) || attestation.confidence < 0 || attestation.confidence > 1) {
    violations.push('INVALID_CONFIDENCE');
  }
  if (!envelope.allowedInterventions.includes(attestation.intervention)) {
    violations.push('INTERVENTION_NOT_ALLOWED');
  }
  if (envelope.protectedAction && attestation.disposition === 'ALLOW' && attestation.riskClass !== 'LOW') {
    violations.push('PROTECTED_ACTION_REQUIRES_LOW_RISK');
  }
  if (envelope.protectedAction && attestation.disposition === 'BLOCK') {
    violations.push('SYNAPSE_FAIL_SAFE_BLOCK');
  }
  if (!attestation.traceCommitment) {
    violations.push('MISSING_TRACE_COMMITMENT');
  }
  return violations;
}

/** Cranium Synapse bridge; it validates evidence but never grants authority. */
export class SynapseRuntimeAdapter {
  constructor(private readonly kernelPort: GovernedKernelPort) {}

  admit(
    request: AuthorityTransitionRequest,
    state: KernelState,
    context: GovernanceContext,
    envelope: SynapsePolicyEnvelope
  ): SynapseAdmission {
    const attestation = request.synapseAttestation;
    if (!attestation && envelope.protectedAction) {
      return { accepted: false, reason: 'Protected action requires a Cranium Synapse attestation.' };
    }
    if (!attestation) {
      const governance = this.kernelPort.evaluate(request, state, context);
      return governance.accepted
        ? { accepted: true, governance }
        : { accepted: false, reason: governance.rejectionReason ?? 'Cranium rejected request.', governance };
    }

    const violations = validateSynapseAttestation(attestation, envelope);
    if (violations.length > 0) {
      return {
        accepted: false,
        reason: `Cranium Synapse admission rejected: ${violations.join(', ')}`,
        attestation,
      };
    }

    const governance = this.kernelPort.evaluate(request, state, context);
    return governance.accepted
      ? { accepted: true, attestation, governance }
      : { accepted: false, reason: governance.rejectionReason ?? 'Cranium rejected request.', attestation, governance };
  }
}

export function makeTracePayload(fields: Record<string, string>): string {
  return Object.keys(fields)
    .sort()
    .map((key) => `${key}=${fields[key]}`)
    .join('|');
}

export function isProtectedDisposition(attestation: SynapseAttestation): boolean {
  return attestation.disposition === 'RESTRICT' || attestation.disposition === 'ESCALATE' || attestation.disposition === 'BLOCK';
}
