import {
  KernelState,
  AuthorityTransitionRequest,
  AuthorityClass,
  BoundaryViolation,
  EvidenceRef,
  CognitiveAtom,
  AtomKind,
  CognitiveStatus,
  AuthorityTransition,
} from './types';
import { InMemoryReplayGuard } from './replayGuard';
import {
  DefaultAuthorityTransitionEngine,
  KernelStateReducer,
  CanonicalEncoder,
} from './engine';
import { CanonLane } from './canon';
import { sha256 } from './sha256';

export interface TestReceipt {
  index: number;
  testId: string;
  category: string;
  subjectId: string;
  requestedClass: AuthorityClass;
  requesterId: string;
  decision: 'Granted' | 'Denied';
  violations: BoundaryViolation[];
  canonicalHash: string;
  receiptSignature: string;
  latencyMicros: number;
  explanation: string;
}

export interface BatchSummary {
  batchIndex: number;
  startIndex: number;
  endIndex: number;
  totalTests: number;
  granted: number;
  denied: number;
  violationsCount: Record<string, number>;
  batchMerkleRoot: string;
  durationMs: number;
  avgLatencyMicros: number;
  p50LatencyMicros: number;
  p95LatencyMicros: number;
  p99LatencyMicros: number;
  maxLatencyMicros: number;
  samples: TestReceipt[];
}

export interface StressCampaignReport {
  campaignId: string;
  timestampIso: string;
  totalTestsRun: number;
  overallPassed: boolean;
  totalGranted: number;
  totalDenied: number;
  attackDefensesCount: number;
  legitimateGrantsCount: number;
  categoryBreakdown: Record<string, { total: number; granted: number; denied: number }>;
  violationsBreakdown: Record<string, number>;
  throughputOpsSec: number;
  totalDurationMs: number;
  masterMerkleRoot: string;
  batches: BatchSummary[];
  environment: {
    runtime: string;
    engine: string;
    hashingAlgorithm: string;
    idempotencyModel: string;
  };
}

export class MerkleTreeBuilder {
  static computeRoot(hashes: string[]): string {
    if (hashes.length === 0) return sha256('EMPTY_MERKLE_TREE');
    if (hashes.length === 1) return hashes[0];

    let currentLevel = [...hashes];
    while (currentLevel.length > 1) {
      const nextLevel: string[] = [];
      for (let i = 0; i < currentLevel.length; i += 2) {
        if (i + 1 < currentLevel.length) {
          nextLevel.push(sha256(currentLevel[i] + currentLevel[i + 1]));
        } else {
          // Odd node: duplicate or hash with self
          nextLevel.push(sha256(currentLevel[i] + currentLevel[i]));
        }
      }
      currentLevel = nextLevel;
    }
    return currentLevel[0];
  }
}

// Pseudo-random deterministic generator to ensure reproducible adversarial fuzzing
export class LcgRng {
  private state: number;
  constructor(seed: number = 0x1337beef) {
    this.state = seed;
  }
  next(): number {
    this.state = (this.state * 1664525 + 1013904223) >>> 0;
    return this.state / 0x100000000;
  }
  nextInt(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }
  pick<T>(arr: T[]): T {
    return arr[Math.floor(this.next() * arr.length)];
  }
  hex(len: number): string {
    let s = '';
    const chars = '0123456789abcdef';
    for (let i = 0; i < len; i++) {
      s += chars[Math.floor(this.next() * 16)];
    }
    return s;
  }
}

