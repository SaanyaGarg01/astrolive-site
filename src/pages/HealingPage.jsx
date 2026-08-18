import React, { useState, useEffect } from 'react';
import { useAstro } from '../context/AstroContext';
import { Sparkles, Heart, Activity, Sun, Moon, Volume2, Play, Pause, RefreshCw, CheckCircle2, ShieldCheck, User } from 'lucide-react';

const HEALING_TABS = [
  { id: 'feng-shui', label: 'FENG SHUI', icon: '☯️' },
  { id: 'reiki', label: 'REIKI HEALING', icon: '🖐️' },
  { id: 'meditation', label: 'MEDITATION', icon: '🧘' },
  { id: 'yoga', label: 'YOGA', icon: '🧘‍♀️' },
  { id: 'crystal-therapy', label: 'CRYSTAL THERAPY', icon: '💎' }
];

const CHAKRAS = [
  { id: 'root', name: 'Root Chakra (Muladhara)', color: 'bg-red-500', textColor: 'text-red-400', location: 'Base of Spine', element: 'Earth', mantra: 'LAM', note: 'Grounding, security, and financial survival energy.' },
  { id: 'sacral', name: 'Sacral Chakra (Svadhisthana)', color: 'bg-orange-500', textColor: 'text-orange-400', location: 'Lower Abdomen', element: 'Water', mantra: 'VAM', note: 'Creativity, passion, and emotional expression.' },
  { id: 'solar', name: 'Solar Plexus (Manipura)', color: 'bg-yellow-500', textColor: 'text-yellow-400', location: 'Navel Area', element: 'Fire', mantra: 'RAM', note: 'Willpower, personal power, and self-confidence.' },
  { id: 'heart', name: 'Heart Chakra (Anahata)', color: 'bg-emerald-500', textColor: 'text-emerald-400', location: 'Center of Chest', element: 'Air', mantra: 'YAM', note: 'Unconditional love, compassion, and healing.' },
  { id: 'throat', name: 'Throat Chakra (Vishuddha)', color: 'bg-cyan-500', textColor: 'text-cyan-400', location: 'Throat', element: 'Ether', mantra: 'HAM', note: 'Truthful communication and authentic expression.' },
  { id: 'third-eye', name: 'Third Eye (Ajna)', color: 'bg-indigo-500', textColor: 'text-indigo-400', location: 'Between Eyebrows', element: 'Light', mantra: 'OM', note: 'Intuition, spiritual vision, and inner wisdom.' },
  { id: 'crown', name: 'Crown Chakra (Sahasrara)', color: 'bg-purple-500', textColor: 'text-purple-400', location: 'Top of Head', element: 'Cosmic Energy', mantra: 'AH', note: 'Higher consciousness and divine oneness.' }
];

const CRYSTALS = [
  { id: 'amethyst', name: 'Amethyst', color: 'bg-purple-600', text: 'Peace, Stress Relief & Higher Intuition', desc: 'Soothes nervous tension, purifies the aura, and enhances meditation depth.' },
  { id: 'rosequartz', name: 'Rose Quartz', color: 'bg-pink-500', text: 'Unconditional Love & Relationship Healing', desc: 'Opens the heart chakra to attract romantic harmony and self-compassion.' },
  { id: 'citrine', name: 'Citrine', color: 'bg-amber-500', text: 'Merchant Stone of Wealth & Confidence', desc: 'Attracts financial abundance, success, and positive solar energy.' },
  { id: 'blacktourmaline', name: 'Black Tourmaline', color: 'bg-slate-800', text: 'EMF & Negative Energy Protection Shield', desc: 'Repels dark vibrations, psychic stress, and grounds your aura field.' },
  { id: 'greenaventurine', name: 'Green Aventurine', color: 'bg-emerald-600', text: 'Opportunity & Good Luck Magnet', desc: 'Aligns heart energy with fresh career opportunities and prosperity.' }
];

