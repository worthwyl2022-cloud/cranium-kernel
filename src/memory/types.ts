/**
 * Miracle Memory — Type Definitions
 *
 * These types extend the kernel's CognitiveAtom with persistence-specific
 * metadata. A MemoryAtom IS a CognitiveAtom plus tier, weight, receipt
 * binding, and journal position.
 *
 * © 2026 Wyl Mathes. All Rights Reserved.
 * WorthWyl Software / Convertible Cranium Engineering
 */

import type { CognitiveAtom, AuthorityTransition, CanonEntry } from '../kernel/types';

/**
 * Memory tier hierarchy.
 *
 * CONSTITUTIONAL — weight 1.0, immutable after genesis seed.
 *   Prime Directive articles, root axioms.
 *   Cannot be modified, overridden, or deleted by any process.
 *
 * CANON — weight 0.90–0.99, verified + receipted.
 *   Architectural facts, evidenced knowledge.
 *   Requires a valid receipt hash to promote from PROVISIONAL.
 *
 * PROVISIONAL — weight 0.01–0.89, pre-verification.
 *   Unverified generative output, speculative material.
 *   Must pass through promotion pipeline to reach CANON.
 *
 * QUARANTINED — weight 0, flagged by immune layer or boundary violation.
 *   Held for human review. Can be released or permanently quarantined.
 */
export enum MemoryTier {
  CONSTITUTIONAL = 'CONSTITUTIONAL',
  CANON = 'CANON',
  PROVISIONAL = 'PROVISIONAL',
  QUARANTINED = 'QUARANTINED',
}

export const TIER_RANK: Record<MemoryTier, number> = {
  [MemoryTier.QUARANTINED]: 0,
  [MemoryTier.PROVISIONAL]: 1,
  [MemoryTier.CANON]: 2,
  [MemoryTier.CONSTITUTIONAL]: 3,
};

/**
 * A MemoryAtom wraps a CognitiveAtom with persistence metadata.
 * The `atom` field is the kernel's own type — Miracle Memory adds
 * tier, weight, receipt binding, and journal tracking on top.
 */
export interface MemoryAtom {
  /** The kernel CognitiveAtom this memory entry wraps. */
  atom: CognitiveAtom;

  /** Current tier in the memory hierarchy. */
  tier: MemoryTier;

  /** Authority weight within the tier. 0.0 to 1.0. */
  weight: number;

  /**
   * SHA-256 receipt hash that authorized the current tier.
   * Required for CANON and CONSTITUTIONAL tiers.
   * For genesis atoms, this is the genesis receipt.
   * For promoted atoms, this is the transition receipt signature.
   */
  receiptHash: string;

  /** ISO 8601 timestamp of when this atom entered the memory store. */
  createdAt: string;

  /** ISO 8601 timestamp of the last tier change. */
  lastModifiedAt: string;

  /** Sequential position in the append-only journal. 0-indexed. */
  journalIndex: number;

  /** If quarantined, the reason and who/what flagged it. */
  quarantineReason?: string;

  /** If quarantined, whether human review has occurred. */
  humanReviewed?: boolean;
}

/**
 * A single journal entry. The journal is append-only.
 * Each entry records what happened, when, and chains to the prior entry.
 */
export type JournalOperation =
  | 'WRITE'
  | 'PROMOTE'
  | 'QUARANTINE'
  | 'RELEASE'
  | 'SNAPSHOT';

export interface JournalEntry {
  /** Sequential index. Monotonically increasing, no gaps. */
  index: number;

  /** What operation was performed. */
  operation: JournalOperation;

  /** The atom ID affected (or 'SYSTEM' for snapshots). */
  atomId: string;

  /** The tier BEFORE this operation (null for WRITE of new atoms). */
  previousTier: MemoryTier | null;

  /** The tier AFTER this operation. */
  newTier: MemoryTier;

  /** ISO 8601 timestamp. */
  timestamp: string;

  /** Receipt hash that authorized this operation. */
  receiptHash: string;

  /**
   * SHA-256 hash of: `${index}:${operation}:${atomId}:${previousTier}:${newTier}:${receiptHash}:${previousEntryHash}`
   * This chains every entry to the one before it. Break the chain = tamper evidence.
   */
  entryHash: string;

  /** Hash of the immediately preceding journal entry. Empty string for index 0. */
  previousEntryHash: string;
}

/**
 * A snapshot of the full memory state at a point in time.
 * Used for backup, restore, and crash recovery.
 */
export interface MemorySnapshot {
  /** ISO 8601 timestamp of when the snapshot was taken. */
  timestamp: string;

  /** SHA-256 hash of the serialized atoms + journal state. */
  integrityHash: string;

  /** The journal index at snapshot time. */
  journalHead: number;

  /** The hash of the last journal entry at snapshot time. */
  journalHeadHash: string;

  /** All atoms at snapshot time. */
  atoms: MemoryAtom[];

  /** Kernel state version numbers for cross-reference. */
  kernelVersions: {
    cognitiveVersion: number;
    authorityVersion: number;
    canonVersion: number;
  };
}

/**
 * Configuration for the memory store.
 */
export interface MemoryConfig {
  /**
   * Maximum number of atoms before compaction is recommended.
   * Not a hard limit — the store keeps accepting writes.
   * Default: 10000.
   */
  softCapacity: number;

  /**
   * Maximum journal entries before compaction runs.
   * Default: 50000.
   */
  journalCompactionThreshold: number;

  /**
   * File path for journal persistence.
   * If null, journal is in-memory only (volatile — labeled honestly).
   */
  journalPath: string | null;

  /**
   * File path for snapshot persistence.
   * If null, snapshots are in-memory only.
   */
  snapshotPath: string | null;
}

export const DEFAULT_MEMORY_CONFIG: MemoryConfig = {
  softCapacity: 10000,
  journalCompactionThreshold: 50000,
  journalPath: null,
  snapshotPath: null,
};
