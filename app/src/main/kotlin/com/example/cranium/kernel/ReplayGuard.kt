package com.example.cranium.kernel

class InMemoryReplayGuard {
    data class Entry(
        val requestId: String,
        val idempotencyKey: String,
        val canonicalRequestHashHex: String,
        val transitionId: String,
        val timestamp: Long
    )

    private val entriesByRequestId = mutableMapOf<String, Entry>()
    private val entriesByIdempotencyKey = mutableMapOf<String, Entry>()
    private val transitionsById = mutableMapOf<String, AuthorityTransition>()

    fun inspect(
        requestId: String,
        idempotencyKey: String,
        canonicalRequestHash: RequestHash
    ): ReplayStatus {
        val byId = entriesByRequestId[requestId]
        val byKey = entriesByIdempotencyKey[idempotencyKey]

        if (byId == null && byKey == null) {
            return ReplayStatus.New
        }

        if (byId != null && byId.idempotencyKey == idempotencyKey && byId.canonicalRequestHashHex == canonicalRequestHash.hexDigest) {
            return ReplayStatus.Existing(byId.transitionId, byId.timestamp)
        }

        if (byKey != null && byKey.requestId == requestId && byKey.canonicalRequestHashHex == canonicalRequestHash.hexDigest) {
            return ReplayStatus.Existing(byKey.transitionId, byKey.timestamp)
        }

        val conflictReason = if (byId != null) {
            "RequestId '$requestId' previously used with hash '${byId.canonicalRequestHashHex}' (attempted '${canonicalRequestHash.hexDigest}')"
        } else {
            "IdempotencyKey '$idempotencyKey' previously used with hash '${byKey?.canonicalRequestHashHex}' (attempted '${canonicalRequestHash.hexDigest}')"
        }

        return ReplayStatus.ConflictingReuse(
            reason = conflictReason,
            priorHash = byId?.canonicalRequestHashHex ?: byKey?.canonicalRequestHashHex ?: "",
            attemptedHash = canonicalRequestHash.hexDigest
        )
    }

    fun record(
        requestId: String,
        idempotencyKey: String,
        canonicalRequestHash: RequestHash,
        transition: AuthorityTransition
    ) {
        val entry = Entry(
            requestId = requestId,
            idempotencyKey = idempotencyKey,
            canonicalRequestHashHex = canonicalRequestHash.hexDigest,
            transitionId = transition.id,
            timestamp = System.currentTimeMillis()
        )
        entriesByRequestId[requestId] = entry
        entriesByIdempotencyKey[idempotencyKey] = entry
        transitionsById[transition.id] = transition
    }

    fun loadCommittedTransition(transitionId: String): AuthorityTransition? = transitionsById[transitionId]

    fun getAllEntries(): List<Entry> = entriesByRequestId.values.toList()

    fun clear() {
        entriesByRequestId.clear()
        entriesByIdempotencyKey.clear()
        transitionsById.clear()
    }
}
