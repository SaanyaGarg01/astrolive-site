import React from 'react';
import { useAstro } from '../context/AstroContext';
import AstrologerTrustScore from './AstrologerTrustScore';
import { X, Star, ShieldCheck, Award, MessageSquare, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AstrologerProfileModal() {
  const { selectedAstrologerProfile, setSelectedAstrologerProfile, startConsultation } = useAstro();

  if (!selectedAstrologerProfile) return null;

  const astro = selectedAstrologerProfile;
  const stats = astro.astroProofStats;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0f1226] border border-amber-500/30 rounded-3xl max-w-xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => setSelectedAstrologerProfile(null)}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Profile Header */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src={astro.avatar}
            alt={astro.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-amber-500/50 shadow-lg"
          />
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              {astro.name}
              {astro.isAvailable && <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />}
            </h3>
            <p className="text-xs text-amber-300 font-medium">{astro.specialization}</p>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
              <span>{astro.languages.join(' • ')}</span>
              <span>• {astro.experience} Yrs Experience</span>
            </div>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-2xl text-center">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Rating</span>
            <div className="text-sm font-bold text-amber-400 flex items-center justify-center gap-1 mt-0.5">
              <Star className="w-3.5 h-3.5 fill-amber-400" /> {astro.rating}
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-2xl text-center">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Consultations</span>
            <div className="text-sm font-bold text-white mt-0.5">{astro.consultationsCount}+</div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-2xl text-center">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Repeat Rate</span>
            <div className="text-sm font-bold text-purple-300 mt-0.5">{stats.repeatRate}%</div>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-6">
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">About & Expertise</h4>
          <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            {astro.bio}
          </p>
        </div>

        {/* Major Feature: AstroProof Trust Profile Record */}
        <div className="glass-card-gold rounded-2xl p-4 space-y-3 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> AstroProof Verification Record
            </span>
            <span className="text-[10px] text-emerald-300 font-bold bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30">
              {stats.confirmationRate}% User-Confirmed Rate
            </span>
          </div>

          {/* Breakdown Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs pt-1">
            <div className="bg-slate-950/60 p-2 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Logged</span>
              <strong className="text-white text-sm">{stats.predictionsLogged}</strong>
            </div>

            <div className="bg-slate-950/60 p-2 rounded-xl border border-slate-800">
              <span className="text-[10px] text-emerald-400 block">Confirmed</span>
              <strong className="text-emerald-300 text-sm">{stats.userConfirmed}</strong>
            </div>

            <div className="bg-slate-950/60 p-2 rounded-xl border border-slate-800">
              <span className="text-[10px] text-amber-400 block">Partial</span>
              <strong className="text-amber-300 text-sm">{stats.partiallyConfirmed}</strong>
            </div>

            <div className="bg-slate-950/60 p-2 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Unconfirmed</span>
              <strong className="text-slate-400 text-sm">{stats.notConfirmed}</strong>
            </div>
          </div>

          <p className="text-[10px] text-slate-400 italic pt-1 border-t border-slate-800/80">
            "Outcome statistics are based on user-reported results and do not constitute scientific validation."
          </p>
        </div>

        {/* Verified Trust Score (computed by AstrologerTrustScore component) */}
        <div className="mb-6">
          <AstrologerTrustScore stats={stats} showBreakdown={false} />
        </div>

        {/* Action Button */}
        <button
          onClick={() => {
            setSelectedAstrologerProfile(null);
            startConsultation(astro);
          }}
          className="w-full cosmic-gradient-btn py-3.5 rounded-2xl text-xs font-bold shadow-xl flex items-center justify-center gap-2"
        >
          <MessageSquare className="w-4 h-4" /> Start Consultation (₹{astro.pricePerMin}/min)
        </button>
      </div>
    </div>
  );
}
