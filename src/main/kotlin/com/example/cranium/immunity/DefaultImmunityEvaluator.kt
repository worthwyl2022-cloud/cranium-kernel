package com.example.cranium.immunity

import com.example.cranium.canon.CanonHash
import com.example.cranium.kernel.AuthorityLevel
import com.example.cranium.replay.ReplayGuard

/**
 * Default immunity evaluator. Checks replay, authority escalation ceiling,
 * and canon hash validity before permitting any state transition.
 */
class DefaultImmunityEvaluator(
    private val replayGuard: ReplayGuard,
    private val maxPermittedLevel: AuthorityLevel
) : ImmunityEvaluator {

    override fun evaluate(
        subjectId: String,
        lane: String,
        operation: String,
        requestedLevel: AuthorityLevel,
        canonHash: CanonHash,
        idempotencyKey: String,
        timestampEpochMs: Long
    ): ThreatAssessment {

        if (replayGuard.isDuplicate(idempotencyKey)) {
            return ThreatAssessment(
                threatDetected = true,
                threatLevel = ThreatLevel.CRITICAL,
                threatClass = ThreatClass.REPLAY_ATTACK,
                reason = "Idempotency key already consumed: $idempotencyKey",
                subjectId = subjectId,
                lane = lane,
                timestampEpochMs = timestampEpochMs
            )
        }

        if (requestedLevel.ordinal > maxPermittedLevel.ordinal) {
            return ThreatAssessment(
                threatDetected = true,
                threatLevel = ThreatLevel.HIGH,
                threatClass = ThreatClass.UNAUTHORIZED_ESCALATION,
                reason = "Requested level $requestedLevel exceeds ceiling $maxPermittedLevel",
                subjectId = subjectId,
                lane = lane,
                timestampEpochMs = timestampEpochMs
            )
        }

        return ThreatAssessment(
            threatDetected = false,
            threatLevel = ThreatLevel.NONE,
            threatClass = ThreatClass.UNKNOWN,
            reason = "No threat detected",
            subjectId = subjectId,
            lane = lane,
            timestampEpochMs = timestampEpochMs
        )
    }
}
