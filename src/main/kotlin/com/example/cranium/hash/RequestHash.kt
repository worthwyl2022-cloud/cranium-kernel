package com.example.cranium.hash

/**
 * The SHA-256 hash of the canonical serialization of an
 * [com.example.cranium.authority.AuthorityTransitionRequest].
 *
 * [hex] is the lower-case hex encoding of the 32-byte SHA-256 digest.
 *
 * This value:
 *   - binds the request to its authorization
 *   - identifies the request in the replay index
 *   - binds the [AuthorityTransition] result to the exact payload evaluated
 *   - is included in the execution receipt
 *
 * It is not a pointer. It is not a database ID. It is a content hash.
 * The same request always produces the same hash. A different request
 * always produces a different hash. SHA-256 enforces this. We do not.
 */
@JvmInline
value class RequestHash(val hex: String) {
    init {
        require(hex.length == 64) {
            "RequestHash hex must be 64 hex characters (SHA-256), got length ${hex.length}"
        }
        require(hex.all { it.isDigit() || it in 'a'..'f' }) {
            "RequestHash hex must contain only lowercase hex characters"
        }
    }

    override fun toString(): String = hex
}
