package com.example.cranium.authority

import com.example.cranium.hash.RequestHash
import com.example.cranium.kernel.KernelState
import com.example.cranium.replay.ReplayStatus

/**
 * Validates whether a request is legally admissible for authority evaluation.
 *
 * BoundaryValidator does not grant authority. It answers only whether the
 * request may proceed to [AuthorityRuleEvaluator]. Mandatory failures are
 * fail-closed.
 */
interface BoundaryValidator {
    fun validate(
        request: AuthorityTransitionRequest,
        requestHash: RequestHash,
        state: KernelState,
        replayStatus: ReplayStatus
    ): BoundaryAssessment
}
