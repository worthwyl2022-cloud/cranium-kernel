package com.example.cranium.authority

/**
 * The bounded permission scope of a [TransitionAuthorization].
 *
 * Even if a signature verifies correctly, a transition outside the scope of
 * the authorization that signed it must be rejected.
 */
data class AuthorizationScope(
    val allowedLanes: Set<String>,
    val allowedOperations: Set<String>,
    val maximumAuthorityClass: AuthorityClass
) {
    fun allows(requestedClass: AuthorityClass): Boolean =
        requestedClass.rank <= maximumAuthorityClass.rank
}
