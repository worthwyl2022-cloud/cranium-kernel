package com.example.cranium.kernel

/**
 * Applies a transition to an immutable kernel snapshot and records the same
 * transition in the replay guard. Denied transitions never mutate authority.
 */
object KernelStateReducer {
    fun createInitialState(): KernelState {
        val now = System.currentTimeMillis()
        val atoms = listOf(
            CognitiveAtom(
                id = "atom-directive-002",
                kind = AtomKind.DIRECTIVE,
                status = CognitiveStatus.COMMITTED,
                content = "Authority is acquired only through Cranium.",
                authority = AuthorityLevel(AuthorityClass.ENTERPRISE, 0.95),
                provenance = Provenance("FOUNDATIONAL_CONSTITUTION", "FOUNDER_CORE", now),
                createdAt = now
            ),
            CognitiveAtom(
                id = "atom-user-003",
                kind = AtomKind.INTENT,
                status = CognitiveStatus.ACTIVE,
                content = "Human intent is a sovereign constraint.",
                authority = AuthorityLevel(AuthorityClass.USER, 0.80),
                provenance = Provenance("USER_DIRECTIVE_SESSION", "USER_PRIMARY", now),
                createdAt = now
            ),
            CognitiveAtom(
                id = "atom-hypo-004",
                kind = AtomKind.HYPOTHESIS,
                status = CognitiveStatus.PROVISIONAL,
                content = "A provisional hypothesis requires evidence before promotion.",
                authority = AuthorityLevel(AuthorityClass.HYPOTHETICAL, 0.35),
                provenance = Provenance("ADAPTER_EXPERIMENT", "RESEARCH_SUBSTRATE", now),
                createdAt = now
            )
        ).associateBy { it.id }
        return KernelState(
            executionId = "exec_cranium_v1_${now}",
            state = ExecutionState.READY,
            cognitiveVersion = 1,
            authorityVersion = 1,
            canonVersion = 1,
            atomsById = atoms,
            activeAtomIds = atoms.keys.toList(),
            candidateHash = null,
            threatAssessment = ThreatAssessment(),
            transitions = emptyList(),
            canonEntries = emptyList(),
            constitutionalPrinciples = listOf(
                ConstitutionalPrinciple(
                    "CONST-01",
                    "Atomic Authority Invariant",
                    "GOVERNANCE",
                    "Authority increases require evaluation against committed state.",
                    "STRICT_AUTHORITY_EVALUATION"
                ),
                ConstitutionalPrinciple(
                    "CONST-02",
                    "Idempotent Replay Boundary",
                    "IMMUNITY",
                    "A reused key with a different hash is rejected.",
                    "REPLAY_COLLISION_REJECTION"
                )
            )
        )
    }

    fun reduce(
        state: KernelState,
        transition: AuthorityTransition,
        replayGuard: InMemoryReplayGuard,
        request: AuthorityTransitionRequest,
        replayStatus: ReplayStatus
    ): KernelState {
        if (replayStatus is ReplayStatus.New) {
            replayGuard.record(request.requestId, request.idempotencyKey, transition.requestHash, transition)
        }

        val denied = transition.decision is TransitionDecision.Denied
        val vectors = state.threatAssessment.suspectedVectors.toMutableList()
        var replayBlocked = state.threatAssessment.replayAttemptsBlocked
        var anomalies = state.threatAssessment.boundaryAnomaliesCount
        var threatLevel = state.threatAssessment.threatLevel
        if (denied) {
            anomalies += 1
            transition.boundary.violations.forEach { violation ->
                if (!vectors.contains(violation.name)) vectors.add(violation.name)
            }
            if (BoundaryViolation.REPLAY_CONFLICT in transition.boundary.violations) replayBlocked += 1
            threatLevel = when {
                anomalies > 6 -> "CRITICAL"
                anomalies > 3 || replayBlocked > 0 -> "ELEVATED"
                else -> threatLevel
            }
        }
        val updatedThreat = state.threatAssessment.copy(
            threatLevel = threatLevel,
            suspectedVectors = vectors,
            replayAttemptsBlocked = replayBlocked,
            boundaryAnomaliesCount = anomalies,
            lastIncidentTimestamp = if (denied) transition.timestamp else state.threatAssessment.lastIncidentTimestamp
        )
        val transitions = listOf(transition) + state.transitions.take(99)
        if (denied) return state.copy(transitions = transitions, threatAssessment = updatedThreat)

        val granted = (transition.decision as? TransitionDecision.Granted) ?: return state
        val current = state.atomsById[transition.subjectAtomId] ?: return state
        val updated = current.copy(
            authority = granted.grantedAuthority,
            status = if (granted.grantedAuthority.authorityClass == AuthorityClass.FACTUAL ||
                granted.grantedAuthority.authorityClass == AuthorityClass.ENTERPRISE) {
                CognitiveStatus.COMMITTED
            } else CognitiveStatus.ACTIVE
        )
        return state.copy(
            authorityVersion = state.authorityVersion + 1,
            atomsById = state.atomsById + (updated.id to updated),
            transitions = transitions,
            threatAssessment = updatedThreat
        )
    }
}
