# Cranium Substrate — v1 Kernel

> **Cognition can be generated anywhere. Authority can be acquired only through Cranium.**

## Status

**Architecture frozen. Contract layer committed. No behavior implemented yet.**

The types in this layer are the vocabulary every later implementation must obey.
Nothing can grant anything yet. That is deliberate.

## Governing invariant

> No authority increase may be committed unless it results from a unique, non-replayed
> `AuthorityTransitionRequest`; evaluated against the current committed state;
> passing all mandatory boundary checks; producing an explicit `GRANTED` transition;
> satisfying kernel invariants; and receipt-bound within the same atomic commit.

## Source of truth

`docs/CRANIUM_SUBSTRATE_V1_FROZEN_CONTRACT.md` is the normative source of truth.
All code must conform to it. Implementation convenience is not a valid reason to
weaken any contract requirement.

## Package structure

```
com.example.cranium
├── kernel       ExecutionState, KernelState, DomainEvent,
│                LegalTransitionValidator, KernelInvariant
├── authority    AuthorityClass, AuthorityLevel, AuthoritySource,
│                EvidenceRef, AuthorizationScope, TransitionAuthorization,
│                AuthorityTransitionRequest, BoundaryViolation,
│                BoundaryAssessment, TransitionDecision,
│                AuthorityTransition, AuthorityTransitionEngine
├── canon        CanonLane
├── cognition    CognitiveAtom, AtomKind, Provenance
├── receipt      ReplayStatus
├── authorization AuthorizationDecision (v1 stub)
└── immunity     ThreatAssessment (v1 stub)
```

## Build order

1. ✅ Contract types and interfaces — this commit
2. ⬜ Canonical serialization + SHA-256 hasher
3. ⬜ `AuthorizationVerifier` (real Ed25519)
4. ⬜ `InMemoryReplayGuard` (actual kernel commit path)
5. ⬜ `BoundaryValidator` + deny-by-default authority rules
6. ⬜ `AuthorityAcquisitionInvariant` + invariant framework
7. ⬜ Pure state reducer + `LegalTransitionValidator`
8. ⬜ `ReceiptHasher`, `ReceiptChain`, tamper fixture
9. ⬜ Deterministic test fixtures + `DeterministicTestModel`
10. ⬜ `OutputAuthorizer` + release gate
11. ⬜ `CraniumEngine` orchestration + atomic commit
12. ⬜ Adversarial benchmark runner

## Verification Integrity Rule

Security-relevant verification mechanisms SHALL NOT be replaced by mocks, fakes,
or predetermined verdicts in v1 security tests.

Deterministic fixtures MAY control inputs and environmental dependencies.
They SHALL NOT bypass or simulate the verification mechanism under test.

## Contract change rule

The only valid reasons to change the frozen contract:
- A validator or test failure proving the contract is wrong
- A code-document mismatch
- A formal version increment + Architecture Decision Record
- An explicit diligence or compliance requirement

Implementation convenience is not on that list.
