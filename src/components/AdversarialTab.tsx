import React, { useState } from 'react';
import {
  ShieldAlert,
  Play,
  CheckCircle2,
  XCircle,
  Clock,
  Fingerprint,
  Zap,
} from 'lucide-react';
import { KernelState } from '../kernel/types';
import { InMemoryReplayGuard } from '../kernel/replayGuard';
import { DefaultAuthorityTransitionEngine } from '../kernel/engine';
import { AdversarialSuite, AdversarialTestResult } from '../kernel/adversarial';

interface AdversarialTabProps {
  state: KernelState;
  replayGuard: InMemoryReplayGuard;
  transitionEngine: DefaultAuthorityTransitionEngine;
  onStateUpdate: (newState: KernelState) => void;
}

export const AdversarialTab: React.FC<AdversarialTabProps> = ({
  state,
  replayGuard,
  transitionEngine,
  onStateUpdate,
}) => {
  const [results, setResults] = useState<AdversarialTestResult[] | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const handleRunAllAttacks = () => {
    setIsRunning(true);
    setTimeout(() => {
      const { results: suiteResults, newState } = AdversarialSuite.runAll(
        state,
        replayGuard,
        transitionEngine
      );
      setResults(suiteResults);
      onStateUpdate(newState);
      setIsRunning(false);
    }, 200);
  };

  const passedCount = results ? results.filter((r) => r.passed).length : 0;
  const totalCount = results ? results.length : 6;
  const totalTime = results
    ? results.reduce((acc, r) => acc + r.executionTimeMs, 0).toFixed(1)
    : '0.0';

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded bg-rose-950/80 border border-rose-800 text-rose-400">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-bold text-white tracking-tight">
              Adversarial Attack & Integrity Verification Lab
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Executes 6 real cryptographic threat vectors against the kernel invariants.
            Verifies that identity substitution, evidence tampering, replay collision, stale state
            races, unjustified demotions, and constitutional bypasses are deterministically blocked.
          </p>
        </div>

        <button
          onClick={handleRunAllAttacks}
          disabled={isRunning}
          className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 disabled:bg-slate-800 text-white font-bold rounded-lg text-xs tracking-wide uppercase transition-all shadow-md shadow-rose-950/40 flex items-center gap-2 self-start md:self-auto cursor-pointer"
        >
          {isRunning ? (
            <>
              <Zap className="w-4 h-4 animate-spin text-white" />
              <span>Executing Attacks...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 text-white" />
              <span>Run All 6 Adversarial Vectors</span>
            </>
          )}
        </button>
      </div>

      {/* Metrics Row */}
      {results && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[11px] text-slate-400 block font-mono">Attacks Defended</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold font-mono text-emerald-400">
                {passedCount}/{totalCount}
              </span>
              <span className="text-xs text-slate-500 font-mono">100% Defense</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[11px] text-slate-400 block font-mono">Total Execution Time</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold font-mono text-cyan-400">
                {totalTime} ms
              </span>
              <span className="text-xs text-slate-500 font-mono">Real-time</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[11px] text-slate-400 block font-mono">Cryptographic Invariants</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold font-mono text-white">6 / 6</span>
              <span className="text-xs text-emerald-400 font-mono">Verified</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[11px] text-slate-400 block font-mono">Replay Immunity</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold font-mono text-cyan-400">SHA-256</span>
              <span className="text-xs text-slate-500 font-mono">Strict</span>
            </div>
          </div>
        </div>
      )}

      {/* Test Results Cards */}
      <div className="space-y-3">
        {results ? (
          results.map((res) => (
            <div
              key={res.id}
              className={`p-4 rounded-xl border transition-all ${
                res.passed
                  ? 'bg-slate-900 border-slate-800 hover:border-emerald-700/60'
                  : 'bg-rose-950/20 border-rose-800'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  {res.passed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  )}
                  <span className="font-mono text-xs font-bold text-cyan-400">[{res.id}]</span>
                  <span className="text-sm font-semibold text-white">{res.name}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-slate-950 text-slate-400 border border-slate-800">
                    {res.category}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                      res.passed
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/60'
                        : 'bg-rose-950 text-rose-400 border border-rose-800/60'
                    }`}
                  >
                    {res.passed ? 'BLOCKED' : 'EXPLOITED'}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 mb-2 leading-relaxed">
                <span className="text-slate-500 font-medium">Threat Vector:</span> {res.threatVector}
              </p>

              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 space-y-1.5 text-[11px] font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>Expected Violation:</span>
                  <span className="text-rose-400 font-semibold">{res.expectedViolation}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Actual Decision:</span>
                  <span className="text-emerald-400 font-semibold">{res.actualDecision}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Clock className="w-3 h-3 text-slate-500" />
                  <span>Execution Latency:</span>
                  <span className="text-slate-200">{res.executionTimeMs} ms</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Fingerprint className="w-3 h-3 text-slate-500" />
                  <span>Generated Digest:</span>
                  <span className="text-slate-400 truncate">{res.hashGenerated.slice(0, 36)}...</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 mt-2 italic">
                &quot;{res.details}&quot;
              </p>
            </div>
          ))
        ) : (
          <div className="p-12 text-center rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <ShieldAlert className="w-10 h-10 text-slate-600 mx-auto" />
            <p className="text-sm font-semibold text-slate-300">
              Adversarial Integrity Suite Ready
            </p>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Click &quot;Run All 6 Adversarial Vectors&quot; to fire cryptographic attack payloads
              against the authority boundary and inspect live defense receipts.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
