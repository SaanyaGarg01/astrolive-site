import React, { useState } from 'react';
import { useAstro } from '../context/AstroContext';
import { Globe, Code, Terminal, Check, Copy, Sparkles, Send, Info } from 'lucide-react';

export default function B2BMuhuratAPI() {
  const { showToast } = useAstro();
  const [copied, setCopied] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);

  const sampleJsonInput = JSON.stringify(
    {
      eventType: 'wedding',
      dateRange: { start: '2026-09-01', end: '2026-09-30' },
      location: { city: 'New Delhi', lat: 28.6139, lon: 77.209 }
    },
    null,
    2
  );

  const sampleJsonOutput = JSON.stringify(
    {
      status: 'success',
      planetaryStrengthScore: 94,
      recommendedSlots: [
        {
          date: '2026-09-14',
          timeWindow: '10:15 AM - 12:45 PM',
          choghadiya: 'Shubh',
          nakshatra: 'Rohini',
          suitabilityScore: 96
        },
        {
          date: '2026-09-22',
          timeWindow: '02:30 PM - 05:00 PM',
          choghadiya: 'Labh',
          nakshatra: 'Uttara Phalguni',
          suitabilityScore: 91
        }
      ]
    },
    null,
    2
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(sampleJsonInput);
    setCopied(true);
    showToast('📋 API snippet copied!', 'success');
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-6">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-semibold">
          <Globe className="w-3.5 h-3.5 text-purple-400" /> B2B API Licensing Revenue
        </span>
        <h1 className="text-3xl font-extrabold text-white">AstroLive Timing API</h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Bring auspicious timing intelligence directly into your wedding platforms, matrimonial apps, and event planning services.
        </p>
      </div>

      {/* Conceptual Disclaimer */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3 text-xs text-slate-400 text-center">
        <strong className="text-purple-300">Conceptual B2B Opportunity:</strong> Demonstrates enterprise API integration model.
      </div>

      {/* Target Use Cases Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { title: 'Wedding Platforms', desc: 'Auto-suggest auspicious dates during venue search' },
          { title: 'Event Planners', desc: 'Integrate Muhurat timing for corporate launches' },
          { title: 'Matrimonial Sites', desc: 'Instant Kundli & Tithi matching scores' },
          { title: 'Business Launchers', desc: 'Incorporation timing optimization' }
        ].map((uc, i) => (
          <div key={i} className="glass-card-purple rounded-2xl p-4 space-y-1 text-xs">
            <h4 className="font-bold text-white">{uc.title}</h4>
            <p className="text-[11px] text-slate-400">{uc.desc}</p>
          </div>
        ))}
      </div>

      {/* Developer API Interactive Console Simulator */}
      <div className="glass-card rounded-3xl p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-amber-400" />
            <span className="font-mono text-xs font-bold text-slate-200">POST /api/v2/muhurat</span>
          </div>
          <button
            onClick={handleCopy}
            className="text-xs text-amber-400 font-bold hover:text-amber-300 flex items-center gap-1"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Payload'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
          {/* JSON Input */}
          <div className="space-y-2">
            <span className="text-slate-400 text-[10px] uppercase font-sans font-bold block">
              1. Request Body (JSON)
            </span>
            <pre className="bg-[#04060d] border border-slate-800 rounded-2xl p-4 text-amber-300/90 overflow-x-auto text-[11px] leading-relaxed">
              {sampleJsonInput}
            </pre>
          </div>

          {/* JSON Output */}
          <div className="space-y-2">
            <span className="text-slate-400 text-[10px] uppercase font-sans font-bold block">
              2. Response Payload (200 OK)
            </span>
            <pre className="bg-[#04060d] border border-slate-800 rounded-2xl p-4 text-purple-300/90 overflow-x-auto text-[11px] leading-relaxed">
              {sampleJsonOutput}
            </pre>
          </div>
        </div>

        <div className="text-center pt-2">
          <button
            onClick={() => setShowDemoModal(true)}
            className="purple-gradient-btn px-8 py-3.5 rounded-2xl text-xs font-bold shadow-xl inline-flex items-center gap-2"
          >
            <Send className="w-4 h-4" /> Request API Key & Demo
          </button>
        </div>
      </div>

      {/* Demo Request Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#0f1226] border border-amber-500/30 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 text-xs">
            <h3 className="text-lg font-bold text-white">Request AstroLive B2B API Demo</h3>
            <p className="text-slate-300">
              Submit details to receive sandbox API keys and partner documentation.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowDemoModal(false);
                showToast('🚀 B2B API Request submitted! Credentials sent to email.', 'success');
              }}
              className="space-y-3"
            >
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Company Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. WeddingWire / Matrimony.com"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Work Email</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. dev@company.com"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowDemoModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="purple-gradient-btn px-5 py-2 rounded-xl font-bold"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
