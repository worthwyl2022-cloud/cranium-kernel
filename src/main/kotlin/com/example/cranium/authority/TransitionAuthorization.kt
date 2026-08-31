package com.example.cranium.authority

import java.time.Instant

/**
 * A signed capability token permitting a specific, scoped authority transition.
 *
 * Answers: WHO has the CAPABILITY to request this scoped state change?
 *
 * Distinct from:
 *   EvidenceRef    — WHY a proposition should be considered
 *   AuthorityTransitionRequest — WHAT operation is attempted
 *
 * [signature] must be verified by a real [AuthorizationVerifier] against the
 * canonical serialization of the paired request. A fake verifier is prohibited
 * by the Verification Integrity Rule.
 */
data class TransitionAuthorization(
    val authorizationId: String,
    val authority: AuthoritySource,
    val scope: AuthorizationScope,
    val issuedAt: Instant,
    val expiresAt: Instant?,
    val signature: String
) {
    init {
        require(authorizationId.isNotBlank()) { "authorizationId must not be blank" }
        require(signature.isNotBlank()) { "signature must not be blank" }
        expiresAt?.let {
            require(!it.isBefore(issuedAt)) { "expiresAt must not be before issuedAt" }
        }
    }
}
