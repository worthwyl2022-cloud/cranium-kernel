# Cranium Substrate — v1 Kernel

> **Cognition can be generated anywhere. Authority can be acquired only through Cranium.**

## Status

**Contract layer committed. First behavioral authority boundary implemented. Not yet security proof.**

The repository now contains real behavior for:
- canonical request hashing (SHA-256)
- replay inspection (`New`, `Existing`, `ConflictingReuse`)
- boundary validation
- authority rule evaluation
- immutable state reduction for granted transitions

This is enough to support real compile-time and test-time verification of the first authority-boundary properties.
It is not enough to claim correctness, security completeness, or novelty.

## Verification disclaimer

> A green CI run means only that the committed tests passed under the declared environment. It does not constitute proof of security, correctness, uniqueness, or absence of vulnerabilities.

## Governing invariant

> No authority increase may be committed unless it results from a unique, non-replayed
> `AuthorityTransitionRequest`; evaluated against the current committed state;
> passing all mandatory boundary checks; producing an explicit `GRANTED` transition;
> satisfying kernel invariants; and receipt-bound within the same atomic commit.

## Current source of truth

Right now, the source of truth is the committed code in this repository.
Any external design notes or frozen-contract documents must match the tree that actually exists on `main`.
If the code and a document disagree, the disagreement itself is a bug that must be fixed explicitly.

## Package structure

```
com.example.cranium
├── kernel        ExecutionState, KernelState, DomainEvent,
│                 LegalTransitionValidator, KernelInvariant,
│                 KernelStateReducer
├── authority     AuthorityClass, AuthorityLevel, AuthoritySource,
│                 EvidenceRef, AuthorizationScope, TransitionAuthorization,
│                 AuthorityTransitionRequest, BoundaryViolation,
│                 BoundaryAssessment, TransitionDecision,
│                 AuthorityTransition, AuthorityTransitionEngine,
│                 DefaultBoundaryValidator, DefaultAuthorityRuleEvaluator,
│                 DefaultAuthorityTransitionEngine
├── canon         CanonLane
├── cognition     CognitiveAtom, AtomKind, CognitiveStatus, Provenance
├── hash          CanonicalEncoder, RequestHash, RequestHasher,
│                 Sha256RequestHasher, AuthorityTransitionRequestEncoder
├── replay        ReplayStatus, ReplayGuard, InMemoryReplayGuard
├── authorization AuthorizationDecision (v1 stub)
└── immunity      ThreatAssessment (v1 stub)
```

## Immediate priorities

1. Keep CI boring and real: clean checkout, declared JDK, declared Gradle, real tests, real build.
2. Preserve every discovered failure as a permanent regression.
3. Expand adversarial coverage one attack at a time:
   - stale state
   - protected-lane escalation
   - identity substitution
   - evidence manipulation
   - replay ordering
   - compound attacks

## Verification Integrity Rule

Security-relevant verification mechanisms SHALL NOT be replaced by mocks, fakes,
or predetermined verdicts in v1 security tests.

Deterministic fixtures MAY control inputs and environmental dependencies.
They SHALL NOT bypass or simulate the verification mechanism under test.

## Contract change rule

The only valid reasons to change the contract surface:
- A validator or test failure proving the contract is wrong
- A code-document mismatch
- A formal version increment + Architecture Decision Record
- An explicit diligence or compliance requirement

Implementation convenience is not on that list.
 