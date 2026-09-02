package com.example.cranium.immunity

/**
 * Classification of threat origin — what kind of violation triggered the assessment.
 */
enum class ThreatClass {
    REPLAY_ATTACK,
    BOUNDARY_VIOLATION,
    UNAUTHORIZED_ESCALATION,
    INVALID_CANON_HASH,
    CONSTITUTIONAL_BREACH,
    UNKNOWN
}
