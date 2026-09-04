import {
  KernelState,
  ExecutionState,
  AuthorityClass,
  AtomKind,
  CognitiveStatus,
  CognitiveAtom,
  CanonEntry,
  ConstitutionalPrinciple,
} from '../kernel/types';

export const INITIAL_ATOMS: Record<string, CognitiveAtom> = {
  'atom-dir-001': {
    id: 'atom-dir-001',
    kind: AtomKind.DIRECTIVE,
    status: CognitiveStatus.COMMITTED,
    content:
      'Cognition can be generated anywhere. Authority can be acquired only through Cranium.',
    authority: { authorityClass: AuthorityClass.ENTERPRISE, weight: 0.95 },
    provenance: {
      source: 'FOUNDATIONAL_CONSTITUTION',
      authorId: 'FOUNDER_CORE',
      sourceTimestamp: 1725300000000,
      evidenceUri: 'https://cranium.ai/canon/v1-core.json',
      modelSignature: 'sig_ed25519_core_98a72b',
    },
    createdAt: 1725300000000,
    tags: ['core', 'directive', 'authority-monopoly'],
  },
  'atom-fact-002': {
    id: 'atom-fact-002',
    kind: AtomKind.FACT,
    status: CognitiveStatus.COMMITTED,
    content:
      'Early automated benchmark runs showed canon regression vs naive RAG; treated as known gap.',
    authority: { authorityClass: AuthorityClass.FACTUAL, weight: 0.88 },
    provenance: {
      source: 'BENCHMARK_REPORT_2026_08',
      authorId: 'BENCHMARK_RUNNER_CI',
      sourceTimestamp: 1725301000000,
      evidenceUri: 'https://cranium.ai/benchmarks/run-2026-08.json',
      modelSignature: 'sha256_e10adc3949ba59abbe56e057f20f883e',
    },
    createdAt: 1725301000000,
    tags: ['diligence', 'honest-buyer', 'rag-benchmark'],
  },
  'atom-intent-003': {
    id: 'atom-intent-003',
    kind: AtomKind.INTENT,
    status: CognitiveStatus.ACTIVE,
    content:
      'Human intention and creative identity are sovereign constraints that must never be diluted into chat history.',
    authority: { authorityClass: AuthorityClass.USER, weight: 0.8 },
    provenance: {
      source: 'USER_DIRECTIVE_SESSION',
      authorId: 'USER_PRIMARY',
      sourceTimestamp: 1725302000000,
    },
    createdAt: 1725302000000,
    tags: ['intent', 'identity', 'creative-constitution'],
  },
  'atom-hypo-004': {
    id: 'atom-hypo-004',
    kind: AtomKind.HYPOTHESIS,
    status: CognitiveStatus.PROVISIONAL,
    content:
      'Replacing NLI-proxy v2 with frozen LLM-judge adapter will eliminate false negatives on novel paraphrases.',
    authority: { authorityClass: AuthorityClass.HYPOTHETICAL, weight: 0.35 },
    provenance: {
      source: 'ADAPTER_EXPERIMENT',
      authorId: 'RESEARCH_SUBSTRATE',
      sourceTimestamp: 1725303000000,
    },
    createdAt: 1725303000000,
    tags: ['research', 'judge-adapter', 'nli'],
  },
};

export const INITIAL_CANON_ENTRIES: CanonEntry[] = [
  {
    id: 'CANON-01',
    topic: 'Canon vs RAG Superiority',
    statement:
      'Comparative canon superiority over naive RAG is NOT claimed until a frozen, real-model harness verifies it. Unproven marketing claims are barred.',
    sourceAuthority: { authorityClass: AuthorityClass.ENTERPRISE, weight: 1.0 },
    lockedAt: 1725300000000,
    immutable: true,
    provenance: 'ACQUISITION_ONE_PAGER_2026_08',
  },
  {
    id: 'CANON-02',
    topic: 'Human Intent and Identity Sovereignty',
    statement:
      'Intent and identity are first-class sovereign constraints, not transient chat tokens to be diluted by context window truncation.',
    sourceAuthority: { authorityClass: AuthorityClass.ENTERPRISE, weight: 1.0 },
    lockedAt: 1725300000000,
    immutable: true,
    provenance: 'BEHAVIORAL_CONTRACT_CLAUSE_4',
  },
  {
    id: 'CANON-03',
    topic: 'NLI Engine Reality & Honest Disclosure',
    statement:
      'The current substrate implements NLI-proxy v2 + optional LLM-judge adapter; not a trained on-device CrossEncoder in Android.',
    sourceAuthority: { authorityClass: AuthorityClass.ENTERPRISE, weight: 1.0 },
    lockedAt: 1725300000000,
    immutable: true,
    provenance: 'DILIGENCE_ASSET_INVENTORY_TABLE',
  },
  {
    id: 'CANON-04',
    topic: 'Architecture Boundary & Single Process Field',
    statement:
      'Current architecture is a single-process in-memory field; multi-tenant enterprise isolation is designed, not battle-tested at scale.',
    sourceAuthority: { authorityClass: AuthorityClass.ENTERPRISE, weight: 1.0 },
    lockedAt: 1725300000000,
    immutable: true,
    provenance: 'TECHNICAL_RISKS_AUDIT_2026',
  },
];

export const INITIAL_CONSTITUTION: ConstitutionalPrinciple[] = [
  {
    id: 'CONST-01',
    title: 'Atomic Authority Invariant',
    category: 'GOVERNANCE',
    clause:
      'No authority increase may be committed unless evaluated against committed state, passing boundary validation, and receipt-bound within the same atomic commit.',
    invariantRule: 'STRICT_AUTHORITY_EVALUATION',
    enforced: true,
  },
  {
    id: 'CONST-02',
    title: 'Idempotent Replay Boundary',
    category: 'IMMUNITY',
    clause:
      'Every request hash must be bound to its idempotency key. Any reuse with differing payload is rejected as ConflictingReuse.',
    invariantRule: 'REPLAY_COLLISION_REJECTION',
    enforced: true,
  },
  {
    id: 'CONST-03',
    title: 'Quarantine Write-Back Gate',
    category: 'ISOLATION',
    clause:
      'Generated model cognition is strictly provisional until evaluated across Canon Lane; unauthorized write-back directly to Canon is prohibited.',
    invariantRule: 'PROVISIONAL_QUARANTINE',
    enforced: true,
  },
  {
    id: 'CONST-04',
    title: 'Honest Diligence Standard',
    category: 'COMMERCE',
    clause:
      'All commercial descriptions must reflect current behavioral code and actual benchmark logs. Marketing claims contradicting reality table are invalid.',
    invariantRule: 'HONEST_BUYER_DISCLOSURE',
    enforced: true,
  },
];

export function createInitialKernelState(): KernelState {
  return {
    executionId: 'exec_cranium_v1_' + Math.random().toString(36).substring(2, 9),
    state: ExecutionState.READY,
    cognitiveVersion: 1,
    authorityVersion: 104,
    canonVersion: 12,
    atomsById: { ...INITIAL_ATOMS },
    activeAtomIds: Object.keys(INITIAL_ATOMS),
    candidateHash: null,
    threatAssessment: {
      threatLevel: 'NOMINAL',
      suspectedVectors: [],
      replayAttemptsBlocked: 0,
      boundaryAnomaliesCount: 0,
      lastIncidentTimestamp: null,
    },
    transitions: [],
    canonEntries: [...INITIAL_CANON_ENTRIES],
    constitutionalPrinciples: [...INITIAL_CONSTITUTION],
  };
}
