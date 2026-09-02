package com.example.cranium.receipt

interface ReceiptChain {
    fun append(receipt: AuthorityReceipt)
    fun head(): AuthorityReceipt?
    fun all(): List<AuthorityReceipt>
    fun findById(id: String): AuthorityReceipt?
    fun findByIdempotencyKey(key: String): AuthorityReceipt?
    val size: Int
}
