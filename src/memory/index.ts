/**
 * Miracle Memory — Public API
 *
 * The persistence substrate for Cranium Kernel.
 * Import everything you need from here.
 *
 * © 2026 Wyl Mathes. All Rights Reserved.
 * WorthWyl Software / Convertible Cranium Engineering
 */

export { MiracleMemoryStore } from './MiracleMemoryStore';
export { MiracleGenesis } from './genesis';
export {
  MemoryTier,
  TIER_RANK,
  type MemoryAtom,
  type JournalEntry,
  type JournalOperation,
  type MemorySnapshot,
  type MemoryConfig,
  DEFAULT_MEMORY_CONFIG,
} from './types';
