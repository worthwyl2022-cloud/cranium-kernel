package com.example.cranium.hash

import com.example.cranium.authority.*
import java.time.Instant
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotEquals

/**
 * Security contract tests for [Sha256RequestHasher].
 *
 * These tests use the REAL [AuthorityTransitionRequestEncoder] and the
 * REAL SHA-256 implementation. No mocks. No fake hashers. No predetermined
 * return values. The Verification Integrity Rule is in effect.
 *
 * If any test here passes because a mock returned the expected hash,
 * it is not a security test — it is a test that the mock was set up
 * correctly. Those are different things.
 */
class Sha256RequestHasherTest {

    private val hasher = Sha256RequestHasher()

    private val baseRequest = AuthorityTransitionRequest(
        requestId = "req-001",
        subjectId = "atom-alpha",
        requestedAuthority = AuthorityLevel(AuthorityClass.FACTUAL, 0.8),
        evidence = listOf(
            EvidenceRef(
                id = "ev-001",
                provenanceId = "prov-001",
                contentHash = "aabbcc",
                sourceDescription = "peer-reviewed source"
            )
        ),
        source = AuthoritySource.HUMAN_REVIEW,
        authorization = null,
        expectedStateVersion = 7L,
        idempotencyKey = "idem-abc",
        timestamp = Instant.parse("2026-08-31T21:00:00.000Z")
    )

    @Test
    fun `same request always produces same hash`() {
        val h1 = hasher.hash(baseRequest)
        val h2 = hasher.hash(baseRequest)
        assertEquals(h1, h2,
            "Determinism violated: same request produced different hashes")
    }

    @Test
    fun `hash is 64 hex characters`() {
        val h = hasher.hash(baseRequest)
        assertEquals(64, h.hex.length,
            "SHA-256 must produce a 64-character hex string")
        assert(h.hex.all { it.isDigit() || it in 'a'..'f' }) {
            "RequestHash must be lowercase hex"
        }
    }

    @Test
    fun `altering requestedAuthority class changes hash`() {
        val altered = baseRequest.copy(
            requestedAuthority = AuthorityLevel(AuthorityClass.SYSTEM, 0.8)
        )
        assertNotEquals(hasher.hash(baseRequest), hasher.hash(altered),
            "Changing requestedAuthorityClass must produce a different hash")
    }

    @Test
    fun `altering requestedAuthority weight changes hash`() {
        val altered = baseRequest.copy(
            requestedAuthority = AuthorityLevel(AuthorityClass.FACTUAL, 0.9)
        )
        assertNotEquals(hasher.hash(baseRequest), hasher.hash(altered),
            "Changing requestedAuthorityWeight must produce a different hash")
    }

    @Test
    fun `altering subjectId changes hash`() {
        val altered = baseRequest.copy(subjectId = "atom-beta")
        assertNotEquals(hasher.hash(baseRequest), hasher.hash(altered),
            "Changing subjectId must produce a different hash")
    }

    @Test
    fun `altering expectedStateVersion changes hash`() {
        val altered = baseRequest.copy(expectedStateVersion = 8L)
        assertNotEquals(hasher.hash(baseRequest), hasher.hash(altered),
            "Changing expectedStateVersion must produce a different hash")
    }

    @Test
    fun `altering idempotencyKey changes hash`() {
        val altered = baseRequest.copy(idempotencyKey = "idem-xyz")
        assertNotEquals(hasher.hash(baseRequest), hasher.hash(altered),
            "Changing idempotencyKey must produce a different hash")
    }

    @Test
    fun `altering source changes hash`() {
        val altered = baseRequest.copy(source = AuthoritySource.MODEL)
        assertNotEquals(hasher.hash(baseRequest), hasher.hash(altered),
            "Changing source must produce a different hash")
    }

    @Test
    fun `altering evidence set changes hash`() {
        val altered = baseRequest.copy(
            evidence = baseRequest.evidence + EvidenceRef(
                id = "ev-002",
                provenanceId = "prov-002",
                contentHash = "ddeeff",
                sourceDescription = "second source"
            )
        )
        assertNotEquals(hasher.hash(baseRequest), hasher.hash(altered),
            "Adding evidence must produce a different hash")
    }

    @Test
    fun `evidence ordering does not affect hash`() {
        val ev1 = EvidenceRef("ev-aaa", "prov-1", "hash1", "source1")
        val ev2 = EvidenceRef("ev-bbb", "prov-2", "hash2", "source2")
        val r1 = baseRequest.copy(evidence = listOf(ev1, ev2))
        val r2 = baseRequest.copy(evidence = listOf(ev2, ev1))
        assertEquals(hasher.hash(r1), hasher.hash(r2),
            "Evidence list ordering must not affect canonical hash (ids are sorted)")
    }

    @Test
    fun `altering timestamp changes hash`() {
        val altered = baseRequest.copy(
            timestamp = Instant.parse("2026-09-01T00:00:00.000Z")
        )
        assertNotEquals(hasher.hash(baseRequest), hasher.hash(altered),
            "Changing timestamp must produce a different hash")
    }
}
