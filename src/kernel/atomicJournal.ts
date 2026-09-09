import { appendFileSync, existsSync, readFileSync } from 'node:fs';
import {
  AtomicJournalFrame,
  CommittedAuthorityTransaction,
  PreparedAuthorityTransaction,
  verifyCommitted,
  verifyPrepared,
} from './atomicTransaction';

export class AtomicJournalIntegrityError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AtomicJournalIntegrityError';
  }
}

export interface RecoveredAtomicTransaction {
  prepared: PreparedAuthorityTransaction;
  committed: CommittedAuthorityTransaction;
}

export interface RecoveredAtomicJournal {
  committed: RecoveredAtomicTransaction[];
  lastSequence: number;
  lastJournalHash: string | null;
}

function parseFrame(line: string, lineNumber: number): AtomicJournalFrame {
  try {
    const value = JSON.parse(line) as AtomicJournalFrame;
    if (!value || (value.kind !== 'PREPARED' && value.kind !== 'COMMITTED')) {
      throw new Error('invalid frame kind');
    }
    return value;
  } catch (error) {
    throw new AtomicJournalIntegrityError(`Invalid journal JSON at line ${lineNumber}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

function journalLines(raw: string): string[] {
  const lines = raw.split('\n');
  if (lines.length > 1 && lines.at(-1) === '') lines.pop();
  for (let index = 0; index < lines.length; index += 1) {
    if (lines[index].trim().length === 0) {
      throw new AtomicJournalIntegrityError(`Blank journal frame at line ${index + 1}`);
    }
  }
  return lines;
}

export class LocalAtomicJournal {
  constructor(private readonly journalPath: string) {
    if (!journalPath) throw new Error('journalPath is required');
  }

  appendPrepared(frame: PreparedAuthorityTransaction): void {
    if (!verifyPrepared(frame)) throw new AtomicJournalIntegrityError('Refusing invalid prepared frame');
    this.append(frame);
  }

  appendCommitted(frame: CommittedAuthorityTransaction): void {
    if (!verifyCommitted(frame)) throw new AtomicJournalIntegrityError('Refusing invalid committed frame');
    this.append(frame);
  }

  recover(): RecoveredAtomicJournal {
    if (!existsSync(this.journalPath)) return { committed: [], lastSequence: 0, lastJournalHash: null };
    const raw = readFileSync(this.journalPath, 'utf8');
    if (raw.length === 0) return { committed: [], lastSequence: 0, lastJournalHash: null };
    if (!raw.endsWith('\n')) throw new AtomicJournalIntegrityError('Journal must end with a newline-delimited complete frame');
    const lines = journalLines(raw);
    const prepared = new Map<string, PreparedAuthorityTransaction>();
    const committed: RecoveredAtomicTransaction[] = [];
    const seenTransactions = new Set<string>();
    const requestHashesByIdempotencyKey = new Map<string, string>();
    const receiptIds = new Set<string>();
    let lastSequence = 0;
    let lastJournalHash: string | null = null;

    for (let index = 0; index < lines.length; index += 1) {
      const frame = parseFrame(lines[index], index + 1);
      if (frame.kind === 'PREPARED') {
        if (!verifyPrepared(frame)) throw new AtomicJournalIntegrityError(`Prepared integrity failure at line ${index + 1}`);
        if (prepared.has(frame.transactionId) || seenTransactions.has(frame.transactionId)) throw new AtomicJournalIntegrityError(`Duplicate transaction ${frame.transactionId}`);
        prepared.set(frame.transactionId, frame);
        continue;
      }
      if (!verifyCommitted(frame)) throw new AtomicJournalIntegrityError(`Committed integrity failure at line ${index + 1}`);
      if (frame.sequence !== lastSequence + 1) throw new AtomicJournalIntegrityError(`Non-sequential commit at line ${index + 1}`);
      if (frame.previousJournalHash !== lastJournalHash) throw new AtomicJournalIntegrityError(`Broken journal chain at line ${index + 1}`);
      const staged = prepared.get(frame.transactionId);
      if (!staged) throw new AtomicJournalIntegrityError(`Committed frame without prepared frame at line ${index + 1}`);
      if (staged.transactionHash !== frame.transactionHash) throw new AtomicJournalIntegrityError(`Prepared/committed hash mismatch at line ${index + 1}`);
      if (seenTransactions.has(frame.transactionId)) throw new AtomicJournalIntegrityError(`Duplicate committed transaction ${frame.transactionId}`);
      if (staged.receipt.requestHash !== staged.replay.canonicalRequestHash) throw new AtomicJournalIntegrityError(`Receipt/request binding failure at line ${index + 1}`);
      if (staged.receipt.stateVersion !== staged.nextStateVersion) throw new AtomicJournalIntegrityError(`Receipt/state binding failure at line ${index + 1}`);
      if (receiptIds.has(staged.receipt.receiptId)) throw new AtomicJournalIntegrityError(`Duplicate receipt ${staged.receipt.receiptId}`);
      const knownHash = requestHashesByIdempotencyKey.get(staged.replay.idempotencyKey);
      if (knownHash !== undefined) {
        if (knownHash !== staged.replay.canonicalRequestHash) throw new AtomicJournalIntegrityError(`Conflicting replay reuse at line ${index + 1}`);
        throw new AtomicJournalIntegrityError(`Duplicate replay identity at line ${index + 1}`);
      }
      const prior = committed.at(-1)?.prepared.nextStateVersion;
      if (prior !== undefined && staged.priorStateVersion !== prior) throw new AtomicJournalIntegrityError(`Non-monotonic state version at line ${index + 1}`);
      requestHashesByIdempotencyKey.set(staged.replay.idempotencyKey, staged.replay.canonicalRequestHash);
      receiptIds.add(staged.receipt.receiptId);
      seenTransactions.add(frame.transactionId);
      prepared.delete(frame.transactionId);
      committed.push({ prepared: staged, committed: frame });
      lastSequence = frame.sequence;
      lastJournalHash = frame.journalHash;
    }

    return { committed, lastSequence, lastJournalHash };
  }

  private append(frame: AtomicJournalFrame): void {
    appendFileSync(this.journalPath, `${JSON.stringify(frame)}\n`, { encoding: 'utf8', flag: 'a' });
  }
}
