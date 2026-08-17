import React, { useState } from 'react';
import { useAstro } from '../context/AstroContext';
import { Sparkles, Share2, Copy, Check, X, ShieldCheck, Gift, Flame } from 'lucide-react';

export default function ShareModal() {
  const { shareCardData, setShareCardData, userProfile, showToast } = useAstro();
  const [copied, setCopied] = useState(false);

  if (!shareCardData) return null;

  const referralCode = `ASTRO-${userProfile.name.toUpperCase()}-2026`;
  const shareText = `✨ My Astro Journey Insight: "${shareCardData.insight || 'Exploring my planetary transits and career alignment on AstroLive!'}"\n\nUse code ${referralCode} to get 150 free AstroCoins! https://astrolive.app/j/${referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    showToast('📋 Share link & referral code copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0f1226] border border-amber-500/30 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
        <button
          onClick={() => setShareCardData(null)}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <Share2 className="w-3.5 h-3.5" /> Shareable Astro Journey Card
          </span>
          <h3 className="text-lg font-bold text-white mt-2">Your Personal Astro Insight</h3>
        </div>

        {/* Visually Beautiful Share Card */}
        <div className="bg-gradient-to-br from-slate-900 via-purple-950/60 to-slate-950 border border-amber-500/30 rounded-xl p-5 relative overflow-hidden shadow-inner my-4">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center font-bold text-xs text-slate-950">
                {userProfile.name.charAt(0)}
              </div>
              <div>
                <span className="text-xs font-bold text-slate-200">{userProfile.name}</span>
                <span className="text-[10px] text-amber-400 block font-mono">{userProfile.zodiac}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">AstroLive 2.0</span>
              <span className="text-[9px] text-amber-300">Verified Transit</span>
            </div>
          </div>

          <p className="text-xs text-slate-200 font-medium italic leading-relaxed my-2">
            "{shareCardData.insight || 'Your Sun-Jupiter transit points toward executive growth and strong decision alignment in Q3.'}"
          </p>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
            <div className="flex items-center gap-1 text-emerald-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Private Birth Details Protected</span>
            </div>
            <div className="flex items-center gap-1 text-amber-400">
              <Flame className="w-3.5 h-3.5" />
              <span>{userProfile.streakDays}-Day Streak</span>
            </div>
          </div>
        </div>

        {/* Referral Earnings Callout */}
        <div className="bg-purple-950/40 border border-purple-500/30 rounded-xl p-3 mb-5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center shrink-0">
            <Gift className="w-5 h-5 text-purple-300" />
          </div>
          <div>
            <div className="text-xs font-bold text-purple-200">Structural Virality Reward</div>
            <p className="text-[11px] text-slate-300">Invite friends & both of you earn <strong className="text-amber-300">150 AstroCoins</strong> upon join!</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleCopy}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-300" />}
            {copied ? 'Copied Link' : 'Copy Share Link'}
          </button>

          <button
            onClick={() => {
              showToast('🚀 Share dialog triggered! 150 coins credited on join.', 'success');
              setShareCardData(null);
            }}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-lg shadow-amber-500/20"
          >
            <Share2 className="w-4 h-4" /> Share Now
          </button>
        </div>
      </div>
    </div>
  );
}
