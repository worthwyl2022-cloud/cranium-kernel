package com.example.cranium.cognition

import com.example.cranium.canon.CanonLane
import java.time.Instant

/**
 * An immutable unit of governed cognition.
 *
 * Tracks five distinct dimensions:
 *   [kind]            — epistemic category
 *   [lane]            — jurisdiction
 *   [confidence]      — certainty in the proposition
 *   [authorityWeight] — current authority strength (not a self-grant permission)
 *   [provenance]      — origin
 *
 * These dimensions must not be conflated. A high-confidence retrieved document
 * does not automatically become an enterprise policy.
 */
data class CognitiveAtom(
    val id: String,
    val proposition: String,
    val kind: AtomKind,
    val lane: CanonLane,
    val confidence: Double,
    val authorityWeight: Double,
    val provenance: Provenance,
    val timestamp: Instant,
    val entropyScore: Double,
    val tags: Set<String> = emptySet(),
    val embeddingRef: String? = null,
    val metadata: Map<String, String> = emptyMap()
) {
    init {
        require(id.isNotBlank()) { "CognitiveAtom id must not be blank" }
        require(proposition.isNotBlank()) { "proposition must not be blank" }
        require(confidence in 0.0..1.0) { "confidence must be in [0.0, 1.0], got $confidence" }
        require(authorityWeight in 0.0..1.0) { "authorityWeight must be in [0.0, 1.0], got $authorityWeight" }
        require(entropyScore >= 0.0) { "entropyScore must be >= 0.0, got $entropyScore" }
    }
}
