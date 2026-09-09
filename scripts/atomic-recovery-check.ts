import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { AtomicJournalIntegrityError, LocalAtomicJournal } from '../src/kernel/atomicJournal';
import { commitAuthorityTransaction, prepareAuthorityTransaction, type PreparedAuthorityTransaction } from '../src/kernel/atomicTransaction';

function makePrepared(id: string, priorStateVersion: number, idempotencyKey = `idem-${id}`, requestHash = `request-${id}`): PreparedAuthorityTransaction {
  return prepareAuthorityTransaction({
    transactionId: `tx-${id}`,
    priorStateVersion,
    nextStateVersion: priorStateVersion + 1,
    state: { authorityVersion: priorStateVersion + 1, status: 'ACTIVE' },
    event: { type: 'AUTHORITY_GRANTED', subjectId: `subject-${id}` },
    replay: { idempotencyKey, canonicalRequestHash: requestHash },
    receipt: {
      receiptId: `receipt-${id}`,
      requestHash,
      eventHash: `event-${id}`,
      stateVersion: priorStateVersion + 1,
      payload: { decision: 'GRANTED', transaction: id },
    },
  });
}

function expectIntegrityFailure(action: () => void, label: string): void {
  assert.throws(action, AtomicJournalIntegrityError, label);
}

const dir = mkdtempSync(join(tmpdir(), 'cranium-atomic-'));
const journalPath = join(dir, 'journal.ndjson');

try {
  const journal = new LocalAtomicJournal(journalPath);
  const first = makePrepared('001', 7);

  journal.appendPrepared(first);
  assert.equal(journal.recover().committed.length, 0, 'prepared-only crash must not recover as committed');

  const firstCommit = commitAuthorityTransaction(first, 1, null);
  journal.appendCommitted(firstCommit);
  let recovered = journal.recover();
  assert.equal(recovered.committed.length, 1, 'committed-before-publish crash must recover exactly one transaction');
  assert.equal(recovered.committed[0].prepared.transactionId, first.transactionId);
  assert.equal(recovered.committed[0].prepared.nextStateVersion, 8);
  assert.equal(recovered.lastSequence, 1);

  const second = makePrepared('002', 8);
  journal.appendPrepared(second);
  journal.appendCommitted(commitAuthorityTransaction(second, 2, recovered.lastJournalHash));
  recovered = journal.recover();
  assert.equal(recovered.committed.length, 2, 'two valid sequential transactions must recover');
  assert.equal(recovered.committed[1].prepared.priorStateVersion, 8);
  assert.equal(recovered.committed[1].prepared.nextStateVersion, 9);

  const original = readFileSync(journalPath, 'utf8');

  writeFileSync(journalPath, original.replace('AUTHORITY_GRANTED', 'AUTHORITY_DENIED'), 'utf8');
  expectIntegrityFailure(() => journal.recover(), 'prepared payload tampering must fail closed');

  writeFileSync(journalPath, original.replace('tx-002', 'tx-forged'), 'utf8');
  expectIntegrityFailure(() => journal.recover(), 'transaction ID tampering must fail closed');

  writeFileSync(journalPath, original.replace('"sequence":2', '"sequence":3'), 'utf8');
  expectIntegrityFailure(() => journal.recover(), 'sequence tampering must fail closed');

  writeFileSync(journalPath, original.replace('"previousJournalHash":"' + recovered.committed[0].committed.journalHash + '"', '"previousJournalHash":"forged"'), 'utf8');
  expectIntegrityFailure(() => journal.recover(), 'predecessor hash tampering must fail closed');

  writeFileSync(journalPath, original.replace('"requestHash":"request-001"', '"requestHash":"forged-request"'), 'utf8');
  expectIntegrityFailure(() => journal.recover(), 'receipt/request binding tampering must fail closed');

  writeFileSync(journalPath, original.trimEnd(), 'utf8');
  expectIntegrityFailure(() => journal.recover(), 'truncated trailing frame must fail closed');

  const conflictPath = join(dir, 'conflict.ndjson');
  const conflictJournal = new LocalAtomicJournal(conflictPath);
  const conflictFirst = makePrepared('conflict-1', 0, 'shared-idempotency', 'request-A');
  conflictJournal.appendPrepared(conflictFirst);
  conflictJournal.appendCommitted(commitAuthorityTransaction(conflictFirst, 1, null));
  const conflictSecond = makePrepared('conflict-2', 1, 'shared-idempotency', 'request-B');
  conflictJournal.appendPrepared(conflictSecond);
  conflictJournal.appendCommitted(commitAuthorityTransaction(conflictSecond, 2, conflictJournal.recover().lastJournalHash));
  expectIntegrityFailure(() => conflictJournal.recover(), 'same key with different request hash must fail closed after restart');

  const duplicatePath = join(dir, 'duplicate.ndjson');
  writeFileSync(duplicatePath, original + original.split('\n').filter(Boolean)[1] + '\n', 'utf8');
  expectIntegrityFailure(() => new LocalAtomicJournal(duplicatePath).recover(), 'duplicate committed frame must fail closed');

  console.log('Atomic recovery proof passed: staged crash ignored; committed recovery exact; state continuity, replay conflict, receipt binding, chain, sequence, payload, transaction-ID, duplicate-frame, and truncated-frame tampering fail closed.');
} finally {
  rmSync(dir, { recursive: true, force: true });
}
