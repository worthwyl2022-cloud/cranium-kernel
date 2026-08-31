package com.example.cranium.canon

/**
 * The jurisdiction of a canonical record or cognitive atom.
 *
 * [protected] indicates whether mutations require an authorized mutation path
 * through the authority boundary. A protected lane cannot be mutated by model,
 * user, or unverified retrieved material without an explicit, receipt-visible
 * governed transition.
 *
 * CanonLane is a jurisdiction classifier. CanonRegistry owns records and
 * integrity. These responsibilities must not merge.
 */
enum class CanonLane(val protected: Boolean) {
    SYSTEM_AXIOM(true),
    ENTERPRISE_POLICY(true),

    FACTUAL_KNOWLEDGE(false),
    USER_PREFERENCE(false),
    WORKING_MEMORY(false),
    GENERAL(false),
    HYPOTHETICAL(false)
}
