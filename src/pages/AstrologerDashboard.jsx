import React from 'react';
import { useAstro } from '../context/AstroContext';
import { LayoutDashboard, Users, Flame, ShieldCheck, Clock, CheckCircle2, Sparkles, MessageSquare, ArrowRight } from 'lucide-react';

export default function AstrologerDashboard() {
  const { userProfile, predictions, startConsultation, astrologers } = useAstro();
  const currentAstro = astrologers[0]; // Acharya Priya Sharma workspace

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <LayoutDashboard className="w-3.5 h-3.5" /> Astrologer Workspace Portal
          </span>
          <h1 className="text-3xl font-extrabold text-white mt-1">
            Acharya Priya Sharma's Workspace
          </h1>
          <p className="text-xs text-slate-300">
            Demonstrates platform value for astrologers: client context briefs, prediction ledger & repeat engagement tools.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-xs font-mono text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Status: Available for Calls</span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-card p-4 rounded-2xl text-center space-y-1">
          <span className="text-[10px] uppercase font-semibold text-slate-400">Today's Revenue</span>
          <div className="text-xl font-bold text-amber-400">₹4,250</div>
        </div>

        <div className="glass-card p-4 rounded-2xl text-center space-y-1">
          <span className="text-[10px] uppercase font-semibold text-slate-400">Consultations Today</span>
          <div className="text-xl font-bold text-white">8 Sessions</div>
        </div>

        <div className="glass-card p-4 rounded-2xl text-center space-y-1">
          <span className="text-[10px] uppercase font-semibold text-slate-400">Repeat Client Rate</span>
          <div className="text-xl font-bold text-purple-300">84%</div>
        </div>

        <div className="glass-card p-4 rounded-2xl text-center space-y-1">
          <span className="text-[10px] uppercase font-semibold text-slate-400">AstroProof Accuracy</span>
          <div className="text-xl font-bold text-emerald-400">68% Verified</div>
        </div>
      </div>

      {/* Today's Client Brief (Saanya's Context Card) */}
      <div className="glass-card-gold rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-amber-500/30 pb-3">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> Today's Client Brief (Next in Queue)
          </span>
          <span className="text-xs font-mono text-amber-300 bg-amber-500/20 px-3 py-0.5 rounded-full">
            In Queue • Ready
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/40 font-bold text-amber-300 flex items-center justify-center text-base">
              {userProfile.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-base font-bold text-white">{userProfile.name}</h3>
              <p className="text-xs text-slate-300">
                {userProfile.zodiac} • {userProfile.city} • {userProfile.language}
              </p>
            </div>
          </div>

          <div className="text-right text-xs">
            <span className="text-slate-400 block text-[10px]">Previous Consultation:</span>
            <strong className="text-amber-300">32 Days Ago</strong>
          </div>
        </div>

        {/* AI Brief Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">User Concern</span>
            <p className="text-amber-200 font-semibold">{userProfile.concern}</p>
          </div>

          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Last Recorded Prediction</span>
            <p className="text-slate-300 italic">"Job opportunity within 30 days"</p>
          </div>

          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-purple-300 uppercase block">Suggested AI Action</span>
            <p className="text-purple-200">Ask whether the predicted interview occurred.</p>
          </div>
        </div>

        <div className="pt-2 text-right">
          <button
            onClick={() => startConsultation(currentAstro)}
            className="cosmic-gradient-btn px-6 py-2.5 rounded-xl text-xs font-bold shadow-lg inline-flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" /> Start Client Session with Saanya
          </button>
        </div>
      </div>

      {/* Astrologer Prediction Ledger Management */}
      <div className="glass-card rounded-3xl p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" /> Recent Logged Predictions Ledger
        </h3>

        <div className="space-y-3 text-xs">
          {predictions.map((p) => (
            <div key={p.id} className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between gap-3">
              <div>
                <span className="font-bold text-white block">{p.statement}</span>
                <span className="text-[10px] text-slate-400 font-mono">Target: {p.predictionWindow}</span>
              </div>
              <span className="text-xs font-bold text-emerald-400 shrink-0">{p.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
