import React, { useState, useEffect } from 'react';
import { useAstro } from '../context/AstroContext';
import { Sparkles, Compass, Search, Award, CheckCircle2, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

const KP_TABS = [
  { id: 'what-is-kp-system', label: 'WHAT IS KP SYSTEM?', icon: '🌟' },
  { id: 'kp-horary', label: 'KP HORARY (1-249)', icon: '🔢' },
  { id: 'cuspal-sub-lord', label: 'CUSPAL SUB LORD', icon: '📐' },
  { id: 'planetary-significators', label: 'PLANETARY SIGNIFICATORS', icon: '🪐' }
];

const KP_CSL_HOUSES = [
  { house: 1, title: '1st Cuspal Sub Lord', topic: 'Health, Longevity & Personal Efforts', rule: 'If 1st CSL signifies 1, 5, 11 -> Excellent health & long life. If 1, 6, 8, 12 -> Chronic illnesses.' },
  { house: 2, title: '2nd Cuspal Sub Lord', topic: 'Wealth & Financial Balance', rule: 'If 2nd CSL signifies 2, 6, 11 -> Substantial financial growth and liquid assets accumulation.' },
  { house: 3, title: '3rd Cuspal Sub Lord', topic: 'Negotiations & Media Agreements', rule: 'If 3rd CSL signifies 3, 6, 11 -> Successful publication, contract signing & short travel.' },
  { house: 4, title: '4th Cuspal Sub Lord', topic: 'Property, Vehicle & Higher Degree', rule: 'If 4th CSL signifies 4, 11 -> Buying real estate property or vehicle with smooth registration.' },
  { house: 5, title: '5th Cuspal Sub Lord', topic: 'Love Affairs & Childbirth', rule: 'If 5th CSL signifies 2, 5, 11 -> Prompts romantic commitment and healthy progeny.' },
  { house: 6, title: '6th Cuspal Sub Lord', topic: 'Job Selection & Loan Approval', rule: 'If 6th CSL signifies 6, 11 -> Winning competitive exams, clearing bank loans & litigation victory.' },
  { house: 7, title: '7th Cuspal Sub Lord', topic: 'Marriage & Business Alliances', rule: 'If 7th CSL signifies 2, 7, 11 -> Marriage is guaranteed during favorable Dasha/Bhukti.' },
  { house: 8, title: '8th Cuspal Sub Lord', topic: 'Unearned Wealth & Legacy', rule: 'If 8th CSL signifies 2, 8, 11 -> Gains through insurance, inheritance, or tax refunds.' },
  { house: 9, title: '9th Cuspal Sub Lord', topic: 'Foreign Higher Studies & Father', rule: 'If 9th CSL signifies 9, 11 -> Overseas university admission & spiritual pilgrimage.' },
  { house: 10, title: '10th Cuspal Sub Lord', topic: 'Career Promotion & Designation', rule: 'If 10th CSL signifies 6, 10, 11 -> Promotion to executive level and career reputation.' },
  { house: 11, title: '11th Cuspal Sub Lord', topic: 'Fulfillment of All Desires', rule: 'If 11th CSL signifies 1, 2, 6, 10, 11 -> Complete success in all endeavors & ambitious goals.' },
  { house: 12, title: '12th Cuspal Sub Lord', topic: 'Foreign Settlement & Investments', rule: 'If 12th CSL signifies 3, 9, 12 -> Permanent residency in foreign countries & export growth.' }
];

export default function KpSystemPage() {
  const { kpSubView, setKpSubView, setActiveTab } = useAstro();
  const [activeTabLocal, setActiveTabLocal] = useState(kpSubView || 'what-is-kp-system');

  // Horary state
  const [horaryNumber, setHoraryNumber] = useState(108);
  const [horaryQuestion, setHoraryQuestion] = useState('Will I get my dream job promotion this year?');
  const [horaryResult, setHoraryResult] = useState(null);

  // CSL state
  const [selectedCslHouse, setSelectedCslHouse] = useState(KP_CSL_HOUSES[0]);

  // Sync if context subView updates from navbar dropdown
  useEffect(() => {
    if (kpSubView) {
      setActiveTabLocal(kpSubView);
    }
  }, [kpSubView]);

  const handleTabChange = (tabId) => {
    setActiveTabLocal(tabId);
    if (setKpSubView) setKpSubView(tabId);
  };

  const calculateHorary = () => {
    // KP Horary calculation simulation
    const subLordList = ['Jupiter', 'Venus', 'Mercury', 'Sun', 'Moon', 'Mars', 'Saturn', 'Rahu', 'Ketu'];
    const starLordList = ['Krittika', 'Rohini', 'Mrigashira', 'Arudra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha'];
    const selectedSub = subLordList[horaryNumber % subLordList.length];
    const selectedStar = starLordList[horaryNumber % starLordList.length];
    
    setHoraryResult({
      number: horaryNumber,
      starLord: selectedStar,
      subLord: selectedSub,
      cuspSignified: 'Houses 2, 6, 10, 11',
      promise: 'Favorable (YES)',
      recommendation: 'The Cuspal Sub Lord connects 6th (Job) and 11th (Gains). Success is promised during current Bhukti period.'
    });
  };

  return (
    <div className="min-h-screen bg-[#080d1e] text-white pb-20 relative">
      
      {/* KP Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-950 border-b border-blue-900/40 py-8 px-4 sm:px-8 text-center space-y-3 relative overflow-hidden">
        <div className="inline-flex items-center gap-2 bg-blue-900/40 border border-blue-500/30 px-4 py-1.5 rounded-full text-xs font-black text-blue-300">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Krishnamurti Paddhati (KP) Stellar Astrology</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-cyan-200 tracking-tight">
          Scientific KP Astrology & 249 Sub-Lord System
        </h1>
        <p className="text-xs sm:text-sm text-blue-300/80 max-w-2xl mx-auto font-medium">
          "Planet proposes, Star Lord disposes, Sub Lord decides." Precise event timing using Ruling Planets & Horary Prashna.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">

        {/* 4 KP Tool Pill Bar matching Screenshot */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar py-2 border-b border-slate-800">
          {KP_TABS.map((tab) => {
            const isActive = activeTabLocal === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`px-5 py-3 rounded-2xl text-xs font-black tracking-wider transition-all shrink-0 flex items-center gap-2 cursor-pointer border-none ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-950 ring-2 ring-cyan-400/50'
                    : 'bg-slate-900/80 text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span className="text-base">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: WHAT IS KP SYSTEM? 🌟 */}
        {activeTabLocal === 'what-is-kp-system' && (
          <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl mx-auto">
            <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-blue-500/30 space-y-6 shadow-2xl">
              <div className="space-y-2 border-b border-slate-800 pb-4">
                <h2 className="text-2xl font-black text-white">Understanding Krishnamurti Paddhati (KP System)</h2>
                <p className="text-xs text-blue-300 font-medium">
                  Developed by Late Prof. K.S. Krishnamurti, KP Astrology combines the finest aspects of Western Placidus House divisions with Indian Nakshatra Stellar Astrology.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                <div className="bg-slate-950/60 p-5 rounded-2xl border border-blue-900/40 space-y-2">
                  <h4 className="font-extrabold text-white text-sm text-cyan-400">1. Unequal Placidus Cusp System</h4>
                  <p>Unlike traditional 30° equal house systems, KP measures house cusps precisely according to latitude and longitude, providing accurate cuspal boundaries.</p>
                </div>

                <div className="bg-slate-950/60 p-5 rounded-2xl border border-blue-900/40 space-y-2">
                  <h4 className="font-extrabold text-white text-sm text-cyan-400">2. 249 Sub-Lords Division</h4>
                  <p>Each of the 27 Nakshatras is subdivided into 9 unequal parts based on Vimshottari Dasha proportions, giving 249 precise astrological sub-divisions.</p>
                </div>

                <div className="bg-slate-950/60 p-5 rounded-2xl border border-blue-900/40 space-y-2">
                  <h4 className="font-extrabold text-white text-sm text-cyan-400">3. Cuspal Sub Lord (CSL) Finality</h4>
                  <p>The Sub-Lord of any house cusp holds the final key to whether a life event (Marriage, Job, Foreign Travel) will take place or be denied.</p>
                </div>

                <div className="bg-slate-950/60 p-5 rounded-2xl border border-blue-900/40 space-y-2">
                  <h4 className="font-extrabold text-white text-sm text-cyan-400">4. Horary Astrology (1 to 249)</h4>
                  <p>Provides exact mathematical answers to immediate Prashna questions without requiring a known birth time.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: KP HORARY (1-249) 🔢 */}
        {activeTabLocal === 'kp-horary' && (
          <div className="space-y-8 animate-in fade-in duration-300 max-w-3xl mx-auto">
            <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-blue-500/30 space-y-6 shadow-2xl">
              <div className="space-y-2 text-center">
                <h2 className="text-2xl font-black text-white">KP Horary Prashna Engine (Seed 1 - 249)</h2>
                <p className="text-xs text-blue-300/80 font-medium">
                  Select a seed number between 1 and 249 for an instant KP Prashna analysis.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Your Horary Question:</label>
                  <input
                    type="text"
                    value={horaryQuestion}
                    onChange={(e) => setHoraryQuestion(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-slate-300">Choose KP Seed Number (1-249):</span>
                    <span className="text-cyan-400 font-black"># {horaryNumber}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="249"
                    value={horaryNumber}
                    onChange={(e) => setHoraryNumber(parseInt(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                <button
                  onClick={calculateHorary}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-black py-3.5 rounded-full text-xs uppercase tracking-wider shadow-lg hover:scale-102 transition-transform border-none cursor-pointer flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4 text-amber-300" />
                  <span>Analyze KP Horary Seed #{horaryNumber}</span>
                </button>
              </div>

              {horaryResult && (
                <div className="bg-blue-950/40 rounded-2xl p-6 border border-cyan-500/30 space-y-4 animate-in fade-in">
                  <div className="flex items-center justify-between border-b border-blue-900/40 pb-3">
                    <span className="text-xs font-black text-slate-300">Horary Seed #{horaryResult.number}</span>
                    <span className="text-xs font-black text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-500/30">
                      Result: {horaryResult.promise}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-blue-400 font-bold">Star Lord</span>
                      <p className="font-extrabold text-white">{horaryResult.starLord}</p>
                    </div>
                    <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-blue-400 font-bold">Sub Lord</span>
                      <p className="font-extrabold text-white">{horaryResult.subLord}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-200 font-medium leading-relaxed">
                    💡 <strong>KP Analysis:</strong> {horaryResult.recommendation}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: CUSPAL SUB LORD 📐 */}
        {activeTabLocal === 'cuspal-sub-lord' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <h2 className="text-2xl font-black text-white">1st to 12th Cuspal Sub Lord Rules</h2>
              <p className="text-xs text-blue-300/80 font-medium">
                Select a house cusp to inspect how its Cuspal Sub Lord determines event fulfillment.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 space-y-2 max-h-[500px] overflow-y-auto pr-1 no-scrollbar">
                {KP_CSL_HOUSES.map((h) => {
                  const isSel = selectedCslHouse.house === h.house;
                  return (
                    <button
                      key={h.house}
                      onClick={() => setSelectedCslHouse(h)}
                      className={`w-full p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                        isSel
                          ? 'bg-blue-950/80 border-cyan-400 text-white shadow-lg'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      <div>
                        <h4 className="font-extrabold text-xs text-white">{h.title}</h4>
                        <p className="text-[10px] text-cyan-300">{h.topic}</p>
                      </div>
                      <span className="text-xs font-black text-slate-500">#{h.house}</span>
                    </button>
                  );
                })}
              </div>

              <div className="lg:col-span-7 bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-blue-500/30 space-y-4 shadow-2xl">
                <h3 className="font-extrabold text-xl text-white">{selectedCslHouse.title}</h3>
                <span className="text-xs font-bold text-cyan-400 bg-blue-950 px-3 py-1 rounded-full border border-blue-500/40 inline-block">
                  Topic: {selectedCslHouse.topic}
                </span>

                <div className="bg-blue-950/40 rounded-2xl p-5 border border-cyan-500/30 text-xs sm:text-sm text-slate-200 font-medium leading-relaxed space-y-2">
                  <h4 className="font-bold text-cyan-300 text-xs">KP Golden Rule:</h4>
                  <p>{selectedCslHouse.rule}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PLANETARY SIGNIFICATORS 🪐 */}
        {activeTabLocal === 'planetary-significators' && (
          <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl mx-auto">
            <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-blue-500/30 space-y-6 shadow-2xl">
              <div className="space-y-2 border-b border-slate-800 pb-4">
                <h2 className="text-2xl font-black text-white">4 Levels of KP Significators (A, B, C, D)</h2>
                <p className="text-xs text-blue-300 font-medium">
                  KP Astrology ranks planetary significations into 4 distinct strength levels for timing events accurately.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { level: 'Level A (Strongest)', desc: 'Occupant of the Star Lord’s constellation. Controls 70% of the event outcome.' },
                  { level: 'Level B (Strong)', desc: 'Planet physically occupying the house in the Placidus chart.' },
                  { level: 'Level C (Moderate)', desc: 'Star Lord of the owner of the house.' },
                  { level: 'Level D (Mild)', desc: 'Planet owning the house sign.' }
                ].map((sig, idx) => (
                  <div key={idx} className="bg-slate-950/70 p-5 rounded-2xl border border-blue-900/40 space-y-2">
                    <span className="text-[10px] font-black text-cyan-400 uppercase">{sig.level}</span>
                    <p className="text-xs text-slate-200 font-medium">{sig.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Bottom Consultation CTA */}
        <div className="bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl border border-blue-500/30">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-black text-lg sm:text-xl">Need a live KP Stellar Astrologer Consultation?</h3>
            <p className="text-xs text-blue-200">Connect with certified KP Horary & Cuspal Sub Lord experts for instant answers.</p>
          </div>
          <button
            onClick={() => setActiveTab('astrologers')}
            className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-black px-7 py-3.5 rounded-full text-xs uppercase tracking-wider hover:scale-105 transition-transform border-none cursor-pointer shrink-0 shadow-lg"
          >
            Consult KP Specialist (₹10/min)
          </button>
        </div>

      </div>
    </div>
  );
}
