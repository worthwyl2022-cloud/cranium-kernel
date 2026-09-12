#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

EXPECTED_MERKLE_ROOT="d1f1446c0e2feba5a9153014270b982576d46591da61ba037fd63711e4424da3"
REPORT_DIR="${ACQUISITION_REPORT_DIR:-$ROOT/reproduction-output}"
mkdir -p "$REPORT_DIR"

printf 'System under review: cranium-kernel\n'
printf 'Commit: '; git rev-parse HEAD
printf 'Node: '; node --version
printf 'npm: '; npm --version
printf 'Timestamp: '; date -u +%Y-%m-%dT%H:%M:%SZ

npm ci --ignore-scripts
npm run verify
npx tsx scripts/synapse-contract-smoke.ts
npx tsx scripts/synapse-integration-check.ts
npx tsx scripts/atomic-recovery-check.ts
npx tsx scripts/run_50000_stress.ts

node --input-type=module <<'NODE'
import fs from 'node:fs';
const expected = 'd1f1446c0e2feba5a9153014270b982576d46591da61ba037fd63711e4424da3';
const report = JSON.parse(fs.readFileSync('public/receipts/audit_50000_receipt.json', 'utf8'));
if (!report.overallPassed) throw new Error('50K campaign did not pass overall invariant check');
if (report.totalTestsRun !== 50000) throw new Error(`Expected 50000 tests, got ${report.totalTestsRun}`);
if (report.attackDefensesCount !== 45000) throw new Error(`Expected 45000 attack defenses, got ${report.attackDefensesCount}`);
if (report.legitimateGrantsCount !== 5000) throw new Error(`Expected 5000 valid grants, got ${report.legitimateGrantsCount}`);
if (report.masterMerkleRoot !== expected) throw new Error(`Merkle root mismatch: ${report.masterMerkleRoot}`);
console.log(`Acquisition reproduction accepted: ${report.totalTestsRun} tests; ${report.attackDefensesCount} attacks defended; ${report.legitimateGrantsCount} valid grants; Merkle root ${report.masterMerkleRoot}`);
NODE

sha256sum \
  public/receipts/audit_50000_receipt.json \
  ACQUISITION_AUDIT_REPORT_50000.md \
  ACQUISITION_PORTFOLIO_STRESS_REPORT.md \
  SECURITY_SCOPE.md \
  THREAT_MODEL.md \
  > "$REPORT_DIR/artifact-sha256.txt"

git rev-parse HEAD > "$REPORT_DIR/commit-sha.txt"
cp public/receipts/audit_50000_receipt.json "$REPORT_DIR/audit_50000_receipt.json"
cp ACQUISITION_PORTFOLIO_STRESS_REPORT.md "$REPORT_DIR/ACQUISITION_PORTFOLIO_STRESS_REPORT.md"
printf 'Reproduction artifacts written to %s\n' "$REPORT_DIR"
