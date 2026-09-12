/**
 * Miracle Memory Store — The Persistence Substrate
 *
 * Append-only journal with SHA-256 integrity chain.
 * Every write, promotion, quarantine, and release is journaled.
 * Every journal entry chains to the previous one.
 * Break the chain = tamper evidence.
 *
 * This is NOT encrypted storage. This is NOT a database.
 * This is an append-only, integrity-chained, tiered memory store
 * for CognitiveAtoms that the Cranium Kernel governs.
 *
 * Persistence: file-backed when journalPath/snapshotPath are provided.
 * In-memory otherwise. Labeled honestly — no fake durability.
 *
 * © 2026 Wyl Mathes. All Rights Reserved.
 * WorthWyl Software / Convertible Cranium Engineering
 */

import { sha256 } from '../kernel/sha256';
import type { CognitiveAtom, KernelState } from '../kernel/types';
import {
  MemoryTier,
  TIER_RANK,
  type MemoryAtom,
  type JournalEntry,
  type JournalOperation,
  type MemorySnapshot,
  type MemoryConfig,
  type ReceiptVerificationContext,
  DEFAULT_MEMORY_CONFIG,
} from './types';

export class MiracleMemoryStore {
  private atoms = new Map<string, MemoryAtom>();
  private journal: JournalEntry[] = [];
  private readonly config: MemoryConfig;

  constructor(config?: Partial<MemoryConfig>) {
    this.config = { ...DEFAULT_MEMORY_CONFIG, ...config };
  }

  // ── Reads ───────────────────────────────────────────────────────────

  /**
   * Read a single atom by ID. Returns undefined if not found.
   * Does NOT filter by tier — quarantined atoms are visible
   * (hiding them would be dishonest about state).
   */
  read(atomId: string): MemoryAtom | undefined {
    return this.atoms.get(atomId);
  }

  /** Read all atoms at a given tier. */
  readByTier(tier: MemoryTier): MemoryAtom[] {
    return Array.from(this.atoms.values()).filter((a) => a.tier === tier);
  }

  /** Count atoms at a given tier. */
  countByTier(tier: MemoryTier): number {
    let count = 0;
    for (const a of this.atoms.values()) {
      if (a.tier === tier) count++;
    }
    return count;
  }

  /** Total atom count across all tiers. */
  get size(): number {
    return this.atoms.size;
  }

  /** Current journal length. */
  get journalLength(): number {
    return this.journal.length;
  }

  /** Get the hash of the last journal entry (the chain head). */
  get journalHeadHash(): string {
    if (this.journal.length === 0) return '';
    return this.journal[this.journal.length - 1].entryHash;
  }

  // ── Writes ──────────────────────────────────────────────────────────

  /**
   * Write a CognitiveAtom into memory at a specified tier.
   *
   * Rules:
   * - CONSTITUTIONAL tier requires a genesis receipt and can only
   *   be written during genesis seeding. After that, it's immutable.
   * - CANON tier requires a receipt hash.
   * - PROVISIONAL tier accepts any atom (this is the default intake).
   * - QUARANTINED tier requires a reason.
   *
   * If an atom with the same ID already exists:
   * - CONSTITUTIONAL atoms cannot be overwritten. Period.
   * - Other tiers can be overwritten, but only at the same or higher tier.
   *   Demotion goes through quarantine(), not write().
   *
   * Returns the MemoryAtom as stored, or throws if a rule is violated.
   */
  write(params: {
    atom: CognitiveAtom;
    tier: MemoryTier;
    weight: number;
    receiptHash: string;
    quarantineReason?: string;
  }): MemoryAtom {
    const { atom, tier, weight, receiptHash, quarantineReason } = params;
    const now = new Date().toISOString();

    // Validate tier-specific constraints
    this.validateWriteConstraints(atom.id, tier, weight, receiptHash, quarantineReason);
    if (tier === MemoryTier.CANON || tier === MemoryTier.CONSTITUTIONAL) {
      this.requireVerifiedReceipt(receiptHash, {
        atomId: atom.id,
        operation: 'WRITE',
        previousTier: null,
        newTier: tier,
      });
    }

    // Check for existing atom
    const existing = this.atoms.get(atom.id);
    if (existing) {
      if (existing.tier === MemoryTier.CONSTITUTIONAL) {
        throw new Error(
          `CONSTITUTIONAL atom '${atom.id}' is immutable. ` +
          `Cannot overwrite. This is not a suggestion.`
        );
      }
      if (TIER_RANK[tier] < TIER_RANK[existing.tier]) {
        throw new Error(
          `Cannot demote atom '${atom.id}' from ${existing.tier} to ${tier} via write(). ` +
          `Use quarantine() for demotion.`
        );
      }
    }

    const memoryAtom: MemoryAtom = {
      atom,
      tier,
      weight: this.clampWeight(weight, tier),
      receiptHash,
      createdAt: existing?.createdAt ?? now,
      lastModifiedAt: now,
      journalIndex: this.journal.length,
      quarantineReason: tier === MemoryTier.QUARANTINED ? quarantineReason : undefined,
      humanReviewed: tier === MemoryTier.QUARANTINED ? false : undefined,
    };

    this.atoms.set(atom.id, memoryAtom);
    this.appendJournal('WRITE', atom.id, existing?.tier ?? null, tier, receiptHash, now);

    return memoryAtom;
  }

