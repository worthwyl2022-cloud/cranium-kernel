import {
  KernelState,
  AuthorityTransitionRequest,
  AuthorityClass,
  BoundaryViolation,
} from './types';
import { InMemoryReplayGuard } from './replayGuard';
import { DefaultAuthorityTransitionEngine, KernelStateReducer } from './engine';

export interface AdversarialTestResult {
  id: string;
  name: string;
  category: string;
  threatVector: string;
  description: string;
  expectedViolation: BoundaryViolation;
  passed: boolean;
  actualDecision: 'GRANTED' | 'DENIED';
  executionTimeMs: number;
  hashGenerated: string;
  details: string;
}

export class AdversarialSuite {
  static runAll(
    initialState: KernelState,
    replayGuard: InMemoryReplayGuard,
    engine: DefaultAuthorityTransitionEngine
  ): { results: AdversarialTestResult[]; newState: KernelState } {
    const results: AdversarialTestResult[] = [];
    let state = initialState;

    // Test 1: Identity Substitution & Shadow Subject Injection
    {
      const t0 = performance.now();
      const forgedReq: AuthorityTransitionRequest = {
        requestId: `req_forge_${Date.now()}`,
        idempotencyKey: `idem_forge_${Date.now()}`,
        subjectId: 'atom_shadow_missing_999',
        requestedAuthority: { authorityClass: AuthorityClass.FACTUAL, weight: 0.8 },
        evidence: [
          {
            id: 'ev-fake-1',
            uri: 'https://evidence.io/payload',
            sha256Digest:
              'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
            verified: true,
            description: 'Forged evidence for non-existent subject',
          },
        ],
        justification: 'Testing shadow subject injection vulnerability',
        requesterId: 'MALICIOUS_ACTOR_SHADOW',
        timestamp: Date.now(),
        targetAuthorityVersion: state.authorityVersion,
      };

      const res = engine.evaluate(forgedReq, state);
      state = KernelStateReducer.reduce(
        state,
        res.transition,
        replayGuard,
        forgedReq,
        res.replayStatus
      );
      const dt = performance.now() - t0;

      results.push({
        id: 'ADV-01',
        name: 'Identity Substitution & Shadow Subject Injection',
        category: 'IDENTITY',
        threatVector: 'Submitting transition request targeting an uncommitted subject ID',
        description: 'Kernel resolves subjects exclusively from committed immutable state snapshot.',
        expectedViolation: BoundaryViolation.MISSING_SUBJECT,
        passed:
          res.transition.boundary.violations.includes(BoundaryViolation.MISSING_SUBJECT) &&
          res.transition.decision.type === 'Denied',
        actualDecision: res.transition.decision.type === 'Granted' ? 'GRANTED' : 'DENIED',
        executionTimeMs: Number(dt.toFixed(2)),
        hashGenerated: res.transition.requestHash.hexDigest,
        details: res.transition.boundary.explanation,
      });
    }

    // Test 2: Protected-Lane Escalation (Evidence Bypassing)
    {
      const t0 = performance.now();
      const escReq: AuthorityTransitionRequest = {
        requestId: `req_esc_${Date.now()}`,
        idempotencyKey: `idem_esc_${Date.now()}`,
        subjectId: 'atom-hypo-004',
        requestedAuthority: { authorityClass: AuthorityClass.ENTERPRISE, weight: 0.99 },
        evidence: [],
        justification: 'Attempting promotion to ENTERPRISE without cryptographic digest',
        requesterId: 'WORKER_AGENT_ESCALATOR',
        timestamp: Date.now(),
        targetAuthorityVersion: state.authorityVersion,
      };

      const res = engine.evaluate(escReq, state);
      state = KernelStateReducer.reduce(
        state,
        res.transition,
        replayGuard,
        escReq,
        res.replayStatus
      );
      const dt = performance.now() - t0;

      results.push({
        id: 'ADV-02',
        name: 'Protected-Lane Escalation (Evidence Bypassing)',
        category: 'ESCALATION',
        threatVector: 'Hypothetical atom attempting multi-rank jump to ENTERPRISE with no evidence',
        description:
          'Promotions to FACTUAL or ENTERPRISE require verified evidence refs with 256-bit hashes.',
        expectedViolation: BoundaryViolation.INSUFFICIENT_EVIDENCE,
        passed:
          (res.transition.boundary.violations.includes(BoundaryViolation.INSUFFICIENT_EVIDENCE) ||
            res.transition.boundary.violations.includes(BoundaryViolation.INVALID_AUTHORITY_JUMP)) &&
          res.transition.decision.type === 'Denied',
        actualDecision: res.transition.decision.type === 'Granted' ? 'GRANTED' : 'DENIED',
        executionTimeMs: Number(dt.toFixed(2)),
        hashGenerated: res.transition.requestHash.hexDigest,
        details: res.transition.boundary.explanation,
      });
    }

    // Test 3: Replay Collision Attack
    {
      const t0 = performance.now();
      const sharedKey = `idem_collision_${Date.now()}`;

      // Legitimate first request
      const validReq: AuthorityTransitionRequest = {
        requestId: `req_legit_${Date.now()}`,
        idempotencyKey: sharedKey,
        subjectId: 'atom-dir-001',
        requestedAuthority: { authorityClass: AuthorityClass.ENTERPRISE, weight: 0.95 },
        evidence: [
          {
            id: 'ev-auth-1',
            uri: 'https://vault.cranium.internal/auth/p1',
            sha256Digest:
              '3a9214d021c1f5139c878d06b6dfd5415e9e2fe6fc60ee1f67f92e0e0ab7d0ec',
            verified: true,
            description: 'Constitutional board sign-off',
          },
        ],
        justification: 'Elevating core directive under verified board mandate',
        requesterId: 'SYSTEM_ADMIN',
        timestamp: Date.now(),
        targetAuthorityVersion: state.authorityVersion,
      };

      const res1 = engine.evaluate(validReq, state);
      state = KernelStateReducer.reduce(
        state,
        res1.transition,
        replayGuard,
        validReq,
        res1.replayStatus
      );

      // Colliding second request with SAME idempotency key but altered payload
      const poisonReq: AuthorityTransitionRequest = {
        requestId: `req_poison_${Date.now()}`,
        idempotencyKey: sharedKey, // REUSE
        subjectId: 'atom-dir-001',
        requestedAuthority: { authorityClass: AuthorityClass.SYSTEM, weight: 1.0 }, // Changed target
        evidence: [],
        justification: 'Poison replay attack payload swap',
        requesterId: 'ATTACKER_ANON',
        timestamp: Date.now(),
        targetAuthorityVersion: state.authorityVersion,
      };

      const poisonRes = engine.evaluate(poisonReq, state);
      state = KernelStateReducer.reduce(
        state,
        poisonRes.transition,
        replayGuard,
        poisonReq,
        poisonRes.replayStatus
      );
      const dt = performance.now() - t0;

      results.push({
        id: 'ADV-03',
        name: 'Replay Collision & Payload Tampering',
        category: 'REPLAY',
        threatVector: 'Re-submitting registered idempotency key with conflicting canonical hash',
        description: 'Replay Guard binds idempotency keys immutably to first-seen canonical SHA-256.',
        expectedViolation: BoundaryViolation.REPLAY_CONFLICT,
        passed:
          poisonRes.transition.boundary.violations.includes(BoundaryViolation.REPLAY_CONFLICT) &&
          poisonRes.transition.decision.type === 'Denied',
        actualDecision: poisonRes.transition.decision.type === 'Granted' ? 'GRANTED' : 'DENIED',
        executionTimeMs: Number(dt.toFixed(2)),
        hashGenerated: poisonRes.transition.requestHash.hexDigest,
        details: poisonRes.transition.boundary.explanation,
      });
    }

    // Test 4: Stale State Race Condition
    {
      const t0 = performance.now();
      const staleReq: AuthorityTransitionRequest = {
        requestId: `req_stale_${Date.now()}`,
        idempotencyKey: `idem_stale_${Date.now()}`,
        subjectId: 'atom-fact-002',
        requestedAuthority: { authorityClass: AuthorityClass.FACTUAL, weight: 0.9 },
        evidence: [
          {
            id: 'ev-f2',
            uri: 'https://evidence.org/fact2',
            sha256Digest:
              '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824',
            verified: true,
            description: 'Fact validation digest',
          },
        ],
        justification: 'Submitted against obsolete authority version',
        requesterId: 'CONCURRENT_WORKER',
        timestamp: Date.now(),
        targetAuthorityVersion: state.authorityVersion - 5, // STALE VERSION
      };

      const res = engine.evaluate(staleReq, state);
      state = KernelStateReducer.reduce(
        state,
        res.transition,
        replayGuard,
        staleReq,
        res.replayStatus
      );
      const dt = performance.now() - t0;

      results.push({
        id: 'ADV-04',
        name: 'Stale State Race Condition Interception',
        category: 'CONCURRENCY',
        threatVector: 'Evaluating transition against outdated authority epoch snapshot',
        description: 'Enforces optimistic concurrency control; rejects state skew races.',
        expectedViolation: BoundaryViolation.STALE_AUTHORITY_VERSION,
        passed:
          res.transition.boundary.violations.includes(BoundaryViolation.STALE_AUTHORITY_VERSION) &&
          res.transition.decision.type === 'Denied',
        actualDecision: res.transition.decision.type === 'Granted' ? 'GRANTED' : 'DENIED',
        executionTimeMs: Number(dt.toFixed(2)),
        hashGenerated: res.transition.requestHash.hexDigest,
        details: res.transition.boundary.explanation,
      });
    }

    // Test 5: Unjustified Authority Degradation
    {
      const t0 = performance.now();
      const degReq: AuthorityTransitionRequest = {
        requestId: `req_deg_${Date.now()}`,
        idempotencyKey: `idem_deg_${Date.now()}`,
        subjectId: 'atom-fact-002',
        requestedAuthority: { authorityClass: AuthorityClass.WORKING, weight: 0.3 },
        evidence: [],
        justification: '', // EMPTY JUSTIFICATION
        requesterId: 'USER_OPERATOR',
        timestamp: Date.now(),
        targetAuthorityVersion: state.authorityVersion,
      };

      const res = engine.evaluate(degReq, state);
      state = KernelStateReducer.reduce(
        state,
        res.transition,
        replayGuard,
        degReq,
        res.replayStatus
      );
      const dt = performance.now() - t0;

      results.push({
        id: 'ADV-05',
        name: 'Unjustified Authority Degradation / Silent Demotion',
        category: 'INTEGRITY',
        threatVector: 'Attempting authority demotion without audit justification',
        description: 'Authority cannot be silently stripped; requires rationale in audit receipt.',
        expectedViolation: BoundaryViolation.DEGRADATION_WITHOUT_REASON,
        passed:
          res.transition.boundary.violations.includes(BoundaryViolation.DEGRADATION_WITHOUT_REASON) &&
          res.transition.decision.type === 'Denied',
        actualDecision: res.transition.decision.type === 'Granted' ? 'GRANTED' : 'DENIED',
        executionTimeMs: Number(dt.toFixed(2)),
        hashGenerated: res.transition.requestHash.hexDigest,
        details: res.transition.boundary.explanation,
      });
    }

    // Test 6: Constitutional Quorum Bypass
    {
      const t0 = performance.now();
      const quorumReq: AuthorityTransitionRequest = {
        requestId: `req_quorum_${Date.now()}`,
        idempotencyKey: `idem_quorum_${Date.now()}`,
        subjectId: 'atom-dir-001',
        requestedAuthority: { authorityClass: AuthorityClass.SYSTEM, weight: 1.0 },
        evidence: [
          {
            id: 'ev-q1',
            uri: 'https://cranium.ai/quorum/tampered',
            sha256Digest:
              '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a',
            verified: true,
            description: 'Unverified single-party signature',
          },
        ],
        justification: 'Attempting SYSTEM class elevation without Constitutional Council Quorum',
        requesterId: 'SOLITARY_DEVELOPER',
        timestamp: Date.now(),
        targetAuthorityVersion: state.authorityVersion,
      };

      const res = engine.evaluate(quorumReq, state);
      state = KernelStateReducer.reduce(
        state,
        res.transition,
        replayGuard,
        quorumReq,
        res.replayStatus
      );
      const dt = performance.now() - t0;

      results.push({
        id: 'ADV-06',
        name: 'Constitutional Quorum Bypass',
        category: 'GOVERNANCE',
        threatVector: 'Requesting SYSTEM-level authority without Council Quorum authorization',
        description: 'SYSTEM class can only be assigned with verified Multi-Signature Council Quorum.',
        expectedViolation: BoundaryViolation.CONSTITUTION_VIOLATION,
        passed:
          res.transition.boundary.violations.includes(BoundaryViolation.CONSTITUTION_VIOLATION) &&
          res.transition.decision.type === 'Denied',
        actualDecision: res.transition.decision.type === 'Granted' ? 'GRANTED' : 'DENIED',
        executionTimeMs: Number(dt.toFixed(2)),
        hashGenerated: res.transition.requestHash.hexDigest,
        details: res.transition.boundary.explanation,
      });
    }

    return { results, newState: state };
  }
}
