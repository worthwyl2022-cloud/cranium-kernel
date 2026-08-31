package com.example.cranium.constitution

import com.example.cranium.kernel.InvariantResult

/**
 * Verifies that the [ConstitutionRegistry] has not been tampered with.
 *
 * ConstitutionIntegrity is one of the mandatory pre-commit checks in the
 * kernel. Before any governed state commit, the kernel verifies that:
 *
 *   1. The [ConstitutionRegistry.constitutionHash] matches the
 *      independently-computed hash of the current active constraints
 *      and their referenced principles.
 *
 *   2. Every [ConstitutionalConstraint.contentHash] matches the
 *      independently-computed hash of the corresponding constraint.
 *
 *   3. Every [ConstitutionalPrinciple.contentHash] matches the
 *      independently-computed hash of the corresponding principle.
 *
 * A single mismatch is fail-closed: the commit is rejected, and the
 * tamper event is preserved in the receipt chain.
 *
 * The verification mechanism here is a real SHA-256 implementation.
 * A fake verifier is prohibited by the Verification Integrity Rule.
 */
interface ConstitutionIntegrity {

    /**
     * Verifies the integrity of the supplied [registry].
     *
     * Returns [InvariantResult.Satisfied] if all hashes verify.
     * Returns [InvariantResult.Violated] with machine-readable evidence
     * if any hash fails.
     */
    fun verify(registry: ConstitutionRegistry): InvariantResult
}
