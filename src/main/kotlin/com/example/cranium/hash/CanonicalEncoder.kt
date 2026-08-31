package com.example.cranium.hash

/**
 * Produces a deterministic, canonical byte-array representation of [T].
 *
 * The canonical representation of the same value must be byte-for-byte
 * identical across JVM instances, serialization formats, field-ordering
 * choices, and floating-point precision regimes.
 *
 * The encoding contract for [AuthorityTransitionRequest] is defined in
 * CRANIUM_SUBSTRATE_V1_FROZEN_CONTRACT.md. Any field omission, ordering
 * change, or encoding change is a breaking change requiring a contract
 * version increment.
 *
 * Implementations must be pure functions. They receive an immutable value
 * and return an immutable byte array. They do not log, cache, or mutate
 * any external state.
 */
interface CanonicalEncoder<T> {
    fun encode(value: T): ByteArray
}
