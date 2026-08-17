import React, { useState } from 'react';
import { useGamification } from '../context/GamificationContext';
import { BADGE_REGISTRY, BADGE_CATEGORIES, getRarityColor } from '../data/gamificationConfig';
import { Award, Lock, Check, Filter, Sparkles, Info } from 'lucide-react';

export default function BadgesPage() {
  const { earnedBadges, getBadgeProgress, checkInState } = useGamification();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...Object.values(BADGE_CATEGORIES)];

  const filteredBadges = selectedCategory === 'All'
    ? BADGE_REGISTRY
    : BADGE_REGISTRY.filter(b => b.category === selectedCategory);

  const earnedCount = earnedBadges.length;
  const totalCount = BADGE_REGISTRY.length;
  const completionPercent = Math.round((earnedCount / totalCount) * 100);

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <Award className="w-3.5 h-3.5 text-amber-400" /> Achievement Gallery
          </span>
          <h1 className="text-3xl font-extrabold text-white mt-1">Badges & Achievements</h1>
          <p className="text-xs text-slate-300">
            Earn badges by engaging with AstroLive features. Complete activities to unlock achievements.
          </p>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-center min-w-[140px]">
          <div className="text-2xl font-black text-amber-400">{earnedCount}/{totalCount}</div>
          <div className="text-[10px] text-slate-400 mt-1">Badges Earned</div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-purple-500 rounded-full transition-all"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
          <div className="text-[9px] text-slate-500 mt-1">{completionPercent}% Complete</div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === cat
                ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Badge Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredBadges.map(badge => {
          const isEarned = earnedBadges.includes(badge.id);
          const rarity = getRarityColor(badge.rarity);
          const progress = getBadgeProgress(badge, {
            totalCheckIns: checkInState.totalCheckIns,
            currentStreak: checkInState.currentStreak
          });
          const progressPercent = progress.target > 0
            ? Math.min(100, Math.round((progress.current / progress.target) * 100))
            : 0;

          return (
            <div
              key={badge.id}
              className={`relative rounded-2xl border p-4 transition-all ${
                isEarned
                  ? `${rarity.bg} ${rarity.border} hover:scale-[1.02]`
                  : 'bg-slate-900/60 border-slate-800 opacity-60 hover:opacity-80'
              }`}
            >
              {/* Earned Check */}
              {isEarned && (
                <div className="absolute top-2 right-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                </div>
              )}

              {/* Badge Icon */}
              <div className="text-center">
                <div className={`text-4xl mb-2 ${isEarned ? '' : 'grayscale'}`}>
                  {badge.icon}
                </div>
                <h3 className={`text-sm font-bold ${isEarned ? 'text-white' : 'text-slate-400'}`}>
                  {badge.name}
                </h3>
                <p className="text-[10px] text-slate-400 mt-1">{badge.description}</p>

                {/* Rarity Tag */}
                <span className={`inline-block mt-2 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${rarity.bg} ${rarity.text} ${rarity.border} border`}>
                  {badge.rarity}
                </span>
              </div>

              {/* Progress Bar (if not earned) */}
              {!isEarned && progress.target > 0 && (
                <div className="mt-3">
                  <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                    <span>{progress.current}/{progress.target}</span>
                    <span>{progressPercent}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-500/60 rounded-full transition-all"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Lock Icon */}
              {!isEarned && (
                <div className="absolute top-2 right-2">
                  <Lock className="w-3.5 h-3.5 text-slate-600" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Info */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 text-center">
        <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
          <Info className="w-4 h-4 text-purple-400" />
          <span>New badges are added regularly. Keep engaging with AstroLive features to unlock them!</span>
        </div>
      </div>
    </div>
  );
}