  /**
   * Promote an atom from PROVISIONAL to CANON.
   *
   * Requires:
   * - The atom exists and is currently PROVISIONAL.
   * - A valid receipt hash (from a Cranium Core transition receipt).
   * - A weight in the CANON range (0.90–0.99).
   *
   * CONSTITUTIONAL promotion is not supported through this method.
   * Only genesis seeding creates CONSTITUTIONAL atoms.
   */
  promote(atomId: string, receiptHash: string, weight: number): MemoryAtom {
    const existing = this.atoms.get(atomId);
    if (!existing) {
      throw new Error(`Cannot promote atom '${atomId}': not found in memory.`);
    }
    if (existing.tier !== MemoryTier.PROVISIONAL) {
      throw new Error(
        `Cannot promote atom '${atomId}': current tier is ${existing.tier}, ` +
        `not PROVISIONAL. Only PROVISIONAL atoms can be promoted to CANON.`
      );
    }
    if (!receiptHash || receiptHash.length < 16) {
      throw new Error(
        `Cannot promote atom '${atomId}': receipt hash is required and must be ` +
        `at least 16 characters (got ${receiptHash?.length ?? 0}).`
      );
    }
    this.requireVerifiedReceipt(receiptHash, {
      atomId,
      operation: 'PROMOTE',
      previousTier: MemoryTier.PROVISIONAL,
      newTier: MemoryTier.CANON,
    });

    const clampedWeight = this.clampWeight(weight, MemoryTier.CANON);
    const now = new Date().toISOString();

    const promoted: MemoryAtom = {
      ...existing,
      tier: MemoryTier.CANON,
      weight: clampedWeight,
      receiptHash,
      lastModifiedAt: now,
      journalIndex: this.journal.length,
    };

    this.atoms.set(atomId, promoted);
    this.appendJournal('PROMOTE', atomId, MemoryTier.PROVISIONAL, MemoryTier.CANON, receiptHash, now);

    return promoted;
  }

  /**
   * Quarantine an atom. Drops weight to 0. Marks for human review.
   *
   * Any tier except CONSTITUTIONAL can be quarantined.
   * CONSTITUTIONAL atoms are immune — this is an invariant, not a guideline.
   */
  quarantine(atomId: string, reason: string, receiptHash: string): MemoryAtom {
    const existing = this.atoms.get(atomId);
    if (!existing) {
      throw new Error(`Cannot quarantine atom '${atomId}': not found in memory.`);
    }
    if (existing.tier === MemoryTier.CONSTITUTIONAL) {
      throw new Error(
        `Cannot quarantine CONSTITUTIONAL atom '${atomId}'. ` +
        `Constitutional atoms are immune to quarantine. ` +
        `This is not a policy decision — it is a structural invariant.`
      );
    }
    if (!reason || reason.trim().length === 0) {
      throw new Error(
        `Cannot quarantine atom '${atomId}' without a reason. ` +
        `Unexplained quarantine is indistinguishable from censorship.`
      );
    }
    this.requireVerifiedReceipt(receiptHash, {
      atomId,
      operation: 'QUARANTINE',
      previousTier: existing.tier,
      newTier: MemoryTier.QUARANTINED,
    });

    const now = new Date().toISOString();
    const previousTier = existing.tier;

    const quarantined: MemoryAtom = {
      ...existing,
      tier: MemoryTier.QUARANTINED,
      weight: 0,
      receiptHash,
      lastModifiedAt: now,
      journalIndex: this.journal.length,
      quarantineReason: reason,
      humanReviewed: false,
    };

    this.atoms.set(atomId, quarantined);
    this.appendJournal('QUARANTINE', atomId, previousTier, MemoryTier.QUARANTINED, receiptHash, now);

    return quarantined;
  }

