package com.example.cranium.kernel

object CanonLane {

    data class ContradictionResult(
        val hasClash: Boolean,
        val severity: String,
        val conflictingCanonTopic: String? = null,
        val clashExplanation: String? = null,
        val confidenceScore: Double = 0.0
    )

    fun evaluateContradiction(candidateText: String, canonEntries: List<CanonEntry>): ContradictionResult {
        val lower = candidateText.lowercase()

        for (canon in canonEntries) {
            val lowerCanon = canon.statement.lowercase()

            if ((lower.contains("proven better canon recall than rag") ||
                    lower.contains("superiority over rag proven") ||
                    lower.contains("outperforms naive rag 100%")) &&
                canon.topic.contains("Canon vs RAG")) {
                return ContradictionResult(
                    hasClash = true,
                    severity = "DEFINITE_CONTRADICTION",
                    conflictingCanonTopic = canon.topic,
                    clashExplanation = "Direct violation of frozen Canon: Comparative canon superiority is explicitly unproven pending frozen real-model harness. Unverified marketing claims are barred.",
                    confidenceScore = 0.98
                )
            }

            if ((lower.contains("treat identity as regular chat history") ||
                    lower.contains("discard user intent in prompt window") ||
                    lower.contains("intent is ephemeral context")) &&
                canon.topic.contains("Identity")) {
                return ContradictionResult(
                    hasClash = true,
                    severity = "DEFINITE_CONTRADICTION",
                    conflictingCanonTopic = canon.topic,
                    clashExplanation = "Violates Canon constraint: Human identity and intent are first-class sovereign constraints, not transient context.",
                    confidenceScore = 0.94
                )
            }
        }

        return ContradictionResult(hasClash = false, severity = "NONE", confidenceScore = 0.1)
    }
}
