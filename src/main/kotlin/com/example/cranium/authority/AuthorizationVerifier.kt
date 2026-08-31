package com.example.cranium.authority

import com.example.cranium.cognition.CognitiveAtom
import com.example.cranium.hash.RequestHash

/**
 * Verifies the parts of authorization that are already specified tightly
 * enough to execute for real in v1.
 *
 * This verifier does not perform cryptographic signature verification yet.
 * That capability is explicitly absent until the issuer/key model is frozen.
 * It still performs real request-binding, temporal, and scope checks.
 */
interface AuthorizationVerifier {
    fun verify(
        request: AuthorityTransitionRequest,
        requestHash: RequestHash,
        subject: CognitiveAtom
    ): AuthorizationVerificationResult
}
