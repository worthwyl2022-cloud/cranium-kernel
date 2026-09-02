package com.example.cranium.authorization

enum class PolicyViolation {
    NO_MATCHING_POLICY,
    SOURCE_NOT_PERMITTED,
    SCOPE_EXCEEDS_POLICY,
    LANE_NOT_PERMITTED,
    OPERATION_NOT_PERMITTED
}
