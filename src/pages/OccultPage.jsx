import React, { useState, useEffect } from 'react';
import { useAstro } from '../context/AstroContext';
import { Sparkles, Hand, Compass, Eye, ShieldCheck, RefreshCw, Zap, ArrowRight, CheckCircle2, MessageSquare, PhoneCall } from 'lucide-react';

const OCCULT_TABS = [
  { id: 'palmistry', label: 'PALMISTRY', icon: '✋' },
  { id: 'tarot', label: 'TAROT READING', icon: '🃏' },
  { id: 'psychic', label: 'PSYCHIC', icon: '🔮' },
  { id: 'vastu', label: 'VASTU', icon: '🏡' },
  { id: 'chinese-astrology', label: 'CHINESE ASTROLOGY', icon: '🐉' }
];

// Tarot Deck Cards
const TAROT_DECK = [
  { name: 'The Sun (XIX)', keywords: 'Success, Joy, Vitality, Radiance', text: 'The Sun indicates positive energy, clarity, and victory. Your path ahead is illuminated with warmth and true fulfillment.' },
  { name: 'The Star (XVII)', keywords: 'Hope, Inspiration, Spiritual Guidance', text: 'A beacon of renewed faith and peace. Trust that cosmic forces are supporting your highest aspirations.' },
  { name: 'Wheel of Fortune (X)', keywords: 'Destiny, Turning Point, Luck', text: 'Fate is shifting in your favor. Adapt to upcoming changes as they carry immense opportunities for expansion.' },
  { name: 'The Empress (III)', keywords: 'Abundance, Fertility, Nurturing', text: 'Creation and harmony surround your endeavors. Maternal instincts and artistic endeavors bring fruitful outcomes.' },
  { name: 'The Magician (I)', keywords: 'Manifestation, Resourcefulness, Power', text: 'You possess all tools necessary to turn intentions into reality. Focus your willpower with single-minded devotion.' },
  { name: 'The Lovers (VI)', keywords: 'Partnership, Union, Values Alignment', text: 'Deep emotional alignment and key decision-making. Harmony in choices yields lasting peace.' }
];

// Chinese Zodiac Data
const CHINESE_ZODIAC_DATA = {
  dragon: { name: 'Dragon', element: 'Yang Wood', years: '1940, 1952, 1964, 1976, 1988, 2000, 2012, 2024', traits: 'Charismatic, Powerful, Ambitious, Noble', luckyColors: 'Gold, Silver, Hoary', luckyNumbers: '1, 6, 7' },
  tiger: { name: 'Tiger', element: 'Yang Wood', years: '1938, 1950, 1962, 1974, 1986, 1998, 2010, 2022', traits: 'Brave, Competitive, Unpredictable, Confident', luckyColors: 'Blue, Grey, Orange', luckyNumbers: '1, 3, 4' },
  snake: { name: 'Snake', element: 'Yin Fire', years: '1941, 1953, 1965, 1977, 1989, 2001, 2013, 2025', traits: 'Wise, Intuitive, Mysterious, Elegant', luckyColors: 'Black, Red, Yellow', luckyNumbers: '2, 8, 9' },
  horse: { name: 'Horse', element: 'Yang Fire', years: '1942, 1954, 1966, 1978, 1990, 2002, 2014, 2026', traits: 'Animated, Active, Energetic, Independent', luckyColors: 'Yellow, Green', luckyNumbers: '2, 3, 7' },
  ox: { name: 'Ox', element: 'Yin Earth', years: '1937, 1949, 1961, 1973, 1985, 1997, 2009, 2021', traits: 'Dependable, Strong, Determined, Honest', luckyColors: 'White, Yellow, Green', luckyNumbers: '1, 4' },
  rabbit: { name: 'Rabbit', element: 'Yin Wood', years: '1939, 1951, 1963, 1975, 1987, 1999, 2011, 2023', traits: 'Quiet, Elegant, Kind, Responsible', luckyColors: 'Red, Pink, Purple, Blue', luckyNumbers: '3, 4, 6' }
};

