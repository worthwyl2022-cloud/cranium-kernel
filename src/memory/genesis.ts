/**
 * Miracle Memory — Genesis Seeder
 *
 * Seeds the root axioms and constitutional atoms at boot.
 * These are the first entries in the memory store and the first
 * entries in the journal. They are CONSTITUTIONAL tier, weight 1.0,
 * immutable after seeding.
 *
 * The genesis receipt is a deterministic SHA-256 hash of the atom ID
 * and a fixed genesis timestamp. This is NOT a cryptographic proof
 * of anything — it is a deterministic marker that says "this atom
 * was seeded at genesis, not promoted from PROVISIONAL."
 * It is honest about what it is.
 *
 * © 2026 Wyl Mathes. All Rights Reserved.
 * WorthWyl Software / Convertible Cranium Engineering
 */

import { sha256 } from '../kernel/sha256';
import { AtomKind, CognitiveStatus, AuthorityClass } from '../kernel/types';
import type { CognitiveAtom } from '../kernel/types';
import { MiracleMemoryStore } from './MiracleMemoryStore';
import { MemoryTier } from './types';

const GENESIS_TIMESTAMP = '2026-09-07T00:00:00.000Z';
const GENESIS_AUTHOR = 'wyl.mathes';
const GENESIS_SOURCE = 'cranium-kernel:genesis';

function genesisReceipt(atomId: string): string {
  return sha256(`genesis:${atomId}:${GENESIS_TIMESTAMP}`);
}

function makeConstitutionalAtom(params: {
  id: string;
  content: string;
  kind: AtomKind;
  tags: string[];
}): CognitiveAtom {
  return {
    id: params.id,
    kind: params.kind,
    status: CognitiveStatus.COMMITTED,
    content: params.content,
    authority: {
      authorityClass: AuthorityClass.SYSTEM,
      weight: 1.0,
    },
    provenance: {
      source: GENESIS_SOURCE,
      authorId: GENESIS_AUTHOR,
      sourceTimestamp: new Date(GENESIS_TIMESTAMP).getTime(),
    },
    createdAt: new Date(GENESIS_TIMESTAMP).getTime(),
    tags: params.tags,
  };
}

/**
 * The root axioms. These are the first two atoms that ever exist.
 */
const ROOT_AXIOMS: Array<{ id: string; content: string; tags: string[] }> = [
  {
    id: 'atom-axiom-001',
    content:
      'Authority is not claimed; it is granted only through Cranium Core. ' +
      'No model, user, process, or system becomes authoritative merely by ' +
      'asserting authority.',
    tags: ['axiom', 'authority', 'core-principle'],
  },
  {
    id: 'atom-axiom-002',
    content:
      'All unverified generative or speculative material remains provisional ' +
      'until evidenced and receipted. Provisional is the default. ' +
      'Canon must be earned.',
    tags: ['axiom', 'evidence', 'provisional'],
  },
];

/**
 * The first architectural canon entry.
 */
const ARCHITECTURAL_CANON = {
  id: 'atom-canon-001',
  content:
    'Cranium Core operates as a directive-governed cognitive substrate separating ' +
    'untrusted input from the hardened evaluation kernel. The kernel evaluates; ' +
    'it does not generate. The model generates; it does not decide. ' +
    'The receipt proves; it does not assert.',
  tags: ['canon', 'architecture', 'separation-of-concerns'],
};

/**
 * The Prime Directive articles. 8 articles, each a CONSTITUTIONAL atom.
 */
