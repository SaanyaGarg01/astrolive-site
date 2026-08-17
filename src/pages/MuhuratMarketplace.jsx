import React, { useState } from 'react';
import { MUHURAT_CATEGORIES, MOCK_MUHURAT_VENDORS } from '../data/mockData';
import { useAstro } from '../context/AstroContext';
import { Sparkles, Calendar, Clock, MapPin, CheckCircle, Info, Building } from 'lucide-react';

export default function MuhuratMarketplace() {
  const { showToast } = useAstro();
  const [selectedCategory, setSelectedCategory] = useState('wedding');
  const [location, setLocation] = useState('Delhi NCR');
  const [dateRange, setDateRange] = useState('2026-09-01 to 2026-09-30');

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-6">
      {/* Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          🪔 Commission Revenue Model (P2 Concept)
        </span>
        <h1 className="text-3xl font-extrabold text-white">Muhurat Marketplace</h1>
        <p className="text-xs text-slate-300">
          Find celestial auspicious timing windows for life events & book verified Vedic pandits, venues, and photographers directly.
        </p>
      </div>

      {/* Concept Disclaimer Callout */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3 text-xs text-slate-400 text-center">
        <strong className="text-amber-300">Conceptual Feature Preview:</strong> Demonstrating AstroLive transactional marketplace revenue opportunities.
      </div>

      {/* Step 1: Event Selector */}
      <div className="glass-card-gold rounded-3xl p-6 space-y-4">
        <h3 className="text-base font-bold text-white">Select Event Type & Location</h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {MUHURAT_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`p-3 rounded-2xl border text-center transition-all ${
                selectedCategory === cat.id
                  ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <span className="text-2xl block mb-1">{cat.icon}</span>
              <span className="text-[11px] block">{cat.name}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Preferred Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Date Range</label>
            <input
              type="text"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>
      </div>

      {/* Step 2: Recommended Auspicious Window */}
      <div className="glass-card-purple rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-purple-500/30 pb-3">
          <span className="text-xs font-bold text-purple-300 uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-purple-400" /> Recommended Auspicious Window
          </span>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30">
            Shubh Tithi Active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-slate-400 block text-[10px]">Auspicious Date:</span>
            <strong className="text-white text-sm font-bold">14 September 2026</strong>
          </div>

          <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-slate-400 block text-[10px]">Optimal Timing Slot:</span>
            <strong className="text-amber-300 text-sm font-bold">10:15 AM – 12:45 PM</strong>
          </div>

          <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-slate-400 block text-[10px]">Planetary Alignment:</span>
            <strong className="text-purple-300 text-sm font-bold">Rohini Nakshatra Alignment</strong>
          </div>
        </div>
      </div>

      {/* Step 3: Vendor Booking Cards */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-white">Plan Your Event — Book Verified Vendors</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_MUHURAT_VENDORS.map((v) => (
            <div
              key={v.id}
              className="glass-card rounded-3xl overflow-hidden flex flex-col justify-between hover:border-amber-500/40 transition-all space-y-4"
            >
              <img src={v.image} alt={v.name} className="w-full h-40 object-cover" />

              <div className="p-5 pt-0 space-y-2">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
                  {v.category}
                </span>
                <h4 className="text-sm font-bold text-white">{v.name}</h4>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>★ {v.rating} ({v.reviews} reviews)</span>
                  <span className="text-white font-bold">{v.price}</span>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => showToast(`🪔 Vendor booking inquiry sent for ${v.name}!`, 'success')}
                  className="w-full cosmic-gradient-btn py-2.5 rounded-xl text-xs font-bold shadow-md"
                >
                  Book through AstroLive
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
