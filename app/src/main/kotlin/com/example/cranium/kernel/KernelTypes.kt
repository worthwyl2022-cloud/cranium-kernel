package com.example.cranium.kernel

enum class AuthorityClass(val rank: Int) {
    HYPOTHETICAL(0),
    WORKING(1),
    USER(2),
    FACTUAL(3),
    ENTERPRISE(4),
    SYSTEM(5)
}

data class AuthorityLevel(
    val authorityClass: AuthorityClass,
    val weight: Double
) {
    init {
        require(weight in 0.0..1.0) { "Authority weight must be in [0.0, 1.0], got $weight" }
    }

    fun dominates(other: AuthorityLevel): Boolean =
        authorityClass.rank > other.authorityClass.rank ||
            (authorityClass == other.authorityClass && weight > other.weight)

    companion object {
        val NONE = AuthorityLevel(AuthorityClass.HYPOTHETICAL, 0.0)
    }
}

enum class AtomKind {
    DIRECTIVE,
    FACT,
    HYPOTHESIS,
    CONSTRAINT,
    INTENT,
    DELIBERATION
}

enum class CognitiveStatus {
    PROVISIONAL,
    ACTIVE,
    COMMITTED,
    QUARANTINED,
    REVOKED
}

data class Provenance(
    val source: String,
    val authorId: String,
    val sourceTimestamp: Long,
    val evidenceUri: String? = null,
    val modelSignature: String? = null
)

data class CognitiveAtom(
    val id: String,
    val kind: AtomKind,
    val status: CognitiveStatus,
    val content: String,
    val authority: AuthorityLevel,
    val provenance: Provenance,
    val createdAt: Long,
    val tags: List<String> = emptyList()
)

data class EvidenceRef(
    val id: String,
    val uri: String,
    val sha256Digest: String,
    val verified: Boolean,
    val description: String
)

data class AuthorityTransitionRequest(
    val requestId: String,
    val idempotencyKey: String,
    val subjectId: String,
    val requestedAuthority: AuthorityLevel,
    val evidence: List<EvidenceRef>,
    val justification: String,
    val requesterId: String,
    val timestamp: Long,
    val targetAuthorityVersion: Long
)

data class RequestHash(
    val algorithm: String,
    val hexDigest: String,
    val canonicalString: String
)

sealed interface ReplayStatus {
    data object New : ReplayStatus
    data class Existing(val transitionId: String, val cachedTimestamp: Long) : ReplayStatus
    data class ConflictingReuse(val reason: String, val priorHash: String, val attemptedHash: String) : ReplayStatus
}

enum class BoundaryViolation {
    MISSING_SUBJECT,
    INVALID_AUTHORITY_JUMP,
    DEGRADATION_WITHOUT_REASON,
    CORRUPTED_HASH,
    INSUFFICIENT_EVIDENCE,
    REPLAY_CONFLICT,
    CONSTITUTION_VIOLATION,
    STALE_AUTHORITY_VERSION,
    UNAUTHORIZED_REQUESTER,
    INVALID_REQUEST
}

data class BoundaryAssessment(
    val passed: Boolean,
    val violations: Set<BoundaryViolation>,
    val evidenceRefs: List<String>,
    val explanation: String,
    val checkedRules: List<String>
)

sealed interface TransitionDecision {
    data class Granted(val grantedAuthority: AuthorityLevel, val rationale: String) : TransitionDecision
    data class Denied(val reason: String, val violationCode: BoundaryViolation? = null) : TransitionDecision
}

data class AuthorityTransition(
    val id: String,
    val subjectAtomId: String,
    val sourceAuthority: AuthorityLevel,
    val requestedAuthority: AuthorityLevel,
    val evaluatedAuthorityVersion: Long,
    val decision: TransitionDecision,
    val boundary: BoundaryAssessment,
    val evidenceRefs: List<String>,
    val requestHash: RequestHash,
    val timestamp: Long,
    val receiptSignature: String
)

enum class ExecutionState {
    INITIALIZING,
    READY,
    EVALUATING,
    COMMITTING,
    FROZEN
}

data class ConstitutionalPrinciple(
    val id: String,
    val title: String,
    val category: String,
    val clause: String,
    val invariantRule: String,
    val enforced: Boolean = true
)

data class CanonEntry(
    val id: String,
    val topic: String,
    val statement: String,
    val sourceAuthority: AuthorityLevel,
    val lockedAt: Long,
    val immutable: Boolean = true,
    val provenance: String
)

data class ThreatAssessment(
    val threatLevel: String = "NOMINAL",
    val suspectedVectors: List<String> = emptyList(),
    val replayAttemptsBlocked: Int = 0,
    val boundaryAnomaliesCount: Int = 0,
    val lastIncidentTimestamp: Long? = null
)

data class KernelState(
    val executionId: String,
    val state: ExecutionState,
    val cognitiveVersion: Long,
    val authorityVersion: Long,
    val canonVersion: Long,
    val atomsById: Map<String, CognitiveAtom>,
    val activeAtomIds: List<String>,
    val candidateHash: String?,
    val threatAssessment: ThreatAssessment,
    val transitions: List<AuthorityTransition>,
    val canonEntries: List<CanonEntry>,
    val constitutionalPrinciples: List<ConstitutionalPrinciple>
)
