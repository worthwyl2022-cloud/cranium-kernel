package com.example.cranium.immunity

/**
 * Result of evaluating a cognition cycle or transition request for threats.
 * Replaces the v1 stub with a properly typed contract.
 */
data class ThreatAssessment(
    val threatDetected: Boolean,
    val threatLevel: ThreatLevel,
    val threatClass: ThreatClass,
    val reason: String,
    val subjectId: String,
    val lane: String,
    val timestampEpochMs: Long
)
