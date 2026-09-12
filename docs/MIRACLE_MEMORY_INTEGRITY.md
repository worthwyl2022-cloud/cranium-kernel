# Miracle Memory Integrity Model

## Purpose

Miracle Memory is an append-only, tiered memory substrate for Cranium Kernel cognitive atoms. It provides tamper-evident journaling, explicit quarantine governance, verified snapshot recovery, and an optional strict boundary to the Core receipt system.

## Enforced invariants

| Invariant | Enforcement | Regression evidence |
|---|---|---|
| Constitutional atoms cannot be overwritten or quarantined | Tier checks in `write()` and `quarantine()` | Integration check |
| Quarantine release requires explicit human review | `release()` rejects `humanReviewed !== true`; `markHumanReviewed()` journals the decision | Integration check |
| Journal entries form a valid hash chain | `verifyJournalIntegrity()` recomputes entry hashes and links | Integration check |
| Compaction does not leave a dangling predecessor | `compactJournal()` re-roots, re-indexes, and re-hashes retained entries | Integration check |
| Snapshot integrity covers atom state and the journal prefix | Snapshot hash includes atoms, journal metadata, and journal entries | Integration check |
| Restore does not silently discard verified journal history | `restore()` replaces the journal with the authenticated snapshot prefix, then journals restoration | Integration check |
| Strict deployments can require Core receipt verification | `MemoryConfig.requireVerifiedReceipts` and `receiptVerifier` bind receipts to atom and operation context | Integration check |

## Receipt boundary

The default compatibility mode accepts receipt hashes as legacy identifiers. Production or high-assurance deployments should enable strict mode and inject a Core verifier. That verifier is responsible for authenticity, subject binding, operation binding, freshness or replay policy, and revocation. Miracle Memory deliberately depends on a narrow verifier interface rather than duplicating Core cryptography.

## Compaction semantics

Compaction is lossy. Operators must create and retain an authenticated snapshot before compaction. The retained journal prefix is re-rooted at index zero, and its first entry has an empty predecessor hash. This preserves integrity of the retained evidence while making the discarded history explicit.

## Recovery semantics

A snapshot is a verified state-and-journal-prefix checkpoint. Restore validates the snapshot hash, restores atom state and the authenticated journal prefix, verifies the journal head, and appends a restore marker. It does not recover events that were never included in the snapshot or that were intentionally discarded during compaction.

## Non-claims

This model provides tamper evidence and configurable receipt verification. It is not encryption, access control, a database durability guarantee, a legal record, or proof of ownership. Filesystem durability, key custody, signer policy, backup retention, and operational recovery remain deployment responsibilities.