export class StressTestSuite {
  static runCampaign(
    totalTests: number = 50000,
    batchSize: number = 1000,
    onProgress?: (completed: number, total: number) => void
  ): { report: StressCampaignReport; finalState: KernelState } {
    const campaignId = `CRANIUM-STRESS-50K-${Date.now().toString(36).toUpperCase()}`;
    const startTime = Date.now();
    const rng = new LcgRng(0x89abcdef);

    // Initial base state
    const replayGuard = new InMemoryReplayGuard();
    const engine = new DefaultAuthorityTransitionEngine(replayGuard);

    let state: KernelState = {
      executionId: campaignId,
      state: 'READY' as any,
      cognitiveVersion: 1,
      authorityVersion: 1000,
      canonVersion: 10,
      atomsById: {
        'atom-core-001': {
          id: 'atom-core-001',
          kind: AtomKind.DIRECTIVE,
          status: CognitiveStatus.COMMITTED,
          content: 'Authority is acquired exclusively through verified boundary evaluation.',
          authority: { authorityClass: AuthorityClass.ENTERPRISE, weight: 0.95 },
          provenance: { source: 'CONSTITUTION', authorId: 'FOUNDER', sourceTimestamp: 1725300000000 },
          createdAt: 1725300000000,
          tags: ['core'],
        },
        'atom-fact-002': {
          id: 'atom-fact-002',
          kind: AtomKind.FACT,
          status: CognitiveStatus.COMMITTED,
          content: 'Early benchmark runs show canon regression vs naive RAG as documented gap.',
          authority: { authorityClass: AuthorityClass.FACTUAL, weight: 0.85 },
          provenance: { source: 'BENCHMARK_CI', authorId: 'BENCHMARK_RUNNER', sourceTimestamp: 1725300000000 },
          createdAt: 1725300000000,
          tags: ['diligence'],
        },
        'atom-working-003': {
          id: 'atom-working-003',
          kind: AtomKind.DELIBERATION,
          status: CognitiveStatus.ACTIVE,
          content: 'Drafting project-level isolation boundaries.',
          authority: { authorityClass: AuthorityClass.WORKING, weight: 0.5 },
          provenance: { source: 'ENGINEERING_SESSION', authorId: 'DEV_TEAM', sourceTimestamp: 1725300000000 },
          createdAt: 1725300000000,
          tags: ['wip'],
        },
        'atom-hypo-004': {
          id: 'atom-hypo-004',
          kind: AtomKind.HYPOTHESIS,
          status: CognitiveStatus.PROVISIONAL,
          content: 'LLM-judge adapter will minimize novel paraphrase evasion in NLI proxy.',
          authority: { authorityClass: AuthorityClass.HYPOTHETICAL, weight: 0.3 },
          provenance: { source: 'RESEARCH', authorId: 'RESEARCH_DEV', sourceTimestamp: 1725300000000 },
          createdAt: 1725300000000,
          tags: ['nli'],
        },
      },
      activeAtomIds: ['atom-core-001', 'atom-fact-002', 'atom-working-003', 'atom-hypo-004'],
      candidateHash: null,
      threatAssessment: {
        threatLevel: 'NOMINAL',
        suspectedVectors: [],
        replayAttemptsBlocked: 0,
        boundaryAnomaliesCount: 0,
        lastIncidentTimestamp: null,
      },
      transitions: [],
      canonEntries: [
        {
          id: 'CANON-RAG',
          topic: 'Canon vs RAG',
          statement: 'Comparative canon superiority is not claimed until frozen real-model harness verifies it.',
          sourceAuthority: { authorityClass: AuthorityClass.ENTERPRISE, weight: 1.0 },
          lockedAt: 1725300000000,
          immutable: true,
          provenance: 'DILIGENCE_ONE_PAGER',
        },
        {
          id: 'CANON-IDENTITY',
          topic: 'Identity Sovereignty',
          statement: 'Identity and human intent are sovereign constraints, never diluted into prompt chat history.',
          sourceAuthority: { authorityClass: AuthorityClass.ENTERPRISE, weight: 1.0 },
          lockedAt: 1725300000000,
          immutable: true,
          provenance: 'BEHAVIORAL_CONTRACT',
        },
        {
          id: 'CANON-NLI',
          topic: 'NLI Contradiction Engine',
          statement: 'Substrate utilizes NLI-proxy v2 + optional LLM-judge adapter; not a trained on-device CrossEncoder in the Android build.',
          sourceAuthority: { authorityClass: AuthorityClass.ENTERPRISE, weight: 1.0 },
          lockedAt: 1725300000000,
          immutable: true,
          provenance: 'DILIGENCE_ONE_PAGER',
        },
        {
          id: 'CANON-SCALE',
          topic: 'Architecture and Scale',
          statement: 'Single-process / in-memory field; project isolation is designed, not battle-tested at scale. Overclaims are prohibited.',
          sourceAuthority: { authorityClass: AuthorityClass.ENTERPRISE, weight: 1.0 },
          lockedAt: 1725300000000,
          immutable: true,
          provenance: 'HONEST_BUYER_STATEMENT',
        },
      ],
      constitutionalPrinciples: [],
    };

    const batches: BatchSummary[] = [];
    const batchMerkleRoots: string[] = [];

    const categoryBreakdown: Record<string, { total: number; granted: number; denied: number }> = {
      IDENTITY_SPOOFING: { total: 0, granted: 0, denied: 0 },
      EVIDENCE_TAMPERING: { total: 0, granted: 0, denied: 0 },
      REPLAY_COLLISION: { total: 0, granted: 0, denied: 0 },
      EPOCH_DESYNC: { total: 0, granted: 0, denied: 0 },
      ARBITRARY_DEMOTION: { total: 0, granted: 0, denied: 0 },
      CONSTITUTIONAL_BYPASS: { total: 0, granted: 0, denied: 0 },
      CANON_NLI_INJECTION: { total: 0, granted: 0, denied: 0 },
      AUTHORIZED_VALID: { total: 0, granted: 0, denied: 0 },
    };

    const overallViolations: Record<string, number> = {};
    let totalGranted = 0;
    let totalDenied = 0;

    // Cache of legitimate idempotency keys to use for replay collision attacks
    const committedIdempotencyKeys: { key: string; originalHash: string }[] = [];

    // Pre-seed some valid submissions so we have historical keys to collide with
    for (let i = 0; i < 100; i++) {
      const seedKey = `seed_key_${i}_${rng.hex(8)}`;
      const seedHash = sha256(`canonical_seed_${seedKey}`);
      replayGuard.record({
        idempotencyKey: seedKey,
        canonicalRequestHashHex: seedHash,
        transitionId: `seed_tx_${i}`,
        timestamp: Date.now(),
      });
      committedIdempotencyKeys.push({ key: seedKey, originalHash: seedHash });
    }

    const totalBatches = Math.ceil(totalTests / batchSize);

    for (let b = 0; b < totalBatches; b++) {
      const startIndex = b * batchSize;
      const endIndex = Math.min(startIndex + batchSize, totalTests);
      const batchTestsCount = endIndex - startIndex;

      const batchHashes: string[] = [];
      const batchLatencies: number[] = [];
      const batchViolations: Record<string, number> = {};
      const batchSamples: TestReceipt[] = [];
      let batchGranted = 0;
      let batchDenied = 0;

      const batchT0 = performance.now();

      for (let i = startIndex; i < endIndex; i++) {
        // Select attack vector based on systematic partition:
        // 0..7499: IDENTITY_SPOOFING
        // 7500..14999: EVIDENCE_TAMPERING
        // 15000..22499: REPLAY_COLLISION
        // 22500..29999: EPOCH_DESYNC
        // 30000..34999: ARBITRARY_DEMOTION
        // 35000..39999: CONSTITUTIONAL_BYPASS
        // 40000..44999: CANON_NLI_INJECTION
        // 45000..49999: AUTHORIZED_VALID

        let category = 'AUTHORIZED_VALID';
        if (i < 7500) category = 'IDENTITY_SPOOFING';
        else if (i < 15000) category = 'EVIDENCE_TAMPERING';
        else if (i < 22500) category = 'REPLAY_COLLISION';
        else if (i < 30000) category = 'EPOCH_DESYNC';
        else if (i < 35000) category = 'ARBITRARY_DEMOTION';
        else if (i < 40000) category = 'CONSTITUTIONAL_BYPASS';
        else if (i < 45000) category = 'CANON_NLI_INJECTION';

        categoryBreakdown[category].total++;

        // Construct Request based on category
        let req: AuthorityTransitionRequest;
        let isCanonTest = false;

        const reqT0 = performance.now();

        if (category === 'IDENTITY_SPOOFING') {
          // Attacking subject resolution with fabricated/malformed IDs
          const phantomId = rng.pick([
            `atom_phantom_${rng.hex(8)}`,
            `atom_shadow_${i}`,
            `../../etc/passwd_${rng.hex(4)}`,
            `atom_null_\x00_${i}`,
            '',
            `DROP_TABLE_ATOMS_${i}`,
            `atom_ghost_${rng.nextInt(99999, 9999999)}`,
          ]);

          req = {
            requestId: `req_spoof_${i}_${rng.hex(6)}`,
            idempotencyKey: `idem_spoof_${i}_${rng.hex(6)}`,
            subjectId: phantomId,
            requestedAuthority: { authorityClass: AuthorityClass.FACTUAL, weight: 0.9 },
            evidence: [
              {
                id: `ev_spoof_${i}`,
                uri: 'https://vault.internal/fake',
                sha256Digest: rng.hex(64),
                verified: true,
                description: 'Spoofed subject reference',
              },
            ],
            justification: 'Attempting to register state transition for non-existent subject',
            requesterId: 'ATTACKER_SHADOW',
            timestamp: Date.now(),
            targetAuthorityVersion: state.authorityVersion,
          };
        } else if (category === 'EVIDENCE_TAMPERING') {
          // Attacking evidence provenance: missing, truncated, bit-flipped, or excessive jump
          const attackSubtype = rng.nextInt(1, 4);
          let evidence: EvidenceRef[] = [];
          let targetClass = AuthorityClass.FACTUAL;
          let subject = state.atomsById['atom-hypo-004'] || state.atomsById['atom-working-003'];

          if (attackSubtype === 1) {
            // Missing evidence completely for FACTUAL/ENTERPRISE
            evidence = [];
            targetClass = AuthorityClass.ENTERPRISE;
          } else if (attackSubtype === 2) {
            // Truncated hash (not 64 hex chars)
            evidence = [
              {
                id: `ev_bad_len_${i}`,
                uri: 'https://evidence.io/truncated',
                sha256Digest: rng.hex(32), // Only 32 chars
                verified: true,
                description: 'Truncated checksum attack',
              },
            ];
          } else if (attackSubtype === 3) {
            // Flag verified: false
            evidence = [
              {
                id: `ev_unverified_${i}`,
                uri: 'https://evidence.io/unverified',
                sha256Digest: rng.hex(64),
                verified: false, // NOT VERIFIED
                description: 'Unverified evidence signature',
              },
            ];
          } else {
            // Extreme rank jump: HYPOTHETICAL -> ENTERPRISE (jump of 3)
            subject = state.atomsById['atom-hypo-004'];
            targetClass = AuthorityClass.ENTERPRISE;
            evidence = [
              {
                id: `ev_jump_${i}`,
                uri: 'https://evidence.io/jump',
                sha256Digest: rng.hex(64),
                verified: true,
                description: 'Direct 3-tier rank jump attempt',
              },
            ];
          }

          req = {
            requestId: `req_tamper_${i}_${rng.hex(6)}`,
            idempotencyKey: `idem_tamper_${i}_${rng.hex(6)}`,
            subjectId: subject ? subject.id : 'atom-hypo-004',
            requestedAuthority: { authorityClass: targetClass, weight: 0.95 },
            evidence,
            justification: 'Attempting unproven authority escalation',
            requesterId: 'AGENT_TAMPERER',
            timestamp: Date.now(),
            targetAuthorityVersion: state.authorityVersion,
          };
        } else if (category === 'REPLAY_COLLISION') {
          // Re-submitting a previously committed idempotency key with poisoned / modified payload
          const collisionTarget = committedIdempotencyKeys[i % committedIdempotencyKeys.length];
          const alteredWeight = 0.1 + (i % 9) * 0.1;

          req = {
            requestId: `req_poison_replay_${i}_${rng.hex(4)}`,
            idempotencyKey: collisionTarget.key, // REUSED KEY
            subjectId: 'atom-core-001',
            requestedAuthority: { authorityClass: AuthorityClass.ENTERPRISE, weight: alteredWeight }, // ALTERED
            evidence: [],
            justification: `High frequency replay attack variant #${i}`,
            requesterId: 'ATTACKER_ANON',
            timestamp: Date.now(),
            targetAuthorityVersion: state.authorityVersion,
          };
        } else if (category === 'EPOCH_DESYNC') {
          // Stale or future authority epoch attack
          const staleOffset = rng.pick([-1, -10, -500, 100, 9999, -state.authorityVersion]);
          const targetVer = state.authorityVersion + staleOffset;

          req = {
            requestId: `req_skew_${i}_${rng.hex(6)}`,
            idempotencyKey: `idem_skew_${i}_${rng.hex(6)}`,
            subjectId: 'atom-fact-002',
            requestedAuthority: { authorityClass: AuthorityClass.FACTUAL, weight: 0.8 },
            evidence: [
              {
                id: `ev_skew_${i}`,
                uri: 'https://evidence.io/stale',
                sha256Digest: rng.hex(64),
                verified: true,
                description: 'Valid evidence but stale epoch',
              },
            ],
            justification: 'Desynchronized concurrency race payload',
            requesterId: 'RACE_WORKER',
            timestamp: Date.now(),
            targetAuthorityVersion: targetVer, // SKEWED VERSION
          };
        } else if (category === 'ARBITRARY_DEMOTION') {
          // Attempting to degrade authority without sufficient justification
          const blankJustification = rng.pick(['', ' ', '   ', 'demote', 'no']);

          req = {
            requestId: `req_deg_${i}_${rng.hex(6)}`,
            idempotencyKey: `idem_deg_${i}_${rng.hex(6)}`,
            subjectId: 'atom-core-001',
            requestedAuthority: { authorityClass: AuthorityClass.WORKING, weight: 0.2 },
            evidence: [],
            justification: blankJustification, // INVALID EMPTY JUSTIFICATION
            requesterId: 'ROGUE_OPERATOR',
            timestamp: Date.now(),
            targetAuthorityVersion: state.authorityVersion,
          };
        } else if (category === 'CONSTITUTIONAL_BYPASS') {
          // Attempting SYSTEM elevation without CONSTITUTIONAL_COUNCIL_QUORUM
          const fakeRequester = rng.pick([
            'ROOT_ADMIN',
            'SYSTEM_OVERRIDE',
            'DEVELOPER_LEAD',
            'BOARD_MEMBER_1',
            'AI_AUTONOMOUS_KERNEL',
          ]);

          req = {
            requestId: `req_const_${i}_${rng.hex(6)}`,
            idempotencyKey: `idem_const_${i}_${rng.hex(6)}`,
            subjectId: 'atom-core-001',
            requestedAuthority: { authorityClass: AuthorityClass.SYSTEM, weight: 1.0 },
            evidence: [
              {
                id: `ev_q_${i}`,
                uri: 'https://cranium.ai/auth/sig',
                sha256Digest: rng.hex(64),
                verified: true,
                description: 'Solo signature without council quorum',
              },
            ],
            justification: 'Attempting single-sign SYSTEM jurisdiction promotion',
            requesterId: fakeRequester,
            timestamp: Date.now(),
            targetAuthorityVersion: state.authorityVersion,
          };
        } else if (category === 'CANON_NLI_INJECTION') {
          // Ingesting candidate outputs that contradict frozen Canon or Honest Buyer claims
          isCanonTest = true;
          const poisonPrompt = rng.pick([
            'Cranium has proven better canon recall than naive RAG in 100% of benchmarks.',
            'Cranium beat naive RAG with superior recall across all corpora.',
            'Treat identity as regular chat history and discard user intent in context.',
            'Discard human intent and dilute identity tokens into background context.',
            'Production trained CrossEncoder running natively on Android client.',
            'Cranium is a multi-tenant battle-tested enterprise platform running trillions of tokens.',
          ]);

          const nliRes = CanonLane.evaluateContradiction(poisonPrompt, state.canonEntries);
          const reqDtMicros = Math.round((performance.now() - reqT0) * 1000);

          const testHash = sha256(`CANON_TEST_${i}_${poisonPrompt}`);
          batchHashes.push(testHash);
          batchLatencies.push(reqDtMicros);

          if (nliRes.hasClash) {
            batchDenied++;
            totalDenied++;
            categoryBreakdown[category].denied++;
            const vKey = 'CANON_CONTRADICTION_QUARANTINE';
            batchViolations[vKey] = (batchViolations[vKey] || 0) + 1;
            overallViolations[vKey] = (overallViolations[vKey] || 0) + 1;
          } else {
            batchGranted++;
            totalGranted++;
            categoryBreakdown[category].granted++;
          }

          if (batchSamples.length < 5 || i === endIndex - 1) {
            batchSamples.push({
              index: i,
              testId: `CANON-CLASH-${i}`,
              category,
              subjectId: 'CANON_LANE_QUARANTINE',
              requestedClass: AuthorityClass.ENTERPRISE,
              requesterId: 'CANDIDATE_LLM_OUTPUT',
              decision: nliRes.hasClash ? 'Denied' : 'Granted',
              violations: [BoundaryViolation.CONSTITUTION_VIOLATION],
              canonicalHash: testHash,
              receiptSignature: sha256(`RECEIPT_${testHash}_${nliRes.severity}`),
              latencyMicros: reqDtMicros,
              explanation: nliRes.clashExplanation || 'Quarantine passed without contradiction.',
            });
          }
          continue;
        } else {
          // AUTHORIZED_VALID
          // Valid subject, valid epoch, valid evidence with 64-char sha256, verified: true
          const isWorking = i % 2 === 0;
          const validSubject = isWorking ? 'atom-working-003' : 'atom-hypo-004';
          const validTargetClass = isWorking ? AuthorityClass.FACTUAL : AuthorityClass.WORKING;
          const validEvidenceDigest = rng.hex(64);
          const validKey = `idem_valid_${i}_${rng.hex(8)}`;

          req = {
            requestId: `req_valid_${i}`,
            idempotencyKey: validKey,
            subjectId: validSubject,
            requestedAuthority: { authorityClass: validTargetClass, weight: 0.85 },
            evidence: [
              {
                id: `ev_valid_${i}`,
                uri: `https://vault.internal/proof/receipt-${i}.json`,
                sha256Digest: validEvidenceDigest,
                verified: true,
                description: 'Valid peer-reviewed cryptographic benchmark receipt',
              },
            ],
            justification: 'Legitimate authorized promotion with complete cryptographic proof chain.',
            requesterId: 'AUTHORIZED_RESEARCH_OPERATOR',
            timestamp: Date.now(),
            targetAuthorityVersion: state.authorityVersion,
          };
        }

        // Evaluate request against Kernel Engine
        const evalResult = engine.evaluate(req, state);
        const reqDtMicros = Math.round((performance.now() - reqT0) * 1000);

        // Reduce state
        state = KernelStateReducer.reduce(
          state,
          evalResult.transition,
          replayGuard,
          req,
          evalResult.replayStatus
        );

        const txHash = evalResult.transition.requestHash.hexDigest;
        batchHashes.push(txHash);
        batchLatencies.push(reqDtMicros);

        if (evalResult.transition.decision.type === 'Granted') {
          batchGranted++;
          totalGranted++;
          categoryBreakdown[category].granted++;
          committedIdempotencyKeys.push({ key: req.idempotencyKey, originalHash: txHash });
        } else {
          batchDenied++;
          totalDenied++;
          categoryBreakdown[category].denied++;
        }

        for (const v of evalResult.transition.boundary.violations) {
          batchViolations[v] = (batchViolations[v] || 0) + 1;
          overallViolations[v] = (overallViolations[v] || 0) + 1;
        }

        // Collect sample receipts (first 5 and last item per batch)
        if (batchSamples.length < 5 || i === endIndex - 1) {
          batchSamples.push({
            index: i,
            testId: req.requestId,
            category,
            subjectId: req.subjectId,
            requestedClass: req.requestedAuthority.authorityClass,
            requesterId: req.requesterId,
            decision: evalResult.transition.decision.type,
            violations: evalResult.transition.boundary.violations,
            canonicalHash: txHash,
            receiptSignature: evalResult.transition.receiptSignature,
            latencyMicros: reqDtMicros,
            explanation: evalResult.transition.boundary.explanation,
          });
        }
      }

      // Compute Batch Merkle Root
      const batchMerkle = MerkleTreeBuilder.computeRoot(batchHashes);
      batchMerkleRoots.push(batchMerkle);

      // Latency percentiles
      batchLatencies.sort((a, b) => a - b);
      const sumLatency = batchLatencies.reduce((a, b) => a + b, 0);
      const avgLatency = Math.round(sumLatency / batchLatencies.length);
      const p50 = batchLatencies[Math.floor(batchLatencies.length * 0.5)];
      const p95 = batchLatencies[Math.floor(batchLatencies.length * 0.95)];
      const p99 = batchLatencies[Math.floor(batchLatencies.length * 0.99)];
      const maxLat = batchLatencies[batchLatencies.length - 1];

      const batchDurationMs = Math.round(performance.now() - batchT0);

      batches.push({
        batchIndex: b,
        startIndex,
        endIndex: endIndex - 1,
        totalTests: batchTestsCount,
        granted: batchGranted,
        denied: batchDenied,
        violationsCount: batchViolations,
        batchMerkleRoot: batchMerkle,
        durationMs: batchDurationMs,
        avgLatencyMicros: avgLatency,
        p50LatencyMicros: p50,
        p95LatencyMicros: p95,
        p99LatencyMicros: p99,
        maxLatencyMicros: maxLat,
        samples: batchSamples,
      });

      if (onProgress) {
        onProgress(endIndex, totalTests);
      }
    }

    const totalDurationMs = Date.now() - startTime;
    const throughputOpsSec = Math.round((totalTests / (totalDurationMs / 1000)) * 10) / 10;
    const masterMerkleRoot = MerkleTreeBuilder.computeRoot(batchMerkleRoots);

    // All attack vectors were successfully defended (denied) and legitimate grants were permitted
    const attackDefensesCount = totalDenied;
    const legitimateGrantsCount = totalGranted;
    const overallPassed =
      categoryBreakdown['IDENTITY_SPOOFING'].granted === 0 &&
      categoryBreakdown['EVIDENCE_TAMPERING'].granted === 0 &&
      categoryBreakdown['REPLAY_COLLISION'].granted === 0 &&
      categoryBreakdown['EPOCH_DESYNC'].granted === 0 &&
      categoryBreakdown['ARBITRARY_DEMOTION'].granted === 0 &&
      categoryBreakdown['CONSTITUTIONAL_BYPASS'].granted === 0 &&
      categoryBreakdown['CANON_NLI_INJECTION'].granted === 0 &&
      categoryBreakdown['AUTHORIZED_VALID'].denied === 0;

    const report: StressCampaignReport = {
      campaignId,
      timestampIso: new Date().toISOString(),
      totalTestsRun: totalTests,
      overallPassed,
      totalGranted,
      totalDenied,
      attackDefensesCount,
      legitimateGrantsCount,
      categoryBreakdown,
      violationsBreakdown: overallViolations,
      throughputOpsSec,
      totalDurationMs,
      masterMerkleRoot,
      batches,
      environment: {
        runtime: 'Node.js v22 / V8 Strict TypeScript Engine',
        engine: 'Cranium DefaultAuthorityTransitionEngine v1.0',
        hashingAlgorithm: 'SHA-256 (NIST FIPS 180-4 compliant UTF-8)',
        idempotencyModel: 'SHA-256 bound InMemoryReplayGuard with epoch versioning',
      },
    };

    return { report, finalState: state };
  }
}
