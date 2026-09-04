import React, { useState } from 'react';
import {
  FileCode,
  Copy,
  Check,
  CheckCircle2,
  XCircle,
  Database,
  Hash,
} from 'lucide-react';
import { KernelState } from '../kernel/types';
import { InMemoryReplayGuard } from '../kernel/replayGuard';

interface LedgerTabProps {
  state: KernelState;
  replayGuard: InMemoryReplayGuard;
}

export const LedgerTab: React.FC<LedgerTabProps> = ({ state, replayGuard }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const replayEntries = replayGuard.getAllEntries();
  const grantedCount = state.transitions.filter((t) => t.decision.type === 'Granted').length;
  const deniedCount = state.transitions.filter((t) => t.decision.type === 'Denied').length;

  const handleCopyJson = () => {
    const payload = JSON.stringify(
      {
        authorityVersion: state.authorityVersion,
        totalTransitions: state.transitions.length,
        transitions: state.transitions,
        replayIndex: replayEntries,
      },
      null,
      2
    );
    navigator.clipboard.writeText(payload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-cyan-400" />
            <h2 className="text-sm font-bold text-white tracking-tight">
              Cryptographic Audit Ledger & Replay Index
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Every authority transition attempt (granted or denied) produces a canonical SHA-256
            request hash and an immutable receipt signature committed to the ledger.
          </p>
        </div>

        <button
          onClick={handleCopyJson}
          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-mono flex items-center gap-1.5 border border-slate-700 transition-colors cursor-pointer self-start md:self-auto"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Copied JSON</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-400" />
              <span>Export Audit Receipts</span>
            </>
          )}
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-[11px] text-slate-400 block font-mono">Total Recorded TXs</span>
          <span className="text-2xl font-bold font-mono text-cyan-400 mt-1 block">
            {state.transitions.length}
          </span>
        </div>
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-[11px] text-slate-400 block font-mono">Granted Transitions</span>
          <span className="text-2xl font-bold font-mono text-emerald-400 mt-1 block">
            {grantedCount}
          </span>
        </div>
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-[11px] text-slate-400 block font-mono">Denied / Boundary Blocks</span>
          <span className="text-2xl font-bold font-mono text-rose-400 mt-1 block">
            {deniedCount}
          </span>
        </div>
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-[11px] text-slate-400 block font-mono">Replay Guard Cache</span>
          <span className="text-2xl font-bold font-mono text-amber-400 mt-1 block">
            {replayEntries.length} Keys
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Transition Receipts (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <FileCode className="w-3.5 h-3.5 text-cyan-400" />
            Committed Transition Transactions
          </h3>

          {state.transitions.length === 0 ? (
            <div className="p-8 text-center rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-500">
              No transactions recorded in this session yet. Dispatch a transition in the Authority
              Pipeline or run the Adversarial Suite.
            </div>
          ) : (
            <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
              {state.transitions.map((tx) => {
                const isGranted = tx.decision.type === 'Granted';
                return (
                  <div
                    key={tx.id}
                    className={`p-3.5 rounded-xl border transition-all ${
                      isGranted
                        ? 'bg-slate-900 border-slate-800 hover:border-emerald-700/60'
                        : 'bg-slate-900 border-slate-800 hover:border-rose-700/60'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        {isGranted ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                        )}
                        <span className="font-mono text-xs font-bold text-white">
                          {tx.id.slice(0, 18)}
                        </span>
                      </div>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                          isGranted
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/60'
                            : 'bg-rose-950 text-rose-400 border border-rose-800/60'
                        }`}
                      >
                        {isGranted ? 'GRANTED' : 'DENIED'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 mb-2">
                      <span className="text-slate-500">Subject:</span>{' '}
                      <span className="font-mono text-cyan-400">{tx.subjectAtomId}</span>{' '}
                      <span className="text-slate-500 font-mono">
                        ({tx.sourceAuthority.authorityClass} &rarr; {tx.requestedAuthority.authorityClass})
                      </span>
                    </p>

                    <div className="p-2 rounded bg-slate-950 border border-slate-800/80 space-y-1 text-[10px] font-mono text-slate-400">
                      <div className="truncate">
                        <span className="text-slate-500">SHA-256: </span>
                        <span className="text-slate-300">{tx.requestHash.hexDigest}</span>
                      </div>
                      <div className="truncate">
                        <span className="text-slate-500">Receipt Sig: </span>
                        <span className="text-emerald-400/90">{tx.receiptSignature}</span>
                      </div>
                      <div className="text-slate-500">
                        <span>Time: {new Date(tx.timestamp).toLocaleTimeString()}</span>
                        <span className="ml-4">Epoch Version: v{tx.evaluatedAuthorityVersion}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Replay Guard Cache (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Hash className="w-3.5 h-3.5 text-amber-400" />
            Replay Guard Idempotency Cache
          </h3>

          {replayEntries.length === 0 ? (
            <div className="p-8 text-center rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-500">
              Replay cache is empty.
            </div>
          ) : (
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
              {replayEntries.map((re, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1 text-xs font-mono"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-cyan-400 font-bold truncate max-w-[200px]">
                      {re.idempotencyKey}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {new Date(re.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    <span className="text-slate-500">Bound Digest: </span>
                    {re.canonicalRequestHashHex.slice(0, 24)}...
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
