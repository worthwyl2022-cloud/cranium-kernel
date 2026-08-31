package com.example.cranium.cognition

import com.example.cranium.authority.AuthorityClass
import com.example.cranium.authority.AuthorityLevel
import com.example.cranium.canon.CanonLane
import java.time.Instant

/**
 * An immutable unit of governed cognition.
 *
 * Tracks distinct dimensions:
 *   [kind]            — epistemic category
 *   [lane]            — jurisdiction
 *   [confidence]      — certainty in the proposition
 *   [authorityClass]  — current jurisdictional authority class
 *   [authorityWeight] — current authority strength within that class
 *   [provenance]      — origin
 *   [status]          — operational lifecycle state
 *
 * Authority is descriptive state here, not permission. The only legitimate
 * way authority changes is through an [com.example.cranium.authority.AuthorityTransition]
 * applied by the governed commit path.
 */
data class CognitiveAtom(
    val id: String,
    val proposition: String,
    val kind: AtomKind,
    val lane: CanonLane,
    val confidence: Double,
    val authorityClass: AuthorityClass,
    val authorityWeight: Double,
    val provenance: Provenance,
    val status: CognitiveStatus,
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

    fun authorityLevel(): AuthorityLevel = AuthorityLevel(authorityClass, authorityWeight)
}