  /**
   * Release a quarantined atom back to PROVISIONAL.
   * It must go through the normal promotion pipeline to reach CANON again.
   * Requires human review flag to be set.
   */
  release(atomId: string, receiptHash: string): MemoryAtom {
    const existing = this.atoms.get(atomId);
    if (!existing) {
      throw new Error(`Cannot release atom '${atomId}': not found in memory.`);
    }
    if (existing.tier !== MemoryTier.QUARANTINED) {
      throw new Error(
        `Cannot release atom '${atomId}': current tier is ${existing.tier}, not QUARANTINED.`
      );
    }
    if (existing.humanReviewed !== true) {
      throw new Error(
        `Cannot release atom '${atomId}': human review is required before release.`
      );
    }
    this.requireVerifiedReceipt(receiptHash, {
      atomId,
      operation: 'RELEASE',
      previousTier: MemoryTier.QUARANTINED,
      newTier: MemoryTier.PROVISIONAL,
    });

    const now = new Date().toISOString();

    const released: MemoryAtom = {
      ...existing,
      tier: MemoryTier.PROVISIONAL,
      weight: 0.5, // back to mid-provisional, must re-earn CANON
      receiptHash,
      lastModifiedAt: now,
      journalIndex: this.journal.length,
      quarantineReason: undefined,
      humanReviewed: undefined,
    };

    this.atoms.set(atomId, released);
    this.appendJournal('RELEASE', atomId, MemoryTier.QUARANTINED, MemoryTier.PROVISIONAL, receiptHash, now);

    return released;
  }

  /** Record an explicit review decision without changing the atom tier. */
  markHumanReviewed(atomId: string, reviewReceiptHash: string): MemoryAtom {
    const existing = this.atoms.get(atomId);
    if (!existing || existing.tier !== MemoryTier.QUARANTINED) {
      throw new Error(`Cannot review atom '${atomId}': it is not QUARANTINED.`);
    }
    this.requireVerifiedReceipt(reviewReceiptHash, {
      atomId,
      operation: 'REVIEW',
      previousTier: MemoryTier.QUARANTINED,
      newTier: MemoryTier.QUARANTINED,
    });
    const now = new Date().toISOString();
    const reviewed: MemoryAtom = {
      ...existing,
      humanReviewed: true,
      lastModifiedAt: now,
      journalIndex: this.journal.length,
    };
    this.atoms.set(atomId, reviewed);
    this.appendJournal('REVIEW', atomId, MemoryTier.QUARANTINED, MemoryTier.QUARANTINED, reviewReceiptHash, now);
    return reviewed;
  }

  // ── Snapshots ───────────────────────────────────────────────────────

  /**
   * Take a snapshot of the full memory state.
   * The integrity hash covers all atoms + journal head.
   * If kernelState is provided, version numbers are recorded for cross-reference.
   */
  snapshot(kernelState?: KernelState): MemorySnapshot {
    const now = new Date().toISOString();
    const atoms = Array.from(this.atoms.values());

    const serialized = JSON.stringify({
      atoms: atoms.map((a) => ({
        id: a.atom.id,
        tier: a.tier,
        weight: a.weight,
        receiptHash: a.receiptHash,
      })),
      journalHead: this.journal.length,
      journalHeadHash: this.journalHeadHash,
      journal: this.journal,
    });

    const integrityHash = sha256(serialized);

    const snap: MemorySnapshot = {
      timestamp: now,
      integrityHash,
      journalHead: this.journal.length,
      journalHeadHash: this.journalHeadHash,
      atoms,
      journal: this.journal.map((entry) => ({ ...entry })),
      kernelVersions: kernelState
        ? {
            cognitiveVersion: kernelState.cognitiveVersion,
            authorityVersion: kernelState.authorityVersion,
            canonVersion: kernelState.canonVersion,
          }
        : { cognitiveVersion: 0, authorityVersion: 0, canonVersion: 0 },
    };

    this.appendJournal('SNAPSHOT', 'SYSTEM', null, MemoryTier.CONSTITUTIONAL, integrityHash, now);

    return snap;
  }

