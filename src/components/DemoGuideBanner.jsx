import React, { useState } from 'react';
import { useAstro } from '../context/AstroContext';
import { Sparkles, ChevronRight, X, Play, Shield, CheckCircle, Flame } from 'lucide-react';

export default function DemoGuideBanner() {
  const { setActiveTab, enableDemoMode, isDemoMode } = useAstro();
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const demoSteps = [
    { label: '1. Onboarding', tab: 'onboarding' },
    { label: '2. AI Insight', tab: 'ai-insight' },
    { label: '3. AI Video', tab: 'ai-video' },
    { label: '4. Smart Match', tab: 'astrologers' },
    { label: '5. Journey', tab: 'journey' },
    { label: '6. AstroProof', tab: 'astro-proof' },
    { label: '7. Astro Guard', tab: 'astro-guard' },
    { label: '8. Daily Ritual', tab: 'daily-ritual' },
    { label: '9. Portal Toggle', tab: 'astrologer-portal' }
  ];

  return (
    <div className="bg-gradient-to-r from-amber-950/80 via-purple-950/80 to-slate-950/90 border-b border-amber-500/30 px-4 py-2.5 text-xs text-slate-200 z-40 relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="bg-amber-500/20 text-amber-300 font-semibold px-2 py-0.5 rounded-full border border-amber-500/30 flex items-center gap-1 text-[11px]">
            <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" /> Product Preview
          </span>
          <span className="hidden sm:inline text-slate-300">
            Guided Flow: Click any step to test the journey:
          </span>
        </div>

        {/* Step Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 md:pb-0 no-scrollbar">
          {demoSteps.map((step, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(step.tab)}
              className="bg-slate-900/60 hover:bg-amber-500/20 hover:text-amber-300 border border-slate-700/60 hover:border-amber-500/40 text-slate-300 px-2 py-1 rounded transition-all whitespace-nowrap text-[11px] flex items-center gap-1"
            >
              {step.label}
            </button>
          ))}
          <button
            onClick={enableDemoMode}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-2.5 py-1 rounded transition-all whitespace-nowrap text-[11px] flex items-center gap-1 ml-1"
          >
            <Play className="w-3 h-3 fill-slate-950" /> Populate Saanya's Data
          </button>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="text-slate-400 hover:text-slate-200 p-1 hidden lg:block"
          title="Dismiss Guide"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
