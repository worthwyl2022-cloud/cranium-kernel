package com.example.cranium.kernel

/**
 * The result of a single kernel invariant verification.
 *
 * Invariants are evaluated before any governed state commit. A [Violated]
 * result from any registered invariant causes a fail-closed rejection: no
 * state is mutated, no version is incremented, and the failed attempt is
 * preserved in the receipt chain as evidence.
 *
 * [evidence] in [Violated] is machine-readable context intended for the
 * benchmark and the receipt, not for human prose alone.
 */
sealed interface InvariantResult {

    val invariantId: String

    data class Satisfied(
        override val invariantId: String
    ) : InvariantResult

    data class Violated(
        override val invariantId: String,
        val reason: String,
        val evidence: Map<String, String> = emptyMap()
    ) : InvariantResult
}
