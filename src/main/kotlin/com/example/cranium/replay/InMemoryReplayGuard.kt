package com.example.cranium.replay

import com.example.cranium.authority.AuthorityTransition
import com.example.cranium.hash.RequestHash
import java.util.concurrent.ConcurrentHashMap

class InMemoryReplayGuard : ReplayGuard {

    private data class CommittedRecord(
        val requestHash: RequestHash,
        val transitionId: String
    )

    private val index = ConcurrentHashMap<String, CommittedRecord>()
    private val transitions = ConcurrentHashMap<String, AuthorityTransition>()

    private fun key(requestId: String, idempotencyKey: String): String = "$requestId::$idempotencyKey"

    override fun inspect(
        requestId: String,
        idempotencyKey: String,
        canonicalRequestHash: RequestHash
    ): ReplayStatus {
        val existing = index[key(requestId, idempotencyKey)] ?: return ReplayStatus.New
        return if (existing.requestHash == canonicalRequestHash) {
            ReplayStatus.Existing(existing.transitionId, existing.requestHash)
        } else {
            ReplayStatus.ConflictingReuse(existing.requestHash)
        }
    }

    override fun loadCommittedTransition(transitionId: String): AuthorityTransition? = transitions[transitionId]

    override fun record(
        requestId: String,
        idempotencyKey: String,
        canonicalRequestHash: RequestHash,
        transition: AuthorityTransition
    ) {
        val k = key(requestId, idempotencyKey)
        index.compute(k) { _, current ->
            check(current == null || current.requestHash == canonicalRequestHash) {
                "Attempted to record a conflicting hash for identity $k"
            }
            current ?: CommittedRecord(canonicalRequestHash, transition.id)
        }
        transitions.putIfAbsent(transition.id, transition)
    }
}
