package com.example.cranium.kernel

import com.example.cranium.authority.AuthorityTransition
import com.example.cranium.authority.TransitionDecision

/**
 * Pure, immutable state reducer for authority transitions.
 *
 * The reducer does not decide whether a transition is legal. It applies only
 * already-evaluated transitions. Denied / escalated / isolated transitions do
 * not mutate state. Granted transitions produce a new immutable snapshot.
 */
class KernelStateReducer {

    fun reduce(
        before: KernelState,
        transition: AuthorityTransition
    ): KernelState {
        if (transition.decision !is TransitionDecision.Granted) return before

        val subject = requireNotNull(before.subjectById(transition.subjectAtomId)) {
            "Cannot reduce transition for unknown subject ${transition.subjectAtomId}"
        }
        check(subject.authorityLevel() == transition.sourceAuthority) {
            "Source authority mismatch. Reducer refuses to mutate stale or inconsistent state."
        }

        val updatedSubject = subject.copy(
            authorityClass = transition.requestedAuthority.authorityClass,
            authorityWeight = transition.requestedAuthority.weight
        )

        return before.copy(
            authorityVersion = before.authorityVersion + 1,
            atomsById = before.atomsById + (updatedSubject.id to updatedSubject),
            authorityTransitionIds = before.authorityTransitionIds + transition.id
        )
    }
}
