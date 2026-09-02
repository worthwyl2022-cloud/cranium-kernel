package com.example.cranium.authority

import com.example.cranium.kernel.DomainEvent
import java.time.Instant

/**
 * Domain event emitted when an authority transition is evaluated and ready
 * to enter the commit path.
 *
 * Carries the fields needed by kernel invariants to make their determination
 * without the invariants needing to re-read the original request.
 *
 * [authorizationScope] is nullable because not all transitions carry explicit
 * scope. Invariants that need scope must null-check and treat null as
 * no-scope-granted — fail-closed, not fail-open.
 */
data class AuthorityTransitionEvaluated(
    override val executionId: String,
    override val timestamp: Instant,
    val transitionId: String,
    val requestId: String,
    val requestHash: String,
    val committedStateVersion: Long,
    val subjectAtomId: String,
    val authorizationScope: AuthorizationScope?
) : DomainEvent
