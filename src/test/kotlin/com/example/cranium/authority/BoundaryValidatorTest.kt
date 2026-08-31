package com.example.cranium.authority

import com.example.cranium.authorization.AuthorizationDecision
import com.example.cranium.canon.CanonLane
import com.example.cranium.cognition.*
import com.example.cranium.hash.RequestHash
import com.example.cranium.immunity.ThreatAssessment
import com.example.cranium.kernel.ExecutionState
import com.example.cranium.kernel.KernelState
import com.example.cranium.replay.ReplayStatus
import java.time.Instant
import kotlin.test.Test
import kotlin.test.assertFalse
import kotlin.test.assertTrue

class BoundaryValidatorTest {

    private val atom = CognitiveAtom(
        id = "atom-1",
        proposition = "policy proposition",
        kind = AtomKind.OBSERVATION,
        lane = CanonLane.ENTERPRISE_POLICY,
        confidence = 0.9,
        authorityClass = AuthorityClass.FACTUAL,
        authorityWeight = 0.8,
        provenance = Provenance.HUMAN_REVIEW,
        status = CognitiveStatus.ACTIVE,
        timestamp = Instant.parse("2026-08-31T21:00:00.000Z"),
        entropyScore = 0.1
    )

    private fun state() = KernelState(
        executionId = "exec-1",
        state = ExecutionState.AUTHORITY_EVALUATED,
        cognitiveVersion = 1,
        authorityVersion = 3,
        canonVersion = 1,
        atomsById = mapOf(atom.id to atom),
        activeAtomIds = listOf(atom.id),
        contradictionEventIds = emptyList(),
        authorityTransitionIds = emptyList(),
        deliberationStepIds = emptyList(),
        candidateHash = null,
        authorization = AuthorizationDecision(true, "ok"),
        threatAssessment = ThreatAssessment(false, "LOW", "ok")
    )

    private fun request(hash: RequestHash) = AuthorityTransitionRequest(
        requestId = "req-1",
        subjectId = atom.id,
        requestedAuthority = AuthorityLevel(AuthorityClass.ENTERPRISE, 0.9),
        evidence = listOf(EvidenceRef("ev-1", "prov-1", "hash-1", "source")),
        source = AuthoritySource.HUMAN_REVIEW,
        authorization = TransitionAuthorization(
            authorizationId = "auth-1",
            authority = AuthoritySource.HUMAN_REVIEW,
            scope = AuthorizationScope(
                allowedLanes = setOf(CanonLane.ENTERPRISE_POLICY.name),
                allowedOperations = setOf("AUTHORITY_TRANSITION"),
                maximumAuthorityClass = AuthorityClass.ENTERPRISE
            ),
            issuedAt = Instant.parse("2026-08-31T20:00:00.000Z"),
            expiresAt = Instant.parse("2026-08-31T22:00:00.000Z"),
            boundRequestHash = hash,
            signature = "opaque-but-nonblank"
        ),
        expectedStateVersion = 3,
        idempotencyKey = "idem-1",
        timestamp = Instant.parse("2026-08-31T21:00:00.000Z")
    )

    @Test
    fun `valid request passes boundary`() {
        val hash = RequestHash("a".repeat(64))
        val assessment = DefaultBoundaryValidator().validate(
            request(hash), hash, state(), ReplayStatus.New
        )
        assertTrue(assessment.passed)
    }

    @Test
    fun `stale state is rejected`() {
        val hash = RequestHash("a".repeat(64))
        val stale = request(hash).copy(expectedStateVersion = 2)
        val assessment = DefaultBoundaryValidator().validate(stale, hash, state(), ReplayStatus.New)
        assertFalse(assessment.passed)
        assertTrue(BoundaryViolation.STALE_STATE in assessment.violations)
    }

    @Test
    fun `conflicting reuse is rejected`() {
        val hash = RequestHash("a".repeat(64))
        val assessment = DefaultBoundaryValidator().validate(
            request(hash), hash, state(), ReplayStatus.ConflictingReuse(RequestHash("b".repeat(64)))
        )
        assertFalse(assessment.passed)
        assertTrue(BoundaryViolation.REPLAY_DETECTED in assessment.violations)
    }

    @Test
    fun `mismatched authorization binding is rejected`() {
        val realHash = RequestHash("a".repeat(64))
        val wrongHash = RequestHash("b".repeat(64))
        val assessment = DefaultBoundaryValidator().validate(
            request(wrongHash), realHash, state(), ReplayStatus.New
        )
        assertFalse(assessment.passed)
        assertTrue(BoundaryViolation.INVALID_AUTHENTICITY in assessment.violations)
    }
}
