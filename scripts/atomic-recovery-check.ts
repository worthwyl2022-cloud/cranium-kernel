import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { LocalAtomicJournal, AtomicJournalIntegrityError } from '../src/kernel/atomicJournal';
import { commitAuthorityTransaction, prepareAuthorityTransaction } from '../src/kernel/atomicTransaction';

const dir = mkdtempSync(join(tmpdir(), 'cranium-atomic-'));
const journalPath = join(dir, 'journal.ndjson');

try {
  const journal = new LocalAtomicJournal(journalPath);
  const prepared = prepareAuthorityTransaction({
    transactionId: 'tx-001',
    priorStateVersion: 7,
    nextStateVersion: 8,
    state: { authorityVersion: 8, status: 'ACTIVE' },
    event: { type: 'AUTHORITY_GRANTED', subjectId: 'subject-1' },
    replay: { idempotencyKey: 'idem-001', canonicalRequestHash: 'request-hash-001' },
    receipt: { receiptId: 'receipt-001', requestHash: 'request-hash-001', eventHash: 'event-hash-001', stateVersion: 8, payload: { decision: 'GRANTED' } },
  });

  journal.appendPrepared(prepared);
  assert.equal(journal.recover().committed.length, 0, 'prepared-only entry must not recover as committed');

  const committed = commitAuthorityTransaction(prepared, 1, null);
  journal.appendCommitted(committed);
  const recovered = journal.recover();
  assert.equal(recovered.committed.length, 1, 'matching committed pair must recover');
  assert.equal(recovered.committed[0].prepared.transactionId, 'tx-001');
  assert.equal(recovered.lastSequence, 1);

  const original = readFileSync(journalPath, 'utf8');
  writeFileSync(journalPath, original.replace('AUTHORITY_GRANTED', 'AUTHORITY_DENIED'), 'utf8');
  assert.throws(() => journal.recover(), AtomicJournalIntegrityError, 'tampered prepared payload must fail closed');

  writeFileSync(journalPath, original.replace('"sequence":1', '"sequence":2'), 'utf8');
  assert.throws(() => journal.recover(), AtomicJournalIntegrityError, 'non-sequential committed frame must fail closed');

  console.log('Atomic recovery check passed: prepared-only ignored; committed pair recovers; tampering fails closed.');
} finally {
  rmSync(dir, { recursive: true, force: true });
}
