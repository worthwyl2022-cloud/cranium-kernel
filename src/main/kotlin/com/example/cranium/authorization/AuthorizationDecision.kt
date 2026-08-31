package com.example.cranium.authorization

/** v1 stub — full contract defined in the authorization package. */
data class AuthorizationDecision(
    val allowed: Boolean,
    val reason: String
)
