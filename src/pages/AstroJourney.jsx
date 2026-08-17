import React, { useState } from 'react';
import { useAstro } from '../context/AstroContext';
import { Calendar, Plus, Sparkles, Filter, Shield, Info, CheckCircle2, ChevronRight } from 'lucide-react';

export default function AstroJourney() {
  const { journeyEvents, addJourneyEvent, setActiveTab } = useAstro();
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const [newEventForm, setNewEventForm] = useState({
    title: '',
    category: 'Career',
    date: new Date().toISOString().split('T')[0],
    description: '',
    userReflection: ''
  });

  const categories = [
    'Career',
    'Relationship',
    'Education',
    'Finance',
    'Family',
    'Health',
    'Travel',
    'Business',
    'Other'
  ];

  const filteredEvents = journeyEvents.filter((ev) => {
    if (selectedCategory !== 'All' && ev.category !== selectedCategory) return false;
    return true;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newEventForm.title.trim()) return;
    addJourneyEvent(newEventForm);
    setShowAddModal(false);
    setNewEventForm({
      title: '',
      category: 'Career',
      date: new Date().toISOString().split('T')[0],
      description: '',
      userReflection: ''
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <Calendar className="w-3.5 h-3.5" /> Central Differentiator
          </span>
          <h1 className="text-3xl font-extrabold text-white mt-1">My Astro Journey</h1>
          <p className="text-xs text-slate-300">
            A continuous life timeline correlating your key decisions, consultations, and planetary transits.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('personal-patterns')}
            className="px-4 py-2.5 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-200 hover:bg-purple-500/30 text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Personal Patterns</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="cosmic-gradient-btn px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Add Life Event</span>
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-slate-800">
        <button
          onClick={() => setSelectedCategory('All')}
          className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
            selectedCategory === 'All'
              ? 'bg-amber-500 text-slate-950 font-bold'
              : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700'
          }`}
        >
          All Categories ({journeyEvents.length})
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Visual Timeline */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-amber-500/30 space-y-8 my-6">
        {filteredEvents.map((item, idx) => (
          <div key={item.id} className="relative group">
            {/* Timeline Dot */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-5 h-5 rounded-full bg-[#070913] border-2 border-amber-400 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-amber-400 group-hover:scale-125 transition-all" />
            </div>

            {/* Event Card */}
            <div className="glass-card rounded-2xl p-5 space-y-3 hover:border-amber-500/40 transition-all">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-md border border-amber-500/20">
                    {item.month || item.date}
                  </span>
                  <span className="text-xs font-bold text-white">{item.title}</span>
                </div>

                <span className="text-[10px] font-semibold text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded-full border border-purple-500/30">
                  {item.category}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {item.description}
              </p>

              {/* Astrological Context & Reflection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                    Astrological Context
                  </span>
                  <p className="text-[11px] text-slate-300">{item.astrologicalContext}</p>
                </div>

                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                  <span className="text-[10px] font-bold text-purple-300 uppercase tracking-wider block mb-1">
                    Personal Reflection
                  </span>
                  <p className="text-[11px] text-slate-300">{item.userReflection || 'Reflected on clarity gained.'}</p>
                </div>
              </div>

              {/* Health Disclaimer Notice if Category === Health */}
              {item.category === 'Health' && (
                <div className="text-[10px] text-amber-400 bg-amber-500/10 p-2 rounded-lg border border-amber-500/20 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 shrink-0" />
                  <span>Personal life event record only. Not medical diagnosis or medical advice.</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Life Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#0f1226] border border-amber-500/30 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white">Log a Life Event</h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Event Title</label>
                <input
                  type="text"
                  required
                  value={newEventForm.title}
                  onChange={(e) => setNewEventForm({ ...newEventForm, title: e.target.value })}
                  placeholder="e.g. Received new job offer / Bought house"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-500 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category</label>
                  <select
                    value={newEventForm.category}
                    onChange={(e) => setNewEventForm({ ...newEventForm, category: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-500 text-xs"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Date</label>
                  <input
                    type="date"
                    value={newEventForm.date}
                    onChange={(e) => setNewEventForm({ ...newEventForm, date: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-500 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newEventForm.description}
                  onChange={(e) => setNewEventForm({ ...newEventForm, description: e.target.value })}
                  placeholder="Briefly describe what occurred..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-500 text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Personal Reflection</label>
                <textarea
                  rows={2}
                  value={newEventForm.userReflection}
                  onChange={(e) => setNewEventForm({ ...newEventForm, userReflection: e.target.value })}
                  placeholder="How did this impact your outlook?"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-500 text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="cosmic-gradient-btn px-5 py-2 rounded-xl font-bold"
                >
                  Save to Journey
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
