package com.example.cranium.authorization

import com.example.cranium.authority.AuthorityLevel

class AuthorizationEnforcer(private val store: AuthorizationPolicyStore) {

    fun enforce(
        level: AuthorityLevel,
        requestedScope: AuthorizationScope,
        lane: String,
        operation: String
    ): AuthorizationResult {
        val matching = store.policiesFor(level)
        if (matching.isEmpty()) return AuthorizationResult.Denied(PolicyViolation.NO_MATCHING_POLICY)

        val scoped = matching.filter { it.permittedScope >= requestedScope }
        if (scoped.isEmpty()) return AuthorizationResult.Denied(PolicyViolation.SCOPE_EXCEEDS_POLICY)

        val laned = scoped.filter { it.permittedLanes.isEmpty() || lane in it.permittedLanes }
        if (laned.isEmpty()) return AuthorizationResult.Denied(PolicyViolation.LANE_NOT_PERMITTED)

        val opAllowed = laned.any { it.permittedOperations.isEmpty() || operation in it.permittedOperations }
        if (!opAllowed) return AuthorizationResult.Denied(PolicyViolation.OPERATION_NOT_PERMITTED)

        return AuthorizationResult.Permitted(laned.first())
    }
}

sealed class AuthorizationResult {
    data class Permitted(val policy: AuthorizationPolicy) : AuthorizationResult()
    data class Denied(val reason: PolicyViolation) : AuthorizationResult()
}
