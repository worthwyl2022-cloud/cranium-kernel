package com.example.cranium.hash

import com.example.cranium.authority.AuthorityTransitionRequest
import java.io.ByteArrayOutputStream
import java.io.DataOutputStream
import java.math.BigDecimal
import java.math.RoundingMode

/**
 * Canonical encoder for [AuthorityTransitionRequest].
 *
 * Encoding contract (v1, normative):
 *
 *   Field                   Encoding
 *   ─────────────────────────────────────────────────────────────────────
 *   requestId               UTF-8 bytes, length-prefixed (4-byte big-endian int)
 *   subjectId               UTF-8 bytes, length-prefixed
 *   requestedAuthorityClass enum name as UTF-8, length-prefixed
 *   requestedAuthorityWeight decimal(9) as UTF-8, length-prefixed
 *   evidenceRefIds          count (4-byte int) + each id sorted lexicographically,
 *                           length-prefixed UTF-8
 *   source                  enum name as UTF-8, length-prefixed
 *   authorizationId         UTF-8 if present, empty string if null, length-prefixed
 *   expectedStateVersion    8-byte big-endian long
 *   idempotencyKey          UTF-8 bytes, length-prefixed
 *   timestamp               ISO-8601 UTC millisecond string, length-prefixed
 *
 * Any change to this table is a breaking change. Bump the contract version.
 */
class AuthorityTransitionRequestEncoder : CanonicalEncoder<AuthorityTransitionRequest> {

    override fun encode(value: AuthorityTransitionRequest): ByteArray {
        val baos = ByteArrayOutputStream()
        val out = DataOutputStream(baos)

        out.writeUtf8(value.requestId)
        out.writeUtf8(value.subjectId)
        out.writeUtf8(value.requestedAuthority.authorityClass.name)
        out.writeUtf8(
            BigDecimal(value.requestedAuthority.weight)
                .setScale(9, RoundingMode.HALF_UP)
                .toPlainString()
        )
        val sortedEvidenceIds = value.evidence.map { it.id }.sorted()
        out.writeInt(sortedEvidenceIds.size)
        sortedEvidenceIds.forEach { out.writeUtf8(it) }
        out.writeUtf8(value.source.name)
        out.writeUtf8(value.authorization?.authorizationId ?: "")
        out.writeLong(value.expectedStateVersion)
        out.writeUtf8(value.idempotencyKey)
        out.writeUtf8(value.timestamp.toString())

        out.flush()
        return baos.toByteArray()
    }

    private fun DataOutputStream.writeUtf8(s: String) {
        val bytes = s.toByteArray(Charsets.UTF_8)
        writeInt(bytes.size)
        write(bytes)
    }
}
