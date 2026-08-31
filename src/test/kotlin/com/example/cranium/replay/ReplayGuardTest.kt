package com.example.cranium.replay

import com.example.cranium.authority.*
import com.example.cranium.hash.RequestHash
import java.time.Instant
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class ReplayGuardTest {

    @Test
    fun `new identity returns New`() {
        val guard = InMemoryReplayGuard()
        val status = guard.inspect("req-1", "idem-1", RequestHash("a".repeat(64)))
        assertEquals(ReplayStatus.New, status)
    }

    @Test
    fun `same identity and hash returns Existing`() {
        val guard = InMemoryReplayGuard()
        val transition = AuthorityTransition(
            id = "tx-1",
            subjectAtomId = "atom-1",
            sourceAuthority = AuthorityLevel(AuthorityClass.WORKING, 0.2),
            requestedAuthority = AuthorityLevel(AuthorityClass.FACTUAL, 0.8),
            evaluatedAuthorityVersion = 7,
            decision = TransitionDecision.Granted(AuthorityLevel(AuthorityClass.FACTUAL, 0.8)),
            boundary = BoundaryAssessment.passed(emptyList(), "ok"),
            evidenceRefs = emptyList(),
            requestHash = RequestHash("a".repeat(64)),
            timestamp = Instant.parse("2026-08-31T21:00:00.000Z")
        )
        guard.record("req-1", "idem-1", RequestHash("a".repeat(64)), transition)

        val status = guard.inspect("req-1", "idem-1", RequestHash("a".repeat(64)))
        assertTrue(status is ReplayStatus.Existing)
        assertEquals("tx-1", status.transitionId)
    }

    @Test
    fun `same identity and different hash returns ConflictingReuse`() {
        val guard = InMemoryReplayGuard()
        val transition = AuthorityTransition(
            id = "tx-1",
            subjectAtomId = "atom-1",
            sourceAuthority = AuthorityLevel(AuthorityClass.WORKING, 0.2),
            requestedAuthority = AuthorityLevel(AuthorityClass.FACTUAL, 0.8),
            evaluatedAuthorityVersion = 7,
            decision = TransitionDecision.Granted(AuthorityLevel(AuthorityClass.FACTUAL, 0.8)),
            boundary = BoundaryAssessment.passed(emptyList(), "ok"),
            evidenceRefs = emptyList(),
            requestHash = RequestHash("a".repeat(64)),
            timestamp = Instant.parse("2026-08-31T21:00:00.000Z")
        )
        guard.record("req-1", "idem-1", RequestHash("a".repeat(64)), transition)

        val status = guard.inspect("req-1", "idem-1", RequestHash("b".repeat(64)))
        assertTrue(status is ReplayStatus.ConflictingReuse)
        assertEquals(RequestHash("a".repeat(64)), status.originalRequestHash)
    }
}
