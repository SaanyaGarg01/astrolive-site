import React from 'react';
import { useAstro } from '../context/AstroContext';
import { Coins, Gift, Flame, CheckCircle, ArrowLeft, Unlock, Info } from 'lucide-react';

export default function AstroCoinsShop() {
  const { userProfile, updateProfile, showToast, setActiveTab } = useAstro();

  const earnWays = [
    { title: 'Daily Ritual Check-in', reward: '+50 Coins', desc: 'Spin daily celestial wheel' },
    { title: 'Complete Birth Profile', reward: '+100 Coins', desc: 'Add exact birth time & city' },
    { title: 'Watch AI Astro Video', reward: '+30 Coins', desc: 'Watch custom transit video' },
    { title: 'AstroProof Verification', reward: '+40 Coins', desc: 'Report prediction outcome' },
    { title: '7-Day Streak Bonus', reward: '+150 Coins', desc: 'Maintain active streak' },
    { title: 'Referral Invite', reward: '+150 Coins', desc: 'Invite friend to AstroLive' }
  ];

  const redeemRewards = [
    { id: 'r1', title: '₹50 Consultation Discount Pass', cost: 300, icon: '🎫' },
    { id: 'r2', title: 'Unlock AI Transit Mini-Insight', cost: 150, icon: '✨' },
    { id: 'r3', title: '1-Day Plus Membership Preview', cost: 400, icon: '👑' },
    { id: 'r4', title: 'Priority Astrologer Queue Token', cost: 500, icon: '⚡' }
  ];

  const handleRedeem = (reward) => {
    if (userProfile.astroCoins < reward.cost) {
      showToast(`❌ Insufficient AstroCoins. You need ${reward.cost} coins.`, 'error');
      return;
    }
    updateProfile({ astroCoins: userProfile.astroCoins - reward.cost });
    showToast(`🎉 Claimed: ${reward.title}! Remaining balance: ${userProfile.astroCoins - reward.cost} coins.`, 'success');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6">
      {/* Balance Header */}
      <div className="glass-card-gold rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Rewards Currency</span>
          <h1 className="text-3xl font-extrabold text-white">AstroCoins Balance</h1>
          <p className="text-xs text-slate-300">
            Earn coins through daily engagement. Redeem for consultation passes & premium insights.
          </p>
        </div>

        <div className="bg-slate-950/80 border border-amber-500/40 rounded-2xl p-4 px-6 text-center shadow-xl shrink-0">
          <div className="flex items-center justify-center gap-2 text-3xl font-extrabold text-amber-400">
            <Coins className="w-8 h-8 text-amber-400" />
            <span>{userProfile.astroCoins}</span>
          </div>
          <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">AstroCoins Available</span>
        </div>
      </div>

      {/* Non-Cash Disclaimer */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3 text-xs text-slate-400 flex items-center gap-2">
        <Info className="w-4 h-4 text-amber-400 shrink-0" />
        <span>AstroCoins are promotional reward tokens for in-app unlocks only. Cash withdrawal is not allowed.</span>
      </div>

      {/* Ways to Earn */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">How to Earn AstroCoins</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {earnWays.map((w, idx) => (
            <div key={idx} className="glass-card rounded-2xl p-4 space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white">{w.title}</h4>
                <span className="text-xs font-bold text-amber-400">{w.reward}</span>
              </div>
              <p className="text-[11px] text-slate-400">{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Redeem Rewards Shop */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">Redeem Rewards Shop</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {redeemRewards.map((r) => (
            <div
              key={r.id}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex items-center justify-between gap-4 hover:border-amber-500/40 transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{r.icon}</span>
                <div>
                  <h4 className="text-xs font-bold text-white">{r.title}</h4>
                  <span className="text-xs text-amber-400 font-bold">{r.cost} AstroCoins</span>
                </div>
              </div>

              <button
                onClick={() => handleRedeem(r)}
                className="py-2 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shrink-0 transition-all shadow-md"
              >
                Redeem
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
