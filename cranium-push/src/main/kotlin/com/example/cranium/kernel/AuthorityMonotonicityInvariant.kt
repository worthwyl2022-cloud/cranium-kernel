package com.example.cranium.kernel

import com.example.cranium.authority.AuthorityTransitionEvaluated

class AuthorityMonotonicityInvariant : KernelInvariant {

    override val invariantId = "AUTHORITY_MONOTONICITY"

    override fun verify(
        before: KernelState,
        after: KernelState,
        event: DomainEvent
    ): InvariantResult {
        if (event !is AuthorityTransitionEvaluated) return InvariantResult.Passed(invariantId)

        val beforeAtom = before.atomsById[event.subjectAtomId]
            ?: return InvariantResult.Violated(invariantId,
                "Subject atom ${event.subjectAtomId} not found in before-state")
        val afterAtom = after.atomsById[event.subjectAtomId]
            ?: return InvariantResult.Violated(invariantId,
                "Subject atom ${event.subjectAtomId} not found in after-state")

        return if (afterAtom.authorityClass.rank >= beforeAtom.authorityClass.rank)
            InvariantResult.Passed(invariantId)
        else
            InvariantResult.Violated(invariantId,
                "Authority class reduced from ${beforeAtom.authorityClass} " +
                "(rank ${beforeAtom.authorityClass.rank}) to ${afterAtom.authorityClass} " +
                "(rank ${afterAtom.authorityClass.rank}) for subject ${event.subjectAtomId}. " +
                "Granted transitions must not demote.")
    }
}
 