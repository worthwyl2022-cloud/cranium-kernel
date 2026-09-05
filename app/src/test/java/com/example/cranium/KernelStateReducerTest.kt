package com.example.cranium

import com.example.cranium.kernel.AuthorityClass
import com.example.cranium.kernel.AuthorityLevel
import com.example.cranium.kernel.AuthorityTransitionRequest
import com.example.cranium.kernel.DefaultAuthorityTransitionEngine
import com.example.cranium.kernel.InMemoryReplayGuard
import com.example.cranium.kernel.KernelStateReducer
import com.example.cranium.kernel.ReplayStatus
import com.example.cranium.kernel.TransitionDecision
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

class KernelStateReducerTest {
    @Test
    fun deniedMissingSubjectDoesNotIncreaseAuthorityVersion() {
        val guard = InMemoryReplayGuard()
        val state = KernelStateReducer.createInitialState()
        val request = AuthorityTransitionRequest(
            "missing-request", "missing-key", "not-committed", AuthorityLevel(AuthorityClass.FACTUAL, 0.8),
            emptyList(), "test request", "USER_PRIMARY", System.currentTimeMillis(), state.authorityVersion
        )
        val result = DefaultAuthorityTransitionEngine(guard).evaluate(request, state)
        val reduced = KernelStateReducer.reduce(state, result.transition, guard, request, result.replayStatus)
        assertTrue(result.transition.decision is TransitionDecision.Denied)
        assertEquals(state.authorityVersion, reduced.authorityVersion)
        assertEquals(1, reduced.transitions.size)
    }

    @Test
    fun newValidIntraClassRequestIsRecordedAndRaisesVersion() {
        val guard = InMemoryReplayGuard()
        val state = KernelStateReducer.createInitialState()
        val subject = state.atomsById.getValue("atom-user-003")
        val request = AuthorityTransitionRequest(
            "valid-request", "valid-key", subject.id, AuthorityLevel(AuthorityClass.USER, 0.9),
            emptyList(), "increase user authority", "USER_PRIMARY", System.currentTimeMillis(), state.authorityVersion
        )
        val engine = DefaultAuthorityTransitionEngine(guard)
        val result = engine.evaluate(request, state)
        val reduced = KernelStateReducer.reduce(state, result.transition, guard, request, result.replayStatus)
        assertTrue(result.transition.decision is TransitionDecision.Granted)
        assertEquals(state.authorityVersion + 1, reduced.authorityVersion)
        assertEquals(1, guard.getAllEntries().size)
    }

    @Test
    fun conflictingReuseIsDenied() {
        val guard = InMemoryReplayGuard()
        val state = KernelStateReducer.createInitialState()
        val engine = DefaultAuthorityTransitionEngine(guard)
        val base = AuthorityTransitionRequest(
            "replay-request", "replay-key", "atom-user-003", AuthorityLevel(AuthorityClass.USER, 0.9),
            emptyList(), "valid adjustment", "USER_PRIMARY", System.currentTimeMillis(), state.authorityVersion
        )
        val first = engine.evaluate(base, state)
        val stateAfter = KernelStateReducer.reduce(state, first.transition, guard, base, first.replayStatus)
        val poison = base.copy(requestedAuthority = AuthorityLevel(AuthorityClass.SYSTEM, 1.0), targetAuthorityVersion = stateAfter.authorityVersion)
        val second = engine.evaluate(poison, stateAfter)
        assertTrue(second.replayStatus is ReplayStatus.ConflictingReuse)
        assertTrue(second.transition.decision is TransitionDecision.Denied)
    }
}
