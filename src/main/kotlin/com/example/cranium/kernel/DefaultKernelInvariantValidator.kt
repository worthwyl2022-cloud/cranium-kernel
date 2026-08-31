package com.example.cranium.kernel

class DefaultKernelInvariantValidator(
    private val invariants: List<KernelInvariant>
) : KernelInvariantValidator {
    override fun validate(
        before: KernelState,
        after: KernelState,
        event: DomainEvent
    ): List<InvariantResult> = invariants.map { it.verify(before, after, event) }
}
