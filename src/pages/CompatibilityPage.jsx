import React, { useState, useEffect } from 'react';
import { useAstro } from '../context/AstroContext';
import { Heart, Sparkles, Flame, CheckCircle2, ShieldCheck, User, Users, RefreshCw, Star } from 'lucide-react';

const COMPATIBILITY_TABS = [
  { id: 'zodiac-compatibility', label: 'ZODIAC COMPATIBILITY', icon: '♈' },
  { id: 'kundli-milan', label: 'KUNDLI MILAN (36 GUNAS)', icon: '💍' },
  { id: 'love-calculator', label: 'LOVE CALCULATOR (%)', icon: '❤️' },
  { id: 'numerology-compatibility', label: 'NUMEROLOGY COMPATIBILITY', icon: '🔢' }
];

const ZODIAC_SIGNS = [
  { id: 'aries', name: 'Aries', symbol: '♈', element: 'Fire' },
  { id: 'taurus', name: 'Taurus', symbol: '♉', element: 'Earth' },
  { id: 'gemini', name: 'Gemini', symbol: '♊', element: 'Air' },
  { id: 'cancer', name: 'Cancer', symbol: '♋', element: 'Water' },
  { id: 'leo', name: 'Leo', symbol: '♌', element: 'Fire' },
  { id: 'virgo', name: 'Virgo', symbol: '♍', element: 'Earth' },
  { id: 'libra', name: 'Libra', symbol: '♎', element: 'Air' },
  { id: 'scorpio', name: 'Scorpio', symbol: '♏', element: 'Water' },
  { id: 'sagittarius', name: 'Sagittarius', symbol: '♐', element: 'Fire' },
  { id: 'capricorn', name: 'Capricorn', symbol: '♑', element: 'Earth' },
  { id: 'aquarius', name: 'Aquarius', symbol: '♒', element: 'Air' },
  { id: 'pisces', name: 'Pisces', symbol: '♓', element: 'Water' }
];

const ASHTAKOOT_GUNAS = [
  { name: 'Varna Koota', max: 1, scored: 1, desc: 'Spiritual alignment & ego balance.' },
  { name: 'Vashya Koota', max: 2, scored: 2, desc: 'Mutual attraction and natural control.' },
  { name: 'Tara Koota', max: 3, scored: 3, desc: 'Health & longevity of both partners.' },
  { name: 'Yoni Koota', max: 4, scored: 3, desc: 'Physical intimacy & instinctual affinity.' },
  { name: 'Maitri Koota', max: 5, scored: 5, desc: 'Psychological friendship & communication.' },
  { name: 'Gana Koota', max: 6, scored: 5, desc: 'Temperament & social behavior.' },
  { name: 'Bhakoot Koota', max: 7, scored: 7, desc: 'Family prosperity & financial growth.' },
  { name: 'Nadi Koota', max: 8, scored: 8, desc: 'Genetic compatibility & healthy progeny.' }
];

