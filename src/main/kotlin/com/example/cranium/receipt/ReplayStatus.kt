package com.example.cranium.receipt

/**
 * Replay/idempotency status of an authority transition request.
 *
 * Replay protection applies to transition requests, not to evidence.
 * Evidence references may be legitimately reused across cognitive cycles.
 *
 * [New]              — no prior committed record for this idempotency key.
 * [Existing]         — prior record exists with the SAME canonical hash;
 *                      original result is returned, no second commit.
 * [ConflictingReuse] — prior record exists but hash DIFFERS; attempt rejected.
 */
sealed interface ReplayStatus {

    data object New : ReplayStatus

    data class Existing(
        val transitionId: String,
        val requestHash: String
    ) : ReplayStatus

    data class ConflictingReuse(
        val existingRequestHash: String,
        val suppliedRequestHash: String
    ) : ReplayStatus
}
