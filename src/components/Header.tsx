import React from 'react';
import { Cpu, RefreshCw, Shield, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { KernelState } from '../kernel/types';

interface HeaderProps {
  state: KernelState;
  selectedTab: string;
  onSelectTab: (tab: string) => void;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  state,
  selectedTab,
  onSelectTab,
  onReset,
}) => {
  const tabs = [
    { id: 'pipeline', label: 'Authority Pipeline' },
    { id: 'stress50k', label: '50,000 Stress Audit' },
    { id: 'adversarial', label: 'Adversarial Suite' },
    { id: 'canon', label: 'Canon Lane & NLI' },
    { id: 'ledger', label: 'Cryptographic Ledger' },
    { id: 'diligence', label: 'Acquisition Diligence' },
  ];

  const threatColor =
    state.threatAssessment.threatLevel === 'NOMINAL'
      ? 'text-emerald-400 bg-emerald-950/60 border-emerald-800'
      : state.threatAssessment.threatLevel === 'ELEVATED'
      ? 'text-amber-400 bg-amber-950/60 border-amber-800'
      : 'text-rose-400 bg-rose-950/60 border-rose-800';

  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Logo & Substrate Badge */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-600/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-sm shadow-cyan-900/20">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-white">
                  CRANIUM CORE
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-semibold bg-cyan-950/80 text-cyan-400 border border-cyan-800/60">
                  v1-SUBSTRATE
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Directive-Governed Cognitive Kernel
              </p>
            </div>
          </div>

          {/* Real-Time Telemetry Badges */}
          <div className="flex items-center flex-wrap gap-2 text-xs font-mono">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-slate-300">
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <span>AUTH:</span>
              <span className="text-cyan-400 font-bold">v{state.authorityVersion}</span>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-slate-300">
              <span>CANON:</span>
              <span className="text-amber-400 font-bold">v{state.canonVersion}</span>
            </div>

            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border font-semibold ${threatColor}`}
            >
              {state.threatAssessment.threatLevel === 'NOMINAL' ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              )}
              <span>THREAT:</span>
              <span>{state.threatAssessment.threatLevel}</span>
            </div>

            <button
              onClick={onReset}
              className="p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-100 transition-colors border border-slate-700"
              title="Reset Kernel State"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 mt-3 overflow-x-auto no-scrollbar border-t border-slate-800/60 pt-2">
          {tabs.map((tab) => {
            const isActive = selectedTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
