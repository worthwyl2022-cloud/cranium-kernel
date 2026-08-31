package com.example.cranium.authority

/**
 * Result of verifying the explicitly-specified, non-cryptographic parts of a
 * [TransitionAuthorization].
 *
 * Commit 3 intentionally stops at what the current v1 contract specifies well
 * enough to verify for real:
 *   - presence
 *   - request-hash binding
 *   - issuance / expiry window
 *   - scope / lane / operation compatibility
 *   - authority-source consistency
 *
 * Signature cryptography remains explicitly absent until the issuer/key model
 * is defined tightly enough to implement without simulation.
 */
sealed interface AuthorizationVerificationResult {
    data object Verified : AuthorizationVerificationResult
    data class Rejected(
        val violation: BoundaryViolation,
        val reason: String
    ) : AuthorizationVerificationResult
}
