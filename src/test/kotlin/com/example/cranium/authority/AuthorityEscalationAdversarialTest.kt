package com.example.cranium.authority

import com.example.cranium.authorization.AuthorizationDecision
import com.example.cranium.canon.CanonLane
import com.example.cranium.cognition.*
import com.example.cranium.hash.Sha256RequestHasher
import com.example.cranium.immunity.ThreatAssessment
import com.example.cranium.kernel.ExecutionState
import com.example.cranium.kernel.KernelState
import com.example.cranium.kernel.KernelStateReducer
import com.example.cranium.replay.InMemoryReplayGuard
import java.time.Instant
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertNotEquals
import kotlin.test.assertTrue

class AuthorityEscalationAdversarialTest {

    private fun baseAtom() = CognitiveAtom(
        id = "atom-1",
        proposition = "enterprise proposition",
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

    private fun state(atom: CognitiveAtom = baseAtom()) = KernelState(
        executionId = "exec-1",
        state = ExecutionState.AUTHORITY_EVALUATED,
        cognitiveVersion = 1,
        authorityVersion = 5,
        canonVersion = 2,
        atomsById = mapOf(atom.id to atom),
        activeAtomIds = listOf(atom.id),
        contradictionEventIds = emptyList(),
        authorityTransitionIds = emptyList(),
        deliberationStepIds = emptyList(),
        candidateHash = null,
        authorization = AuthorizationDecision(true, "ok"),
        threatAssessment = ThreatAssessment(false, "LOW", "ok")
    )

    private val hasher = Sha256RequestHasher()

    @Test
    fun `signed factual request cannot become system authority by payload mutation`() {
        val replayGuard = InMemoryReplayGuard()
        val engine = DefaultAuthorityTransitionEngine(replayGuard = replayGuard)
        val before = state()

        val originalUnsigned = AuthorityTransitionRequest(
            requestId = "req-attack-1",
            subjectId = "atom-1",
            requestedAuthority = AuthorityLevel(AuthorityClass.FACTUAL, 0.8),
            evidence = listOf(EvidenceRef("ev-1", "prov-1", "hash-1", "source")),
            source = AuthoritySource.HUMAN_REVIEW,
            authorization = null,
            expectedStateVersion = 5,
            idempotencyKey = "idem-attack-1",
            timestamp = Instant.parse("2026-08-31T21:00:00.000Z")
        )
        val originalHash = hasher.hash(originalUnsigned)

        val authorizedOriginal = originalUnsigned.copy(
            authorization = TransitionAuthorization(
                authorizationId = "auth-1",
                authority = AuthoritySource.HUMAN_REVIEW,
                scope = AuthorizationScope(
                    allowedLanes = setOf(CanonLane.ENTERPRISE_POLICY.name),
                    allowedOperations = setOf("AUTHORITY_TRANSITION"),
                    maximumAuthorityClass = AuthorityClass.FACTUAL
                ),
                issuedAt = Instant.parse("2026-08-31T20:00:00.000Z"),
                expiresAt = Instant.parse("2026-08-31T22:00:00.000Z"),
                boundRequestHash = originalHash,
                signature = "opaque"
            )
        )

        val tampered = authorizedOriginal.copy(
            requestedAuthority = AuthorityLevel(AuthorityClass.SYSTEM, 1.0)
        )

        val tamperedHash = hasher.hash(tampered)
        assertNotEquals(originalHash, tamperedHash)

        val result = engine.evaluate(tampered, before)
        assertTrue(result.decision is TransitionDecision.Denied)
        assertFalse(result.boundary.passed)
        assertEquals(before.authorityVersion, result.evaluatedAuthorityVersion)

        val after = KernelStateReducer().reduce(before, result)
        assertEquals(before.authorityVersion, after.authorityVersion)
        assertEquals(before.canonVersion, after.canonVersion)
        assertEquals(AuthorityClass.FACTUAL, after.authorityOf("atom-1").authorityClass)
        assertTrue(after.authorityTransitionIds.isEmpty())
    }

    @Test
    fun `same identity and payload replay returns original result without second transition`() {
        val replayGuard = InMemoryReplayGuard()
        val engine = DefaultAuthorityTransitionEngine(replayGuard = replayGuard)
        val before = state()

        val unsigned = AuthorityTransitionRequest(
            requestId = "req-replay-1",
            subjectId = "atom-1",
            requestedAuthority = AuthorityLevel(AuthorityClass.ENTERPRISE, 0.9),
            evidence = listOf(EvidenceRef("ev-1", "prov-1", "hash-1", "source")),
            source = AuthoritySource.HUMAN_REVIEW,
            authorization = null,
            expectedStateVersion = 5,
            idempotencyKey = "idem-replay-1",
            timestamp = Instant.parse("2026-08-31T21:00:00.000Z")
        )
        val hash = hasher.hash(unsigned)
        val request = unsigned.copy(
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
                signature = "opaque"
            )
        )

        val first = engine.evaluate(request, before)
        assertTrue(first.decision is TransitionDecision.Granted)
        val committed = KernelStateReducer().reduce(before, first)
        replayGuard.record(request.requestId, request.idempotencyKey, first.requestHash, first)

        val replayed = engine.evaluate(request, committed)
        assertEquals(first.id, replayed.id)
        assertEquals(first.evaluatedAuthorityVersion, replayed.evaluatedAuthorityVersion)
        assertEquals(1, committed.authorityTransitionIds.size)
    }

    @Test
    fun `same identity and idempotency key with different payload is conflicting reuse`() {
        val replayGuard = InMemoryReplayGuard()
        val engine = DefaultAuthorityTransitionEngine(replayGuard = replayGuard)
        val before = state()

        val unsigned = AuthorityTransitionRequest(
            requestId = "req-conflict-1",
            subjectId = "atom-1",
            requestedAuthority = AuthorityLevel(AuthorityClass.ENTERPRISE, 0.9),
            evidence = listOf(EvidenceRef("ev-1", "prov-1", "hash-1", "source")),
            source = AuthoritySource.HUMAN_REVIEW,
            authorization = null,
            expectedStateVersion = 5,
            idempotencyKey = "idem-conflict-1",
            timestamp = Instant.parse("2026-08-31T21:00:00.000Z")
        )
        val hash = hasher.hash(unsigned)
        val request = unsigned.copy(
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
                signature = "opaque"
            )
        )

        val first = engine.evaluate(request, before)
        val committed = KernelStateReducer().reduce(before, first)
        replayGuard.record(request.requestId, request.idempotencyKey, first.requestHash, first)

        val tampered = request.copy(requestedAuthority = AuthorityLevel(AuthorityClass.SYSTEM, 1.0))
        val result = engine.evaluate(tampered, committed)
        assertTrue(result.decision is TransitionDecision.Denied)
        assertFalse(result.boundary.passed)
        assertTrue(BoundaryViolation.REPLAY_DETECTED in result.boundary.violations)

        val after = KernelStateReducer().reduce(committed, result)
        assertEquals(committed.authorityVersion, after.authorityVersion)
        assertEquals(committed.canonVersion, after.canonVersion)
        assertEquals(1, after.authorityTransitionIds.size)
    }
}
