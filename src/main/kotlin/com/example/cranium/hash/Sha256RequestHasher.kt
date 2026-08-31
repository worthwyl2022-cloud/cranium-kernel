package com.example.cranium.hash

import com.example.cranium.authority.AuthorityTransitionRequest
import java.security.MessageDigest

/**
 * The real SHA-256 [RequestHasher].
 *
 * Computes the canonical encoding of the request using
 * [AuthorityTransitionRequestEncoder] and applies SHA-256 (FIPS 180-4).
 *
 * This is the only permitted implementation in v1 security tests.
 * A fake hasher is prohibited by the Verification Integrity Rule.
 *
 * Thread safety: MessageDigest is not thread-safe; each call to [hash]
 * obtains a fresh instance via [MessageDigest.getInstance].
 */
class Sha256RequestHasher(
    private val encoder: CanonicalEncoder<AuthorityTransitionRequest> =
        AuthorityTransitionRequestEncoder()
) : RequestHasher {

    override fun hash(request: AuthorityTransitionRequest): RequestHash {
        val canonicalBytes = encoder.encode(request)
        val digest = MessageDigest.getInstance("SHA-256")
        val hashBytes = digest.digest(canonicalBytes)
        return RequestHash(hashBytes.toHex())
    }

    private fun ByteArray.toHex(): String =
        joinToString("") { "%02x".format(it) }
}
