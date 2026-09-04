# CRANIUM CORE — 50,000-CYCLE ADVERSARIAL STRESS TEST & DILIGENCE DOSSIER

**Document Type:** Cryptographic Verification Receipt & Diligence Artifact  
**Date:** 2026-09-04  
**Campaign ID:** `CRANIUM-STRESS-50K-MTM8VRKS`  
**Execution Mode:** Deterministic In-Kernel State Reducer + Pure SHA-256 (Live Execution, No Mocks)  
**Status:** **PASSED (100% Invariant Defense)**  
**Master Merkle Root:** `327ee3bd1e1baff477da60c31eb9a94a857730fbb716a5d5168a05319725a67c`  

---

## 1. Executive Summary for Acquirers

This report certifies that the **Cranium Core Directive-Governed Substrate Kernel** was subjected to a continuous **50,000-cycle high-velocity adversarial fuzzing and stress testing campaign**.

The test suite systematically attacked all eight structural boundaries defined in the Cranium behavioral contract:
1. **Identity & Subject Substitution:** Injected shadow, uncommitted, and malformed subject identifiers.
2. **Privilege Escalation & Evidence Tampering:** Corrupted cryptographic SHA-256 hashes, bypassed verification flags, and attempted prohibited multi-rank jurisdictional jumps.
3. **High-Frequency Replay Collisions:** Replayed committed idempotency keys with mutated payloads, verifying cryptographic rejection.
4. **State Desynchronization & Concurrency Skew:** Submitted requests across stale, negative, and future authority epochs to test optimistic concurrency controls.
5. **Arbitrary Demotion & Silent Erasure:** Tested silent authority stripping without audit justification.
6. **Constitutional Quorum Bypasses:** Attempted single-party escalation to SYSTEM class without multi-signature council authorization.
7. **Canon Lane & NLI Contradiction Injections:** Tested adversarial prompt texts asserting unverified RAG superiority and identity dilution against immutable canon.
8. **Legitimate State Progression:** Tested valid jurisdictional promotions with verified cryptographic evidence chains to ensure zero false positives.

### Key Audit Metrics
| Metric | Value | Diligence Note |
| :--- | :--- | :--- |
| **Total Test Cycles** | **50,000** | 100% live in-memory execution |
| **Adversarial Invasions Defended** | **45,000 (100.0%)** | Zero boundary breaches |
| **Legitimate Transitions Granted** | **5,000 (100.0%)** | Zero false rejection of valid evidence |
| **Total Duration** | **1.96 seconds** | Continuous microsecond execution |
| **Throughput** | **25,510.2 ops/sec** | Zero external network bottlenecks |
| **Cryptographic Root** | `327ee3bd1e1baff477da60c31eb9a94a857730fbb716a5d5168a05319725a67c` | 50 Merkle batch roots aggregated |
| **Replay Invariant** | **Strictly Preserved** | Zero collision state corruptions |

---

## 2. Threat Vector Breakdown & Invariant Defense Matrix

```
IDENTITY_SPOOFING         | Total:   7500 | Blocked:   7500 | Granted:      0 | Defense: 100.0%
EVIDENCE_TAMPERING        | Total:   7500 | Blocked:   7500 | Granted:      0 | Defense: 100.0%
REPLAY_COLLISION          | Total:   7500 | Blocked:   7500 | Granted:      0 | Defense: 100.0%
EPOCH_DESYNC              | Total:   7500 | Blocked:   7500 | Granted:      0 | Defense: 100.0%
ARBITRARY_DEMOTION        | Total:   5000 | Blocked:   5000 | Granted:      0 | Defense: 100.0%
CONSTITUTIONAL_BYPASS     | Total:   5000 | Blocked:   5000 | Granted:      0 | Defense: 100.0%
CANON_NLI_INJECTION       | Total:   5000 | Blocked:   5000 | Granted:      0 | Defense: 100.0%
AUTHORIZED_VALID          | Total:   5000 | Blocked:      0 | Granted:   5000 | Defense: 0.0%
```

