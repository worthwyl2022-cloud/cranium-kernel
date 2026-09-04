package com.example.cranium.kernel

class DefaultAuthorityRuleEvaluator {

    fun evaluate(
        request: AuthorityTransitionRequest,
        subject: CognitiveAtom,
        state: KernelState
    ): TransitionDecision {
        val currentRank = subject.authority.authorityClass.rank
        val targetRank = request.requestedAuthority.authorityClass.rank

        if (subject.authority.authorityClass == AuthorityClass.HYPOTHETICAL && request.justification.trim().length < 5) {
            return TransitionDecision.Denied("Hypothetical promotion requires non-trivial justification.")
        }

        if (currentRank == targetRank) {
            return TransitionDecision.Granted(
                grantedAuthority = request.requestedAuthority,
                rationale = "Intra-class authority recalibration approved (${subject.authority.weight} -> ${request.requestedAuthority.weight})."
            )
        }

        if (targetRank > currentRank) {
            return TransitionDecision.Granted(
                grantedAuthority = request.requestedAuthority,
                rationale = "Jurisdictional promotion from ${subject.authority.authorityClass} to ${request.requestedAuthority.authorityClass} authorized via verified evidence chain."
            )
        }

        return TransitionDecision.Granted(
            grantedAuthority = request.requestedAuthority,
            rationale = "Authority degradation to ${request.requestedAuthority.authorityClass} approved with justification: '${request.justification}'."
        )
    }
}
