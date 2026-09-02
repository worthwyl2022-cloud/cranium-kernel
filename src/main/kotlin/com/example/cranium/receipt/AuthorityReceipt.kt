package com.example.cranium.receipt

import com.example.cranium.canon.CanonHash
import com.example.cranium.kernel.AuthorityLevel

data class AuthorityReceipt(
    val id: String,
    val idempotencyKey: String,
    val canonHash: CanonHash,
    val authorityLevel: AuthorityLevel,
    val subjectId: String,
    val lane: String,
    val operation: String,
    val stateVersionBefore: Long,
    val stateVersionAfter: Long,
    val timestampEpochMs: Long
)
