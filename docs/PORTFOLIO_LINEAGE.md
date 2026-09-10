# Cranium Portfolio Lineage Map

**Status:** Canonical map for the public portfolio as of 10 September 2026.

## Authority boundary

Only `cranium-kernel` / Cranium Core may evaluate and grant an authority transition, mutate protected canonical state, and issue the authoritative receipt. Models, agents, users, tools, UI surfaces, integrations, memory, retrieval, and Synapse may propose, contextualize, or provide evidence. They must not bypass the Core authority boundary.

## Repository roles

| Repository | Lifecycle | Role | Relationship |
|---|---|---|---|
| `cranium-kernel` | **Canonical active authority kernel** | Authority evaluation, protected state transition, replay/idempotency, receipt and atomic-journal proof | Source of truth for authority behavior. |
| `cranium-synapse` | **Active contract boundary / extraction in progress** | Evidence-producing assessment and attestation contract | Synapse supports evaluation; it never grants authority. The current reference implementation remains in `cranium-kernel` until extraction is complete. |
| `Substrate-Workbench-Diligence-Proof-` | **Prototype evidence surface** | Diligence and proof playground | Must reference immutable source revisions and reproducible commands. It is not an authority plane. |
| `portfolio-showcase` | **Governance scaffold** | Public-facing index and evidence presentation concept | Must not contain confidential acquisition material while public. |
| `acquisition-grade-template` | **Prototype/template** | Governance, CI, and GitHub App template | Not a production authority implementation; gateway requires authenticated callers and allowlists. |
| `Cranium-Core-OS-with-Metacognitive-tracker-` | **User-facing creative prototype** | Creative OS, metacognitive tracker, and acquisition demo | Product experience that must call the canonical kernel for protected transitions. |
| `WorthWyl-Forge` | **Media prototype** | Custom media creation | Separate product plane unless an explicit kernel adapter is added. |
| `multi-ai-integration` | **Integration prototype** | Provider-routing and AI workflow surface | May propose work; it is not an authority source. |
| `content-hub` | **Documentation showcase** | Technical content and architecture presentation | Evidence must link to canonical source repositories. |
| `Cranium-Core-`, `Substrate-only`, `Cranium-Ultra`, `Cranium-Substrate-`, `CognitiveCore-` | **Experimental / lineage candidates** | Prior or parallel cognitive/substrate implementations | Not canonical unless explicitly promoted by a dated decision record and compatibility proof. |
| `cranium-Aegis-contracts` | **Historical / superseded** | Aegis-era terminology and constitutional preamble | Preserve for provenance; do not use for new contract behavior. Redirect to `cranium-kernel`. |
| `Relics` | **Archive marker** | Recycled or archived files | No active runtime role. |
| `WorthWyl-game-changer` | **Creative prototype** | Product/demo surface with Firebase integration | Requires Firebase configuration and rules classification. |
| `Cranium-Core-hardened-final-` | **Prototype / predecessor candidate** | Governance-layer product surface with Firebase and GitHub UI | Not canonical; Firebase configuration requires review. |

## Promotion and retirement rules

A repository may be promoted to canonical status only through a dated decision record that names its source revision, supported runtime, public interfaces, compatibility tests, security review, and rollback path. A repository may be retired by adding a deprecation notice, successor link, effective revision, and archive decision. Names and descriptions alone do not establish technical lineage.

## Claim boundary

This map does not claim distributed transaction guarantees, exactly-once behavior across arbitrary external APIs, production database durability beyond the actual adapter, completed production key custody, universal contradiction detection, or general AI safety. The atomic proof is bounded to the supported local journal model and its tested failure scenarios.
