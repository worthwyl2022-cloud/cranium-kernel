package com.example.cranium.authorization

import com.example.cranium.kernel.AuthorityLevel

data class AuthorizationPolicy(
    val id: String,
    val name: String,
    val requiredLevel: AuthorityLevel,
    val permittedScope: AuthorizationScope,
    val permittedLanes: Set<String> = emptySet(),
    val permittedOperations: Set<String> = emptySet()
)
