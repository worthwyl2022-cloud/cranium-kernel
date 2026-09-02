package com.example.cranium.security

import com.example.cranium.authorization.AuthorizationDecision
import com.example.cranium.authority.*
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

/**
 * ATTACK-001 — Stale-state commit-boundary attack.
 *
 * Attacks the commit boundary in [KernelStateReducer], NOT the evaluation-time
 * check in [DefaultBoundaryValidator]. Both exist. This test proves the former.
 *
 * Attack scenario:
 *   - Request A evaluated against state V10 -> committed -> state becomes V11
 *   - Request B evaluated against state V10 -> never committed
 *   - Request B attempts to commit into V11
 *   - Expected: DENIED by version-binding guard in KernelStateReducer
 *   - State invariants: authorityVersion, authorityTransitionIds, atomsById unchanged
 *
 * Guard attribution:
 *   [staleFreshTransition] targets atom-b (distinct from committed atom-a) on an
 *   independent [InMemoryReplayGuard]. Its ID is guaranteed absent from
 *   stateV11.authorityTransitionIds. The precondition assertion makes this
 *   machine-readable. If [assertFailsWith] passes, the blocking condition is:
 *
 *       transition.evaluatedAuthorityVersion (10) != before.authorityVersion (11)
 *
 *   Not the duplicate-ID guard. Not an incidental mismatch.
 *
 * This test is permanent institutional memory.
 * It must never be deleted or weakened.
 * If it fails, the commit boundary has regressed.
 */
class StaleStateAttackTest {

    private val hasher = Sha256RequestHasher()

    private fun atomA() = CognitiveAtom(
        id = "atom-a",
        proposition = "factual claim A",
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

    private fun atomB() = CognitiveAtom(
        id = "atom-b",
        proposition = "factual claim B",
        kind = AtomKind.OBSERVATION,
        lane = CanonLane.ENTERPRISE_POLICY,
        confidence = 0.85,
        authorityClass = AuthorityClass.FACTUAL,
        authorityWeight = 0.75,
        provenance = Provenance.HUMAN_REVIEW,
        status = CognitiveStatus.ACTIVE,
        timestamp = Instant.parse("2026-08-31T21:00:01.000Z"),
        entropyScore = 0.12
    )

    private fun stateV10(atomA: CognitiveAtom, atomB: CognitiveAtom) = KernelState(
        executionId = "exec-stale-attack-001",
        state = ExecutionState.AUTHORITY_EVALUATED,
        cognitiveVersion = 1,
        authorityVersion = 10,
        canonVersion = 1,
        atomsById = mapOf(atomA.id to atomA, atomB.id to atomB),
        activeAtomIds = listOf(atomA.id, atomB.id),
        contradictionEventIds = emptyList(),
        authorityTransitionIds = emptyList(),
        deliberationStepIds = emptyList(),
        candidateHash = null,
        authorization = AuthorizationDecision(true, "ok"),
        threatAssessment = ThreatAssessment(false, "LOW", "ok")
    )

    private fun authorizedRequest(
        requestId: String,
        idempotencyKey: String,
        subjectId: String,
        expectedStateVersion: Long
    ): AuthorityTransitionRequest {
        val unsigned = AuthorityTransitionRequest(
            requestId = requestId,
            subjectId = subjectId,
            requestedAuthority = AuthorityLevel(AuthorityClass.ENTERPRISE, 0.9),
            evidence = listOf(EvidenceRef("ev-1", "prov-1", "hash-1", "source")),
            source = AuthoritySource.HUMAN_REVIEW,
            authorization = null,
            expectedStateVersion = expectedStateVersion,
            idempotencyKey = idempotencyKey,
            timestamp = Instant.parse("2026-08-31T21:00:00.000Z")
        )
        val hash = hasher.hash(unsigned)
        return unsigned.copy(
            authorization = TransitionAuthorization(
                authorizationId = "auth-$requestId",
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
    }

    @Test
    fun `reducer rejects transition evaluated against stale authority version`() {
        val atomA = atomA()
        val atomB = atomB()
        val engineA = DefaultAuthorityTransitionEngine(replayGuard = InMemoryReplayGuard())
        val engineB = DefaultAuthorityTransitionEngine(replayGuard = InMemoryReplayGuard())
        val reducer = KernelStateReducer()

        val stateV10 = stateV10(atomA, atomB)

        // Step 1: evaluate and commit requestA against V10 -> stateV11
        val requestA = authorizedRequest("req-a", "idem-a", atomA.id, 10)
        val firstTransition = engineA.evaluate(requestA, stateV10)
        assertEquals(10L, firstTransition.evaluatedAuthorityVersion)
        val stateV11 = reducer.reduce(stateV10, firstTransition)
        assertEquals(11L, stateV11.authorityVersion)

        // Step 2: evaluate requestB against the now-stale V10, never committed
        val requestB = authorizedRequest("req-b", "idem-b", atomB.id, 10)
        val staleFreshTransition = engineB.evaluate(requestB, stateV10)
        assertEquals(10L, staleFreshTransition.evaluatedAuthorityVersion)

        // Precondition: confirm the failure below cannot be the duplicate-ID guard.
        // If this assertion fails, the test fixture is broken — fix the fixture.
        assertTrue(
            staleFreshTransition.id !in stateV11.authorityTransitionIds,
            "Precondition failed: staleFreshTransition.id must not already be in stateV11."
        )

        // The version-binding guard must block the stale commit:
        //   staleFreshTransition.evaluatedAuthorityVersion (10) != stateV11.authorityVersion (11)
        assertFailsWith<IllegalArgumentException> {
            reducer.reduce(stateV11, staleFreshTransition)
        }

        // Full state integrity check after the rejected attempt
        assertEquals(11L, stateV11.authorityVersion)
        assertEquals(1, stateV11.authorityTransitionIds.size)
        assertTrue(firstTransition.id in stateV11.authorityTransitionIds)
        assertEquals(
            AuthorityClass.FACTUAL,
            stateV11.authorityOf(atomB.id).authorityClass,
            "atom-b authority must be unchanged after rejected stale commit"
        )
    }
}
