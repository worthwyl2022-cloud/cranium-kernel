package com.example.cranium.kernel

import com.example.cranium.authorization.AuthorizationDecision
import com.example.cranium.immunity.ThreatAssessment

/**
 * An immutable snapshot of the kernel's governed state at a point in time.
 *
 * KernelState carries values, not operational machinery. It contains no
 * references to CanonRegistry, AuthorityTransitionEngine, ModelAdapter,
 * ReceiptChain, or any other subsystem. Those subsystems receive KernelState
 * as input; they are never reachable from it.
 *
 * All List fields are defensively copied via [safeXxx] accessors.
 * Kotlin's List is read-only but not structurally immutable; callers must
 * never retain a reference to a backing mutable collection.
 */
data class KernelState(
    val executionId: String,
    val state: ExecutionState,

    val cognitiveVersion: Long,
    val authorityVersion: Long,
    val canonVersion: Long,

    val activeAtomIds: List<String>,
    val contradictionEventIds: List<String>,
    val authorityTransitionIds: List<String>,
    val deliberationStepIds: List<String>,

    val candidateHash: String?,
    val authorization: AuthorizationDecision?,
    val threatAssessment: ThreatAssessment?
) {
    init {
        require(executionId.isNotBlank()) { "executionId must not be blank" }
        require(cognitiveVersion >= 0) { "cognitiveVersion must be >= 0" }
        require(authorityVersion >= 0) { "authorityVersion must be >= 0" }
        require(canonVersion >= 0) { "canonVersion must be >= 0" }
    }

    val safeActiveAtomIds: List<String> get() = activeAtomIds.toList()
    val safeContradictionEventIds: List<String> get() = contradictionEventIds.toList()
    val safeAuthorityTransitionIds: List<String> get() = authorityTransitionIds.toList()
    val safeDeliberationStepIds: List<String> get() = deliberationStepIds.toList()
}
