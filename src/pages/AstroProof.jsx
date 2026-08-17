import React, { useState, useEffect } from 'react';
import { useAstro } from '../context/AstroContext';
import { ASTROPROOF_BADGES } from '../data/mockData';
import {
  trackAstroProofViewed,
  trackPredictionCreated,
  trackPredictionLocked,
  trackPredictionOutcomeSubmitted,
  trackPredictionShared
} from '../services/astroProofAnalytics';
import {
  ShieldCheck, Clock, CheckCircle2, AlertCircle, Plus, Info, Lock, Hash,
  Filter, Share2, Sparkles, X, ChevronRight, Award, TrendingUp, HelpCircle,
  Calendar, Check, User, ArrowRight, Eye, RefreshCw
} from 'lucide-react';

export default function AstroProof() {
  const {
    predictions,
    updatePredictionStatus,
    addPrediction,
    astrologers,
    showToast,
    claimDailyReward,
    predictionPreFill,
    setPredictionPreFill
  } = useAstro();

  // Filter & Search states
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [lockStep, setLockStep] = useState(1); // 1 = Form, 2 = Locked Confirmation
  const [lockedPredData, setLockedPredData] = useState(null);

  const [selectedPredForOutcome, setSelectedPredForOutcome] = useState(null);
  const [selectedPredForTimeline, setSelectedPredForTimeline] = useState(null);
  const [selectedPredForShare, setSelectedPredForShare] = useState(null);

  // Outcome Form State
  const [outcomeChoice, setOutcomeChoice] = useState('Yes');
  const [outcomeNote, setOutcomeNote] = useState('');

  // Add Prediction Form State
  const [newPredForm, setNewPredForm] = useState({
    statement: '',
    category: 'Career',
    astrologerId: 'astro-1',
    astrologerName: 'Acharya Priya Sharma',
    predictionWindowDays: '30',
    customWindow: '',
    notes: ''
  });

  // Track page view analytics & handle pre-fill from consultation
  useEffect(() => {
    trackAstroProofViewed({ count: predictions.length });
    if (predictionPreFill) {
      setNewPredForm({
        statement: predictionPreFill.statement || '',
        category: predictionPreFill.category || 'Career',
        astrologerId: predictionPreFill.astrologerId || 'astro-1',
        astrologerName: predictionPreFill.astrologerName || 'Acharya Priya Sharma',
        predictionWindowDays: '30',
        customWindow: '',
        notes: ''
      });
      setShowAddModal(true);
      setPredictionPreFill(null);
    }
  }, []);

  // Compute Statistics (Strictly user-reported, no scientific accuracy claims)
  const totalCount = predictions.length;
  const confirmedCount = predictions.filter((p) => p.status === 'Verified by User' || p.status === 'Confirmed').length;
  const partialCount = predictions.filter((p) => p.status === 'Partially Verified' || p.status === 'Partially Confirmed').length;
  const notConfirmedCount = predictions.filter((p) => p.status === 'Not Occurred' || p.status === 'Not Confirmed').length;
  const pendingCount = predictions.filter((p) => p.status === 'Pending Verification' || p.status === 'Pending').length;
  const unclearCount = predictions.filter((p) => p.status === 'Unclear').length;

  const completedTotal = confirmedCount + partialCount + notConfirmedCount;
  const userReportedConfirmationRate = completedTotal > 0
    ? Math.round(((confirmedCount + partialCount * 0.5) / completedTotal) * 100)
    : 0;

  // Filter & Sort Logic
  const filteredPredictions = predictions.filter((p) => {
    if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
    if (selectedStatus !== 'All') {
      if (selectedStatus === 'Confirmed' && p.status !== 'Verified by User' && p.status !== 'Confirmed') return false;
      if (selectedStatus === 'Partially Confirmed' && p.status !== 'Partially Verified' && p.status !== 'Partially Confirmed') return false;
      if (selectedStatus === 'Not Confirmed' && p.status !== 'Not Occurred' && p.status !== 'Not Confirmed') return false;
      if (selectedStatus === 'Pending' && p.status !== 'Pending Verification' && p.status !== 'Pending') return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.dateLogged || 0) - new Date(a.dateLogged || 0);
    if (sortBy === 'oldest') return new Date(a.dateLogged || 0) - new Date(b.dateLogged || 0);
    if (sortBy === 'astrologer') return a.astrologerName.localeCompare(b.astrologerName);
    return 0;
  });

  // Handle Add Form Submit -> Lock Step
  const handleLockSubmit = (e) => {
    e.preventDefault();
    if (!newPredForm.statement.trim()) return;

    const chosenAstro = astrologers.find((a) => a.id === newPredForm.astrologerId) || {
      name: newPredForm.astrologerName,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80'
    };

    const days = newPredForm.predictionWindowDays === 'custom'
      ? (parseInt(newPredForm.customWindow) || 30)
      : parseInt(newPredForm.predictionWindowDays);

    const todayStr = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    const endDate = new Date(Date.now() + days * 86400000);
    const endDateStr = endDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

    const newObj = {
      astrologerId: chosenAstro.id,
      astrologerName: chosenAstro.name,
      astrologerAvatar: chosenAstro.avatar,
      predictionWindow: `${todayStr} – ${endDateStr}`,
      category: newPredForm.category,
      statement: newPredForm.statement,
      notes: newPredForm.notes
    };

    addPrediction(newObj);
    trackPredictionCreated({ category: newPredForm.category, astrologer: chosenAstro.name });
    trackPredictionLocked({ category: newPredForm.category });

    setLockedPredData({
      statement: newPredForm.statement,
      astrologerName: chosenAstro.name,
      createdDate: todayStr,
      windowStr: `${todayStr} – ${endDateStr}`,
      status: '⏳ Pending'
    });
    setLockStep(2);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setLockStep(1);
    setLockedPredData(null);
    setNewPredForm({
      statement: '',
      category: 'Career',
      astrologerId: 'astro-1',
      astrologerName: 'Acharya Priya Sharma',
      predictionWindowDays: '30',
      customWindow: '',
      notes: ''
    });
  };

  // Outcome Submit
  const handleOutcomeSubmit = (e) => {
    e.preventDefault();
    if (!selectedPredForOutcome) return;

    let newStatus = 'Verified by User';
    if (outcomeChoice === 'Partially') newStatus = 'Partially Verified';
    if (outcomeChoice === 'No') newStatus = 'Not Occurred';
    if (outcomeChoice === 'Not Sure') newStatus = 'Unclear';

    updatePredictionStatus(selectedPredForOutcome.id, newStatus, outcomeNote);
    trackPredictionOutcomeSubmitted({ id: selectedPredForOutcome.id, outcome: newStatus });

    // Reward small AstroCoins for honest outcome reporting
    claimDailyReward({ type: 'coins', value: 15, label: '15 AstroCoins for Outcome Report' });

    setSelectedPredForOutcome(null);
    setOutcomeNote('');
    setOutcomeChoice('Yes');
  };

  const handleShareClick = (pred) => {
    setSelectedPredForShare(pred);
    trackPredictionShared({ id: pred.id });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 py-6 text-slate-100">

      {/* ── 1. Hero & Explanation Cards ─────────────────────────────── */}
      <section className="text-center space-y-6 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>AstroProof Prediction Ledger</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            AstroProof
          </h1>
          <p className="text-lg sm:text-xl font-bold bg-gradient-to-r from-emerald-300 via-amber-300 to-purple-300 bg-clip-text text-transparent">
            Predictions you can come back to.
          </p>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Keep a transparent record of specific predictions, follow up when the prediction window ends, and build a history of your consultation journey.
          </p>
        </div>

        {/* Explanation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4 text-left">
          <div className="glass-card rounded-3xl p-5 space-y-2 border-emerald-500/20 hover:border-emerald-500/40 transition-all">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-xl">
              📝
            </div>
            <h3 className="text-sm font-black text-white">Record</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Save specific astrologer predictions with timestamped cryptographic hashes.
            </p>
          </div>

          <div className="glass-card rounded-3xl p-5 space-y-2 border-amber-500/20 hover:border-amber-500/40 transition-all">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 flex items-center justify-center text-xl">
              ⏰
            </div>
            <h3 className="text-sm font-black text-white">Follow Up</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We'll remind you automatically when the target prediction window completes.
            </p>
          </div>

          <div className="glass-card rounded-3xl p-5 space-y-2 border-purple-500/20 hover:border-purple-500/40 transition-all">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/20 flex items-center justify-center text-xl">
              📊
            </div>
            <h3 className="text-sm font-black text-white">Review</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              See historical user-reported outcome rates across all your consultations.
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. How It Works Visual Timeline Strip ───────────────────── */}
      <section className="glass-card rounded-3xl p-6 space-y-4 border-slate-800">
        <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider text-center">
          How AstroProof Works
        </h3>
        <div className="flex flex-wrap items-center justify-between gap-3 text-center text-xs">
          {[
            { step: '1', title: 'Consultation', desc: 'Astrologer makes prediction' },
            { step: '2', title: 'Prediction Recorded', desc: 'Timestamped & locked' },
            { step: '3', title: 'Follow-Up', desc: 'Window ends notification' },
            { step: '4', title: 'User Reports Outcome', desc: 'Yes / Partial / No' },
            { step: '5', title: 'History Updated', desc: 'Transparent record built' }
          ].map((s, idx) => (
            <React.Fragment key={idx}>
              <div className="flex-1 min-w-[120px] bg-slate-900/80 rounded-2xl p-3 border border-slate-800 space-y-1">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[11px] inline-flex items-center justify-center">
                  {s.step}
                </span>
                <p className="font-bold text-white text-xs">{s.title}</p>
                <p className="text-[10px] text-slate-400">{s.desc}</p>
              </div>
              {idx < 4 && <ChevronRight className="w-4 h-4 text-slate-600 hidden md:block shrink-0" />}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* ── 3. Prediction Dashboard & Trust Score ───────────────────── */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-white flex items-center gap-2">
              My AstroProof Dashboard
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Your personal prediction tracking stats and user-reported verification record
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="cosmic-gradient-btn px-5 py-3 rounded-2xl text-xs font-black flex items-center gap-2 shadow-lg shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Prediction</span>
          </button>
        </div>

        {/* Stats Grid + Transparency Score Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Stat Counters Grid (2x3) */}
          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="glass-card rounded-2xl p-4 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Total Recorded</span>
              <p className="text-2xl font-black text-white">{totalCount}</p>
              <span className="text-[10px] text-slate-500 font-mono">Timestamped predictions</span>
            </div>

            <div className="glass-card rounded-2xl p-4 space-y-1 border-emerald-500/20">
              <span className="text-[10px] text-emerald-400 uppercase font-bold tracking-wider">Confirmed</span>
              <p className="text-2xl font-black text-emerald-400">{confirmedCount}</p>
              <span className="text-[10px] text-slate-500">🟢 Confirmed by you</span>
            </div>

            <div className="glass-card rounded-2xl p-4 space-y-1 border-amber-500/20">
              <span className="text-[10px] text-amber-400 uppercase font-bold tracking-wider">Partially Confirmed</span>
              <p className="text-2xl font-black text-amber-400">{partialCount}</p>
              <span className="text-[10px] text-slate-500">🟡 Partial outcome</span>
            </div>

            <div className="glass-card rounded-2xl p-4 space-y-1 border-red-500/20">
              <span className="text-[10px] text-red-400 uppercase font-bold tracking-wider">Not Confirmed</span>
              <p className="text-2xl font-black text-red-400">{notConfirmedCount}</p>
              <span className="text-[10px] text-slate-500">🔴 Not occurred</span>
            </div>

            <div className="glass-card rounded-2xl p-4 space-y-1 border-purple-500/20">
              <span className="text-[10px] text-purple-400 uppercase font-bold tracking-wider">Pending Window</span>
              <p className="text-2xl font-black text-purple-400">{pendingCount}</p>
              <span className="text-[10px] text-slate-500">⏳ Active prediction window</span>
            </div>

            <div className="glass-card rounded-2xl p-4 space-y-1 border-slate-700">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Unclear</span>
              <p className="text-2xl font-black text-slate-300">{unclearCount}</p>
              <span className="text-[10px] text-slate-500">⚪ Outcome uncertain</span>
            </div>
          </div>

          {/* User-Reported Transparency Score Card (Requirements #6, #12) */}
          <div className="glass-card-gold rounded-3xl p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">AstroProof Transparency</span>
                <span className="text-xs">🛡️</span>
              </div>

              <div className="text-4xl font-black text-white flex items-baseline gap-2">
                {userReportedConfirmationRate}%
                <span className="text-xs text-amber-300 font-normal">Confirmation Rate</span>
              </div>

              <p className="text-xs text-slate-300 font-semibold leading-snug">
                User-reported confirmation rate
              </p>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Based on recorded predictions with completed user outcomes.
              </p>
            </div>

            {/* Strict Scientific Disclaimer Tag */}
            <div className="bg-slate-950/80 border border-amber-500/20 rounded-xl p-3 text-[10px] text-amber-200/80 space-y-1">
              <div className="flex items-center gap-1 font-bold text-amber-300">
                <Info className="w-3.5 h-3.5 shrink-0" /> Important Transparency Note:
              </div>
              <p>
                Calculated strictly from user-reported outcomes. This metric does not constitute scientific proof or validation of accuracy.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── 4. Filters, Search & Sort Bar ──────────────────────────── */}
      <section className="space-y-6">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 text-xs">
          {/* Category Filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-slate-400 font-semibold flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-slate-400" /> Category:
            </span>
            {['All', 'Career', 'Love', 'Finance', 'Education', 'Business', 'Travel'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-slate-800/80 text-slate-400 hover:text-white border border-slate-700/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Status & Sort Filter */}
          <div className="flex items-center gap-3">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-slate-200 text-xs focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Confirmed">🟢 Confirmed</option>
              <option value="Partially Confirmed">🟡 Partially Confirmed</option>
              <option value="Not Confirmed">🔴 Not Confirmed</option>
              <option value="Pending">⏳ Pending</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-slate-200 text-xs focus:outline-none"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="astrologer">Sort by Astrologer</option>
            </select>
          </div>
        </div>

        {/* ── 5. Prediction Cards List ──────────────────────────────── */}
        <div className="space-y-4">
          {filteredPredictions.length === 0 ? (
            <div className="glass-card rounded-3xl p-12 text-center space-y-3">
              <div className="text-4xl">🔮</div>
              <h3 className="text-base font-bold text-white">No predictions match selected filters</h3>
              <p className="text-xs text-slate-400">Try changing your category or status filter above</p>
            </div>
          ) : (
            filteredPredictions.map((pred) => {
              const isConfirmed = pred.status === 'Verified by User' || pred.status === 'Confirmed';
              const isPartial = pred.status === 'Partially Verified' || pred.status === 'Partially Confirmed';
              const isNotConfirmed = pred.status === 'Not Occurred' || pred.status === 'Not Confirmed';
              const isPending = pred.status === 'Pending Verification' || pred.status === 'Pending';
              const isUnclear = pred.status === 'Unclear';

              let statusBadgeClass = 'bg-slate-800 text-slate-300 border-slate-700';
              let statusText = pred.status;

              if (isConfirmed) {
                statusBadgeClass = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
                statusText = '🟢 User Reported — Confirmed';
              } else if (isPartial) {
                statusBadgeClass = 'bg-amber-500/20 text-amber-300 border-amber-500/40';
                statusText = '🟡 User Reported — Partially Confirmed';
              } else if (isNotConfirmed) {
                statusBadgeClass = 'bg-red-500/20 text-red-300 border-red-500/40';
                statusText = '🔴 User Reported — Not Confirmed';
              } else if (isPending) {
                statusBadgeClass = 'bg-purple-500/20 text-purple-300 border-purple-500/40';
                statusText = '⏳ Pending Verification';
              } else if (isUnclear) {
                statusBadgeClass = 'bg-slate-800 text-slate-400 border-slate-700';
                statusText = '⚪ Unclear';
              }

              return (
                <div
                  key={pred.id}
                  className={`glass-card rounded-3xl p-6 space-y-4 transition-all ${
                    isConfirmed ? 'border-emerald-500/30' : 'border-slate-800 hover:border-amber-500/40'
                  }`}
                >
                  {/* Card Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={pred.astrologerAvatar}
                        alt={pred.astrologerName}
                        className="w-10 h-10 rounded-full object-cover border border-amber-500/30"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          {pred.astrologerName}
                          <span className="text-[10px] font-bold bg-slate-800 text-amber-300 px-2 py-0.5 rounded-full">
                            {pred.category}
                          </span>
                        </h4>
                        <span className="text-[10px] text-slate-400 font-mono">Recorded: {pred.dateLogged}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 flex items-center gap-1">
                        <Hash className="w-3 h-3 text-amber-400" /> {pred.hashId}
                      </span>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full border ${statusBadgeClass}`}>
                        {statusText}
                      </span>
                    </div>
                  </div>

                  {/* Statement (Read-only) */}
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      🔒 Timestamped Locked Prediction:
                    </span>
                    <p className="text-xs sm:text-sm text-slate-200 bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800/80 italic font-medium leading-relaxed">
                      "{pred.statement}"
                    </p>
                  </div>

                  {/* Footer & Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
                    <div className="text-amber-300/90 font-mono text-[11px]">
                      Outcome Window: <strong>{pred.predictionWindow}</strong>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedPredForTimeline(pred)}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1 border border-slate-700 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" /> Timeline
                      </button>

                      {isConfirmed && (
                        <button
                          onClick={() => handleShareClick(pred)}
                          className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-1 border border-emerald-500/30 transition-colors"
                        >
                          <Share2 className="w-3.5 h-3.5" /> Share Insight
                        </button>
                      )}

                      {isPending ? (
                        <button
                          onClick={() => setSelectedPredForOutcome(pred)}
                          className="cosmic-gradient-btn px-4 py-2 rounded-xl text-xs font-black shadow-md flex items-center gap-1.5"
                        >
                          <Clock className="w-3.5 h-3.5" />
                          <span>Did this happen? (Record Outcome)</span>
                        </button>
                      ) : (
                        <div className="text-right text-xs bg-slate-900/60 px-3 py-1.5 rounded-xl border border-slate-800">
                          <span className="text-slate-400">Outcome Note: </span>
                          <strong className="text-emerald-300 font-medium">"{pred.userNote || 'Outcome verified'}"</strong>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* ── 6. AstroProof Badges Section (Requirement #17) ──────────── */}
      <section className="glass-card-purple rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-purple-300 uppercase tracking-widest block">Gamified Participation Rewards</span>
            <h3 className="text-xl font-black text-white mt-1">AstroProof Badges</h3>
            <p className="text-xs text-slate-300">Earn AstroCoins by reporting honest outcome verifications</p>
          </div>
          <Award className="w-8 h-8 text-purple-400" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {ASTROPROOF_BADGES.map((b) => (
            <div
              key={b.id}
              className={`rounded-2xl p-4 text-center space-y-2 border transition-all ${
                b.earned
                  ? 'bg-purple-500/15 border-purple-500/40 text-purple-200'
                  : 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60'
              }`}
            >
              <div className="text-3xl">{b.icon}</div>
              <h4 className="text-xs font-bold text-white">{b.label}</h4>
              <p className="text-[10px] text-slate-400 leading-tight">{b.desc}</p>
              {b.earned && (
                <span className="inline-block text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  ✓ EARNED
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. Privacy Notice (Requirement #19) ─────────────────────── */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 text-center max-w-xl mx-auto space-y-3">
        <div className="w-10 h-10 rounded-2xl bg-slate-800 flex items-center justify-center text-xl mx-auto">
          🔒
        </div>
        <h3 className="text-base font-black text-white">Private by Default</h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Your AstroProof history is visible only to you unless you explicitly choose to share selected predictions. Astrologer profiles display only aggregated, anonymized user-reported outcome statistics.
        </p>
      </section>

      {/* ── 8. Business Value Section (Requirement #22) ──────────────── */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-black text-white">Why AstroProof Matters</h2>
          <p className="text-xs text-slate-400 mt-1">Transforming one-time consultations into ongoing trust relationships</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card rounded-3xl p-6 space-y-3 border-emerald-500/20">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-xl">
              👤
            </div>
            <h3 className="text-base font-black text-white">For Users</h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Full consultation memory & clarity</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Automatic reminder follow-ups</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Authentic user-reported ratings</li>
            </ul>
          </div>

          <div className="glass-card rounded-3xl p-6 space-y-3 border-amber-500/20">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 flex items-center justify-center text-xl">
              🔮
            </div>
            <h3 className="text-base font-black text-white">For Astrologers</h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-amber-400 shrink-0" /> High-trust reputation signals</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Structured consultation records</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Repeat consultation flywheel</li>
            </ul>
          </div>

          <div className="glass-card rounded-3xl p-6 space-y-3 border-purple-500/20">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/20 flex items-center justify-center text-xl">
              ✨
            </div>
            <h3 className="text-base font-black text-white">For AstroLive</h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-purple-400 shrink-0" /> Unmatched market differentiation</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-purple-400 shrink-0" /> Multi-month user retention</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-purple-400 shrink-0" /> Recurring relationship value</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── 9. Prototype Success Metrics (Requirement #24) ──────────── */}
      <section className="glass-card-gold rounded-3xl p-6 sm:p-8 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">Prototype Metrics Dashboard</span>
            <h3 className="text-lg font-black text-white mt-0.5">AstroProof Success Metrics</h3>
          </div>
          <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full border border-amber-500/30">
            Illustrative / Demo Data
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-center">
          {[
            { label: 'Prediction Creation Rate', val: '72%' },
            { label: 'Outcome Completion', val: '84%' },
            { label: 'Repeat Consultation Rate', val: '68%' },
            { label: 'AstroProof Views', val: '14.2K' },
            { label: 'Conversion Lift', val: '+24.5%' }
          ].map((m, idx) => (
            <div key={idx} className="bg-slate-950/60 rounded-2xl p-3 border border-slate-800 space-y-1">
              <p className="text-[10px] text-slate-400 font-bold uppercase">{m.label}</p>
              <p className="text-xl font-black text-amber-300">{m.val}</p>
            </div>
          ))}
        </div>
      </section>


      {/* ── MODAL 1: Add Prediction Modal & Lock Flow (Requirement #4, #5) ── */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#0f1226] border border-amber-500/30 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 relative">
            <button
              onClick={handleCloseAddModal}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {lockStep === 1 && (
              <>
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-white flex items-center gap-2">
                    <Plus className="w-5 h-5 text-amber-400" /> Record New Prediction
                  </h3>
                  <p className="text-xs text-slate-400">Timestamp and lock a specific prediction from your consultation</p>
                </div>

                <form onSubmit={handleLockSubmit} className="space-y-4 text-xs">
                  {/* Statement */}
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">
                      Prediction Statement <span className="text-amber-400">*</span>
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={newPredForm.statement}
                      onChange={(e) => setNewPredForm({ ...newPredForm, statement: e.target.value })}
                      placeholder='e.g. "You may receive a new career opportunity within the next 30 days."'
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-amber-500 text-xs"
                    />
                  </div>

                  {/* Category & Astrologer */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-bold mb-1">Category</label>
                      <select
                        value={newPredForm.category}
                        onChange={(e) => setNewPredForm({ ...newPredForm, category: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none text-xs"
                      >
                        <option value="Career">💼 Career</option>
                        <option value="Love">💖 Love & Relationship</option>
                        <option value="Education">🎓 Education</option>
                        <option value="Business">🚀 Business</option>
                        <option value="Finance">💰 Finance</option>
                        <option value="Family">🏡 Family</option>
                        <option value="Other">🔮 Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-300 font-bold mb-1">Astrologer</label>
                      <select
                        value={newPredForm.astrologerId}
                        onChange={(e) => {
                          const astro = astrologers.find((a) => a.id === e.target.value);
                          setNewPredForm({
                            ...newPredForm,
                            astrologerId: e.target.value,
                            astrologerName: astro ? astro.name : 'Acharya Priya Sharma'
                          });
                        }}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none text-xs"
                      >
                        {astrologers.map((a) => (
                          <option key={a.id} value={a.id}>{a.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Date & Prediction Window */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-bold mb-1">Prediction Date</label>
                      <input
                        type="text"
                        disabled
                        value={new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-400 text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-bold mb-1">Prediction Window</label>
                      <select
                        value={newPredForm.predictionWindowDays}
                        onChange={(e) => setNewPredForm({ ...newPredForm, predictionWindowDays: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none text-xs"
                      >
                        <option value="7">7 Days</option>
                        <option value="14">14 Days</option>
                        <option value="30">30 Days</option>
                        <option value="60">60 Days</option>
                        <option value="custom">Custom</option>
                      </select>
                    </div>
                  </div>

                  {newPredForm.predictionWindowDays === 'custom' && (
                    <div>
                      <label className="block text-slate-300 font-bold mb-1">Custom Days</label>
                      <input
                        type="number"
                        placeholder="e.g. 45"
                        value={newPredForm.customWindow}
                        onChange={(e) => setNewPredForm({ ...newPredForm, customWindow: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none text-xs"
                      />
                    </div>
                  )}

                  {/* Optional Notes */}
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Optional Notes</label>
                    <input
                      type="text"
                      placeholder="e.g. Discussed during Sun-Jupiter sub-transit consultation"
                      value={newPredForm.notes}
                      onChange={(e) => setNewPredForm({ ...newPredForm, notes: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none text-xs"
                    />
                  </div>

                  <div className="flex gap-3 pt-3 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={handleCloseAddModal}
                      className="flex-1 py-3 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs hover:bg-slate-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 rounded-xl cosmic-gradient-btn font-black text-xs shadow-lg flex items-center justify-center gap-1.5"
                    >
                      <Lock className="w-4 h-4" /> Lock Prediction
                    </button>
                  </div>
                </form>
              </>
            )}

            {/* Lock Confirmation Step (Requirement #5) */}
            {lockStep === 2 && lockedPredData && (
              <div className="text-center space-y-5 animate-in zoom-in-95 duration-150">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-3xl mx-auto">
                  🔒
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-black text-white">Prediction Locked</h3>
                  <p className="text-xs text-slate-400">
                    This prediction has been timestamped and added to your AstroProof history.
                  </p>
                </div>

                {/* Displayed Locked Card */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 text-left space-y-3 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Locked Statement</span>
                    <p className="text-xs text-slate-200 italic font-medium bg-slate-950 p-3 rounded-xl border border-slate-800">
                      "{lockedPredData.statement}"
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-[11px]">
                    <div>
                      <span className="text-slate-500">Astrologer:</span>
                      <p className="font-bold text-slate-200">{lockedPredData.astrologerName}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Created Date:</span>
                      <p className="font-bold text-slate-200">{lockedPredData.createdDate}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Outcome Window:</span>
                      <p className="font-bold text-amber-300">{lockedPredData.windowStr}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Status:</span>
                      <p className="font-bold text-purple-400">{lockedPredData.status}</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCloseAddModal}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-xs shadow-lg hover:scale-[1.02] transition-all"
                >
                  Done & View in AstroProof →
                </button>
              </div>
            )}
          </div>
        </div>
      )}


      {/* ── MODAL 2: Outcome Follow-up Modal (Requirements #8, #9) ─────── */}
      {selectedPredForOutcome && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#0f1226] border border-amber-500/30 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-400 flex items-center gap-1">
                  🔔 Prediction Window Ended
                </span>
                <h3 className="text-lg font-black text-white mt-1">Did this happen?</h3>
              </div>
              <button
                onClick={() => setSelectedPredForOutcome(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 text-xs italic text-slate-200">
              "{selectedPredForOutcome.statement}"
            </div>

            <form onSubmit={handleOutcomeSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-2">Select User Outcome:</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { val: 'Yes', label: '🟢 Yes (Confirmed)' },
                    { val: 'Partially', label: '🟡 Partially' },
                    { val: 'No', label: '🔴 No (Not Confirmed)' },
                    { val: 'Not Sure', label: '⚪ Not Sure' }
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      type="button"
                      onClick={() => setOutcomeChoice(opt.val)}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all text-left ${
                        outcomeChoice === opt.val
                          ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-md'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Tell us what happened (Optional):</label>
                <textarea
                  rows={2}
                  value={outcomeNote}
                  onChange={(e) => setOutcomeNote(e.target.value)}
                  placeholder='e.g. "I received an interview invitation on Aug 24 as predicted."'
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-amber-500 text-xs"
                />
              </div>

              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-2.5 text-[10px] text-amber-300 text-center">
                🎁 Earn <strong>15 AstroCoins</strong> for reporting honest outcome feedback!
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedPredForOutcome(null)}
                  className="flex-1 py-3 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl cosmic-gradient-btn font-black text-xs shadow-lg"
                >
                  Submit Outcome
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


      {/* ── MODAL 3: Timeline Visual Modal (Requirement #10) ────────── */}
      {selectedPredForTimeline && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#0f1226] border border-amber-500/30 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-400" /> AstroProof Timeline
              </h3>
              <button
                onClick={() => setSelectedPredForTimeline(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs italic text-slate-300">
              "{selectedPredForTimeline.statement}"
            </div>

            {/* Visual Step-by-Step Timeline */}
            <div className="space-y-4 relative pl-6 border-l-2 border-slate-800 my-4 text-xs">
              <div className="relative">
                <span className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#0f1226]" />
                <p className="font-bold text-white">{selectedPredForTimeline.dateLogged || '8 Aug 2026'}</p>
                <p className="text-[11px] text-slate-400">Prediction timestamped & locked on ledger ({selectedPredForTimeline.hashId})</p>
              </div>

              <div className="relative">
                <span className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-amber-500 border-2 border-[#0f1226]" />
                <p className="font-bold text-white">Mid-window Reminder Sent</p>
                <p className="text-[11px] text-slate-400">Notification reminder dispatched to keep prediction top of mind</p>
              </div>

              <div className="relative">
                <span className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-purple-500 border-2 border-[#0f1226]" />
                <p className="font-bold text-white">Target Window Completed</p>
                <p className="text-[11px] text-slate-400">{selectedPredForTimeline.predictionWindow}</p>
              </div>

              <div className="relative">
                <span className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-cyan-500 border-2 border-[#0f1226]" />
                <p className="font-bold text-white">
                  {selectedPredForTimeline.verifiedDate ? `User Outcome Reported (${selectedPredForTimeline.verifiedDate})` : 'Outcome Follow-up Scheduled'}
                </p>
                <p className="text-[11px] text-slate-400">
                  {selectedPredForTimeline.userNote ? `Note: "${selectedPredForTimeline.userNote}"` : 'Awaiting user verification'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedPredForTimeline(null)}
              className="w-full py-3 rounded-xl bg-slate-800 text-slate-200 text-xs font-bold hover:bg-slate-700"
            >
              Close Timeline
            </button>
          </div>
        </div>
      )}


      {/* ── MODAL 4: Shareable AstroProof Card (Requirement #20) ────── */}
      {selectedPredForShare && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#0f1226] border border-emerald-500/30 rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-5 text-center">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase text-emerald-400 tracking-wider">Share Verified Outcome</span>
              <button
                onClick={() => setSelectedPredForShare(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Shareable Card Frame */}
            <div className="bg-gradient-to-br from-emerald-500/15 via-slate-900 to-purple-500/15 border border-emerald-500/30 rounded-2xl p-5 text-left space-y-3 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-amber-300 uppercase tracking-widest">AstroProof Verified</span>
                <span className="text-xs">🛡️</span>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Prediction</span>
                <p className="text-xs text-white italic font-semibold">"{selectedPredForShare.statement}"</p>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">Astrologer</span>
                  <strong className="text-slate-200">{selectedPredForShare.astrologerName}</strong>
                </div>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold px-2.5 py-1 rounded-full">
                  🟢 Confirmed
                </span>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-2.5 text-[10px] text-slate-400 flex items-center justify-center gap-1.5">
              <Lock className="w-3 h-3 text-slate-400" />
              <span>Private consultation content & birth details are hidden.</span>
            </div>

            <button
              onClick={() => {
                showToast('✨ Share card link copied to clipboard!', 'success');
                setSelectedPredForShare(null);
              }}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-xs shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4" /> Share Insight Card
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
