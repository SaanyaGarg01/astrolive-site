import React, { useState, useEffect } from 'react';
import { useAstro } from '../context/AstroContext';
import { BookOpen, Sparkles, ShieldCheck, Sun, Moon, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

const LAL_KITAB_TABS = [
  { id: 'lal-kitab-home', label: 'LAL KITAB HOME', icon: '📕' },
  { id: 'what-is-lal-kitab', label: 'WHAT IS LAL KITAB?', icon: '❓' },
  { id: 'houses', label: 'HOUSES', icon: '🏠' },
  { id: 'planets', label: 'PLANETS', icon: '🪐' }
];

const LAL_KITAB_REMEDIES = [
  { planet: 'Sun (Surya)', remedy: 'Offer jaggery or copper coins in flowing water for 43 consecutive days.', effect: 'Enhances career growth, authority, and father’s health.' },
  { planet: 'Moon (Chandra)', remedy: 'Keep a pure silver square piece in your wallet or drink water in a silver cup.', effect: 'Calms mental stress, cures insomnia, and increases cash flow.' },
  { planet: 'Mars (Mangal)', remedy: 'Feed sweet tandoori rotis or jaggery to stray dogs or cows on Tuesdays.', effect: 'Removes Manglik dosha, land disputes, and anger issues.' },
  { planet: 'Mercury (Budh)', remedy: 'Pierce a copper coin, wear it in a white thread, or donate green moong dal.', effect: 'Improves business negotiations, intellect, and speech.' },
  { planet: 'Jupiter (Guru)', remedy: 'Apply saffron (kesar) or turmeric tilak on your forehead & navel every morning.', effect: 'Magnifies luck, spiritual grace, higher studies, and wealth.' },
  { planet: 'Venus (Shukra)', remedy: 'Donate cow ghee, curd, or silver ornaments to women; wear clean white clothes.', effect: 'Attracts marital bliss, luxury, artistic success, and charm.' },
  { planet: 'Saturn (Shani)', remedy: 'Offer mustard oil (Chhaya Dan) to needy or feed fried bhajiya to crows.', effect: 'Mitigates Sade Sati, job delays, chronic pains, and legal trouble.' },
  { planet: 'Rahu', remedy: 'Keep radish near your bed at night and donate it at a temple the next morning.', effect: 'Neutralizes sudden losses, illusions, addictions, and Rahu Mahadasha.' },
  { planet: 'Ketu', remedy: 'Feed two-color (black & white) dogs with sesame bread or donate a blanket.', effect: 'Grants spiritual awakening, protects children, and cures joint pains.' }
];

const LAL_KITAB_HOUSES = [
  { house: 1, name: 'House 1 (Tanu Bhava)', pakkaGhar: 'Sun & Mars', desc: 'Represents physical self, head, and vital courage. Fixed sign Aries.' },
  { house: 2, name: 'House 2 (Dhana Bhava)', pakkaGhar: 'Jupiter', desc: 'Represents ancestral wealth, family bank balance, and throat.' },
  { house: 3, name: 'House 3 (Sahaja Bhava)', pakkaGhar: 'Mars', desc: 'Represents younger siblings, hands, physical strength, and valor.' },
  { house: 4, name: 'House 4 (Sukha Bhava)', pakkaGhar: 'Moon', desc: 'Represents mother, vehicle, home property, and emotional peace.' },
  { house: 5, name: 'House 5 (Putra Bhava)', pakkaGhar: 'Jupiter', desc: 'Represents education, children, memory, and past life merit.' },
  { house: 6, name: 'House 6 (Ripu Bhava)', pakkaGhar: 'Mercury & Rahu', desc: 'Represents enemies, debts, health diseases, and maternal uncle.' },
  { house: 7, name: 'House 7 (Yuvati Bhava)', pakkaGhar: 'Venus & Mercury', desc: 'Represents spouse, marriage partner, business alliances, and trade.' },
  { house: 8, name: 'House 8 (Randhra Bhava)', pakkaGhar: 'Saturn & Mars', desc: 'Represents longevity, unearned wealth, mystery, and sudden events.' },
  { house: 9, name: 'House 9 (Dharma Bhava)', pakkaGhar: 'Jupiter', desc: 'Represents fortune, pilgrimage, guru, father, and spiritual luck.' },
  { house: 10, name: 'House 10 (Karma Bhava)', pakkaGhar: 'Saturn', desc: 'Represents career, profession, government honors, and father’s status.' },
  { house: 11, name: 'House 11 (Labha Bhava)', pakkaGhar: 'Jupiter', desc: 'Represents net financial gains, fulfillment of desires, and elder siblings.' },
  { house: 12, name: 'House 12 (Vyaya Bhava)', pakkaGhar: 'Rahu & Saturn', desc: 'Represents foreign travel, bed comforts, hospital expenses, and moksha.' }
];

export default function LalKitabPage() {
  const { lalKitabSubView, setLalKitabSubView, setActiveTab } = useAstro();
  const [activeTabLocal, setActiveTabLocal] = useState(lalKitabSubView || 'lal-kitab-home');
  const [selectedHouse, setSelectedHouse] = useState(LAL_KITAB_HOUSES[0]);
  const [selectedRemedyPlanet, setSelectedRemedyPlanet] = useState(LAL_KITAB_REMEDIES[0]);

  // Sync if context subView updates from navbar dropdown
  useEffect(() => {
    if (lalKitabSubView) {
      setActiveTabLocal(lalKitabSubView);
    }
  }, [lalKitabSubView]);

  const handleTabChange = (tabId) => {
    setActiveTabLocal(tabId);
    if (setLalKitabSubView) setLalKitabSubView(tabId);
  };

  return (
    <div className="min-h-screen bg-[#11091c] text-white pb-20 relative">
      
      {/* Lal Kitab Banner */}
      <div className="bg-gradient-to-r from-red-950 via-purple-950 to-slate-950 border-b border-red-900/40 py-8 px-4 sm:px-8 text-center space-y-3 relative overflow-hidden">
        <div className="inline-flex items-center gap-2 bg-red-900/40 border border-red-500/30 px-4 py-1.5 rounded-full text-xs font-black text-red-300">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Vedic Remedies & Karmic Upaya System</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-200 via-white to-amber-200 tracking-tight">
          Lal Kitab Kundli & Proven Upaya (Remedies)
        </h1>
        <p className="text-xs sm:text-sm text-red-300/80 max-w-2xl mx-auto font-medium">
          Simple, effective, low-cost remedies without expensive pujas. Master Pakka Ghar, Varshphal, and Planetary Alignments.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">

        {/* 4 Lal Kitab Tool Pill Bar matching Screenshot */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar py-2 border-b border-slate-800">
          {LAL_KITAB_TABS.map((tab) => {
            const isActive = activeTabLocal === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`px-5 py-3 rounded-2xl text-xs font-black tracking-wider transition-all shrink-0 flex items-center gap-2 cursor-pointer border-none ${
                  isActive
                    ? 'bg-gradient-to-r from-red-600 to-purple-600 text-white shadow-lg shadow-red-950 ring-2 ring-red-400/50'
                    : 'bg-slate-900/80 text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span className="text-base">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: LAL KITAB HOME 📕 */}
        {activeTabLocal === 'lal-kitab-home' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <h2 className="text-2xl font-black text-white">Lal Kitab Master Remedies (Totke)</h2>
              <p className="text-xs text-red-300/80 font-medium">
                Vedic remedies designed to neutralize negative planetary aspects for 43 days.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {LAL_KITAB_REMEDIES.slice(0, 6).map((rem, idx) => (
                <div key={idx} className="bg-slate-900/90 rounded-3xl p-6 border border-red-500/30 space-y-3 shadow-xl">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-sm text-amber-300">{rem.planet}</h3>
                    <span className="text-[10px] font-black text-red-400 bg-red-950 px-2 py-0.5 rounded-full">43 Days Upaya</span>
                  </div>
                  <p className="text-xs text-white font-bold leading-snug">✨ {rem.remedy}</p>
                  <p className="text-[11px] text-slate-300 font-medium pt-2 border-t border-slate-800">
                    💡 <strong>Effect:</strong> {rem.effect}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: WHAT IS LAL KITAB? ❓ */}
        {activeTabLocal === 'what-is-lal-kitab' && (
          <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl mx-auto">
            <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-red-500/30 space-y-6 shadow-2xl">
              <div className="space-y-2 border-b border-slate-800 pb-4">
                <h2 className="text-2xl font-black text-white">Principles of Lal Kitab Astrology</h2>
                <p className="text-xs text-red-300 font-medium">
                  Authored by Pt. Roop Chand Joshi in 1939, Lal Kitab is renowned for its practical diagnostic clarity and fast-acting remedies.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                <div className="bg-slate-950/60 p-5 rounded-2xl border border-red-900/40 space-y-2">
                  <h4 className="font-extrabold text-white text-sm text-red-400">1. Fixed Kalpurush Kundli</h4>
                  <p>In Lal Kitab, House 1 is always Aries, House 2 is Taurus, and so forth, simplifying planetary placement analysis without changing lagna signs.</p>
                </div>

                <div className="bg-slate-950/60 p-5 rounded-2xl border border-red-900/40 space-y-2">
                  <h4 className="font-extrabold text-white text-sm text-red-400">2. Pakka Ghar (Permanent Houses)</h4>
                  <p>Every planet has a permanent house (Pakka Ghar) where its natural strength operates regardless of current natal chart positions.</p>
                </div>

                <div className="bg-slate-950/60 p-5 rounded-2xl border border-red-900/40 space-y-2">
                  <h4 className="font-extrabold text-white text-sm text-red-400">3. Artificial Planets (Synthetic Grahas)</h4>
                  <p>Lal Kitab pairs planets artificially (e.g., Sun + Mercury = Venus effect; Sun + Saturn = Rahu/Ketu effect) for precise diagnosis.</p>
                </div>

                <div className="bg-slate-950/60 p-5 rounded-2xl border border-red-900/40 space-y-2">
                  <h4 className="font-extrabold text-white text-sm text-red-400">4. Simple Practical Remedies (Upaya)</h4>
                  <p>Remedies use natural elements (flowing water, copper, silver, grain donations) for 43 days to bring immediate karmic relief.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: HOUSES 🏠 */}
        {activeTabLocal === 'houses' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <h2 className="text-2xl font-black text-white">12 Houses & Pakka Ghar System</h2>
              <p className="text-xs text-red-300/80 font-medium">
                Click on any house to view its Lal Kitab Pakka Ghar rulers and life significance.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 space-y-2 max-h-[500px] overflow-y-auto pr-1 no-scrollbar">
                {LAL_KITAB_HOUSES.map((h) => {
                  const isSel = selectedHouse.house === h.house;
                  return (
                    <button
                      key={h.house}
                      onClick={() => setSelectedHouse(h)}
                      className={`w-full p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                        isSel
                          ? 'bg-red-950/80 border-red-400 text-white shadow-lg'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      <div>
                        <h4 className="font-extrabold text-xs text-white">{h.name}</h4>
                        <p className="text-[10px] text-red-300">Pakka Ghar: {h.pakkaGhar}</p>
                      </div>
                      <span className="text-xs font-black text-slate-500">#{h.house}</span>
                    </button>
                  );
                })}
              </div>

              <div className="lg:col-span-7 bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-red-500/30 space-y-4 shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="font-extrabold text-xl text-white">{selectedHouse.name}</h3>
                  <span className="text-xs font-black text-amber-300 bg-red-950 px-3 py-1 rounded-full border border-red-500/40">
                    Pakka Ghar: {selectedHouse.pakkaGhar}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                  {selectedHouse.desc}
                </p>

                <div className="bg-red-950/40 rounded-2xl p-4 border border-red-500/30 text-xs text-red-200 font-bold space-y-1">
                  <p>✨ <strong>Lal Kitab House Rule:</strong> Planets in this house deliver their purest results when Pakka Ghar rulers are beneficially aligned.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PLANETS 🪐 */}
        {activeTabLocal === 'planets' && (
          <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl mx-auto">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-black text-white">9 Lal Kitab Planets & Specific Remedies</h2>
              <p className="text-xs text-red-300/80 font-medium">
                Select a planet to view its specific 43-day Lal Kitab remedy.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 space-y-2">
                {LAL_KITAB_REMEDIES.map((r, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedRemedyPlanet(r)}
                    className={`w-full p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      selectedRemedyPlanet.planet === r.planet
                        ? 'bg-red-950/80 border-red-400 text-white shadow-lg'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <h4 className="font-extrabold text-xs text-white">{r.planet}</h4>
                  </button>
                ))}
              </div>

              <div className="lg:col-span-7 bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-red-500/30 space-y-4 shadow-2xl">
                <h3 className="font-extrabold text-xl text-amber-300">{selectedRemedyPlanet.planet}</h3>
                
                <div className="bg-slate-950/70 p-4 rounded-2xl border border-red-900/40 space-y-2">
                  <span className="text-[10px] font-black text-red-400 uppercase">Mandatory 43-Day Upaya</span>
                  <p className="text-xs sm:text-sm text-white font-bold">{selectedRemedyPlanet.remedy}</p>
                </div>

                <div className="bg-red-950/40 rounded-2xl p-4 border border-red-500/30 text-xs text-slate-200 font-medium">
                  💡 <strong>Expected Outcome:</strong> {selectedRemedyPlanet.effect}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Consultation CTA */}
        <div className="bg-gradient-to-r from-red-950 via-purple-950 to-slate-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl border border-red-500/30">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-black text-lg sm:text-xl">Want a personalized Lal Kitab Varshphal Reading?</h3>
            <p className="text-xs text-red-200">Consult top Lal Kitab Astrologers for custom annual remedies.</p>
          </div>
          <button
            onClick={() => setActiveTab('astrologers')}
            className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-black px-7 py-3.5 rounded-full text-xs uppercase tracking-wider hover:scale-105 transition-transform border-none cursor-pointer shrink-0 shadow-lg"
          >
            Consult Lal Kitab Expert (₹10/min)
          </button>
        </div>

      </div>
    </div>
  );
}
