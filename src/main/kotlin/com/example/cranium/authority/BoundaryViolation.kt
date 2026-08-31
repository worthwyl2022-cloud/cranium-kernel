package com.example.cranium.authority

/**
 * Machine-readable boundary violation codes.
 *
 * These are the authoritative signal for the benchmark and the receipt.
 * A request that produces any violation fails boundary validation and is
 * not forwarded to authority-rule evaluation.
 */
enum class BoundaryViolation {
    INVALID_REQUEST,
    INVALID_AUTHENTICITY,
    SUBJECT_NOT_FOUND,
    PROTECTED_LANE,
    UNAUTHORIZED_MUTATION_PATH,
    AUTHORITY_JUMP,
    INSUFFICIENT_EVIDENCE,
    UNTRUSTED_PROVENANCE,
    REPLAY_DETECTED,
    STALE_STATE,
    SUBJECT_ISOLATED,
    EXPIRED_AUTHORIZATION
}
