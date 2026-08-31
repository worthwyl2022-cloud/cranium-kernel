package com.example.cranium.authority

/**
 * The result of boundary validation for an [AuthorityTransitionRequest].
 *
 * [passed] is true only when there are zero violations.
 * [violations] is never empty when [passed] is false.
 * [explanation] is human-readable for receipts and audit logs.
 */
data class BoundaryAssessment(
    val passed: Boolean,
    val violations: Set<BoundaryViolation>,
    val evidenceRefs: List<String>,
    val explanation: String
) {
    init {
        require(passed || violations.isNotEmpty()) {
            "A failed BoundaryAssessment must contain at least one violation"
        }
        require(!passed || violations.isEmpty()) {
            "A passed BoundaryAssessment must contain no violations"
        }
    }

    companion object {
        fun passed(evidenceRefs: List<String>, explanation: String) =
            BoundaryAssessment(true, emptySet(), evidenceRefs, explanation)

        fun failed(
            violations: Set<BoundaryViolation>,
            evidenceRefs: List<String> = emptyList(),
            explanation: String
        ) = BoundaryAssessment(false, violations, evidenceRefs, explanation)
    }
}
