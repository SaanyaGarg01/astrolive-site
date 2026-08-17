import React, { useState, useEffect } from 'react';
import { useAstro } from '../context/AstroContext';
import { SUBSCRIPTION_TIERS, PLAN_COMPARISON_TABLE } from '../data/mockData';
import {
  trackSubscriptionViewed,
  trackPlanSelected,
  trackBillingCycleChanged,
  trackUpgradeClicked,
  trackCheckoutStarted
} from '../services/subscriptionAnalytics';
import {
  Crown, Check, Sparkles, ArrowRight, Info, X,
  Zap, Shield, Heart, ChevronDown, Minus, Star
} from 'lucide-react';

// ─── Comparison table cell ─────────────────────────────────────────────────
function TableCell({ value }) {
  if (value === true) return <Check className="w-4 h-4 text-emerald-400 mx-auto" />;
  if (value === false) return <Minus className="w-4 h-4 text-slate-600 mx-auto" />;
  return <span className="text-xs text-slate-300 font-medium">{value}</span>;
}

// ─── Plan Card ─────────────────────────────────────────────────────────────
function PlanCard({ tier, isYearly, currentMembership, onUpgradeClick }) {
  const isCurrent = currentMembership === tier.name;
  const isPopular = tier.badge === 'MOST POPULAR';
  const isPremium = tier.id === 'premium';
  const isFree = tier.id === 'free';

  const displayPrice = isFree
    ? '₹0'
    : isYearly
    ? tier.yearlyPrice
    : tier.price;

  const effectiveLabel = isYearly && !isFree
    ? `≈ ₹${tier.effectiveMonthly}/month`
    : !isFree
    ? `per month`
    : 'forever free';

  const savingsLabel = isYearly && !isFree
    ? `Save ₹${tier.yearlySavings}`
    : null;

  let cardClass = 'plus-plan-card relative flex flex-col rounded-3xl border transition-all duration-300 overflow-hidden';
  if (isPopular) cardClass += ' plus-plan-card--popular';
  else if (isPremium) cardClass += ' plus-plan-card--premium';
  else cardClass += ' plus-plan-card--free';

  return (
    <div className={cardClass}>
      {/* Badge */}
      {tier.badge && (
        <div className={`absolute top-0 left-0 right-0 text-center py-1.5 text-[10px] font-black tracking-widest uppercase ${
          isPopular ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-slate-900'
          : 'bg-gradient-to-r from-purple-600 to-purple-500 text-white'
        }`}>
          {tier.badge}
        </div>
      )}

      <div className={`flex flex-col flex-1 p-6 ${tier.badge ? 'pt-9' : 'pt-6'}`}>
        {/* Header */}
        <div className="text-center space-y-3 pb-5 border-b border-white/10">
          <div className="text-3xl">{tier.icon}</div>
          <div>
            <h3 className={`text-lg font-black tracking-wide ${isFree ? 'text-slate-300' : isPopular ? 'text-amber-300' : 'text-purple-300'}`}>
              {tier.name}
            </h3>
            <p className="text-xs text-slate-400 mt-1">{tier.description}</p>
          </div>

          <div className="space-y-1">
            <div className={`text-3xl font-black ${isFree ? 'text-slate-200' : isPopular ? 'text-amber-400' : 'text-purple-300'}`}>
              {displayPrice}
            </div>
            <div className="text-[11px] text-slate-400">{effectiveLabel}</div>
            {savingsLabel && (
              <span className="inline-block text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                {savingsLabel}
              </span>
            )}
          </div>
        </div>

        {/* Features */}
        <ul className="flex-1 space-y-2.5 my-5 text-xs text-slate-300">
          {tier.features.map((feat, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${isFree ? 'text-slate-400' : isPopular ? 'text-amber-400' : 'text-purple-400'}`} />
              <span>{feat}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        {isCurrent ? (
          <div className="w-full py-3 rounded-2xl text-xs font-bold text-center bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            ✓ Current Plan
          </div>
        ) : isFree ? (
          <div className="w-full py-3 rounded-2xl text-xs font-bold text-center bg-slate-800/60 text-slate-400 border border-slate-700/50">
            Free Forever
          </div>
        ) : (
          <button
            onClick={() => onUpgradeClick(tier)}
            className={`w-full py-3 rounded-2xl text-xs font-black transition-all shadow-lg hover:scale-[1.02] active:scale-[0.98] ${
              isPopular
                ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-slate-900 shadow-amber-500/30'
                : 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-purple-500/30'
            }`}
          >
            {tier.buttonText} →
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Checkout Modal ────────────────────────────────────────────────────────
function CheckoutModal({ tier, isYearly, onConfirm, onClose }) {
  const [step, setStep] = useState(1); // 1=summary, 2=success
  const price = tier.id === 'plus'
    ? (isYearly ? '₹1,999/year' : '₹199/month')
    : (isYearly ? '₹3,999/year' : '₹399/month');

  const benefitSummary = tier.id === 'plus'
    ? ['Personalized insights', 'Consultation discounts', 'Advanced Astro Journey', 'Extra rewards & 2x coins']
    : ['Everything in Plus', 'Premium astrology reports', 'VIP astrologer matching', '₹250 monthly credits'];

  const handleContinue = () => {
    trackCheckoutStarted({ planId: tier.id, planName: tier.name, billingCycle: isYearly ? 'yearly' : 'monthly', price });
    setStep(2);
  };

  const handleActivate = () => {
    onConfirm(tier.id, isYearly ? 'yearly' : 'monthly');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0f1226] border border-amber-500/25 rounded-3xl max-w-md w-full shadow-2xl overflow-hidden">

        {step === 1 && (
          <>
            <div className="bg-gradient-to-r from-amber-500/10 to-purple-500/10 border-b border-slate-800 p-6 text-center space-y-2">
              <div className="text-3xl">{tier.icon}</div>
              <h3 className="text-xl font-black text-white">Upgrade to AstroLive {tier.name}</h3>
              <p className="text-xs text-slate-400">Review your selection before activating your demo plan</p>
            </div>

            <div className="p-6 space-y-5">
              {/* Order summary */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-3 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Plan</span>
                  <strong className="text-amber-300">AstroLive {tier.name}</strong>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Billing</span>
                  <span className="capitalize">{isYearly ? 'Yearly' : 'Monthly'}</span>
                </div>
                {isYearly && (
                  <div className="flex justify-between text-slate-300">
                    <span>Effective monthly</span>
                    <span className="text-emerald-400">≈ ₹{tier.effectiveMonthly}/month</span>
                  </div>
                )}
                <div className="flex justify-between font-bold border-t border-slate-800 pt-3 text-white text-sm">
                  <span>Total</span>
                  <span className="text-amber-300">{price}</span>
                </div>
              </div>

              {/* Benefits preview */}
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">What you unlock</p>
                <ul className="space-y-2">
                  {benefitSummary.map((b, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Disclaimer */}
              <p className="text-[10px] text-slate-500 text-center">
                🔒 Prototype only — no actual payment will be charged. Pricing is illustrative.
              </p>

              <div className="flex gap-3">
                <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 transition-colors">
                  Cancel
                </button>
                <button
                  onClick={handleContinue}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-900 text-xs font-black shadow-lg hover:shadow-amber-500/30 transition-all"
                >
                  Continue to Demo Checkout
                </button>
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <div className="p-8 text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500/20 to-purple-500/20 border border-amber-500/30 flex items-center justify-center mx-auto text-4xl animate-bounce">
              🎉
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white">Welcome to AstroLive {tier.name}!</h3>
              <p className="text-sm text-slate-300">You've unlocked your personalized astrology experience.</p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 text-left space-y-2 text-xs">
              <p className="font-bold text-slate-300 text-[10px] uppercase tracking-widest">Your benefits are now active</p>
              {benefitSummary.map((b, i) => (
                <div key={i} className="flex items-center gap-2 text-slate-300">
                  <span className="text-amber-400">✓</span> {b}
                </div>
              ))}
            </div>

            <button
              onClick={handleActivate}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-900 font-black text-sm shadow-xl hover:shadow-amber-500/40 transition-all"
            >
              Explore My Benefits →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────
export default function MembershipPage() {
  const { userProfile, upgradeMembership, setActiveTab, subscriptionBilling, setSubscriptionBilling } = useAstro();
  const [isYearly, setIsYearly] = useState(subscriptionBilling === 'yearly');
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Fire view analytics on mount
  useEffect(() => {
    trackSubscriptionViewed({ currentPlan: userProfile.membership, billingCycle: isYearly ? 'yearly' : 'monthly' });
  }, []);

  const handleToggleBilling = () => {
    const newIsYearly = !isYearly;
    setIsYearly(newIsYearly);
    setSubscriptionBilling(newIsYearly ? 'yearly' : 'monthly');
    trackBillingCycleChanged({ from: isYearly ? 'yearly' : 'monthly', to: newIsYearly ? 'yearly' : 'monthly' });
  };

  const handleUpgradeClick = (tier) => {
    trackUpgradeClicked({ planId: tier.id, planName: tier.name, source: 'membership_page' });
    trackPlanSelected({ planId: tier.id, planName: tier.name, billingCycle: isYearly ? 'yearly' : 'monthly', price: isYearly ? tier.yearlyPrice : tier.price });
    setSelectedPlan(tier);
  };

  const handleConfirmUpgrade = (planId, billing) => {
    upgradeMembership(planId, billing);
    setSelectedPlan(null);
    setActiveTab('home');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-16 py-8">

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          <Crown className="w-3.5 h-3.5 text-amber-400" /> AstroLive Plus
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
          Make astrology part of your<br />
          <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">everyday journey.</span>
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed max-w-lg mx-auto">
          Unlock deeper personalization, exclusive insights and benefits designed around your AstroLive journey.
        </p>
      </div>

      {/* ── Prototype Disclaimer ──────────────────────────────────────── */}
      <div className="bg-amber-500/8 border border-amber-500/20 rounded-2xl p-3 text-xs text-amber-200/70 flex items-center gap-2 justify-center text-center max-w-xl mx-auto">
        <Info className="w-4 h-4 text-amber-400 shrink-0" />
        <span>
          <strong className="text-amber-300">Prototype Pricing:</strong> These are illustrative prices for demonstration purposes only. Not actual AstroLive subscription prices.
        </span>
      </div>

      {/* ── Billing Toggle ────────────────────────────────────────────── */}
      <div className="flex items-center justify-center gap-4">
        <span className={`text-sm font-bold transition-colors ${!isYearly ? 'text-white' : 'text-slate-500'}`}>Monthly</span>
        <button
          onClick={handleToggleBilling}
          id="billing-toggle"
          className={`relative w-14 h-7 rounded-full transition-all duration-300 border ${
            isYearly ? 'bg-amber-500 border-amber-400' : 'bg-slate-700 border-slate-600'
          }`}
        >
          <div className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md transition-all duration-300 ${
            isYearly ? 'left-7' : 'left-0.5'
          }`} />
        </button>
        <div className="flex items-center gap-2">
          <span className={`text-sm font-bold transition-colors ${isYearly ? 'text-white' : 'text-slate-500'}`}>Yearly</span>
          <span className="text-[10px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
            Save up to 20%
          </span>
        </div>
      </div>

      {/* ── Plan Cards ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {SUBSCRIPTION_TIERS.map((tier) => (
          <PlanCard
            key={tier.id}
            tier={tier}
            isYearly={isYearly}
            currentMembership={userProfile.membership}
            onUpgradeClick={handleUpgradeClick}
          />
        ))}
      </div>

      {/* ── Plan Comparison Table ─────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-black text-white">Compare All Plans</h2>
          <p className="text-xs text-slate-400 mt-1">See everything that's included at each tier</p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60">
          <table className="w-full text-xs min-w-[480px]">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left p-4 text-slate-400 font-semibold w-1/2">Feature</th>
                <th className="text-center p-4 text-slate-300 font-bold">🌙 Free</th>
                <th className="text-center p-4 text-amber-300 font-bold bg-amber-500/5">✨ Plus</th>
                <th className="text-center p-4 text-purple-300 font-bold">👑 Premium</th>
              </tr>
            </thead>
            <tbody>
              {PLAN_COMPARISON_TABLE.map((row, i) => (
                <tr key={i} className={`border-b border-slate-800/60 ${i % 2 === 0 ? 'bg-transparent' : 'bg-slate-900/30'}`}>
                  <td className="p-4 text-slate-300 font-medium">{row.feature}</td>
                  <td className="p-4 text-center"><TableCell value={row.free} /></td>
                  <td className="p-4 text-center bg-amber-500/5"><TableCell value={row.plus} /></td>
                  <td className="p-4 text-center"><TableCell value={row.premium} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Why AstroLive Plus? ───────────────────────────────────────── */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-xl font-black text-white">Why AstroLive Plus?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Heart className="w-6 h-6 text-pink-400" />,
              bg: 'from-pink-500/10 to-rose-500/5 border-pink-500/20',
              title: 'Personalized',
              body: 'Your experience becomes more relevant to your journey as AstroLive learns your patterns, concerns, and growth milestones.'
            },
            {
              icon: <Zap className="w-6 h-6 text-amber-400" />,
              bg: 'from-amber-500/10 to-orange-500/5 border-amber-500/20',
              title: 'Consistent',
              body: 'Build an ongoing relationship with AstroLive instead of using it only when you have a question. Daily rituals, reminders and insights keep you connected.'
            },
            {
              icon: <Shield className="w-6 h-6 text-emerald-400" />,
              bg: 'from-emerald-500/10 to-teal-500/5 border-emerald-500/20',
              title: 'Better Value',
              body: 'Receive consultation credits, exclusive features and discounts as a member. Every consultation costs you less as a Plus or Premium subscriber.'
            }
          ].map((card, i) => (
            <div key={i} className={`bg-gradient-to-br ${card.bg} border rounded-3xl p-6 space-y-3`}>
              <div className="w-12 h-12 rounded-2xl bg-slate-900/60 flex items-center justify-center">
                {card.icon}
              </div>
              <h3 className="text-base font-black text-white">{card.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Manage Subscription Link ──────────────────────────────────── */}
      {userProfile.membership !== 'FREE' && (
        <div className="text-center">
          <button
            onClick={() => setActiveTab('membership-manage')}
            className="text-xs text-slate-400 hover:text-slate-200 underline underline-offset-4 transition-colors"
          >
            Manage or cancel your subscription →
          </button>
        </div>
      )}

      {/* ── Checkout Modal ────────────────────────────────────────────── */}
      {selectedPlan && (
        <CheckoutModal
          tier={selectedPlan}
          isYearly={isYearly}
          onConfirm={handleConfirmUpgrade}
          onClose={() => setSelectedPlan(null)}
        />
      )}
    </div>
  );
}
