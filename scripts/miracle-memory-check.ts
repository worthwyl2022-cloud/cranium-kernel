/**
 * Miracle Memory — Integration Check
 *
 * Verifies:
 * 1. Genesis seeding (axioms, canon, Prime Directive articles)
 * 2. Write/read/search cycle
 * 3. Promotion pipeline (PROVISIONAL → CANON)
 * 4. Quarantine and release cycle
 * 5. CONSTITUTIONAL immutability
 * 6. Journal integrity chain
 * 7. Snapshot and restore with integrity verification
 * 8. Snapshot tamper detection
 * 9. Tier weight clamping
 * 10. Demotion via write() blocked (must use quarantine())
 *
 * Run: npx tsx scripts/miracle-memory-check.ts
 *
 * © 2026 Wyl Mathes. All Rights Reserved.
 */

import * as assert from 'node:assert/strict';

async function run() {
  console.log('\n═══════════════════════════════════════════');
  console.log('  MIRACLE MEMORY — INTEGRATION CHECK');
  console.log('═══════════════════════════════════════════\n');

  const { MiracleMemoryStore } = await import('../src/memory/MiracleMemoryStore');
  const { MiracleGenesis } = await import('../src/memory/genesis');
  const { MemoryTier } = await import('../src/memory/types');
  const { AtomKind, CognitiveStatus, AuthorityClass } = await import('../src/kernel/types');

  let passed = 0;
  let failed = 0;

  function check(name: string, fn: () => void) {
    try {
      fn();
      console.log(`  ✅ ${name}`);
      passed++;
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      console.log(`  ❌ ${name}`);
      console.log(`     ${msg}`);
      failed++;
    }
  }

  // ── 1. Genesis seeding ──────────────────────────────────────────────
  console.log('\n── Genesis Seeding ──');

  const memory = new MiracleMemoryStore();
  const genesis = new MiracleGenesis(memory);
  const seedResult = genesis.seed();

  check('Genesis seeds correct atom counts', () => {
    assert.equal(seedResult.axiomsSeeded, 2, 'Expected 2 root axioms');
    assert.equal(seedResult.canonSeeded, 1, 'Expected 1 architectural canon');
    assert.equal(seedResult.directivesSeeded, 8, 'Expected 8 Prime Directive articles');
    assert.equal(seedResult.alreadyExisted, 0, 'Expected 0 pre-existing');
  });

  check('Genesis is idempotent', () => {
    const secondSeed = genesis.seed();
    assert.equal(secondSeed.axiomsSeeded, 0);
    assert.equal(secondSeed.canonSeeded, 0);
    assert.equal(secondSeed.directivesSeeded, 0);
    assert.equal(secondSeed.alreadyExisted, 11);
  });

  check('Genesis total matches expected', () => {
    assert.equal(memory.size, MiracleGenesis.totalGenesisAtoms);
  });

  check('CONSTITUTIONAL atoms count correct', () => {
    assert.equal(memory.countByTier(MemoryTier.CONSTITUTIONAL), 10); // 2 axioms + 8 directives
  });

  check('CANON atoms count correct', () => {
    assert.equal(memory.countByTier(MemoryTier.CANON), 1); // 1 architectural canon
  });

  check('Root axiom readable and correct tier', () => {
    const axiom = memory.read('atom-axiom-001');
    assert.ok(axiom, 'atom-axiom-001 should exist');
    assert.equal(axiom.tier, MemoryTier.CONSTITUTIONAL);
    assert.equal(axiom.weight, 1.0);
    assert.ok(axiom.atom.content.includes('Authority is not claimed'));
  });

  check('Prime Directive Article 5 readable', () => {
    const art5 = memory.read('atom-directive-005');
    assert.ok(art5, 'Article 5 should exist');
    assert.equal(art5.tier, MemoryTier.CONSTITUTIONAL);
    assert.ok(art5.atom.content.includes('Human Oversight'));
  });

  // ── 2. Write/Read/Search ────────────────────────────────────────────
  console.log('\n── Write / Read / Search ──');

  const testAtom = {
    id: 'test-provisional-001',
    kind: AtomKind.HYPOTHESIS,
    status: CognitiveStatus.PROVISIONAL,
    content: 'The immune layer should integrate with the TypeScript kernel.',
    authority: { authorityClass: AuthorityClass.WORKING, weight: 0.5 },
    provenance: {
      source: 'test',
      authorId: 'integration-check',
      sourceTimestamp: Date.now(),
    },
    createdAt: Date.now(),
    tags: ['hypothesis', 'immune-integration'],
  };

  check('Write PROVISIONAL atom', () => {
    const written = memory.write({
      atom: testAtom,
      tier: MemoryTier.PROVISIONAL,
      weight: 0.5,
      receiptHash: 'test-receipt-hash-0123456789abcdef',
    });
    assert.equal(written.tier, MemoryTier.PROVISIONAL);
    assert.equal(written.weight, 0.5);
  });

  check('Read returns the written atom', () => {
    const read = memory.read('test-provisional-001');
    assert.ok(read);
    assert.equal(read.atom.content, testAtom.content);
  });

  check('Search finds by content substring', () => {
    const results = memory.search('immune layer');
    assert.ok(results.length >= 1);
    assert.equal(results[0].atom.id, 'test-provisional-001');
  });

  check('Search finds by tag', () => {
    const results = memory.search('immune-integration');
    assert.ok(results.length >= 1);
  });

  // ── 3. Promotion pipeline ──────────────────────────────────────────
  console.log('\n── Promotion Pipeline ──');

  check('Promote PROVISIONAL → CANON', () => {
    const promoted = memory.promote(
      'test-provisional-001',
      'promotion-receipt-hash-0123456789abcdef',
      0.95
    );
    assert.equal(promoted.tier, MemoryTier.CANON);
    assert.equal(promoted.weight, 0.95);
  });

  check('Cannot promote non-PROVISIONAL atom', () => {
    assert.throws(
      () => memory.promote('test-provisional-001', 'another-receipt-hash-01234567', 0.95),
      /not PROVISIONAL/
    );
  });

  check('Cannot promote without receipt hash', () => {
    // Write another provisional first
    memory.write({
      atom: { ...testAtom, id: 'test-provisional-002' },
      tier: MemoryTier.PROVISIONAL,
      weight: 0.3,
      receiptHash: 'test-receipt-hash-0123456789abcdef',
    });
    assert.throws(
      () => memory.promote('test-provisional-002', '', 0.95),
      /receipt hash is required/
    );
  });

  // ── 4. Quarantine and release ──────────────────────────────────────
  console.log('\n── Quarantine / Release ──');

  check('Quarantine a CANON atom', () => {
    const quarantined = memory.quarantine(
      'test-provisional-001',
      'Failed adversarial boundary check ADV-03',
      'quarantine-receipt-hash-0123456789abcdef'
    );
    assert.equal(quarantined.tier, MemoryTier.QUARANTINED);
    assert.equal(quarantined.weight, 0);
    assert.equal(quarantined.humanReviewed, false);
  });

  check('Cannot quarantine without reason', () => {
    memory.write({
      atom: { ...testAtom, id: 'test-provisional-003' },
      tier: MemoryTier.PROVISIONAL,
      weight: 0.4,
      receiptHash: 'test-receipt-hash-0123456789abcdef',
    });
    assert.throws(
      () => memory.quarantine('test-provisional-003', '', 'receipt-hash-0123456789abcdef'),
      /without a reason/
    );
  });

  check('Release quarantined atom back to PROVISIONAL', () => {
    const released = memory.release(
      'test-provisional-001',
      'release-receipt-hash-0123456789abcdef'
    );
    assert.equal(released.tier, MemoryTier.PROVISIONAL);
    assert.equal(released.weight, 0.5);
  });

  // ── 5. CONSTITUTIONAL immutability ─────────────────────────────────
  console.log('\n── Constitutional Immutability ──');

  check('Cannot overwrite CONSTITUTIONAL atom', () => {
    assert.throws(
      () => memory.write({
        atom: { ...testAtom, id: 'atom-axiom-001', content: 'TAMPERED' },
        tier: MemoryTier.CONSTITUTIONAL,
        weight: 1.0,
        receiptHash: 'fake-receipt-hash-0123456789abcdef',
      }),
      /immutable/
    );
  });

  check('Cannot quarantine CONSTITUTIONAL atom', () => {
    assert.throws(
      () => memory.quarantine('atom-axiom-001', 'trying to quarantine', 'receipt-hash-0123456789abcdef'),
      /immune to quarantine/
    );
  });

  check('CONSTITUTIONAL atom content unchanged after tamper attempt', () => {
    const axiom = memory.read('atom-axiom-001');
    assert.ok(axiom);
    assert.ok(axiom.atom.content.includes('Authority is not claimed'));
    assert.ok(!axiom.atom.content.includes('TAMPERED'));
  });

  // ── 6. Journal integrity ───────────────────────────────────────────
  console.log('\n── Journal Integrity ──');

  check('Journal has entries for all operations', () => {
    assert.ok(memory.journalLength > 0, 'Journal should not be empty');
  });

  check('Journal integrity chain is intact', () => {
    const result = memory.verifyJournalIntegrity();
    assert.ok(result.intact, `Chain broken at index ${result.brokenAtIndex}`);
  });

  // ── 7. Snapshot / Restore ──────────────────────────────────────────
  console.log('\n── Snapshot / Restore ──');

  check('Snapshot captures current state', () => {
    const snap = memory.snapshot();
    assert.ok(snap.integrityHash.length === 64, 'Integrity hash should be 64 hex chars');
    assert.ok(snap.atoms.length > 0);
    assert.equal(snap.journalHead, memory.journalLength - 1); // -1 because snapshot adds one more entry
  });

  check('Restore from snapshot succeeds', () => {
    const snap = memory.snapshot();
    const freshMemory = new MiracleMemoryStore();
    freshMemory.restore(snap);
    assert.equal(freshMemory.size, snap.atoms.length);
    const axiom = freshMemory.read('atom-axiom-001');
    assert.ok(axiom);
    assert.equal(axiom.tier, MemoryTier.CONSTITUTIONAL);
  });

  // ── 8. Tamper detection ────────────────────────────────────────────
  console.log('\n── Tamper Detection ──');

  check('Tampered snapshot rejected on restore', () => {
    const snap = memory.snapshot();
    // Tamper with an atom's weight
    const tampered = JSON.parse(JSON.stringify(snap));
    tampered.atoms[0].weight = 0.01;
    const freshMemory = new MiracleMemoryStore();
    assert.throws(
      () => freshMemory.restore(tampered),
      /integrity check failed/
    );
  });

  // ── 9. Weight clamping ─────────────────────────────────────────────
  console.log('\n── Weight Clamping ──');

  check('CANON weight clamped to 0.90-0.99', () => {
    memory.write({
      atom: { ...testAtom, id: 'test-clamping-canon' },
      tier: MemoryTier.CANON,
      weight: 0.5, // below CANON floor
      receiptHash: 'clamp-receipt-hash-0123456789abcdef',
    });
    const read = memory.read('test-clamping-canon');
    assert.ok(read);
    assert.equal(read.weight, 0.90);
  });

  check('PROVISIONAL weight clamped to 0.01-0.89', () => {
    memory.write({
      atom: { ...testAtom, id: 'test-clamping-prov' },
      tier: MemoryTier.PROVISIONAL,
      weight: 0.95, // above PROVISIONAL ceiling
      receiptHash: 'clamp-receipt-hash-0123456789abcdef',
    });
    const read = memory.read('test-clamping-prov');
    assert.ok(read);
    assert.equal(read.weight, 0.89);
  });

  // ── 10. Demotion block ─────────────────────────────────────────────
  console.log('\n── Demotion Block ──');

  check('Cannot demote via write() — must use quarantine()', () => {
    assert.throws(
      () => memory.write({
        atom: { ...testAtom, id: 'test-clamping-canon' },
        tier: MemoryTier.PROVISIONAL,
        weight: 0.5,
        receiptHash: 'demote-receipt-hash-0123456789abcdef',
      }),
      /Use quarantine/
    );
  });

  // ── Summary ────────────────────────────────────────────────────────
  console.log('\n═══════════════════════════════════════════');
  console.log(`  RESULTS: ${passed} passed, ${failed} failed`);
  console.log('═══════════════════════════════════════════\n');

  if (failed > 0) {
    console.log('  ⚠️  MIRACLE MEMORY CHECK FAILED');
    process.exit(1);
  } else {
    console.log('  ✅ MIRACLE MEMORY CHECK PASSED');
    console.log(`  📊 Memory state: ${memory.size} atoms, ${memory.journalLength} journal entries`);
    console.log(`     CONSTITUTIONAL: ${memory.countByTier(MemoryTier.CONSTITUTIONAL)}`);
    console.log(`     CANON: ${memory.countByTier(MemoryTier.CANON)}`);
    console.log(`     PROVISIONAL: ${memory.countByTier(MemoryTier.PROVISIONAL)}`);
    console.log(`     QUARANTINED: ${memory.countByTier(MemoryTier.QUARANTINED)}`);
    console.log(`     Journal integrity: ${memory.verifyJournalIntegrity().intact ? 'INTACT' : 'BROKEN'}`);
  }
}

run().catch((e) => {
  console.error('Integration check crashed:', e);
  process.exit(1);
});
