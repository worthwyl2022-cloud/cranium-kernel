package com.example.cranium.authority

/**
 * A reference to evidence supporting an authority transition request.
 *
 * Evidence explains WHY a proposition should be considered.
 * It is NOT an authorization token and NOT single-use.
 *
 * [contentHash] identifies the artifact. The same evidence may legitimately
 * support multiple deliberations across multiple cognitive cycles.
 * Replay protection applies to transition requests, not evidence references.
 */
data class EvidenceRef(
    val id: String,
    val provenanceId: String,
    val contentHash: String,
    val sourceDescription: String
) {
    init {
        require(id.isNotBlank()) { "EvidenceRef id must not be blank" }
        require(provenanceId.isNotBlank()) { "EvidenceRef provenanceId must not be blank" }
        require(contentHash.isNotBlank()) { "EvidenceRef contentHash must not be blank" }
    }
}
