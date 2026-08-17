import React, { useState } from 'react';
import { SUBSCRIPTION_PLANS, getAllPlans, formatPrice } from '../data/subscriptionConfig';
import { KARMA_ACTIONS, BADGE_REGISTRY, STREAK_CONFIG } from '../data/gamificationConfig';
import { COMMISSION_CONFIG } from '../data/marketplaceData';
import { getClients, getUsageStats, generateKeyForClient, revokeKeyForClient, createClient, API_PRICING_TIERS } from '../services/b2bApiService';
import { MOCK_ADMIN_METRICS } from '../data/mockData';
import {
  Settings, CreditCard, Users, BarChart3, Trophy, ShieldCheck, Globe, ShoppingBag,
  Bell, Key, Plus, Trash2, RefreshCw, Copy, Eye, EyeOff, TrendingUp, Info, Check
} from 'lucide-react';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('subscriptions');
  const [clients, setClients] = useState(getClients());
  const [apiUsage] = useState(getUsageStats());
  const [showNewClientForm, setShowNewClientForm] = useState(false);
  const [newClient, setNewClient] = useState({ companyName: '', contactEmail: '', industry: '', tier: 'starter' });
  const [revealedKeys, setRevealedKeys] = useState({});
  const [copiedKey, setCopiedKey] = useState(null);

  const tabs = [
    { id: 'subscriptions', label: 'Subscriptions', icon: CreditCard },
    { id: 'gamification', label: 'Gamification', icon: Trophy },
    { id: 'predictions', label: 'Predictions', icon: ShieldCheck },
    { id: 'b2b', label: 'B2B API', icon: Globe },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag },
    { id: 'notifications', label: 'Notifications', icon: Bell }
  ];

  const handleGenerateKey = (clientId) => {
    generateKeyForClient(clientId);
    setClients(getClients());
  };

  const handleRevokeKey = (clientId) => {
    revokeKeyForClient(clientId);
    setClients(getClients());
  };

  const handleCreateClient = (e) => {
    e.preventDefault();
    if (!newClient.companyName.trim()) return;
    createClient(newClient);
    setClients(getClients());
    setShowNewClientForm(false);
    setNewClient({ companyName: '', contactEmail: '', industry: '', tier: 'starter' });
  };

  const copyKey = (key) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const m = MOCK_ADMIN_METRICS;

  return (
    <div className="max-w-6xl mx-auto space-y-6 py-6">
      {/* Header */}
      <div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-semibold">
          <Settings className="w-3.5 h-3.5" /> Admin Panel
        </span>
        <h1 className="text-3xl font-extrabold text-white mt-1">AstroLive Admin</h1>
        <p className="text-xs text-slate-300">Manage subscriptions, gamification rules, API clients, and marketplace settings.</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ── Subscriptions Tab ─────────────────────────────────── */}
      {activeTab === 'subscriptions' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="glass-card p-4 rounded-2xl"><span className="text-[10px] uppercase font-bold text-slate-400">Active Subscribers</span><div className="text-2xl font-extrabold text-white">{m.activeSubscriptions}</div></div>
            <div className="glass-card p-4 rounded-2xl"><span className="text-[10px] uppercase font-bold text-slate-400">ARPU</span><div className="text-2xl font-extrabold text-emerald-400">{m.arpu}</div></div>
            <div className="glass-card p-4 rounded-2xl"><span className="text-[10px] uppercase font-bold text-slate-400">MRR (Est.)</span><div className="text-2xl font-extrabold text-amber-400">₹24.8L</div></div>
            <div className="glass-card p-4 rounded-2xl"><span className="text-[10px] uppercase font-bold text-slate-400">Churn Rate</span><div className="text-2xl font-extrabold text-red-400">4.2%</div></div>
          </div>

          <h3 className="text-sm font-bold text-white">Plan Configuration</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {getAllPlans().map(plan => (
              <div key={plan.id} className="glass-card rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-lg">{plan.icon}</span>
                  <span className="text-xs font-bold text-slate-300">{plan.name}</span>
                </div>
                <div className="text-xl font-black text-white">{formatPrice(plan.pricing.monthly)}<span className="text-xs text-slate-400">/mo</span></div>
                <div className="text-[10px] text-slate-400">Yearly: {formatPrice(plan.pricing.yearly)}</div>
                <div className="space-y-1">
                  <div className="text-[10px] text-slate-400">Credits: <span className="text-white font-bold">₹{plan.benefits.consultationCredits}</span></div>
                  <div className="text-[10px] text-slate-400">Karma/day: <span className="text-white font-bold">{plan.benefits.dailyKarmaReward}</span></div>
                  <div className="text-[10px] text-slate-400">Discount: <span className="text-white font-bold">{plan.benefits.consultationDiscountPercent}%</span></div>
                </div>
                <button className="w-full px-3 py-2 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-300 text-[11px] font-bold hover:bg-purple-500/30 transition-all">
                  Edit Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Gamification Tab ──────────────────────────────────── */}
      {activeTab === 'gamification' && (
        <div className="space-y-6">
          <h3 className="text-sm font-bold text-white">Karma Action Rules</h3>
          <div className="glass-card rounded-2xl overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-slate-800/60">
                <tr>
                  <th className="text-left px-4 py-3 text-slate-400 font-bold">Action</th>
                  <th className="text-center px-4 py-3 text-slate-400 font-bold">Points</th>
                  <th className="text-center px-4 py-3 text-slate-400 font-bold">Cooldown</th>
                  <th className="text-center px-4 py-3 text-slate-400 font-bold">Max/Day</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {Object.values(KARMA_ACTIONS).map(action => (
                  <tr key={action.id} className="hover:bg-slate-800/30">
                    <td className="px-4 py-3 text-white font-medium">{action.icon} {action.label}</td>
                    <td className="px-4 py-3 text-center text-amber-400 font-bold">{action.basePoints}</td>
                    <td className="px-4 py-3 text-center text-slate-400">{action.cooldown}</td>
                    <td className="px-4 py-3 text-center text-slate-400">{action.maxPerDay}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-sm font-bold text-white">Streak Milestones</h3>
          <div className="flex flex-wrap gap-3">
            {STREAK_CONFIG.milestones.map(m => (
              <div key={m.days} className="glass-card rounded-xl p-3 text-center min-w-[100px]">
                <div className="text-xl">{m.emoji}</div>
                <div className="text-xs font-bold text-white mt-1">Day {m.days}</div>
                <div className="text-[10px] text-amber-400 font-bold">+{m.reward} Karma</div>
              </div>
            ))}
          </div>

          <h3 className="text-sm font-bold text-white">Badge Registry ({BADGE_REGISTRY.length} badges)</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {BADGE_REGISTRY.slice(0, 8).map(badge => (
              <div key={badge.id} className="glass-card rounded-xl p-3 text-center">
                <div className="text-2xl">{badge.icon}</div>
                <div className="text-[11px] font-bold text-white mt-1">{badge.name}</div>
                <div className="text-[9px] text-slate-400">{badge.rarity}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Predictions Tab ───────────────────────────────────── */}
      {activeTab === 'predictions' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="glass-card p-4 rounded-2xl"><span className="text-[10px] uppercase font-bold text-slate-400">Predictions Created</span><div className="text-2xl font-extrabold text-white">1,240</div></div>
            <div className="glass-card p-4 rounded-2xl"><span className="text-[10px] uppercase font-bold text-slate-400">Evaluated</span><div className="text-2xl font-extrabold text-emerald-400">892</div></div>
            <div className="glass-card p-4 rounded-2xl"><span className="text-[10px] uppercase font-bold text-slate-400">Avg Accuracy</span><div className="text-2xl font-extrabold text-amber-400">71.2%</div></div>
            <div className="glass-card p-4 rounded-2xl"><span className="text-[10px] uppercase font-bold text-slate-400">Participation</span><div className="text-2xl font-extrabold text-purple-400">{m.astroProofParticipation}</div></div>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 text-xs text-slate-400 flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>Prediction audit trail ensures astrologers cannot silently edit or delete historical predictions after confirmation.</span>
          </div>
        </div>
      )}

      {/* ── B2B API Tab ───────────────────────────────────────── */}
      {activeTab === 'b2b' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="glass-card p-4 rounded-2xl"><span className="text-[10px] uppercase font-bold text-slate-400">API Clients</span><div className="text-2xl font-extrabold text-white">{apiUsage.totalClients}</div></div>
            <div className="glass-card p-4 rounded-2xl"><span className="text-[10px] uppercase font-bold text-slate-400">Active</span><div className="text-2xl font-extrabold text-emerald-400">{apiUsage.activeClients}</div></div>
            <div className="glass-card p-4 rounded-2xl"><span className="text-[10px] uppercase font-bold text-slate-400">Requests (Month)</span><div className="text-2xl font-extrabold text-blue-400">{apiUsage.totalRequestsThisMonth.toLocaleString()}</div></div>
            <div className="glass-card p-4 rounded-2xl"><span className="text-[10px] uppercase font-bold text-slate-400">Est. Revenue</span><div className="text-2xl font-extrabold text-amber-400">₹{(apiUsage.estimatedRevenue / 100).toFixed(0)}K</div></div>
          </div>

          {/* Clients Table */}
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">API Clients</h3>
            <button
              onClick={() => setShowNewClientForm(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-bold hover:bg-purple-500/30 transition-all"
            >
              <Plus className="w-3.5 h-3.5" /> New Client
            </button>
          </div>

          {showNewClientForm && (
            <form onSubmit={handleCreateClient} className="glass-card rounded-2xl p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input type="text" placeholder="Company Name" value={newClient.companyName} onChange={e => setNewClient(p => ({...p, companyName: e.target.value}))} className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-purple-500" required />
                <input type="email" placeholder="Contact Email" value={newClient.contactEmail} onChange={e => setNewClient(p => ({...p, contactEmail: e.target.value}))} className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-purple-500" required />
                <input type="text" placeholder="Industry" value={newClient.industry} onChange={e => setNewClient(p => ({...p, industry: e.target.value}))} className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-purple-500" />
                <select value={newClient.tier} onChange={e => setNewClient(p => ({...p, tier: e.target.value}))} className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-purple-500">
                  {API_PRICING_TIERS.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
              </div>
              <div className="flex gap-2">
                <button type="submit" className="px-4 py-2 rounded-xl bg-purple-500 text-white text-xs font-bold hover:bg-purple-600 transition-all">Create Client</button>
                <button type="button" onClick={() => setShowNewClientForm(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700 transition-all">Cancel</button>
              </div>
            </form>
          )}

          <div className="glass-card rounded-2xl overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-slate-800/60">
                <tr>
                  <th className="text-left px-4 py-3 text-slate-400 font-bold">Company</th>
                  <th className="text-center px-4 py-3 text-slate-400 font-bold">Tier</th>
                  <th className="text-center px-4 py-3 text-slate-400 font-bold">Status</th>
                  <th className="text-center px-4 py-3 text-slate-400 font-bold">Requests</th>
                  <th className="text-center px-4 py-3 text-slate-400 font-bold">API Key</th>
                  <th className="text-center px-4 py-3 text-slate-400 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {clients.map(client => (
                  <tr key={client.id} className="hover:bg-slate-800/30">
                    <td className="px-4 py-3">
                      <div className="text-white font-medium">{client.companyName}</div>
                      <div className="text-[10px] text-slate-400">{client.industry}</div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold">{client.tier}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        client.status === 'active' ? 'bg-emerald-500/20 text-emerald-300' :
                        client.status === 'pending' ? 'bg-amber-500/20 text-amber-300' :
                        'bg-red-500/20 text-red-300'
                      }`}>{client.status}</span>
                    </td>
                    <td className="px-4 py-3 text-center text-white font-mono">{client.requestsThisMonth.toLocaleString()}</td>
                    <td className="px-4 py-3 text-center">
                      {client.apiKey ? (
                        <div className="flex items-center justify-center gap-1">
                          <span className="font-mono text-[10px] text-slate-400">
                            {revealedKeys[client.id] ? client.apiKey : '•••••••••••••••'}
                          </span>
                          <button onClick={() => setRevealedKeys(p => ({...p, [client.id]: !p[client.id]}))} className="text-slate-500 hover:text-slate-300"><Eye className="w-3 h-3" /></button>
                          <button onClick={() => copyKey(client.apiKey)} className="text-slate-500 hover:text-slate-300">
                            {copiedKey === client.apiKey ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          </button>
                        </div>
                      ) : (
                        <span className="text-slate-600 text-[10px]">No key</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {!client.apiKey || client.status !== 'active' ? (
                          <button onClick={() => handleGenerateKey(client.id)} className="px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-[10px] font-bold hover:bg-emerald-500/30 transition-all flex items-center gap-1">
                            <Key className="w-3 h-3" /> Generate
                          </button>
                        ) : (
                          <button onClick={() => handleRevokeKey(client.id)} className="px-2 py-1 rounded-lg bg-red-500/20 text-red-300 text-[10px] font-bold hover:bg-red-500/30 transition-all flex items-center gap-1">
                            <Trash2 className="w-3 h-3" /> Revoke
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Marketplace Tab ───────────────────────────────────── */}
      {activeTab === 'marketplace' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="glass-card p-4 rounded-2xl"><span className="text-[10px] uppercase font-bold text-slate-400">GMV (Month)</span><div className="text-2xl font-extrabold text-white">₹12.4L</div></div>
            <div className="glass-card p-4 rounded-2xl"><span className="text-[10px] uppercase font-bold text-slate-400">Commission Revenue</span><div className="text-2xl font-extrabold text-emerald-400">₹1.24L</div></div>
            <div className="glass-card p-4 rounded-2xl"><span className="text-[10px] uppercase font-bold text-slate-400">Active Vendors</span><div className="text-2xl font-extrabold text-amber-400">6</div></div>
            <div className="glass-card p-4 rounded-2xl"><span className="text-[10px] uppercase font-bold text-slate-400">Total Bookings</span><div className="text-2xl font-extrabold text-purple-400">48</div></div>
          </div>
          <h3 className="text-sm font-bold text-white">Commission Rates by Category</h3>
          <div className="glass-card rounded-2xl overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-slate-800/60"><tr><th className="text-left px-4 py-3 text-slate-400 font-bold">Category</th><th className="text-center px-4 py-3 text-slate-400 font-bold">Commission</th></tr></thead>
              <tbody className="divide-y divide-slate-800/50">
                {Object.entries(COMMISSION_CONFIG.categoryRates).map(([cat, rate]) => (
                  <tr key={cat} className="hover:bg-slate-800/30"><td className="px-4 py-3 text-white">{cat}</td><td className="px-4 py-3 text-center text-amber-400 font-bold">{rate}%</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Notifications Tab ─────────────────────────────────── */}
      {activeTab === 'notifications' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="glass-card p-4 rounded-2xl"><span className="text-[10px] uppercase font-bold text-slate-400">Notifications Sent</span><div className="text-2xl font-extrabold text-white">18,420</div></div>
            <div className="glass-card p-4 rounded-2xl"><span className="text-[10px] uppercase font-bold text-slate-400">Open Rate</span><div className="text-2xl font-extrabold text-emerald-400">34.8%</div></div>
            <div className="glass-card p-4 rounded-2xl"><span className="text-[10px] uppercase font-bold text-slate-400">CTA Conversion</span><div className="text-2xl font-extrabold text-purple-400">12.1%</div></div>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 text-xs text-slate-400 flex items-center gap-2">
            <Info className="w-4 h-4 text-blue-400 flex-shrink-0" />
            <span>Anti-spam: Maximum {5} notifications per category per day, {20} total per day per user.</span>
          </div>
        </div>
      )}
    </div>
  );
}
