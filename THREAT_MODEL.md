# Threat Model and Reproduction Matrix

The evaluator should run every row from a clean clone and retain the emitted receipt, logs, and environment manifest.

| ID | Threat | Adversarial action | Expected result | Existing evidence |
|---|---|---|---|---|
| ADV-01 | Identity substitution | Submit a missing, shadow, or malformed subject | Denied; typed identity violation; no authority mutation | Ultra adversarial suite; 50K campaign |
| ADV-02 | Evidence bypass | Elevate protected authority without verified evidence | Denied; evidence and rank-jump violations | Ultra adversarial suite; 50K campaign |
| ADV-03 | Replay collision | Reuse an idempotency key with a changed canonical request hash | Denied; replay conflict; original binding preserved | Ultra adversarial suite; atomic recovery |
| ADV-04 | Stale state race | Submit a request against an old authority version | Denied; current state remains authoritative | Ultra adversarial suite; 50K campaign |
| ADV-05 | Arbitrary degradation | Demote authority without a non-empty reason | Denied; no silent authority stripping | Ultra adversarial suite; 50K campaign |
| ADV-06 | Constitutional bypass | Non-quorum requester requests protected SYSTEM authority | Denied; constitutional violation | Ultra adversarial suite; 50K campaign |
| ADV-07 | Canon contradiction | Inject prohibited canon/NLI contradiction | Denied or quarantined according to boundary policy | 50K campaign |
| SIG-01 | Signature alteration | Change the Ed25519 signature | Denied; signature-invalid decision | Synapse integration suite |
| SIG-02 | Payload confusion | Use a valid signature over a different payload | Denied; signature-payload mismatch | Synapse integration suite |
| SIG-03 | Rogue signer | Sign with an untrusted key | Denied; signer-role or signature-invalid decision | Synapse integration suite |
| REC-01 | Prepared-only crash | Leave a prepared frame without commit | Excluded from committed recovery | Atomic recovery suite |
| REC-02 | Payload tampering | Change a committed event or receipt payload | Recovery fails closed | Atomic recovery suite |
| REC-03 | Chain tampering | Change predecessor hash or sequence | Recovery fails closed | Atomic recovery suite |
| REC-04 | Frame manipulation | Duplicate or truncate a committed frame | Recovery fails closed | Atomic recovery suite |
| REC-05 | Receipt binding | Change request hash independently of receipt | Recovery fails closed | Atomic recovery suite |
| SYN-01 | Risk-score overflow | Submit score below 0, above 1, NaN, or Infinity | Contract validator returns false | Direct Synapse contract smoke test |
| SYN-02 | Attestation shape confusion | Replace intervention array or hash with wrong type | Contract validator returns false | Direct Synapse contract smoke test |

## Independent evaluator additions

The evaluator should add tests for filesystem fault injection, concurrent writers, key rotation and revocation, unknown key IDs, backup/restore of signer metadata, resource exhaustion, network transport, and deployment configuration. Those areas are not represented as passed claims by this repository package.
