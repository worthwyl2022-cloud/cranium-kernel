# Cranium Governance Boundary

The governance boundary is an integration substrate around the canonical Cranium kernel. It provides a typed adapter contract for admission context, correlation, evaluation, and commit orchestration.

It **does not** issue authority, create a second canon, or replace the kernel evaluator. Every transition is evaluated by `DefaultAuthorityTransitionEngine` and committed by `KernelStateReducer`. Replays return the original transition, and rejected boundary assessments cannot be committed through `GovernedKernelPort`.

## Operational contract

1. Integrations provide an adapter identity, requester, purpose, and correlation ID.
2. The canonical kernel evaluates the complete `AuthorityTransitionRequest`.
3. The integration may display or persist the resulting boundary assessment.
4. Only a boundary-passing evaluation may be committed through the canonical reducer.
5. Production adapters must add authenticated transport, secret-manager integration, protected branch settings, and durable receipt storage before claiming production authority.

This document describes an implementation boundary, not external validation or a certification.
