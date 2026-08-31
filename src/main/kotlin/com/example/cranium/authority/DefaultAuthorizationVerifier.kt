package com.example.cranium.authority

import com.example.cranium.cognition.CognitiveAtom
import com.example.cranium.hash.RequestHash

class DefaultAuthorizationVerifier : AuthorizationVerifier {

    override fun verify(
        request: AuthorityTransitionRequest,
        requestHash: RequestHash,
        subject: CognitiveAtom
    ): AuthorizationVerificationResult {
        val authorization = request.authorization
            ?: return AuthorizationVerificationResult.Rejected(
                BoundaryViolation.INVALID_AUTHENTICITY,
                "Missing authorization"
            )

        if (authorization.boundRequestHash != requestHash) {
            return AuthorizationVerificationResult.Rejected(
                BoundaryViolation.INVALID_AUTHENTICITY,
                "Authorization is not bound to the supplied request hash"
            )
        }

        if (request.timestamp.isBefore(authorization.issuedAt)) {
            return AuthorizationVerificationResult.Rejected(
                BoundaryViolation.INVALID_AUTHENTICITY,
                "Request predates authorization issuance"
            )
        }

        if (authorization.expiresAt?.let { request.timestamp.isAfter(it) } == true) {
            return AuthorizationVerificationResult.Rejected(
                BoundaryViolation.EXPIRED_AUTHORIZATION,
                "Authorization has expired"
            )
        }

        if (authorization.authority != request.source) {
            return AuthorizationVerificationResult.Rejected(
                BoundaryViolation.INVALID_AUTHENTICITY,
                "Authorization source does not match request source"
            )
        }

        if (!authorization.scope.allows(request.requestedAuthority.authorityClass)) {
            return AuthorizationVerificationResult.Rejected(
                BoundaryViolation.UNAUTHORIZED_MUTATION_PATH,
                "Authorization scope does not permit requested authority class"
            )
        }

        if (subject.lane.name !in authorization.scope.allowedLanes) {
            return AuthorizationVerificationResult.Rejected(
                BoundaryViolation.PROTECTED_LANE,
                "Authorization scope does not permit subject lane ${subject.lane.name}"
            )
        }

        if ("AUTHORITY_TRANSITION" !in authorization.scope.allowedOperations) {
            return AuthorizationVerificationResult.Rejected(
                BoundaryViolation.UNAUTHORIZED_MUTATION_PATH,
                "Authorization scope does not permit authority transitions"
            )
        }

        return AuthorizationVerificationResult.Verified
    }
}
