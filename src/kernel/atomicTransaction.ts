import { sha256 } from './sha256';

export type AtomicJson = null | boolean | number | string | AtomicJson[] | { [key: string]: AtomicJson };

export interface AtomicReplayIdentity {
  idempotencyKey: string;
  canonicalRequestHash: string;
}

export interface AtomicReceiptBinding {
  receiptId: string;
  requestHash: string;
  eventHash: string;
  stateVersion: number;
}

export interface PreparedAuthorityTransaction {
  kind: 'PREPARED';
  transactionId: string;
  priorStateVersion: number;
  nextStateVersion: number;
  state: AtomicJson;
  event: AtomicJson;
  replay: AtomicReplayIdentity;
  receipt: AtomicReceiptBinding & { payload: AtomicJson };
  transactionHash: string;
}

export interface CommittedAuthorityTransaction {
  kind: 'COMMITTED';
  transactionId: string;
  transactionHash: string;
  sequence: number;
  previousJournalHash: string | null;
  journalHash: string;
}

export type AtomicJournalFrame = PreparedAuthorityTransaction | CommittedAuthorityTransaction;

export function canonicalize(value: AtomicJson): string {
  if (value === null) return 'null';
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) throw new Error('Non-finite number is not canonical JSON');
    return JSON.stringify(value);
  }
  if (typeof value === 'string') return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalize).join(',')}]`;
  const record = value as { [key: string]: AtomicJson };
  return `{${Object.keys(record).sort().map((k) => `${JSON.stringify(k)}:${canonicalize(record[k])}`).join(',')}}`;
}

export function prepareTransaction(
  transactionId: string,
  state: AtomicJson,
  event: AtomicJson,
  replay: AtomicReplayIdentity,
  receipt: AtomicReceiptBinding & { payload: AtomicJson },
  priorVersion: number
): PreparedAuthorityTransaction {
  const transactionHash = sha256(canonicalize({
    transactionId,
    priorStateVersion: priorVersion,
    nextStateVersion: priorVersion + 1,
    state,
    event,
    replay: replay as unknown as AtomicJson,
    receipt: receipt as unknown as AtomicJson,
  } as unknown as AtomicJson));
  return {
    kind: 'PREPARED',
    transactionId,
    priorStateVersion: priorVersion,
    nextStateVersion: priorVersion + 1,
    state,
    event,
    replay,
    receipt,
    transactionHash,
  };
}

export function verifyPrepared(frame: PreparedAuthorityTransaction): boolean {
  if (frame.kind !== 'PREPARED') return false;
  if (!frame.transactionId || frame.priorStateVersion < 0 || frame.nextStateVersion !== frame.priorStateVersion + 1) return false;
  if (!frame.replay.idempotencyKey || !frame.replay.canonicalRequestHash) return false;
  if (frame.receipt.requestHash !== frame.replay.canonicalRequestHash) return false;
  if (frame.receipt.stateVersion !== frame.nextStateVersion) return false;
  const expectedHash = sha256(canonicalize({
    transactionId: frame.transactionId,
    priorStateVersion: frame.priorStateVersion,
    nextStateVersion: frame.nextStateVersion,
    state: frame.state,
    event: frame.event,
    replay: frame.replay as unknown as AtomicJson,
    receipt: frame.receipt as unknown as AtomicJson,
  } as unknown as AtomicJson));
  return frame.transactionHash === expectedHash;
}

export function verifyCommitted(frame: CommittedAuthorityTransaction): boolean {
  if (frame.kind !== 'COMMITTED') return false;
  if (!frame.transactionId || !frame.transactionHash || frame.sequence < 1) return false;
  const expectedHash = sha256(canonicalize({
    transactionHash: frame.transactionHash,
    sequence: frame.sequence,
    previousJournalHash: frame.previousJournalHash,
  } as unknown as AtomicJson));
  return frame.journalHash === expectedHash;
}

export function prepareAuthorityTransaction(input: {
  transactionId: string;
  priorStateVersion: number;
  nextStateVersion: number;
  state: AtomicJson;
  event: AtomicJson;
  replay: AtomicReplayIdentity;
  receipt: AtomicReceiptBinding & { payload: AtomicJson };
}): PreparedAuthorityTransaction {
  if (input.nextStateVersion !== input.priorStateVersion + 1) {
    throw new Error('nextStateVersion must advance exactly one version');
  }
  return prepareTransaction(
    input.transactionId,
    input.state,
    input.event,
    input.replay,
    input.receipt,
    input.priorStateVersion
  );
}

export function commitAuthorityTransaction(
  prepared: PreparedAuthorityTransaction,
  sequence: number,
  previousJournalHash: string | null
): CommittedAuthorityTransaction {
  if (!verifyPrepared(prepared)) throw new Error('Cannot commit invalid prepared transaction');
  if (sequence < 1) throw new Error('Journal sequence must start at one');
  const journalHash = sha256(canonicalize({
    transactionHash: prepared.transactionHash,
    sequence,
    previousJournalHash,
  } as unknown as AtomicJson));
  return {
    kind: 'COMMITTED',
    transactionId: prepared.transactionId,
    transactionHash: prepared.transactionHash,
    sequence,
    previousJournalHash,
    journalHash,
  };
}

export class AtomicJournal {
  private readonly frames: AtomicJournalFrame[] = [];
  private headHash: string | null = null;

  commit(prepared: PreparedAuthorityTransaction): CommittedAuthorityTransaction {
    if (prepared.kind !== 'PREPARED') throw new Error('Can only commit PREPARED transactions');
    const sequence = this.frames.length;
    const journalPayload = canonicalize({
      transactionHash: prepared.transactionHash,
      sequence,
      previousJournalHash: this.headHash,
    } as unknown as AtomicJson);
    const journalHash = sha256(journalPayload);
    const committed: CommittedAuthorityTransaction = {
      kind: 'COMMITTED',
      transactionId: prepared.transactionId,
      transactionHash: prepared.transactionHash,
      sequence,
      previousJournalHash: this.headHash,
      journalHash,
    };
    this.frames.push(committed);
    this.headHash = journalHash;
    return committed;
  }

  verify(): { intact: boolean; brokenAtIndex: number } {
    let previousHash: string | null = null;
    for (let i = 0; i < this.frames.length; i++) {
      const frame = this.frames[i];
      if (frame.kind !== 'COMMITTED') return { intact: false, brokenAtIndex: i };
      if (frame.previousJournalHash !== previousHash) return { intact: false, brokenAtIndex: i };
      const expectedHash = sha256(canonicalize({
        transactionHash: frame.transactionHash,
        sequence: frame.sequence,
        previousJournalHash: frame.previousJournalHash,
      } as unknown as AtomicJson));
      if (frame.journalHash !== expectedHash) return { intact: false, brokenAtIndex: i };
      previousHash = frame.journalHash;
    }
    return { intact: true, brokenAtIndex: -1 };
  }

  get length(): number { return this.frames.length; }
  get head(): string | null { return this.headHash; }
  entries(): readonly AtomicJournalFrame[] { return this.frames; }
}
