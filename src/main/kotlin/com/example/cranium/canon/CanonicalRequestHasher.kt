package com.example.cranium.canon

import java.security.MessageDigest

object CanonicalRequestHasher {

    fun hash(request: CanonRequest): CanonHash {
        val canonical = buildString {
            append(request.requestId).append('|')
            append(request.subjectId).append('|')
            append(request.lane).append('|')
            append(request.operation).append('|')
            append(request.requiredLevel.name).append('|')
            append(request.payloadDigest).append('|')
            append(request.timestampEpochMs).append('|')
            append(request.nonce)
        }
        val digest = MessageDigest.getInstance("SHA-256")
            .digest(canonical.toByteArray(Charsets.UTF_8))
        return CanonHash(digest.joinToString("") { "%02x".format(it) })
    }
}
