package com.example.cranium.authority

import com.example.cranium.cognition.CognitiveAtom
import com.example.cranium.kernel.KernelState

/**
 * Evaluates whether an already-admissible request may actually change
 * authority. This is distinct from boundary validation.
 */
interface AuthorityRuleEvaluator {
    fun evaluate(
        request: AuthorityTransitionRequest,
        subject: CognitiveAtom,
        state: KernelState
    ): TransitionDecision
}
