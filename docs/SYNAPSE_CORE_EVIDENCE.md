# Cranium Synapse / Cranium Core Evidence Record

## Scope

This record covers the deterministic Synapse-to-Core governance transaction and controlled action gateway in the `cranium-kernel` repository. Synapse carries policy-contextualized inference/runtime evidence; Cranium Core alone authorizes state transitions and external action.

## Verification commands

```bash
npm ci
npm run lint
npm run verify:synapse
npm run build
```

The verification harness covers Synapse admission, canonical request binding, policy mismatch rejection, fail-safe blocking, Core-issued envelope binding, valid in-scope authorization, duplicate-action replay denial, receipt hash chaining, exact-once receipt consumption, action-argument tamper rejection, Ed25519 signature verification, signature tamper rejection, and key-role separation.

## Current integrity model

The transaction path uses canonical SHA-256 request, authority, action, attestation, envelope, and receipt hashes. Governance receipts form an ordered hash chain. The action gateway requires a granted receipt, exact action hash, receipt-chain membership, tool scope, freshness, and single-use consumption.

The repository also contains an Ed25519 trusted-key registry and verifier for Core, Synapse runtime, Gateway, and human-approver identities. The current deterministic integration harness verifies the signing primitive and role separation with generated test keys; production key custody, durable trusted-key distribution, rotation, revocation operations, and hardware-backed identity remain unimplemented.

## Reproducibility boundary

The current action-consumption store is in-memory and prototype-only. A production gateway must replace it with a durable transactional store or append-only log, preserving reserve/execute/commit recovery and idempotency semantics across restart and crash.

The current `SynapseRuntimeAdapter` validates and binds evidence but does not itself implement a production transformer-layer observation or intervention controller. Model-specific inference adapters, red-team corpora, utility/safety benchmarks, and independent reproduction remain future work.

## Claim boundary

This evidence supports the statement that the stated contract behaviors are executable and deterministic at the pinned source revision. It does not establish security certification, universal model control, production availability, independent validation, or authenticated deployment until real trusted keys and durable infrastructure are configured.

## Release metadata

| Field | Value |
|---|---|
| Repository | `worthwyl2022-cloud/cranium-kernel` |
| Verification runtime | Node.js 22, TypeScript, Vite, `tsx` |
| Signature algorithm | Ed25519 test-path verifier present; production key operations not configured |
| Persistence | In-memory prototype store |
| Source commit | Recorded in the release commit that adds this evidence record |
| Generated artifacts | None required; verification is command-reproducible |
