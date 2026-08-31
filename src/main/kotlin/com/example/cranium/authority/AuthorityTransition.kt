package com.example.cranium.authority

import com.example.cranium.hash.RequestHash
import java.time.Instant

/**
 * The immutable result of evaluating an [AuthorityTransitionRequest].
 *
 * This is an evaluation result, not a commit command.
 */
data class AuthorityTransition(
    val id: String,
    val subjectAtomId: String,
    val sourceAuthority: AuthorityLevel,
    val requestedAuthority: AuthorityLevel,
    val decision: TransitionDecision,
    val boundary: BoundaryAssessment,
    val evidenceRefs: List<String>,
    val requestHash: RequestHash,
    val timestamp: Instant
) {
    init {
        require(id.isNotBlank()) { "AuthorityTransition id must not be blank" }
    }

    val isGranted: Boolean get() = decision is TransitionDecision.Granted
}
