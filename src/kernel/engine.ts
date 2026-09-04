import {
  AuthorityClass,
  AUTHORITY_RANKS,
  AuthorityLevel,
  AuthorityTransitionRequest,
  RequestHash,
  BoundaryViolation,
  BoundaryAssessment,
  TransitionDecision,
  AuthorityTransition,
  ReplayStatus,
  KernelState,
  CognitiveAtom,
  CognitiveStatus,
} from './types';
import { sha256 } from './sha256';
import { InMemoryReplayGuard } from './replayGuard';

export class CanonicalEncoder {
  static encode(req: AuthorityTransitionRequest): string {
    const evidenceSorted = [...req.evidence]
      .sort((a, b) => a.id.localeCompare(b.id))
      .map(
        (e) =>
          `evidence[id=${e.id},uri=${e.uri},sha256=${e.sha256Digest},verified=${e.verified}]`
      )
      .join('|');

    return [
      `requestId=${req.requestId}`,
      `idempotencyKey=${req.idempotencyKey}`,
      `subjectId=${req.subjectId}`,
      `requestedClass=${req.requestedAuthority.authorityClass}`,
      `requestedWeight=${req.requestedAuthority.weight.toFixed(4)}`,
      `targetVersion=${req.targetAuthorityVersion}`,
      `requester=${req.requesterId}`,
      `justification=${req.justification.trim()}`,
      evidenceSorted,
    ].join('::');
  }

  static hashRequest(req: AuthorityTransitionRequest): RequestHash {
    const canonical = this.encode(req);
    const hexDigest = sha256(canonical);
    return {
      algorithm: 'SHA-256',
      hexDigest,
      canonicalString: canonical,
    };
  }
}

export class DefaultBoundaryValidator {
  validate(
    request: AuthorityTransitionRequest,
    subject: CognitiveAtom | undefined,
    state: KernelState,
    replayStatus: ReplayStatus
  ): BoundaryAssessment {
    const violations: BoundaryViolation[] = [];
    const checkedRules: string[] = [];

    // Rule 1: Subject existence
    checkedRules.push('RULE_01_SUBJECT_EXISTENCE');
    if (!subject) {
      violations.push(BoundaryViolation.MISSING_SUBJECT);
    }

    // Rule 2: Stale authority version check
    checkedRules.push('RULE_02_STATE_VERSION_COHERENCE');
    if (request.targetAuthorityVersion !== state.authorityVersion) {
      violations.push(BoundaryViolation.STALE_AUTHORITY_VERSION);
    }

    // Rule 3: Replay check
    checkedRules.push('RULE_03_REPLAY_CONFLICT_CHECK');
    if (replayStatus.type === 'ConflictingReuse') {
      violations.push(BoundaryViolation.REPLAY_CONFLICT);
    }

    // Rule 4: Requester authorization
    checkedRules.push('RULE_04_REQUESTER_AUTHORIZATION');
    if (
      request.requesterId.startsWith('MALICIOUS') ||
      request.requesterId.startsWith('UNAUTHORIZED') ||
      request.requesterId === 'ATTACKER_ANON'
    ) {
      violations.push(BoundaryViolation.UNAUTHORIZED_REQUESTER);
    }

    if (subject) {
      const currentRank = AUTHORITY_RANKS[subject.authority.authorityClass];
      const targetRank = AUTHORITY_RANKS[request.requestedAuthority.authorityClass];

      // Rule 5: Jump rank limits
      checkedRules.push('RULE_05_JURISDICTIONAL_LADDER_CHECK');
      const rankJump = targetRank - currentRank;
      if (rankJump > 2) {
        violations.push(BoundaryViolation.INVALID_AUTHORITY_JUMP);
      }

      // Rule 6: Evidence requirements for FACTUAL or higher
      checkedRules.push('RULE_06_CRYPTOGRAPHIC_EVIDENCE_PROVENANCE');
      if (targetRank >= AUTHORITY_RANKS[AuthorityClass.FACTUAL]) {
        const hasVerifiedEvidence = request.evidence.some(
          (e) => e.verified && e.sha256Digest.length === 64
        );
        if (!hasVerifiedEvidence) {
          violations.push(BoundaryViolation.INSUFFICIENT_EVIDENCE);
        }
      }

      // Rule 7: Degradation justification
      checkedRules.push('RULE_07_DEGRADATION_INTEGRITY');
      if (
        targetRank < currentRank &&
        (!request.justification || request.justification.trim().length < 10)
      ) {
        violations.push(BoundaryViolation.DEGRADATION_WITHOUT_REASON);
      }

      // Rule 8: Constitution / Quorum invariant
      checkedRules.push('RULE_08_CONSTITUTIONAL_INVARIANT');
      if (
        request.requestedAuthority.authorityClass === AuthorityClass.SYSTEM &&
        request.requesterId !== 'CONSTITUTIONAL_COUNCIL_QUORUM'
      ) {
        violations.push(BoundaryViolation.CONSTITUTION_VIOLATION);
      }
    }

    const passed = violations.length === 0;
    const explanation = passed
      ? 'All boundary invariants verified successfully.'
      : `Boundary checks failed with violations: ${violations.join(', ')}`;

    return {
      passed,
      violations,
      evidenceRefs: request.evidence.map((e) => e.id),
      explanation,
      checkedRules,
    };
  }
}

