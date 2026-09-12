# Acquisition Portfolio Stress Report

**Campaign date:** 2026-09-12  
**Scope:** Combined Cranium Core, Cranium Synapse, Cranium Ultra, and Cranium Core Python surfaces  
**Purpose:** Technical acquisition diligence evidence, not an independent certification or valuation opinion.

## Executive result

The combined Core/Synapse boundary campaign completed successfully. The live kernel campaign executed 50,000 operations with 45,000 adversarial cases denied and 5,000 authorized cases granted. No invariant breach was observed. The campaign produced the stable master Merkle root `d1f1446c0e2feba5a9153014270b982576d46591da61ba037fd63711e4424da3`.

## Evidence matrix

| Surface | Live or automated evidence | Result |
|---|---|---|
| Combined Cranium Core/Synapse kernel boundary | 50,000 live adversarial and authorized operations | 50,000/50,000 campaign pass; 45,000 attacks denied; 5,000 valid grants |
| Receipt and authority transaction layer | Synapse integration, Ed25519 signatures, replay, receipt chaining, exact-once execution, tamper and recovery checks | Passed |
| Cranium Synapse contract package | Direct contract smoke test for risk bounds, attestation shape, invalid score, intervention type, and hash type | Passed |
| Cranium Ultra OS | Typecheck, 3 Vitest tests, production build, dependency audit | Passed; 3/3 tests; 0 vulnerabilities |
| Cranium Ultra hardened Core | 6 Jest boundary tests, 6 adversarial scenarios, TypeScript build, dependency audit | Passed; 12/12 checks; 0 vulnerabilities |
| Cranium Core Python surface | pytest and critical flake8 rules | Passed; 4/4 tests; 0 critical lint findings |

## Core/Synapse campaign breakdown

| Category | Total | Denied | Granted |
|---|---:|---:|---:|
| Identity spoofing | 7,500 | 7,500 | 0 |
| Evidence tampering | 7,500 | 7,500 | 0 |
| Replay collision | 7,500 | 7,500 | 0 |
| Authority epoch desynchronization | 7,500 | 7,500 | 0 |
| Arbitrary demotion | 5,000 | 5,000 | 0 |
| Constitutional bypass | 5,000 | 5,000 | 0 |
| Canon/NLI contradiction injection | 5,000 | 5,000 | 0 |
| Authorized valid transition | 5,000 | 0 | 5,000 |

## Measured performance

The combined campaign completed in 2.71 seconds at 18,463.8 operations per second in the current sandbox execution. This is a reproducible in-memory benchmark, not a production service-level objective. The earlier identical campaign completed in 1.98 seconds at 25,278.1 operations per second, demonstrating run-to-run environment variance while preserving the same Merkle root and pass counts.

## Security behaviors observed

The combined test evidence covers identity substitution rejection, evidence-bound elevation, replay collision rejection, stale authority-version rejection, unjustified degradation rejection, constitutional quorum enforcement, receipt/request binding, rogue-key signature rejection, valid-signature/wrong-payload rejection, transaction tamper rejection, duplicate-frame rejection, truncated-frame rejection, and crash recovery.

The Core/Synapse boundary is therefore supported by more than a positive-path demo: it has measured denial behavior across multiple classes of adversarial input while still accepting valid authorized transitions.

## Acquisition interpretation

This campaign materially improves technical diligence readiness by lowering uncertainty around the core control-plane claims. It supports a buyer’s conclusion that the system has a coherent, testable authorization and receipt substrate rather than only descriptive architecture documents.

It does not by itself establish a dollar valuation. The evidence remains subject to independent reproduction, production-like persistence and concurrency testing, key custody and rotation review, contributor/IP chain-of-title review, deployment controls, and commercial validation. It should be presented as a **technical risk-reduction and diligence-readiness artifact**, not as a security certification or financial appraisal.

## Reproduction commands

```bash
cd cranium-kernel
npm run verify
npx tsx scripts/run_50000_stress.ts
npx tsx scripts/synapse-integration-check.ts
npx tsx scripts/atomic-recovery-check.ts

cd ../Cranium-Ultra
npm run verify

cd ../Cranium-Core-
python3 -m pytest -q
flake8 . --count --select=E9,F63,F7,F82 --show-source --statistics
```

## Cryptographic campaign anchor

```text
Campaign ID:   CRANIUM-STRESS-50K-MTYLLFVQ
Merkle root:   d1f1446c0e2feba5a9153014270b982576d46591da61ba037fd63711e4424da3
Total tests:   50,000
Attacks:       45,000 defended
Valid grants:  5,000
```
