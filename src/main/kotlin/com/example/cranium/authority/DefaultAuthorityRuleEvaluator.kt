package com.example.cranium.authority

import com.example.cranium.cognition.CognitiveAtom
import com.example.cranium.kernel.KernelState

class DefaultAuthorityRuleEvaluator : AuthorityRuleEvaluator {

    override fun evaluate(
        request: AuthorityTransitionRequest,
        subject: CognitiveAtom,
        state: KernelState
    ): TransitionDecision {
        val current = subject.authorityLevel()
        val requested = request.requestedAuthority
        val classJump = requested.authorityClass.rank - current.authorityClass.rank

        if (!requested.dominates(current)) {
            return TransitionDecision.Denied("Requested authority must strictly dominate current authority")
        }

        if (classJump > 1) {
            return TransitionDecision.Escalated("Authority jump greater than one class requires escalation")
        }

        if (request.source == AuthoritySource.MODEL && requested.authorityClass.rank > AuthorityClass.WORKING.rank) {
            return TransitionDecision.Denied("Model-originated requests cannot acquire authority above WORKING")
        }

        return TransitionDecision.Granted(requested)
    }
}
