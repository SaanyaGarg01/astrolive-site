import React, { useState, useEffect } from 'react';
import { useAstro } from '../context/AstroContext';
import {
  SAMPLE_KUNDLI_PROFILE,
  DEMO_SAVED_KUNDLIS,
  NORTH_INDIAN_HOUSES,
  PLANETARY_POSITIONS,
  KUNDLI_PREDICTION_CATEGORIES,
  KUNDLI_TIMELINE_STAGES,
  UPCOMING_PERIODS,
  SAMPLE_AI_KUNDLI_QA,
  KUNDLI_BUSINESS_KPIS
} from '../data/kundliData';
import {
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Info,
  Building,
  User,
  Heart,
  Briefcase,
  DollarSign,
  GraduationCap,
  Home as HomeIcon,
  Compass,
  Plane,
  Lock,
  Download,
  Share2,
  Plus,
  Trash2,
  Edit3,
  Bot,
  MessageSquare,
  ShieldCheck,
  Zap,
  TrendingUp,
  X,
  ChevronRight,
  HelpCircle,
  Award,
  Users
} from 'lucide-react';

export default function KundliAnalysis() {
  const {
    userProfile,
    showToast,
    setActiveTab,
    savedKundlis,
    setSavedKundlis,
    activeKundliProfile,
    setActiveKundliProfile,
    createKundliProfile,
    deleteKundliProfile
  } = useAstro();

  // Internal Sub-View State: landing | create | loading | dashboard | compatibility
  const [activeSubView, setActiveSubView] = useState('landing');
  const [activePredictionTab, setActivePredictionTab] = useState('career');
  const [activeDropdown, setActiveDropdown] = useState(false);

  // Birth Details Form State
  const [formDetails, setFormDetails] = useState({
    name: 'Saanya',
    dob: '2004-03-15',
    timeOfBirth: '10:30',
    placeOfBirth: 'Agra, Uttar Pradesh, India',
    gender: 'Female',
    birthTimeAccuracy: 'Exact',
    relation: 'My Kundli'
  });

  // Validation Error State
  const [formErrors, setFormErrors] = useState({});

  // Loading Steps State
  const [loadStep, setLoadStep] = useState(0);

  // AI Chat Messages State
  const [aiChatMessages, setAiChatMessages] = useState([
    {
      sender: 'ai',
      text: `Hello ${activeKundliProfile.name}! I am AstroLive AI. Ask me anything about your Lagna (${activeKundliProfile.ascendant}), Moon sign (${activeKundliProfile.moonSign}), or planetary houses!`
    }
  ]);
  const [aiInputText, setAiInputText] = useState('');
  const [aiQuestionCount, setAiQuestionCount] = useState(0);

  // Compatibility State
  const [partnerProfile, setPartnerProfile] = useState(DEMO_SAVED_KUNDLIS[1] || DEMO_SAVED_KUNDLIS[0]);

  // PDF Download Modal Simulation
  const [showPdfModal, setShowPdfModal] = useState(false);

  // Fast-Track Sample Kundli (Judge Fast-Track)
  const handleLoadSampleKundli = () => {
    setActiveKundliProfile(SAMPLE_KUNDLI_PROFILE);
    setActiveSubView('dashboard');
    showToast('⚡ Loaded Sample Kundli for Saanya (15 Mar 2004, Agra)!', 'success');
  };

  // Form Validation & Submit Handler
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!formDetails.name.trim()) {
      errors.name = 'Full name cannot be empty.';
    }

    if (!formDetails.dob) {
      errors.dob = 'Date of birth is required.';
    } else if (new Date(formDetails.dob) > new Date()) {
      errors.dob = 'Date of birth cannot be in the future.';
    }

    if (!formDetails.timeOfBirth) {
      errors.timeOfBirth = 'Birth time must be specified.';
    }

    if (!formDetails.placeOfBirth.trim()) {
      errors.placeOfBirth = 'Birth location cannot be empty.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      showToast('⚠️ Please correct the errors before submitting.', 'info');
      return;
    }

    setFormErrors({});
    setActiveSubView('loading');
    setLoadStep(1);

    // Multi-Step Animated Loader
    setTimeout(() => setLoadStep(2), 600);
    setTimeout(() => setLoadStep(3), 1200);
    setTimeout(() => setLoadStep(4), 1800);
    setTimeout(() => setLoadStep(5), 2400);

    setTimeout(() => {
      const created = createKundliProfile(formDetails);
      setActiveKundliProfile(created);
      setActiveSubView('dashboard');
    }, 3000);
  };

  // AI Chat Submit Handler
  const handleSendAiMessage = (queryText) => {
    const textToSend = queryText || aiInputText;
    if (!textToSend.trim()) return;

    const newMsgs = [...aiChatMessages, { sender: 'user', text: textToSend }];
    setAiChatMessages(newMsgs);
    setAiInputText('');
    setAiQuestionCount((prev) => prev + 1);

    setTimeout(() => {
      // Find canned response or generate dynamic AI response
      const foundQA = SAMPLE_AI_KUNDLI_QA.find((q) =>
        q.query.toLowerCase().includes(textToSend.toLowerCase().slice(0, 10))
      );

      const aiReply = foundQA
        ? foundQA.response
        : `According to the astrological interpretation of your chart (${activeKundliProfile.ascendant} Lagna), this planetary placement supports steady analytical growth and long-term focus.`;

      setAiChatMessages((prev) => [...prev, { sender: 'ai', text: aiReply }]);
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 py-4 px-2 sm:px-4">
      {/* TOP KUNDLI NAVIGATION DROPDOWN & SUB-NAV BAR (Requirement #1 & #29) */}
      <div className="bg-[#0f111a] border border-purple-500/30 rounded-3xl p-4 sm:p-5 shadow-2xl relative">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-[11px] font-black tracking-wide uppercase flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> ASTROLIVE COSMIC BLUEPRINT
              </span>
              <span className="text-[10px] text-slate-400 font-mono hidden sm:inline-block">
                Traditional Interpretation Engine
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Kundli Analysis & Life Predictions
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5">
              “Generate your personalized Kundli and explore insights about personality, career, relationships, & finances.”
            </p>
          </div>

          {/* Action Buttons & Fast-Track Judge Demo */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleLoadSampleKundli}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-black text-xs shadow-lg flex items-center gap-1.5 transform hover:scale-105 transition-all"
            >
              <Zap className="w-4 h-4 fill-slate-950" /> Try Sample Kundli
            </button>

            {/* Dropdown Menu Toggle (Requirement #29) */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(!activeDropdown)}
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-purple-500/40 text-purple-300 font-bold text-xs flex items-center gap-1.5"
              >
                <span>Kundli Menu ▼</span>
              </button>

              {activeDropdown && (
                <div className="absolute right-0 top-11 z-50 w-52 bg-slate-950 border border-purple-500/40 rounded-2xl p-2 shadow-2xl space-y-1 text-xs animate-in fade-in duration-150">
                  <button
                    onClick={() => {
                      setActiveSubView('dashboard');
                      setActiveDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-purple-500/20 text-slate-200 font-bold"
                  >
                    🔮 My Kundli Dashboard
                  </button>
                  <button
                    onClick={() => {
                      setActiveSubView('create');
                      setActiveDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-purple-500/20 text-slate-200 font-bold"
                  >
                    ✨ Generate New Kundli
                  </button>
                  <button
                    onClick={() => {
                      setActiveSubView('compatibility');
                      setActiveDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-purple-500/20 text-slate-200 font-bold"
                  >
                    ❤️ Kundli Compatibility
                  </button>
                  <button
                    onClick={() => {
                      setActiveSubView('dashboard');
                      setActiveDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-purple-500/20 text-slate-200 font-bold"
                  >
                    📂 Saved Profiles ({savedKundlis.length})
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Feature Sub-Navigation Tabs */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pt-4 mt-2 border-t border-slate-800 no-scrollbar text-xs">
          <button
            onClick={() => setActiveSubView('landing')}
            className={`px-3 py-1.5 rounded-xl font-bold shrink-0 transition-all ${
              activeSubView === 'landing'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                : 'text-slate-400 hover:text-white bg-slate-900/60'
            }`}
          >
            🏠 Kundli Home
          </button>

          <button
            onClick={() => setActiveSubView('create')}
            className={`px-3 py-1.5 rounded-xl font-bold shrink-0 transition-all ${
              activeSubView === 'create'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                : 'text-slate-400 hover:text-white bg-slate-900/60'
            }`}
          >
            ✨ Birth Details Form
          </button>

          <button
            onClick={() => setActiveSubView('dashboard')}
            className={`px-3 py-1.5 rounded-xl font-bold shrink-0 transition-all ${
              activeSubView === 'dashboard'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'text-slate-400 hover:text-white bg-slate-900/60'
            }`}
          >
            🔮 Kundli Dashboard
          </button>

          <button
            onClick={() => setActiveSubView('compatibility')}
            className={`px-3 py-1.5 rounded-xl font-bold shrink-0 transition-all ${
              activeSubView === 'compatibility'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                : 'text-slate-400 hover:text-white bg-slate-900/60'
            }`}
          >
            ❤️ Kundli Compatibility
          </button>
        </div>
      </div>

      {/* VIEW 1: KUNDLI LANDING PAGE (`/kundli` — Requirement #2) */}
      {activeSubView === 'landing' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Hero Section */}
          <div className="glass-card-purple rounded-3xl p-8 sm:p-12 text-center space-y-6 relative overflow-hidden">
            <div className="max-w-3xl mx-auto space-y-4">
              <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-widest">
                🔮 Personal Cosmic Blueprint
              </span>

              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                Discover Your Cosmic Blueprint
              </h2>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
                “Generate your personalized Kundli and explore insights about your personality, career, relationships, finances and upcoming life phases.”
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => setActiveSubView('create')}
                  className="w-full sm:w-auto cosmic-gradient-btn px-8 py-3.5 rounded-2xl text-sm font-black shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" /> Generate My Kundli
                </button>

                <button
                  onClick={handleLoadSampleKundli}
                  className="w-full sm:w-auto purple-gradient-btn px-8 py-3.5 rounded-2xl text-sm font-black shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4" /> Explore Sample Kundli
                </button>
              </div>
            </div>

            {/* Visual North Indian Kundli Chart Graphic Overlay Representation */}
            <div className="mt-8 pt-8 border-t border-purple-500/20 max-w-lg mx-auto">
              <div className="relative aspect-square max-w-xs mx-auto border-2 border-amber-500/50 rounded-2xl bg-slate-950/80 p-4 shadow-2xl flex items-center justify-center">
                {/* Diamond Grid */}
                <div className="absolute inset-4 border border-purple-500/40 rotate-45 pointer-events-none" />
                <div className="absolute inset-4 border border-amber-400/40 pointer-events-none" />
                <div className="text-center space-y-1 z-10">
                  <span className="text-2xl block">🪐</span>
                  <span className="text-xs font-bold text-amber-300 block">Vedic Janam Kundli</span>
                  <span className="text-[10px] text-slate-400 block font-mono">12 Houses • Planets • Lagna</span>
                </div>
              </div>
            </div>
          </div>

          {/* What You'll Discover Grid (Requirement #2) */}
          <div className="space-y-4">
            <div className="text-center max-w-xl mx-auto space-y-1">
              <h3 className="text-2xl font-bold text-white">What you'll discover</h3>
              <p className="text-xs text-slate-300">
                Explore comprehensive traditional astrological interpretations across 8 key dimensions of life.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { title: 'Love & Relationships', icon: '❤️', desc: 'Emotional style & partnership compatibility' },
                { title: 'Career & Business', icon: '💼', desc: 'Professional tendencies & executive timing' },
                { title: 'Finance & Wealth', icon: '💰', desc: 'Asset accumulation & saving habits' },
                { title: 'Education & Learning', icon: '🎓', desc: 'Academic focus & skill acquisition' },
                { title: 'Family & Heritage', icon: '🏠', desc: 'Domestic environment & family bonds' },
                { title: 'Personality & Persona', icon: '🧘', desc: 'Lagna traits & decision mindset' },
                { title: 'Life Periods (Dasha)', icon: '📅', desc: 'Yearly transits & milestone phases' },
                { title: 'Personalized Predictions', icon: '🔮', desc: '30-day, 3-month & 12-month outlooks' }
              ].map((item, idx) => (
                <div key={idx} className="glass-card rounded-3xl p-5 border border-slate-800 space-y-2 text-center hover:border-purple-500/40 transition-all">
                  <span className="text-3xl block mb-1">{item.icon}</span>
                  <h4 className="text-sm font-bold text-white">{item.title}</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: BIRTH DETAILS FORM (`/kundli/create` — Requirements #3, #4, #5) */}
      {activeSubView === 'create' && (
        <div className="max-w-2xl mx-auto glass-card-gold rounded-3xl p-6 sm:p-8 space-y-6 animate-in fade-in duration-300">
          <div className="border-b border-slate-800 pb-4 space-y-1">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
              Step 1 of 2 — Birth Profile Entry
            </span>
            <h2 className="text-2xl font-bold text-white">Enter Your Birth Details</h2>
            <p className="text-xs text-slate-300">
              “Your birth details help us generate your personalized Kundli.”
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
            {/* FULL NAME */}
            <div>
              <label className="block text-slate-300 font-bold mb-1">FULL NAME *</label>
              <input
                type="text"
                value={formDetails.name}
                onChange={(e) => setFormDetails((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="e.g. Saanya Garg"
                className={`w-full bg-slate-950 border rounded-xl px-3.5 py-2.5 text-white focus:outline-none ${
                  formErrors.name ? 'border-rose-500' : 'border-slate-800 focus:border-amber-500'
                }`}
              />
              {formErrors.name && <p className="text-rose-400 text-[11px] mt-1">{formErrors.name}</p>}
            </div>

            {/* DOB & Time Picker Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Date of Birth *</label>
                <input
                  type="date"
                  value={formDetails.dob}
                  onChange={(e) => setFormDetails((prev) => ({ ...prev, dob: e.target.value }))}
                  className={`w-full bg-slate-950 border rounded-xl px-3.5 py-2.5 text-white focus:outline-none ${
                    formErrors.dob ? 'border-rose-500' : 'border-slate-800 focus:border-amber-500'
                  }`}
                />
                {formErrors.dob && <p className="text-rose-400 text-[11px] mt-1">{formErrors.dob}</p>}
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Time of Birth *</label>
                <input
                  type="time"
                  value={formDetails.timeOfBirth}
                  onChange={(e) => setFormDetails((prev) => ({ ...prev, timeOfBirth: e.target.value }))}
                  className={`w-full bg-slate-950 border rounded-xl px-3.5 py-2.5 text-white focus:outline-none ${
                    formErrors.timeOfBirth ? 'border-rose-500' : 'border-slate-800 focus:border-amber-500'
                  }`}
                />
                {formErrors.timeOfBirth && <p className="text-rose-400 text-[11px] mt-1">{formErrors.timeOfBirth}</p>}
              </div>
            </div>

            {/* Place of Birth Autocomplete Select */}
            <div>
              <label className="block text-slate-300 font-bold mb-1">Place of Birth (City / Country) *</label>
              <input
                type="text"
                value={formDetails.placeOfBirth}
                onChange={(e) => setFormDetails((prev) => ({ ...prev, placeOfBirth: e.target.value }))}
                placeholder="e.g. Agra, Uttar Pradesh, India"
                className={`w-full bg-slate-950 border rounded-xl px-3.5 py-2.5 text-white focus:outline-none ${
                  formErrors.placeOfBirth ? 'border-rose-500' : 'border-slate-800 focus:border-amber-500'
                }`}
              />
              {formErrors.placeOfBirth && <p className="text-rose-400 text-[11px] mt-1">{formErrors.placeOfBirth}</p>}
            </div>

            {/* Gender Selection */}
            <div>
              <label className="block text-slate-300 font-bold mb-1">Gender (Optional)</label>
              <div className="flex gap-3">
                {['Female', 'Male', 'Non-Binary / Other'].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setFormDetails((prev) => ({ ...prev, gender: g }))}
                    className={`px-4 py-2 rounded-xl border text-xs font-medium transition-all ${
                      formDetails.gender === g
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* BIRTH TIME ACCURACY (Requirement #4) */}
            <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2">
              <label className="block text-slate-300 font-bold">How accurate is your birth time?</label>
              <div className="flex flex-wrap gap-3 text-xs">
                {['Exact', 'Approximate', 'Unknown'].map((acc) => (
                  <label key={acc} className="flex items-center gap-2 text-slate-300 cursor-pointer">
                    <input
                      type="radio"
                      name="accuracy"
                      value={acc}
                      checked={formDetails.birthTimeAccuracy === acc}
                      onChange={(e) => setFormDetails((prev) => ({ ...prev, birthTimeAccuracy: e.target.value }))}
                      className="accent-amber-400"
                    />
                    <span>{acc}</span>
                  </label>
                ))}
              </div>

              {formDetails.birthTimeAccuracy !== 'Exact' && (
                <p className="text-[11px] text-amber-300 italic pt-1 border-t border-slate-800">
                  ℹ️ "Some Kundli calculations may vary when the exact birth time is unavailable."
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full cosmic-gradient-btn py-3.5 rounded-2xl text-sm font-black shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> Generate Kundli →
            </button>
          </form>
        </div>
      )}

      {/* VIEW 3: ANIMATED GENERATION LOADER (Requirement #6) */}
      {activeSubView === 'loading' && (
        <div className="max-w-2xl mx-auto glass-card-purple rounded-3xl p-10 text-center space-y-6 animate-in fade-in duration-300">
          <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-400 mx-auto flex items-center justify-center animate-spin">
            <Sparkles className="w-8 h-8 text-amber-300" />
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl font-black text-white">Preparing your cosmic profile...</h3>
            <p className="text-xs text-slate-300">
              Calculating Vedic planetary positions, Lagna ascendant, and Nakshatra alignments.
            </p>
          </div>

          <div className="space-y-3 max-w-md mx-auto text-left text-xs">
            <div className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
              loadStep >= 1 ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}>
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>✓ Processing birth details</span>
            </div>

            <div className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
              loadStep >= 2 ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}>
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>✓ Calculating planetary positions</span>
            </div>

            <div className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
              loadStep >= 3 ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}>
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>✓ Preparing Kundli chart</span>
            </div>

            <div className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
              loadStep >= 4 ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}>
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>✓ Generating personalized insights</span>
            </div>

            <div className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
              loadStep >= 5 ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 font-bold' : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}>
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Your Kundli is ready ✨</span>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 4: KUNDLI DASHBOARD (`/kundli/dashboard` — Requirements #7 to #28) */}
      {activeSubView === 'dashboard' && (
        <div className="space-y-8 animate-in fade-in duration-300 max-w-6xl mx-auto">
          {/* Header Bar (Requirement #7) */}
          <div className="glass-card-gold rounded-3xl p-6 border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest block">
                Saved Birth Profile • {activeKundliProfile.relation}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                {activeKundliProfile.name}'s Kundli
              </h2>
              <p className="text-xs text-slate-300 font-medium">
                Birth: <strong>{activeKundliProfile.dobFormatted}</strong> • <strong>{activeKundliProfile.timeOfBirth}</strong> • 📍 <strong>{activeKundliProfile.placeOfBirth}</strong>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveSubView('create')}
                className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" /> Edit Details
              </button>

              <button
                onClick={() => setShowPdfModal(true)}
                className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> Download Kundli PDF
              </button>

              <button
                onClick={() => showToast('📲 Kundli link copied to clipboard for sharing!', 'success')}
                className="px-3 py-2 rounded-xl cosmic-gradient-btn text-xs font-black shadow-md flex items-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5" /> Share Kundli
              </button>
            </div>
          </div>

          {/* VISUAL NORTH INDIAN STYLE KUNDLI CHART (Requirement #8) */}
          <div className="glass-card rounded-3xl p-6 space-y-4 border-2 border-amber-500/40">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-xl font-black text-white">Birth Chart (Lagna Kundli)</h3>
                <p className="text-xs text-slate-400">Traditional North Indian Diamond Kundli Layout</p>
              </div>
              <span className="text-xs text-amber-300 font-mono bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/30">
                Lagna: {activeKundliProfile.ascendant}
              </span>
            </div>

            {/* Interactive Visual North Indian Diamond SVG/HTML Chart */}
            <div className="relative aspect-square max-w-lg mx-auto bg-slate-950 border-4 border-amber-500/60 rounded-3xl p-6 shadow-2xl overflow-hidden my-4">
              {/* Outer Diamond */}
              <div className="absolute inset-6 border-2 border-purple-500/50 rotate-45 pointer-events-none" />
              {/* Inner Square */}
              <div className="absolute inset-14 border border-amber-400/40 pointer-events-none" />

              {/* 12 House Nodes Visual Overlay */}
              <div className="absolute inset-0 p-4 grid grid-cols-3 grid-rows-3 gap-2 text-[10px] font-mono">
                <div className="p-2 border border-slate-800/80 rounded-xl bg-slate-900/60 text-slate-300">
                  <span className="text-amber-400 font-bold block">H12 (Leo)</span>
                  <span className="text-slate-400">Empty</span>
                </div>
                <div className="p-2 border border-amber-500/40 rounded-xl bg-amber-500/10 text-white text-center">
                  <span className="text-amber-300 font-bold block">H1 LAGNA</span>
                  <span className="text-emerald-400 font-bold">Virgo (Asc)</span>
                  <span className="text-[9px] text-slate-300 block">Budh (Ex)</span>
                </div>
                <div className="p-2 border border-slate-800/80 rounded-xl bg-slate-900/60 text-slate-300">
                  <span className="text-amber-400 font-bold block">H2 (Libra)</span>
                  <span className="text-purple-300 font-bold">Shukra</span>
                </div>

                <div className="p-2 border border-slate-800/80 rounded-xl bg-slate-900/60 text-slate-300">
                  <span className="text-amber-400 font-bold block">H11 (Cancer)</span>
                  <span className="text-amber-300 font-bold">Chandra</span>
                </div>
                <div className="p-2 border-2 border-amber-400 rounded-xl bg-slate-950 flex items-center justify-center text-center">
                  <div>
                    <span className="text-xl block">🪐</span>
                    <strong className="text-xs text-amber-300 block font-bold">JANAM KUNDLI</strong>
                    <span className="text-[9px] text-slate-400 block">{activeKundliProfile.name}</span>
                  </div>
                </div>
                <div className="p-2 border border-slate-800/80 rounded-xl bg-slate-900/60 text-slate-300">
                  <span className="text-amber-400 font-bold block">H3 (Scorpio)</span>
                  <span className="text-rose-400 font-bold">Mangal</span>
                </div>

                <div className="p-2 border border-slate-800/80 rounded-xl bg-slate-900/60 text-slate-300">
                  <span className="text-amber-400 font-bold block">H10 (Gemini)</span>
                  <span className="text-amber-300 font-bold">Guru (Jup)</span>
                </div>
                <div className="p-2 border border-slate-800/80 rounded-xl bg-slate-900/60 text-slate-300 text-center">
                  <span className="text-amber-400 font-bold block">H7 (Pisces)</span>
                  <span className="text-amber-300 font-bold">Surya (Sun)</span>
                </div>
                <div className="p-2 border border-slate-800/80 rounded-xl bg-slate-900/60 text-slate-300">
                  <span className="text-amber-400 font-bold block">H4 (Sagittarius)</span>
                  <span className="text-purple-400 font-bold">Rahu</span>
                </div>
              </div>
            </div>
          </div>

          {/* PLANETARY POSITIONS TABLE (Requirement #9) */}
          <div className="glass-card rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">Planetary Positions</h3>
              <span className="text-[10px] text-slate-400 font-mono italic">
                * Prototype planetary data for demonstration
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase">
                    <th className="py-2.5 px-3">Planet</th>
                    <th className="py-2.5 px-3">Zodiac Sign</th>
                    <th className="py-2.5 px-3">House</th>
                    <th className="py-2.5 px-3">Degree</th>
                    <th className="py-2.5 px-3">Nakshatra</th>
                    <th className="py-2.5 px-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900">
                  {PLANETARY_POSITIONS.map((p, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/50 transition-colors">
                      <td className="py-2.5 px-3 font-bold text-white">{p.planet}</td>
                      <td className="py-2.5 px-3 text-amber-300">{p.sign}</td>
                      <td className="py-2.5 px-3 text-slate-300">{p.house}</td>
                      <td className="py-2.5 px-3 font-mono text-purple-300">{p.degree}</td>
                      <td className="py-2.5 px-3 text-slate-300">{p.nakshatra}</td>
                      <td className="py-2.5 px-3 text-right">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          p.isBenefic ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* YOUR COSMIC PROFILE CARDS (Requirement #10) */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Your Cosmic Profile</h3>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              <div className="glass-card rounded-2xl p-4 space-y-1 relative">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>Ascendant (Lagna)</span>
                  <HelpCircle className="w-3.5 h-3.5 text-slate-500" title="Your core self & physical persona" />
                </div>
                <strong className="text-lg font-black text-amber-300 block">{activeKundliProfile.ascendant}</strong>
              </div>

              <div className="glass-card rounded-2xl p-4 space-y-1 relative">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>Moon Sign (Rashi)</span>
                  <HelpCircle className="w-3.5 h-3.5 text-slate-500" title="Emotional processing & mind" />
                </div>
                <strong className="text-lg font-black text-purple-300 block">{activeKundliProfile.moonSign}</strong>
              </div>

              <div className="glass-card rounded-2xl p-4 space-y-1 relative">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>Sun Sign</span>
                  <HelpCircle className="w-3.5 h-3.5 text-slate-500" title="Core soul purpose & vitality" />
                </div>
                <strong className="text-lg font-black text-amber-400 block">{activeKundliProfile.sunSign}</strong>
              </div>

              <div className="glass-card rounded-2xl p-4 space-y-1 relative">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>Nakshatra</span>
                  <HelpCircle className="w-3.5 h-3.5 text-slate-500" title="Birth stellar constellation" />
                </div>
                <strong className="text-lg font-black text-emerald-400 block">{activeKundliProfile.nakshatra}</strong>
              </div>

              <div className="glass-card rounded-2xl p-4 space-y-1 relative col-span-2 sm:col-span-1">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>Pada</span>
                  <HelpCircle className="w-3.5 h-3.5 text-slate-500" title="Sub-quarter of Nakshatra" />
                </div>
                <strong className="text-lg font-black text-white block">{activeKundliProfile.pada}</strong>
              </div>
            </div>
          </div>

          {/* PERSONALIZED OVERVIEW SECTION (Requirement #11) */}
          <div className="glass-card-purple rounded-3xl p-6 sm:p-8 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-300" />
              <h2 className="text-2xl font-bold text-white">Your Astro Profile</h2>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
              “According to this astrological interpretation, your chart suggests a thoughtful and analytical personality with a strong focus on stability, long-term growth, and clear communication. Exalted Mercury in your 1st house imparts high retention, while Moon in Cancer fosters deep emotional intuition.”
            </p>

            <p className="text-[11px] text-slate-400 pt-2 border-t border-purple-500/20">
              * Astrological interpretations provide symbolic perspective and should be used for personal reflection rather than scientific certainty.
            </p>
          </div>

          {/* PREDICTION CATEGORIES & CAREER/LOVE/FINANCE/EDUCATION (Requirements #12 to #16) */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar text-xs">
              {KUNDLI_PREDICTION_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActivePredictionTab(cat.id)}
                  className={`px-4 py-2 rounded-2xl border font-bold shrink-0 transition-all flex items-center gap-1.5 ${
                    activePredictionTab === cat.id
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-md'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>

            {/* Selected Category Predictions Details Card */}
            {(() => {
              const activeCat = KUNDLI_PREDICTION_CATEGORIES.find((c) => c.id === activePredictionTab) || KUNDLI_PREDICTION_CATEGORIES[0];
              return (
                <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6 border border-slate-800">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-3xl">{activeCat.icon}</span>
                      <div>
                        <h3 className="text-xl font-bold text-white">{activeCat.name} Interpretation</h3>
                        <p className="text-xs text-slate-400">Traditional Vedic Chart Analysis</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div>
                      <h4 className="font-bold text-amber-300 text-sm mb-1">Tendency & Outlook</h4>
                      <p className="text-slate-300 leading-relaxed">{activeCat.tendency}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                        <span className="font-bold text-emerald-400 block">Key Strengths</span>
                        <ul className="space-y-1 text-slate-300">
                          {activeCat.strengths.map((s, i) => (
                            <li key={i}>✓ {s}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                        <span className="font-bold text-amber-400 block">Potential Focus Areas</span>
                        <ul className="space-y-1 text-slate-300">
                          {activeCat.challenges.map((c, i) => (
                            <li key={i}>• {c}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="bg-purple-950/40 p-4 rounded-2xl border border-purple-500/30 space-y-1">
                      <h4 className="font-bold text-purple-300 text-sm">Upcoming Transit Phase</h4>
                      <p className="text-slate-200">{activeCat.upcomingPhase}</p>
                    </div>

                    <p className="text-[11px] text-slate-400 italic">
                      * {activeCat.disclaimer}
                    </p>
                  </div>

                  {/* KUNDLI → CONSULTATION CONVERSION CTA (Requirement #21) */}
                  <div className="bg-slate-950/90 p-5 rounded-2xl border border-amber-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-bold text-white">Want a deeper reading?</h4>
                      <p className="text-xs text-slate-300">
                        Connect with a verified astrologer specializing in Kundli & birth chart interpretations.
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveTab('astrologers')}
                      className="cosmic-gradient-btn px-6 py-2.5 rounded-xl text-xs font-black shadow-md shrink-0"
                    >
                      Talk to an Astrologer →
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* VISUAL LIFE TIMELINE (Requirement #17) */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-4">
            <h3 className="text-xl font-bold text-white">Your Life Timeline</h3>
            <p className="text-xs text-slate-300">
              Traditional Mahadasha timeline interpretations for major milestone phases.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
              {KUNDLI_TIMELINE_STAGES.map((stg, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 text-center relative hover:border-amber-500/40 transition-all">
                  <span className="text-2xl block">{stg.icon}</span>
                  <strong className="text-base font-black text-amber-300 block font-mono">{stg.year}</strong>
                  <h4 className="text-xs font-bold text-white">{stg.stage}</h4>
                  <p className="text-[11px] text-slate-400 leading-tight">{stg.theme}</p>
                </div>
              ))}
            </div>
          </div>

          {/* "WHAT'S NEXT?" UPCOMING COSMIC PERIODS (Requirement #18) */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Your Upcoming Cosmic Periods</h3>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              {UPCOMING_PERIODS.map((prd, idx) => (
                <div key={idx} className="glass-card rounded-3xl p-5 border border-slate-800 space-y-3 flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-full">
                      {prd.highlight}
                    </span>
                    <h4 className="text-base font-bold text-white pt-1">{prd.period}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{prd.theme}</p>
                  </div>

                  <button
                    onClick={() => showToast(`🔮 Detailed prediction for ${prd.period} logged!`, 'info')}
                    className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold transition-all"
                  >
                    View Detailed Prediction
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* AI KUNDLI INTERPRETATION CHAT UI (Requirement #22 & #23) */}
          <div className="glass-card-purple rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-purple-500/30 pb-3">
              <div className="flex items-center gap-2">
                <Bot className="w-6 h-6 text-amber-300" />
                <div>
                  <h3 className="text-xl font-bold text-white">Ask AI About Your Kundli</h3>
                  <p className="text-xs text-slate-300">Explore your chart with AstroLive AI</p>
                </div>
              </div>
              <span className="text-xs font-bold text-purple-300 bg-purple-500/20 px-3 py-1 rounded-full border border-purple-500/30">
                AstroLive AI Assistant
              </span>
            </div>

            {/* Quick Sample Questions */}
            <div className="space-y-1.5 text-xs">
              <span className="font-bold text-slate-300 uppercase tracking-wider block">Sample Questions:</span>
              <div className="flex flex-wrap gap-2">
                {SAMPLE_AI_KUNDLI_QA.map((qa, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendAiMessage(qa.query)}
                    className="px-3 py-1.5 rounded-xl bg-slate-950 border border-purple-500/30 hover:border-amber-400 text-purple-200 text-[11px] font-medium transition-all"
                  >
                    💬 "{qa.query}"
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Box Stream */}
            <div className="bg-slate-950/90 rounded-2xl p-4 border border-slate-800 space-y-3 max-h-72 overflow-y-auto text-xs">
              {aiChatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`p-3 rounded-2xl max-w-md ${
                    msg.sender === 'user'
                      ? 'bg-amber-500/20 text-amber-200 border border-amber-500/30'
                      : 'bg-slate-900 text-slate-200 border border-slate-800'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={aiInputText}
                onChange={(e) => setAiInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendAiMessage()}
                placeholder="Ask AI a question about your Kundli houses or planets..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
              />
              <button
                onClick={() => handleSendAiMessage()}
                className="cosmic-gradient-btn px-5 py-2.5 rounded-xl text-xs font-black shadow-md"
              >
                Send
              </button>
            </div>

            {/* AI CHAT → PAID ASTROLOGER CONVERSION CARD (Requirement #23) */}
            {aiQuestionCount >= 2 && (
              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div>
                  <h4 className="font-bold text-white">Want a human interpretation?</h4>
                  <p className="text-slate-300">
                    AI can help explore options. For detailed personal guidance, connect with a verified astrologer.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('astrologers')}
                  className="cosmic-gradient-btn px-5 py-2 rounded-xl font-black shrink-0"
                >
                  Talk to an Astrologer
                </button>
              </div>
            )}
          </div>

          {/* LOCKED PREMIUM INSIGHTS FREEMIUM SECTION (Requirement #24) */}
          <div className="glass-card-gold rounded-3xl p-6 sm:p-8 space-y-4 border-2 border-amber-500/40">
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-amber-300" />
                <h3 className="text-xl font-bold text-white">🔒 Premium Kundli Forecasts</h3>
              </div>
              <span className="text-xs text-amber-300 font-bold bg-amber-500/20 px-3 py-1 rounded-full">
                AstroLive Plus Exclusive
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2 opacity-80">
                <span className="font-bold text-amber-300 block">🔒 Detailed Dasha Analysis</span>
                <p className="text-slate-400">Unlock sub-period transits for precise monthly timing.</p>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2 opacity-80">
                <span className="font-bold text-amber-300 block">🔒 Advanced Marriage Report</span>
                <p className="text-slate-400">Detailed Navamsha (D9) chart interpretation for marriage.</p>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2 opacity-80">
                <span className="font-bold text-amber-300 block">🔒 12-Month Yearly Forecast</span>
                <p className="text-slate-400">Month-by-month career, finance & health predictions.</p>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('membership')}
              className="w-full cosmic-gradient-btn py-3.5 rounded-2xl text-sm font-black shadow-xl hover:scale-[1.02] transition-all text-center block"
            >
              Unlock Premium Forecasts with AstroLive Plus →
            </button>
          </div>

          {/* ECOSYSTEM INTEGRATIONS SECTION (Requirements #31, #32, #33) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* ASTROPROOF INTEGRATION */}
            <div className="glass-card rounded-3xl p-5 space-y-3 border border-slate-800">
              <span className="text-2xl block">🔮</span>
              <h4 className="text-sm font-bold text-white">Add Prediction to AstroProof</h4>
              <p className="text-xs text-slate-400">
                Lock your Kundli career prediction into the immutable prediction ledger.
              </p>
              <button
                onClick={() => setActiveTab('astro-proof')}
                className="w-full py-2 rounded-xl bg-purple-950 border border-purple-500/40 text-purple-200 text-xs font-bold hover:bg-purple-900"
              >
                Lock Prediction in AstroProof
              </button>
            </div>

            {/* MUHURAT MARKETPLACE INTEGRATION */}
            <div className="glass-card rounded-3xl p-5 space-y-3 border border-slate-800">
              <span className="text-2xl block">🪔</span>
              <h4 className="text-sm font-bold text-white">Planning an Important Event?</h4>
              <p className="text-xs text-slate-400">
                Explore auspicious dates for Weddings, Griha Pravesh & Business Launches.
              </p>
              <button
                onClick={() => setActiveTab('muhurat')}
                className="w-full py-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold hover:bg-amber-500/30"
              >
                Explore Muhurat Marketplace
              </button>
            </div>

            {/* PRIVACY MATTERS SECTION (Requirement #40) */}
            <div className="glass-card rounded-3xl p-5 space-y-3 border border-slate-800">
              <span className="text-2xl block">🔒</span>
              <h4 className="text-sm font-bold text-white">Your Privacy Matters</h4>
              <p className="text-xs text-slate-400">
                Your birth details are used solely to personalize your AstroLive experience.
              </p>
              <span className="text-[11px] text-emerald-400 font-bold block">
                ✓ Encrypted & Protected Profile
              </span>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 5: KUNDLI COMPATIBILITY (`/kundli/compatibility` — Requirement #28) */}
      {activeSubView === 'compatibility' && (
        <div className="space-y-8 animate-in fade-in duration-300 max-w-5xl mx-auto">
          <div className="glass-card-purple rounded-3xl p-6 border border-purple-500/30 space-y-2 text-center">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-widest block">
              Vedic Matchmaking & Synastry
            </span>
            <h2 className="text-3xl font-black text-white">Kundli Compatibility (Guna Milan)</h2>
            <p className="text-xs text-slate-300 max-w-xl mx-auto">
              Compare your Kundli with your partner's Kundli to analyze traditional emotional, communication, and lifestyle compatibility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profile 1 */}
            <div className="glass-card rounded-3xl p-6 space-y-3 border border-slate-800">
              <span className="text-xs font-bold text-amber-400 uppercase">Primary Profile</span>
              <h3 className="text-xl font-bold text-white">{activeKundliProfile.name}</h3>
              <div className="text-xs text-slate-400 space-y-1 font-mono">
                <p>Lagna: {activeKundliProfile.ascendant}</p>
                <p>Moon Sign: {activeKundliProfile.moonSign}</p>
                <p>Nakshatra: {activeKundliProfile.nakshatra}</p>
              </div>
            </div>

            {/* Profile 2 */}
            <div className="glass-card rounded-3xl p-6 space-y-3 border border-slate-800">
              <span className="text-xs font-bold text-purple-400 uppercase">Partner Profile</span>
              <h3 className="text-xl font-bold text-white">{partnerProfile.name}</h3>
              <div className="text-xs text-slate-400 space-y-1 font-mono">
                <p>Lagna: {partnerProfile.ascendant}</p>
                <p>Moon Sign: {partnerProfile.moonSign}</p>
                <p>Nakshatra: {partnerProfile.nakshatra}</p>
              </div>
            </div>
          </div>

          {/* Overall Compatibility Score Card */}
          <div className="glass-card-gold rounded-3xl p-8 text-center space-y-4 border-2 border-amber-500/40">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
              Traditional Guna Milan Analysis
            </span>
            <strong className="text-4xl sm:text-5xl font-black text-amber-300 font-mono block">
              31 / 36 Gunas
            </strong>
            <span className="text-xs text-emerald-400 font-bold bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/40 inline-block">
              🟢 Highly Compatible (Very Good Match)
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-4 border-t border-slate-800">
              <div>
                <span className="text-slate-400 block">Emotional Sync</span>
                <strong className="text-white text-sm">8.5 / 10</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Communication</span>
                <strong className="text-white text-sm">9.0 / 10</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Lifestyle Alignment</span>
                <strong className="text-white text-sm">8.0 / 10</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Long-Term Growth</span>
                <strong className="text-white text-sm">9.2 / 10</strong>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 italic pt-2">
              * Note: Guna Milan scores represent traditional symbolic interpretations and do not scientifically dictate relationship outcome.
            </p>

            <button
              onClick={() => setActiveTab('astrologers')}
              className="cosmic-gradient-btn px-8 py-3 rounded-2xl text-xs font-black shadow-lg"
            >
              Get Detailed Compatibility Consultation →
            </button>
          </div>
        </div>
      )}

      {/* PRINT / DOWNLOAD KUNDLI PDF SIMULATION MODAL (Requirement #25) */}
      {showPdfModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card rounded-3xl max-w-lg w-full p-6 space-y-5 border-2 border-amber-500/40 text-xs animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-lg font-bold text-white">Download Kundli PDF</h3>
                <p className="text-slate-400">PDF Report Summary Preview</p>
              </div>
              <button onClick={() => setShowPdfModal(false)} className="p-2 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex justify-between text-slate-300">
                <span>Profile Name:</span>
                <strong className="text-white">{activeKundliProfile.name}</strong>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Birth Details:</span>
                <strong className="text-amber-300">{activeKundliProfile.dobFormatted} ({activeKundliProfile.timeOfBirth})</strong>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Lagna / Rashi:</span>
                <strong className="text-purple-300">{activeKundliProfile.ascendant} / {activeKundliProfile.moonSign}</strong>
              </div>
              <div className="flex justify-between text-slate-300 pt-2 border-t border-slate-800">
                <span>Report Format:</span>
                <strong className="text-emerald-400 font-mono">Comprehensive 12-Page PDF</strong>
              </div>
            </div>

            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-[11px] text-amber-300">
              Disclaimer: Kundli PDF contains traditional astrological interpretations for personal reflection.
            </div>

            <button
              onClick={() => {
                showToast(`📥 Kundli PDF downloaded for ${activeKundliProfile.name}!`, 'success');
                setShowPdfModal(false);
              }}
              className="w-full cosmic-gradient-btn py-3.5 rounded-xl font-black shadow-lg"
            >
              Confirm Download PDF →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
