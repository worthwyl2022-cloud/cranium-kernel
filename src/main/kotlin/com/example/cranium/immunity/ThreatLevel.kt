package com.example.cranium.immunity

/**
 * Severity classification for a detected threat.
 * Ordered from lowest to highest — ordinal comparisons are valid.
 */
enum class ThreatLevel {
    NONE,
    LOW,
    MODERATE,
    HIGH,
    CRITICAL
}
