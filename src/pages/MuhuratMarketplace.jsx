import React, { useState, useEffect } from 'react';
import { useAstro } from '../context/AstroContext';
import {
  MUHURAT_EVENT_TYPES,
  CITIES,
  GUEST_COUNT_OPTIONS,
  BUDGET_OPTIONS,
  VENDOR_CATEGORIES,
  DEMO_MUHURAT_RESULTS,
  DEMO_VENDORS,
  DEMO_PACKAGES,
  DEMO_BUSINESS_METRICS,
  DEMO_AI_ASSISTANT_QA
} from '../data/muhuratData';
import {
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  Info,
  Building,
  Star,
  Users,
  Tag,
  ShieldCheck,
  Search,
  Filter,
  ShoppingBag,
  TrendingUp,
  Award,
  ChevronRight,
  Plus,
  Trash2,
  Share2,
  Bot,
  Zap,
  DollarSign,
  ArrowRight,
  X,
  CreditCard,
  CheckCircle2,
  PieChart,
  Layers,
  HelpCircle,
  Send,
  ThumbsUp,
  RefreshCw,
  Gift
} from 'lucide-react';

export default function MuhuratMarketplace() {
  const {
    showToast,
    userProfile,
    muhuratSubView,
    setMuhuratSubView,
    selectedMuhuratEvent,
    setSelectedMuhuratEvent,
    myEventCart,
    setMyEventCart,
    addVendorToEvent,
    removeVendorFromEvent,
    myEventBookings,
    confirmVendorBooking,
    setActiveTab
  } = useAstro();

  // Active view tab inside Muhurat Marketplace
  const [activeTabSub, setActiveTabSub] = useState('landing'); // landing | setup | loading | results | vendors | my-event | business | vendor-portal
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [selectedCityFilter, setSelectedCityFilter] = useState('Delhi');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVendorDetail, setSelectedVendorDetail] = useState(null);
  
  // Modals state
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [vendorToBook, setVendorToBook] = useState(null);
  const [bookingConfirmedData, setBookingConfirmedData] = useState(null);
  const [showPartnerModal, setShowPartnerModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewVendor, setReviewVendor] = useState(null);
  const [userRating, setUserRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [showAIAssistant, setShowAIAssistant] = useState(false);

  // Form states for Muhurat Setup
  const [setupForm, setSetupForm] = useState({
    eventType: selectedMuhuratEvent.eventType || 'wedding',
    city: selectedMuhuratEvent.location || 'Delhi',
    dateFrom: '2026-11-01',
    dateTo: '2026-11-30',
    guests: selectedMuhuratEvent.guestCount || '250',
    budget: selectedMuhuratEvent.budget || '₹5–10 Lakh',
    requirements: selectedMuhuratEvent.specialRequirements || ''
  });

  // Calculation Loader state
  const [calcProgressStep, setCalcProgressStep] = useState(0);

  // Partner Onboarding Form
  const [partnerForm, setPartnerForm] = useState({
    businessName: '',
    category: 'venues',
    city: 'Delhi',
    phone: '',
    email: '',
    priceRange: '₹1 Lakh - ₹3 Lakh',
    submitted: false
  });

  // Sync subview if changed externally (e.g. from Consultation Summary)
  useEffect(() => {
    if (muhuratSubView && muhuratSubView !== 'landing') {
      setActiveTabSub(muhuratSubView);
    }
  }, [muhuratSubView]);

  // Handler for starting Muhurat calculation
  const handleStartCalculation = () => {
    setActiveTabSub('loading');
    setCalcProgressStep(1);

    setTimeout(() => setCalcProgressStep(2), 700);
    setTimeout(() => setCalcProgressStep(3), 1400);
    setTimeout(() => setCalcProgressStep(4), 2100);

    setTimeout(() => {
      setSelectedMuhuratEvent((prev) => ({
        ...prev,
        eventType: setupForm.eventType,
        location: setupForm.city,
        guestCount: setupForm.guests,
        budget: setupForm.budget,
        specialRequirements: setupForm.requirements
      }));
      setActiveTabSub('results');
    }, 2800);
  };

  // Pre-fill Judge Quick Demo
  const handleJudgeDemoFlow = () => {
    setSelectedMuhuratEvent({
      id: 'evt-demo-1',
      eventType: 'wedding',
      eventName: 'Wedding (Vivah)',
      location: 'Delhi',
      dateRangeFrom: '2026-11-01',
      dateRangeTo: '2026-11-30',
      selectedDate: 'Saturday, 14 November 2026',
      selectedDateISO: '2026-11-14',
      selectedTimeWindow: '9:12 AM – 11:05 AM',
      guestCount: '250',
      budget: '₹5–10 Lakh',
      specialRequirements: 'Sattvic veg menu & authentic floral mandap'
    });
    setActiveTabSub('vendors');
    showToast('⚡ Pre-loaded 3-Minute Judge Demo flow! Date matched to 14 Nov 2026.', 'success');
  };

  // Filtered vendors list
  const filteredVendors = DEMO_VENDORS.filter((v) => {
    const matchesCat = selectedCategoryFilter === 'all' || v.category === selectedCategoryFilter;
    const matchesCity = !selectedCityFilter || v.location.toLowerCase().includes(selectedCityFilter.toLowerCase());
    const matchesSearch = !searchQuery || v.name.toLowerCase().includes(searchQuery.toLowerCase()) || v.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesCity && matchesSearch;
  });

  // Calculate cart subtotal & status
  const cartSubtotal = myEventCart.reduce((sum, item) => sum + (item.numericPrice || 0), 0);
  const estimatedTaxes = Math.round(cartSubtotal * 0.18);
  const estimatedTotal = cartSubtotal + estimatedTaxes;

  // Checklist items (7 core wedding categories)
  const categoryChecklist = [
    { cat: 'venues', label: 'Venue', icon: '🏛️' },
    { cat: 'caterers', label: 'Catering', icon: '🍽️' },
    { cat: 'photographers', label: 'Photography', icon: '📸' },
    { cat: 'decorators', label: 'Decor', icon: '🌸' },
    { cat: 'priests', label: 'Priest / Pandit', icon: '🧑‍⚖️' },
    { cat: 'music', label: 'Music & DJ', icon: '🎵' },
    { cat: 'makeup', label: 'Makeup Artist', icon: '💄' }
  ];

  const bookedCategoryIds = myEventCart.map((i) => i.category);
  const bookedCount = categoryChecklist.filter((c) => bookedCategoryIds.includes(c.cat)).length;
  const missingCategories = categoryChecklist.filter((c) => !bookedCategoryIds.includes(c.cat));

  // AI Budget Optimization Action
  const handleApplyBudgetOptimization = () => {
    showToast('✨ AI Budget Optimization applied! Swapped venue option to save ₹35,000.', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 py-4 px-2 sm:px-4">
      {/* Top Header Banner & Sub-Navigation Pills */}
      <div className="bg-[#0f111a] border border-amber-500/30 rounded-3xl p-4 sm:p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[11px] font-black tracking-wide uppercase flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> ASTROLIVE COMMERCE ECOSYSTEM
              </span>
              <span className="text-[10px] text-slate-400 font-mono hidden sm:inline-block">
                Prototype / Illustrative Data
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Muhurat Marketplace
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5">
              “Find the right time. Plan the perfect event.” — Discover auspicious dates & date-matched vendors.
            </p>
          </div>

          {/* Action Buttons & Judge Fast-Track */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleJudgeDemoFlow}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs shadow-lg flex items-center gap-1.5 transform hover:scale-105 transition-all"
            >
              <Zap className="w-4 h-4 fill-slate-950" /> 3-Min Judge Demo
            </button>

            <button
              onClick={() => setActiveTabSub('business')}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-purple-500/40 text-purple-300 font-bold text-xs flex items-center gap-1.5"
            >
              <TrendingUp className="w-4 h-4 text-purple-400" /> Revenue Model & Analytics
            </button>
          </div>
        </div>

        {/* Feature Sub-Navigation Tabs */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pt-4 mt-2 border-t border-slate-800 no-scrollbar text-xs">
          <button
            onClick={() => setActiveTabSub('landing')}
            className={`px-3 py-1.5 rounded-xl font-bold shrink-0 transition-all ${
              activeTabSub === 'landing' || activeTabSub === 'setup'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'text-slate-400 hover:text-white bg-slate-900/60'
            }`}
          >
            📅 Event & Muhurat Setup
          </button>

          <button
            onClick={() => setActiveTabSub('results')}
            className={`px-3 py-1.5 rounded-xl font-bold shrink-0 transition-all ${
              activeTabSub === 'results'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'text-slate-400 hover:text-white bg-slate-900/60'
            }`}
          >
            ✨ Auspicious Dates
          </button>

          <button
            onClick={() => setActiveTabSub('vendors')}
            className={`px-3 py-1.5 rounded-xl font-bold shrink-0 transition-all ${
              activeTabSub === 'vendors'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'text-slate-400 hover:text-white bg-slate-900/60'
            }`}
          >
            🏛️ Date-Matched Vendors ({filteredVendors.length})
          </button>

          <button
            onClick={() => setActiveTabSub('my-event')}
            className={`px-3 py-1.5 rounded-xl font-bold shrink-0 transition-all relative ${
              activeTabSub === 'my-event'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                : 'text-slate-400 hover:text-white bg-slate-900/60'
            }`}
          >
            🛍️ My Event ({myEventCart.length})
            {myEventCart.length > 0 && (
              <span className="ml-1.5 px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 font-black text-[10px]">
                {myEventCart.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTabSub('business')}
            className={`px-3 py-1.5 rounded-xl font-bold shrink-0 transition-all ${
              activeTabSub === 'business'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-slate-400 hover:text-white bg-slate-900/60'
            }`}
          >
            📊 Business Dashboard
          </button>

          <button
            onClick={() => setActiveTabSub('vendor-portal')}
            className={`px-3 py-1.5 rounded-xl font-bold shrink-0 transition-all ${
              activeTabSub === 'vendor-portal'
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                : 'text-slate-400 hover:text-white bg-slate-900/60'
            }`}
          >
            🤝 Vendor Portal
          </button>
        </div>
      </div>

      {/* VIEW 1: HERO & LANDING PAGE */}
      {activeTabSub === 'landing' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Hero Section */}
          <div className="glass-card-gold rounded-3xl p-8 sm:p-12 text-center space-y-6 relative overflow-hidden">
            <div className="max-w-3xl mx-auto space-y-4">
              <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest">
                🪔 Astrology → Commerce Transition
              </span>

              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                Find the right time.<br />
                <span className="cosmic-text-gradient">Plan the perfect event.</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
                Discover celestial auspicious dates and book trusted event vendors matched to your chosen Muhurat timeframe.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => setActiveTabSub('setup')}
                  className="w-full sm:w-auto cosmic-gradient-btn px-8 py-3.5 rounded-2xl text-sm font-black shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" /> Find My Muhurat
                </button>

                <button
                  onClick={() => setActiveTabSub('vendors')}
                  className="w-full sm:w-auto purple-gradient-btn px-8 py-3.5 rounded-2xl text-sm font-black shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  <Building className="w-4 h-4" /> Explore Vendors
                </button>
              </div>
            </div>

            {/* Core USP Banner */}
            <div className="mt-8 pt-8 border-t border-amber-500/20 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 block font-semibold uppercase">WHEN</span>
                <h4 className="text-sm font-bold text-amber-300 mt-1">Auspicious Muhurat Date</h4>
                <p className="text-[11px] text-slate-400 mt-1">Vedic planetary calculations</p>
              </div>

              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 block font-semibold uppercase">WHAT</span>
                <h4 className="text-sm font-bold text-purple-300 mt-1">Event Planning Suite</h4>
                <p className="text-[11px] text-slate-400 mt-1">Budgeting & checklists</p>
              </div>

              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 block font-semibold uppercase">WHO</span>
                <h4 className="text-sm font-bold text-emerald-400 mt-1">Date-Matched Vendors</h4>
                <p className="text-[11px] text-slate-400 mt-1">Verified local partners</p>
              </div>
            </div>
          </div>

          {/* Event Type Selection Grid */}
          <div className="space-y-4">
            <div className="text-center max-w-xl mx-auto space-y-1">
              <h3 className="text-2xl font-bold text-white">What are you planning?</h3>
              <p className="text-xs text-slate-300">
                Select an event type to calculate optimal timing windows and view available vendor partners.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {MUHURAT_EVENT_TYPES.map((evt) => (
                <div
                  key={evt.id}
                  onClick={() => {
                    setSetupForm((prev) => ({ ...prev, eventType: evt.id }));
                    setActiveTabSub('setup');
                  }}
                  className="glass-card rounded-3xl p-5 hover:border-amber-500/50 cursor-pointer transition-all hover:-translate-y-1 flex flex-col justify-between space-y-3 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-4xl group-hover:scale-110 transition-transform">{evt.icon}</span>
                    <span className="text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full">
                      {evt.tag}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                      {evt.name}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {evt.description}
                    </p>
                  </div>

                  <div className="pt-2 text-xs font-bold text-amber-400 flex items-center gap-1">
                    Select Event <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: MUHURAT SETUP */}
      {activeTabSub === 'setup' && (
        <div className="max-w-3xl mx-auto glass-card-gold rounded-3xl p-6 sm:p-8 space-y-6 animate-in fade-in duration-300">
          <div className="border-b border-slate-800 pb-4 space-y-1">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
              Step 1 of 3 — Event Preferences
            </span>
            <h3 className="text-2xl font-bold text-white">Tell us about your event</h3>
            <p className="text-xs text-slate-300">
              Provide your location, dates, guest size, and budget to compute verified auspicious windows.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            {/* Event Type Select */}
            <div>
              <label className="block text-slate-300 font-bold mb-1.5">Event Type</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {MUHURAT_EVENT_TYPES.map((e) => (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => setSetupForm((prev) => ({ ...prev, eventType: e.id }))}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      setupForm.eventType === e.id
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="mr-1.5">{e.icon}</span> {e.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* City Location Selection */}
            <div>
              <label className="block text-slate-300 font-bold mb-1.5">Preferred Event Location (City)</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {CITIES.slice(0, 8).map((city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => {
                      setSetupForm((prev) => ({ ...prev, city }));
                      setSelectedCityFilter(city);
                    }}
                    className={`px-3 py-1.5 rounded-xl border transition-all ${
                      setupForm.city === city
                        ? 'bg-purple-500/20 border-purple-400 text-purple-300 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    📍 {city}
                  </button>
                ))}
              </div>
              <input
                type="text"
                value={setupForm.city}
                onChange={(e) => {
                  setSetupForm((prev) => ({ ...prev, city: e.target.value }));
                  setSelectedCityFilter(e.target.value);
                }}
                placeholder="Enter city (e.g. Delhi, Jaipur, Mumbai...)"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Preferred Date Range */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-bold mb-1.5">Preferred Start Date</label>
                <input
                  type="date"
                  value={setupForm.dateFrom}
                  onChange={(e) => setSetupForm((prev) => ({ ...prev, dateFrom: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1.5">Preferred End Date</label>
                <input
                  type="date"
                  value={setupForm.dateTo}
                  onChange={(e) => setSetupForm((prev) => ({ ...prev, dateTo: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Guest Count Selection */}
            <div>
              <label className="block text-slate-300 font-bold mb-1.5">Number of Guests</label>
              <div className="flex flex-wrap gap-2">
                {GUEST_COUNT_OPTIONS.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setSetupForm((prev) => ({ ...prev, guests: g }))}
                    className={`px-4 py-2 rounded-xl border font-bold transition-all ${
                      setupForm.guests === g
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    👥 {g} Guests
                  </button>
                ))}
              </div>
            </div>

            {/* Budget Range Selection */}
            <div>
              <label className="block text-slate-300 font-bold mb-1.5">Estimated Budget</label>
              <div className="flex flex-wrap gap-2">
                {BUDGET_OPTIONS.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setSetupForm((prev) => ({ ...prev, budget: b }))}
                    className={`px-4 py-2 rounded-xl border font-bold transition-all ${
                      setupForm.budget === b
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    💰 {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Optional Special Requirements */}
            <div>
              <label className="block text-slate-300 font-bold mb-1.5">Special Requirements (Optional)</label>
              <textarea
                rows={2}
                value={setupForm.requirements}
                onChange={(e) => setSetupForm((prev) => ({ ...prev, requirements: e.target.value }))}
                placeholder="e.g., Pure vegetarian sattvic menu, open lawn mandap setup, traditional shehnai welcome..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <button
            onClick={handleStartCalculation}
            className="w-full cosmic-gradient-btn py-3.5 rounded-2xl text-sm font-black shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" /> Find Auspicious Dates →
          </button>
        </div>
      )}

      {/* VIEW 3: CALCULATION LOADING ANIMATION */}
      {activeTabSub === 'loading' && (
        <div className="max-w-2xl mx-auto glass-card-purple rounded-3xl p-10 text-center space-y-6 animate-in fade-in duration-300">
          <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-400 mx-auto flex items-center justify-center animate-spin">
            <Sparkles className="w-8 h-8 text-amber-300" />
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl font-black text-white">Calculating your Muhurat...</h3>
            <p className="text-xs text-slate-300">
              Evaluating planetary transits, Nakshatra alignments, and verifying local vendor availability.
            </p>
          </div>

          <div className="space-y-3 max-w-md mx-auto text-left text-xs">
            <div className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
              calcProgressStep >= 1 ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}>
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>1. Analyzing event type & nakshatra parameters</span>
            </div>

            <div className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
              calcProgressStep >= 2 ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}>
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>2. Checking selected dates against Shubh Choghadiya</span>
            </div>

            <div className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
              calcProgressStep >= 3 ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}>
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>3. Calculating optimal time windows</span>
            </div>

            <div className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
              calcProgressStep >= 4 ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}>
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>4. Finding compatible date-matched vendors in {setupForm.city}</span>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 4: MUHURAT RESULTS PAGE */}
      {activeTabSub === 'results' && (
        <div className="space-y-6 animate-in fade-in duration-300 max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-1">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              Vedic Planetary Alignment Results
            </span>
            <h2 className="text-3xl font-extrabold text-white">Recommended Muhurat Dates</h2>
            <p className="text-xs text-slate-300">
              Selected for {selectedMuhuratEvent.eventName} in {selectedMuhuratEvent.location} ({selectedMuhuratEvent.guestCount} guests, {selectedMuhuratEvent.budget} budget).
            </p>
          </div>

          {/* Conceptual Feature Disclaimer Callout */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3 text-xs text-slate-400 text-center max-w-3xl mx-auto">
            <strong className="text-amber-300">Prototype Muhurat calculation:</strong> Demonstration of celestial date recommendations for hackathon preview.
          </div>

          {/* Results Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DEMO_MUHURAT_RESULTS.map((res) => (
              <div
                key={res.id}
                className="glass-card rounded-3xl p-6 flex flex-col justify-between border-2 border-slate-800 hover:border-amber-500/60 transition-all space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                      res.badgeColor === 'emerald'
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                        : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    }`}>
                      🟢 {res.status}
                    </span>
                    <span className="text-xs font-mono text-purple-300 font-bold">
                      {res.matchScore}% Match
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-white group-hover:text-amber-300 transition-colors">
                      {res.dateFormatted}
                    </h3>
                    <div className="text-base font-bold text-amber-300 font-mono mt-1">
                      ⏰ {res.timeWindow}
                    </div>
                  </div>

                  <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 space-y-1 text-xs">
                    <div className="text-slate-400">
                      Nakshatra: <strong className="text-white">{res.nakshatra}</strong>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed italic">
                      "{res.planetaryNote}"
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedMuhuratEvent((prev) => ({
                      ...prev,
                      selectedDate: res.dateFormatted,
                      selectedDateISO: res.dateISO,
                      selectedTimeWindow: res.timeWindow
                    }));
                    setActiveTabSub('vendors');
                    showToast(`✨ Selected ${res.dateFormatted} Muhurat! Loading available vendors...`, 'success');
                  }}
                  className="w-full cosmic-gradient-btn py-3 rounded-xl text-xs font-black shadow-md flex items-center justify-center gap-2 group-hover:scale-[1.02] transition-transform"
                >
                  View Vendors →
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 5: VENDOR DISCOVERY MARKETPLACE */}
      {activeTabSub === 'vendors' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Selected Muhurat Summary Header */}
          <div className="glass-card-gold rounded-3xl p-5 border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  🟢 DATE-MATCHED MARKETPLACE
                </span>
                <span className="text-xs text-slate-400">Exact date availability matching active</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Vendors available for your Muhurat
              </h2>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 font-medium">
                <span className="bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800 text-amber-300 font-bold">
                  💍 {selectedMuhuratEvent.eventName || 'Wedding'}
                </span>
                <span className="bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800 text-white font-bold">
                  📅 {selectedMuhuratEvent.selectedDate || '14 Nov 2026'}
                </span>
                <span className="bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800 text-emerald-400 font-mono font-bold">
                  ⏰ {selectedMuhuratEvent.selectedTimeWindow || '9:12 AM – 11:05 AM'}
                </span>
                <span className="bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800 text-slate-300">
                  📍 {selectedMuhuratEvent.location || 'Delhi'}
                </span>
                <span className="bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800 text-slate-300">
                  👥 {selectedMuhuratEvent.guestCount || '250'} Guests
                </span>
              </div>
            </div>

            <button
              onClick={() => setActiveTabSub('my-event')}
              className="shrink-0 purple-gradient-btn px-5 py-2.5 rounded-xl text-xs font-black shadow-md flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4 text-purple-300" /> My Event Plan ({myEventCart.length})
            </button>
          </div>

          {/* Vendor Category Pills Filter Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar text-xs">
            {VENDOR_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategoryFilter(cat.id)}
                className={`px-3.5 py-2 rounded-2xl border font-bold shrink-0 transition-all flex items-center gap-1.5 ${
                  selectedCategoryFilter === cat.id
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-md'
                    : 'bg-slate-900/90 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Search & Secondary Filter Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search vendor name, category, service..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-slate-400 font-semibold whitespace-nowrap">Filter Location:</span>
              <select
                value={selectedCityFilter}
                onChange={(e) => setSelectedCityFilter(e.target.value)}
                className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none"
              >
                <option value="">All Locations</option>
                {CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Vendor Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredVendors.map((v) => {
              const isAdded = myEventCart.some((item) => item.id === v.id);
              return (
                <div
                  key={v.id}
                  className="glass-card rounded-3xl overflow-hidden flex flex-col justify-between hover:border-amber-500/50 transition-all space-y-4 group relative"
                >
                  <div className="relative">
                    <img src={v.image} alt={v.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-amber-300 border border-amber-500/30">
                      {v.categoryLabel}
                    </div>
                    {v.verified && (
                      <div className="absolute top-3 right-3 bg-emerald-500/90 text-slate-950 font-black text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                        <ShieldCheck className="w-3 h-3" /> Verified Vendor
                      </div>
                    )}
                  </div>

                  <div className="p-5 pt-0 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                        <span className="flex items-center gap-1 text-amber-400 font-bold">
                          ★ {v.rating} <span className="text-slate-400 font-normal">({v.reviews} reviews)</span>
                        </span>
                        <span className="text-purple-300 font-mono font-bold bg-purple-500/10 px-2 py-0.5 rounded-full">
                          {v.matchScore}% Match
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                        {v.name}
                      </h3>

                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                        {v.about}
                      </p>
                    </div>

                    <div className="bg-slate-950/70 p-3 rounded-2xl border border-slate-800 space-y-1 text-xs">
                      <div className="flex items-center justify-between text-slate-300">
                        <span>Capacity: <strong>{v.capacityText}</strong></span>
                        <span>Location: <strong>{v.location}</strong></span>
                      </div>
                      <div className="flex items-center justify-between pt-1 border-t border-slate-800">
                        <span className="text-emerald-400 font-bold flex items-center gap-1 text-[11px]">
                          🟢 Available: {v.availableOnDate}
                        </span>
                        <span className="text-amber-300 font-black text-sm">{v.price}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <button
                        onClick={() => setSelectedVendorDetail(v)}
                        className="py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold transition-all"
                      >
                        View Details
                      </button>

                      <button
                        onClick={() => addVendorToEvent(v)}
                        disabled={isAdded}
                        className={`py-2.5 rounded-xl text-xs font-black transition-all ${
                          isAdded
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 cursor-default'
                            : 'cosmic-gradient-btn shadow-md'
                        }`}
                      >
                        {isAdded ? '✓ Added' : '+ Add to Event'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* PRIEST / ASTROLOGER INTEGRATION SECTION */}
          <section className="glass-card-gold rounded-3xl p-6 sm:p-8 space-y-4 border-2 border-amber-500/30">
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🧑‍⚖️</span>
                <div>
                  <h3 className="text-lg font-bold text-white">Need a Priest or Muhurat Expert?</h3>
                  <p className="text-xs text-slate-300">
                    Book certified Vedic Pandits for Vivah Sanskar, Hawan, and ritual execution.
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-amber-300 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/30">
                AstroLive Vedic Network
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {DEMO_VENDORS.filter((v) => v.category === 'priests').map((p) => (
                <div key={p.id} className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 flex items-center gap-4">
                  <img src={p.image} alt={p.name} className="w-16 h-16 rounded-full object-cover border-2 border-amber-500/40" />
                  <div className="flex-1 space-y-1 text-xs">
                    <h4 className="font-bold text-white text-sm">{p.name}</h4>
                    <p className="text-slate-400">★ {p.rating} ({p.reviews} ritual reviews)</p>
                    <p className="text-amber-300 font-bold">{p.price}</p>
                    <button
                      onClick={() => addVendorToEvent(p)}
                      className="mt-1 px-3 py-1 rounded-lg bg-amber-500 text-slate-950 font-black text-[11px] hover:bg-amber-400"
                    >
                      Book Priest →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* VIEW 6: VENDOR DETAIL MODAL */}
      {selectedVendorDetail && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="glass-card rounded-3xl max-w-2xl w-full p-6 space-y-6 max-h-[90vh] overflow-y-auto border-2 border-amber-500/40 animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-black uppercase text-amber-400 tracking-widest block">
                  {selectedVendorDetail.categoryLabel} Profile
                </span>
                <h2 className="text-2xl font-bold text-white">{selectedVendorDetail.name}</h2>
                <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                  <span>★ {selectedVendorDetail.rating} ({selectedVendorDetail.reviews} reviews)</span>
                  <span>📍 {selectedVendorDetail.location}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedVendorDetail(null)}
                className="p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <img src={selectedVendorDetail.image} alt={selectedVendorDetail.name} className="w-full h-64 object-cover rounded-2xl" />

            <div className="space-y-3 text-xs">
              <h4 className="font-bold text-white text-sm">About Vendor</h4>
              <p className="text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
                {selectedVendorDetail.about}
              </p>

              {/* Vendor Availability Mini-Calendar */}
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-amber-300">Availability Calendar</h4>
                <div className="flex items-center justify-between text-[11px] text-slate-300 pb-2 border-b border-slate-800">
                  <span>November 2026</span>
                  <span className="text-emerald-400 font-bold">🟢 Available on selected date: 14 Nov</span>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center font-mono text-[10px] pt-1">
                  <span className="text-slate-500">S</span><span className="text-slate-500">M</span><span className="text-slate-500">T</span><span className="text-slate-500">W</span><span className="text-slate-500">T</span><span className="text-slate-500">F</span><span className="text-slate-500">S</span>
                  <span className="p-1 text-slate-600">10</span>
                  <span className="p-1 text-slate-600">11</span>
                  <span className="p-1 text-slate-600">12</span>
                  <span className="p-1 text-slate-600">13</span>
                  <span className="p-1 bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-400 rounded-md">14</span>
                  <span className="p-1 text-slate-600">15</span>
                  <span className="p-1 text-slate-600">16</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-white text-sm">Services Offered</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedVendorDetail.services.map((s, i) => (
                    <span key={i} className="bg-purple-950/60 border border-purple-500/30 text-purple-200 px-3 py-1 rounded-lg text-[11px]">
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-400">
                Cancellation Policy: <strong className="text-slate-200">{selectedVendorDetail.cancellationPolicy}</strong>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <div>
                <span className="text-[10px] text-slate-400 block">Starting Price</span>
                <span className="text-xl font-black text-amber-300">{selectedVendorDetail.price}</span>
              </div>
              <button
                onClick={() => {
                  addVendorToEvent(selectedVendorDetail);
                  setSelectedVendorDetail(null);
                }}
                className="cosmic-gradient-btn px-6 py-3 rounded-xl text-xs font-black shadow-lg"
              >
                + Add to My Event
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 7: EVENT PLANNER CART (`My Event` / `/muhurat/my-event`) */}
      {activeTabSub === 'my-event' && (
        <div className="space-y-8 animate-in fade-in duration-300 max-w-5xl mx-auto">
          {/* Header */}
          <div className="glass-card-gold rounded-3xl p-6 border border-amber-500/30 space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest block">
                  Central Event Management
                </span>
                <h2 className="text-2xl font-black text-white">
                  My Event Dashboard — {selectedMuhuratEvent.eventName || 'Wedding'}
                </h2>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/20 border border-emerald-500/30 px-3 py-1 rounded-full">
                📅 {selectedMuhuratEvent.selectedDate || '14 November 2026'} ({selectedMuhuratEvent.location})
              </span>
            </div>

            {/* Event Progress Checklist */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-200">Event Progress Checklist</span>
                <span className="font-bold text-amber-300">{bookedCount} / 7 booked ({Math.round((bookedCount / 7) * 100)}%)</span>
              </div>
              <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${(bookedCount / 7) * 100}%` }}
                />
              </div>

              {/* Checklist Pills */}
              <div className="flex flex-wrap gap-2 pt-1 text-xs">
                {categoryChecklist.map((c) => {
                  const isBooked = bookedCategoryIds.includes(c.cat);
                  return (
                    <span
                      key={c.cat}
                      className={`px-3 py-1 rounded-xl border flex items-center gap-1 font-medium ${
                        isBooked
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                          : 'bg-slate-900/80 text-slate-500 border-slate-800'
                      }`}
                    >
                      {c.icon} {c.label} {isBooked ? '✓' : '○'}
                    </span>
                  );
                })}
              </div>

              {/* Remaining recommendations quick buttons */}
              {missingCategories.length > 0 && (
                <div className="pt-2 text-xs text-slate-300 flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-amber-400">Still need:</span>
                  {missingCategories.map((m) => (
                    <button
                      key={m.cat}
                      onClick={() => {
                        setSelectedCategoryFilter(m.cat);
                        setActiveTabSub('vendors');
                      }}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 hover:border-amber-400 text-slate-200 text-[11px] font-bold"
                    >
                      + Find {m.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Booked Vendors List */}
          <div className="glass-card rounded-3xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
              Selected Vendors in Your Event Plan ({myEventCart.length})
            </h3>

            {myEventCart.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-6">
                No vendors added yet. Browse Date-Matched Vendors to add options to your event plan.
              </p>
            ) : (
              <div className="space-y-3">
                {myEventCart.map((item) => (
                  <div
                    key={item.id}
                    className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover border border-slate-800" />
                      <div>
                        <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">
                          {item.categoryLabel || 'Vendor'}
                        </span>
                        <h4 className="text-sm font-bold text-white">{item.name}</h4>
                        <span className="text-xs text-slate-400">📍 {item.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 self-end sm:self-center">
                      <strong className="text-sm font-black text-amber-300">{item.price}</strong>
                      <button
                        onClick={() => removeVendorFromEvent(item.id)}
                        className="p-2 rounded-xl bg-slate-900 text-rose-400 hover:bg-rose-500/20 border border-rose-500/30"
                        title="Remove from plan"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Event Budget Summary & AI Budget Optimization */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cost Breakdown */}
            <div className="glass-card-purple rounded-3xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white border-b border-purple-500/30 pb-2">
                Event Budget Breakdown
              </h3>

              <div className="space-y-2 text-xs">
                {myEventCart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-slate-300">
                    <span>{item.name} ({item.categoryLabel})</span>
                    <span className="font-mono text-white font-bold">{item.price}</span>
                  </div>
                ))}

                <div className="pt-3 border-t border-purple-500/30 flex items-center justify-between text-slate-300">
                  <span>Subtotal</span>
                  <span className="font-mono font-bold">₹{cartSubtotal.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between text-slate-400 text-[11px]">
                  <span>Estimated Taxes (GST 18%)</span>
                  <span className="font-mono">₹{estimatedTaxes.toLocaleString()}</span>
                </div>

                <div className="pt-2 border-t border-purple-500/30 flex items-center justify-between text-base font-black text-amber-300">
                  <span>Estimated Total</span>
                  <span className="font-mono">₹{estimatedTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Budget Target Comparison Status */}
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-between text-xs">
                <span className="text-slate-300">Your Target Budget: <strong>{selectedMuhuratEvent.budget || '₹5–10 Lakh'}</strong></span>
                <span className="text-emerald-400 font-bold bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-500/40">
                  🟢 Within budget
                </span>
              </div>
            </div>

            {/* AI Budget Optimization Widget */}
            <div className="glass-card-gold rounded-3xl p-6 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-1">
                  <Bot className="w-4 h-4" /> AI Budget Optimizer
                </div>
                <h3 className="text-base font-bold text-white">Optimize My Budget</h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Our algorithm continuously checks alternate date-matched vendors to lower your total cost without sacrificing rating or capacity.
                </p>

                <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 space-y-2 mt-3 text-xs">
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Current Estimated Total:</span>
                    <strong className="text-amber-300">₹{estimatedTotal.toLocaleString()}</strong>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span>AI Suggested Savings:</span>
                    <strong className="text-emerald-400">Save ₹35,000</strong>
                  </div>
                  <p className="text-[11px] text-purple-300 italic pt-1 border-t border-slate-800">
                    "Switch to Heritage Courtyard (Jaipur) combo deal or alternate photographer slot."
                  </p>
                </div>
              </div>

              <button
                onClick={handleApplyBudgetOptimization}
                className="w-full py-3 rounded-xl bg-amber-500 text-slate-950 text-xs font-black shadow-lg hover:bg-amber-400 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" /> Apply Suggestions
              </button>
            </div>
          </div>

          {/* PACKAGE RECOMMENDATIONS SECTION */}
          <section className="space-y-4">
            <div className="text-center max-w-xl mx-auto space-y-1">
              <h3 className="text-xl font-bold text-white">AstroLive Recommended Packages</h3>
              <p className="text-xs text-slate-300">
                Curated hassle-free bundles designed for users who prefer all-in-one event execution.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {DEMO_PACKAGES.map((pkg) => (
                <div key={pkg.id} className="glass-card rounded-3xl p-6 space-y-4 flex flex-col justify-between border-2 border-slate-800 hover:border-amber-500/40 transition-all">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="text-[10px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-0.5 rounded-full">
                        {pkg.tag}
                      </span>
                      <span className="text-xs font-bold text-emerald-400">{pkg.savingsText}</span>
                    </div>

                    <h4 className="text-lg font-bold text-white">{pkg.name}</h4>
                    <p className="text-xs text-slate-400">{pkg.description}</p>

                    <div className="space-y-1.5 text-xs bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800">
                      {pkg.items.map((it, idx) => (
                        <div key={idx} className="flex items-center justify-between text-slate-300">
                          <span>• {it.name} ({it.category})</span>
                          <span className="font-mono text-slate-400">{it.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Package Total</span>
                      <strong className="text-lg font-black text-amber-300">{pkg.totalPriceFormatted}</strong>
                    </div>
                    <button
                      onClick={() => {
                        showToast(`🎁 Applied ${pkg.name} package to your event plan!`, 'success');
                      }}
                      className="cosmic-gradient-btn px-5 py-2.5 rounded-xl text-xs font-black shadow-md"
                    >
                      Apply Package →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CHECKOUT / BOOKING CTA BUTTON */}
          <div className="glass-card-gold rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-2 border-amber-500/40">
            <div>
              <h4 className="text-lg font-bold text-white">Ready to Confirm Vendor Bookings?</h4>
              <p className="text-xs text-slate-300">
                Submit booking requests for your selected date-matched vendors. Earn +100 AstroCoins per booking!
              </p>
            </div>

            <button
              onClick={() => {
                if (myEventCart.length === 0) {
                  showToast('⚠️ Please add at least one vendor to your event plan first!', 'info');
                  return;
                }
                setVendorToBook(myEventCart[0]);
                setShowPaymentModal(true);
              }}
              className="cosmic-gradient-btn px-8 py-3.5 rounded-2xl text-sm font-black shadow-xl hover:scale-105 transition-all shrink-0"
            >
              Proceed to Book Vendors →
            </button>
          </div>
        </div>
      )}

      {/* VIEW 8: MOCK PAYMENT & BOOKING CONFIRMATION MODAL */}
      {showPaymentModal && vendorToBook && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card rounded-3xl max-w-lg w-full p-6 space-y-6 border-2 border-amber-500/40 animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest block">
                  Simulated Hackathon Checkout
                </span>
                <h3 className="text-xl font-bold text-white">Payment Summary</h3>
              </div>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-slate-300">
                  <span>Vendor Service:</span>
                  <strong className="text-white">{vendorToBook.name}</strong>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Event Date:</span>
                  <strong className="text-amber-300">{selectedMuhuratEvent.selectedDate || '14 Nov 2026'}</strong>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Time Slot:</span>
                  <strong className="text-emerald-400">{selectedMuhuratEvent.selectedTimeWindow || '9:12 AM – 11:05 AM'}</strong>
                </div>
                <div className="flex items-center justify-between text-slate-300 pt-2 border-t border-slate-800">
                  <span>Vendor Service Amount:</span>
                  <strong className="text-white font-mono">{vendorToBook.price}</strong>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>AstroLive Marketplace Fee:</span>
                  <strong className="text-emerald-400 font-bold">₹0 / Included</strong>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-sm font-black text-amber-300">
                  <span>Total Amount Payable:</span>
                  <span className="font-mono">{vendorToBook.price}</span>
                </div>
              </div>

              {/* Payment Methods Simulation */}
              <div className="space-y-2">
                <label className="block font-bold text-slate-300">Payment Option</label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 rounded-xl bg-purple-500/20 border border-purple-400 text-purple-300 font-bold flex items-center gap-2">
                    <CreditCard className="w-4 h-4" /> UPI / GPay / PhonePe
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 flex items-center gap-2">
                    Credit / Debit Card
                  </div>
                </div>
              </div>

              <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-[11px] text-amber-300">
                <strong>Note:</strong> Prototype simulation only. No actual monetary charge will occur during hackathon evaluation.
              </div>
            </div>

            <button
              onClick={() => {
                const confirmedObj = confirmVendorBooking(vendorToBook);
                setBookingConfirmedData(confirmedObj);
                setShowPaymentModal(false);
              }}
              className="w-full cosmic-gradient-btn py-3.5 rounded-2xl text-sm font-black shadow-xl hover:scale-[1.02] transition-all"
            >
              Pay & Confirm Booking →
            </button>
          </div>
        </div>
      )}

      {/* BOOKING CONFIRMED STATE OVERLAY */}
      {bookingConfirmedData && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card-gold rounded-3xl max-w-lg w-full p-8 text-center space-y-6 border-2 border-amber-500/50 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 mx-auto flex items-center justify-center text-emerald-400 text-3xl">
              ✓
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                🟢 Status: Confirmed
              </span>
              <h2 className="text-3xl font-black text-white">Booking Confirmed!</h2>
              <p className="text-xs text-slate-300">
                Your booking request has been submitted to {bookingConfirmedData.vendorName}.
              </p>
            </div>

            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs text-left">
              <div className="flex items-center justify-between text-slate-300">
                <span>Booking ID:</span>
                <strong className="text-amber-300 font-mono">{bookingConfirmedData.bookingId}</strong>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Vendor Partner:</span>
                <strong className="text-white">{bookingConfirmedData.vendorName}</strong>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Event Date:</span>
                <strong className="text-white">{bookingConfirmedData.eventDate}</strong>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Muhurat Time Window:</span>
                <strong className="text-emerald-400 font-mono">{bookingConfirmedData.timeSlot}</strong>
              </div>
              <div className="flex items-center justify-between text-slate-300 pt-2 border-t border-slate-800">
                <span>Reward Earned:</span>
                <strong className="text-amber-300">+100 AstroCoins 🎉</strong>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setReviewVendor({ name: bookingConfirmedData.vendorName, id: bookingConfirmedData.vendorId });
                  setShowReviewModal(true);
                }}
                className="py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs font-bold hover:bg-slate-800"
              >
                ⭐ Add Vendor Review
              </button>

              <button
                onClick={() => setBookingConfirmedData(null)}
                className="cosmic-gradient-btn py-3 rounded-xl text-xs font-black shadow-md"
              >
                Back to Marketplace
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 9: BUSINESS & REVENUE DASHBOARD (`/business/muhurat`) */}
      {activeTabSub === 'business' && (
        <div className="space-y-8 animate-in fade-in duration-300 max-w-6xl mx-auto">
          {/* Executive Overview Header */}
          <div className="glass-card-gold rounded-3xl p-6 border border-amber-500/30 space-y-2">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest block">
                  AstroLive Internal Business Analytics
                </span>
                <h2 className="text-2xl font-black text-white">
                  Muhurat Marketplace Revenue Dashboard
                </h2>
              </div>
              <span className="text-xs font-mono text-amber-300 bg-amber-500/20 border border-amber-500/40 px-3 py-1 rounded-full">
                Prototype / Illustrative Data
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Demonstrates monetization flywheel from astrology consultations to high-GMV event vendor bookings.
            </p>
          </div>

          {/* Key Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="glass-card rounded-2xl p-4 text-center space-y-1">
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Marketplace GMV</span>
              <strong className="text-xl font-black text-amber-300 font-mono">{DEMO_BUSINESS_METRICS.gmv}</strong>
            </div>

            <div className="glass-card rounded-2xl p-4 text-center space-y-1">
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Completed Bookings</span>
              <strong className="text-xl font-black text-white font-mono">{DEMO_BUSINESS_METRICS.bookingsCount}</strong>
            </div>

            <div className="glass-card rounded-2xl p-4 text-center space-y-1">
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Vendor Partners</span>
              <strong className="text-xl font-black text-purple-300 font-mono">{DEMO_BUSINESS_METRICS.vendorPartnersCount}</strong>
            </div>

            <div className="glass-card rounded-2xl p-4 text-center space-y-1">
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">AstroLive Commission</span>
              <strong className="text-xl font-black text-emerald-400 font-mono">{DEMO_BUSINESS_METRICS.marketplaceRevenue}</strong>
            </div>

            <div className="glass-card rounded-2xl p-4 text-center space-y-1">
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Avg Booking Value</span>
              <strong className="text-xl font-black text-amber-300 font-mono">{DEMO_BUSINESS_METRICS.avgBookingValue}</strong>
            </div>

            <div className="glass-card rounded-2xl p-4 text-center space-y-1">
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Consult → Marketplace</span>
              <strong className="text-xl font-black text-white font-mono">{DEMO_BUSINESS_METRICS.consultationToMarketplaceConversion}</strong>
            </div>
          </div>

          {/* Commission Structure & Funnel Analytics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Commission Breakdown Table */}
            <div className="glass-card-purple rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-purple-500/30 pb-2">
                <h3 className="text-base font-bold text-white">Illustrative Marketplace Commission Rates</h3>
                <span className="text-[10px] text-purple-300 font-bold bg-purple-500/20 px-2 py-0.5 rounded-full">
                  Internal Rates
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="grid grid-cols-3 font-bold text-slate-400 border-b border-slate-800 pb-1">
                  <span>Vendor Category</span>
                  <span>Commission %</span>
                  <span className="text-right">Revenue Share</span>
                </div>

                {DEMO_BUSINESS_METRICS.commissionRates.map((c, i) => (
                  <div key={i} className="grid grid-cols-3 text-slate-300 border-b border-slate-900/60 py-2">
                    <span className="font-semibold text-white">{c.category}</span>
                    <span className="text-amber-300 font-mono font-bold">{c.rate}</span>
                    <span className="text-right font-mono text-emerald-400">{c.revenueEstimate}</span>
                  </div>
                ))}
              </div>

              <p className="text-[11px] text-slate-400 italic pt-2">
                * Note: Vendor commissions are integrated into B2B partner agreements and are transparently absorbed without markup to end customers.
              </p>
            </div>

            {/* Funnel Analytics */}
            <div className="glass-card-gold rounded-3xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white border-b border-amber-500/30 pb-2">
                Muhurat Conversion Funnel Analytics
              </h3>

              <div className="space-y-2 text-xs">
                {DEMO_BUSINESS_METRICS.funnelData.map((f, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-slate-300">
                      <span>{f.step}</span>
                      <strong className="font-mono text-amber-300">{f.count.toLocaleString()} ({f.percent}%)</strong>
                    </div>
                    <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-amber-400 rounded-full"
                        style={{ width: `${f.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Revenue Flywheel Diagram */}
          <div className="glass-card rounded-3xl p-6 space-y-4 text-center border-2 border-amber-500/30">
            <h3 className="text-lg font-bold text-white">AstroLive Revenue Flywheel</h3>
            <p className="text-xs text-slate-300 max-w-xl mx-auto">
              How Muhurat Marketplace creates recurring lifetime customer value far beyond single consultation fees.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-bold">
              <span className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-amber-300">
                1. Consultation
              </span>
              <span className="text-slate-500">→</span>
              <span className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-purple-300">
                2. Muhurat Calculation
              </span>
              <span className="text-slate-500">→</span>
              <span className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-emerald-300">
                3. Date-Matched Vendors
              </span>
              <span className="text-slate-500">→</span>
              <span className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-amber-400">
                4. Vendor Booking
              </span>
              <span className="text-slate-500">→</span>
              <span className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-emerald-400">
                5. Commission & Repeat
              </span>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 10: VENDOR PORTAL & ONBOARDING (`/vendor/dashboard`) */}
      {activeTabSub === 'vendor-portal' && (
        <div className="space-y-8 animate-in fade-in duration-300 max-w-5xl mx-auto">
          {/* Portal Header */}
          <div className="glass-card-purple rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-purple-500/30">
            <div>
              <span className="text-[10px] font-black text-purple-300 uppercase tracking-widest block">
                Vendor Partner Hub
              </span>
              <h2 className="text-2xl font-black text-white">Vendor Portal & Onboarding</h2>
              <p className="text-xs text-slate-300 mt-0.5">
                Manage upcoming event bookings or register your business as an AstroLive Verified Vendor Partner.
              </p>
            </div>

            <button
              onClick={() => setShowPartnerModal(true)}
              className="cosmic-gradient-btn px-6 py-3 rounded-xl text-xs font-black shadow-lg shrink-0"
            >
              + Become an AstroLive Partner
            </button>
          </div>

          {/* Upcoming Bookings Mock View */}
          <div className="glass-card rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Upcoming Bookings (Partner View)</h3>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">
                Active Partner Account
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] text-amber-400 font-bold uppercase block">14 Nov 2026</span>
                  <h4 className="text-sm font-bold text-white">Wedding Event — Royal Palace Banquet</h4>
                  <p className="text-slate-400 mt-0.5">Guest Count: 250 • Location: South Delhi</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black text-amber-300 block font-mono">₹1,80,000</span>
                  <span className="text-emerald-400 font-bold bg-emerald-500/20 px-2 py-0.5 rounded-full text-[10px]">
                    🟢 Confirmed
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VENDOR ONBOARDING FORM MODAL */}
      {showPartnerModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card rounded-3xl max-w-md w-full p-6 space-y-5 border-2 border-amber-500/40 animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-xl font-bold text-white">Become an AstroLive Partner</h3>
                <p className="text-xs text-slate-400">Reach customers planning important life events.</p>
              </div>
              <button
                onClick={() => setShowPartnerModal(false)}
                className="p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {partnerForm.submitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 text-2xl mx-auto flex items-center justify-center">
                  ✓
                </div>
                <h4 className="text-lg font-bold text-white">Application Received!</h4>
                <p className="text-xs text-slate-300">
                  Status: <strong className="text-amber-300">Under Review</strong>. Our team will verify contact details and contact you within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setPartnerForm((prev) => ({ ...prev, submitted: false }));
                    setShowPartnerModal(false);
                  }}
                  className="cosmic-gradient-btn px-6 py-2.5 rounded-xl text-xs font-black"
                >
                  Done
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setPartnerForm((prev) => ({ ...prev, submitted: true }));
                  showToast('✓ Partner application submitted for verification!', 'success');
                }}
                className="space-y-3 text-xs"
              >
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Business Name</label>
                  <input
                    required
                    type="text"
                    value={partnerForm.businessName}
                    onChange={(e) => setPartnerForm((prev) => ({ ...prev, businessName: e.target.value }))}
                    placeholder="e.g. Royal Decorators"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Category</label>
                  <select
                    value={partnerForm.category}
                    onChange={(e) => setPartnerForm((prev) => ({ ...prev, category: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none"
                  >
                    {VENDOR_CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Phone / Email</label>
                  <input
                    required
                    type="text"
                    value={partnerForm.phone}
                    onChange={(e) => setPartnerForm((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="+91 98765 43210"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full cosmic-gradient-btn py-3 rounded-xl text-xs font-black shadow-lg mt-2"
                >
                  Submit for Verification →
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* VENDOR REVIEW MODAL */}
      {showReviewModal && reviewVendor && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card rounded-3xl max-w-md w-full p-6 space-y-4 border-2 border-amber-500/40 animate-in zoom-in-95 duration-200 text-xs">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-lg font-bold text-white">How was your experience?</h3>
                <p className="text-slate-400">Review for {reviewVendor.name}</p>
              </div>
              <button onClick={() => setShowReviewModal(false)} className="p-2 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <label className="block text-slate-300 font-bold">Select Rating</label>
              <div className="flex items-center gap-2 text-2xl text-amber-400 cursor-pointer">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setUserRating(star)}
                    className={star <= userRating ? 'opacity-100 scale-110' : 'opacity-30'}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">Your Review</label>
              <textarea
                rows={3}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share details about punctuality, ritual execution, quality..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <button
              onClick={() => {
                showToast(`⭐ Review submitted for ${reviewVendor.name}!`, 'success');
                setShowReviewModal(false);
                setReviewText('');
              }}
              className="w-full cosmic-gradient-btn py-3 rounded-xl font-black shadow-lg"
            >
              Submit Review →
            </button>
          </div>
        </div>
      )}

      {/* FLOATING AI EVENT ASSISTANT WIDGET */}
      <div className="fixed bottom-20 right-4 sm:right-6 z-40">
        {!showAIAssistant ? (
          <button
            onClick={() => setShowAIAssistant(true)}
            className="cosmic-gradient-btn px-4 py-3 rounded-full font-black text-xs shadow-2xl flex items-center gap-2 border-2 border-amber-400/40 hover:scale-105 transition-all"
          >
            <Bot className="w-5 h-5 text-amber-300 animate-bounce" /> AstroLive Event Assistant
          </button>
        ) : (
          <div className="glass-card-gold rounded-3xl w-80 sm:w-96 p-5 space-y-4 shadow-2xl border-2 border-amber-500/50 animate-in slide-in-from-bottom-5 duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-amber-300" />
                <span className="font-bold text-xs text-white">AstroLive Event Assistant</span>
              </div>
              <button onClick={() => setShowAIAssistant(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-slate-300 leading-relaxed">
                "Hello {userProfile.name}! I can help check missing vendors or optimize your budget for your selected 14 Nov 2026 Muhurat."
              </div>

              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Quick Questions:</span>
                {DEMO_AI_ASSISTANT_QA.map((qa, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      showToast(`🤖 ${qa.response}`, 'info');
                    }}
                    className="w-full p-2 rounded-xl bg-purple-950/40 border border-purple-500/30 text-left text-purple-200 hover:bg-purple-900/50 text-[11px] font-medium"
                  >
                    💬 "{qa.query}"
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
