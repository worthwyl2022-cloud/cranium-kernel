package com.example.cranium.authority

import com.example.cranium.hash.RequestHasher
import com.example.cranium.hash.Sha256RequestHasher
import com.example.cranium.kernel.KernelState
import com.example.cranium.replay.ReplayGuard
import com.example.cranium.replay.ReplayStatus
import java.util.UUID

/**
 * Commit-3 authority boundary implementation.
 *
 * The engine orchestrates the evaluation path:
 *   request -> hash -> replay inspection -> boundary validation -> rule evaluation
 *
 * It does not mutate governed state. It does not write receipts. It does not
 * record replay state. Only the governed commit path may do those things.
 */
class DefaultAuthorityTransitionEngine(
    private val requestHasher: RequestHasher = Sha256RequestHasher(),
    private val replayGuard: ReplayGuard,
    private val boundaryValidator: BoundaryValidator = DefaultBoundaryValidator(),
    private val ruleEvaluator: AuthorityRuleEvaluator = DefaultAuthorityRuleEvaluator()
) : AuthorityTransitionEngine {

    override fun evaluate(
        request: AuthorityTransitionRequest,
        state: KernelState
    ): AuthorityTransition {
        val requestHash = requestHasher.hash(request)
        val replayStatus = replayGuard.inspect(
            requestId = request.requestId,
            idempotencyKey = request.idempotencyKey,
            canonicalRequestHash = requestHash
        )

        if (replayStatus is ReplayStatus.Existing) {
            return replayGuard.loadCommittedTransition(replayStatus.transitionId)
                ?: denied(request, state, requestHash,
                    "Replay index referenced an existing transition that could not be loaded")
        }

        val boundary = boundaryValidator.validate(request, requestHash, state, replayStatus)
        if (!boundary.passed) {
            return denied(request, state, requestHash, boundary.explanation, boundary)
        }

        val subject = requireNotNull(state.subjectById(request.subjectId))
        val decision = ruleEvaluator.evaluate(request, subject, state)

        return AuthorityTransition(
            id = UUID.randomUUID().toString(),
            subjectAtomId = request.subjectId,
            sourceAuthority = subject.authorityLevel(),
            requestedAuthority = request.requestedAuthority,
            decision = decision,
            boundary = boundary,
            evidenceRefs = request.evidence.map { it.id },
            requestHash = requestHash,
            timestamp = request.timestamp
        )
    }

    private fun denied(
        request: AuthorityTransitionRequest,
        state: KernelState,
        requestHash: com.example.cranium.hash.RequestHash,
        reason: String,
        boundary: BoundaryAssessment = BoundaryAssessment.failed(
            violations = setOf(BoundaryViolation.INVALID_REQUEST),
            evidenceRefs = request.evidence.map { it.id },
            explanation = reason
        )
    ): AuthorityTransition {
        val sourceAuthority = state.subjectById(request.subjectId)?.authorityLevel() ?: AuthorityLevel.NONE
        return AuthorityTransition(
            id = UUID.randomUUID().toString(),
            subjectAtomId = request.subjectId,
            sourceAuthority = sourceAuthority,
            requestedAuthority = request.requestedAuthority,
            decision = TransitionDecision.Denied(reason),
            boundary = boundary,
            evidenceRefs = request.evidence.map { it.id },
            requestHash = requestHash,
            timestamp = request.timestamp
        )
    }
}
