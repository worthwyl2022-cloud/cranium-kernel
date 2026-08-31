package com.example.cranium.authority

/**
 * The closed set of possible authority transition outcomes.
 *
 * There is no Unknown, Default, Maybe, or Probably.
 * Every call site must handle all four cases exhaustively.
 *
 * Only [Granted] may lead to an authority-version increment, and only after
 * kernel invariant validation and atomic commit both succeed.
 * A Granted decision alone is not sufficient to mutate state.
 */
sealed interface TransitionDecision {

    data class Granted(val authority: AuthorityLevel) : TransitionDecision

    data class Denied(val reason: String) : TransitionDecision

    data class Escalated(val reason: String) : TransitionDecision

    data class Isolated(val reason: String) : TransitionDecision
}
