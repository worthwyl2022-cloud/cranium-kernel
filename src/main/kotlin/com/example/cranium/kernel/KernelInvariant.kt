package com.example.cranium.kernel

/**
 * A kernel invariant evaluated before every governed state commit.
 *
 * All registered invariants are evaluated before any event is committed.
 * A single failure is fail-closed: no state mutation, no version increment,
 * no release. The failed attempt remains receipt-visible as evidence.
 *
 * Implementations must be pure: immutable snapshots in, immutable result out.
 */
interface KernelInvariant {
    val invariantId: String

    fun verify(
        before: KernelState,
        after: KernelState,
        event: DomainEvent
    ): InvariantResult
}

sealed interface InvariantResult {
    val invariantId: String

    data class Satisfied(override val invariantId: String) : InvariantResult

    data class Violated(
        override val invariantId: String,
        val reason: String,
        val evidence: Map<String, String> = emptyMap()
    ) : InvariantResult
}
