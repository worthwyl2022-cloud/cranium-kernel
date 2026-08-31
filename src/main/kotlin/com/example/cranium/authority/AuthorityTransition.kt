package com.example.cranium.authority

import com.example.cranium.hash.RequestHash
import java.time.Instant

/**
 * The immutable result of evaluating an [AuthorityTransitionRequest].
 *
 * This is an evaluation result, not a commit command.
 *
 * [evaluatedAuthorityVersion] binds this transition to the exact authority
 * state snapshot against which it was evaluated. A future commit path or
 * reducer must refuse to apply a granted transition to any different
 * authorityVersion, even if the subject's current authority level happens
 * to match [sourceAuthority].
 */
data class AuthorityTransition(
    val id: String,
    val subjectAtomId: String,
    val sourceAuthority: AuthorityLevel,
    val requestedAuthority: AuthorityLevel,
    val evaluatedAuthorityVersion: Long,
    val decision: TransitionDecision,
    val boundary: BoundaryAssessment,
    val evidenceRefs: List<String>,
    val requestHash: RequestHash,
    val timestamp: Instant
) {
    init {
        require(id.isNotBlank()) { "AuthorityTransition id must not be blank" }
        require(evaluatedAuthorityVersion >= 0) {
            "evaluatedAuthorityVersion must be >= 0"
        }
    }

    val isGranted: Boolean get() = decision is TransitionDecision.Granted
}