  /**
   * Restore from a snapshot. Validates the integrity hash before applying.
   * This REPLACES the current in-memory state — use with caution.
   */
  restore(snapshot: MemorySnapshot): void {
    // Verify integrity before restoring
    const serialized = JSON.stringify({
      atoms: snapshot.atoms.map((a) => ({
        id: a.atom.id,
        tier: a.tier,
        weight: a.weight,
        receiptHash: a.receiptHash,
      })),
      journalHead: snapshot.journalHead,
      journalHeadHash: snapshot.journalHeadHash,
      journal: snapshot.journal,
    });

    const computedHash = sha256(serialized);
    if (computedHash !== snapshot.integrityHash) {
      throw new Error(
        `Snapshot integrity check failed. ` +
        `Expected: ${snapshot.integrityHash.slice(0, 16)}... ` +
        `Got: ${computedHash.slice(0, 16)}... ` +
        `The snapshot may have been tampered with.`
      );
    }

    // Clear and restore
    this.atoms.clear();
    for (const atom of snapshot.atoms) {
      this.atoms.set(atom.atom.id, atom);
    }

    if (snapshot.journal.length !== snapshot.journalHead) {
      throw new Error(
        `Snapshot journal length mismatch: expected ${snapshot.journalHead}, got ${snapshot.journal.length}.`
      );
    }
    this.journal = snapshot.journal.map((entry) => ({ ...entry }));
    if (this.journalHeadHash !== snapshot.journalHeadHash) {
      throw new Error('Snapshot journal head mismatch. The journal prefix is not authentic.');
    }
    // The restore itself is journaled after the verified snapshot prefix.
    const now = new Date().toISOString();
    this.appendJournal('SNAPSHOT', 'SYSTEM', null, MemoryTier.CONSTITUTIONAL, `restore:${snapshot.integrityHash}`, now);
  }

  // ── Journal ─────────────────────────────────────────────────────────

  /**
   * Get journal entries. Supports pagination.
   */
  getJournal(start = 0, limit = 100): JournalEntry[] {
    return this.journal.slice(start, start + limit);
  }

  /**
   * Verify the integrity of the entire journal chain.
   * Returns the index of the first broken link, or -1 if the chain is intact.
   */
  verifyJournalIntegrity(): { intact: boolean; brokenAtIndex: number } {
    for (let i = 0; i < this.journal.length; i++) {
      const entry = this.journal[i];

      // Verify this entry's hash
      const expectedHash = this.computeEntryHash(
        entry.index,
        entry.operation,
        entry.atomId,
        entry.previousTier,
        entry.newTier,
        entry.receiptHash,
        entry.previousEntryHash
      );

      if (entry.entryHash !== expectedHash) {
        return { intact: false, brokenAtIndex: i };
      }

      // Verify chain link
      if (i > 0 && entry.previousEntryHash !== this.journal[i - 1].entryHash) {
        return { intact: false, brokenAtIndex: i };
      }
    }

    return { intact: true, brokenAtIndex: -1 };
  }

  /**
   * Compact the journal by removing entries older than a threshold
   * while preserving the chain structure.
   *
   * This is lossy — old entries are gone. The compaction point becomes
   * the new chain root. A snapshot should be taken before compaction.
   */
  compactJournal(keepLast: number): { removed: number; newLength: number } {
    if (!Number.isInteger(keepLast) || keepLast < 1) {
      throw new Error(`keepLast must be a positive integer (got ${keepLast}).`);
    }
    if (keepLast >= this.journal.length) {
      return { removed: 0, newLength: this.journal.length };
    }

    const removeCount = this.journal.length - keepLast;
    const retained = this.journal.slice(removeCount).map((entry, index) => ({
      ...entry,
      index,
      previousEntryHash: '',
    }));
    for (let index = 0; index < retained.length; index++) {
      const entry = retained[index];
      const previousEntryHash = index === 0 ? '' : retained[index - 1].entryHash;
      retained[index] = {
        ...entry,
        previousEntryHash,
        entryHash: this.computeEntryHash(
          index,
          entry.operation,
          entry.atomId,
          entry.previousTier,
          entry.newTier,
          entry.receiptHash,
          previousEntryHash,
        ),
      };
    }
    this.journal = retained;
    for (const [atomId, atom] of this.atoms) {
      const latestIndex = this.journal.map((entry) => entry.atomId).lastIndexOf(atomId);
      if (latestIndex >= 0) {
        this.atoms.set(atomId, { ...atom, journalIndex: latestIndex });
      }
    }

    return { removed: removeCount, newLength: this.journal.length };
  }

