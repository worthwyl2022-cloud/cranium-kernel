package com.example.cranium.cognition

/**
 * The lifecycle status of a cognitive atom within the kernel.
 *
 * Status tracks what the kernel is DOING with the atom, not what the atom
 * knows. Epistemic certainty is [CognitiveAtom.confidence]. Jurisdictional
 * rank is [com.example.cranium.authority.AuthorityLevel]. Status is
 * operational position.
 *
 * The kernel may isolate cognition without destroying it. An ISOLATED atom
 * does not mutate canon and cannot participate in authority transitions, but
 * its provenance, hash, and receipt chain remain intact and examinable.
 * That is a deliberate design property, not a compromise.
 */
enum class CognitiveStatus {
    /** Atom exists and is eligible to participate in the cognitive cycle. */
    ACTIVE,

    /**
     * Atom's proposition is disputed by one or more active contradictions.
     * It participates in deliberation but may not acquire authority until
     * contradiction resolution completes.
     */
    CONTESTED,

    /**
     * Atom is quarantined from the active cognitive cycle. Its contents
     * are preserved, receipt-linked, and auditable. It cannot influence
     * deliberation or acquire authority transitions. Isolation is
     * non-destructive and reversible through a governed reinstatement path.
     */
    ISOLATED,

    /**
     * Atom has completed reinstatement review. A governed transition
     * back to ACTIVE may proceed if all invariants are satisfied.
     */
    REINSTATEMENT_REVIEW,

    /**
     * Atom has been superseded or explicitly retired through a governed
     * transition. It is preserved in the receipt chain but permanently
     * excluded from future cognitive cycles.
     */
    RETIRED
}
