package com.example.cranium.constitution

/**
 * A named, versioned constitutional principle.
 *
 * Principles are not advisory comments. They are the normative basis for
 * constitutional constraints, which are themselves the normative basis for
 * kernel invariants. The chain is:
 *
 *   ConstitutionalPrinciple
 *         ↓ referenced by
 *   ConstitutionalConstraint
 *         ↓ referenced by
 *   KernelInvariant
 *         ↓ evaluated before
 *   every governed state commit
 *
 * A principle may not be modified by the model. It may not be bypassed by
 * a high-weight authority transition. Constitutional modification is itself
 * a governed transition that requires explicit, scoped authorization and
 * produces a receipt.
 *
 * [principleId]  — stable, human-readable identifier (e.g. "PRIME_DIRECTIVE")
 * [version]      — monotonically increasing; a new version does not erase the
 *                  previous one from the receipt chain
 * [description]  — canonical prose definition
 * [contentHash]  — SHA-256 of the canonical serialization of this principle;
 *                  used by [ConstitutionIntegrity] to detect tampering
 */
data class ConstitutionalPrinciple(
    val principleId: String,
    val version: Int,
    val description: String,
    val contentHash: String
) {
    init {
        require(principleId.isNotBlank()) { "principleId must not be blank" }
        require(version >= 1) { "version must be >= 1" }
        require(description.isNotBlank()) { "description must not be blank" }
        require(contentHash.isNotBlank()) { "contentHash must not be blank" }
    }
}
