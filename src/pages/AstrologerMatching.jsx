import React, { useState } from 'react';
import { useAstro } from '../context/AstroContext';
import { matchAstrologers } from '../services/astroAIService';
import { Search, Sparkles, Filter, Star, CheckCircle, ShieldCheck, PhoneCall, MessageSquare, Info } from 'lucide-react';

export default function AstrologerMatching() {
  const { userProfile, astrologers, setSelectedAstrologerProfile, startConsultation } = useAstro();
  const [queryText, setQueryText] = useState('I am confused about whether I should change my job.');
  const [selectedSpecialization, setSelectedSpecialization] = useState('All');
  const [selectedLang, setSelectedLang] = useState('All');
  const [astroProofFilter, setAstroProofFilter] = useState('All');
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  // Match astrologers dynamically
  const matchedList = matchAstrologers(queryText, userProfile, astrologers);

  const filteredList = matchedList.filter((astro) => {
    if (selectedSpecialization !== 'All' && !astro.specialization.includes(selectedSpecialization)) return false;
    if (selectedLang !== 'All' && !astro.languages.includes(selectedLang)) return false;
    if (onlyAvailable && !astro.isAvailable) return false;
    if (astroProofFilter === 'High transparency' && (astro.astroProofStats?.confirmationRate || 0) < 70) return false;
    return true;
  }).sort((a, b) => {
    if (astroProofFilter === 'Most predictions recorded') {
      return (b.astroProofStats?.predictionsLogged || 0) - (a.astroProofStats?.predictionsLogged || 0);
    }
    if (astroProofFilter === 'Highest user-reported confirmation') {
      return (b.astroProofStats?.confirmationRate || 0) - (a.astroProofStats?.confirmationRate || 0);
    }
    return 0;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-6">
      {/* Header & Smart Query Input */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" /> AI Smart Astrologer Matching
        </span>
        <h1 className="text-3xl font-extrabold text-white">Find Your Ideal Guidance</h1>
        <p className="text-xs text-slate-300">
          Describe what's on your mind. AI matches your query against verified astrologer specializations, language, and pricing.
        </p>
      </div>

      {/* Query Search Input Box */}
      <div className="glass-card-gold rounded-3xl p-6 space-y-4">
        <div className="relative">
          <textarea
            value={queryText}
            onChange={(e) => setQueryText(e.target.value)}
            rows={2}
            placeholder="Type your concern here e.g. I am confused about whether I should change my job..."
            className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* AI Extracted Criteria Pills */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-slate-400 font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> AI Extracted Parameters:
            </span>
            <span className="bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded-lg border border-amber-500/30 font-medium">
              Concern: Career Transition
            </span>
            <span className="bg-purple-500/20 text-purple-300 px-2.5 py-1 rounded-lg border border-purple-500/30 font-medium">
              Language: {userProfile.language}
            </span>
            <span className="bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-lg border border-emerald-500/30 font-medium">
              Target Budget: ₹10–₹30/min
            </span>
            {/* Membership matching tier */}
            {userProfile.membership === 'FREE' ? (
              <span className="bg-slate-800 text-slate-400 px-2.5 py-1 rounded-lg border border-slate-700 font-medium">
                Standard Matching
              </span>
            ) : (
              <span className={`px-2.5 py-1 rounded-lg border font-bold flex items-center gap-1 ${
                userProfile.membership === 'PLUS'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                  : 'bg-purple-500/20 text-purple-300 border-purple-500/30'
              }`}>
                🎯 {userProfile.membership === 'PLUS' ? 'Priority' : 'VIP'} Matching Unlocked
              </span>
            )}
          </div>

          <span className="text-[11px] text-slate-400 font-mono">
            {filteredList.length} Verified Astrologers Matched
          </span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div className="flex items-center gap-3 text-xs">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-slate-300 font-semibold">Filters:</span>

          <select
            value={selectedSpecialization}
            onChange={(e) => setSelectedSpecialization(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 text-xs focus:outline-none"
          >
            <option value="All">All Specializations</option>
            <option value="Vedic">Vedic Astrology</option>
            <option value="Tarot">Tarot & Intuitive</option>
            <option value="Numerology">Numerology & KP</option>
            <option value="Vastu">Vastu Shastra</option>
          </select>

          <select
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 text-xs focus:outline-none"
          >
            <option value="All">All Languages</option>
            <option value="Hindi">Hindi</option>
            <option value="English">English</option>
            <option value="Bengali">Bengali</option>
            <option value="Tamil">Tamil</option>
          </select>

          <select
            value={astroProofFilter}
            onChange={(e) => setAstroProofFilter(e.target.value)}
            className="bg-slate-900 border border-emerald-500/30 text-emerald-300 font-semibold rounded-lg px-3 py-1.5 text-xs focus:outline-none"
          >
            <option value="All">AstroProof: All</option>
            <option value="High transparency">High Transparency (70%+)</option>
            <option value="Most predictions recorded">Most Predictions Recorded</option>
            <option value="Highest user-reported confirmation">Highest Confirmation Rate</option>
          </select>
        </div>

        <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={onlyAvailable}
            onChange={(e) => setOnlyAvailable(e.target.checked)}
            className="rounded bg-slate-900 border-slate-700 text-amber-500 focus:ring-0"
          />
          <span>Show Available Now Only</span>
        </label>
      </div>

      {/* Astrologers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredList.map((astro) => (
          <div
            key={astro.id}
            className="glass-card rounded-3xl p-6 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              {/* Header Info */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <img
                    src={astro.avatar}
                    alt={astro.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-amber-500/40"
                  />
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      {astro.name}
                      {astro.isAvailable ? (
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Available now" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-slate-500" title="In call" />
                      )}
                    </h3>
                    <p className="text-xs text-amber-300 font-medium">{astro.specialization}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                      <span>{astro.languages.join(' • ')}</span>
                      <span>• {astro.experience} yrs exp</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-block bg-gradient-to-r from-amber-500 to-purple-600 text-slate-950 font-extrabold text-xs px-3 py-1 rounded-full shadow-md">
                    {astro.matchPercentage}% Match
                  </span>
                  <div className="text-xs text-slate-300 font-bold mt-1.5">
                    ₹{astro.pricePerMin}/min
                  </div>
                </div>
              </div>

              {/* Visually Explainable Rationale Callout */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 my-3">
                <div className="flex items-center gap-1.5 text-amber-400 font-semibold mb-1">
                  <Info className="w-3.5 h-3.5" /> Match Rationale:
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {astro.matchExplanation}
                </p>
              </div>

              {/* AstroProof Record Summary */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80 pt-3">
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <strong className="text-amber-300">{astro.rating}</strong> ({astro.consultationsCount}+ calls)
                </span>
                <span className="text-emerald-400 font-semibold">
                  AstroProof: {astro.astroProofStats.confirmationRate}% User-Confirmed
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => startConsultation(astro)}
                className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-amber-500/20 flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" /> Chat Now (₹{astro.pricePerMin}/min)
              </button>

              <button
                onClick={() => setSelectedAstrologerProfile(astro)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all border border-slate-700"
              >
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
