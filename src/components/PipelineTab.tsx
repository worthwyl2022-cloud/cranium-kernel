import React, { useState } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  Hash,
  FileCheck,
  CheckCircle,
  XCircle,
  Layers,
} from 'lucide-react';
import {
  KernelState,
  AuthorityClass,
  AuthorityLevel,
  AuthorityTransitionRequest,
  AuthorityTransition,
  EvidenceRef,
} from '../kernel/types';
import { InMemoryReplayGuard } from '../kernel/replayGuard';
import {
  DefaultAuthorityTransitionEngine,
  KernelStateReducer,
  CanonicalEncoder,
} from '../kernel/engine';

interface PipelineTabProps {
  state: KernelState;
  replayGuard: InMemoryReplayGuard;
  transitionEngine: DefaultAuthorityTransitionEngine;
  onStateUpdate: (newState: KernelState) => void;
}

export const PipelineTab: React.FC<PipelineTabProps> = ({
  state,
  replayGuard,
  transitionEngine,
  onStateUpdate,
}) => {
  const atoms = Object.values(state.atomsById);
  const [selectedAtomId, setSelectedAtomId] = useState<string>(atoms[0]?.id || '');
  const [targetClass, setTargetClass] = useState<AuthorityClass>(AuthorityClass.FACTUAL);
  const [targetWeight, setTargetWeight] = useState<number>(0.85);
  const [requesterId, setRequesterId] = useState<string>('USER_PRIMARY');
  const [justification, setJustification] = useState<string>(
    'Promotion validated via cryptographic evidence digest from peer-reviewed benchmark run.'
  );
  const [includeEvidence, setIncludeEvidence] = useState<boolean>(true);
  const [evidenceUri, setEvidenceUri] = useState<string>('https://evidence.cranium.ai/audit/receipt-441.json');
  const [evidenceDigest, setEvidenceDigest] = useState<string>(
    '7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069'
  );
  const [evidenceVerified, setEvidenceVerified] = useState<boolean>(true);

  const [lastResult, setLastResult] = useState<AuthorityTransition | null>(null);

  const selectedAtom = state.atomsById[selectedAtomId] || atoms[0];

  const handleExecuteTransition = () => {
    if (!selectedAtom) return;

    const evidence: EvidenceRef[] = includeEvidence
      ? [
          {
            id: `ev-${Date.now().toString().slice(-4)}`,
            uri: evidenceUri,
            sha256Digest: evidenceDigest,
            verified: evidenceVerified,
            description: 'Cryptographic peer evidence reference',
          },
        ]
      : [];

    const request: AuthorityTransitionRequest = {
      requestId: `req_${Date.now()}`,
      idempotencyKey: `idem_${Date.now()}`,
      subjectId: selectedAtom.id,
      requestedAuthority: {
        authorityClass: targetClass,
        weight: targetWeight,
      },
      evidence,
      justification,
      requesterId,
      timestamp: Date.now(),
      targetAuthorityVersion: state.authorityVersion,
    };

    const evaluation = transitionEngine.evaluate(request, state);
    const nextState = KernelStateReducer.reduce(
      state,
      evaluation.transition,
      replayGuard,
      request,
      evaluation.replayStatus
    );

    onStateUpdate(nextState);
    setLastResult(evaluation.transition);
  };

  return (
    <div className="space-y-6">
      {/* Banner / Principles */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            Formal Authority Transition Boundary
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Cognition can be generated anywhere. Authority can be acquired ONLY through
            Cranium&apos;s atomic transition boundary with deterministic canonical SHA-256 hashing.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-400">Committed Atoms:</span>
          <span className="text-cyan-400 font-bold px-2 py-0.5 bg-slate-950 rounded border border-slate-800">
            {atoms.length}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Atoms Selection & Request Form (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Subject Atom Selector */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <label className="text-xs font-semibold text-slate-300 block uppercase tracking-wider">
              1. Select Subject Cognitive Atom
            </label>
            <div className="space-y-2">
              {atoms.map((atom) => {
                const isSelected = atom.id === selectedAtom?.id;
                return (
                  <div
                    key={atom.id}
                    onClick={() => setSelectedAtomId(atom.id)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-cyan-950/30 border-cyan-500/50 shadow-sm shadow-cyan-950/30'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-mono text-xs font-bold text-cyan-400">
                        {atom.id}
                      </span>
                      <div className="flex items-center gap-1.5 text-[10px] font-mono">
                        <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                          {atom.kind}
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
                          {atom.authority.authorityClass} ({(atom.authority.weight * 100).toFixed(0)}%)
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-slate-900 text-slate-400">
                          {atom.status}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      &quot;{atom.content}&quot;
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Target Authority Configuration */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
            <label className="text-xs font-semibold text-slate-300 block uppercase tracking-wider">
              2. Target Authority & Evidence Specification
            </label>

            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-2">
                <span>Target Authority Class:</span>
                <span className="font-mono text-cyan-400 font-bold">{targetClass}</span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                {Object.values(AuthorityClass).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setTargetClass(c)}
                    className={`py-1.5 px-2 text-[11px] font-mono rounded border transition-colors ${
                      targetClass === c
                        ? 'bg-cyan-600 text-white border-cyan-400 font-bold'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {c.slice(0, 4)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>Authority Weight:</span>
                <span className="font-mono text-emerald-400 font-bold">
                  {(targetWeight * 100).toFixed(0)}% ({targetWeight.toFixed(2)})
                </span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.05"
                value={targetWeight}
                onChange={(e) => setTargetWeight(parseFloat(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>

            {/* Evidence Sub-Panel */}
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <FileCheck className="w-3.5 h-3.5 text-cyan-400" />
                  Evidence Reference Attached
                </span>
                <input
                  type="checkbox"
                  checked={includeEvidence}
                  onChange={(e) => setIncludeEvidence(e.target.checked)}
                  className="rounded accent-cyan-500 cursor-pointer"
                />
              </div>

              {includeEvidence && (
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-500 text-[10px] block">Evidence URI:</span>
                    <input
                      type="text"
                      value={evidenceUri}
                      onChange={(e) => setEvidenceUri(e.target.value)}
                      className="w-full px-2 py-1 bg-slate-900 border border-slate-800 rounded font-mono text-[11px] text-slate-300"
                    />
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">SHA-256 Checksum:</span>
                    <input
                      type="text"
                      value={evidenceDigest}
                      onChange={(e) => setEvidenceDigest(e.target.value)}
                      className="w-full px-2 py-1 bg-slate-900 border border-slate-800 rounded font-mono text-[10px] text-slate-300"
                    />
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer text-slate-300 text-[11px]">
                    <input
                      type="checkbox"
                      checked={evidenceVerified}
                      onChange={(e) => setEvidenceVerified(e.target.checked)}
                      className="rounded accent-cyan-500"
                    />
                    <span>Verified Cryptographic Signature Flag</span>
                  </label>
                </div>
              )}
            </div>

            {/* Requester & Justification */}
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-slate-400 block mb-1">Requester Identity:</span>
                <input
                  type="text"
                  value={requesterId}
                  onChange={(e) => setRequesterId(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded font-mono text-slate-300"
                />
              </div>

              <div>
                <span className="text-slate-400 block mb-1">Transition Justification:</span>
                <textarea
                  value={justification}
                  onChange={(e) => setJustification(e.target.value)}
                  rows={2}
                  className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded text-slate-300 leading-normal"
                />
              </div>
            </div>

            <button
              onClick={handleExecuteTransition}
              className="w-full py-2.5 px-4 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold rounded-lg text-xs tracking-wide uppercase transition-all shadow-md shadow-cyan-950/40 flex items-center justify-center gap-2"
            >
              <span>Dispatch Authority Transition Request</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Invariants, Boundary Inspection, Last Result (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Last Execution Result */}
          {lastResult ? (
            <div
              className={`p-4 rounded-xl border transition-all ${
                lastResult.decision.type === 'Granted'
                  ? 'bg-emerald-950/30 border-emerald-700/60 text-emerald-200'
                  : 'bg-rose-950/30 border-rose-700/60 text-rose-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {lastResult.decision.type === 'Granted' ? (
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-400" />
                  )}
                  <span className="font-bold text-sm">
                    {lastResult.decision.type === 'Granted'
                      ? 'TRANSITION GRANTED'
                      : 'TRANSITION DENIED'}
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                  {lastResult.id.slice(0, 16)}
                </span>
              </div>

              <p className="text-xs text-slate-200 leading-relaxed mt-2">
                {lastResult.decision.type === 'Granted'
                  ? lastResult.decision.rationale
                  : lastResult.decision.reason}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-800/60 space-y-2 text-[11px] font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>Delta:</span>
                  <span className="text-slate-200">
                    {lastResult.sourceAuthority.authorityClass} &rarr;{' '}
                    {lastResult.requestedAuthority.authorityClass}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Subject:</span>
                  <span className="text-cyan-400">{lastResult.subjectAtomId}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Canonical SHA-256:</span>
                  <span className="text-[10px] text-slate-300 break-all bg-slate-950 p-1.5 rounded block border border-slate-800 mt-0.5">
                    {lastResult.requestHash.hexDigest}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Receipt Signature:</span>
                  <span className="text-[10px] text-emerald-400/90 break-all bg-slate-950 p-1.5 rounded block border border-slate-800 mt-0.5">
                    {lastResult.receiptSignature}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-2">
              <ShieldCheck className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-xs font-semibold text-slate-300">
                Awaiting Authority Transition Dispatch
              </p>
              <p className="text-[11px] text-slate-500">
                Select an atom, configure desired authority level, and execute to inspect the
                real-time boundary verification receipts.
              </p>
            </div>
          )}

          {/* Active Boundary Rules */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5 text-cyan-400" />
              Kernel Authority Boundary Invariants
            </h3>
            <ul className="space-y-2 text-xs">
              <li className="p-2 rounded bg-slate-950 border border-slate-800 text-slate-300">
                <span className="font-mono text-cyan-400 font-bold block text-[10px]">
                  RULE_01_SUBJECT_EXISTENCE
                </span>
                Subject atom must exist in committed snapshot.
              </li>
              <li className="p-2 rounded bg-slate-950 border border-slate-800 text-slate-300">
                <span className="font-mono text-cyan-400 font-bold block text-[10px]">
                  RULE_02_STATE_VERSION_COHERENCE
                </span>
                Request target version must strictly match current authority version (v
                {state.authorityVersion}).
              </li>
              <li className="p-2 rounded bg-slate-950 border border-slate-800 text-slate-300">
                <span className="font-mono text-cyan-400 font-bold block text-[10px]">
                  RULE_03_REPLAY_CONFLICT_CHECK
                </span>
                Idempotency key reuse with different hash is blocked as ConflictingReuse.
              </li>
              <li className="p-2 rounded bg-slate-950 border border-slate-800 text-slate-300">
                <span className="font-mono text-cyan-400 font-bold block text-[10px]">
                  RULE_06_CRYPTOGRAPHIC_EVIDENCE_PROVENANCE
                </span>
                FACTUAL and ENTERPRISE promotions strictly require verified 256-bit evidence.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
