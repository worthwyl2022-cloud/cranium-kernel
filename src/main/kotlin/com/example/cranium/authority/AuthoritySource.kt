package com.example.cranium.authority

/**
 * Describes who or what supplied an authority transition request.
 *
 * AuthoritySource is NOT authorization. It describes origin.
 * [TransitionAuthorization] proves whether that origin possesses the required
 * capability. Those are different things and must remain different.
 */
enum class AuthoritySource {
    SYSTEM,
    ENTERPRISE_POLICY,
    HUMAN_REVIEW,
    USER,
    MODEL,
    RETRIEVED_INFORMATION,
    INTERNAL_ENGINE
}