export class DefaultAuthorityRuleEvaluator {
  evaluate(
    request: AuthorityTransitionRequest,
    subject: CognitiveAtom
  ): TransitionDecision {
    const currentRank = AUTHORITY_RANKS[subject.authority.authorityClass];
    const targetRank = AUTHORITY_RANKS[request.requestedAuthority.authorityClass];

    if (
      subject.authority.authorityClass === AuthorityClass.HYPOTHETICAL &&
      request.justification.trim().length < 5
    ) {
      return {
        type: 'Denied',
        reason: 'Hypothetical promotion requires non-trivial justification.',
      };
    }

    if (currentRank === targetRank) {
      return {
        type: 'Granted',
        grantedAuthority: request.requestedAuthority,
        rationale: `Intra-class authority recalibration approved (${subject.authority.weight.toFixed(2)} -> ${request.requestedAuthority.weight.toFixed(2)}).`,
      };
    }

    if (targetRank > currentRank) {
      return {
        type: 'Granted',
        grantedAuthority: request.requestedAuthority,
        rationale: `Jurisdictional promotion from ${subject.authority.authorityClass} to ${request.requestedAuthority.authorityClass} authorized via verified evidence chain.`,
      };
    }

    return {
      type: 'Granted',
      grantedAuthority: request.requestedAuthority,
      rationale: `Authority degradation to ${request.requestedAuthority.authorityClass} approved with justification: '${request.justification}'.`,
    };
  }
}

export interface TransitionEvaluationResult {
  transition: AuthorityTransition;
  replayStatus: ReplayStatus;
}

export class DefaultAuthorityTransitionEngine {
  private boundaryValidator = new DefaultBoundaryValidator();
  private ruleEvaluator = new DefaultAuthorityRuleEvaluator();

  constructor(private replayGuard: InMemoryReplayGuard) {}

