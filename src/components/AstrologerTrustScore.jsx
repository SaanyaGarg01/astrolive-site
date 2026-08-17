import React from 'react';
import { ShieldCheck, TrendingUp, Star, AlertCircle, BarChart3, Info } from 'lucide-react';

/**
 * AstrologerTrustScore — Reusable trust score display component.
 * Shows verified prediction accuracy distinctly from star ratings.
 * Requires minimum prediction threshold before showing percentage.
 */

const MIN_PREDICTIONS_FOR_SCORE = 10;
const MIN_EVALUATED_FOR_PERCENTAGE = 5;

function calculateAccuracy(stats) {
  if (!stats) return null;
  const { userConfirmed = 0, partiallyConfirmed = 0, notConfirmed = 0, predictionsLogged = 0 } = stats;
  const evaluated = userConfirmed + partiallyConfirmed + notConfirmed;
  if (evaluated < MIN_EVALUATED_FOR_PERCENTAGE) return null;

  // Partial confirmations count as 0.5
  const score = ((userConfirmed + partiallyConfirmed * 0.5) / evaluated) * 100;
  return {
    accuracy: Math.round(score),
    evaluated,
    total: predictionsLogged,
    confirmed: userConfirmed,
    partial: partiallyConfirmed,
    notConfirmed
  };
}

export default function AstrologerTrustScore({ stats, compact = false, showBreakdown = true }) {
  if (!stats || stats.predictionsLogged < MIN_PREDICTIONS_FOR_SCORE) {
    if (compact) return null;
    return (
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Info className="w-3.5 h-3.5 text-slate-500" />
          <span>AstroProof score requires at least {MIN_PREDICTIONS_FOR_SCORE} logged predictions</span>
        </div>
      </div>
    );
  }

  const data = calculateAccuracy(stats);

  if (!data) {
    return (
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
          <span>Awaiting {MIN_EVALUATED_FOR_PERCENTAGE} evaluated predictions for accuracy score</span>
        </div>
      </div>
    );
  }

  const accuracyColor = data.accuracy >= 75 ? 'text-emerald-400' :
    data.accuracy >= 60 ? 'text-amber-400' : 'text-slate-400';

  const accuracyBg = data.accuracy >= 75 ? 'bg-emerald-500/15 border-emerald-500/25' :
    data.accuracy >= 60 ? 'bg-amber-500/15 border-amber-500/25' : 'bg-slate-500/15 border-slate-500/25';

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full border text-xs font-bold ${accuracyBg} ${accuracyColor}`}>
          <ShieldCheck className="w-3 h-3" />
          <span>{data.accuracy}%</span>
        </div>
        <span className="text-[10px] text-slate-400">{data.evaluated} verified</span>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl border p-4 space-y-3 ${accuracyBg}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className={`w-5 h-5 ${accuracyColor}`} />
          <span className="text-xs font-bold text-slate-200">AstroProof Verified</span>
        </div>
        <span className="text-[10px] text-slate-400 bg-slate-900/60 px-2 py-0.5 rounded-full">
          ≠ Star Rating
        </span>
      </div>

      {/* Score */}
      <div className="flex items-end gap-3">
        <div className={`text-3xl font-black ${accuracyColor}`}>{data.accuracy}%</div>
        <div className="pb-1">
          <p className="text-xs text-slate-300 font-semibold">Verified Accuracy</p>
          <p className="text-[10px] text-slate-400">Based on {data.evaluated} evaluated predictions</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            data.accuracy >= 75 ? 'bg-emerald-500' :
            data.accuracy >= 60 ? 'bg-amber-500' : 'bg-slate-500'
          }`}
          style={{ width: `${data.accuracy}%` }}
        />
      </div>

      {/* Breakdown */}
      {showBreakdown && (
        <div className="grid grid-cols-3 gap-2 pt-1">
          <div className="bg-slate-900/60 rounded-xl p-2 text-center">
            <div className="text-sm font-bold text-emerald-400">{data.confirmed}</div>
            <div className="text-[9px] text-slate-400">Confirmed</div>
          </div>
          <div className="bg-slate-900/60 rounded-xl p-2 text-center">
            <div className="text-sm font-bold text-amber-400">{data.partial}</div>
            <div className="text-[9px] text-slate-400">Partial</div>
          </div>
          <div className="bg-slate-900/60 rounded-xl p-2 text-center">
            <div className="text-sm font-bold text-slate-400">{data.notConfirmed}</div>
            <div className="text-[9px] text-slate-400">Not Occurred</div>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <p className="text-[9px] text-slate-500 leading-relaxed">
        This score reflects user-verified prediction outcomes and is separate from the star rating. 
        A minimum of {MIN_EVALUATED_FOR_PERCENTAGE} evaluated predictions is required.
      </p>
    </div>
  );
}

// Export helper for use in other components
export { calculateAccuracy, MIN_PREDICTIONS_FOR_SCORE, MIN_EVALUATED_FOR_PERCENTAGE };
