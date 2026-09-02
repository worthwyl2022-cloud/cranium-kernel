package com.example.cranium.hash

import com.example.cranium.authority.*
import java.time.Instant
import kotlin.test.Test
import kotlin.test.assertNotEquals

/**
 * Adversarial hash-binding contract test.
 *
 * Scenario:
 *   A request is legitimately authorized for FACTUAL authority.
 *   The requestedAuthority is then changed to SYSTEM.
 *   The canonical hash must change.
 *   Authorization binds to the original hash, not the mutated request.
 *
 * This test does NOT yet verify that the AuthorityTransitionEngine rejects
 * the mutated request — that requires the engine implementation. It verifies
 * the mechanical prerequisite: that the hash changes, which is the foundation
 * the engine will rely on.
 */
class RequestHashCollisionResistanceTest {

    private val hasher = Sha256RequestHasher()

    private val authorizedRequest = AuthorityTransitionRequest(
        requestId = "req-tamper-001",
        subjectId = "atom-target",
        requestedAuthority = AuthorityLevel(AuthorityClass.FACTUAL, 0.75),
        evidence = listOf(
            EvidenceRef("ev-t1", "prov-t1", "hash-t1", "source")
        ),
        source = AuthoritySource.HUMAN_REVIEW,
        authorization = null,
        expectedStateVersion = 3L,
        idempotencyKey = "idem-tamper-001",
        timestamp = Instant.parse("2026-08-31T21:00:00.000Z")
    )

    @Test
    fun `post-authorization authority escalation is detectable by hash change`() {
        val originalHash = hasher.hash(authorizedRequest)

        val tamperedRequest = authorizedRequest.copy(
            requestedAuthority = AuthorityLevel(AuthorityClass.SYSTEM, 1.0)
        )
        val tamperedHash = hasher.hash(tamperedRequest)

        assertNotEquals(originalHash, tamperedHash,
            """
            SECURITY VIOLATION: tampering with requestedAuthority did not change
            the canonical hash. The authorization binding mechanism is broken.
            An attacker could escalate authority after authorization without
            detection. This must not pass.
            """.trimIndent()
        )
    }

    @Test
    fun `FACTUAL to ENTERPRISE escalation is detectable`() {
        val original = hasher.hash(authorizedRequest)
        val tampered = hasher.hash(
            authorizedRequest.copy(
                requestedAuthority = AuthorityLevel(AuthorityClass.ENTERPRISE, 0.75)
            )
        )
        assertNotEquals(original, tampered)
    }

    @Test
    fun `FACTUAL to SYSTEM escalation is detectable`() {
        val original = hasher.hash(authorizedRequest)
        val tampered = hasher.hash(
            authorizedRequest.copy(
                requestedAuthority = AuthorityLevel(AuthorityClass.SYSTEM, 1.0)
            )
        )
        assertNotEquals(original, tampered)
    }

    @Test
    fun `weight inflation within same class is detectable`() {
        val original = hasher.hash(authorizedRequest)
        val tampered = hasher.hash(
            authorizedRequest.copy(
                requestedAuthority = AuthorityLevel(AuthorityClass.FACTUAL, 1.0)
            )
        )
        assertNotEquals(original, tampered)
    }

    @Test
    fun `subjectId substitution is detectable`() {
        val original = hasher.hash(authorizedRequest)
        val tampered = hasher.hash(
            authorizedRequest.copy(subjectId = "atom-system-axiom")
        )
        assertNotEquals(original, tampered)
    }
}
 