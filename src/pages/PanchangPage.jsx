import React, { useState, useEffect } from 'react';
import { useAstro } from '../context/AstroContext';
import { Sun, Moon, Clock, Calendar, Sparkles, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

const PANCHANG_TABS = [
  { id: 'todays-panchang', label: "TODAY'S PANCHANG", icon: '📅' },
  { id: 'indian-calendar', label: 'INDIAN CALENDAR', icon: '🗓️' },
  { id: 'hora-calculator', label: 'HORA CALCULATOR', icon: '⏳' },
  { id: 'choghadiya', label: 'CHOGHADIYA', icon: '⏱️' }
];

const TODAY_PANCHANG_DATA = {
  date: 'Tuesday, 18 August 2026',
  location: 'New Delhi, India',
  paksha: 'Krishna Paksha',
  tithi: 'Dwitiya up to 04:12 PM',
  nakshatra: 'Purva Phalguni up to 08:45 PM',
  yoga: 'Siddha up to 11:30 AM',
  karana: 'Taitila up to 04:12 PM',
  sunSign: 'Leo (Simha)',
  moonSign: 'Leo (Simha)',
  sunrise: '06:12 AM',
  sunset: '06:58 PM',
  moonrise: '08:42 PM',
  moonset: '07:15 AM',
  abhijit: '11:54 AM – 12:46 PM',
  brahma: '04:32 AM – 05:20 AM',
  amritKaal: '02:15 PM – 03:50 PM',
  rahuKalam: '03:30 PM – 05:00 PM',
  yamaganda: '09:00 AM – 10:30 AM',
  gulikai: '12:00 PM – 01:30 PM'
};

const HORA_TIMINGS = [
  { time: '06:12 AM - 07:16 AM', planet: 'Mars (Mangal)', nature: 'Auspicious', desc: 'Good for sports, courage, physical tasks.' },
  { time: '07:16 AM - 08:20 AM', planet: 'Sun (Surya)', nature: 'Auspicious', desc: 'Ideal for meeting officials, applying for positions.' },
  { time: '08:20 AM - 09:24 AM', planet: 'Venus (Shukra)', nature: 'Highly Auspicious', desc: 'Best for romance, arts, luxury purchases.' },
  { time: '09:24 AM - 10:28 AM', planet: 'Mercury (Budh)', nature: 'Highly Auspicious', desc: 'Perfect for trading, agreements, studies.' },
  { time: '10:28 AM - 11:32 AM', planet: 'Moon (Chandra)', nature: 'Auspicious', desc: 'Good for travel, home activities, water works.' },
  { time: '11:32 AM - 12:36 PM', planet: 'Saturn (Shani)', nature: 'Inauspicious', desc: 'Avoid starting new ventures. Good for routine labor.' },
  { time: '12:36 PM - 01:40 PM', planet: 'Jupiter (Guru)', nature: 'Most Auspicious', desc: 'Supreme for gold, investments, pujas, education.' }
];

const CHOGHADIYA_MUHURATS = [
  { time: '06:12 AM - 07:48 AM', type: 'Roga', status: 'Inauspicious', color: 'text-red-400 border-red-500/40 bg-red-950/30' },
  { time: '07:48 AM - 09:24 AM', type: 'Udveg', status: 'Inauspicious', color: 'text-orange-400 border-orange-500/40 bg-orange-950/30' },
  { time: '09:24 AM - 11:00 AM', type: 'Amrit', status: 'Most Auspicious', color: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/30' },
  { time: '11:00 AM - 12:36 PM', type: 'Char', status: 'Good (Neutral)', color: 'text-blue-400 border-blue-500/40 bg-blue-950/30' },
  { time: '12:36 PM - 02:12 PM', type: 'Labh', status: 'Highly Auspicious', color: 'text-purple-400 border-purple-500/40 bg-purple-950/30' },
  { time: '02:12 PM - 03:48 PM', type: 'Amrit', status: 'Most Auspicious', color: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/30' },
  { time: '03:48 PM - 05:24 PM', type: 'Kaal', status: 'Inauspicious', color: 'text-rose-400 border-rose-500/40 bg-rose-950/30' },
  { time: '05:24 PM - 06:58 PM', type: 'Shubh', status: 'Auspicious', color: 'text-teal-400 border-teal-500/40 bg-teal-950/30' }
];

export default function PanchangPage() {
  const { panchangSubView, setPanchangSubView, setActiveTab } = useAstro();
  const [activeTabLocal, setActiveTabLocal] = useState(panchangSubView || 'todays-panchang');

  // Sync if context subView updates from navbar dropdown
  useEffect(() => {
    if (panchangSubView) {
      setActiveTabLocal(panchangSubView);
    }
  }, [panchangSubView]);

  const handleTabChange = (tabId) => {
    setActiveTabLocal(tabId);
    if (setPanchangSubView) setPanchangSubView(tabId);
  };

  return (
    <div className="min-h-screen bg-[#0a0d1a] text-white pb-20 relative">
      
      {/* Panchang Header Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-950 border-b border-purple-900/40 py-8 px-4 sm:px-8 text-center space-y-3 relative overflow-hidden">
        <div className="inline-flex items-center gap-2 bg-purple-900/40 border border-purple-500/30 px-4 py-1.5 rounded-full text-xs font-black text-purple-300">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Vedic Panchang & Time Mathematics</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-white to-amber-200 tracking-tight">
          Drik Siddhanta Vedic Panchang 2026
        </h1>
        <p className="text-xs sm:text-sm text-purple-300/80 max-w-2xl mx-auto font-medium">
          Accurate Tithi, Nakshatra, Yoga, Karana, Hora, and Choghadiya Muhurat Timings.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">

        {/* 4 Panchang Tool Pill Bar matching Screenshot */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar py-2 border-b border-slate-800">
          {PANCHANG_TABS.map((tab) => {
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

        {/* TAB 1: TODAY'S PANCHANG 📅 */}
        {activeTabLocal === 'todays-panchang' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-purple-500/30 space-y-6 shadow-2xl">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white">{TODAY_PANCHANG_DATA.date}</h2>
                  <p className="text-xs text-purple-300 font-bold">{TODAY_PANCHANG_DATA.location} • Vikram Samvat 2083</p>
                </div>
                <div className="bg-purple-950/80 text-amber-300 px-4 py-2 rounded-full text-xs font-black border border-purple-500/40">
                  🌕 {TODAY_PANCHANG_DATA.paksha}
                </div>
              </div>

              {/* 5 Elements Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-950/70 p-4 rounded-2xl border border-purple-900/40">
                  <span className="text-[10px] uppercase font-black text-purple-400">Tithi</span>
                  <h4 className="font-extrabold text-sm text-white mt-1">{TODAY_PANCHANG_DATA.tithi}</h4>
                </div>
                <div className="bg-slate-950/70 p-4 rounded-2xl border border-purple-900/40">
                  <span className="text-[10px] uppercase font-black text-purple-400">Nakshatra</span>
                  <h4 className="font-extrabold text-sm text-white mt-1">{TODAY_PANCHANG_DATA.nakshatra}</h4>
                </div>
                <div className="bg-slate-950/70 p-4 rounded-2xl border border-purple-900/40">
                  <span className="text-[10px] uppercase font-black text-purple-400">Yoga</span>
                  <h4 className="font-extrabold text-sm text-white mt-1">{TODAY_PANCHANG_DATA.yoga}</h4>
                </div>
                <div className="bg-slate-950/70 p-4 rounded-2xl border border-purple-900/40">
                  <span className="text-[10px] uppercase font-black text-purple-400">Karana</span>
                  <h4 className="font-extrabold text-sm text-white mt-1">{TODAY_PANCHANG_DATA.karana}</h4>
                </div>
              </div>

              {/* Solar / Lunar Timings */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                <div className="flex items-center gap-3 bg-amber-950/30 border border-amber-500/30 p-3.5 rounded-2xl">
                  <Sun className="w-6 h-6 text-amber-400 shrink-0" />
                  <div>
                    <p className="text-[10px] font-bold text-amber-300">Sunrise</p>
                    <p className="text-xs font-black text-white">{TODAY_PANCHANG_DATA.sunrise}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-orange-950/30 border border-orange-500/30 p-3.5 rounded-2xl">
                  <Sun className="w-6 h-6 text-orange-400 shrink-0" />
                  <div>
                    <p className="text-[10px] font-bold text-orange-300">Sunset</p>
                    <p className="text-xs font-black text-white">{TODAY_PANCHANG_DATA.sunset}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-indigo-950/30 border border-indigo-500/30 p-3.5 rounded-2xl">
                  <Moon className="w-6 h-6 text-indigo-400 shrink-0" />
                  <div>
                    <p className="text-[10px] font-bold text-indigo-300">Moonrise</p>
                    <p className="text-xs font-black text-white">{TODAY_PANCHANG_DATA.moonrise}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-purple-950/30 border border-purple-500/30 p-3.5 rounded-2xl">
                  <Moon className="w-6 h-6 text-purple-400 shrink-0" />
                  <div>
                    <p className="text-[10px] font-bold text-purple-300">Moonset</p>
                    <p className="text-xs font-black text-white">{TODAY_PANCHANG_DATA.moonset}</p>
                  </div>
                </div>
              </div>

              {/* Auspicious & Inauspicious Muhurats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-5 space-y-3">
                  <h4 className="font-extrabold text-sm text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Auspicious Timings (Shubh Muhurat)</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-300 font-medium">
                    <li className="flex justify-between border-b border-emerald-900/40 pb-1">
                      <span>Abhijit Muhurat:</span>
                      <strong className="text-white">{TODAY_PANCHANG_DATA.abhijit}</strong>
                    </li>
                    <li className="flex justify-between border-b border-emerald-900/40 pb-1">
                      <span>Brahma Muhurat:</span>
                      <strong className="text-white">{TODAY_PANCHANG_DATA.brahma}</strong>
                    </li>
                    <li className="flex justify-between">
                      <span>Amrit Kaal:</span>
                      <strong className="text-white">{TODAY_PANCHANG_DATA.amritKaal}</strong>
                    </li>
                  </ul>
                </div>

                <div className="bg-rose-950/40 border border-rose-500/30 rounded-2xl p-5 space-y-3">
                  <h4 className="font-extrabold text-sm text-rose-400 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                    <span>Inauspicious Timings (Ashubh Muhurat)</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-300 font-medium">
                    <li className="flex justify-between border-b border-rose-900/40 pb-1">
                      <span>Rahu Kalam:</span>
                      <strong className="text-rose-300">{TODAY_PANCHANG_DATA.rahuKalam}</strong>
                    </li>
                    <li className="flex justify-between border-b border-rose-900/40 pb-1">
                      <span>Yamaganda:</span>
                      <strong className="text-rose-300">{TODAY_PANCHANG_DATA.yamaganda}</strong>
                    </li>
                    <li className="flex justify-between">
                      <span>Gulikai Kalam:</span>
                      <strong className="text-rose-300">{TODAY_PANCHANG_DATA.gulikai}</strong>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INDIAN CALENDAR 🗓️ */}
        {activeTabLocal === 'indian-calendar' && (
          <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl mx-auto">
            <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-purple-500/30 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h2 className="text-2xl font-black text-white">Hindu Lunar Calendar 2026</h2>
                <span className="text-xs font-black text-amber-300 bg-purple-950 px-3 py-1 rounded-full border border-purple-500/40">
                  Vikram Samvat 2083
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { month: 'Shravan 2026', festival: 'Shravan Somwar Vrat & Nag Panchami', date: 'August 2026' },
                  { month: 'Bhadrapada 2026', festival: 'Ganesh Chaturthi & Janmashtami', date: 'September 2026' },
                  { month: 'Ashwin 2026', festival: 'Sharad Navratri & Vijayadashami', date: 'October 2026' }
                ].map((cal, idx) => (
                  <div key={idx} className="bg-slate-950/70 p-5 rounded-2xl border border-purple-900/40 space-y-2">
                    <span className="text-[10px] font-black text-purple-400 uppercase">{cal.date}</span>
                    <h4 className="font-extrabold text-base text-white">{cal.month}</h4>
                    <p className="text-xs text-slate-300 font-medium">✨ {cal.festival}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: HORA CALCULATOR ⏳ */}
        {activeTabLocal === 'hora-calculator' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <h2 className="text-2xl font-black text-white">Planetary Hour (Hora) Calculator</h2>
              <p className="text-xs text-purple-300/80 font-medium">
                Each hour of the day is ruled by a specific planet. Choose favorable Horas for work, business, or education.
              </p>
            </div>

            <div className="bg-slate-900/90 rounded-3xl p-6 border border-purple-500/30 shadow-2xl space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {HORA_TIMINGS.map((hora, idx) => (
                  <div key={idx} className="bg-slate-950/70 p-4 rounded-2xl border border-purple-900/40 space-y-2">
                    <span className="text-[10px] font-black text-purple-400">{hora.time}</span>
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-sm text-white">{hora.planet}</h4>
                      <span className="text-[10px] font-black text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full">{hora.nature}</span>
                    </div>
                    <p className="text-xs text-slate-300 font-medium">{hora.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CHOGHADIYA ⏱️ */}
        {activeTabLocal === 'choghadiya' && (
          <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl mx-auto">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-black text-white">Today's Day & Night Choghadiya</h2>
              <p className="text-xs text-purple-300/80 font-medium">
                7 Choghadiya Muhurats evaluated for travel, vehicle purchase, business deals, and ceremonies.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CHOGHADIYA_MUHURATS.map((c, idx) => (
                <div key={idx} className={`p-4 rounded-2xl border flex items-center justify-between ${c.color}`}>
                  <div>
                    <h4 className="font-extrabold text-sm">{c.type} Choghadiya</h4>
                    <p className="text-xs opacity-90 font-medium">{c.time}</p>
                  </div>
                  <span className="text-xs font-black px-3 py-1 rounded-full bg-slate-950/80 uppercase tracking-wider">
                    {c.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Consultation CTA */}
        <div className="bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl border border-purple-500/30">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-black text-lg sm:text-xl">Need a personalized Shubh Muhurat for an upcoming event?</h3>
            <p className="text-xs text-purple-200">Consult Panchang specialists for wedding, housewarming, or business inaugurations.</p>
          </div>
          <button
            onClick={() => setActiveTab('muhurat')}
            className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-black px-7 py-3.5 rounded-full text-xs uppercase tracking-wider hover:scale-105 transition-transform border-none cursor-pointer shrink-0 shadow-lg"
          >
            Find Shubh Muhurat
          </button>
        </div>

      </div>
    </div>
  );
}
