import React from 'react';
import { useAstro } from '../context/AstroContext';
import { Sparkles, Calendar, ShieldCheck, Clock, CheckCircle2, ArrowRight, Bell, Search, RefreshCw } from 'lucide-react';

export default function ConsultationSummaryPage() {
  const { lastConsultationSummary, addPrediction, addJourneyEvent, setActiveTab, showToast, userProfile, openAddPrediction } = useAstro();

  if (!lastConsultationSummary) {
    return (
      <div className="py-12 text-center text-slate-400">
        No recent consultation summary found. Try starting a consultation from the Astrologers tab.
      </div>
    );
  }

  const s = lastConsultationSummary;

  const handleAddToAstroProof = () => {
    openAddPrediction({
      astrologerId: s.astrologerId || 'astro-1',
      astrologerName: s.astrologerName,
      statement: s.loggedPrediction,
      category: 'Career'
    });
  };

  const handleSaveToJourney = () => {
    addJourneyEvent({
      date: s.date || new Date().toISOString().split('T')[0],
      category: 'Career',
      title: `Consultation with ${s.astrologerName}`,
      description: s.topic,
      astrologicalContext: 'Sun-Jupiter transit evaluated during live call.',
      userReflection: 'Saved consultation key takeaways and follow-up window.'
    });
    setActiveTab('journey');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          ✨ AI Consultation Synthesis
        </span>
        <h1 className="text-3xl font-extrabold text-white">Your Consultation Summary</h1>
        <p className="text-xs text-slate-300">
          Generated automatically post-call to make consultations part of your continuous journey.
        </p>
      </div>

      {/* Overview Card */}
      <div className="glass-card-gold rounded-3xl p-6 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <img
              src={s.astrologerAvatar}
              alt={s.astrologerName}
              className="w-12 h-12 rounded-full object-cover border-2 border-amber-500/40"
            />
            <div>
              <h3 className="text-base font-bold text-white">{s.astrologerName}</h3>
              <p className="text-xs text-amber-300">Topic: {s.topic}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="bg-slate-900 border border-slate-800 px-3 py-1 rounded-full font-mono text-slate-300 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" /> {s.durationMinutes} Minutes Session
            </span>
            <span className="text-slate-400 font-mono">{s.date}</span>
          </div>
        </div>

        {/* Key Discussion Points */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            Key Discussion Points
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            {s.keyDiscussionPoints.map((pt, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Questions to Revisit */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider">
            Questions to Revisit
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            {s.questionsToRevisit.map((q, idx) => (
              <li key={idx} className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 text-purple-200">
                • {q}
              </li>
            ))}
          </ul>
        </div>

        {/* Logged Prediction Box */}
        <div className="bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-slate-950 border border-amber-500/30 rounded-2xl p-4 space-y-2">
          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">
            Astrologer Logged Prediction
          </span>
          <p className="text-xs sm:text-sm font-medium text-white italic">
            "{s.loggedPrediction}"
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <button
            onClick={handleAddToAstroProof}
            className="cosmic-gradient-btn py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg"
          >
            <ShieldCheck className="w-4 h-4" /> Add to AstroProof Ledger
          </button>

          <button
            onClick={handleSaveToJourney}
            className="purple-gradient-btn py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg"
          >
            <Calendar className="w-4 h-4" /> Save to Astro Journey
          </button>
        </div>
      </div>

      {/* Plus Consultation Discount Upsell */}
      {userProfile.membership === 'FREE' ? (
        <div className="rounded-3xl border border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-slate-900 p-5 flex flex-col sm:flex-row items-center gap-4 justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">💰</div>
            <div>
              <h3 className="text-sm font-black text-white">Save on Your Next Consultation</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                <span className="text-slate-300">₹20/min standard</span>
                <span className="text-amber-400 font-bold mx-2">→</span>
                <span className="text-amber-300 font-bold">₹18/min with AstroLive Plus</span>
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('membership')}
            className="shrink-0 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-900 font-black text-xs shadow-lg hover:scale-105 transition-all"
          >
            Upgrade →
          </button>
        </div>
      ) : (
        <div className={`rounded-3xl p-5 border ${
          userProfile.membership === 'PLUS'
            ? 'bg-gradient-to-br from-amber-500/8 to-slate-900 border-amber-500/20'
            : 'bg-gradient-to-br from-purple-500/8 to-slate-900 border-purple-500/20'
        }`}>
          <div className="flex items-center gap-3">
            <div className="text-xl">🎯</div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-black text-white">Plus Member Benefit Active</h3>
                <span className="text-[9px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded-full">SAVED</span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {userProfile.membership === 'PLUS' ? '10%' : '20%'} consultation discount applied — you saved money on this session as an AstroLive {userProfile.membership} member.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Smart Follow-Up Section (Repeat Revenue Driver) */}
      <section className="glass-card-purple rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-purple-300 text-xs font-bold uppercase tracking-widest">
          <RefreshCw className="w-4 h-4 text-purple-400 animate-spin-slow" /> Smart Follow-Up Engine
        </div>

        <h3 className="text-xl font-bold text-white">Recommended Follow-Up</h3>
        <p className="text-xs text-slate-300 leading-relaxed bg-purple-950/40 p-4 rounded-2xl border border-purple-500/30">
          "Based on your saved consultation, you may want to revisit this topic around <strong className="text-amber-300">{s.followUpDate || '30 days from now'}</strong> to evaluate interview progress during the next dasha transition."
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <button
            onClick={() => showToast('🔔 Follow-up reminder set for 30 days from now!', 'success')}
            className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-bold flex items-center justify-center gap-2"
          >
            <Bell className="w-4 h-4 text-amber-400" /> Remind Me
          </button>

          <button
            onClick={() => setActiveTab('astrologers')}
            className="py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center justify-center gap-2 shadow-md"
          >
            <Calendar className="w-4 h-4" /> Book Same Astrologer
          </button>

          <button
            onClick={() => setActiveTab('astrologers')}
            className="py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md"
          >
            <Search className="w-4 h-4" /> Explore Another Astrologer
          </button>
        </div>
      </section>
    </div>
  );
}