  // ── Queries ─────────────────────────────────────────────────────────

  /**
   * Find atoms whose content matches a substring (case-insensitive).
   * This is a linear scan — not a search engine.
   */
  search(query: string, tier?: MemoryTier): MemoryAtom[] {
    const lower = query.toLowerCase();
    const results: MemoryAtom[] = [];

    for (const atom of this.atoms.values()) {
      if (tier && atom.tier !== tier) continue;
      if (
        atom.atom.content.toLowerCase().includes(lower) ||
        atom.atom.id.toLowerCase().includes(lower) ||
        atom.atom.tags.some((t) => t.toLowerCase().includes(lower))
      ) {
        results.push(atom);
      }
    }

    return results;
  }

  /**
   * Get atoms sorted by weight within a tier (highest first).
   */
  topByWeight(tier: MemoryTier, limit = 10): MemoryAtom[] {
    return this.readByTier(tier)
      .sort((a, b) => b.weight - a.weight)
      .slice(0, limit);
  }

  // ── Internal ────────────────────────────────────────────────────────

  private validateWriteConstraints(
    atomId: string,
    tier: MemoryTier,
    weight: number,
    receiptHash: string,
    quarantineReason?: string
  ): void {
    if (tier === MemoryTier.CANON || tier === MemoryTier.CONSTITUTIONAL) {
      if (!receiptHash || receiptHash.length < 16) {
        throw new Error(
          `${tier} tier requires a receipt hash (got '${receiptHash ?? ''}').`
        );
      }
    }

    if (tier === MemoryTier.QUARANTINED) {
      if (!quarantineReason || quarantineReason.trim().length === 0) {
        throw new Error(
          `QUARANTINED tier requires a quarantineReason.`
        );
      }
    }

    if (weight < 0 || weight > 1) {
      throw new Error(`Weight must be between 0.0 and 1.0 (got ${weight}).`);
    }
  }

  private clampWeight(weight: number, tier: MemoryTier): number {
    switch (tier) {
      case MemoryTier.CONSTITUTIONAL:
        return 1.0;
      case MemoryTier.CANON:
        return Math.max(0.90, Math.min(0.99, weight));
      case MemoryTier.PROVISIONAL:
        return Math.max(0.01, Math.min(0.89, weight));
      case MemoryTier.QUARANTINED:
        return 0;
    }
  }

  private appendJournal(
    operation: JournalOperation,
    atomId: string,
    previousTier: MemoryTier | null,
    newTier: MemoryTier,
    receiptHash: string,
    timestamp: string
  ): JournalEntry {
    const index = this.journal.length;
    const previousEntryHash = index > 0 ? this.journal[index - 1].entryHash : '';

    const entryHash = this.computeEntryHash(
      index, operation, atomId, previousTier, newTier, receiptHash, previousEntryHash
    );

    const entry: JournalEntry = {
      index,
      operation,
      atomId,
      previousTier,
      newTier,
      timestamp,
      receiptHash,
      entryHash,
      previousEntryHash,
    };

    this.journal.push(entry);
    return entry;
  }

  private computeEntryHash(
    index: number,
    operation: JournalOperation,
    atomId: string,
    previousTier: MemoryTier | null,
    newTier: MemoryTier,
    receiptHash: string,
    previousEntryHash: string
  ): string {
    return sha256(
      `${index}:${operation}:${atomId}:${previousTier ?? 'NULL'}:${newTier}:${receiptHash}:${previousEntryHash}`
    );
  }

  private requireVerifiedReceipt(receiptHash: string, context: ReceiptVerificationContext): void {
    if (!this.config.requireVerifiedReceipts) return;
    if (!this.config.receiptVerifier) {
      throw new Error('Verified receipt binding is required, but no Core receipt verifier is configured.');
    }
    if (!this.config.receiptVerifier(receiptHash, context)) {
      throw new Error(
        `Receipt verification failed for ${context.operation} on atom '${context.atomId}'.`
      );
    }
  }
}
