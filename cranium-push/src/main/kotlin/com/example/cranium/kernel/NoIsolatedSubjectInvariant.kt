package com.example.cranium.kernel

import com.example.cranium.authority.AuthorityTransitionEvaluated
import com.example.cranium.cognition.CognitiveStatus

class NoIsolatedSubjectInvariant : KernelInvariant {

    override val invariantId = "NO_ISOLATED_SUBJECT"

    override fun verify(
        before: KernelState,
        after: KernelState,
        event: DomainEvent
    ): InvariantResult {
        if (event !is AuthorityTransitionEvaluated) return InvariantResult.Passed(invariantId)

        val beforeAtom = before.atomsById[event.subjectAtomId]
            ?: return InvariantResult.Passed(invariantId)

        return if (beforeAtom.status == CognitiveStatus.ISOLATED)
            InvariantResult.Violated(invariantId,
                "Subject ${event.subjectAtomId} is ISOLATED and cannot be the subject of a " +
                "Granted authority transition. Reinstatement must proceed through the " +
                "governed reinstatement path.")
        else
            InvariantResult.Passed(invariantId)
    }
}
