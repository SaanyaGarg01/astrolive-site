import React, { useState } from 'react';
import { useAstro } from '../context/AstroContext';
import { MEMBERSHIP_BENEFITS } from '../data/mockData';
import { trackSubscriptionCancelled } from '../services/subscriptionAnalytics';
import { Crown, Check, AlertTriangle, X, ArrowRight, CreditCard, RefreshCw, Calendar } from 'lucide-react';

// ─── Cancel Confirmation Modal ─────────────────────────────────────────────
function CancelModal({ currentPlan, onConfirm, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-150">
      <div className="bg-[#0f1226] border border-red-500/30 rounded-3xl max-w-sm w-full p-6 space-y-5 shadow-2xl text-center">
        <div className="w-14 h-14 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-7 h-7 text-red-400" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-black text-white">Cancel AstroLive {currentPlan}?</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            You'll lose access to all {currentPlan} benefits at the end of your billing period. Your account will revert to the Free plan.
          </p>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-3 text-left text-xs space-y-2">
          <p className="text-slate-400 font-semibold">You'll lose access to:</p>
          {(MEMBERSHIP_BENEFITS[currentPlan]?.benefits || []).map((b, i) => (
            <div key={i} className="flex items-center gap-2 text-slate-400">
              <X className="w-3 h-3 text-red-400 shrink-0" />
              <span>{b}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 transition-colors"
          >
            Keep My Plan
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 rounded-xl bg-red-600/80 hover:bg-red-600 text-white text-xs font-bold transition-colors border border-red-500/40"
          >
            Yes, Cancel
          </button>
        </div>
        <p className="text-[10px] text-slate-600">
          This is a prototype — no actual charges will be affected.
        </p>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────
export default function MembershipManagePage() {
  const { userProfile, cancelMembership, setActiveTab, subscriptionBilling, consultationCredits } = useAstro();
  const [showCancel, setShowCancel] = useState(false);

  const plan = userProfile.membership; // 'FREE' | 'PLUS' | 'PREMIUM'
  const benefits = MEMBERSHIP_BENEFITS[plan] || MEMBERSHIP_BENEFITS.FREE;
  const isFree = plan === 'FREE';

  const handleCancelConfirm = () => {
    cancelMembership();
    setShowCancel(false);
    setActiveTab('home');
  };

  if (isFree) {
    return (
      <div className="max-w-2xl mx-auto space-y-8 py-12 text-center">
        <div className="text-5xl">🌙</div>
        <h1 className="text-2xl font-black text-white">You're on the Free Plan</h1>
        <p className="text-sm text-slate-300 max-w-sm mx-auto">
          Upgrade to AstroLive Plus or Premium to unlock the full personalized experience.
        </p>
        <button
          onClick={() => setActiveTab('membership')}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-900 font-black text-sm shadow-lg hover:shadow-amber-500/30 transition-all"
        >
          <Crown className="w-4 h-4" />
          Explore Plus Plans
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  const planColor = plan === 'PLUS' ? 'amber' : 'purple';
  const planBg = plan === 'PLUS'
    ? 'from-amber-500/10 to-orange-500/5 border-amber-500/25'
    : 'from-purple-500/10 to-indigo-500/5 border-purple-500/25';

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-8">

      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="text-center space-y-2">
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
          plan === 'PLUS'
            ? 'bg-amber-500/20 border-amber-500/30 text-amber-300'
            : 'bg-purple-500/20 border-purple-500/30 text-purple-300'
        }`}>
          {benefits.icon} {benefits.label}
        </span>
        <h1 className="text-2xl font-black text-white">Manage Your Subscription</h1>
        <p className="text-xs text-slate-400">View your plan details, benefits, and billing information</p>
      </div>

      {/* ── Plan Status Card ───────────────────────────────────────── */}
      <div className={`bg-gradient-to-br ${planBg} border rounded-3xl p-6 space-y-5`}>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{benefits.icon}</span>
              <h2 className="text-lg font-black text-white">{benefits.label}</h2>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                ● ACTIVE
              </span>
              <span className="text-xs text-slate-400 capitalize">{subscriptionBilling} billing</span>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-black ${plan === 'PLUS' ? 'text-amber-400' : 'text-purple-300'}`}>
              {subscriptionBilling === 'yearly'
                ? (plan === 'PLUS' ? '₹1,999/yr' : '₹3,999/yr')
                : (plan === 'PLUS' ? '₹199/mo' : '₹399/mo')
              }
            </div>
          </div>
        </div>

        {/* Billing info */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-900/60 rounded-2xl p-3 text-center space-y-1">
            <Calendar className="w-4 h-4 text-slate-400 mx-auto" />
            <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Next Renewal</p>
            <p className="text-xs text-white font-bold">{benefits.renewalDate || 'N/A'}</p>
          </div>
          <div className="bg-slate-900/60 rounded-2xl p-3 text-center space-y-1">
            <CreditCard className="w-4 h-4 text-slate-400 mx-auto" />
            <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Consultation Credits</p>
            <p className="text-xs text-white font-bold">₹{consultationCredits} available</p>
          </div>
        </div>
      </div>

      {/* ── Active Benefits ────────────────────────────────────────── */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
        <h3 className="text-sm font-black text-white">Your Active Benefits</h3>
        <ul className="space-y-3">
          {benefits.benefits.map((b, i) => (
            <li key={i} className="flex items-center gap-3 text-xs text-slate-300 bg-slate-800/40 rounded-xl p-3">
              <Check className={`w-4 h-4 shrink-0 ${plan === 'PLUS' ? 'text-amber-400' : 'text-purple-400'}`} />
              {b}
            </li>
          ))}
        </ul>
      </div>

      {/* ── Consultation Credits Usage ─────────────────────────────── */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-black text-white">Consultation Credits</h3>
            <p className="text-xs text-slate-400 mt-0.5">Use credits toward any consultation booking</p>
          </div>
          <div className={`text-xl font-black ${plan === 'PLUS' ? 'text-amber-400' : 'text-purple-400'}`}>
            ₹{consultationCredits}
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setActiveTab('astrologers')}
            className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${
              plan === 'PLUS'
                ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-slate-900'
                : 'bg-gradient-to-r from-purple-600 to-purple-500 text-white'
            }`}
          >
            Use Credits
          </button>
          <button
            onClick={() => setActiveTab('astrologers')}
            className="flex-1 py-3 rounded-xl text-xs font-bold bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors border border-slate-700"
          >
            Browse Astrologers
          </button>
        </div>
      </div>

      {/* ── Actions ────────────────────────────────────────────────── */}
      <div className="space-y-3">
        <button
          onClick={() => setActiveTab('membership')}
          className="w-full py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-2 border border-slate-700 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Change Plan
        </button>
        <button
          onClick={() => setShowCancel(true)}
          className="w-full py-3 rounded-2xl text-red-400/80 hover:text-red-400 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
        >
          Cancel Subscription
        </button>
        <p className="text-center text-[10px] text-slate-600">
          Prototype — no actual billing is affected by any action on this page.
        </p>
      </div>

      {/* ── Cancel Modal ───────────────────────────────────────────── */}
      {showCancel && (
        <CancelModal
          currentPlan={plan}
          onConfirm={handleCancelConfirm}
          onClose={() => setShowCancel(false)}
        />
      )}
    </div>
  );
}
