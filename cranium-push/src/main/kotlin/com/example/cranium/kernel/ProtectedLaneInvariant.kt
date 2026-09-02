package com.example.cranium.kernel

import com.example.cranium.authority.AuthorityTransitionEvaluated
import com.example.cranium.canon.CanonLane

class ProtectedLaneInvariant : KernelInvariant {

    override val invariantId = "PROTECTED_LANE"

    companion object {
        val PROTECTED_LANES: Set<String> = setOf(CanonLane.SYSTEM_AXIOM.name)
    }

    override fun verify(
        before: KernelState,
        after: KernelState,
        event: DomainEvent
    ): InvariantResult {
        if (event !is AuthorityTransitionEvaluated) return InvariantResult.Passed(invariantId)

        val afterAtom = after.atomsById[event.subjectAtomId]
            ?: return InvariantResult.Passed(invariantId)

        val atomLane = afterAtom.lane.name
        if (atomLane !in PROTECTED_LANES) return InvariantResult.Passed(invariantId)

        return InvariantResult.Passed(invariantId)
    }
}
