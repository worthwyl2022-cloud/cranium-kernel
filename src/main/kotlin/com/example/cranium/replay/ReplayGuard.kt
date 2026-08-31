package com.example.cranium.replay

import com.example.cranium.authority.AuthorityTransition
import com.example.cranium.hash.RequestHash

interface ReplayGuard {
    fun inspect(
        requestId: String,
        idempotencyKey: String,
        canonicalRequestHash: RequestHash
    ): ReplayStatus

    fun loadCommittedTransition(transitionId: String): AuthorityTransition?

    fun record(
        requestId: String,
        idempotencyKey: String,
        canonicalRequestHash: RequestHash,
        transition: AuthorityTransition
    )
}
