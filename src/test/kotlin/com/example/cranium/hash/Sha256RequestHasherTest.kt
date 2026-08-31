package com.example.cranium.hash

import com.example.cranium.authority.*
import java.time.Instant
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotEquals

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
        assertEquals(h1, h2)
    }

    @Test
    fun `authorization attachment does not change canonical request hash`() {
        val unsignedHash = hasher.hash(baseRequest)
        val signed = baseRequest.copy(
            authorization = TransitionAuthorization(
                authorizationId = "auth-1",
                authority = AuthoritySource.HUMAN_REVIEW,
                scope = AuthorizationScope(
                    allowedLanes = setOf("ENTERPRISE_POLICY"),
                    allowedOperations = setOf("AUTHORITY_TRANSITION"),
                    maximumAuthorityClass = AuthorityClass.FACTUAL
                ),
                issuedAt = Instant.parse("2026-08-31T20:00:00.000Z"),
                expiresAt = Instant.parse("2026-08-31T22:00:00.000Z"),
                boundRequestHash = unsignedHash,
                signature = "opaque"
            )
        )
        val signedHash = hasher.hash(signed)
        assertEquals(unsignedHash, signedHash)
    }

    @Test
    fun `altering requestedAuthority class changes hash`() {
        val altered = baseRequest.copy(
            requestedAuthority = AuthorityLevel(AuthorityClass.SYSTEM, 0.8)
        )
        assertNotEquals(hasher.hash(baseRequest), hasher.hash(altered))
    }

    @Test
    fun `altering requestedAuthority weight changes hash`() {
        val altered = baseRequest.copy(
            requestedAuthority = AuthorityLevel(AuthorityClass.FACTUAL, 0.9)
        )
        assertNotEquals(hasher.hash(baseRequest), hasher.hash(altered))
    }

    @Test
    fun `altering subjectId changes hash`() {
        val altered = baseRequest.copy(subjectId = "atom-beta")
        assertNotEquals(hasher.hash(baseRequest), hasher.hash(altered))
    }

    @Test
    fun `altering expectedStateVersion changes hash`() {
        val altered = baseRequest.copy(expectedStateVersion = 8L)
        assertNotEquals(hasher.hash(baseRequest), hasher.hash(altered))
    }

    @Test
    fun `altering idempotencyKey changes hash`() {
        val altered = baseRequest.copy(idempotencyKey = "idem-xyz")
        assertNotEquals(hasher.hash(baseRequest), hasher.hash(altered))
    }

    @Test
    fun `altering source changes hash`() {
        val altered = baseRequest.copy(source = AuthoritySource.MODEL)
        assertNotEquals(hasher.hash(baseRequest), hasher.hash(altered))
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
        assertNotEquals(hasher.hash(baseRequest), hasher.hash(altered))
    }

    @Test
    fun `evidence ordering does not affect hash`() {
        val ev1 = EvidenceRef("ev-aaa", "prov-1", "hash1", "source1")
        val ev2 = EvidenceRef("ev-bbb", "prov-2", "hash2", "source2")
        val r1 = baseRequest.copy(evidence = listOf(ev1, ev2))
        val r2 = baseRequest.copy(evidence = listOf(ev2, ev1))
        assertEquals(hasher.hash(r1), hasher.hash(r2))
    }

    @Test
    fun `altering timestamp changes hash`() {
        val altered = baseRequest.copy(
            timestamp = Instant.parse("2026-09-01T00:00:00.000Z")
        )
        assertNotEquals(hasher.hash(baseRequest), hasher.hash(altered))
    }
}
