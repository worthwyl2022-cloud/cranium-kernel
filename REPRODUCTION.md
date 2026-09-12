# Independent Security Reproduction Guide

## Objective

This package lets a buyer or independent security reviewer reproduce the Core/Synapse receipt-boundary evidence from a clean checkout. It verifies source behavior, not a pre-generated report.

## Checkout layout

For the full Core/Synapse scope, place the repositories side by side:

```text
workspace/
├── cranium-kernel/
└── cranium-synapse/
```

The reproduction command can use another Synapse location through `CRANIUM_SYNAPSE_DIR`.

## One-command run

From `cranium-kernel`:

```bash
./scripts/reproduce-acquisition.sh
```

The command installs the locked Node dependencies, runs the complete kernel verification gate, runs the direct Synapse contract smoke test, executes signed Synapse/Core integration checks, executes atomic recovery checks, runs the 50,000-operation adversarial campaign, verifies deterministic campaign counts and the Merkle root, and writes SHA-256 hashes for the resulting evidence.

If the repositories are not side by side:

```bash
CRANIUM_SYNAPSE_DIR=/absolute/path/to/cranium-synapse ./scripts/reproduce-acquisition.sh
```

## Acceptance criteria

The command must exit with status zero and report all of the following:

- 30/30 Miracle Memory checks passed.
- Synapse signature and transaction checks passed.
- Atomic recovery checks passed.
- 50,000 campaign operations completed.
- 45,000 adversarial attacks defended.
- 5,000 legitimate transitions granted.
- Overall invariant integrity passed.
- Merkle root equals `d1f1446c0e2feba5a9153014270b982576d46591da61ba037fd63711e4424da3` for the fixed campaign corpus.
- No high-severity dependency audit failure.

Throughput is not a pass/fail security criterion. It is recorded for context and may vary with hardware, runtime, thermal state, and process contention.

## Evidence outputs

The command writes the following under `reproduction-output/` unless `ACQUISITION_REPORT_DIR` is set:

- `commit-sha.txt` — exact source commit.
- `artifact-sha256.txt` — SHA-256 manifest for reports, scope, and threat model.
- `audit_50000_receipt.json` — machine-readable campaign receipt.
- `ACQUISITION_PORTFOLIO_STRESS_REPORT.md` — consolidated acquisition evidence.

The reviewer should retain the full terminal output and environment details. A reviewer-controlled run should not overwrite the expected-results files before the independent result is captured.

## Scope limitation

This is an internal reproducibility package, not an independent security certification. It does not yet cover production cloud infrastructure, distributed concurrency, network transport, key custody and rotation, revocation operations, or legal IP ownership. Those are explicit follow-up review areas.
