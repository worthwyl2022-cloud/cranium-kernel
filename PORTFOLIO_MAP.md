# Cranium Portfolio Map

## Role

`cranium-kernel` is the canonical authority-kernel boundary. It owns transition evaluation, authority-state mutation, replay protection, evidence checks, constitutional rules, and adversarial verification.

## Canonical repository relationships

- **Application and cognitive layer:** [Cranium-Core-](https://github.com/worthwyl2022-cloud/Cranium-Core-) — Android application and Core runtime integration.
- **Conceptual substrate:** [Cranium-Substrate-](https://github.com/worthwyl2022-cloud/Cranium-Substrate-) — structured contradiction and substrate reference layer.
- **Diligence workbench:** [Substrate-Workbench-Diligence-Proof-](https://github.com/worthwyl2022-cloud/Substrate-Workbench-Diligence-Proof-) — acquisition and diligence artifacts, proofs, and review navigation.

## Boundary guidance

All authority-changing behavior must cross this repository's validated transition boundary. Upstream applications and substrate analyses may propose or describe changes, but they must not directly mutate canonical authority state, bypass replay checks, or substitute unverified evidence.
