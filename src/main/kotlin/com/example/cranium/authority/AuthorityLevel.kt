package com.example.cranium.authority

/**
 * Full authority designation: jurisdiction + strength.
 *
 * Neither field alone is sufficient. Both are required and neither may
 * substitute for the other.
 */
data class AuthorityLevel(
    val authorityClass: AuthorityClass,
    val weight: Double
) {
    init {
        require(weight in 0.0..1.0) { "Authority weight must be in [0.0, 1.0], got $weight" }
    }

    fun dominates(other: AuthorityLevel): Boolean =
        authorityClass.rank > other.authorityClass.rank ||
            (authorityClass == other.authorityClass && weight > other.weight)

    companion object {
        val NONE = AuthorityLevel(AuthorityClass.HYPOTHETICAL, 0.0)
    }
}
