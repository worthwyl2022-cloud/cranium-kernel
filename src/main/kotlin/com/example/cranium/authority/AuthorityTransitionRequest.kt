package com.example.cranium.authority

import java.time.Instant

/**
 * A uniquely identified, version-bound request to alter the authority of a
 * cognitive atom.
 *
 * This is the consumable state-change unit. It is NOT evidence. It is NOT
 * authorization. It describes the EXACT operation being attempted.
 *
 * Subject identity is carried as [subjectId], not as a [CognitiveAtom].
 * The authority engine resolves the subject from the immutable [KernelState]
 * snapshot at evaluation time. This prevents the following class of error:
 *
 *   request.subject.authorityWeight = 1.0  // compile error: no such field
 *
 * because there is no mutable subject object inside the request waiting
 * to be modified by an enthusiastic programmer.
 *
 * Replay protection applies to this object. A previously committed equivalent
 * request (same identity + same canonical payload) is idempotently resolved
 * to its original result. Reuse with the same identity but a different
 * canonical payload is rejected as [com.example.cranium.receipt.ReplayStatus.ConflictingReuse].
 *
 * [expectedStateVersion] is part of the canonical hash and may not be
 * omitted or changed without producing a new operation identity.
 */
data class AuthorityTransitionRequest(
    val requestId: String,
    val subjectId: String,
    val requestedAuthority: AuthorityLevel,
    val evidence: List<EvidenceRef>,
    val source: AuthoritySource,
    val authorization: TransitionAuthorization?,
    val expectedStateVersion: Long,
    val idempotencyKey: String,
    val timestamp: Instant
) {
    init {
        require(requestId.isNotBlank()) { "requestId must not be blank" }
        require(subjectId.isNotBlank()) { "subjectId must not be blank" }
        require(idempotencyKey.isNotBlank()) { "idempotencyKey must not be blank" }
        require(expectedStateVersion >= 0) { "expectedStateVersion must be >= 0" }
        require(evidence.distinctBy { it.id }.size == evidence.size) {
            "evidence list must not contain duplicate EvidenceRef ids"
        }
    }
}