export default function OccultPage() {
  const { occultSubView, setOccultSubView, setActiveTab } = useAstro();
  const [activeTabLocal, setActiveTabLocal] = useState(occultSubView || 'palmistry');

  // Palmistry local state
  const [activePalmLine, setActivePalmLine] = useState('heart');

  // Tarot local state
  const [tarotFlipped, setTarotFlipped] = useState([false, false, false]);
  const [drawnCards, setDrawnCards] = useState([0, 1, 2]);

  // Psychic local state
  const [psychicScanning, setPsychicScanning] = useState(false);
  const [psychicAura, setPsychicAura] = useState(null);

  // Vastu local state
  const [selectedRoom, setSelectedRoom] = useState('entrance');
  const [roomDirection, setRoomDirection] = useState('NE');

  // Chinese Astrology local state
  const [birthYearInput, setBirthYearInput] = useState('1996');
  const [selectedSign, setSelectedSign] = useState('dragon');

  // Sync if context subview changes from dropdown clicks
  useEffect(() => {
    if (occultSubView) {
      setActiveTabLocal(occultSubView);
    }
  }, [occultSubView]);

  const handleTabChange = (tabId) => {
    setActiveTabLocal(tabId);
    if (setOccultSubView) setOccultSubView(tabId);
  };

  // Tarot shuffle
  const shuffleTarot = () => {
    const shuffled = [...Array(TAROT_DECK.length).keys()].sort(() => Math.random() - 0.5);
    setDrawnCards(shuffled.slice(0, 3));
    setTarotFlipped([false, false, false]);
  };

  // Psychic scan
  const startPsychicScan = () => {
    setPsychicScanning(true);
    setTimeout(() => {
      setPsychicScanning(false);
      setPsychicAura({
        color: 'Golden Violet Aura',
        frequency: '528 Hz (Solfeggio Transformation)',
        spiritMessage: 'Your intuitive third eye is opening to major breakthrough opportunities in career and love. Maintain quiet meditation at twilight.'
      });
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#0d0f1d] text-white pb-20 relative">
      
      {/* Mystical Header Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-950 border-b border-purple-900/50 py-8 px-4 sm:px-8 text-center space-y-3 relative overflow-hidden">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="inline-flex items-center gap-2 bg-purple-900/40 border border-purple-500/30 px-4 py-1.5 rounded-full text-xs font-black text-purple-300">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Esoteric & Occult Sciences Portal</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-white to-pink-200 tracking-tight">
          Discover Sacred Occult Wisdom
        </h1>
        <p className="text-xs sm:text-sm text-purple-300/80 max-w-2xl mx-auto font-medium">
          Explore Palmistry, Tarot Readings, Psychic Energies, Vastu Geometry, and Chinese Zodiac Metaphysics.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">

        {/* 5 Occult Science Pill Bar matching User Screenshot */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar py-2 border-b border-slate-800">
          {OCCULT_TABS.map((tab) => {
            const isActive = activeTabLocal === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`px-5 py-3 rounded-2xl text-xs font-black tracking-wider transition-all shrink-0 flex items-center gap-2 cursor-pointer border-none ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-950 ring-2 ring-purple-400/50'
                    : 'bg-slate-900/80 text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span className="text-base">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: PALMISTRY ✋ */}
        {activeTabLocal === 'palmistry' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Interactive Palm Visualizer */}
              <div className="lg:col-span-6 bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-purple-900/40 text-center space-y-6 relative overflow-hidden shadow-2xl">
                <div className="inline-flex items-center gap-2 bg-purple-950 text-purple-300 px-3 py-1 rounded-full text-xs font-bold border border-purple-800/50">
                  <Hand className="w-3.5 h-3.5" />
                  <span>Hastrekha Scanner</span>
                </div>

                <div className="relative aspect-square max-w-sm mx-auto bg-gradient-to-b from-purple-950/40 to-slate-950 rounded-full border-2 border-purple-500/30 flex items-center justify-center p-8 shadow-inner">
                  {/* Palm Lines Visual SVG */}
                  <svg viewBox="0 0 200 200" className="w-full h-full text-purple-400 stroke-current fill-none stroke-[2.5]">
                    {/* Hand outline */}
                    <path d="M 50 180 Q 40 120 50 80 Q 55 50 70 50 Q 80 50 85 85 Q 90 40 105 40 Q 115 40 120 85 Q 125 45 138 48 Q 148 50 148 95 Q 155 65 165 70 Q 172 75 165 110 Q 160 150 150 180 Z" stroke="#4c1d95" strokeWidth="2" fill="rgba(30, 27, 75, 0.4)" />
                    {/* Heart Line */}
                    <path d="M 60 100 Q 110 85 150 95" stroke={activePalmLine === 'heart' ? '#ec4899' : '#6b21a8'} strokeWidth={activePalmLine === 'heart' ? '4' : '2.5'} className="transition-all" />
                    {/* Head Line */}
                    <path d="M 60 115 Q 110 120 140 140" stroke={activePalmLine === 'head' ? '#3b82f6' : '#6b21a8'} strokeWidth={activePalmLine === 'head' ? '4' : '2.5'} className="transition-all" />
                    {/* Life Line */}
                    <path d="M 60 110 Q 75 150 100 175" stroke={activePalmLine === 'life' ? '#10b981' : '#6b21a8'} strokeWidth={activePalmLine === 'life' ? '4' : '2.5'} className="transition-all" />
                    {/* Fate Line */}
                    <path d="M 110 175 Q 105 130 115 80" stroke={activePalmLine === 'fate' ? '#f59e0b' : '#6b21a8'} strokeWidth={activePalmLine === 'fate' ? '4' : '2.5'} className="transition-all" />
                  </svg>
                </div>

                <p className="text-xs text-purple-300/80 font-medium">
                  Select a palm line below to analyze your emotional, mental, and physical karmic destiny.
                </p>
              </div>

              {/* Right Palm Lines Controls & Analysis */}
              <div className="lg:col-span-6 space-y-6">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'heart', title: 'Heart Line (Hridaya)', color: 'text-pink-400', desc: 'Love, emotions, and marriage longevity.' },
                    { id: 'head', title: 'Head Line (Masti)', color: 'text-blue-400', desc: 'Intellect, focus, and decision making.' },
                    { id: 'life', title: 'Life Line (Aayu)', color: 'text-emerald-400', desc: 'Vitality, health, and major life changes.' },
                    { id: 'fate', title: 'Fate Line (Bhagya)', color: 'text-amber-400', desc: 'Career growth, wealth, and destiny.' }
                  ].map((line) => (
                    <button
                      key={line.id}
                      onClick={() => setActivePalmLine(line.id)}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                        activePalmLine === line.id
                          ? 'bg-purple-900/60 border-purple-400 text-white shadow-lg'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      <h4 className={`font-extrabold text-sm ${line.color}`}>{line.title}</h4>
                      <p className="text-[11px] text-slate-300 mt-1 font-medium">{line.desc}</p>
                    </button>
                  ))}
                </div>

                {/* Selected Line Reading Box */}
                <div className="bg-slate-900/90 rounded-2xl p-6 border border-purple-500/30 space-y-3">
                  <div className="flex items-center gap-2 font-black text-sm text-purple-200">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>AI Palmistry Interpretation ({activePalmLine.toUpperCase()} LINE)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                    {activePalmLine === 'heart' && 'Your Heart Line originates under the Mount of Jupiter, indicating a deeply devoted, honest, and romantic nature. You value emotional loyalty over fleeting attractions.'}
                    {activePalmLine === 'head' && 'A long, clear Head Line curving toward the Mount of Moon suggests high creative intelligence, strong analytical ability, and strategic problem-solving skills.'}
                    {activePalmLine === 'life' && 'A deep, unbroken Life Line curving around the Mount of Venus reflects strong physical immunity, robust energy, and deep roots in family heritage.'}
                    {activePalmLine === 'fate' && 'Your Fate Line rises straight from the wrist toward the Mount of Saturn, indicating self-made career success, financial independence, and early recognition.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TAROT READING 🃏 */}
        {activeTabLocal === 'tarot' && (
          <div className="space-y-8 animate-in fade-in duration-300 text-center">
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-white">3-Card Mystical Tarot Spread</h2>
              <p className="text-xs text-purple-300/80 font-medium">
                Focus your mind on a personal question and click the cards below to reveal Past, Present, and Future guidance.
              </p>
              <button
                onClick={shuffleTarot}
                className="mt-2 inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-black px-4 py-2 rounded-full shadow-md transition-all border-none cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Shuffle Tarot Deck</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {['Past Influences', 'Present Situation', 'Future Outlook'].map((position, idx) => {
                const cardIndex = drawnCards[idx];
                const card = TAROT_DECK[cardIndex];
                const isFlipped = tarotFlipped[idx];

                return (
                  <div
                    key={position}
                    onClick={() => {
                      const next = [...tarotFlipped];
                      next[idx] = true;
                      setTarotFlipped(next);
                    }}
                    className="bg-slate-900/90 rounded-3xl p-6 border border-purple-500/30 cursor-pointer space-y-4 hover:border-purple-400 transition-all group"
                  >
                    <span className="text-xs font-black uppercase text-purple-400 tracking-wider">
                      {position}
                    </span>

                    <div className="aspect-[3/4] bg-gradient-to-br from-purple-950 to-slate-950 rounded-2xl border-2 border-purple-500/40 p-4 flex flex-col items-center justify-center text-center shadow-lg group-hover:scale-105 transition-transform">
                      {isFlipped ? (
                        <div className="space-y-2 animate-in zoom-in-95 duration-300">
                          <div className="w-10 h-10 rounded-full bg-amber-400/20 text-amber-300 mx-auto flex items-center justify-center text-lg font-bold">
                            🔮
                          </div>
                          <h4 className="font-extrabold text-sm text-white">{card.name}</h4>
                          <p className="text-[10px] text-purple-300 font-bold">{card.keywords}</p>
                        </div>
                      ) : (
                        <div className="space-y-2 text-purple-300">
                          <span className="text-3xl">🎴</span>
                          <p className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Click to Reveal</p>
                        </div>
                      )}
                    </div>

                    {isFlipped && (
                      <p className="text-xs text-slate-300 font-medium leading-relaxed">
                        {card.text}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: PSYCHIC 🔮 */}
        {activeTabLocal === 'psychic' && (
          <div className="space-y-8 animate-in fade-in duration-300 max-w-3xl mx-auto text-center">
            <div className="bg-slate-900/90 rounded-3xl p-8 border border-purple-500/30 space-y-6 shadow-2xl">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-600 via-pink-600 to-indigo-600 p-1 mx-auto shadow-xl">
                <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center text-3xl">
                  🔮
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-black text-white">Intuitive Aura & Energy Frequency Scan</h2>
                <p className="text-xs text-purple-300/80 font-medium">
                  Align your mind and allow the spiritual sensor to tune into your subconscious energy field.
                </p>
              </div>

              <button
                onClick={startPsychicScan}
                disabled={psychicScanning}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black px-8 py-3 rounded-full text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all border-none cursor-pointer disabled:opacity-50"
              >
                {psychicScanning ? 'Scanning Energy Vibration...' : 'Scan My Aura Frequency'}
              </button>

              {psychicAura && (
                <div className="bg-purple-950/60 rounded-2xl p-6 border border-purple-500/40 text-left space-y-3 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-purple-300 uppercase">Aura Color</span>
                    <span className="text-xs font-black text-amber-300">{psychicAura.color}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-purple-300 uppercase">Vibration Frequency</span>
                    <span className="text-xs font-black text-emerald-400">{psychicAura.frequency}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium pt-2 border-t border-purple-800/50">
                    ✨ <strong>Spiritual Reading:</strong> {psychicAura.spiritMessage}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: VASTU 🏡 */}
        {activeTabLocal === 'vastu' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <h2 className="text-2xl font-black text-white">Vastu Shastra Directional Audit</h2>
              <p className="text-xs text-purple-300/80 font-medium">
                Check five key home zones for optimal energy balance, health, and financial prosperity.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 space-y-3">
                {[
                  { id: 'entrance', title: 'Main Entrance (Simha Dwara)', rec: 'North-East (NE) or East for maximum wealth.' },
                  { id: 'bedroom', title: 'Master Bedroom', rec: 'South-West (SW) for stability & peaceful sleep.' },
                  { id: 'kitchen', title: 'Kitchen (Agni Zone)', rec: 'South-East (SE) to fuel health & vitality.' },
                  { id: 'mandir', title: 'Puja Room / Mandir', rec: 'North-East (NE) for cosmic divine grace.' }
                ].map((room) => (
                  <button
                    key={room.id}
                    onClick={() => setSelectedRoom(room.id)}
                    className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      selectedRoom === room.id
                        ? 'bg-purple-900/60 border-purple-400 text-white shadow-lg'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <h4 className="font-extrabold text-sm text-white">{room.title}</h4>
                    <p className="text-[11px] text-purple-300 mt-1 font-medium">{room.rec}</p>
                  </button>
                ))}
              </div>

              <div className="lg:col-span-7 bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-purple-500/30 space-y-6 shadow-2xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-purple-300">Select Direction</span>
                  <div className="flex gap-2">
                    {['NE', 'E', 'SE', 'SW', 'NW'].map((dir) => (
                      <button
                        key={dir}
                        onClick={() => setRoomDirection(dir)}
                        className={`px-3 py-1.5 rounded-full text-xs font-black cursor-pointer border-none ${
                          roomDirection === dir ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {dir}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-purple-950/40 rounded-2xl p-6 border border-purple-500/30 space-y-3">
                  <div className="flex items-center gap-2 font-black text-sm text-emerald-400">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>Vastu Harmony Score: 92% (Highly Auspicious)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                    Positioning your {selectedRoom} in the <strong>{roomDirection}</strong> direction enhances overall domestic tranquility. To further magnify prosperity, keep this quadrant well-lit and free of heavy clutter.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: CHINESE ASTROLOGY 🐉 */}
        {activeTabLocal === 'chinese-astrology' && (
          <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl mx-auto">
            <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-purple-500/30 space-y-6 shadow-2xl text-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-white">Chinese Zodiac & Four Pillars Analyzer</h2>
                <p className="text-xs text-purple-300/80 font-medium">
                  Enter your birth year to discover your 12 Animal Sign and elemental balance.
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 max-w-sm mx-auto">
                <input
                  type="number"
                  value={birthYearInput}
                  onChange={(e) => setBirthYearInput(e.target.value)}
                  placeholder="e.g. 1996"
                  className="px-4 py-2.5 rounded-full bg-slate-950 border border-purple-500/40 text-white text-center text-sm font-bold outline-none"
                />
                <button
                  onClick={() => setSelectedSign('dragon')}
                  className="bg-purple-600 text-white font-black px-6 py-2.5 rounded-full text-xs uppercase tracking-wider cursor-pointer border-none"
                >
                  Analyze
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4">
                {Object.keys(CHINESE_ZODIAC_DATA).map((key) => {
                  const z = CHINESE_ZODIAC_DATA[key];
                  const isSel = selectedSign === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedSign(key)}
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                        isSel ? 'bg-purple-900/80 border-purple-400 text-white shadow-lg' : 'bg-slate-950/60 border-slate-800 text-slate-400'
                      }`}
                    >
                      <h4 className="font-extrabold text-sm capitalize">{z.name}</h4>
                      <p className="text-[10px] text-purple-300 mt-0.5">{z.element}</p>
                    </button>
                  );
                })}
              </div>

              {selectedSign && (
                <div className="bg-purple-950/60 rounded-2xl p-6 border border-purple-500/30 text-left space-y-3">
                  <h3 className="font-extrabold text-lg text-white">
                    {CHINESE_ZODIAC_DATA[selectedSign].name} ({CHINESE_ZODIAC_DATA[selectedSign].element})
                  </h3>
                  <p className="text-xs text-slate-300 font-medium">
                    <strong>Core Personality Traits:</strong> {CHINESE_ZODIAC_DATA[selectedSign].traits}
                  </p>
                  <div className="flex flex-wrap gap-4 text-xs font-bold text-purple-200 pt-2 border-t border-purple-800/50">
                    <span>🎨 Lucky Colors: {CHINESE_ZODIAC_DATA[selectedSign].luckyColors}</span>
                    <span>🔢 Lucky Numbers: {CHINESE_ZODIAC_DATA[selectedSign].luckyNumbers}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Bottom Astrologer Consultation Banner */}
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl border border-purple-500/30">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-black text-lg sm:text-xl">Want a personalized Occult Consultation?</h3>
            <p className="text-xs text-purple-200">Connect live with experienced Palmists, Tarot Masters, and Vastu Experts.</p>
          </div>
          <button
            onClick={() => setActiveTab('astrologers')}
            className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-black px-7 py-3.5 rounded-full text-xs uppercase tracking-wider hover:scale-105 transition-transform border-none cursor-pointer shrink-0 shadow-lg"
          >
            Talk to Occult Expert (₹10/min)
          </button>
        </div>

      </div>
    </div>
  );
}
