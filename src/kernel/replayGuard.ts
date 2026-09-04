import { ReplayStatus } from './types';

export interface ReplayRecord {
  idempotencyKey: string;
  canonicalRequestHashHex: string;
  transitionId: string;
  timestamp: number;
}

export class InMemoryReplayGuard {
  private records = new Map<string, ReplayRecord>();

  check(idempotencyKey: string, canonicalHashHex: string): ReplayStatus {
    const existing = this.records.get(idempotencyKey);
    if (!existing) {
      return { type: 'New' };
    }

    if (existing.canonicalRequestHashHex === canonicalHashHex) {
      return {
        type: 'Existing',
        transitionId: existing.transitionId,
        cachedTimestamp: existing.timestamp,
      };
    }

    return {
      type: 'ConflictingReuse',
      reason: `Idempotency key '${idempotencyKey}' was previously bound to hash ${existing.canonicalRequestHashHex.slice(0, 16)}..., cannot reuse with different hash ${canonicalHashHex.slice(0, 16)}...`,
      priorHash: existing.canonicalRequestHashHex,
      attemptedHash: canonicalHashHex,
    };
  }

  record(record: ReplayRecord): void {
    this.records.set(record.idempotencyKey, record);
  }

  getAllEntries(): ReplayRecord[] {
    return Array.from(this.records.values());
  }

  clear(): void {
    this.records.clear();
  }
}
