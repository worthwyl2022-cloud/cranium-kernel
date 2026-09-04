import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { PipelineTab } from './components/PipelineTab';
import { AdversarialTab } from './components/AdversarialTab';
import { CanonTab } from './components/CanonTab';
import { LedgerTab } from './components/LedgerTab';
import { DiligenceTab } from './components/DiligenceTab';
import { Stress50kTab } from './components/Stress50kTab';
import { InMemoryReplayGuard } from './kernel/replayGuard';
import { DefaultAuthorityTransitionEngine } from './kernel/engine';
import { createInitialKernelState } from './data/initialState';
import { KernelState } from './kernel/types';

export const App: React.FC = () => {
  const replayGuard = useMemo(() => new InMemoryReplayGuard(), []);
  const transitionEngine = useMemo(
    () => new DefaultAuthorityTransitionEngine(replayGuard),
    [replayGuard]
  );

  const [kernelState, setKernelState] = useState<KernelState>(() =>
    createInitialKernelState()
  );
  const [selectedTab, setSelectedTab] = useState<string>('pipeline');

  const handleReset = () => {
    replayGuard.clear();
    setKernelState(createInitialKernelState());
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Header
        state={kernelState}
        selectedTab={selectedTab}
        onSelectTab={setSelectedTab}
        onReset={handleReset}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {selectedTab === 'pipeline' && (
          <PipelineTab
            state={kernelState}
            replayGuard={replayGuard}
            transitionEngine={transitionEngine}
            onStateUpdate={setKernelState}
          />
        )}

        {selectedTab === 'stress50k' && <Stress50kTab />}

        {selectedTab === 'adversarial' && (
          <AdversarialTab
            state={kernelState}
            replayGuard={replayGuard}
            transitionEngine={transitionEngine}
            onStateUpdate={setKernelState}
          />
        )}

        {selectedTab === 'canon' && <CanonTab state={kernelState} />}

        {selectedTab === 'ledger' && (
          <LedgerTab state={kernelState} replayGuard={replayGuard} />
        )}

        {selectedTab === 'diligence' && <DiligenceTab />}
      </main>

      <footer className="border-t border-slate-900 bg-slate-950/80 py-4 px-6 text-center text-xs font-mono text-slate-500">
        Cranium Substrate v1-Kernel &bull; Authority Boundary Contract &bull; Immutable Canonical SHA-256
      </footer>
    </div>
  );
};

export default App;
