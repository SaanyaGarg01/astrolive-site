import React, { useState, useEffect } from 'react';
import { useAstro } from '../context/AstroContext';
import { Heart, Users, Moon, Sun, Sunrise, Sparkles, ShieldCheck, Gem, RefreshCw, Zap } from 'lucide-react';

const CALCULATOR_TABS = [
  { id: 'love-calculator-tool', label: 'LOVE CALCULATOR', icon: '❤️' },
  { id: 'friendship-calculator', label: 'FRIENDSHIP CALCULATOR', icon: '🤝' },
  { id: 'moon-sign-calculator', label: 'MOON SIGN CALCULATOR', icon: '🌙' },
  { id: 'sun-sign-calculator', label: 'SUN SIGN CALCULATOR', icon: '☀️' },
  { id: 'ascendant-calculator', label: 'ASCENDANT CALCULATOR', icon: '🌅' },
  { id: 'sade-sati-calculator', label: 'SADE SATI CALCULATOR', icon: '🪐' },
  { id: 'gemstone-calculator', label: 'GEMSTONE CALCULATOR', icon: '💎' }
];

export default function CalculatorsPage() {
  const { calculatorSubView, setCalculatorSubView, setActiveTab } = useAstro();
  const [activeTabLocal, setActiveTabLocal] = useState(calculatorSubView || 'love-calculator-tool');

  // Calculator inputs & results
  const [loveName1, setLoveName1] = useState('Aarav');
  const [loveName2, setLoveName2] = useState('Ananya');
  const [loveScore, setLoveScore] = useState(94);

  const [friendName1, setFriendName1] = useState('Karan');
  const [friendName2, setFriendName2] = useState('Vikram');
  const [friendScore, setFriendScore] = useState(88);

  const [birthDate, setBirthDate] = useState('1998-08-15');
  const [birthTime, setBirthTime] = useState('06:30');
  const [birthCity, setBirthCity] = useState('Mumbai, India');

  // Calculated Results
  const [moonResult, setMoonResult] = useState(null);
  const [sunResult, setSunResult] = useState(null);
  const [ascendantResult, setAscendantResult] = useState(null);
  const [sadeSatiResult, setSadeSatiResult] = useState(null);
  const [gemstoneResult, setGemstoneResult] = useState(null);

  // Sync if context subView updates from navbar dropdown
  useEffect(() => {
    if (calculatorSubView) {
      setActiveTabLocal(calculatorSubView);
    }
  }, [calculatorSubView]);

  const handleTabChange = (tabId) => {
    setActiveTabLocal(tabId);
    if (setCalculatorSubView) setCalculatorSubView(tabId);
  };

  const handleCalcLove = () => {
    setLoveScore(Math.floor(Math.random() * 15) + 84);
  };

  const handleCalcFriendship = () => {
    setFriendScore(Math.floor(Math.random() * 15) + 82);
  };

  const handleCalcMoon = () => {
    setMoonResult({
      moonSign: 'Taurus (Vrishabha)',
      nakshatra: 'Rohini (Pada 2)',
      element: 'Earth',
      ruler: 'Moon (Chandra)',
      desc: 'Emotional stability, artistic sensibility, calm temperament, and deep devotion to loved ones.'
    });
  };

  const handleCalcSun = () => {
    setSunResult({
      sunSign: 'Leo (Simha)',
      element: 'Fire',
      ruler: 'Sun (Surya)',
      traits: 'Natural leadership, magnetic charisma, royal warmth, and strong self-confidence.'
    });
  };

  const handleCalcAscendant = () => {
    setAscendantResult({
      lagna: 'Scorpio (Vrischika Lagna)',
      element: 'Water',
      ruler: 'Mars (Mangal)',
      traits: 'Magnetic presence, intense focus, intuitive perception, and remarkable resilience.'
    });
  };

  const handleCalcSadeSati = () => {
    setSadeSatiResult({
      status: 'Sade Sati Phase 2 (Peak Rising)',
      phase: 'Shani in 1st House from Moon',
      impact: 'High focus required on health, career patience, and discipline.',
      remedy: 'Recite Hanuman Chalisa daily & donate mustard oil on Saturdays.'
    });
  };

  const handleCalcGemstone = () => {
    setGemstoneResult({
      gemstone: 'Yellow Sapphire (Pukhraj) & Blue Sapphire',
      metal: 'Gold / Panchdhatu Ring',
      finger: 'Index Finger (Jupiter)',
      day: 'Thursday Morning during Shukla Paksha'
    });
  };

  return (
    <div className="min-h-screen bg-[#0b0c1e] text-white pb-20 relative">
      
      {/* Calculators Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-950 border-b border-purple-900/40 py-8 px-4 sm:px-8 text-center space-y-3 relative overflow-hidden">
        <div className="inline-flex items-center gap-2 bg-purple-900/40 border border-purple-500/30 px-4 py-1.5 rounded-full text-xs font-black text-purple-300">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Precision Astro & Vedic Mathematics Suite</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-white to-pink-200 tracking-tight">
          Top 1% Interactive Astrology Calculators
        </h1>
        <p className="text-xs sm:text-sm text-purple-300/80 max-w-2xl mx-auto font-medium">
          Love, Friendship, Moon Sign, Sun Sign, Ascendant Lagna, Sade Sati, and Gemstone Calculators.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">

        {/* 7 Calculator Tool Pill Bar matching Screenshot */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar py-2 border-b border-slate-800">
          {CALCULATOR_TABS.map((tab) => {
            const isActive = activeTabLocal === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`px-5 py-3 rounded-2xl text-xs font-black tracking-wider transition-all shrink-0 flex items-center gap-2 cursor-pointer border-none ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-950 ring-2 ring-purple-400/50'
                    : 'bg-slate-900/80 text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span className="text-base">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: LOVE CALCULATOR ❤️ */}
        {activeTabLocal === 'love-calculator-tool' && (
          <div className="space-y-8 animate-in fade-in duration-300 max-w-2xl mx-auto">
            <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-purple-500/30 text-center space-y-6 shadow-2xl">
              <h2 className="text-2xl font-black text-white">Love Chemistry Calculator</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Partner 1 Name:</label>
                  <input type="text" value={loveName1} onChange={(e) => setLoveName1(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Partner 2 Name:</label>
                  <input type="text" value={loveName2} onChange={(e) => setLoveName2(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white" />
                </div>
              </div>
              <button onClick={handleCalcLove} className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-black py-3.5 rounded-full text-xs uppercase tracking-wider shadow-lg hover:scale-102 border-none cursor-pointer">
                Calculate Love Sparks
              </button>
              <div className="bg-purple-950/50 p-6 rounded-2xl border border-purple-500/40 space-y-1">
                <span className="text-3xl font-black text-pink-400">{loveScore}% ROMANTIC MATCH</span>
                <p className="text-xs text-slate-300 font-medium">Exceptional emotional harmony and chemistry between {loveName1} & {loveName2}.</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FRIENDSHIP CALCULATOR 🤝 */}
        {activeTabLocal === 'friendship-calculator' && (
          <div className="space-y-8 animate-in fade-in duration-300 max-w-2xl mx-auto">
            <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-purple-500/30 text-center space-y-6 shadow-2xl">
              <h2 className="text-2xl font-black text-white">Friendship & Loyalty Calculator</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Friend 1 Name:</label>
                  <input type="text" value={friendName1} onChange={(e) => setFriendName1(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Friend 2 Name:</label>
                  <input type="text" value={friendName2} onChange={(e) => setFriendName2(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white" />
                </div>
              </div>
              <button onClick={handleCalcFriendship} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black py-3.5 rounded-full text-xs uppercase tracking-wider shadow-lg hover:scale-102 border-none cursor-pointer">
                Calculate Friendship Score
              </button>
              <div className="bg-blue-950/50 p-6 rounded-2xl border border-blue-500/40 space-y-1">
                <span className="text-3xl font-black text-cyan-300">{friendScore}% FRIENDSHIP BOND</span>
                <p className="text-xs text-slate-300 font-medium">Strong trust quotient, loyalty, and lifelong camaraderie between {friendName1} & {friendName2}.</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: MOON SIGN CALCULATOR 🌙 */}
        {activeTabLocal === 'moon-sign-calculator' && (
          <div className="space-y-8 animate-in fade-in duration-300 max-w-3xl mx-auto">
            <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-purple-500/30 space-y-6 shadow-2xl">
              <h2 className="text-2xl font-black text-white text-center">Vedic Moon Sign (Chandra Rashi) Calculator</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Birth Date:</label>
                  <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Birth Time:</label>
                  <input type="time" value={birthTime} onChange={(e) => setBirthTime(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Birth City:</label>
                  <input type="text" value={birthCity} onChange={(e) => setBirthCity(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white" />
                </div>
              </div>
              <button onClick={handleCalcMoon} className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black py-3.5 rounded-full text-xs uppercase tracking-wider shadow-lg hover:scale-102 border-none cursor-pointer">
                Calculate Moon Sign
              </button>
              {moonResult && (
                <div className="bg-purple-950/40 p-6 rounded-2xl border border-purple-500/40 space-y-3">
                  <h3 className="font-extrabold text-xl text-purple-300">🌙 Moon Sign: {moonResult.moonSign}</h3>
                  <p className="text-xs text-amber-300 font-bold">Nakshatra: {moonResult.nakshatra} • Ruler: {moonResult.ruler}</p>
                  <p className="text-xs text-slate-200 font-medium leading-relaxed">{moonResult.desc}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: SUN SIGN CALCULATOR ☀️ */}
        {activeTabLocal === 'sun-sign-calculator' && (
          <div className="space-y-8 animate-in fade-in duration-300 max-w-3xl mx-auto">
            <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-purple-500/30 space-y-6 shadow-2xl">
              <h2 className="text-2xl font-black text-white text-center">Sun Sign (Surya Rashi) Calculator</h2>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Birth Date:</label>
                <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white" />
              </div>
              <button onClick={handleCalcSun} className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white font-black py-3.5 rounded-full text-xs uppercase tracking-wider shadow-lg hover:scale-102 border-none cursor-pointer">
                Calculate Sun Sign
              </button>
              {sunResult && (
                <div className="bg-amber-950/40 p-6 rounded-2xl border border-amber-500/40 space-y-3">
                  <h3 className="font-extrabold text-xl text-amber-300">☀️ Sun Sign: {sunResult.sunSign}</h3>
                  <p className="text-xs text-slate-200 font-medium leading-relaxed">{sunResult.traits}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 5: ASCENDANT (LAGNA) CALCULATOR 🌅 */}
        {activeTabLocal === 'ascendant-calculator' && (
          <div className="space-y-8 animate-in fade-in duration-300 max-w-3xl mx-auto">
            <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-purple-500/30 space-y-6 shadow-2xl">
              <h2 className="text-2xl font-black text-white text-center">Ascendant (Lagna) Calculator</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Exact Birth Time:</label>
                  <input type="time" value={birthTime} onChange={(e) => setBirthTime(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Birth Location:</label>
                  <input type="text" value={birthCity} onChange={(e) => setBirthCity(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white" />
                </div>
              </div>
              <button onClick={handleCalcAscendant} className="w-full bg-gradient-to-r from-rose-600 to-pink-600 text-white font-black py-3.5 rounded-full text-xs uppercase tracking-wider shadow-lg hover:scale-102 border-none cursor-pointer">
                Calculate Rising Lagna
              </button>
              {ascendantResult && (
                <div className="bg-rose-950/40 p-6 rounded-2xl border border-rose-500/40 space-y-3">
                  <h3 className="font-extrabold text-xl text-rose-300">🌅 Rising Lagna: {ascendantResult.lagna}</h3>
                  <p className="text-xs text-slate-200 font-medium leading-relaxed">{ascendantResult.traits}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 6: SADE SATI CALCULATOR 🪐 */}
        {activeTabLocal === 'sade-sati-calculator' && (
          <div className="space-y-8 animate-in fade-in duration-300 max-w-3xl mx-auto">
            <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-purple-500/30 space-y-6 shadow-2xl">
              <h2 className="text-2xl font-black text-white text-center">Shani Sade Sati Status Calculator</h2>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Moon Sign (Rashi):</label>
                <select className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white">
                  <option>Kumbha (Aquarius)</option>
                  <option>Meena (Pisces)</option>
                  <option>Makara (Capricorn)</option>
                  <option>Simha (Leo)</option>
                </select>
              </div>
              <button onClick={handleCalcSadeSati} className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-black py-3.5 rounded-full text-xs uppercase tracking-wider shadow-lg hover:scale-102 border-none cursor-pointer">
                Check Sade Sati Phase
              </button>
              {sadeSatiResult && (
                <div className="bg-indigo-950/40 p-6 rounded-2xl border border-indigo-500/40 space-y-3">
                  <h3 className="font-extrabold text-xl text-cyan-300">🪐 {sadeSatiResult.status}</h3>
                  <p className="text-xs text-slate-200 font-medium">💡 <strong>Remedy:</strong> {sadeSatiResult.remedy}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 7: GEMSTONE CALCULATOR 💎 */}
        {activeTabLocal === 'gemstone-calculator' && (
          <div className="space-y-8 animate-in fade-in duration-300 max-w-3xl mx-auto">
            <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-purple-500/30 space-y-6 shadow-2xl">
              <h2 className="text-2xl font-black text-white text-center">Lucky Gemstone & Metal Suggestion Calculator</h2>
              <button onClick={handleCalcGemstone} className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black py-3.5 rounded-full text-xs uppercase tracking-wider shadow-lg hover:scale-102 border-none cursor-pointer">
                Suggest Lucky Gemstone
              </button>
              {gemstoneResult && (
                <div className="bg-emerald-950/40 p-6 rounded-2xl border border-emerald-500/40 space-y-3">
                  <h3 className="font-extrabold text-xl text-emerald-300">💎 Recommended Gemstone: {gemstoneResult.gemstone}</h3>
                  <p className="text-xs text-slate-200 font-medium">✨ <strong>Metal:</strong> {gemstoneResult.metal} • <strong>Finger:</strong> {gemstoneResult.finger}</p>
                  <p className="text-xs text-slate-200 font-medium">🗓️ <strong>Wearing Time:</strong> {gemstoneResult.day}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Bottom Consultation CTA */}
        <div className="bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl border border-purple-500/30">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-black text-lg sm:text-xl">Need a full 30-Page Personal Astrological Calculation Report?</h3>
            <p className="text-xs text-purple-200">Get complete Dasha, Transit & Gemstone analysis delivered instantly.</p>
          </div>
          <button
            onClick={() => setActiveTab('free-reports')}
            className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-black px-7 py-3.5 rounded-full text-xs uppercase tracking-wider hover:scale-105 transition-transform border-none cursor-pointer shrink-0 shadow-lg"
          >
            Get Free Full Report
          </button>
        </div>

      </div>
    </div>
  );
}
