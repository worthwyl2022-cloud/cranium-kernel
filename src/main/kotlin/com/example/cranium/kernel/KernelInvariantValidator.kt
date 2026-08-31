package com.example.cranium.kernel

interface KernelInvariantValidator {
    fun validate(
        before: KernelState,
        after: KernelState,
        event: DomainEvent
    ): List<InvariantResult>
}
