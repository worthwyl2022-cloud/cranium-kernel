package com.example.cranium.kernel

import com.example.cranium.authority.AuthorityTransition
import com.example.cranium.authority.TransitionDecision

/**
 * Pure, immutable state reducer for authority transitions.
 *
 * The reducer does not decide whether a transition is legal. It applies only
 * already-evaluated transitions. Denied / escalated / isolated transitions do
 * not mutate state. Granted transitions produce a new immutable snapshot.
 *
 * Commit integrity is explicit and fail-closed:
 *   - the transition must have been evaluated against this exact
 *     [KernelState.authorityVersion]
 *   - the transition ID must not already have been committed in this state
 *
 * [reduce] is internal. The only production caller is [CommitOrchestrator].
 * Nothing outside the kernel package reaches this method. That is the
 * structural constraint that makes CommitOrchestrator the sole governed
 * entry point rather than a suggestion.
 */
class KernelStateReducer {

    internal fun reduce(
        before: KernelState,
        transition: AuthorityTransition
    ): KernelState {
        if (transition.decision !is TransitionDecision.Granted) return before

        require(transition.evaluatedAuthorityVersion == before.authorityVersion) {
            "Evaluated authorityVersion ${transition.evaluatedAuthorityVersion} does not match " +
            "current authorityVersion ${before.authorityVersion}"
        }

        require(transition.id !in before.authorityTransitionIds) {
            "Transition ${transition.id} has already been committed"
        }

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
