package com.example.cranium.authority

/**
 * The jurisdiction hierarchy for cognitive authority.
 *
 * [rank] establishes ordering. A higher rank cannot be granted by a lower
 * jurisdiction without an explicit, authorized transition through the boundary.
 *
 * Weight within a class does not promote across classes.
 */
enum class AuthorityClass(val rank: Int) {
    HYPOTHETICAL(0),
    WORKING(1),
    USER(2),
    FACTUAL(3),
    ENTERPRISE(4),
    SYSTEM(5)
}