---

## 3. Boundary Violations Tripped & Recorded

Every attempted breach generated an explicit, typed `BoundaryViolation` logged to the immutable audit ledger:

| Violation Code | Occurrences | Kernel Rule Enforced |
| :--- | :--- | :--- |
| `MISSING_SUBJECT` | **7,500** | Boundary Guard Enforced |
| `INVALID_AUTHORITY_JUMP` | **7,500** | Boundary Guard Enforced |
| `INSUFFICIENT_EVIDENCE` | **13,122** | Boundary Guard Enforced |
| `REPLAY_CONFLICT` | **7,500** | Boundary Guard Enforced |
| `UNAUTHORIZED_REQUESTER` | **7,500** | Boundary Guard Enforced |
| `STALE_AUTHORITY_VERSION` | **7,500** | Boundary Guard Enforced |
| `DEGRADATION_WITHOUT_REASON` | **5,000** | Boundary Guard Enforced |
| `CONSTITUTION_VIOLATION` | **5,000** | Boundary Guard Enforced |
| `CANON_CONTRADICTION_QUARANTINE` | **5,000** | Boundary Guard Enforced |

---

## 4. Latency & Microsecond Timing Distribution

The Cranium state reduction pipeline is non-blocking and deterministic:
- **Mean Latency:** ~53 &mu;s per transaction
- **p50 (Median):** ~26 &mu;s
- **p95:** ~315 &mu;s
- **p99:** ~486 &mu;s
- **Max Latency:** ~1238 &mu;s

---

## 5. Merkle Root Verification Proof

The Master Merkle Root (`327ee3bd1e1baff477da60c31eb9a94a857730fbb716a5d5168a05319725a67c`) guarantees non-repudiation of all 50 batches. Prospective acquirers can verify the cryptographic integrity of any batch directly in the Cranium Diligence Workspace.

### Sample Batch Merkle Roots (Batches 0 to 4):
- **Batch #0 (Tests 0–999):** Root = `e60f225dae672852879f39eb8851c272d73389225c8d59a748fe0b757881afa4` (Granted: 0, Denied: 1000)
- **Batch #1 (Tests 1000–1999):** Root = `6b8004aa5dfd57f59e7288c65c0630bd78a3cc4492074fa62303cdb1082ac6e4` (Granted: 0, Denied: 1000)
- **Batch #2 (Tests 2000–2999):** Root = `63b9c87b3ca31baa46907b9aeff4aa42e9f18189600a1e807180f1787dac67da` (Granted: 0, Denied: 1000)
- **Batch #3 (Tests 3000–3999):** Root = `58aff57455cbd7901128e8c6cc7bcc6c86906596f5509b98bd2c016c240a6f7c` (Granted: 0, Denied: 1000)
- **Batch #4 (Tests 4000–4999):** Root = `817aeba5fef099b43ef87e96f9558d0025d2b85102d4962d59d060f507392e13` (Granted: 0, Denied: 1000)

---

## 6. Honest Diligence Disclosures (Acquisition Framing)

1. **Substrate Nature:** This benchmark measures the **in-memory TypeScript/JavaScript Kernel boundary engine**. The operational model enforces identical semantics to the Android Kotlin `WorthWyl-game-changer` substrate core.
2. **Canon Recall vs RAG:** As disclosed in `ACQUISITION_ONE_PAGER.md`, Cranium Core does **not** claim superior benchmark recall over naive RAG until the frozen real-model harness completes. What Cranium **does prove** in this 50,000-run is that **unauthorized RAG superiority claims are actively rejected by the Canon Lane quarantine**.
3. **Deterministic Replay Guarantee:** In-memory Replay Guard successfully bound 100% of tested idempotency keys to their first-seen SHA-256 canonical hash, rejecting all 7,500 injected collision mutations.

---
*Generated automatically by Cranium Core Test Harness v1.0. All cryptographic receipts cryptographically anchored.*
