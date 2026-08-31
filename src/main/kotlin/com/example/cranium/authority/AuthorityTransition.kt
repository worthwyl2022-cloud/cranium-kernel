package com.example.cranium.authority

import java.time.Instant

/**
 * The immutable result of evaluating an [AuthorityTransitionRequest].
 *
 * This is an evaluation result, not a commit command.
 * [TransitionDecision.Granted] here does not mean state was mutated.
 * The kernel invariant validator and governed atomic commit path must both
 * succeed before the authority version is incremented.
 *
 * [requestHash] binds this transition to the exact canonical payload evaluated.
 * The commit path verifies this binding before writing state.
 */
data class AuthorityTransition(
    val id: String,
    val subjectAtomId: String,
    val sourceAuthority: AuthorityLevel,
    val requestedAuthority: AuthorityLevel,
    val decision: TransitionDecision,
    val boundary: BoundaryAssessment,
    val evidenceRefs: List<String>,
    val requestHash: String,
    val timestamp: Instant
) {
    init {
        require(id.isNotBlank()) { "AuthorityTransition id must not be blank" }
        require(requestHash.isNotBlank()) { "requestHash must not be blank" }
    }

    val isGranted: Boolean get() = decision is TransitionDecision.Granted
}
