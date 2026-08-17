import React from 'react';
import { MOCK_ADMIN_METRICS } from '../data/mockData';
import { BarChart3, TrendingUp, Users, DollarSign, RefreshCw, ShieldCheck, Info } from 'lucide-react';

export default function BusinessAnalytics() {
  const m = MOCK_ADMIN_METRICS;

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            <BarChart3 className="w-3.5 h-3.5" /> Executive Product Analytics
          </span>
          <h1 className="text-3xl font-extrabold text-white mt-1">AstroLive 2.0 Business Dashboard</h1>
          <p className="text-xs text-slate-300">
            Business performance indicators: engagement loops, consultation conversion, repeat retention & ARPU growth.
          </p>
        </div>

        <span className="text-[11px] font-mono text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
          Prototype Hypothesis Metrics
        </span>
      </div>

      {/* Prototype Metric Disclaimer */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3 text-xs text-slate-400 text-center">
        <Info className="w-4 h-4 text-amber-400 inline mr-1" />
        <strong className="text-amber-300">Prototype / Illustrative Metrics:</strong> The metrics below represent target hypotheses for the AstroLive 2.0 product layer and do not reflect official baseline AstroLive financial numbers.
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-card p-4 rounded-2xl space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Daily Active Users</span>
          <div className="text-2xl font-extrabold text-white">{m.dau}</div>
          <span className="text-[10px] text-emerald-400 font-semibold">+14.2% MoM Growth</span>
        </div>

        <div className="glass-card p-4 rounded-2xl space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">D7 Retention Rate</span>
          <div className="text-2xl font-extrabold text-amber-400">{m.d7Retention}</div>
          <span className="text-[10px] text-amber-300">Powered by Daily Ritual</span>
        </div>

        <div className="glass-card p-4 rounded-2xl space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Repeat Consultation Rate</span>
          <div className="text-2xl font-extrabold text-purple-300">{m.repeatConsultationRate}</div>
          <span className="text-[10px] text-purple-300">Smart Follow-Up Engine</span>
        </div>

        <div className="glass-card p-4 rounded-2xl space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Average Revenue Per User</span>
          <div className="text-2xl font-extrabold text-emerald-400">{m.arpu}</div>
          <span className="text-[10px] text-emerald-300">Subscriptions + Calls</span>
        </div>
      </div>

      {/* Additional Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-card p-5 rounded-3xl space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase">Consultation Conversion</span>
          <div className="text-3xl font-bold text-white">{m.consultationConversion}</div>
          <p className="text-[11px] text-slate-400">AI Insight & Smart Match funnel conversion rate</p>
        </div>

        <div className="glass-card p-5 rounded-3xl space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase">Active Subscriptions</span>
          <div className="text-3xl font-bold text-amber-400">{m.activeSubscriptions}</div>
          <p className="text-[11px] text-slate-400">Plus (₹199) & Premium (₹399) monthly recurring users</p>
        </div>

        <div className="glass-card p-5 rounded-3xl space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase">AstroProof Participation</span>
          <div className="text-3xl font-bold text-emerald-400">{m.astroProofParticipation}</div>
          <p className="text-[11px] text-slate-400">Consultation clients recording timestamped predictions</p>
        </div>
      </div>

      {/* Breakdown Charts: Concerns & Revenue Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top User Concerns */}
        <div className="glass-card-gold rounded-3xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-white">Top User Primary Concerns</h3>
          <div className="space-y-3 text-xs">
            {m.topConcerns.map((c, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-slate-200 font-semibold">
                  <span>{c.label}</span>
                  <span className="text-amber-400">{c.percent}%</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: `${c.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Distribution */}
        <div className="glass-card-purple rounded-3xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-white">Revenue Stream Breakdown</h3>
          <div className="space-y-3 text-xs">
            {m.revenueDistribution.map((r, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-slate-200 font-semibold">
                  <span>{r.source}</span>
                  <span className="text-purple-300">{r.percent}%</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                  <div className="bg-purple-500 h-full rounded-full" style={{ width: `${r.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
