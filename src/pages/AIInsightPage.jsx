import React, { useState, useEffect } from 'react';
import { useAstro } from '../context/AstroContext';
import { generateAstroInsight } from '../services/astroAIService';
import { Sparkles, Video, ArrowRight, ShieldCheck, Info, Share2, Compass } from 'lucide-react';

export default function AIInsightPage() {
  const { userProfile, setActiveTab, setShareCardData } = useAstro();
  const [loading, setLoading] = useState(true);
  const [insightData, setInsightData] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const result = generateAstroInsight(userProfile);
      setInsightData(result);
      setLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, [userProfile]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6 text-center py-12">
        <div className="relative">
          <div className="w-20 h-20 rounded-full border-4 border-amber-500/20 border-t-amber-400 animate-spin" />
          <Sparkles className="w-8 h-8 text-amber-400 absolute inset-0 m-auto animate-pulse" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-1">
            Reading your personal birth profile...
          </h3>
          <p className="text-xs text-slate-400 font-mono">
            Calculating Dasha transits & house lords for {userProfile.name}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6">
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" /> AI Personal Astro Insight
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Your Personal Insight</h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          "{insightData.summary}"
        </p>
      </div>

      {/* AI Label & Scientific Disclaimer Callout */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <Info className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong className="text-amber-300">AI-Generated Content:</strong> Synthesized for exploration & self-reflection. Astrology does not scientifically predict the future.
          </span>
        </div>
        <button
          onClick={() =>
            setShareCardData({
              insight: insightData.summary
            })
          }
          className="text-xs text-amber-400 font-bold hover:text-amber-300 flex items-center gap-1 shrink-0 bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20"
        >
          <Share2 className="w-3.5 h-3.5" /> Share Insight Card
        </button>
      </div>

      {/* 3 Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insightData.cards.map((card) => (
          <div
            key={card.id}
            className="glass-card rounded-3xl p-6 flex flex-col justify-between hover:border-amber-500/40 transition-all space-y-4"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{card.icon}</span>
                <div>
                  <h3 className="text-sm font-bold text-white">{card.title}</h3>
                  <span className="text-[10px] text-amber-400 font-mono">{card.subtitle}</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {card.insight}
              </p>
            </div>

            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 space-y-1">
              <span className="font-semibold text-amber-200 block text-[11px]">Recommended Action:</span>
              <p className="text-[11px] text-slate-400">{card.actionableAdvice}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Plus Upsell / Advanced Insight Section */}
      {userProfile.membership === 'FREE' ? (
        <div className="relative rounded-3xl border border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-purple-500/5 overflow-hidden">
          {/* Blurred mock content behind lock */}
          <div className="p-6 filter blur-sm pointer-events-none select-none opacity-50">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🧬</span>
              <div>
                <h3 className="text-sm font-bold text-white">Your Deeper Personal Pattern</h3>
                <span className="text-[10px] text-amber-400 font-mono">Moon-Saturn Transit Analysis</span>
              </div>
            </div>
            <p className="text-xs text-slate-300">Based on your birth chart and recent life events, a significant shift in your career energy field is building over the next 47 days. Your Jupiter transit in the 10th house aligns with...</p>
          </div>
          {/* Lock overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-slate-950/60 backdrop-blur-[1px] rounded-3xl p-6 text-center">
            <div className="text-3xl">🔒</div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white">Deeper Personalized Insights</h3>
              <p className="text-xs text-slate-400">Unlock deeper personalized insights with AstroLive Plus — pattern analysis, Moon-Saturn transits, and more.</p>
            </div>
            <button
              onClick={() => setActiveTab('membership')}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-900 font-black text-xs shadow-lg hover:scale-105 transition-all"
            >
              Upgrade to Plus →
            </button>
          </div>
        </div>
      ) : (
        <div className="glass-card rounded-3xl p-6 space-y-4 border-amber-500/25">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🧬</span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">Advanced Personal Pattern</h3>
                <span className="text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.5 rounded-full">{userProfile.membership} UNLOCK</span>
              </div>
              <span className="text-[10px] text-amber-400 font-mono">Moon-Saturn Transit Analysis</span>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Based on your birth chart and recent Astro Journey events, your Jupiter-Saturn Dasha phase is generating a sustained upward career momentum. Your pattern engine shows <strong className="text-amber-300">3 verified positive cycles</strong> over the past 6 months — this is above the 85th percentile for your Libra ascendant cohort.
          </p>
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 text-xs text-slate-300">
            <span className="font-semibold text-amber-200 block text-[11px] mb-1">Advanced Recommendation:</span>
            <p className="text-[11px] text-slate-400">The next high-resonance window opens August 21–28. Ideal for initiating new projects or signing important agreements.</p>
          </div>
        </div>
      )}

      {/* CTA: Generate Astro Video */}
      <div className="glass-card-purple rounded-3xl p-6 sm:p-8 text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-300 font-bold text-2xl flex items-center justify-center mx-auto border border-purple-500/30">
          🎥
        </div>
        <h3 className="text-2xl font-bold text-white">Experience Your Personalized Astro Video</h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
          Watch a customized AI cosmic video walkthrough of your transit chart, highlighting key dates and growth windows.
        </p>

        <button
          onClick={() => setActiveTab('ai-video')}
          className="purple-gradient-btn px-8 py-3.5 rounded-2xl text-xs font-bold inline-flex items-center gap-2.5 shadow-xl"
        >
          <Video className="w-4 h-4" />
          <span>Generate My Astro Video</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
