package com.example.cranium.authority

import com.example.cranium.kernel.KernelState

/**
 * Evaluates an authority transition request against the current kernel state.
 *
 * The engine MUST NOT:
 *   - commit state
 *   - write receipts
 *   - mutate canon
 *   - invoke the model
 *   - write to the replay index
 *   - hold any mutable reference to kernel-owned resources
 *
 * Capability isolation is enforced by the types: this interface receives only
 * [AuthorityTransitionRequest] and [KernelState] and produces only
 * [AuthorityTransition].
 */
interface AuthorityTransitionEngine {

    fun evaluate(
        request: AuthorityTransitionRequest,
        state: KernelState
    ): AuthorityTransition
}
