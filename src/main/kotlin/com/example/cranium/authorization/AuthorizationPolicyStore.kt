package com.example.cranium.authorization

import com.example.cranium.kernel.AuthorityLevel

interface AuthorizationPolicyStore {
    fun add(policy: AuthorizationPolicy)
    fun policiesFor(level: AuthorityLevel): List<AuthorizationPolicy>
    fun all(): List<AuthorizationPolicy>
    fun removeById(id: String): Boolean
}

class InMemoryAuthorizationPolicyStore : AuthorizationPolicyStore {
    private val lock = Any()
    private val policies = mutableListOf<AuthorizationPolicy>()

    override fun add(policy: AuthorizationPolicy) = synchronized(lock) { policies.add(policy) }
    override fun policiesFor(level: AuthorityLevel): List<AuthorizationPolicy> =
        synchronized(lock) { policies.filter { it.requiredLevel == level } }
    override fun all(): List<AuthorizationPolicy> = synchronized(lock) { policies.toList() }
    override fun removeById(id: String): Boolean = synchronized(lock) { policies.removeIf { it.id == id } }
}
