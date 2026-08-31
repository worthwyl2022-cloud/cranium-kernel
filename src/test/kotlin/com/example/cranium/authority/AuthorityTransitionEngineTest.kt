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
import kotlin.test.assertFailsWith
import kotlin.test.assertTrue

class AuthorityTransitionEngineTest {

    private fun atom() = CognitiveAtom(
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

    private fun state(atom: CognitiveAtom) = KernelState(
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

    private fun request(hash: com.example.cranium.hash.RequestHash) = AuthorityTransitionRequest(
        requestId = "req-1",
        subjectId = "atom-1",
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
            signature = "opaque"
        ),
        expectedStateVersion = 3,
        idempotencyKey = "idem-1",
        timestamp = Instant.parse("2026-08-31T21:00:00.000Z")
    )

    @Test
    fun `valid admissible request can be granted and reduced`() {
        val replayGuard = InMemoryReplayGuard()
        val hasher = Sha256RequestHasher()
        val baseRequest = AuthorityTransitionRequest(
            requestId = "req-1",
            subjectId = "atom-1",
            requestedAuthority = AuthorityLevel(AuthorityClass.ENTERPRISE, 0.9),
            evidence = listOf(EvidenceRef("ev-1", "prov-1", "hash-1", "source")),
            source = AuthoritySource.HUMAN_REVIEW,
            authorization = null,
            expectedStateVersion = 3,
            idempotencyKey = "idem-1",
            timestamp = Instant.parse("2026-08-31T21:00:00.000Z")
        )
        val realHash = hasher.hash(baseRequest)
        val fullRequest = request(realHash)
        val engine = DefaultAuthorityTransitionEngine(replayGuard = replayGuard)
        val before = state(atom())

        val transition = engine.evaluate(fullRequest, before)
        assertTrue(transition.decision is TransitionDecision.Granted)
        assertEquals(before.authorityVersion, transition.evaluatedAuthorityVersion)

        val after = KernelStateReducer().reduce(before, transition)
        assertEquals(before.authorityVersion + 1, after.authorityVersion)
        assertEquals(AuthorityClass.ENTERPRISE, after.authorityOf("atom-1").authorityClass)
        assertEquals(before.canonVersion, after.canonVersion)
    }

    @Test
    fun `existing replay returns original transition and is not reduced again`() {
        val replayGuard = InMemoryReplayGuard()
        val hasher = Sha256RequestHasher()
        val baseRequest = AuthorityTransitionRequest(
            requestId = "req-1",
            subjectId = "atom-1",
            requestedAuthority = AuthorityLevel(AuthorityClass.ENTERPRISE, 0.9),
            evidence = listOf(EvidenceRef("ev-1", "prov-1", "hash-1", "source")),
            source = AuthoritySource.HUMAN_REVIEW,
            authorization = null,
            expectedStateVersion = 3,
            idempotencyKey = "idem-1",
            timestamp = Instant.parse("2026-08-31T21:00:00.000Z")
        )
        val realHash = hasher.hash(baseRequest)
        val fullRequest = request(realHash)
        val engine = DefaultAuthorityTransitionEngine(replayGuard = replayGuard)
        val before = state(atom())

        val first = engine.evaluate(fullRequest, before)
        val committed = KernelStateReducer().reduce(before, first)
        replayGuard.record(fullRequest.requestId, fullRequest.idempotencyKey, first.requestHash, first)

        val replayed = engine.evaluate(fullRequest, committed)
        assertEquals(first.id, replayed.id)
        assertEquals(first.evaluatedAuthorityVersion, replayed.evaluatedAuthorityVersion)
        assertEquals(1, committed.authorityTransitionIds.size)
    }

    @Test
    fun `reducer rejects duplicate commitment of same transition id`() {
        val replayGuard = InMemoryReplayGuard()
        val hasher = Sha256RequestHasher()
        val baseRequest = AuthorityTransitionRequest(
            requestId = "req-1",
            subjectId = "atom-1",
            requestedAuthority = AuthorityLevel(AuthorityClass.ENTERPRISE, 0.9),
            evidence = listOf(EvidenceRef("ev-1", "prov-1", "hash-1", "source")),
            source = AuthoritySource.HUMAN_REVIEW,
            authorization = null,
            expectedStateVersion = 3,
            idempotencyKey = "idem-1",
            timestamp = Instant.parse("2026-08-31T21:00:00.000Z")
        )
        val realHash = hasher.hash(baseRequest)
        val fullRequest = request(realHash)
        val engine = DefaultAuthorityTransitionEngine(replayGuard = replayGuard)
        val before = state(atom())

        val first = engine.evaluate(fullRequest, before)
        val committed = KernelStateReducer().reduce(before, first)

        assertFailsWith<IllegalArgumentException> {
            KernelStateReducer().reduce(committed, first)
        }
    }

    @Test
    fun `reducer rejects transition evaluated against different authority version`() {
        val replayGuard = InMemoryReplayGuard()
        val hasher = Sha256RequestHasher()
        val baseRequest = AuthorityTransitionRequest(
            requestId = "req-1",
            subjectId = "atom-1",
            requestedAuthority = AuthorityLevel(AuthorityClass.ENTERPRISE, 0.9),
            evidence = listOf(EvidenceRef("ev-1", "prov-1", "hash-1", "source")),
            source = AuthoritySource.HUMAN_REVIEW,
            authorization = null,
            expectedStateVersion = 3,
            idempotencyKey = "idem-1",
            timestamp = Instant.parse("2026-08-31T21:00:00.000Z")
        )
        val realHash = hasher.hash(baseRequest)
        val fullRequest = request(realHash)
        val engine = DefaultAuthorityTransitionEngine(replayGuard = replayGuard)
        val before = state(atom())

        val transition = engine.evaluate(fullRequest, before)
        val newerState = before.copy(authorityVersion = before.authorityVersion + 1)

        assertFailsWith<IllegalArgumentException> {
            KernelStateReducer().reduce(newerState, transition)
        }
    }
}
