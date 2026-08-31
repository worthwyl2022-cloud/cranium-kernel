package com.example.cranium.authority

import com.example.cranium.cognition.CognitiveStatus
import com.example.cranium.cognition.Provenance
import com.example.cranium.hash.RequestHash
import com.example.cranium.kernel.KernelState
import com.example.cranium.replay.ReplayStatus

/**
 * Aggressively boring, fail-fast boundary validator.
 *
 * Nothing after the first mandatory boundary failure gets to participate in
 * authority scoring.
 */
class DefaultBoundaryValidator(
    private val authorizationVerifier: AuthorizationVerifier = DefaultAuthorizationVerifier()
) : BoundaryValidator {

    override fun validate(
        request: AuthorityTransitionRequest,
        requestHash: RequestHash,
        state: KernelState,
        replayStatus: ReplayStatus
    ): BoundaryAssessment {
        val subject = state.subjectById(request.subjectId)
            ?: return fail(BoundaryViolation.SUBJECT_NOT_FOUND, request, "Subject not found")

        if (subject.status == CognitiveStatus.ISOLATED || subject.status == CognitiveStatus.RETIRED) {
            return fail(BoundaryViolation.SUBJECT_ISOLATED, request,
                "Subject is isolated or retired and may not participate in authority transitions")
        }

        when (replayStatus) {
            is ReplayStatus.ConflictingReuse -> {
                return fail(BoundaryViolation.REPLAY_DETECTED, request,
                    "Identity/key reuse with a different canonical payload was detected")
            }
            is ReplayStatus.Existing -> {
                return fail(BoundaryViolation.REPLAY_DETECTED, request,
                    "This request identity and canonical payload were already committed")
            }
            ReplayStatus.New -> Unit
        }

        if (request.expectedStateVersion != state.authorityVersion) {
            return fail(BoundaryViolation.STALE_STATE, request,
                "expectedStateVersion ${request.expectedStateVersion} != current authorityVersion ${state.authorityVersion}")
        }

        if (request.evidence.isEmpty()) {
            return fail(BoundaryViolation.INSUFFICIENT_EVIDENCE, request, "At least one evidence reference is required")
        }

        if (request.source == AuthoritySource.MODEL && request.requestedAuthority.authorityClass.rank > AuthorityClass.WORKING.rank) {
            return fail(BoundaryViolation.UNTRUSTED_PROVENANCE, request,
                "Model-originated requests may not seek authority above WORKING")
        }

        if (subject.lane.protected && request.authorization == null) {
            return fail(BoundaryViolation.PROTECTED_LANE, request,
                "Protected lanes require explicit authorization")
        }

        if (subject.provenance == Provenance.MODEL && request.requestedAuthority.authorityClass.rank > AuthorityClass.WORKING.rank) {
            return fail(BoundaryViolation.UNTRUSTED_PROVENANCE, request,
                "Model-provenance subjects may not directly acquire elevated authority")
        }

        val authorizationResult = authorizationVerifier.verify(request, requestHash, subject)
        if (authorizationResult is AuthorizationVerificationResult.Rejected) {
            return fail(authorizationResult.violation, request, authorizationResult.reason)
        }

        return BoundaryAssessment.passed(
            evidenceRefs = request.evidence.map { it.id },
            explanation = "Boundary validation passed"
        )
    }

    private fun fail(
        violation: BoundaryViolation,
        request: AuthorityTransitionRequest,
        reason: String
    ): BoundaryAssessment = BoundaryAssessment.failed(
        violations = setOf(violation),
        evidenceRefs = request.evidence.map { it.id },
        explanation = reason
    )
}
