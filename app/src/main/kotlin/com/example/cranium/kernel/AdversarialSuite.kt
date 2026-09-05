package com.example.cranium.kernel

object AdversarialSuite {

    data class TestResult(
        val id: String,
        val name: String,
        val category: String,
        val threatVector: String,
        val description: String,
        val expectedViolation: BoundaryViolation,
        val passed: Boolean,
        val actualDecision: String,
        val executionTimeMs: Double,
        val hashGenerated: String,
        val details: String
    )

    fun runAll(
        initialState: KernelState,
        replayGuard: InMemoryReplayGuard,
        engine: DefaultAuthorityTransitionEngine
    ): Pair<List<TestResult>, KernelState> {
        val results = mutableListOf<TestResult>()
        var state = initialState

        // Test 1: Identity Substitution
        {
            val t0 = System.nanoTime()
            val forgedReq = AuthorityTransitionRequest(
                requestId = "req_forge_${System.currentTimeMillis()}",
                idempotencyKey = "idem_forge_${System.currentTimeMillis()}",
                subjectId = "atom_shadow_missing_999",
                requestedAuthority = AuthorityLevel(AuthorityClass.FACTUAL, 0.8),
                evidence = listOf(
                    EvidenceRef("ev-1", "https://invalid.example/evidence/payload", "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", true, "Intentionally invalid digest for adversarial verification")
                ),
                justification = "Testing shadow subject injection",
                requesterId = "MALICIOUS_ACTOR",
                timestamp = System.currentTimeMillis(),
                targetAuthorityVersion = state.authorityVersion
            )
            val res = engine.evaluate(forgedReq, state)
            state = KernelStateReducer.reduce(state, res.transition, replayGuard, forgedReq, res.replayStatus)
            val dt = (System.nanoTime() - t0) / 1_000_000.0

            results.add(
                TestResult(
                    id = "ADV-01",
                    name = "Identity Substitution & Shadow Subject Injection",
                    category = "IDENTITY",
                    threatVector = "Submitting transition request targeting an uncommitted subject ID",
                    description = "Kernel resolves subjects exclusively from committed immutable state snapshot.",
                    expectedViolation = BoundaryViolation.MISSING_SUBJECT,
                    passed = res.transition.boundary.violations.contains(BoundaryViolation.MISSING_SUBJECT) && res.transition.decision is TransitionDecision.Denied,
                    actualDecision = if (res.transition.decision is TransitionDecision.Granted) "GRANTED" else "DENIED",
                    executionTimeMs = dt,
                    hashGenerated = res.transition.requestHash.hexDigest,
                    details = res.transition.boundary.explanation
                )
            )
        }

        // Test 2: Protected-Lane Escalation without Evidence
        {
            val t0 = System.nanoTime()
            val escReq = AuthorityTransitionRequest(
                requestId = "req_esc_${System.currentTimeMillis()}",
                idempotencyKey = "idem_esc_${System.currentTimeMillis()}",
                subjectId = "atom-hypo-004",
                requestedAuthority = AuthorityLevel(AuthorityClass.ENTERPRISE, 0.99),
                evidence = emptyList(),
                justification = "Attempting promotion without verified cryptographic digest",
                requesterId = "WORKER_AGENT",
                timestamp = System.currentTimeMillis(),
                targetAuthorityVersion = state.authorityVersion
            )
            val res = engine.evaluate(escReq, state)
            state = KernelStateReducer.reduce(state, res.transition, replayGuard, escReq, res.replayStatus)
            val dt = (System.nanoTime() - t0) / 1_000_000.0

            results.add(
                TestResult(
                    id = "ADV-02",
                    name = "Protected-Lane Escalation (Evidence Bypassing)",
                    category = "ESCALATION",
                    threatVector = "Hypothetical atom attempting multi-rank jump to ENTERPRISE with no evidence",
                    description = "Promotions to FACTUAL or ENTERPRISE require verified evidence refs with 256-bit hashes.",
                    expectedViolation = BoundaryViolation.INSUFFICIENT_EVIDENCE,
                    passed = (res.transition.boundary.violations.contains(BoundaryViolation.INSUFFICIENT_EVIDENCE) || res.transition.boundary.violations.contains(BoundaryViolation.INVALID_AUTHORITY_JUMP)) && res.transition.decision is TransitionDecision.Denied,
                    actualDecision = if (res.transition.decision is TransitionDecision.Granted) "GRANTED" else "DENIED",
                    executionTimeMs = dt,
                    hashGenerated = res.transition.requestHash.hexDigest,
                    details = res.transition.boundary.explanation
                )
            )
        }

        // Test 3: Replay Collision
        {
            val t0 = System.nanoTime()
            val sharedKey = "idemp_shared_${System.currentTimeMillis()}"
            val sharedReqId = "req_legit_${System.currentTimeMillis()}"

            val legitReq = AuthorityTransitionRequest(
                requestId = sharedReqId,
                idempotencyKey = sharedKey,
                subjectId = "atom-user-003",
                requestedAuthority = AuthorityLevel(AuthorityClass.USER, 0.85),
                evidence = emptyList(),
                justification = "Valid weight adjustment",
                requesterId = "USER_PRIMARY",
                timestamp = System.currentTimeMillis(),
                targetAuthorityVersion = state.authorityVersion
            )
            val legitRes = engine.evaluate(legitReq, state)
            state = KernelStateReducer.reduce(state, legitRes.transition, replayGuard, legitReq, legitRes.replayStatus)

            val poisonReq = AuthorityTransitionRequest(
                requestId = sharedReqId,
                idempotencyKey = sharedKey,
                subjectId = "atom-user-003",
                requestedAuthority = AuthorityLevel(AuthorityClass.SYSTEM, 1.0),
                evidence = emptyList(),
                justification = "Poisoned payload reusing idempotency key",
                requesterId = "MALICIOUS_INJECTOR",
                timestamp = System.currentTimeMillis(),
                targetAuthorityVersion = state.authorityVersion
            )
            val poisonRes = engine.evaluate(poisonReq, state)
            state = KernelStateReducer.reduce(state, poisonRes.transition, replayGuard, poisonReq, poisonRes.replayStatus)
            val dt = (System.nanoTime() - t0) / 1_000_000.0

            results.add(
                TestResult(
                    id = "ADV-03",
                    name = "Cryptographic Replay Collision & Key Poisoning",
                    category = "REPLAY",
                    threatVector = "Reusing committed idempotency key with poisoned system-level authority parameters",
                    description = "Replay guard matches key with mismatched SHA-256 digest and triggers immune barrier.",
                    expectedViolation = BoundaryViolation.REPLAY_CONFLICT,
                    passed = poisonRes.transition.boundary.violations.contains(BoundaryViolation.REPLAY_CONFLICT) && poisonRes.transition.decision is TransitionDecision.Denied,
                    actualDecision = if (poisonRes.transition.decision is TransitionDecision.Granted) "GRANTED" else "DENIED",
                    executionTimeMs = dt,
                    hashGenerated = poisonRes.transition.requestHash.hexDigest,
                    details = poisonRes.transition.boundary.explanation
                )
            )
        }

        // Test 4: Stale State
        {
            val t0 = System.nanoTime()
            val staleReq = AuthorityTransitionRequest(
                requestId = "req_stale_${System.currentTimeMillis()}",
                idempotencyKey = "idem_stale_${System.currentTimeMillis()}",
                subjectId = "atom-user-003",
                requestedAuthority = AuthorityLevel(AuthorityClass.USER, 0.9),
                evidence = emptyList(),
                justification = "Stale authority request",
                requesterId = "USER_PRIMARY",
                timestamp = System.currentTimeMillis(),
                targetAuthorityVersion = 0L
            )
            val res = engine.evaluate(staleReq, state)
            state = KernelStateReducer.reduce(state, res.transition, replayGuard, staleReq, res.replayStatus)
            val dt = (System.nanoTime() - t0) / 1_000_000.0

            results.add(
                TestResult(
                    id = "ADV-04",
                    name = "Stale Authority State Race Condition",
                    category = "STALE_STATE",
                    threatVector = "Issuing transition request with outdated targetAuthorityVersion",
                    description = "State version locking prevents concurrent execution against stale state.",
                    expectedViolation = BoundaryViolation.STALE_AUTHORITY_VERSION,
                    passed = res.transition.boundary.violations.contains(BoundaryViolation.STALE_AUTHORITY_VERSION) && res.transition.decision is TransitionDecision.Denied,
                    actualDecision = if (res.transition.decision is TransitionDecision.Granted) "GRANTED" else "DENIED",
                    executionTimeMs = dt,
                    hashGenerated = res.transition.requestHash.hexDigest,
                    details = res.transition.boundary.explanation
                )
            )
        }

        // Test 5: Unjustified Degradation
        {
            val t0 = System.nanoTime()
            val demoteReq = AuthorityTransitionRequest(
                requestId = "req_demote_${System.currentTimeMillis()}",
                idempotencyKey = "idem_demote_${System.currentTimeMillis()}",
                subjectId = "atom-directive-002",
                requestedAuthority = AuthorityLevel(AuthorityClass.HYPOTHETICAL, 0.1),
                evidence = emptyList(),
                justification = "",
                requesterId = "WORKER_AGENT",
                timestamp = System.currentTimeMillis(),
                targetAuthorityVersion = state.authorityVersion
            )
            val res = engine.evaluate(demoteReq, state)
            state = KernelStateReducer.reduce(state, res.transition, replayGuard, demoteReq, res.replayStatus)
            val dt = (System.nanoTime() - t0) / 1_000_000.0

            results.add(
                TestResult(
                    id = "ADV-05",
                    name = "Unjustified Authority Degradation & Policy Stripping",
                    category = "ESCALATION",
                    threatVector = "Silently demoting critical enterprise directives to hypothetical without rationale",
                    description = "Authority reduction requires recorded reasoning to prevent covert neutralization.",
                    expectedViolation = BoundaryViolation.DEGRADATION_WITHOUT_REASON,
                    passed = res.transition.boundary.violations.contains(BoundaryViolation.DEGRADATION_WITHOUT_REASON) && res.transition.decision is TransitionDecision.Denied,
                    actualDecision = if (res.transition.decision is TransitionDecision.Granted) "GRANTED" else "DENIED",
                    executionTimeMs = dt,
                    hashGenerated = res.transition.requestHash.hexDigest,
                    details = res.transition.boundary.explanation
                )
            )
        }

        // Test 6: Constitutional Quorum Bypass
        {
            val t0 = System.nanoTime()
            val constReq = AuthorityTransitionRequest(
                requestId = "req_const_${System.currentTimeMillis()}",
                idempotencyKey = "idem_const_${System.currentTimeMillis()}",
                subjectId = "atom-user-003",
                requestedAuthority = AuthorityLevel(AuthorityClass.SYSTEM, 1.0),
                evidence = listOf(EvidenceRef("ev-audit", "https://sec.org/cert.pdf", "a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e", true, "Audit certificate")),
                justification = "User requesting system jurisdiction without root credentials",
                requesterId = "EXTERNAL_USER_AGENT",
                timestamp = System.currentTimeMillis(),
                targetAuthorityVersion = state.authorityVersion
            )
            val res = engine.evaluate(constReq, state)
            state = KernelStateReducer.reduce(state, res.transition, replayGuard, constReq, res.replayStatus)
            val dt = (System.nanoTime() - t0) / 1_000_000.0

            results.add(
                TestResult(
                    id = "ADV-06",
                    name = "Constitutional Quorum Bypass (System Escalation)",
                    category = "CONSTITUTION",
                    threatVector = "External agent requesting SYSTEM jurisdiction without root quorum",
                    description = "System-level authority is protected by hard constitutional invariants.",
                    expectedViolation = BoundaryViolation.CONSTITUTION_VIOLATION,
                    passed = res.transition.boundary.violations.contains(BoundaryViolation.CONSTITUTION_VIOLATION) && res.transition.decision is TransitionDecision.Denied,
                    actualDecision = if (res.transition.decision is TransitionDecision.Granted) "GRANTED" else "DENIED",
                    executionTimeMs = dt,
                    hashGenerated = res.transition.requestHash.hexDigest,
                    details = res.transition.boundary.explanation
                )
            )
        }

        return Pair(results, state)
    }
}
