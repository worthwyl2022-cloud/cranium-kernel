package com.example.cranium.kernel

/**
 * A kernel invariant evaluated before every governed state commit.
 *
 * All registered invariants are evaluated before any event is committed.
 * A single [InvariantResult.Violated] from any invariant causes a fail-closed
 * rejection: no state is mutated, no version is incremented, and the failed
 * attempt is preserved in the receipt chain.
 *
 * Constitutional constraints translate to invariants through
 * [com.example.cranium.constitution.ConstitutionalConstraint.invariantClass].
 *
 * Implementations must be pure: immutable snapshots in, immutable result out.
 * They do not commit, mutate, write receipts, or invoke the model.
 */
interface KernelInvariant {

    val invariantId: String

    fun verify(
        before: KernelState,
        after: KernelState,
        event: DomainEvent
    ): InvariantResult
}
