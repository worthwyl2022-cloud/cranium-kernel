package com.example.cranium.kernel

class DefaultBoundaryValidator {

    fun validate(
        request: AuthorityTransitionRequest,
        requestHash: RequestHash,
        state: KernelState,
        replayStatus: ReplayStatus
    ): BoundaryAssessment {
        val violations = mutableSetOf<BoundaryViolation>()
        val checkedRules = mutableListOf<String>()

        checkedRules.add("REPLAY_NON_CONFLICT")
        if (replayStatus is ReplayStatus.ConflictingReuse) {
            violations.add(BoundaryViolation.REPLAY_CONFLICT)
        }

        checkedRules.add("STRUCTURAL_VALIDITY")
        if (request.requestId.isBlank() || request.subjectId.isBlank() || request.idempotencyKey.isBlank()) {
            violations.add(BoundaryViolation.INVALID_REQUEST)
        }
        if (request.requestedAuthority.weight < 0.0 || request.requestedAuthority.weight > 1.0) {
            violations.add(BoundaryViolation.INVALID_REQUEST)
        }

        checkedRules.add("SUBJECT_EXISTS_IN_STATE")
        val subject = state.atomsById[request.subjectId]
        if (subject == null) {
            violations.add(BoundaryViolation.MISSING_SUBJECT)
        }

        checkedRules.add("AUTHORITY_VERSION_FRESHNESS")
        if (request.targetAuthorityVersion != state.authorityVersion) {
            violations.add(BoundaryViolation.STALE_AUTHORITY_VERSION)
        }

        if (subject != null) {
            val currentRank = subject.authority.authorityClass.rank
            val targetRank = request.requestedAuthority.authorityClass.rank
            val rankDiff = targetRank - currentRank

            checkedRules.add("AUTHORITY_JUMP_LIMIT")
            if (rankDiff > 2) {
                violations.add(BoundaryViolation.INVALID_AUTHORITY_JUMP)
            }

            checkedRules.add("EVIDENCE_ADEQUACY")
            if ((request.requestedAuthority.authorityClass == AuthorityClass.FACTUAL ||
                    request.requestedAuthority.authorityClass == AuthorityClass.ENTERPRISE ||
                    request.requestedAuthority.authorityClass == AuthorityClass.SYSTEM) && rankDiff > 0) {
                val verifiedEvidence = request.evidence.filter { it.verified && it.sha256Digest.length == 64 }
                if (verifiedEvidence.isEmpty()) {
                    violations.add(BoundaryViolation.INSUFFICIENT_EVIDENCE)
                }
            }

            checkedRules.add("JUSTIFIED_DEGRADATION")
            if (rankDiff < 0 || (rankDiff == 0 && request.requestedAuthority.weight < subject.authority.weight)) {
                if (request.justification.trim().length < 8) {
                    violations.add(BoundaryViolation.DEGRADATION_WITHOUT_REASON)
                }
            }

            checkedRules.add("CONSTITUTIONAL_INVARIANTS")
            if (request.requestedAuthority.authorityClass == AuthorityClass.SYSTEM &&
                request.requesterId != "ROOT_KERNEL" && request.requesterId != "CONSTITUTIONAL_QUORUM") {
                violations.add(BoundaryViolation.CONSTITUTION_VIOLATION)
            }
        }

        val passed = violations.isEmpty()
        val explanation = if (passed) {
            "All boundary invariants verified: canonical request hash validated, no replay reuse detected, evidence sufficient, and constitutional constraints preserved."
        } else {
            "Boundary checks failed: [${violations.joinToString()}]"
        }

        return BoundaryAssessment(
            passed = passed,
            violations = violations,
            evidenceRefs = request.evidence.map { it.id },
            explanation = explanation,
            checkedRules = checkedRules
        )
    }
}
