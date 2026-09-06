import {
  DefaultAuthorityTransitionEngine,
  KernelStateReducer,
  TransitionEvaluationResult,
} from '../kernel/engine';
import { InMemoryReplayGuard } from '../kernel/replayGuard';
import {
  AuthorityTransitionRequest,
  KernelState,
  BoundaryViolation,
} from '../kernel/types';

/**
 * Governance boundary for integrations and deployable adapters.
 *
 * This layer is intentionally not an authority issuer. It owns orchestration,
 * admission controls, and audit context; the canonical kernel remains the only
 * component allowed to evaluate and commit authority transitions.
 */
export interface GovernanceContext {
  adapterId: string;
  requestedBy: string;
  purpose: string;
  correlationId: string;
}

export interface GovernanceEvaluation {
  accepted: boolean;
  context: GovernanceContext;
  evaluation: TransitionEvaluationResult;
  rejectionReason?: string;
}

export class GovernedKernelPort {
  constructor(
    private readonly replayGuard: InMemoryReplayGuard,
    private readonly engine = new DefaultAuthorityTransitionEngine(replayGuard)
  ) {}

  evaluate(
    request: AuthorityTransitionRequest,
    state: KernelState,
    context: GovernanceContext
  ): GovernanceEvaluation {
    const evaluation = this.engine.evaluate(request, state);
    const accepted = evaluation.transition.boundary.passed;

    return {
      accepted,
      context,
      evaluation,
      rejectionReason: accepted
        ? undefined
        : evaluation.transition.boundary.violations.join(', '),
    };
  }

  /**
   * Commit only an evaluation produced by this port and only when the kernel
   * boundary passed. No adapter can bypass the canonical reducer.
   */
  commit(
    state: KernelState,
    request: AuthorityTransitionRequest,
    result: GovernanceEvaluation
  ): KernelState {
    if (!result.accepted) {
      throw new Error(
        `Governance boundary rejected transition: ${result.rejectionReason ?? BoundaryViolation.INVALID_REQUEST}`
      );
    }

    return KernelStateReducer.reduce(
      state,
      result.evaluation.transition,
      this.replayGuard,
      request,
      result.evaluation.replayStatus
    );
  }
}