export default function CompatibilityPage() {
  const { compatibilitySubView, setCompatibilitySubView, setActiveTab } = useAstro();
  const [activeTabLocal, setActiveTabLocal] = useState(compatibilitySubView || 'zodiac-compatibility');

  // Zodiac Compatibility state
  const [partner1Sign, setPartner1Sign] = useState(ZODIAC_SIGNS[4]); // Leo
  const [partner2Sign, setPartner2Sign] = useState(ZODIAC_SIGNS[8]); // Sagittarius

  // Love calculator state
  const [name1, setName1] = useState('Rahul');
  const [name2, setName2] = useState('Ananya');
  const [lovePercentage, setLovePercentage] = useState(92);
  const [isCalculating, setIsCalculating] = useState(false);

  // Sync if context subView updates from navbar dropdown
  useEffect(() => {
    if (compatibilitySubView) {
      setActiveTabLocal(compatibilitySubView);
    }
  }, [compatibilitySubView]);

  const handleTabChange = (tabId) => {
    setActiveTabLocal(tabId);
    if (setCompatibilitySubView) setCompatibilitySubView(tabId);
  };

  const handleCalculateLove = () => {
    setIsCalculating(true);
    setTimeout(() => {
      const score = Math.floor(Math.random() * 20) + 80; // 80% to 99%
      setLovePercentage(score);
      setIsCalculating(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#15081c] text-white pb-20 relative">
      
      {/* Compatibility Banner */}
      <div className="bg-gradient-to-r from-pink-950 via-purple-950 to-slate-950 border-b border-pink-900/40 py-8 px-4 sm:px-8 text-center space-y-3 relative overflow-hidden">
        <div className="inline-flex items-center gap-2 bg-pink-900/40 border border-pink-500/30 px-4 py-1.5 rounded-full text-xs font-black text-pink-300">
          <Sparkles className="w-4 h-4 text-pink-400" />
          <span>Love, Marriage & Ashtakoot Guna Matching</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-white to-purple-200 tracking-tight">
          Astro Live Love & Relationship Compatibility
        </h1>
        <p className="text-xs sm:text-sm text-pink-300/80 max-w-2xl mx-auto font-medium">
          Check 36 Gunas Ashtakoot Kundli Milan, Zodiac Synastry, Love Meter, and Life Path Numerology.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">

        {/* 4 Compatibility Tool Pill Bar matching Screenshot */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar py-2 border-b border-slate-800">
          {COMPATIBILITY_TABS.map((tab) => {
            const isActive = activeTabLocal === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`px-5 py-3 rounded-2xl text-xs font-black tracking-wider transition-all shrink-0 flex items-center gap-2 cursor-pointer border-none ${
                  isActive
                    ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-lg shadow-pink-950 ring-2 ring-pink-400/50'
                    : 'bg-slate-900/80 text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span className="text-base">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: ZODIAC COMPATIBILITY ♈ */}
        {activeTabLocal === 'zodiac-compatibility' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <h2 className="text-2xl font-black text-white">Select Both Zodiac Signs</h2>
              <p className="text-xs text-pink-300/80 font-medium">
                Explore elemental synergy, passion, communication, and marriage potential.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Partner 1 Selection */}
              <div className="bg-slate-900/90 rounded-3xl p-6 border border-pink-500/30 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-black text-pink-400 uppercase">Partner 1 (You)</span>
                  <span className="text-sm font-black text-white">{partner1Sign.symbol} {partner1Sign.name}</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {ZODIAC_SIGNS.map((z) => (
                    <button
                      key={z.id}
                      onClick={() => setPartner1Sign(z)}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        partner1Sign.id === z.id
                          ? 'bg-pink-600 border-pink-300 text-white shadow-md'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      <span className="text-base block">{z.symbol}</span>
                      <span className="text-[9px] font-bold block mt-1">{z.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Partner 2 Selection */}
              <div className="bg-slate-900/90 rounded-3xl p-6 border border-pink-500/30 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-black text-rose-400 uppercase">Partner 2 (Partner)</span>
                  <span className="text-sm font-black text-white">{partner2Sign.symbol} {partner2Sign.name}</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {ZODIAC_SIGNS.map((z) => (
                    <button
                      key={z.id}
                      onClick={() => setPartner2Sign(z)}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        partner2Sign.id === z.id
                          ? 'bg-rose-600 border-rose-300 text-white shadow-md'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      <span className="text-base block">{z.symbol}</span>
                      <span className="text-[9px] font-bold block mt-1">{z.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Zodiac Result Card */}
            <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-pink-500/30 max-w-4xl mx-auto space-y-6 shadow-2xl">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="text-3xl p-3 bg-pink-950 rounded-2xl border border-pink-500/40">
                    {partner1Sign.symbol} ❤️ {partner2Sign.symbol}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg text-white">{partner1Sign.name} & {partner2Sign.name}</h3>
                    <p className="text-xs text-pink-300 font-bold">{partner1Sign.element} Element + {partner2Sign.element} Element</p>
                  </div>
                </div>

                <div className="text-right bg-pink-950/80 px-5 py-2.5 rounded-2xl border border-pink-500/40">
                  <span className="text-[10px] uppercase font-black text-pink-300 block">Overall Compatibility</span>
                  <span className="text-2xl font-black text-pink-400">95% MATCH</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800">
                  <span className="text-[10px] text-pink-300 font-bold block">Emotional Synergy</span>
                  <span className="text-lg font-black text-white">96%</span>
                </div>
                <div className="bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800">
                  <span className="text-[10px] text-pink-300 font-bold block">Communication</span>
                  <span className="text-lg font-black text-white">90%</span>
                </div>
                <div className="bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800">
                  <span className="text-[10px] text-pink-300 font-bold block">Passion & Romance</span>
                  <span className="text-lg font-black text-white">98%</span>
                </div>
                <div className="bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800">
                  <span className="text-[10px] text-pink-300 font-bold block">Marriage Outlook</span>
                  <span className="text-lg font-black text-white">92%</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed bg-pink-950/30 p-5 rounded-2xl border border-pink-500/20">
                💡 <strong>Astrological Verdict:</strong> {partner1Sign.name} and {partner2Sign.name} share an exceptional energetic bond! Both bring enthusiasm, mutual respect, and inspiring vision to the relationship.
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: KUNDLI MILAN (36 GUNAS) 💍 */}
        {activeTabLocal === 'kundli-milan' && (
          <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl mx-auto">
            <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-pink-500/30 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-2xl font-black text-white">Ashtakoot Kundli Milan (36 Gunas)</h2>
                  <p className="text-xs text-pink-300 font-bold">Traditional Vedic Marriage Matching Engine</p>
                </div>

                <div className="bg-emerald-950 text-emerald-300 border border-emerald-500/40 px-5 py-2 rounded-2xl text-center">
                  <span className="text-[10px] font-black uppercase block">Score</span>
                  <span className="text-xl font-black">34 / 36 GUNAS</span>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-extrabold text-sm text-white">Breakdown of 8 Kootas:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ASHTAKOOT_GUNAS.map((k, idx) => (
                    <div key={idx} className="bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between">
                      <div>
                        <h5 className="font-extrabold text-xs text-white">{k.name}</h5>
                        <p className="text-[10px] text-slate-400">{k.desc}</p>
                      </div>
                      <span className="text-xs font-black text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-full shrink-0">
                        {k.scored} / {k.max}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-emerald-950/40 border border-emerald-500/30 p-5 rounded-2xl text-xs text-slate-200 font-medium space-y-1">
                <p>✨ <strong>Marriage Recommendation:</strong> Over 28 Gunas indicates a <em>Shubh Vivah Match</em> with high marital longevity and financial prosperity. Manglik Dosha is balanced.</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: LOVE CALCULATOR (%) ❤️ */}
        {activeTabLocal === 'love-calculator' && (
          <div className="space-y-8 animate-in fade-in duration-300 max-w-2xl mx-auto">
            <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-pink-500/30 text-center space-y-6 shadow-2xl">
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-white">Instant Love Percentage Meter</h2>
                <p className="text-xs text-pink-300/80 font-medium">
                  Enter both names to calculate romantic compatibility vibes.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Your Name:</label>
                  <input
                    type="text"
                    value={name1}
                    onChange={(e) => setName1(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-pink-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Partner's Name:</label>
                  <input
                    type="text"
                    value={name2}
                    onChange={(e) => setName2(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-pink-400"
                  />
                </div>
              </div>

              <button
                onClick={handleCalculateLove}
                disabled={isCalculating}
                className="w-full bg-gradient-to-r from-pink-600 to-rose-600 text-white font-black py-3.5 rounded-full text-xs uppercase tracking-wider shadow-lg hover:scale-102 transition-transform border-none cursor-pointer flex items-center justify-center gap-2"
              >
                <Heart className="w-4 h-4 text-white fill-current" />
                <span>{isCalculating ? 'Calculating Love Sparks...' : 'Calculate Love Score'}</span>
              </button>

              <div className="bg-pink-950/50 rounded-2xl p-6 border border-pink-500/40 space-y-2">
                <span className="text-xs font-black text-pink-300 uppercase block">{name1} & {name2}</span>
                <div className="text-4xl font-black text-pink-400 tracking-tight">
                  {lovePercentage}% MATCH
                </div>
                <p className="text-xs text-slate-300 font-medium">"Deep emotional resonance, passionate attraction, and lifelong friendship!"</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: NUMEROLOGY COMPATIBILITY 🔢 */}
        {activeTabLocal === 'numerology-compatibility' && (
          <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl mx-auto">
            <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-pink-500/30 space-y-6 shadow-2xl">
              <div className="space-y-2 border-b border-slate-800 pb-4">
                <h2 className="text-2xl font-black text-white">Life Path Numerology Compatibility</h2>
                <p className="text-xs text-pink-300 font-medium">
                  Soulmate harmony computed using Pythagorean & Chaldean birth date reduction (Numbers 1 through 9).
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { pair: 'Life Path 1 & 5', type: 'Dynamic Power Couple', desc: 'High ambition, freedom, adventure, and mutual inspiration.' },
                  { pair: 'Life Path 2 & 6', type: 'Harmonious Soulmates', desc: 'Deep emotional care, family devotion, and peaceful home life.' },
                  { pair: 'Life Path 3 & 7', type: 'Intellectual Mystics', desc: 'Creative discussions, spiritual growth, and wisdom synergy.' }
                ].map((n, idx) => (
                  <div key={idx} className="bg-slate-950/70 p-5 rounded-2xl border border-pink-900/40 space-y-2">
                    <span className="text-[10px] font-black text-pink-400 uppercase">{n.pair}</span>
                    <h4 className="font-extrabold text-sm text-white">{n.type}</h4>
                    <p className="text-xs text-slate-300 font-medium">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Bottom Consultation CTA */}
        <div className="bg-gradient-to-r from-pink-950 via-purple-950 to-slate-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl border border-pink-500/30">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-black text-lg sm:text-xl">Want a deep 1-on-1 Relationship & Kundli Milan Consultation?</h3>
            <p className="text-xs text-pink-200">Connect with expert Love & Marriage Astrologers for detailed remedies.</p>
          </div>
          <button
            onClick={() => setActiveTab('astrologers')}
            className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-black px-7 py-3.5 rounded-full text-xs uppercase tracking-wider hover:scale-105 transition-transform border-none cursor-pointer shrink-0 shadow-lg"
          >
            Consult Love Astrologer (₹10/min)
          </button>
        </div>

      </div>
    </div>
  );
}
