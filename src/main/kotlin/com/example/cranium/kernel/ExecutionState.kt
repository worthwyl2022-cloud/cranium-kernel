package com.example.cranium.kernel

/**
 * The complete, closed set of execution states for a Cranium cognitive cycle.
 *
 * Nothing outside [LegalTransitionValidator] may invent, extend, or bypass
 * these states. There is no UNKNOWN, DEFAULT, or catch-all.
 */
enum class ExecutionState {
    RECEIVED,
    ASSESSED,
    CONTEXT_CONSTRUCTED,
    ACTIVATED,
    CONTRADICTIONS_IDENTIFIED,
    DELIBERATED,
    AUTHORITY_EVALUATED,
    MODEL_INVOKED,
    CANDIDATE_PRODUCED,
    AUTHORIZATION_EVALUATED,

    // Terminal outcome states
    RELEASED,
    REJECTED,
    ESCALATED,
    QUARANTINED,
    LOCKED,

    RECEIPT_COMMITTED
}
