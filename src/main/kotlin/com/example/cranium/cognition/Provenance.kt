package com.example.cranium.cognition

/**
 * The origin of a cognitive atom.
 *
 * Provenance is a first-class value inspected during boundary validation.
 * A richer provenance value object is a future extension, not a v1 prerequisite.
 */
enum class Provenance {
    SYSTEM,
    ENTERPRISE_POLICY,
    HUMAN_REVIEW,
    USER,
    MODEL,
    RETRIEVED_INFORMATION,
    INTERNAL_ENGINE,
    DERIVED
}
