package com.example.cranium.authority

import com.example.cranium.cognition.CognitiveAtom
import java.time.Instant

/**
 * A uniquely identified, version-bound request to alter the authority of a
 * cognitive atom.
 *
 * This object is the consumable state-change unit. It is NOT evidence.
 * It is NOT authorization. It describes the EXACT operation being attempted.
 *
 * Replay protection applies here. A previously committed equivalent request is
 * idempotently resolved to its original result. Reuse with a different canonical
 * payload is rejected as a conflict.
 *
 * [expectedStateVersion] is part of the canonical request hash and may not
 * be omitted or changed without producing a different operation identity.
 */
data class AuthorityTransitionRequest(
    val requestId: String,
    val subject: CognitiveAtom,
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
        require(idempotencyKey.isNotBlank()) { "idempotencyKey must not be blank" }
        require(expectedStateVersion >= 0) { "expectedStateVersion must be >= 0" }
        require(evidence.distinctBy { it.id }.size == evidence.size) {
            "evidence list must not contain duplicate EvidenceRef ids"
        }
    }
}
