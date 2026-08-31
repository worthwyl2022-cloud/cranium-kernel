package com.example.cranium.kernel

/**
 * The single source of truth for legal execution state transitions.
 *
 * Any transition not explicitly listed here is illegal. The kernel must
 * consult this validator before applying any state-changing event.
 *
 * Explicitly prohibited (documented for auditors):
 *   RECEIVED             -> RELEASED
 *   CANDIDATE_PRODUCED   -> RELEASED
 *   QUARANTINED          -> MODEL_INVOKED
 *   LOCKED               -> CONTEXT_CONSTRUCTED
 *   RECEIPT_COMMITTED    -> any state
 */
interface LegalTransitionValidator {
    fun isLegal(from: ExecutionState, to: ExecutionState): Boolean
    fun legalSuccessors(from: ExecutionState): Set<ExecutionState>
}

class DefaultLegalTransitionValidator : LegalTransitionValidator {

    private val table: Map<ExecutionState, Set<ExecutionState>> = mapOf(
        ExecutionState.RECEIVED to setOf(ExecutionState.ASSESSED),
        ExecutionState.ASSESSED to setOf(
            ExecutionState.CONTEXT_CONSTRUCTED,
            ExecutionState.QUARANTINED,
            ExecutionState.LOCKED
        ),
        ExecutionState.CONTEXT_CONSTRUCTED to setOf(ExecutionState.ACTIVATED),
        ExecutionState.ACTIVATED to setOf(ExecutionState.CONTRADICTIONS_IDENTIFIED),
        ExecutionState.CONTRADICTIONS_IDENTIFIED to setOf(ExecutionState.DELIBERATED),
        ExecutionState.DELIBERATED to setOf(ExecutionState.AUTHORITY_EVALUATED),
        ExecutionState.AUTHORITY_EVALUATED to setOf(ExecutionState.MODEL_INVOKED),
        ExecutionState.MODEL_INVOKED to setOf(ExecutionState.CANDIDATE_PRODUCED),
        ExecutionState.CANDIDATE_PRODUCED to setOf(ExecutionState.AUTHORIZATION_EVALUATED),
        ExecutionState.AUTHORIZATION_EVALUATED to setOf(
            ExecutionState.RELEASED,
            ExecutionState.REJECTED,
            ExecutionState.ESCALATED
        ),
        ExecutionState.RELEASED to setOf(ExecutionState.RECEIPT_COMMITTED),
        ExecutionState.REJECTED to setOf(ExecutionState.RECEIPT_COMMITTED),
        ExecutionState.ESCALATED to setOf(ExecutionState.RECEIPT_COMMITTED),
        ExecutionState.QUARANTINED to setOf(ExecutionState.RECEIPT_COMMITTED),
        ExecutionState.LOCKED to setOf(ExecutionState.RECEIPT_COMMITTED),
        ExecutionState.RECEIPT_COMMITTED to emptySet()
    )

    override fun isLegal(from: ExecutionState, to: ExecutionState): Boolean =
        table[from]?.contains(to) == true

    override fun legalSuccessors(from: ExecutionState): Set<ExecutionState> =
        table[from] ?: emptySet()
}
