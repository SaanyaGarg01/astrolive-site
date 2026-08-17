import React, { useState } from 'react';
import { useAstro } from '../context/AstroContext';
import { useGamification } from '../context/GamificationContext';
import { calculateTimingInsight } from '../services/astroAIService';
import { ShieldAlert, Plus, Clock, MapPin, Calendar, Bell, Info, ArrowRight, Search, Shield, Eye, EyeOff, PhoneCall, Link2, Unlink } from 'lucide-react';

export default function AstroGuard() {
  const { guardEvents, addGuardEvent, setActiveTab } = useAstro();
  const { earnKarma } = useGamification();
  const [showAddModal, setShowAddModal] = useState(false);
  const [calendarConnected, setCalendarConnected] = useState(false);
  const [showCalendarConsent, setShowCalendarConsent] = useState(false);
  const [guardEnabled, setGuardEnabled] = useState(true);
  const [showPrivacyInfo, setShowPrivacyInfo] = useState(false);

  const [newEventForm, setNewEventForm] = useState({
    name: '',
    date: '2026-08-12',
    time: '10:00 AM',
    location: 'Gurugram / Remote Call',
    category: 'Job Interview'
  });

  const categories = [
    'Job Interview',
    'Business Launch',
    'Wedding',
    'Travel',
    'Important Meeting',
    'Contract Signing',
    'Exam',
    'Proposal'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newEventForm.name.trim()) return;

    const insight = calculateTimingInsight(newEventForm.name, newEventForm.date, newEventForm.time);

    addGuardEvent({
      ...newEventForm,
      astrologicalTimingInsight: insight.recommendation
    });

    earnKarma('GUARD_EVENT_ADDED');

    setShowAddModal(false);
    setNewEventForm({
      name: '',
      date: '2026-08-12',
      time: '10:00 AM',
      location: 'Remote Call',
      category: 'Job Interview'
    });
  };

  const handleCalendarConnect = () => {
    setCalendarConnected(true);
    setShowCalendarConsent(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-semibold">
            <ShieldAlert className="w-3.5 h-3.5 text-purple-400" /> Event Timing & Readiness
          </span>
          <h1 className="text-3xl font-extrabold text-white mt-1">Astro Guard</h1>
          <p className="text-xs text-slate-300">
            Be ready for the moments that matter. Register upcoming key events to unlock planetary timing insights.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Guard Toggle */}
          <button
            onClick={() => setGuardEnabled(!guardEnabled)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-bold transition-all ${
              guardEnabled
                ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-300'
                : 'bg-slate-800 border border-slate-700 text-slate-500'
            }`}
          >
            {guardEnabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            {guardEnabled ? 'Active' : 'Paused'}
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="purple-gradient-btn px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Register Event</span>
          </button>
        </div>
      </div>

      {/* Calendar Integration Card */}
      <div className={`rounded-2xl border p-4 transition-all ${
        calendarConnected
          ? 'bg-emerald-500/10 border-emerald-500/25'
          : 'bg-slate-900/80 border-slate-800'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              calendarConnected ? 'bg-emerald-500/20' : 'bg-slate-800'
            }`}>
              <Calendar className={`w-5 h-5 ${calendarConnected ? 'text-emerald-400' : 'text-slate-400'}`} />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white">
                {calendarConnected ? 'Google Calendar Connected' : 'Connect Your Calendar'}
              </h3>
              <p className="text-[10px] text-slate-400">
                {calendarConnected
                  ? 'Events are synced for automatic timing insights'
                  : 'Auto-import events for seamless timing analysis'}
              </p>
            </div>
          </div>

          {calendarConnected ? (
            <button
              onClick={() => setCalendarConnected(false)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/15 border border-red-500/25 text-red-300 text-[11px] font-bold hover:bg-red-500/25 transition-all"
            >
              <Unlink className="w-3.5 h-3.5" /> Disconnect
            </button>
          ) : (
            <button
              onClick={() => setShowCalendarConsent(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-300 text-[11px] font-bold hover:bg-purple-500/30 transition-all"
            >
              <Link2 className="w-3.5 h-3.5" /> Connect
            </button>
          )}
        </div>
      </div>

      {/* Calendar Consent Modal */}
      {showCalendarConsent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#0f1226] border border-purple-500/30 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center mx-auto mb-3">
                <Shield className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Calendar Access Permission</h3>
              <p className="text-xs text-slate-300 mt-2">AstroLive would like to read your calendar events to provide timing insights.</p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-2 text-[11px] text-slate-300">
              <div className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Read-only access to event names & dates</div>
              <div className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Events never shared with third parties</div>
              <div className="flex items-center gap-2"><span className="text-emerald-400">✓</span> You can disconnect anytime</div>
              <div className="flex items-center gap-2"><span className="text-red-400">✕</span> We do NOT modify or delete events</div>
              <div className="flex items-center gap-2"><span className="text-red-400">✕</span> We do NOT access contacts or emails</div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-[10px] text-amber-300">
              <Info className="w-3.5 h-3.5 inline mr-1" />
              <strong>Note:</strong> In production, this would use Google Calendar OAuth. Currently simulated for demo.
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowCalendarConsent(false)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleCalendarConnect}
                className="flex-1 px-4 py-2.5 rounded-xl bg-purple-500 text-white text-xs font-bold hover:bg-purple-600 transition-all"
              >
                Allow Access
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Professional Disclaimer */}
      <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-4 flex items-start gap-3 text-xs text-slate-300">
        <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="text-amber-300">Professional Advice Disclaimer:</strong>
          <p className="leading-relaxed text-[11px]">
            For legal contracts, financial investments, or medical procedures, users must rely on qualified certified professionals. Astro Guard timing insights are provided exclusively for personal reflection and self-organization.
          </p>
        </div>
      </div>

      {/* Privacy Controls */}
      <div className="flex items-center justify-between bg-slate-900/60 border border-slate-800 rounded-xl p-3">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-slate-400" />
          <span className="text-[11px] text-slate-300 font-medium">Your events are private by default</span>
        </div>
        <button
          onClick={() => setShowPrivacyInfo(!showPrivacyInfo)}
          className="text-[10px] text-purple-300 underline"
        >
          {showPrivacyInfo ? 'Hide' : 'Privacy Info'}
        </button>
      </div>

      {showPrivacyInfo && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-[11px] text-slate-300 space-y-1">
          <p>• Events are stored locally on your device only</p>
          <p>• Calendar data is never shared with astrologers or third parties</p>
          <p>• You can delete all events at any time</p>
          <p>• Astrologers only see what you explicitly share in consultations</p>
        </div>
      )}

      {/* Upcoming Registered Guard Events */}
      {guardEnabled && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>Your Upcoming Registered Events</span>
            <span className="text-xs font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
              {guardEvents.length} Active
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guardEvents.map((ev) => (
              <div
                key={ev.id}
                className="glass-card-purple rounded-3xl p-6 flex flex-col justify-between hover:border-purple-500/40 transition-all space-y-4"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">
                        {ev.category}
                      </span>
                      <h3 className="text-lg font-bold text-white mt-0.5">{ev.name}</h3>
                    </div>

                    <span className="bg-emerald-500/20 text-emerald-300 font-bold text-[10px] px-2.5 py-1 rounded-full border border-emerald-500/30">
                      Auspicious Timing
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-300 my-3">
                    <div className="flex items-center gap-2 text-purple-200">
                      <Calendar className="w-3.5 h-3.5 text-purple-400" />
                      <span>{ev.date} at {ev.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span>{ev.location}</span>
                    </div>
                  </div>

                  <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 space-y-1">
                    <span className="font-semibold text-amber-300 block text-[11px]">
                      Planetary Timing Insight:
                    </span>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {ev.astrologicalTimingInsight}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('astrologers')}
                  className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-amber-500/20 flex items-center justify-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" /> Talk to an Astrologer About This
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contextual Notification Demonstration Concept */}
      <section className="glass-card rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-400" /> Contextual Notification Engine (Concept)
            </h3>
            <p className="text-xs text-slate-400">Demonstrating event-driven retention triggers instead of spammy daily horoscopes</p>
          </div>
          <span className="text-[10px] text-amber-400 font-mono">Live Push Mockup</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-950/80 border border-amber-500/30 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-[10px]">
              <span className="font-bold text-amber-300">Astro Guard Notification</span>
              <span>Tomorrow 09:00 AM</span>
            </div>
            <h4 className="font-bold text-white text-xs">"Your VP of Product Interview is tomorrow."</h4>
            <p className="text-slate-300 text-[11px]">
              Jupiter is favorably aspected in your 10th house. Explore your timing window before the meeting.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setActiveTab('ai-insight')}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 text-[11px] font-bold"
              >
                View Insight
              </button>
              <button
                onClick={() => setActiveTab('astrologers')}
                className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 text-[11px] font-bold"
              >
                Talk to Astrologer
              </button>
            </div>
          </div>

          <div className="bg-slate-950/80 border border-purple-500/30 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-[10px]">
              <span className="font-bold text-purple-300">AstroProof Reminder</span>
              <span>Aug 28</span>
            </div>
            <h4 className="font-bold text-white text-xs">"Prediction Window Follow-Up Ready"</h4>
            <p className="text-slate-300 text-[11px]">
              30 days have passed since Acharya Priya logged your prediction. Did the job opportunity materialize?
            </p>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setActiveTab('astro-proof')}
                className="px-3 py-1.5 rounded-lg bg-purple-500 text-white text-[11px] font-bold"
              >
                Verify Prediction
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#0f1226] border border-amber-500/30 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white">Register Upcoming Event</h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Event Name</label>
                <input
                  type="text"
                  required
                  value={newEventForm.name}
                  onChange={(e) => setNewEventForm({ ...newEventForm, name: e.target.value })}
                  placeholder="e.g. Job Interview / Seed Pitch / Wedding"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-500 text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Category</label>
                <select
                  value={newEventForm.category}
                  onChange={(e) => setNewEventForm({ ...newEventForm, category: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-500 text-xs"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Date</label>
                  <input
                    type="date"
                    value={newEventForm.date}
                    onChange={(e) => setNewEventForm({ ...newEventForm, date: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-500 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Time</label>
                  <input
                    type="time"
                    value={newEventForm.time}
                    onChange={(e) => setNewEventForm({ ...newEventForm, time: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-500 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Location</label>
                <input
                  type="text"
                  value={newEventForm.location}
                  onChange={(e) => setNewEventForm({ ...newEventForm, location: e.target.value })}
                  placeholder="e.g. Gurugram / Online Zoom"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-500 text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="purple-gradient-btn px-5 py-2 rounded-xl font-bold"
                >
                  Calculate Timing Insight
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
