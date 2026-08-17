import React, { useState } from 'react';
import { useAstro } from '../context/AstroContext';
import { Sparkles, ArrowRight, ArrowLeft, Check, Calendar, Clock, MapPin, Globe, Compass } from 'lucide-react';

export default function Onboarding() {
  const { userProfile, updateProfile, setActiveTab, showToast } = useAstro();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: userProfile.name || '',
    language: userProfile.language || 'Hindi • English',
    dob: userProfile.dob || '1998-10-14',
    tob: userProfile.tob || '08:30',
    city: userProfile.city || 'New Delhi, India',
    concern: userProfile.concern || 'Career'
  });

  const concerns = [
    { id: 'Career', label: 'Career & Job Change', icon: '💼' },
    { id: 'Love & Relationships', label: 'Love & Relationships', icon: '💖' },
    { id: 'Money', label: 'Money & Wealth', icon: '💰' },
    { id: 'Education', label: 'Education & Academics', icon: '🎓' },
    { id: 'Family', label: 'Family & Domestic Harmony', icon: '🏡' },
    { id: 'Business', label: 'Business & Startup', icon: '🚀' },
    { id: 'Marriage', label: 'Marriage & Compatibility', icon: '💍' },
    { id: 'Personal Growth', label: 'Personal Growth & Spirituality', icon: '🧘' },
    { id: 'Important Event', label: 'Upcoming Important Event', icon: '🛡️' }
  ];

  const handleNext = () => {
    if (step < 3) {
      setStep((prev) => prev + 1);
    } else {
      updateProfile(formData);
      showToast('✨ Profile synthesized! Reading your personal chart...', 'success');
      setActiveTab('ai-insight');
    }
  };

  const handleSkip = () => {
    if (step < 3) {
      setStep((prev) => prev + 1);
    } else {
      updateProfile(formData);
      setActiveTab('ai-insight');
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      {/* Step Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-2">
          <span className="text-amber-400">Step {step} of 3</span>
          <span>
            {step === 1 && 'Personal Profile'}
            {step === 2 && 'Exact Birth Chart Details'}
            {step === 3 && 'Primary Concern'}
          </span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-amber-500 to-purple-600 h-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      <div className="glass-card-gold rounded-3xl p-6 sm:p-8 space-y-6">
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="text-center space-y-2">
              <span className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-300 font-bold text-xl flex items-center justify-center mx-auto border border-amber-500/30">
                👤
              </span>
              <h2 className="text-2xl font-bold text-white">Let's personalizing your journey</h2>
              <p className="text-xs text-slate-300">Enter your preferred name and language for consultation</p>
            </div>

            <div className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Saanya"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Preferred Language for Guidance</label>
                <select
                  value={formData.language}
                  onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="Hindi • English">Hindi • English</option>
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Bengali">Bengali</option>
                  <option value="Tamil">Tamil</option>
                  <option value="Telugu">Telugu</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="text-center space-y-2">
              <span className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-300 font-bold text-xl flex items-center justify-center mx-auto border border-purple-500/30">
                ✨
              </span>
              <h2 className="text-2xl font-bold text-white">Exact Birth Profile</h2>
              <p className="text-xs text-slate-300">Exact time & location unlock high-precision planetary transits</p>
            </div>

            <div className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" /> Date of Birth
                </label>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" /> Exact Time of Birth
                  </label>
                  <input
                    type="time"
                    value={formData.tob}
                    onChange={(e) => setFormData({ ...formData, tob: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" /> Birth City
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. New Delhi, India"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="text-center space-y-2">
              <span className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-300 font-bold text-xl flex items-center justify-center mx-auto border border-amber-500/30">
                🎯
              </span>
              <h2 className="text-2xl font-bold text-white">What is your primary concern right now?</h2>
              <p className="text-xs text-slate-300">Select your main focus area so AI can tailor insights & astrologer matches</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {concerns.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, concern: c.id })}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col items-center justify-center text-center gap-2 ${
                    formData.concern === c.id
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold shadow-lg shadow-amber-500/10'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="text-2xl">{c.icon}</span>
                  <span className="text-xs">{c.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-800">
          {step > 1 ? (
            <button
              onClick={() => setStep((prev) => prev - 1)}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-3">
            {step < 3 && (
              <button
                onClick={handleSkip}
                className="text-xs text-slate-400 hover:text-slate-200 px-3 py-2"
              >
                Skip Optional
              </button>
            )}

            <button
              onClick={handleNext}
              className="cosmic-gradient-btn px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2"
            >
              <span>{step === 3 ? 'Finish & Generate AI Insight' : 'Continue'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
