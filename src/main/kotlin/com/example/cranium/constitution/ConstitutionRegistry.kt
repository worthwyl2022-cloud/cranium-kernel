package com.example.cranium.constitution

/**
 * Read-only access to the constitutional layer.
 *
 * The registry is a governed read-only view. It does not expose mutation.
 * Constitutional modification is exclusively the domain of a (future)
 * governed ConstitutionalMutationRequest evaluated through the same
 * authority boundary as every other governed state change.
 *
 * The kernel receives a [ConstitutionRegistry] at boot time. It does not
 * hold a mutable reference. It does not update the registry in place.
 * It uses the registry to resolve which constraints must be enforced and
 * to include the [constitutionHash] in every execution receipt.
 */
interface ConstitutionRegistry {

    /**
     * Returns all active [ConstitutionalConstraint]s.
     *
     * The kernel evaluates these before every governed state commit.
     * The returned list is a snapshot; callers must not assume it is
     * stable across commit boundaries.
     */
    fun activeConstraints(): List<ConstitutionalConstraint>

    /**
     * Returns all [ConstitutionalPrinciple]s, active or otherwise.
     *
     * Retired or superseded principles are preserved for receipt auditability.
     */
    fun allPrinciples(): List<ConstitutionalPrinciple>

    /**
     * Returns the SHA-256 of the canonical serialization of the current
     * active constitution. This hash is included in every execution receipt
     * and in every authority transition receipt, binding the governed
     * outcome to the constitutional state that authorized it.
     */
    fun constitutionHash(): String
}
