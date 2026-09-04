package com.example.cranium.kernel

import java.util.UUID

class DefaultAuthorityTransitionEngine(
    private val replayGuard: InMemoryReplayGuard,
    private val boundaryValidator: DefaultBoundaryValidator = DefaultBoundaryValidator(),
    private val ruleEvaluator: DefaultAuthorityRuleEvaluator = DefaultAuthorityRuleEvaluator()
) {

    data class EvaluationResult(
        val transition: AuthorityTransition,
        val replayStatus: ReplayStatus
    )

    fun evaluate(
        request: AuthorityTransitionRequest,
        state: KernelState
    ): EvaluationResult {
        val requestHash = Sha256Hasher.hash(request)
        val replayStatus = replayGuard.inspect(
            requestId = request.requestId,
            idempotencyKey = request.idempotencyKey,
            canonicalRequestHash = requestHash
        )

        if (replayStatus is ReplayStatus.Existing) {
            val existing = replayGuard.loadCommittedTransition(replayStatus.transitionId)
            if (existing != null) {
                return EvaluationResult(existing, replayStatus)
            }
        }

        val boundary = boundaryValidator.validate(request, requestHash, state, replayStatus)
        if (!boundary.passed) {
            val denied = createDenied(request, state, boundary.explanation, boundary, requestHash)
            return EvaluationResult(denied, replayStatus)
        }

        val subject = state.atomsById[request.subjectId]
        if (subject == null) {
            val denied = createDenied(request, state, "Subject atom '${request.subjectId}' does not exist in kernel state.", boundary, requestHash)
            return EvaluationResult(denied, replayStatus)
        }

        val decision = ruleEvaluator.evaluate(request, subject, state)
        val transitionId = "tx_${System.currentTimeMillis()}_${UUID.randomUUID().toString().substring(0, 6)}"
        val receiptSignature = "sig_sha256_${requestHash.hexDigest.substring(0, 16)}_${System.currentTimeMillis()}"

        val transition = AuthorityTransition(
            id = transitionId,
            subjectAtomId = request.subjectId,
            sourceAuthority = subject.authority,
            requestedAuthority = request.requestedAuthority,
            evaluatedAuthorityVersion = state.authorityVersion,
            decision = decision,
            boundary = boundary,
            evidenceRefs = request.evidence.map { it.id },
            requestHash = requestHash,
            timestamp = request.timestamp,
            receiptSignature = receiptSignature
        )

        return EvaluationResult(transition, replayStatus)
    }

    private fun createDenied(
        request: AuthorityTransitionRequest,
        state: KernelState,
        reason: String,
        boundary: BoundaryAssessment,
        requestHash: RequestHash
    ): AuthorityTransition {
        val subject = state.atomsById[request.subjectId]
        val sourceAuth = subject?.authority ?: AuthorityLevel.NONE
        return AuthorityTransition(
            id = "tx_denied_${System.currentTimeMillis()}_${UUID.randomUUID().toString().substring(0, 6)}",
            subjectAtomId = request.subjectId,
            sourceAuthority = sourceAuth,
            requestedAuthority = request.requestedAuthority,
            evaluatedAuthorityVersion = state.authorityVersion,
            decision = TransitionDecision.Denied(reason, boundary.violations.firstOrNull() ?: BoundaryViolation.INVALID_REQUEST),
            boundary = boundary,
            evidenceRefs = request.evidence.map { it.id },
            requestHash = requestHash,
            timestamp = request.timestamp,
            receiptSignature = "sig_denied_${requestHash.hexDigest.substring(0, 16)}"
        )
    }
}
