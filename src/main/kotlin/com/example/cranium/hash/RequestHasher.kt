package com.example.cranium.hash

import com.example.cranium.authority.AuthorityTransitionRequest

/**
 * Computes the [RequestHash] of an [AuthorityTransitionRequest].
 *
 * The contract:
 *
 *   Given any request R:
 *     hasher.hash(R) == hasher.hash(R)              // determinism
 *
 *   Given requests R1 and R2 where any canonical field differs:
 *     hasher.hash(R1) != hasher.hash(R2)            // collision resistance (SHA-256)
 *
 * The implementation must use real SHA-256 (FIPS 180-4) over the
 * deterministic canonical encoding produced by [CanonicalEncoder].
 *
 * A fake hasher that returns a predetermined value or skips SHA-256 is
 * prohibited by the Verification Integrity Rule.
 */
interface RequestHasher {
    fun hash(request: AuthorityTransitionRequest): RequestHash
}
