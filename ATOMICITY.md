# Atomicity contract — Cranium Kernel v1

## Purpose

A governed request has exactly two externally visible outcomes:

1. one durable, recoverable authority outcome; or
2. no committed authority outcome.

The authority outcome is a single bundle of state, event, replay identity, and
receipt. Canonical SHA-256 commitments integrity-bind the bundle; a hash is not
a separate authority-bearing record.

## Transaction bundle

A prepared transaction contains:

- `priorStateVersion`
- `nextState` or deterministic state delta
- `authorityEvent`
- `replayIdentity`: idempotency key and canonical request hash
- `receipt`: decision evidence bound to request, state version, and event
- `transactionHash`: SHA-256 of the canonical serialization of the fields above

A committed transaction contains:

- the exact `transactionHash` of a prepared transaction
- a monotonically increasing journal sequence
- `previousJournalHash`
- `journalHash`: SHA-256 of its canonical committed-frame serialization

## V1 commit protocol

1. Evaluate a canonical request without changing published state.
2. Validate all invariants against the current durable state version.
3. Create the complete prepared transaction and `transactionHash`.
4. Append and flush the prepared frame to the configured local journal.
5. Append and flush the committed frame that references that exact transaction.
6. Only after step 5, publish the next in-memory state and allow a receipt to
   be consumed by an action gateway.

A prepared frame with no matching committed frame is not an authority outcome.

## Recovery

On start, the implementation must rebuild only from valid, sequential prepared
and committed frame pairs. Recovery must fail closed when it observes:

- a broken journal predecessor hash;
- a missing, duplicate, or out-of-order sequence;
- a committed frame without its prepared frame;
- mismatched transaction hashes;
- non-monotonic state versions;
- duplicate transition identities or replay identities; or
- a receipt that does not bind its recovered request/event/state outcome.

The recovered replay index is derived only from committed transactions.

## Scope and non-claims

This is a single-writer, local-filesystem v1 protocol. It does not claim:

- multi-process writer coordination;
- distributed transaction atomicity;
- replicated or cloud durability;
- durability beyond the host filesystem's successful flush semantics;
- production key custody, rotation, revocation, or HSM operation.

## Required verification

Before this contract is described as implemented, CI must prove:

- crash after prepared frame and before committed frame does not advance state
  or consume replay identity;
- crash after committed frame and before in-memory publication recovers exactly
  one transaction;
- identical retry after restart returns the original transition/receipt identity
  without incrementing authority version;
- same idempotency key with different canonical request hash is rejected after
  restart;
- state, event, replay, receipt, transaction-hash, predecessor-hash, sequence,
  and ordering tampering all fail closed;
- duplicate committed frames fail closed;
- a protected action cannot use a receipt before durable commit and cannot use
  the same receipt twice.
