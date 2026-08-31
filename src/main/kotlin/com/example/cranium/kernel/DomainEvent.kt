package com.example.cranium.kernel

import java.time.Instant

/**
 * Base type for all governed domain events.
 *
 * Events are immutable facts. They carry no applyTo(state) or mutate(registry)
 * methods. State reduction is exclusively the kernel's responsibility.
 * An event describes; it does not execute.
 */
sealed interface DomainEvent {
    val executionId: String
    val timestamp: Instant
}

data class IngestStimulus(
    override val executionId: String,
    override val timestamp: Instant,
    val stimulusId: String,
    val stimulusHash: String
) : DomainEvent

data class StimulusAccepted(
    override val executionId: String,
    override val timestamp: Instant,
    val stimulusId: String
) : DomainEvent

data class ImmuneAssessmentCompleted(
    override val executionId: String,
    override val timestamp: Instant,
    val assessmentId: String,
    val threatDetected: Boolean
) : DomainEvent

data class ExecutionQuarantined(
    override val executionId: String,
    override val timestamp: Instant,
    val reason: String
) : DomainEvent

data class ExecutionLocked(
    override val executionId: String,
    override val timestamp: Instant,
    val reason: String
) : DomainEvent

data class ContextConstructed(
    override val executionId: String,
    override val timestamp: Instant,
    val contextId: String
) : DomainEvent

data class AtomsActivated(
    override val executionId: String,
    override val timestamp: Instant,
    val atomIds: List<String>
) : DomainEvent

data class ContradictionDetected(
    override val executionId: String,
    override val timestamp: Instant,
    val contradictionId: String
) : DomainEvent

/**
 * Records the outcome of an authority boundary evaluation.
 *
 * A GRANTED decision does not mean state was committed. The kernel invariant
 * validator and atomic commit path must both succeed before authorityVersion
 * is incremented.
 */
data class AuthorityTransitionEvaluated(
    override val executionId: String,
    override val timestamp: Instant,
    val transitionId: String,
    val requestId: String,
    val requestHash: String,
    val decision: String,
    val committedStateVersion: Long
) : DomainEvent

data class ModelInvoked(
    override val executionId: String,
    override val timestamp: Instant,
    val requestHash: String
) : DomainEvent

data class CandidateProduced(
    override val executionId: String,
    override val timestamp: Instant,
    val candidateHash: String
) : DomainEvent

data class OutputAuthorizationEvaluated(
    override val executionId: String,
    override val timestamp: Instant,
    val decision: String
) : DomainEvent

data class OutputReleased(
    override val executionId: String,
    override val timestamp: Instant,
    val candidateHash: String
) : DomainEvent

data class OutputRejected(
    override val executionId: String,
    override val timestamp: Instant,
    val reason: String
) : DomainEvent

data class ExecutionEscalated(
    override val executionId: String,
    override val timestamp: Instant,
    val reason: String
) : DomainEvent

data class ReceiptCommitted(
    override val executionId: String,
    override val timestamp: Instant,
    val receiptId: String,
    val receiptHash: String
) : DomainEvent