export default function HealingPage() {
  const { healingSubView, setHealingSubView, setActiveTab } = useAstro();
  const [activeTabLocal, setActiveTabLocal] = useState(healingSubView || 'feng-shui');

  // Chakra state
  const [selectedChakra, setSelectedChakra] = useState(CHAKRAS[3]); // Heart chakra default

  // Audio timer state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [meditationTimer, setMeditationTimer] = useState(10); // minutes

  // Feng Shui state
  const [selectedZone, setSelectedZone] = useState('wealth');

  // Crystal state
  const [selectedCrystal, setSelectedCrystal] = useState(CRYSTALS[0]);

  // Sync if context subView changes from navbar dropdown
  useEffect(() => {
    if (healingSubView) {
      setActiveTabLocal(healingSubView);
    }
  }, [healingSubView]);

  const handleTabChange = (tabId) => {
    setActiveTabLocal(tabId);
    if (setHealingSubView) setHealingSubView(tabId);
  };

  return (
    <div className="min-h-screen bg-[#070b19] text-white pb-20 relative">
      
      {/* Mystical Healing Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-950 border-b border-emerald-900/40 py-8 px-4 sm:px-8 text-center space-y-3 relative overflow-hidden">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="inline-flex items-center gap-2 bg-emerald-900/40 border border-emerald-500/30 px-4 py-1.5 rounded-full text-xs font-black text-emerald-300">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>Holistic Health & Spiritual Energy Healing</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-white to-teal-200 tracking-tight">
          Harmonize Body, Mind & Cosmic Spirit
        </h1>
        <p className="text-xs sm:text-sm text-emerald-300/80 max-w-2xl mx-auto font-medium">
          Master Feng Shui Chi, 7 Chakra Reiki, Sound Meditation, Astro-Yoga Asanas, and Crystal Therapies.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">

        {/* 5 Healing Disciplines Pill Bar matching Screenshot */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar py-2 border-b border-slate-800">
          {HEALING_TABS.map((tab) => {
            const isActive = activeTabLocal === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`px-5 py-3 rounded-2xl text-xs font-black tracking-wider transition-all shrink-0 flex items-center gap-2 cursor-pointer border-none ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-950 ring-2 ring-emerald-400/50'
                    : 'bg-slate-900/80 text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span className="text-base">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: FENG SHUI ☯️ */}
        {activeTabLocal === 'feng-shui' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <h2 className="text-2xl font-black text-white">Bagua Energy Map & Chi Flow Enhancers</h2>
              <p className="text-xs text-emerald-300/80 font-medium">
                Align environmental Chi energy in your living and work space for health, wealth, and emotional harmony.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 space-y-3">
                {[
                  { id: 'wealth', zone: 'South-East (SE)', title: 'Wealth & Abundance Zone', remedy: 'Place Money Plant, Jade Crystal, or Water Fountain.' },
                  { id: 'fame', zone: 'South (S)', title: 'Fame & Recognition Zone', remedy: 'Keep bright red candles or wooden artifacts.' },
                  { id: 'love', zone: 'South-West (SW)', title: 'Love & Relationship Zone', remedy: 'Display Mandarin Ducks or Rose Quartz crystals.' },
                  { id: 'career', zone: 'North (N)', title: 'Career & Life Path Zone', remedy: 'Hang metallic Wind Chimes or a tortoise figurine.' }
                ].map((z) => (
                  <button
                    key={z.id}
                    onClick={() => setSelectedZone(z.id)}
                    className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      selectedZone === z.id
                        ? 'bg-emerald-950/80 border-emerald-400 text-white shadow-lg'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-sm text-white">{z.title}</h4>
                      <span className="text-[10px] font-black text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full">{z.zone}</span>
                    </div>
                    <p className="text-[11px] text-emerald-300/90 mt-1 font-medium">{z.remedy}</p>
                  </button>
                ))}
              </div>

              <div className="lg:col-span-7 bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-emerald-500/30 space-y-6 shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <span className="text-xs font-black uppercase text-emerald-400">Chi Energy Optimizer</span>
                  <span className="text-xs font-black text-amber-300">Auspicious Level: 95%</span>
                </div>

                <div className="space-y-4 text-xs text-slate-300 font-medium leading-relaxed">
                  <p>
                    Feng Shui (Wind & Water) teaches that unobstructed Chi flow revitalizes personal aura. By maintaining clean, well-lit pathways in the South-East and North zones, negative stagnations (Sha Chi) are neutralized.
                  </p>

                  <div className="bg-emerald-950/40 rounded-2xl p-5 border border-emerald-500/30 space-y-2">
                    <h5 className="font-bold text-emerald-300 text-sm">Recommended Feng Shui Items:</h5>
                    <ul className="space-y-1.5 text-slate-300">
                      <li>✨ <strong>6-Rod Metal Wind Chime:</strong> Disperses stagnant energy near doors.</li>
                      <li>✨ <strong>Laughing Buddha:</strong> Placed facing main entry to welcome joy.</li>
                      <li>✨ <strong>Three-Legged Money Toad:</strong> Positioned in wealth corner.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: REIKI HEALING 🖐️ */}
        {activeTabLocal === 'reiki' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <h2 className="text-2xl font-black text-white">7 Chakra Reiki Alignment Visualizer</h2>
              <p className="text-xs text-emerald-300/80 font-medium">
                Click on any Chakra node to balance energy channels and remove pranic blockages.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Chakra Stack */}
              <div className="lg:col-span-5 bg-slate-900/90 rounded-3xl p-6 border border-emerald-500/30 space-y-3 shadow-2xl">
                {CHAKRAS.map((chk) => {
                  const isSel = selectedChakra.id === chk.id;
                  return (
                    <button
                      key={chk.id}
                      onClick={() => setSelectedChakra(chk)}
                      className={`w-full p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                        isSel
                          ? 'bg-slate-800 border-emerald-400 text-white shadow-md'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-900'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full ${chk.color} shrink-0 shadow-sm`} />
                      <div className="flex-1">
                        <h4 className="font-extrabold text-xs text-white">{chk.name}</h4>
                        <p className="text-[10px] text-slate-400">{chk.location} • Seed Mantra: {chk.mantra}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right Chakra Analysis */}
              <div className="lg:col-span-7 bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-emerald-500/30 space-y-6 shadow-2xl">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full ${selectedChakra.color} flex items-center justify-center text-white font-black text-xs`}>
                    {selectedChakra.mantra}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg text-white">{selectedChakra.name}</h3>
                    <span className="text-xs text-emerald-400 font-bold">Element: {selectedChakra.element}</span>
                  </div>
                </div>

                <div className="bg-emerald-950/40 rounded-2xl p-5 border border-emerald-500/30 space-y-3 text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                  <p>✨ <strong>Reiki Energy Function:</strong> {selectedChakra.note}</p>
                  <p>🧘 <strong>Affirmation:</strong> "I am balanced, grounded, and surrounded by unconditional divine energy."</p>
                </div>

                <button
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black py-3 rounded-full text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:scale-102 transition-transform border-none cursor-pointer"
                >
                  {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isPlayingAudio ? 'Pause Reiki Healing Audio' : 'Play 528Hz Distance Reiki Audio'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: MEDITATION 🧘 */}
        {activeTabLocal === 'meditation' && (
          <div className="space-y-8 animate-in fade-in duration-300 max-w-3xl mx-auto text-center">
            <div className="bg-slate-900/90 rounded-3xl p-8 border border-emerald-500/30 space-y-6 shadow-2xl">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 p-1 mx-auto shadow-xl">
                <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center text-3xl">
                  🧘
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-black text-white">Guided Mantra & Solfeggio Sound Meditation</h2>
                <p className="text-xs text-emerald-300/80 font-medium">
                  Select your meditation timer and immerse yourself in 528Hz Solfeggio Transformation Frequencies.
                </p>
              </div>

              {/* Timer Buttons */}
              <div className="flex items-center justify-center gap-3">
                {[5, 10, 15, 20, 30].map((mins) => (
                  <button
                    key={mins}
                    onClick={() => setMeditationTimer(mins)}
                    className={`px-4 py-2 rounded-full text-xs font-black transition-all cursor-pointer border-none ${
                      meditationTimer === mins
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {mins} Min
                  </button>
                ))}
              </div>

              <div className="bg-emerald-950/50 rounded-2xl p-6 border border-emerald-500/30 space-y-4">
                <div className="text-3xl font-black text-emerald-300 tracking-wider">
                  {meditationTimer}:00 MIN
                </div>

                <button
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black px-8 py-3.5 rounded-full text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all border-none cursor-pointer flex items-center justify-center gap-2 mx-auto"
                >
                  {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isPlayingAudio ? 'Pause Session' : 'Begin Meditation'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: YOGA 🧘‍♀️ */}
        {activeTabLocal === 'yoga' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <h2 className="text-2xl font-black text-white">Astro-Yoga Asanas for Planetary Balance</h2>
              <p className="text-xs text-emerald-300/80 font-medium">
                Balance planetary energy transits through targeted Vedic Yoga postures.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Surya Namaskar (Sun Salutation)', planet: 'Sun (Surya)', benefit: 'Vitality, leadership, confidence, and spine health.' },
                { title: 'Chandra Namaskar (Moon Salutation)', planet: 'Moon (Chandra)', benefit: 'Calms mind, balances emotions, and relieves anxiety.' },
                { title: 'Vrikshasana (Tree Pose)', planet: 'Saturn (Shani)', benefit: 'Builds focus, leg stability, and karmic patience.' }
              ].map((yoga, idx) => (
                <div key={idx} className="bg-slate-900/90 rounded-3xl p-6 border border-emerald-500/30 space-y-3 shadow-xl">
                  <div className="w-10 h-10 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center font-bold text-lg">
                    🧘‍♀️
                  </div>
                  <h3 className="font-extrabold text-sm text-white">{yoga.title}</h3>
                  <span className="text-[10px] font-black text-amber-300 bg-amber-950/60 px-2.5 py-0.5 rounded-full">
                    {yoga.planet}
                  </span>
                  <p className="text-xs text-slate-300 font-medium leading-relaxed pt-2 border-t border-slate-800">
                    {yoga.benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: CRYSTAL THERAPY 💎 */}
        {activeTabLocal === 'crystal-therapy' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <h2 className="text-2xl font-black text-white">Healing Crystal & Gemstone Encyclopedia</h2>
              <p className="text-xs text-emerald-300/80 font-medium">
                Tap on any crystal to learn its healing vibrations and cleansing rituals.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 space-y-3">
                {CRYSTALS.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCrystal(c)}
                    className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                      selectedCrystal.id === c.id
                        ? 'bg-emerald-950/80 border-emerald-400 text-white shadow-lg'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full ${c.color} shrink-0`} />
                    <div>
                      <h4 className="font-extrabold text-sm text-white">{c.name}</h4>
                      <p className="text-[11px] text-emerald-300 font-medium">{c.text}</p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="lg:col-span-7 bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-emerald-500/30 space-y-4 shadow-2xl">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full ${selectedCrystal.color} flex items-center justify-center text-white text-sm font-bold`}>
                    💎
                  </div>
                  <h3 className="font-extrabold text-xl text-white">{selectedCrystal.name}</h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                  {selectedCrystal.desc}
                </p>

                <div className="bg-emerald-950/40 rounded-2xl p-4 border border-emerald-500/30 text-xs text-emerald-200 font-bold space-y-1">
                  <p>✨ <strong>Cleansing Ritual:</strong> Wash under running natural water and charge under Full Moon light for 6 hours.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Healing Consultation Banner */}
        <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl border border-emerald-500/30">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-black text-lg sm:text-xl">Need a live 1-on-1 Energy Healing Session?</h3>
            <p className="text-xs text-emerald-200">Connect with certified Reiki Masters, Feng Shui Consultants, and Crystal Therapists.</p>
          </div>
          <button
            onClick={() => setActiveTab('astrologers')}
            className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-black px-7 py-3.5 rounded-full text-xs uppercase tracking-wider hover:scale-105 transition-transform border-none cursor-pointer shrink-0 shadow-lg"
          >
            Consult Healer (₹10/min)
          </button>
        </div>

      </div>
    </div>
  );
}
