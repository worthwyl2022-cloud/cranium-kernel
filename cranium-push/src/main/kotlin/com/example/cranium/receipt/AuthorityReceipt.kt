package com.example.cranium.receipt

import com.example.cranium.authority.BoundaryAssessment
import com.example.cranium.authority.TransitionDecision
import com.example.cranium.hash.RequestHash
import com.example.cranium.kernel.InvariantResult
import java.time.Instant

data class AuthorityReceipt(
    val receiptId: String,
    val executionId: String,
    val transitionId: String,
    val requestHash: RequestHash,
    val evaluatedAuthorityVersion: Long,
    val committedAuthorityVersion: Long,
    val decision: TransitionDecision,
    val boundaryAssessment: BoundaryAssessment,
    val invariantResults: List<InvariantResult>,
    val constitutionHash: String,
    val previousReceiptHash: String,
    val timestamp: Instant
) {
    init {
        require(receiptId.isNotBlank())
        require(executionId.isNotBlank())
        require(transitionId.isNotBlank())
        require(constitutionHash.isNotBlank())
        require(previousReceiptHash.isNotBlank())
        require(committedAuthorityVersion == evaluatedAuthorityVersion + 1) {
            "committedAuthorityVersion must be evaluatedAuthorityVersion + 1"
        }
        require(decision is TransitionDecision.Granted) {
            "Only Granted transitions produce receipts"
        }
        require(invariantResults.all { it is InvariantResult.Passed }) {
            "All invariants must pass before a receipt is issued"
        }
    }

    companion object {
        const val GENESIS_HASH = "GENESIS"
        const val CONSTITUTION_HASH_STUB = "NONE-v1"
    }
}
