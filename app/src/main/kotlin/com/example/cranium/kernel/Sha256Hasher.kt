package com.example.cranium.kernel

import java.security.MessageDigest

object Sha256Hasher {

    fun encodeCanonical(req: AuthorityTransitionRequest): String {
        val sortedEvidence = req.evidence.sortedBy { it.id }.joinToString(separator = ",", prefix = "[", postfix = "]") { e ->
            """{"description":"${e.description.trim()}","id":"${e.id.trim()}","sha256Digest":"${e.sha256Digest.lowercase().trim()}","uri":"${e.uri.trim()}","verified":${e.verified}}"""
        }

        return """{"evidence":$sortedEvidence,"idempotencyKey":"${req.idempotencyKey.trim()}","justification":"${req.justification.trim()}","requestedAuthority":{"authorityClass":"${req.requestedAuthority.authorityClass}","weight":${String.format(java.util.Locale.US, "%.4f", req.requestedAuthority.weight)}},"requesterId":"${req.requesterId.trim()}","requestId":"${req.requestId.trim()}","subjectId":"${req.subjectId.trim()}","targetAuthorityVersion":${req.targetAuthorityVersion},"timestamp":${req.timestamp}}"""
    }

    fun hash(req: AuthorityTransitionRequest): RequestHash {
        val canonical = encodeCanonical(req)
        val digest = MessageDigest.getInstance("SHA-256")
        val hashBytes = digest.digest(canonical.toByteArray(Charsets.UTF_8))
        val hex = hashBytes.joinToString("") { "%02x".format(it) }
        return RequestHash(
            algorithm = "SHA-256",
            hexDigest = hex,
            canonicalString = canonical
        )
    }
}
