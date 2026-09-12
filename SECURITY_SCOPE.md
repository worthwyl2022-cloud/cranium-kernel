# Security Scope — Cranium Core/Synapse Receipt Boundary

**System under review:** Cranium Kernel, Cranium Core authority boundary, and Cranium Synapse attestation contract  
**Scope commit:** See the Git commit SHA printed by `scripts/reproduce-acquisition.sh`  
**Review status:** Internal reproduction package; independent review remains outstanding.

## Security objectives

The system under review is intended to preserve the integrity of authority decisions and their receipts. The reproducible claims are that unauthorized or malformed transitions are denied, valid authorized transitions remain possible, receipt and request bindings are enforced, replay conflicts are rejected, and corrupted journal state fails closed during recovery.

## In-scope components

- Cranium Kernel authority and transaction boundary code.
- Receipt creation, canonical request binding, and receipt-chain handling.
- Ed25519 signature verification and signer-role checks exercised by the integration suite.
- Cranium Synapse attestation shape and risk-score contract validation.
- Atomic journal persistence and recovery checks.
- The 50,000-operation adversarial campaign and its machine-readable receipt.
- Cranium Ultra hardened Core and OS verification surfaces where invoked by the portfolio report.

## Out-of-scope components

- Production cloud infrastructure, managed databases, Kubernetes, mobile release signing, and external identity providers.
- Secret or private-key custody in a buyer deployment.
- Availability, denial-of-service resistance, network transport security, and multi-region durability.
- Confidentiality or encryption at rest. The integrity journal is not an encryption system.
- Legal ownership, chain of title, licensing, regulatory compliance, or security certification.
- Model quality, RAG recall, or general-purpose AI safety claims outside the explicit boundary tests.

## Trust assumptions

The verifier trusts the configured cryptographic primitives and the key material supplied by the deployment. It assumes the initial trusted snapshot and signer registry are provisioned securely. It does not assume that incoming subjects, authority versions, receipts, signatures, or journal frames are honest; those are adversarial inputs in the test model.

## Security properties evaluated

1. **Identity binding:** a missing, shadow, or substituted subject is denied.
2. **Evidence binding:** protected elevation requires the required evidence and authority context.
3. **Replay safety:** an idempotency key cannot be reused with a different canonical request hash.
4. **State freshness:** stale authority versions are denied without silently mutating current state.
5. **Constitutional control:** protected authority classes require the configured quorum or requester role.
6. **Receipt integrity:** request, event, state-version, and receipt hashes remain bound.
7. **Signature integrity:** altered payloads, altered signatures, and rogue keys are denied.
8. **Journal integrity:** modified, reordered, duplicated, or truncated committed frames fail closed.
9. **Recovery integrity:** staged or partially committed transactions do not become silently authorized state.
10. **Valid-path preservation:** well-formed authorized transitions are still granted.

## Evidence standard

A reproduction is successful only if it reports the exact commit SHA, dependency/runtime manifest, commands, test counts, denial/grant counts, deterministic Merkle root, and any deviations. Throughput is an environment-dependent benchmark and must not be treated as a security invariant.
