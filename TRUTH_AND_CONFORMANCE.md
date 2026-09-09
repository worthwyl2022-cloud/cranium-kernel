# Truth and cross-platform conformance doctrine

## Non-negotiable rule

Cranium must not represent a placeholder, mock, fixture, test double, or
simulated result as a fact about an authority-bearing execution.

Models, adapters, UIs, test harnesses, and evidence producers may propose or
supply deterministic input. Only a real Cranium Core evaluation and committed
transaction may establish an authority outcome.

## Authority-path requirements

For any claim that a governed transition was granted, denied, committed,
recovered, replay-protected, receipt-bound, or cryptographically verified, the
software must execute the actual relevant mechanism:

- canonical serialization used by the real runtime;
- SHA-256 computation over the actual bound material;
- Ed25519 verification using actual verification code when a signature claim is made;
- actual invariant evaluation and authority decision;
- actual prepared/committed journal writes for an atomic-commit claim;
- actual journal recovery for a recovery claim;
- actual replay-index lookup and conflict handling for a replay claim.

A static report, hard-coded success value, precompiled campaign result, fake
signature string, or UI label is not proof of any of these properties.

## Test fixtures and doubles

Deterministic fixtures and test doubles are permitted only when they represent
external input or a controlled dependency. They must be labeled as fixtures or
test doubles and must not substitute for the mechanism being verified.

Examples:

- Allowed: a frozen request fixture passed to the real canonicalizer, real
  engine, and real journal.
- Allowed: a deterministic test key passed to real Ed25519 sign/verify code.
- Not allowed: a string labeled as an Ed25519 signature without a real signing
  operation and verification path.
- Not allowed: a mocked replay result presented as persistence or restart proof.
- Not allowed: a generated report presented as a live test run unless CI
  regenerates it from the real harness.

## Multi-platform conformance

Cranium is a multi-platform substrate. TypeScript and Kotlin implementations
must conform to one platform-neutral contract for authority semantics:

- request and transaction field meaning;
- canonical serialization requirements;
- SHA-256 test vectors;
- authority decision outcomes;
- state-version transitions;
- replay behavior;
- receipt bindings; and
- prepared/committed recovery semantics.

Platform-specific storage and UI adapters may differ. Authority semantics may
not drift. A platform is conformant only when it passes the same frozen corpus
and produces the required logical outcomes; a claim of byte-identical local
filesystem behavior is not required or implied.

## Evidence language

Use these labels precisely:

- `implemented and verified`: a real mechanism ran and its result is reproducible.
- `implemented, not yet verified in CI`: code exists but the declared CI proof is absent.
- `designed, not implemented`: contract or design exists without runtime behavior.
- `fixture` or `test-only`: controlled input or dependency, never production evidence.
- `placeholder`: prohibited in authority-bearing data and must be removed or clearly
  isolated as non-authority demo material.

If evidence is incomplete, Cranium fails closed in software and speaks plainly
in documentation.
