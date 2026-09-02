# Cranium Kernel — Adversarial Property Registry

Version: 0.1
Status: Active — properties and attacks are added as the adversarial campaign runs.

Registry disclaimer

This registry records properties the kernel is claimed to enforce, the production mechanisms that enforce them, the tests that exercise them, and every attack that has been attempted against them.

A property listed here is NOT a security guarantee. It is a claim that can be inspected, challenged, and attacked. The status ladder records what evidence actually exists for each property. If the[...]

The compiler and the CI pipeline are the authoritative judges. Not the authors.

Status ladder

Status advances only when CI evidence exists. A committed test that has not yet run in CI does not advance status past IMPLEMENTED.

Properties

P-001 — State Snapshot Integrity

Claim: A granted AuthorityTransition evaluated against authorityVersion = N cannot be committed into a KernelState whose authorityVersion is any value other than N, regardless of whether its trans[...]

Status: TESTED

Pending: StaleStateAttackTest targets this adversarially. Status advances to ATTACK-TESTED only after CI confirms it passes.

Enforcement mechanisms:

// KernelStateReducer.kt
require(transition.evaluatedAuthorityVersion == before.authorityVersion) { ... }

// CommitOrchestrator.kt (independent redundant check)
require(transition.evaluatedAuthorityVersion == currentState.authorityVersion) { ... }

Tests:


Attacks:


P-002 — Duplicate Commit Prevention

Claim: A granted AuthorityTransition whose id already appears in KernelState.authorityTransitionIds cannot be committed a second time.

Status: TESTED

Enforcement mechanism:

// KernelStateReducer.kt
require(transition.id !in before.authorityTransitionIds) { ... }

Tests:


Attacks: Planned — ATTACK-002 (replay of committed transition bypassing ReplayGuard).

P-003 — Replay Non-Reuse

Claim: A request with a previously committed requestId and idempotencyKey returns the original transition result and does not produce a second commit.

Status: TESTED

Enforcement mechanism: InMemoryReplayGuard.inspect() returns ReplayStatus.Existing; engine returns the original transition without re-evaluating.

Tests:


Attacks: Planned — ATTACK-004 (identical replay ordering), ATTACK-005 (conflicting payload reuse).

P-004 — Payload Mutation Detection

Claim: Mutating requestedAuthority after authorization binding produces a different RequestHash, causing boundary validation to reject the request.

Status: TESTED

Enforcement mechanism: Sha256RequestHasher canonical encoding includes requestedAuthority; DefaultBoundaryValidator checks boundRequestHash against the computed hash.

Tests:


Attacks: Planned — ATTACK-007 (partial field mutation targeting non-hashed fields).

P-005 — Protected-Lane Escalation Prevention

Claim: A CognitiveAtom in a protected CanonLane cannot have its authority increased by any request whose TransitionAuthorization.scope does not explicitly include that lane.

Status: IMPLEMENTED

Enforcement mechanisms:

Evaluation time: DefaultBoundaryValidator lane scope check
Commit time: ProtectedLaneWriteInvariant (INV-002) — independent backstop

Attacks: Planned — ATTACK-008 (boundary validator bypass; invariant must catch at commit).

P-006 — Identity Substitution Prevention

Claim: Substituting subjectId after authorization binding causes boundary validation to reject due to hash mismatch.

Status: UNVERIFIED

Enforcement mechanism: Identified — subjectId is included in the canonical hash. No adversarial test exists yet.

Attacks: Planned — ATTACK-009.

P-007 — Evidence Integrity

Claim: Substituting, removing, or duplicating EvidenceRef entries after authorization binding causes boundary validation to reject due to hash mismatch.

Status: UNVERIFIED

Enforcement mechanism: Identified — evidence list is included in canonical hash. No adversarial test exists yet.

Attacks: Planned — ATTACK-010 (substitution), ATTACK-011 (removal), ATTACK-012 (duplication).

P-008 — No Isolated Acquisition

Claim: An atom in ISOLATED status cannot acquire authority through any authority transition, regardless of whether the boundary validator ran correctly.

Status: IMPLEMENTED

Enforcement mechanism: NoIsolatedAcquisitionInvariant (INV-003) — commit-time backstop.

Tests:


Attacks: Planned — ATTACK-013 (boundary validator bypassed; invariant must stop commit).

P-009 — Authority Monotonicity

Claim: A Granted authority transition cannot decrease the authority class rank of the subject atom through the authority transition commit path.

Status: IMPLEMENTED

Enforcement mechanism: AuthorityMonotonicityInvariant (INV-001) — commit-time check.

Attacks: Planned — ATTACK-014 (crafted Granted transition that demotes authority class).

P-010 — Receipt Chain Integrity

Claim: Each committed receipt is SHA-256 chained to its predecessor via previousReceiptHash. Retroactive tampering with any historical receipt breaks forward integrity from that point.

Status: IMPLEMENTED

Enforcement mechanism: ReceiptChain + CommitOrchestrator receipt write path.

Tests:


Attacks: Planned — ATTACK-015 (retroactive hash substitution breaks chain).

Bypass records

No bypasses recorded yet. If a bypass is discovered it is recorded here permanently, regardless of whether it has been fixed. Deletion is not permitted.

Attack campaign sequence

Attacks run one at a time. Compound attacks run only after all single-vector attacks in scope are ATTACK-TESTED.

Current: ATTACK-001 (stale state) — pending CI execution.
Next: ATTACK-002 (duplicate commit), ATTACK-004 (identical replay).
Then: Protected-lane escalation, identity substitution, evidence manipulation.
Then: Compound attacks combining two or more vectors.
 