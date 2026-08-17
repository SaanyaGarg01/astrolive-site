import React, { useState, useEffect } from 'react';
import { useAstro } from '../context/AstroContext';
import {
  trackLifeEventCreated,
  trackLifeEventViewed,
  trackPatternAnalysisStarted,
  trackPatternDiscovered,
  trackReflectionAdded,
  trackConsultationAddedToJourney,
  trackPatternInsightGenerated,
  trackPatternToConsultationClicked
} from '../services/personalPatternsAnalytics';
import {
  Sparkles, Calendar, Plus, Filter, Info, ShieldCheck, Heart, Briefcase,
  GraduationCap, DollarSign, Compass, RotateCw, CheckCircle2, AlertCircle,
  X, ChevronRight, MessageSquare, ArrowRight, Lock, Trash2, Edit3, Smile,
  Meh, Frown, Award, TrendingUp, BookOpen, Share2
} from 'lucide-react';

export default function PersonalPatterns() {
  const {
    journeyEvents,
    addJourneyEvent,
    deleteJourneyEvent,
    deleteEntireJourney,
    patterns,
    savePatternReflection,
    addConsultationToJourney,
    lastConsultationSummary,
    predictions,
    guardEvents,
    setActiveTab,
    showToast
  } = useAstro();

  // Filter & Search
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedEventForDetail, setSelectedEventForDetail] = useState(null);

  // AI Pattern Analysis Engine Processing State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  // Reflection input state per pattern
  const [reflectionInputs, setReflectionInputs] = useState({});

  // Outcome input state for Event Detail
  const [eventOutcome, setEventOutcome] = useState('Successful');
  const [eventReflectionNote, setEventReflectionNote] = useState('');

  // Add Event Form State
  const [newEventForm, setNewEventForm] = useState({
    title: '',
    category: 'Career',
    date: new Date().toISOString().split('T')[0],
    time: '',
    location: '',
    description: '',
    mood: '😊 Positive'
  });

  // Track page view
  useEffect(() => {
    trackLifeEventViewed({ count: journeyEvents.length });
  }, []);

  // Category Theme Badges & Event Counts
  const themes = [
    { cat: 'Career', icon: '💼', count: journeyEvents.filter(e => e.category === 'Career').length },
    { cat: 'Love', icon: '❤️', count: journeyEvents.filter(e => e.category === 'Love' || e.category === 'Relationship').length },
    { cat: 'Education', icon: '🎓', count: journeyEvents.filter(e => e.category === 'Education').length },
    { cat: 'Finance', icon: '💰', count: journeyEvents.filter(e => e.category === 'Finance').length },
    { cat: 'Travel', icon: '✈️', count: journeyEvents.filter(e => e.category === 'Travel').length }
  ];

  // Mood counts
  const positiveMoods = journeyEvents.filter(e => (e.mood || '').includes('Positive') || (e.mood || '').includes('😊')).length;
  const neutralMoods = journeyEvents.filter(e => (e.mood || '').includes('Neutral') || (e.mood || '').includes('😐')).length;
  const difficultMoods = journeyEvents.filter(e => (e.mood || '').includes('Difficult') || (e.mood || '').includes('😔')).length;

  // Filtered Events
  const filteredEvents = journeyEvents.filter((ev) => {
    if (selectedCategory !== 'All' && ev.category !== selectedCategory) return false;
    return true;
  });

  // Handle Add Life Event
  const handleAddEventSubmit = (e) => {
    e.preventDefault();
    if (!newEventForm.title.trim()) return;

    addJourneyEvent({
      title: newEventForm.title,
      category: newEventForm.category,
      date: newEventForm.date,
      time: newEventForm.time,
      location: newEventForm.location,
      description: newEventForm.description,
      mood: newEventForm.mood,
      outcome: 'Successful',
      astrologicalContext: `Prototype interpretation: ${newEventForm.category} planetary transit overlay active during this date.`
    });

    trackLifeEventCreated({ category: newEventForm.category, title: newEventForm.title });

    setShowAddModal(false);
    setNewEventForm({
      title: '',
      category: 'Career',
      date: new Date().toISOString().split('T')[0],
      time: '',
      location: '',
      description: '',
      mood: '😊 Positive'
    });
  };

  // Run AI Pattern Analysis Engine
  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisStep(1);
    trackPatternAnalysisStarted();

    const steps = [
      '1. Reading life events & timestamps...',
      '2. Comparing astrological transit dates...',
      '3. Reviewing consultation history & AstroProof ledger...',
      '4. Identifying recurring personal themes...',
      '5. Generating personal pattern reflection...'
    ];

    let currentStep = 1;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep <= steps.length) {
        setAnalysisStep(currentStep);
      } else {
        clearInterval(interval);
        setIsAnalyzing(false);
        setAnalysisComplete(true);
        trackPatternDiscovered({ theme: 'Career Transitions' });
        showToast('✨ Personal Pattern Analysis Complete!', 'success');
      }
    }, 600);
  };

  // Save reflection for a pattern
  const handleSaveReflection = (patternId) => {
    const text = reflectionInputs[patternId];
    if (!text || !text.trim()) return;
    savePatternReflection(patternId, text);
    trackReflectionAdded({ patternId });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 py-6 text-slate-100">

      {/* ── 1. HERO SECTION (Requirement #2) ───────────────────────── */}
      <section className="text-center space-y-6 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-bold">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>Personal Pattern Engine</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Your Personal Patterns
          </h1>
          <p className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-600 via-amber-600 to-indigo-600 dark:from-purple-300 dark:via-amber-300 dark:to-indigo-300 bg-clip-text text-transparent">
            Your journey is unique. Your patterns should be too.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
            Record meaningful moments from your life and explore how they overlap with your personal astrology journey.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="cosmic-gradient-btn px-6 py-3.5 rounded-2xl text-xs font-black flex items-center gap-2 shadow-xl hover:scale-105 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Life Event</span>
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('patterns-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-700 dark:text-purple-300 font-black text-xs hover:bg-purple-500/20 transition-all flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-purple-500" />
            <span>Explore My Patterns</span>
          </button>
        </div>
      </section>

      {/* ── 2. NON-CAUSATION DISCLAIMER BANNER ──────────────────────── */}
      <section className="bg-slate-900/90 border border-amber-500/30 rounded-3xl p-5 flex items-start gap-3.5 text-xs text-slate-300">
        <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="text-amber-300 font-black">Personal Correlation & Non-Causation Disclaimer:</strong>
          <p className="leading-relaxed text-[11px] text-slate-300">
            AstroLive presents personal patterns, historical overlaps, and user-observed correlations based on your journal logs. AstroLive does not claim scientifically proven causal relationships with life events.
          </p>
        </div>
      </section>

      {/* ── 3. JOURNEY COMPLETENESS SCORE (Requirement #16) ─────────── */}
      <section className="glass-card-gold rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">Product Engagement Metric</span>
            <span className="text-xs">📈</span>
          </div>
          <h3 className="text-xl font-black text-white">Journey Completeness</h3>
          <p className="text-xs text-slate-300 max-w-md">
            The more events, consultations, and predictions you log, the richer your personal patterns become.
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-2 text-[11px] text-slate-300">
            <span className="bg-slate-950/60 px-2.5 py-1 rounded-lg border border-slate-800">Birth Profile ✓</span>
            <span className="bg-slate-950/60 px-2.5 py-1 rounded-lg border border-slate-800">{journeyEvents.length} Life Events ✓</span>
            <span className="bg-slate-950/60 px-2.5 py-1 rounded-lg border border-slate-800">3 Consultations ✓</span>
            <span className="bg-slate-950/60 px-2.5 py-1 rounded-lg border border-slate-800">{predictions.length} Predictions ✓</span>
          </div>
        </div>

        <div className="text-center bg-slate-950/80 border border-amber-500/30 rounded-3xl p-6 min-w-[140px] shrink-0">
          <span className="text-4xl font-black text-amber-300 block">72%</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mt-1">Completeness</span>
        </div>
      </section>

      {/* ── 4. PERSONAL THEMES QUICK FILTERS (Requirement #11) ───────── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-black text-slate-900 dark:text-white">Personal Themes</h3>
          <span className="text-xs text-slate-500 dark:text-slate-400">Filter timeline by category</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {themes.map((t) => (
            <button
              key={t.cat}
              onClick={() => setSelectedCategory(selectedCategory === t.cat ? 'All' : t.cat)}
              className={`rounded-2xl p-4 text-center space-y-1 transition-all border ${
                selectedCategory === t.cat
                  ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-md scale-105'
                  : 'glass-card border-slate-800 hover:border-purple-500/40 text-slate-300'
              }`}
            >
              <div className="text-2xl">{t.icon}</div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">{t.cat}</p>
              <span className="text-[10px] text-slate-400 block font-mono">{t.count} events</span>
            </button>
          ))}
        </div>
      </section>

      {/* ── 5. AI PATTERN ENGINE TRIGGER (Requirements #7, #10) ──────── */}
      <section id="patterns-section" className="glass-card-purple rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-black uppercase text-purple-300 tracking-wider block">AI-Powered Journey Discovery</span>
            <h2 className="text-2xl font-black text-white mt-1">Personal Pattern Engine</h2>
            <p className="text-xs text-slate-300 mt-1">
              Compare your historical life events with planetary transits to discover personal life themes.
            </p>
          </div>

          <button
            onClick={handleRunAnalysis}
            disabled={isAnalyzing}
            className="cosmic-gradient-btn px-6 py-3.5 rounded-2xl text-xs font-black shadow-xl flex items-center gap-2 shrink-0 disabled:opacity-50"
          >
            <RotateCw className={`w-4 h-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
            <span>{isAnalyzing ? 'Analyzing Journey…' : 'Analyze My Patterns'}</span>
          </button>
        </div>

        {/* Processing Animation Display (Requirement #10) */}
        {isAnalyzing && (
          <div className="bg-slate-950/80 border border-purple-500/40 rounded-2xl p-6 space-y-3 animate-in fade-in duration-200">
            <p className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-2">
              <RotateCw className="w-4 h-4 animate-spin text-purple-400" /> Analyzing your journey…
            </p>
            <div className="space-y-2 text-xs font-mono text-slate-300">
              <p className={analysisStep >= 1 ? 'text-emerald-400 font-bold' : 'text-slate-500'}>✓ Step 1: Reading life events & timestamps</p>
              <p className={analysisStep >= 2 ? 'text-emerald-400 font-bold' : 'text-slate-500'}>✓ Step 2: Comparing dates & planetary transits</p>
              <p className={analysisStep >= 3 ? 'text-emerald-400 font-bold' : 'text-slate-500'}>✓ Step 3: Reviewing consultation history</p>
              <p className={analysisStep >= 4 ? 'text-emerald-400 font-bold' : 'text-slate-500'}>✓ Step 4: Identifying recurring themes</p>
              <p className={analysisStep >= 5 ? 'text-emerald-400 font-bold' : 'text-slate-500'}>✓ Step 5: Creating personal reflection</p>
            </div>
          </div>
        )}

        {/* Pattern Found Results Display (Requirements #7, #8, #9, #10) */}
        <div className="space-y-6 pt-2">
          {patterns.map((pat) => (
            <div
              key={pat.id}
              className="bg-slate-950/80 border border-purple-500/30 rounded-3xl p-6 space-y-4 hover:border-purple-500/50 transition-all"
            >
              {/* Pattern Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{pat.icon}</span>
                  <div>
                    <h4 className="text-base font-black text-white">{pat.title}</h4>
                    <span className="text-xs text-amber-300 font-semibold">{pat.timeRange}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full border border-purple-500/30">
                    Pattern Found
                  </span>
                  {/* Neutral Metric (Requirement #10 - NO fake scientific %) */}
                  <span className="text-[10px] font-mono text-slate-300 bg-slate-900 px-2.5 py-1 rounded-full border border-slate-800">
                    {pat.relatedEventsCount} related events
                  </span>
                </div>
              </div>

              {/* Summary & Observation */}
              <div className="space-y-2 text-xs">
                <p className="text-slate-200 font-semibold">{pat.summary}</p>
                <div className="bg-purple-950/50 border border-purple-500/25 rounded-2xl p-3.5 text-purple-200 italic">
                  "<strong className="text-amber-300">Observation:</strong> {pat.observation}"
                </div>
              </div>

              {/* Pattern Detail Visual Progression Timeline (Requirement #8) */}
              <div className="space-y-2 pt-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                  Progression Timeline & Transit Overlay:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                  {pat.events.map((ev, idx) => (
                    <div key={idx} className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 space-y-1 relative">
                      <span className="text-[10px] font-mono font-bold text-amber-400 block">{ev.year}</span>
                      <p className="font-bold text-white text-xs">{ev.title}</p>
                      <span className="text-[10px] text-purple-300 block">{ev.context}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mock AI Insight & Reflection Section (Requirement #9) */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                  <Sparkles className="w-4 h-4 text-amber-400" /> Your Personal Pattern Insight
                </div>
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{pat.aiInsight}"
                </p>

                <div className="pt-2 border-t border-slate-800 space-y-2">
                  <label className="block text-xs font-bold text-slate-300">
                    Reflect on this: <span className="text-slate-400 font-normal">{pat.reflectionQuestion}</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Write your personal reflection..."
                      value={reflectionInputs[pat.id] || pat.userReflection || ''}
                      onChange={(e) => setReflectionInputs({ ...reflectionInputs, [pat.id]: e.target.value })}
                      className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-purple-500"
                    />
                    <button
                      onClick={() => handleSaveReflection(pat.id)}
                      className="px-4 py-2 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-bold text-xs shrink-0 transition-colors"
                    >
                      Save Reflection
                    </button>
                  </div>
                  {pat.userReflection && (
                    <p className="text-[11px] text-emerald-400 font-medium">✓ Saved: "{pat.userReflection}"</p>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* ── 6. LIFE EVENT JOURNAL & TIMELINE (Requirements #3, #4) ────── */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">My Life Events Journal</h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Chronological history of your logged moments and reflections</p>
          </div>

          <div className="flex items-center gap-3">
            {selectedCategory !== 'All' && (
              <button
                onClick={() => setSelectedCategory('All')}
                className="text-xs text-amber-400 font-bold hover:underline"
              >
                Clear Filter ({selectedCategory})
              </button>
            )}
            <button
              onClick={() => setShowAddModal(true)}
              className="cosmic-gradient-btn px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add Life Event</span>
            </button>
          </div>
        </div>

        {/* Journal Timeline Grid */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-amber-500/30 space-y-6">
          {filteredEvents.map((ev) => (
            <div key={ev.id} className="relative group">
              {/* Timeline Dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-2 w-5 h-5 rounded-full bg-slate-950 border-2 border-amber-400 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-amber-400 group-hover:scale-125 transition-all" />
              </div>

              {/* Event Card */}
              <div
                onClick={() => setSelectedEventForDetail(ev)}
                className="glass-card rounded-3xl p-5 space-y-3 cursor-pointer hover:border-amber-500/50 transition-all"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-md border border-amber-500/20">
                      {ev.date}
                    </span>
                    <h4 className="text-sm font-bold text-white">{ev.title}</h4>
                  </div>

                  <div className="flex items-center gap-2">
                    {ev.mood && (
                      <span className="text-[10px] bg-slate-900 text-slate-300 px-2 py-0.5 rounded-full border border-slate-800">
                        {ev.mood}
                      </span>
                    )}
                    <span className="text-[10px] font-bold text-purple-300 bg-purple-500/20 px-2.5 py-0.5 rounded-full border border-purple-500/30">
                      {ev.category}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {ev.description}
                </p>

                {/* Astrological Context & Reflection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="bg-slate-950/70 p-3 rounded-2xl border border-slate-800/80 text-xs">
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                      Astrological Context
                    </span>
                    <p className="text-[11px] text-slate-300">{ev.astrologicalContext}</p>
                  </div>

                  <div className="bg-slate-950/70 p-3 rounded-2xl border border-slate-800/80 text-xs">
                    <span className="text-[10px] font-bold text-purple-300 uppercase tracking-wider block mb-1">
                      Personal Reflection
                    </span>
                    <p className="text-[11px] text-slate-300 italic">"{ev.userReflection || 'Reflected in journal'}"</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. MOOD & REFLECTION HISTORY CHART (Requirement #12) ──────── */}
      <section className="glass-card rounded-3xl p-6 space-y-4 border-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Self-Reflection Tracker</span>
            <h3 className="text-lg font-black text-white mt-0.5">Your Personal Reflection History</h3>
            <p className="text-xs text-slate-400">Framed strictly as personal journal reflection notes</p>
          </div>
          <Smile className="w-6 h-6 text-amber-400" />
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 space-y-1">
            <span className="text-2xl">😊</span>
            <p className="text-xs font-bold text-emerald-300">Positive</p>
            <p className="text-xl font-black text-white">{positiveMoods}</p>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 space-y-1">
            <span className="text-2xl">😐</span>
            <p className="text-xs font-bold text-amber-300">Neutral</p>
            <p className="text-xl font-black text-white">{neutralMoods}</p>
          </div>

          <div className="bg-purple-500/10 border border-purple-500/30 rounded-2xl p-4 space-y-1">
            <span className="text-2xl">😔</span>
            <p className="text-xs font-bold text-purple-300">Difficult</p>
            <p className="text-xl font-black text-white">{difficultMoods}</p>
          </div>
        </div>
      </section>

      {/* ── 8. LONG-TERM PERSONALIZATION & AI INSIGHT (Requirements #17, #18) ── */}
      <section className="glass-card-gold rounded-3xl p-6 sm:p-8 space-y-5">
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">Long-Term Journey Personalization</span>
          <h3 className="text-xl font-black text-white">Your Current Focus: Career Transitions</h3>
          <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
            Most of your recent journey activity and consultation notes revolve around professional decisions and executive roles.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={() => {
              trackPatternToConsultationClicked({ focus: 'Career' });
              setActiveTab('astrologers');
            }}
            className="cosmic-gradient-btn px-5 py-3 rounded-2xl text-xs font-black shadow-lg flex items-center gap-2"
          >
            <Briefcase className="w-4 h-4" /> Explore Career Astrologers →
          </button>

          <button
            onClick={() => {
              trackPatternInsightGenerated({ focus: 'Career' });
              setActiveTab('ai-insight');
            }}
            className="px-5 py-3 rounded-2xl bg-slate-900 border border-slate-700 text-slate-200 text-xs font-bold hover:bg-slate-800 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-purple-400" /> Generate Career AI Insight
          </button>
        </div>
      </section>

      {/* ── 9. RETENTION LOOP VISUAL STRIP (Requirement #23) ─────────── */}
      <section className="glass-card rounded-3xl p-6 space-y-4 border-slate-800">
        <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider text-center">
          The Personal Pattern Retention Flywheel
        </h3>
        <div className="flex flex-wrap items-center justify-between gap-2 text-center text-xs">
          {[
            { step: '1', title: 'Log Life Event' },
            { step: '2', title: 'Journey Remembers' },
            { step: '3', title: 'Pattern Appears' },
            { step: '4', title: 'Personal AI Insight' },
            { step: '5', title: 'Consult Astrologer' },
            { step: '6', title: 'Added to Journey' }
          ].map((s, idx) => (
            <React.Fragment key={idx}>
              <div className="flex-1 min-w-[100px] bg-slate-900/80 rounded-2xl p-2.5 border border-slate-800 space-y-0.5">
                <span className="text-[10px] font-bold text-amber-400 block">Step {s.step}</span>
                <p className="font-bold text-white text-[11px]">{s.title}</p>
              </div>
              {idx < 5 && <ChevronRight className="w-3.5 h-3.5 text-slate-600 hidden md:block shrink-0" />}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* ── 10. PRIVACY SECTION (Requirement #19) ──────────────────── */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 text-center max-w-xl mx-auto space-y-3">
        <div className="w-10 h-10 rounded-2xl bg-slate-800 flex items-center justify-center text-xl mx-auto">
          🔒
        </div>
        <h3 className="text-base font-black text-white">Private Journal</h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Your life events and reflections are private and are not publicly visible to other users or astrologers.
        </p>

        <button
          onClick={() => {
            if (window.confirm('Are you sure you want to delete your entire journey history?')) {
              deleteEntireJourney();
            }
          }}
          className="text-xs font-bold text-red-400 hover:text-red-300 underline pt-2 inline-block"
        >
          Delete Entire Journey Data
        </button>
      </section>

      {/* ── 11. BUSINESS VALUE SECTION (Requirement #22) ────────────── */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-black text-slate-900 dark:text-white">Why Personal Patterns Matter</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Creating long-term retention through first-party reflection data</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card rounded-3xl p-6 space-y-3 border-purple-500/20">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <span className="text-xl">👤</span> For Users
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" /> Deeply personalized reflection journal</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" /> Long-term consultation continuity</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" /> Meaningful self-observation over time</li>
            </ul>
          </div>

          <div className="glass-card rounded-3xl p-6 space-y-3 border-amber-500/20">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <span className="text-xl">✨</span> For AstroLive
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Multi-month user retention & daily engagement</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Higher repeat consultation probability</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Unique competitive personalization moat</li>
            </ul>
          </div>
        </div>
      </section>


      {/* ── MODAL 1: Add Life Event Form (Requirement #4) ──────────── */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#0f1226] border border-purple-500/30 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-purple-400" /> Record Life Event
              </h3>
              <p className="text-xs text-slate-400">Save a meaningful milestone to your personal reflection journal</p>
            </div>

            <form onSubmit={handleAddEventSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Event Title <span className="text-purple-400">*</span></label>
                <input
                  type="text"
                  required
                  placeholder='e.g. "Job interview" or "Relationship milestone"'
                  value={newEventForm.title}
                  onChange={(e) => setNewEventForm({ ...newEventForm, title: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500 text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Category</label>
                  <select
                    value={newEventForm.category}
                    onChange={(e) => setNewEventForm({ ...newEventForm, category: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none text-xs"
                  >
                    <option value="Career">💼 Career</option>
                    <option value="Love">❤️ Love & Relationship</option>
                    <option value="Education">🎓 Education</option>
                    <option value="Finance">💰 Finance</option>
                    <option value="Family">🏡 Family</option>
                    <option value="Business">🚀 Business</option>
                    <option value="Travel">✈️ Travel</option>
                    <option value="Personal Growth">🧘 Personal Growth</option>
                    <option value="Other">🔮 Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Date</label>
                  <input
                    type="date"
                    value={newEventForm.date}
                    onChange={(e) => setNewEventForm({ ...newEventForm, date: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Time (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. 10:00 AM"
                    value={newEventForm.time}
                    onChange={(e) => setNewEventForm({ ...newEventForm, time: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Location (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. New Delhi"
                    value={newEventForm.location}
                    onChange={(e) => setNewEventForm({ ...newEventForm, location: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="How did this event affect you?"
                  value={newEventForm.description}
                  onChange={(e) => setNewEventForm({ ...newEventForm, description: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500 text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-2">Mood / Feelings:</label>
                <div className="grid grid-cols-3 gap-2">
                  {['😊 Positive', '😐 Neutral', '😔 Difficult'].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setNewEventForm({ ...newEventForm, mood: m })}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                        newEventForm.mood === m
                          ? 'bg-purple-500/20 border-purple-400 text-purple-300'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-[10px] text-slate-400 flex items-center gap-1.5">
                <Lock className="w-3 h-3 text-slate-400 shrink-0" />
                <span>Private & secure. Do not collect unnecessary sensitive information.</span>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-3 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl cosmic-gradient-btn font-black text-xs shadow-lg"
                >
                  Save Life Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


      {/* ── MODAL 2: Event Detail & Astrological Context (Requirements #5, #6) ── */}
      {selectedEventForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#0f1226] border border-purple-500/30 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 relative">
            <button
              onClick={() => setSelectedEventForDetail(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-purple-300 uppercase tracking-wider">{selectedEventForDetail.category}</span>
              <h3 className="text-xl font-black text-white">{selectedEventForDetail.title}</h3>
              <span className="text-xs text-amber-400 font-mono block">{selectedEventForDetail.date}</span>
            </div>

            {selectedEventForDetail.description && (
              <p className="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
                "{selectedEventForDetail.description}"
              </p>
            )}

            {/* Astrological Context Card (Requirement #6) */}
            <div className="glass-card-purple rounded-2xl p-4 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-purple-300">Astrological Context</span>
                <span className="text-[9px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold">
                  Prototype interpretation
                </span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                "{selectedEventForDetail.astrologicalContext || 'Based on your saved birth profile and the date of this event, AstroLive displays relevant transit context.'}"
              </p>
            </div>

            {/* Reflection / Outcome Section (Requirement #5) */}
            <div className="space-y-3 pt-1">
              <span className="text-xs font-bold text-slate-300 block">Personal Reflection & Outcome</span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {['Successful', 'Partially successful', 'Unsuccessful', 'Still waiting'].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setEventOutcome(opt)}
                    className={`p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                      eventOutcome === opt
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <button
                onClick={() => {
                  deleteJourneyEvent(selectedEventForDetail.id);
                  setSelectedEventForDetail(null);
                }}
                className="text-xs text-red-400 hover:text-red-300 font-bold flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete Event
              </button>

              <button
                onClick={() => {
                  showToast('💾 Reflection outcome updated!', 'success');
                  setSelectedEventForDetail(null);
                }}
                className="cosmic-gradient-btn px-5 py-2.5 rounded-xl text-xs font-black"
              >
                Save Outcome
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
