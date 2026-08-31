package com.example.cranium.cognition

/**
 * The epistemic kind of a cognitive atom.
 *
 * Distinct from [Provenance] (where it came from) and from
 * [com.example.cranium.canon.CanonLane] (what jurisdiction it belongs to).
 * These three dimensions must not be conflated.
 */
enum class AtomKind {
    AXIOM,
    OBSERVATION,
    INFERENCE,
    DELIBERATED_CONCLUSION,
    RETRIEVED_INFORMATION,
    USER_PREFERENCE,
    WORKING_MEMORY,
    HYPOTHETICAL
}
