package com.example.cranium.constitution

/**
 * A machine-enforceable constraint derived from a [ConstitutionalPrinciple].
 *
 * The Constitution establishes what Cranium is permitted to consider
 * legitimate. The kernel enforces it. This type is the bridge between
 * those two layers.
 *
 * A constraint is the machine-readable translation of a principle into a
 * property that an [com.example.cranium.kernel.KernelInvariant] can verify.
 * Not every principle is fully mechanically enforceable in v1; constraints
 * capture those that are.
 *
 * [constraintId]   — stable identifier for invariant linkage
 * [principleId]    — the [ConstitutionalPrinciple] this derives from
 * [invariantClass] — the fully-qualified name of the [KernelInvariant]
 *                    that enforces this constraint; the kernel resolves
 *                    invariants by this name at boot time
 * [isActive]       — false constraints are tracked in the receipt chain
 *                    but excluded from invariant evaluation; deactivation
 *                    is itself a governed transition
 * [description]    — plain-language statement of what the constraint enforces
 * [contentHash]    — SHA-256 of the canonical serialization of this constraint
 */
data class ConstitutionalConstraint(
    val constraintId: String,
    val principleId: String,
    val invariantClass: String,
    val isActive: Boolean,
    val description: String,
    val contentHash: String
) {
    init {
        require(constraintId.isNotBlank()) { "constraintId must not be blank" }
        require(principleId.isNotBlank()) { "principleId must not be blank" }
        require(invariantClass.isNotBlank()) { "invariantClass must not be blank" }
        require(description.isNotBlank()) { "description must not be blank" }
        require(contentHash.isNotBlank()) { "contentHash must not be blank" }
    }
}
