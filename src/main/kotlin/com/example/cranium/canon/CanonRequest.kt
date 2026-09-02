package com.example.cranium.canon

import com.example.cranium.kernel.AuthorityLevel

data class CanonRequest(
    val requestId: String,
    val subjectId: String,
    val lane: String,
    val operation: String,
    val requiredLevel: AuthorityLevel,
    val payloadDigest: String,
    val timestampEpochMs: Long,
    val nonce: String
)
