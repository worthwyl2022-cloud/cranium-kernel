package com.example.cranium.authority

import com.example.cranium.hash.RequestHash
import java.time.Instant

/**
 * A capability token permitting a specific, scoped authority transition.
 *
 * Commit 3 deliberately does NOT invent a cryptographic issuer/key model that
 * the current v1 contract has not yet specified. The rule is:
 *
 *   real where specified
 *   explicitly absent where not yet specified
 *   never simulated
 *
 * Accordingly, this type includes a real [boundRequestHash] so the authority
 * boundary can verify request/authorization binding mechanically. Signature
 * verification is intentionally left absent until the issuer/key model is
 * specified tightly enough to implement it for real.
 */
data class TransitionAuthorization(
    val authorizationId: String,
    val authority: AuthoritySource,
    val scope: AuthorizationScope,
    val issuedAt: Instant,
    val expiresAt: Instant?,
    val boundRequestHash: RequestHash,
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
