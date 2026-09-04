export enum AuthorityClass {
  HYPOTHETICAL = 'HYPOTHETICAL',
  WORKING = 'WORKING',
  USER = 'USER',
  FACTUAL = 'FACTUAL',
  ENTERPRISE = 'ENTERPRISE',
  SYSTEM = 'SYSTEM',
}

export const AUTHORITY_RANKS: Record<AuthorityClass, number> = {
  [AuthorityClass.HYPOTHETICAL]: 0,
  [AuthorityClass.WORKING]: 1,
  [AuthorityClass.USER]: 2,
  [AuthorityClass.FACTUAL]: 3,
  [AuthorityClass.ENTERPRISE]: 4,
  [AuthorityClass.SYSTEM]: 5,
};

export interface AuthorityLevel {
  authorityClass: AuthorityClass;
  weight: number; // 0.0 to 1.0
}

export enum AtomKind {
  DIRECTIVE = 'DIRECTIVE',
  FACT = 'FACT',
  HYPOTHESIS = 'HYPOTHESIS',
  CONSTRAINT = 'CONSTRAINT',
  INTENT = 'INTENT',
  DELIBERATION = 'DELIBERATION',
}

export enum CognitiveStatus {
  PROVISIONAL = 'PROVISIONAL',
  ACTIVE = 'ACTIVE',
  COMMITTED = 'COMMITTED',
  QUARANTINED = 'QUARANTINED',
  REVOKED = 'REVOKED',
}

export interface Provenance {
  source: string;
  authorId: string;
  sourceTimestamp: number;
  evidenceUri?: string;
  modelSignature?: string;
}

export interface CognitiveAtom {
  id: string;
  kind: AtomKind;
  status: CognitiveStatus;
  content: string;
  authority: AuthorityLevel;
  provenance: Provenance;
  createdAt: number;
  tags: string[];
}

export interface EvidenceRef {
  id: string;
  uri: string;
  sha256Digest: string;
  verified: boolean;
  description: string;
}

export interface AuthorityTransitionRequest {
  requestId: string;
  idempotencyKey: string;
  subjectId: string;
  requestedAuthority: AuthorityLevel;
  evidence: EvidenceRef[];
  justification: string;
  requesterId: string;
  timestamp: number;
  targetAuthorityVersion: number;
}

export interface RequestHash {
  algorithm: string;
  hexDigest: string;
  canonicalString: string;
}

export type ReplayStatus =
  | { type: 'New' }
  | { type: 'Existing'; transitionId: string; cachedTimestamp: number }
  | { type: 'ConflictingReuse'; reason: string; priorHash: string; attemptedHash: string };

export enum BoundaryViolation {
  MISSING_SUBJECT = 'MISSING_SUBJECT',
  INVALID_AUTHORITY_JUMP = 'INVALID_AUTHORITY_JUMP',
  DEGRADATION_WITHOUT_REASON = 'DEGRADATION_WITHOUT_REASON',
  CORRUPTED_HASH = 'CORRUPTED_HASH',
  INSUFFICIENT_EVIDENCE = 'INSUFFICIENT_EVIDENCE',
  REPLAY_CONFLICT = 'REPLAY_CONFLICT',
  CONSTITUTION_VIOLATION = 'CONSTITUTION_VIOLATION',
  STALE_AUTHORITY_VERSION = 'STALE_AUTHORITY_VERSION',
  UNAUTHORIZED_REQUESTER = 'UNAUTHORIZED_REQUESTER',
  INVALID_REQUEST = 'INVALID_REQUEST',
}

export interface BoundaryAssessment {
  passed: boolean;
  violations: BoundaryViolation[];
  evidenceRefs: string[];
  explanation: string;
  checkedRules: string[];
}

export type TransitionDecision =
  | { type: 'Granted'; grantedAuthority: AuthorityLevel; rationale: string }
  | { type: 'Denied'; reason: string; violationCode?: BoundaryViolation };

export interface AuthorityTransition {
  id: string;
  subjectAtomId: string;
  sourceAuthority: AuthorityLevel;
  requestedAuthority: AuthorityLevel;
  evaluatedAuthorityVersion: number;
  decision: TransitionDecision;
  boundary: BoundaryAssessment;
  evidenceRefs: string[];
  requestHash: RequestHash;
  timestamp: number;
  receiptSignature: string;
}

export enum ExecutionState {
  INITIALIZING = 'INITIALIZING',
  READY = 'READY',
  EVALUATING = 'EVALUATING',
  COMMITTING = 'COMMITTING',
  FROZEN = 'FROZEN',
}

export interface ConstitutionalPrinciple {
  id: string;
  title: string;
  category: string;
  clause: string;
  invariantRule: string;
  enforced: boolean;
}

export interface CanonEntry {
  id: string;
  topic: string;
  statement: string;
  sourceAuthority: AuthorityLevel;
  lockedAt: number;
  immutable: boolean;
  provenance: string;
}

export interface ThreatAssessment {
  threatLevel: 'NOMINAL' | 'ELEVATED' | 'CRITICAL';
  suspectedVectors: string[];
  replayAttemptsBlocked: number;
  boundaryAnomaliesCount: number;
  lastIncidentTimestamp: number | null;
}

export interface KernelState {
  executionId: string;
  state: ExecutionState;
  cognitiveVersion: number;
  authorityVersion: number;
  canonVersion: number;
  atomsById: Record<string, CognitiveAtom>;
  activeAtomIds: string[];
  candidateHash: string | null;
  threatAssessment: ThreatAssessment;
  transitions: AuthorityTransition[];
  canonEntries: CanonEntry[];
  constitutionalPrinciples: ConstitutionalPrinciple[];
}
