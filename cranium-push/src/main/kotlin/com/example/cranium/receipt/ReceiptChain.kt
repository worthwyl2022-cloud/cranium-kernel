package com.example.cranium.receipt

interface ReceiptChain {
    fun append(receipt: AuthorityReceipt)
    fun latest(): AuthorityReceipt?
    fun all(): List<AuthorityReceipt>
    fun headHash(): String
}
