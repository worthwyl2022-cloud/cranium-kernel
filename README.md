# Cranium Substrate — v1 Kernel

> **Cognition can be generated anywhere. Authority can be acquired only through Cranium.**

## Status

**Contract layer committed. First behavioral authority boundary implemented. Not yet a security proof.**

The repository now contains real behavior for:
- canonical request hashing (SHA-256)
- replay inspection (`New`, `Existing`, `ConflictingReuse`)
- boundary validation
- authority rule evaluation
- immutable state reduction for granted transitions
- governed adapter boundary (`GovernedKernelPort`) that cannot bypass the canonical evaluator or reducer
- deterministic transition identity and receipt timestamps derived from the request contract

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

## Architecture boundary

The repository has one authority issuer: `DefaultAuthorityTransitionEngine`, committed through
`KernelStateReducer`. `GovernedKernelPort` is an integration substrate, not a second kernel. It
accepts proposal context, delegates evaluation to the canonical engine, and refuses to commit a
failed boundary assessment. See [`GOVERNANCE_BOUNDARY.md`](./GOVERNANCE_BOUNDARY.md).

## Package structure

```
src/
├── kernel/       authority types, canonical encoder, boundary validator,
│                 transition engine, replay guard, reducer, and stress suite
├── governance/   GovernedKernelPort integration boundary; delegates to kernel only
├── components/   review and verification UI surfaces
└── data/         explicitly labeled receipt and benchmark artifacts
```

## System architecture

Cranium is a governed intelligence substrate composed of two independent but integrated
layers:

1. **Cranium Synapse** is the inference-native contract and evidence bridge for compatible AI
   runtimes. It carries policy-relevant model-state evidence, bounded intervention,
   abstention, and escalation signals into governed requests.
2. **Cranium Core** is the independent authority and state-governance kernel. It alone
   determines whether an output may acquire authority, mutate governed state, invoke a tool,
   or cause an external side effect.

Cranium Synapse may reduce the available action envelope or request escalation. It may never
grant, expand, or independently execute authority. **Synapse carries cognition. Core governs
action.**

`governance/SynapseRuntimeAdapter.ts` implements the first Synapse-to-Core vertical slice. A
Synapse attestation records model provenance, policy version, controller configuration, bounded
intervention, risk disposition, and a deterministic trace commitment. For protected actions,
the adapter fails closed when the attestation is missing, mismatched, or explicitly blocked.

The attestation is included in the canonical request hash, so changing inference evidence
changes the request identity. The adapter can admit valid evidence into `GovernedKernelPort`,
but it cannot grant authority or bypass the canonical evaluator and reducer. `npm run
verify:synapse` checks valid admission, hash binding, policy mismatch rejection, and fail-safe
blocking. `SynapseCoreTransaction.ts` additionally implements the Core-issued envelope →
Synapse attestation → Core authorization → chained receipt path, including expiry, request,
envelope, authority-version, tool-scope, and replay checks. This is an integration contract
and deterministic harness, not evidence that a production transformer-level inference
controller has already been implemented. The same transaction gate exposes a controlled
action execution boundary that requires a granted receipt, exact action hash, in-scope tool,
fresh receipt, intact receipt-chain membership, and single-use consumption.

The current implementation is **deterministically and cryptographically integrity-bound** by
canonical SHA-256 hashes and receipt chaining. It does not yet claim digital authentication;
signed envelopes, signed Synapse attestations, key rotation, and trusted-key verification are
future hardening work.

## Reproduce the current build

```bash
npm ci
npm run lint
npm run build
npm run verify:synapse
```

These commands verify TypeScript compilation and the production UI bundle. They do not claim
external security certification, independent reproduction, or production authority service
readiness.

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
