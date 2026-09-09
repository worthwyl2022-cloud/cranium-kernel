# Atomicity and recovery contract

## Scope

The authority mutation path is represented as an append-only, hash-bound journal. A mutation becomes recoverable only when a valid `PREPARED` frame is followed by its matching valid `COMMITTED` frame.

## Frame protocol

1. Construct a prepared transaction with a transaction ID, exactly-one-step state-version transition, replay identity, receipt binding, next state, and event.
2. Canonicalize the prepared material and bind it with `transactionHash`.
3. Append the valid `PREPARED` frame. A crash at this point leaves no committed mutation during recovery.
4. Construct a commit frame that binds the prepared hash, a positive sequential journal sequence, and the predecessor journal hash.
5. Append the valid `COMMITTED` frame. Recovery recognizes the transaction exactly once only after both frames validate.

## Recovery guarantees

Recovery fails closed when it observes malformed JSON, an unknown frame type, invalid prepared or committed hashes, a commit without a preparation, a prepared/commit hash mismatch, a broken predecessor hash, a non-sequential sequence number, duplicate transaction IDs, duplicate receipt IDs, replay-key reuse, conflicting replay-key/request-hash reuse, a receipt/request mismatch, a receipt/state-version mismatch, or a non-monotonic state transition.

Trailing `PREPARED` frames are intentionally retained as crash evidence but are not considered committed authority mutations.

## Verification

Run the recovery proof with:

```bash
npm run atomic:recovery-check
```

The proof covers prepared-only crash recovery, committed recovery, valid sequential history, payload tampering, transaction-ID tampering, sequence tampering, predecessor-hash tampering, receipt/request tampering, replay conflict, duplicate committed frame detection, and truncated trailing-frame rejection.
