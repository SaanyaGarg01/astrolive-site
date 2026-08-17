import React, { useState, useRef, useEffect } from 'react';
import { useAstro } from '../context/AstroContext';
import { useGamification } from '../context/GamificationContext';
import { REWARD_WHEEL_ITEMS, WHEEL_WEIGHT_POOL } from '../data/mockData';
import { KARMA_REDEMPTION, getNextStreakMilestone } from '../data/gamificationConfig';
import { Flame, Sparkles, Gift, Clock, Coins, CheckCircle, RotateCw, Award, TrendingUp, Zap, Star, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DailyRitual() {
  const { userProfile, claimDailyReward, guardEvents, setActiveTab } = useAstro();
  const {
    checkInState,
    hasCheckedInToday,
    performCheckIn,
    karmaBalance,
    karmaTransactions,
    currentStreak,
    longestStreak,
    totalCheckIns,
    nextMilestone,
    earnedBadges,
    earnKarma,
    leaderboard
  } = useGamification();

  const [spinning, setSpinning] = useState(false);
  const [spunToday, setSpunToday] = useState(false);
  const [wonReward, setWonReward] = useState(null);
  const [checkInResult, setCheckInResult] = useState(null);
  const [showCheckInCelebration, setShowCheckInCelebration] = useState(false);

  const canvasRef = useRef(null);
  const rotationRef = useRef(0);

  // ── Draw wheel on canvas ──────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const size = canvas.width;
    const center = size / 2;
    const radius = center - 10;
    const totalSlices = REWARD_WHEEL_ITEMS.length;
    const sliceAngle = (Math.PI * 2) / totalSlices;

    ctx.clearRect(0, 0, size, size);

    REWARD_WHEEL_ITEMS.forEach((item, index) => {
      const startAngle = index * sliceAngle + rotationRef.current;
      const endAngle = startAngle + sliceAngle;

      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius, startAngle, endAngle);
      ctx.fillStyle = item.color;
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#070913';
      ctx.stroke();

      const shortLabel = item.type === 'none'
        ? 'Better Luck'
        : item.label.length > 10
          ? item.label.slice(0, 10)
          : item.label;

      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = item.type === 'none' ? '#94a3b8' : '#070913';
      ctx.font = `bold ${item.type === 'none' ? '9px' : '10px'} sans-serif`;
      ctx.fillText(shortLabel, radius - 14, 4);
      ctx.restore();
    });

    ctx.beginPath();
    ctx.arc(center, center, 22, 0, Math.PI * 2);
    ctx.fillStyle = '#f5c242';
    ctx.fill();
    ctx.strokeStyle = '#070913';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = '#070913';
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('SPIN', center, center + 3);
  }, [spinning]);

  // ── Daily Check-In Handler ────────────────────────────────────
  const handleCheckIn = () => {
    const multiplier = userProfile.membership === 'PREMIUM' ? 3 :
      userProfile.membership === 'PLUS' ? 2 : 1;

    const result = performCheckIn(multiplier);

    if (result.success) {
      setCheckInResult(result);
      setShowCheckInCelebration(true);

      // Confetti for milestones
      if (result.milestoneReached) {
        confetti({
          particleCount: 150,
          spread: 90,
          origin: { y: 0.5 },
          colors: ['#f59e0b', '#8b5cf6', '#ec4899', '#10b981']
        });
      } else {
        confetti({
          particleCount: 40,
          spread: 50,
          origin: { y: 0.7 }
        });
      }

      // Auto-hide celebration
      setTimeout(() => setShowCheckInCelebration(false), 5000);
    }
  };

  // ── Wheel Spin Handler ────────────────────────────────────────
  const handleSpin = () => {
    if (spinning || spunToday) return;
    setSpinning(true);

    const weightedIndex = WHEEL_WEIGHT_POOL[Math.floor(Math.random() * WHEEL_WEIGHT_POOL.length)];
    const winningIndex = weightedIndex;
    const selectedReward = REWARD_WHEEL_ITEMS[winningIndex];

    const sliceAngle = (Math.PI * 2) / REWARD_WHEEL_ITEMS.length;
    const extraRounds = 5 * Math.PI * 2;
    const targetRotation = extraRounds + (REWARD_WHEEL_ITEMS.length - winningIndex) * sliceAngle - sliceAngle / 2;

    const duration = 3500;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      if (elapsed < duration) {
        const progress = elapsed / duration;
        const easeOut = 1 - Math.pow(1 - progress, 3);
        rotationRef.current = targetRotation * easeOut;

        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext('2d');
          const size = canvas.width;
          const center = size / 2;
          const radius = center - 10;

          ctx.clearRect(0, 0, size, size);

          REWARD_WHEEL_ITEMS.forEach((item, index) => {
            const startAngle = index * sliceAngle + rotationRef.current;
            const endAngle = startAngle + sliceAngle;
            ctx.beginPath();
            ctx.moveTo(center, center);
            ctx.arc(center, center, radius, startAngle, endAngle);
            ctx.fillStyle = item.color;
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#070913';
            ctx.stroke();
            ctx.save();
            ctx.translate(center, center);
            ctx.rotate(startAngle + sliceAngle / 2);
            ctx.textAlign = 'right';
            ctx.fillStyle = '#070913';
            ctx.font = 'bold 11px sans-serif';
            ctx.fillText(item.label, radius - 20, 4);
            ctx.restore();
          });

          ctx.beginPath();
          ctx.arc(center, center, 22, 0, Math.PI * 2);
          ctx.fillStyle = '#f5c242';
          ctx.fill();
          ctx.strokeStyle = '#070913';
          ctx.lineWidth = 3;
          ctx.stroke();
          ctx.fillStyle = '#070913';
          ctx.font = 'bold 10px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('SPIN', center, center + 3);
        }

        requestAnimationFrame(animate);
      } else {
        setSpinning(false);
        setSpunToday(true);
        setWonReward(selectedReward);
        claimDailyReward(selectedReward);
        earnKarma('SPIN_WHEEL');

        if (selectedReward.type !== 'none') {
          confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        }
      }
    };
    requestAnimationFrame(animate);
  };

  const streakProgress = nextMilestone
    ? Math.min(100, Math.round((currentStreak / nextMilestone.days) * 100))
    : 100;

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6">
      {/* Header & Streak */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <Gift className="w-3.5 h-3.5 text-amber-400" /> Daily Engagement Hub
          </span>
          <h1 className="text-3xl font-extrabold text-white mt-1">Your Daily Astro Ritual</h1>
          <p className="text-xs text-slate-300">
            Check in, earn karma, grow your streak, and spin for rewards.
          </p>
        </div>

        {/* Live Streak Badge */}
        <div className="bg-gradient-to-r from-amber-500/20 to-purple-600/20 border border-amber-500/40 rounded-2xl p-3 px-5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
            <Flame className="w-6 h-6 fill-amber-400 text-amber-400" />
          </div>
          <div>
            <div className="text-xs font-bold text-amber-300">🔥 {currentStreak}-Day Active Streak</div>
            <span className="text-[10px] text-slate-400 font-mono">
              Longest: {longestStreak} days • Total: {totalCheckIns} check-ins
            </span>
          </div>
        </div>
      </div>

      {/* ── Daily Check-In Card ──────────────────────────────── */}
      <div className={`rounded-3xl p-6 space-y-4 transition-all ${
        hasCheckedInToday
          ? 'bg-emerald-500/10 border border-emerald-500/30'
          : 'bg-gradient-to-br from-purple-600/20 via-amber-500/10 to-pink-500/10 border border-purple-500/30 shadow-lg shadow-purple-500/10'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
              {hasCheckedInToday ? (
                <><CheckCircle className="w-5 h-5 text-emerald-400" /> Checked In Today!</>
              ) : (
                <><Sparkles className="w-5 h-5 text-purple-400" /> Daily Check-In</>
              )}
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              {hasCheckedInToday
                ? `You earned ${checkInResult?.karmaEarned || '10'} Karma today. Come back tomorrow!`
                : 'Tap below to check in, earn Karma, and extend your streak.'}
            </p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-amber-400">{karmaBalance}</div>
            <div className="text-[9px] text-slate-400 uppercase font-bold">Karma</div>
          </div>
        </div>

        {/* Streak Progress to Next Milestone */}
        {nextMilestone && (
          <div>
            <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
              <span>Next: {nextMilestone.emoji} {nextMilestone.label}</span>
              <span>{currentStreak}/{nextMilestone.days} days (+{nextMilestone.reward} Karma)</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-purple-500 rounded-full transition-all duration-500"
                style={{ width: `${streakProgress}%` }}
              />
            </div>
          </div>
        )}

        {!hasCheckedInToday && (
          <button
            onClick={handleCheckIn}
            className="w-full py-3.5 rounded-2xl cosmic-gradient-btn text-sm font-bold flex items-center justify-center gap-2 hover:scale-[1.01] transition-all"
          >
            <Flame className="w-5 h-5" /> Check In Now — Earn Karma
          </button>
        )}
      </div>

      {/* ── Check-In Celebration ─────────────────────────────── */}
      {showCheckInCelebration && checkInResult && (
        <div className="bg-gradient-to-r from-amber-500/20 via-purple-500/10 to-emerald-500/20 border border-amber-500/40 rounded-2xl p-5 text-center animate-in zoom-in-95 duration-300">
          <div className="text-4xl mb-2">
            {checkInResult.milestoneReached ? checkInResult.milestoneReached.emoji : '✅'}
          </div>
          <h3 className="text-lg font-extrabold text-white">
            {checkInResult.milestoneReached
              ? `🎉 ${checkInResult.milestoneReached.label} Milestone!`
              : `Day ${checkInResult.streak} Check-In Complete!`}
          </h3>
          <p className="text-sm text-amber-300 font-bold mt-1">
            +{checkInResult.karmaEarned} Karma earned
          </p>
          {checkInResult.milestoneReached && (
            <p className="text-xs text-purple-300 mt-1">
              Bonus: +{checkInResult.milestoneReached.reward} Karma for reaching {checkInResult.milestoneReached.days}-day streak!
            </p>
          )}
        </div>
      )}

      {/* ── Stats Row ────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-4 text-center">
          <Flame className="w-5 h-5 text-amber-400 mx-auto mb-1" />
          <div className="text-xl font-black text-white">{currentStreak}</div>
          <div className="text-[10px] text-slate-400 font-medium">Current Streak</div>
        </div>
        <div className="glass-card rounded-2xl p-4 text-center">
          <TrendingUp className="w-5 h-5 text-purple-400 mx-auto mb-1" />
          <div className="text-xl font-black text-white">{longestStreak}</div>
          <div className="text-[10px] text-slate-400 font-medium">Longest Streak</div>
        </div>
        <div className="glass-card rounded-2xl p-4 text-center">
          <Coins className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
          <div className="text-xl font-black text-amber-400">{karmaBalance}</div>
          <div className="text-[10px] text-slate-400 font-medium">Karma Balance</div>
        </div>
        <div className="glass-card rounded-2xl p-4 text-center">
          <Award className="w-5 h-5 text-pink-400 mx-auto mb-1" />
          <div className="text-xl font-black text-white">{earnedBadges.length}</div>
          <div className="text-[10px] text-slate-400 font-medium">Badges Earned</div>
        </div>
      </div>

      {/* ── Membership Multiplier Banner ─────────────────────── */}
      {userProfile.membership === 'FREE' ? (
        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🪙</span>
            <div>
              <p className="text-xs font-bold text-white">Earn 1x Karma multiplier (Free plan)</p>
              <p className="text-[11px] text-slate-400">Upgrade to Plus for <strong className="text-amber-300">2x multiplier</strong> — earn more Karma every day.</p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('membership')}
            className="shrink-0 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-900 font-black text-xs hover:scale-105 transition-all"
          >
            Upgrade to Plus →
          </button>
        </div>
      ) : (
        <div className={`rounded-2xl border p-4 flex items-center gap-3 ${
          userProfile.membership === 'PLUS'
            ? 'border-amber-500/20 bg-amber-500/8'
            : 'border-purple-500/20 bg-purple-500/8'
        }`}>
          <span className="text-2xl">🪙</span>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-xs font-bold text-white">
                {userProfile.membership === 'PLUS' ? '2x' : '3x'} Karma Multiplier Active
              </p>
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${
                userProfile.membership === 'PLUS'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                  : 'bg-purple-500/20 text-purple-300 border-purple-500/30'
              }`}>{userProfile.membership}</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Earning <strong className={userProfile.membership === 'PLUS' ? 'text-amber-300' : 'text-purple-300'}>
                {userProfile.membership === 'PLUS' ? '2x' : '3x'} Karma
              </strong> on all actions as a {userProfile.membership} member.
            </p>
          </div>
        </div>
      )}

      {/* ── Ritual Cards Grid ────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card-gold rounded-3xl p-5 space-y-2">
          <span className="text-[10px] font-bold uppercase text-amber-400 block">Today's Insight</span>
          <h4 className="text-sm font-bold text-white">Sun-Jupiter Alignment ☀️</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Energizing communications and executive pitch preparation. High decision momentum window.
          </p>
        </div>

        <div className="glass-card-purple rounded-3xl p-5 space-y-2">
          <span className="text-[10px] font-bold uppercase text-purple-300 block">Today's Focus</span>
          <h4 className="text-sm font-bold text-white">Executive Clarity 🎯</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Prioritize key career decisions between 09:45 AM and 11:30 AM for maximum planetary support.
          </p>
        </div>

        <div className="glass-card rounded-3xl p-5 space-y-2">
          <span className="text-[10px] font-bold uppercase text-emerald-400 block">Upcoming Moment</span>
          <h4 className="text-sm font-bold text-white">Job Interview — VP Role 💼</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Scheduled for Aug 12 at 10:00 AM. Astro Guard timing insight registered.
          </p>
        </div>
      </div>

      {/* ── Daily Reward Spinning Wheel ──────────────────────── */}
      <div className="glass-card-gold rounded-3xl p-6 sm:p-8 space-y-6 text-center relative overflow-hidden">
        <div>
          <span className="bg-amber-500 text-slate-950 font-extrabold text-[11px] px-3 py-1 rounded-full uppercase tracking-wider">
            100% Free Daily Engagement Mechanism
          </span>
          <h2 className="text-2xl font-bold text-white mt-3">Daily Reward Wheel</h2>
          <p className="text-xs text-slate-300 max-w-md mx-auto">
            Spin daily for free to earn Karma, consultation discounts, and custom mini-insights.
          </p>
        </div>

        <div className="relative w-72 h-72 mx-auto my-4 flex items-center justify-center">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-[16px] border-t-amber-400 z-20 drop-shadow-md" />
          <canvas
            ref={canvasRef}
            width={270}
            height={270}
            className="rounded-full shadow-2xl border-4 border-amber-500/40"
          />
        </div>

        {wonReward && (
          wonReward.type === 'none' ? (
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 max-w-sm mx-auto animate-in zoom-in-95 duration-200">
              <span className="text-xs font-bold text-slate-300 block">🍀 Better Luck Next Time!</span>
              <div className="text-xs text-slate-400 mt-1">Return tomorrow for another chance on the Daily Celestial Wheel.</div>
            </div>
          ) : (
            <div className="bg-emerald-500/20 border border-emerald-500/40 rounded-2xl p-4 max-w-sm mx-auto animate-in zoom-in-95 duration-200">
              <span className="text-xs font-bold text-emerald-300 block">🎉 Reward Claimed Today!</span>
              <div className="text-lg font-extrabold text-white mt-1">{wonReward.label}</div>
            </div>
          )
        )}

        <div className="pt-2">
          <button
            onClick={handleSpin}
            disabled={spinning || spunToday}
            className={`px-8 py-3.5 rounded-2xl text-xs font-bold transition-all shadow-xl ${
              spunToday
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                : 'cosmic-gradient-btn'
            }`}
          >
            {spinning ? (
              <span className="flex items-center gap-2">
                <RotateCw className="w-4 h-4 animate-spin" /> Spinning Celestial Wheel...
              </span>
            ) : spunToday ? (
              'Spun Today — Return Tomorrow for Next Reward'
            ) : (
              'Spin Free Daily Wheel'
            )}
          </button>
        </div>
      </div>

      {/* ── Weekly Leaderboard Preview ───────────────────────── */}
      <div className="glass-card rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-400" /> Community Leaderboard
            </h3>
            <p className="text-[10px] text-slate-400">Top karma earners this week</p>
          </div>
          <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full font-bold border border-purple-500/30">
            Weekly
          </span>
        </div>

        <div className="space-y-2">
          {leaderboard.slice(0, 5).map((entry, idx) => (
            <div key={entry.rank} className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
              idx < 3 ? 'bg-amber-500/10 border border-amber-500/20' : 'bg-slate-900/60 border border-slate-800'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black ${
                idx === 0 ? 'bg-amber-500 text-slate-900' :
                idx === 1 ? 'bg-slate-400 text-slate-900' :
                idx === 2 ? 'bg-amber-700 text-white' :
                'bg-slate-800 text-slate-400'
              }`}>
                {entry.rank}
              </div>
              <div className="text-xl">{entry.avatar}</div>
              <div className="flex-1">
                <div className="text-xs font-bold text-white">{entry.name}</div>
                <div className="text-[10px] text-slate-400">🔥 {entry.streak}-day streak</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-amber-400">{entry.karma.toLocaleString()}</div>
                <div className="text-[9px] text-slate-500">Karma</div>
              </div>
            </div>
          ))}
        </div>

        {/* Badges CTA */}
        <button
          onClick={() => setActiveTab('badges')}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-bold hover:bg-purple-500/25 transition-all"
        >
          <Award className="w-4 h-4" /> View All Badges & Achievements <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* ── PERSONALIZED DAILY HOROSCOPE (Requirement #19 & #20) ────────────────── */}
      <div className="glass-card-gold rounded-3xl p-6 space-y-4 border-2 border-amber-500/40">
        <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔮</span>
            <div>
              <h3 className="text-lg font-bold text-white">Your Personalized Daily Horoscope</h3>
              <p className="text-xs text-slate-300">Connected to your saved birth profile</p>
            </div>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/20 border border-emerald-500/30 px-3 py-1 rounded-full">
            🟢 Active Kundli Connected
          </span>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
          <div className="flex items-center justify-between text-slate-300">
            <span>Profile Connected: <strong>Saanya (Virgo Ascendant, Cancer Moon)</strong></span>
            <span className="text-amber-300 font-bold">+5 AstroCoins for reading</span>
          </div>
          <p className="text-slate-200 leading-relaxed italic pt-1">
            “Today's personalized insight: Focus on completing unfinished tasks before starting something new. Mercury exalted in your 1st house gives strong analytical focus during morning hours.”
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            onClick={() => setActiveTab('kundli')}
            className="w-full sm:w-auto cosmic-gradient-btn px-6 py-2.5 rounded-xl text-xs font-black shadow-md flex items-center justify-center gap-2"
          >
            <span>Read Full Kundli Insight →</span>
          </button>

          <span className="text-[11px] text-slate-400">
            Earned +5 AstroCoins for reading today's personalized insight!
          </span>
        </div>
      </div>

      {/* ── Recent Karma Transactions ────────────────────────── */}
      {karmaTransactions.length > 0 && (
        <div className="glass-card rounded-3xl p-6 space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Coins className="w-4 h-4 text-amber-400" /> Recent Karma Activity
          </h3>
          <div className="space-y-2">
            {karmaTransactions.slice(0, 5).map(tx => (
              <div key={tx.id} className="flex items-center justify-between py-2 border-b border-slate-800/50 last:border-0">
                <div>
                  <div className="text-xs text-white font-medium">{tx.description}</div>
                  <div className="text-[10px] text-slate-400">
                    {new Date(tx.timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                <span className={`text-sm font-bold ${tx.points > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {tx.points > 0 ? '+' : ''}{tx.points}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
