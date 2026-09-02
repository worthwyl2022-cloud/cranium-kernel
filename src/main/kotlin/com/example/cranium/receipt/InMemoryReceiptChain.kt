package com.example.cranium.receipt

class InMemoryReceiptChain : ReceiptChain {
    private val lock = Any()
    private val receipts = mutableListOf<AuthorityReceipt>()

    override fun append(receipt: AuthorityReceipt) = synchronized(lock) { receipts.add(receipt) }
    override fun head(): AuthorityReceipt? = synchronized(lock) { receipts.lastOrNull() }
    override fun all(): List<AuthorityReceipt> = synchronized(lock) { receipts.toList() }
    override fun findById(id: String): AuthorityReceipt? =
        synchronized(lock) { receipts.firstOrNull { it.id == id } }
    override fun findByIdempotencyKey(key: String): AuthorityReceipt? =
        synchronized(lock) { receipts.firstOrNull { it.idempotencyKey == key } }
    override val size: Int get() = synchronized(lock) { receipts.size }
}
