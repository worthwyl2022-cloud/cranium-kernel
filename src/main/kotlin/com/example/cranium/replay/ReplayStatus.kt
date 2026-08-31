package com.example.cranium.replay

import com.example.cranium.hash.RequestHash

/**
 * The replay/idempotency status of an authority transition request identity.
 *
 * ReplayGuard answers exactly one question: has this request identity and
 * canonical payload already been committed before?
 *
 * It does not decide authorization or grant authority.
 */
sealed interface ReplayStatus {

    data object New : ReplayStatus

    data class Existing(
        val transitionId: String,
        val originalRequestHash: RequestHash
    ) : ReplayStatus

    data class ConflictingReuse(
        val originalRequestHash: RequestHash
    ) : ReplayStatus
}
