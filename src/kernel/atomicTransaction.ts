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
  return `{${Object.keys(record).sort().map((key) => `${JSON.stringify(key)}:${canonicalize(record[key])}`).join(',')}}`;
}

function preparedMaterial(input: Omit<PreparedAuthorityTransaction, 'kind' | 'transactionHash'>): AtomicJson {
  return {
    transactionId: input.transactionId,
    priorStateVersion: input.priorStateVersion,
    nextStateVersion: input.nextStateVersion,
    state: input.state,
    event: input.event,
    replay: input.replay,
    receipt: input.receipt,
  };
}

export function prepareAuthorityTransaction(input: Omit<PreparedAuthorityTransaction, 'kind' | 'transactionHash'>): PreparedAuthorityTransaction {
  if (!input.transactionId) throw new Error('transactionId is required');
  if (!input.replay.idempotencyKey || !input.replay.canonicalRequestHash) throw new Error('replay identity is required');
  if (input.nextStateVersion !== input.priorStateVersion + 1) throw new Error('state version must advance by exactly one');
  if (input.receipt.stateVersion !== input.nextStateVersion) throw new Error('receipt state version must bind next state');
  const transactionHash = sha256(canonicalize(preparedMaterial(input)));
  return { kind: 'PREPARED', ...input, transactionHash };
}

export function commitAuthorityTransaction(prepared: PreparedAuthorityTransaction, sequence: number, previousJournalHash: string | null): CommittedAuthorityTransaction {
  if (!Number.isSafeInteger(sequence) || sequence < 1) throw new Error('sequence must be a positive safe integer');
  const material: AtomicJson = { transactionId: prepared.transactionId, transactionHash: prepared.transactionHash, sequence, previousJournalHash };
  return { kind: 'COMMITTED', transactionId: prepared.transactionId, transactionHash: prepared.transactionHash, sequence, previousJournalHash, journalHash: sha256(canonicalize(material)) };
}

export function verifyPrepared(frame: PreparedAuthorityTransaction): boolean {
  try {
    return frame.kind === 'PREPARED'
      && frame.transactionHash === sha256(canonicalize(preparedMaterial(frame)));
  } catch {
    return false;
  }
}

export function verifyCommitted(frame: CommittedAuthorityTransaction): boolean {
  try {
    const material: AtomicJson = { transactionId: frame.transactionId, transactionHash: frame.transactionHash, sequence: frame.sequence, previousJournalHash: frame.previousJournalHash };
    return frame.kind === 'COMMITTED'
      && Number.isSafeInteger(frame.sequence)
      && frame.sequence > 0
      && frame.journalHash === sha256(canonicalize(material));
  } catch {
    return false;
  }
}