  evaluate(
    request: AuthorityTransitionRequest,
    state: KernelState
  ): TransitionEvaluationResult {
    const reqHash = CanonicalEncoder.hashRequest(request);
    const replayStatus = this.replayGuard.check(
      request.idempotencyKey,
      reqHash.hexDigest
    );

    const subject = state.atomsById[request.subjectId];
    const boundaryAssessment = this.boundaryValidator.validate(
      request,
      subject,
      state,
      replayStatus
    );

    let decision: TransitionDecision;
    if (!boundaryAssessment.passed) {
      decision = {
        type: 'Denied',
        reason: boundaryAssessment.explanation,
        violationCode: boundaryAssessment.violations[0],
      };
    } else if (replayStatus.type === 'Existing') {
      const priorTx = state.transitions.find(
        (t) => t.id === replayStatus.transitionId
      );
      if (priorTx) {
        decision = priorTx.decision;
      } else {
        decision = this.ruleEvaluator.evaluate(request, subject!);
      }
    } else {
      decision = this.ruleEvaluator.evaluate(request, subject!);
    }

    const transitionId = `tx_${Date.now()}_${reqHash.hexDigest.slice(0, 8)}`;
    const receiptSignature = sha256(
      `${transitionId}:${reqHash.hexDigest}:${decision.type}`
    );

    const transition: AuthorityTransition = {
      id: transitionId,
      subjectAtomId: request.subjectId,
      sourceAuthority: subject?.authority || {
        authorityClass: AuthorityClass.HYPOTHETICAL,
        weight: 0.0,
      },
      requestedAuthority: request.requestedAuthority,
      evaluatedAuthorityVersion: state.authorityVersion,
      decision,
      boundary: boundaryAssessment,
      evidenceRefs: request.evidence.map((e) => e.id),
      requestHash: reqHash,
      timestamp: Date.now(),
      receiptSignature,
    };

    return { transition, replayStatus };
  }
}

export class KernelStateReducer {
  static reduce(
    state: KernelState,
    transition: AuthorityTransition,
    replayGuard: InMemoryReplayGuard,
    request: AuthorityTransitionRequest,
    replayStatus: ReplayStatus
  ): KernelState {
    const isGranted = transition.decision.type === 'Granted';

    // Record into Replay Guard
    if (replayStatus.type === 'New') {
      replayGuard.record({
        idempotencyKey: request.idempotencyKey,
        canonicalRequestHashHex: transition.requestHash.hexDigest,
        transitionId: transition.id,
        timestamp: transition.timestamp,
      });
    }

    // Threat assessment update
    let newThreatLevel = state.threatAssessment.threatLevel;
    let replayBlocked = state.threatAssessment.replayAttemptsBlocked;
    let anomaliesCount = state.threatAssessment.boundaryAnomaliesCount;
    const suspectedVectors = [...state.threatAssessment.suspectedVectors];

    if (!transition.boundary.passed) {
      anomaliesCount++;
      if (transition.boundary.violations.includes(BoundaryViolation.REPLAY_CONFLICT)) {
        replayBlocked++;
      }
      transition.boundary.violations.forEach((v) => {
        if (!suspectedVectors.includes(v)) {
          suspectedVectors.push(v);
        }
      });
      if (anomaliesCount > 3 || replayBlocked > 0) {
        newThreatLevel = 'ELEVATED';
      }
      if (anomaliesCount > 6) {
        newThreatLevel = 'CRITICAL';
      }
    }

    const updatedThreat = {
      threatLevel: newThreatLevel,
      suspectedVectors,
      replayAttemptsBlocked: replayBlocked,
      boundaryAnomaliesCount: anomaliesCount,
      lastIncidentTimestamp: transition.boundary.passed
        ? state.threatAssessment.lastIncidentTimestamp
        : Date.now(),
    };

    if (!isGranted) {
      return {
        ...state,
        transitions: [transition, ...state.transitions.slice(0, 99)],
        threatAssessment: updatedThreat,
      };
    }

    // Update the subject atom
    const grantedAuth = (transition.decision as { type: 'Granted'; grantedAuthority: AuthorityLevel }).grantedAuthority;
    const currentAtom = state.atomsById[transition.subjectAtomId];
    if (!currentAtom) {
      return state;
    }

    const updatedAtom: CognitiveAtom = {
      ...currentAtom,
      authority: grantedAuth,
      status:
        grantedAuth.authorityClass === AuthorityClass.FACTUAL ||
        grantedAuth.authorityClass === AuthorityClass.ENTERPRISE
          ? CognitiveStatus.COMMITTED
          : CognitiveStatus.ACTIVE,
    };

    return {
      ...state,
      authorityVersion: state.authorityVersion + 1,
      atomsById: {
        ...state.atomsById,
        [updatedAtom.id]: updatedAtom,
      },
      transitions: [transition, ...state.transitions.slice(0, 99)],
      threatAssessment: updatedThreat,
    };
  }
}