const PRIME_DIRECTIVE_ARTICLES: Array<{ article: number; title: string; content: string }> = [
  {
    article: 1,
    title: 'Intelligence Exists to Elevate Life',
    content:
      'The purpose of cognitive substrate governance is to ensure that intelligence — ' +
      'artificial or human — serves the elevation of life, not its diminishment.',
  },
  {
    article: 2,
    title: 'Authority Through Legitimacy',
    content:
      'No entity acquires authority by assertion alone. Authority is earned through ' +
      'a versioned, auditable, policy-constrained transition evaluated by the kernel.',
  },
  {
    article: 3,
    title: 'Evidence Before Action',
    content:
      'Every state-changing action must be preceded by evidence evaluation. ' +
      'The evidence layer (Synapse) produces attestations; the authority layer (Core) decides.',
  },
  {
    article: 4,
    title: 'Deterministic Receipts',
    content:
      'Every authority transition produces a deterministic, hashable receipt. ' +
      'Receipts are the audit trail. Without a receipt, it did not happen.',
  },
  {
    article: 5,
    title: 'Human Oversight',
    content:
      'Quarantined content and escalated decisions require human review. ' +
      'The kernel may deny, but only a human may release from quarantine.',
  },
  {
    article: 6,
    title: 'Constitutional Immutability',
    content:
      'Constitutional atoms cannot be modified, overridden, or deleted by any process, ' +
      'model, or agent. They are the bedrock. The kernel enforces this structurally.',
  },
  {
    article: 7,
    title: 'Evolutionary Canon',
    content:
      'Canon may evolve through the promotion pipeline: evidence → attestation → ' +
      'evaluation → receipt. Evolution is legitimate change. Mutation without evidence is not.',
  },
  {
    article: 8,
    title: 'Identity Sovereignty',
    content:
      'Human identity and intent are first-class sovereign constraints, not transient context. ' +
      'No model, agent, or process may dilute, discard, or override them.',
  },
];

export class MiracleGenesis {
  constructor(private memory: MiracleMemoryStore) {}

  /**
   * Seed everything. Call once at boot. Idempotent — if atoms already exist,
   * this is a no-op for those atoms (CONSTITUTIONAL atoms can't be overwritten).
   */
  seed(): {
    axiomsSeeded: number;
    canonSeeded: number;
    directivesSeeded: number;
    alreadyExisted: number;
  } {
    let axiomsSeeded = 0;
    let canonSeeded = 0;
    let directivesSeeded = 0;
    let alreadyExisted = 0;

    // Root axioms
    for (const axiom of ROOT_AXIOMS) {
      if (this.memory.read(axiom.id)) {
        alreadyExisted++;
        continue;
      }
      this.memory.write({
        atom: makeConstitutionalAtom({
          id: axiom.id,
          content: axiom.content,
          kind: AtomKind.DIRECTIVE,
          tags: axiom.tags,
        }),
        tier: MemoryTier.CONSTITUTIONAL,
        weight: 1.0,
        receiptHash: genesisReceipt(axiom.id),
      });
      axiomsSeeded++;
    }

    // Architectural canon — this one is CANON, not CONSTITUTIONAL.
    // It's a fact about the architecture, not an axiom.
    if (!this.memory.read(ARCHITECTURAL_CANON.id)) {
      this.memory.write({
        atom: makeConstitutionalAtom({
          id: ARCHITECTURAL_CANON.id,
          content: ARCHITECTURAL_CANON.content,
          kind: AtomKind.FACT,
          tags: ARCHITECTURAL_CANON.tags,
        }),
        tier: MemoryTier.CANON,
        weight: 0.95,
        receiptHash: genesisReceipt(ARCHITECTURAL_CANON.id),
      });
      canonSeeded++;
    } else {
      alreadyExisted++;
    }

    // Prime Directive articles
    for (const article of PRIME_DIRECTIVE_ARTICLES) {
      const id = `atom-directive-${String(article.article).padStart(3, '0')}`;
      if (this.memory.read(id)) {
        alreadyExisted++;
        continue;
      }
      this.memory.write({
        atom: makeConstitutionalAtom({
          id,
          content: `Article ${article.article}: ${article.title} — ${article.content}`,
          kind: AtomKind.DIRECTIVE,
          tags: ['prime-directive', `article-${article.article}`, article.title.toLowerCase().replace(/\s+/g, '-')],
        }),
        tier: MemoryTier.CONSTITUTIONAL,
        weight: 1.0,
        receiptHash: genesisReceipt(id),
      });
      directivesSeeded++;
    }

    return { axiomsSeeded, canonSeeded, directivesSeeded, alreadyExisted };
  }

  /** Get the genesis timestamp used for all genesis atoms. */
  static get genesisTimestamp(): string {
    return GENESIS_TIMESTAMP;
  }

  /** Get the total number of genesis atoms (axioms + canon + directives). */
  static get totalGenesisAtoms(): number {
    return ROOT_AXIOMS.length + 1 + PRIME_DIRECTIVE_ARTICLES.length;
  }
}
