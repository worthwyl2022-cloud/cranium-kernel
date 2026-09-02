package com.example.cranium.immunity

import com.example.cranium.canon.CanonHash
import com.example.cranium.kernel.AuthorityLevel

/**
 * Evaluates a cognition request for threats before any state transition is permitted.
 * Must be called by the kernel before authorization is attempted.
 */
interface ImmunityEvaluator {
    fun evaluate(
        subjectId: String,
        lane: String,
        operation: String,
        requestedLevel: AuthorityLevel,
        canonHash: CanonHash,
        idempotencyKey: String,
        timestampEpochMs: Long
    ): ThreatAssessment
}
