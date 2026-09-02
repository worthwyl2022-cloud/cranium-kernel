package com.example.cranium.receipt

import java.security.MessageDigest

class InMemoryReceiptChain : ReceiptChain {

    private val receipts = mutableListOf<AuthorityReceipt>()

    override fun append(receipt: AuthorityReceipt) {
        val expected = if (receipts.isEmpty()) AuthorityReceipt.GENESIS_HASH 
                       else hash(receipts.last())
        require(receipt.previousReceiptHash == expected) {
            "Receipt chain link broken: expected previousReceiptHash='$expected' " +
                "but got '${receipt.previousReceiptHash}'"
        }
        receipts.add(receipt)
    }

    override fun latest(): AuthorityReceipt? = receipts.lastOrNull()
    override fun all(): List<AuthorityReceipt> = receipts.toList()
    override fun headHash(): String =
        if (receipts.isEmpty()) AuthorityReceipt.GENESIS_HASH else hash(receipts.last())

    private fun hash(receipt: AuthorityReceipt): String {
        val canonical = "${receipt.receiptId}|${receipt.transitionId}" +
            "|${receipt.evaluatedAuthorityVersion}|${receipt.committedAuthorityVersion}" +
            "|${receipt.requestHash.value}|${receipt.previousReceiptHash}"
        return MessageDigest.getInstance("SHA-256")
            .digest(canonical.toByteArray(Charsets.UTF_8))
            .joinToString("") { "%02x".format(it) }
    }
}
