import React, { useState, useEffect } from 'react';
import { useAstro } from '../context/AstroContext';
import { ArrowLeft, Sparkles, Heart, Briefcase, Activity, Smile, Compass, Clover } from 'lucide-react';

const ZODIAC_SIGNS = [
  { id: 'leo', name: 'Leo', dates: 'Jul 23 - Aug 22', icon: '♌', color: 'from-amber-400 to-orange-500' },
  { id: 'taurus', name: 'Taurus', dates: 'Apr 20 - May 20', icon: '♉', color: 'from-emerald-400 to-green-600' },
  { id: 'aquarius', name: 'Aquarius', dates: 'Jan 20 - Feb 18', icon: '♒', color: 'from-cyan-400 to-blue-600' },
  { id: 'aries', name: 'Aries', dates: 'Mar 21 - Apr 19', icon: '♈', color: 'from-red-400 to-rose-600' },
  { id: 'cancer', name: 'Cancer', dates: 'Jun 21 - Jul 22', icon: '♋', color: 'from-slate-300 to-slate-500' },
  { id: 'libra', name: 'Libra', dates: 'Sep 23 - Oct 22', icon: '♎', color: 'from-pink-400 to-purple-500' },
  { id: 'scorpio', name: 'Scorpio', dates: 'Oct 23 - Nov 21', icon: '♏', color: 'from-purple-600 to-indigo-900' },
  { id: 'sagittarius', name: 'Sagittarius', dates: 'Nov 22 - Dec 21', icon: '♐', color: 'from-purple-400 to-violet-600' },
  { id: 'capricorn', name: 'Capricorn', dates: 'Dec 22 - Jan 19', icon: '♑', color: 'from-amber-700 to-yellow-900' },
  { id: 'pisces', name: 'Pisces', dates: 'Feb 19 - Mar 20', icon: '♓', color: 'from-teal-300 to-blue-500' },
  { id: 'gemini', name: 'Gemini', dates: 'May 21 - Jun 20', icon: '♊', color: 'from-yellow-300 to-amber-500' },
  { id: 'virgo', name: 'Virgo', dates: 'Aug 23 - Sep 22', icon: '♍', color: 'from-lime-400 to-emerald-600' }
];

const HOROSCOPE_DETAILS = {
  leo: {
    yesterday: {
      dateText: 'Mon Aug 17 2026',
      personal: 'The evening brings an emotional shift that starts close to home. When the Moon enters Scorpio and trines the North Node in Pisces, your fourth house and eighth house encourage a more honest exchange with family or someone you trust deeply. Leo, let a private feeling have room to speak. You may finally understand why a familiar concern has been lingering, which makes a heartfelt response easier to offer tonight.',
      career: 'That private clarity can sharpen your professional instincts without making you overly exposed. You may see the real motive behind a workplace decision or recognise which alliance deserves more attention. Keep sensitive observations to yourself until you know what action is useful. A calm, strategic approach helps you handle shared responsibilities well and leaves others confident that you can be trusted with important information today as the day unfolds further.',
      health: 'Because the day asks for emotional honesty, give your nervous system a softer landing. Choose quieter surroundings after work, reduce background noise, and avoid filling every spare moment with conversation. A warm shower, familiar music, or early bedtime can help you release tension that has gathered beneath the surface. Your body responds well when you permit yourself to slow down without needing a reason for the rest of the evening.',
      emotion: 'As the pace softens, you may feel drawn toward a memory or a question about belonging. Let it inform you without taking over. There is value in acknowledging what has changed. A close bond can deepen when you share one truth with care and leave space for a response today.',
      travel: 'Keep travel plans simple. A visit to someone familiar or a trip connected to home may feel more rewarding than a crowded outing. Give yourself extra time if emotions are running high. The right destination is one where you can settle, listen, and leave feeling lighter than when you arrived.',
      luck: 'Luck appears through a connection and willingness to trust your reading. A private conversation may reveal useful support, or an old contact could offer timely insight. Stay receptive without pushing for guarantees. The most helpful opening today comes from recognising where mutual trust already exists and treating it with care.',
      monthlyNarrative: 'Leo, last month pushed you to admit where familiarity had started replacing real satisfaction, especially in love, work, and the choices you kept postponing. August picks up from there. The Moon draws your attention inward first, and you may feel less interested in performing confidence for other people. Something private needs your attention. Give it space before you rush toward the next decision. The answer won\'t arrive while you\'re busy distracting yourself.',
      yearlyNarrative: '2026 is a defining year of inner alignment and leadership evolution for Leo. Jupiter\'s transits encourage you to solidify long-term assets and family legacy, while Saturn reminds you to establish clean boundaries in joint ventures. Your creative potential blooms as you shed superficial validation and step into authentic personal authority.'
    },
    today: {
      dateText: 'Tue Aug 18 2026',
      personal: 'Sun in your sign highlights your natural radiance today! Venus forms a harmonious aspect with Mars, creating warm social interactions and spontaneous romantic gestures. Express your genuine appreciation to family and friends.',
      career: 'High energy and creative focus propel your projects forward. Your leadership is recognized by seniors, making this an ideal day to present new proposals or advocate for project resources.',
      health: 'Vibrant physical energy encourages active movement. Outdoor exercise, sports, or a high-energy workout will clear your mind and boost your vitality.',
      emotion: 'Confidence and optimism reign supreme today. You feel aligned with your true purpose and comfortable taking center stage in key personal discussions.',
      travel: 'Favorable planetary aspects favor short business or leisure trips. Spontaneous travel brings unexpected joy and networking opportunities.',
      luck: 'Golden opportunities surround financial initiatives and creative pitches. Trust your instincts when presented with unexpected offers.',
      monthlyNarrative: 'August offers Leo maximum visibility and personal magnetism. As celestial energies align in your solar first house, major personal projects reach breakthroughs. Embrace collaborative efforts while maintaining your artistic independence.',
      yearlyNarrative: '2026 brings grand expansions in career and personal identity. By mid-year, major achievements in leadership and financial growth validate your dedication.'
    },
    tomorrow: {
      dateText: 'Wed Aug 19 2026',
      personal: 'A reflective mood descends tomorrow. Take time to organize home spaces and touch base with long-distance loved ones.',
      career: 'Consolidate ongoing tasks and review contract details carefully. Precision and thorough organization yield long-term efficiency.',
      health: 'Focus on hydration and balanced nutrition. Gentle stretching or yoga will keep energy steady throughout the day.',
      emotion: 'Calm and steady. Emotional clarity helps resolve minor misunderstandings with grace.',
      travel: 'Routine travel goes smoothly. Prepare routes in advance for seamless commuting.',
      luck: 'Consistent effort yields solid results. Steady progress brings peace of mind and financial stability.',
      monthlyNarrative: 'August demands balance between grand ambitions and quiet preparation. Stay grounded as new doors open.',
      yearlyNarrative: '2026 rewards steady commitment. Strategic moves made now build lasting authority and peace.'
    }
  }
};

// Generic fallback generator for all other signs so every single sign is 100% complete
function getHoroscopeForSign(signId, timeframe) {
  if (HOROSCOPE_DETAILS[signId] && HOROSCOPE_DETAILS[signId][timeframe]) {
    return HOROSCOPE_DETAILS[signId][timeframe];
  }

  const signObj = ZODIAC_SIGNS.find(s => s.id === signId) || ZODIAC_SIGNS[0];
  const capitalizedSign = signObj.name;

  let dateText = 'Tue Aug 18 2026';
  if (timeframe === 'yesterday') dateText = 'Mon Aug 17 2026';
  if (timeframe === 'tomorrow') dateText = 'Wed Aug 19 2026';
  if (timeframe === 'monthly') dateText = 'August 2026';
  if (timeframe === 'yearly') dateText = 'Year 2026';

  return {
    dateText,
    personal: `${capitalizedSign}, planetary alignments highlight your close bonds and personal ambitions today. Open communication creates deeper trust with those who matter most in your life.`,
    career: `Focus and strategic planning yield positive momentum in your professional life. Your unique insights help resolve complex team challenges with ease.`,
    health: `Prioritize rest and mindful hydration. Small healthy habits established today build long-lasting physical resilience and calm.`,
    emotion: `You experience grounded clarity and inner peace. Emotional balance allows you to respond thoughtfully to unexpected developments.`,
    travel: `Whether commuting locally or planning future journeys, smooth travel aspects encourage pleasant encounters along the way.`,
    luck: `Favorable cosmic energy supports creative decisions and prudent financial choices. Trust your inner compass today.`,
    monthlyNarrative: `${capitalizedSign}, this month marks a powerful phase of growth and restructuring. Planetary movements inspire fresh perspectives in relationships, career goals, and personal wellbeing. Embrace new opportunities with confidence.`,
    yearlyNarrative: `2026 is a transformational milestone year for ${capitalizedSign}. Major celestial shifts open doors for professional expansion, financial security, and meaningful personal fulfillment.`
  };
}

export default function HoroscopePage() {
  const { horoscopeTimeframe, setHoroscopeTimeframe, setActiveTab } = useAstro();

  // Local state for sign selection, timeframe toggle, and long-term outlook view
  const [selectedSignId, setSelectedSignId] = useState('leo');
  const [activePeriod, setActivePeriod] = useState(
    ['yesterday', 'today', 'tomorrow'].includes(horoscopeTimeframe) ? horoscopeTimeframe : 'today'
  ); // 'yesterday' | 'today' | 'tomorrow'
  const [longTermTab, setLongTermTab] = useState(
    horoscopeTimeframe === 'yearly' ? 'yearly' : 'monthly'
  ); // 'monthly' | 'yearly'

  // Dynamic reaction whenever horoscopeTimeframe context state updates from dropdown clicks
  useEffect(() => {
    if (horoscopeTimeframe) {
      if (['yesterday', 'today', 'tomorrow'].includes(horoscopeTimeframe)) {
        setActivePeriod(horoscopeTimeframe);
      } else if (horoscopeTimeframe === 'monthly' || horoscopeTimeframe === 'yearly') {
        setLongTermTab(horoscopeTimeframe);
        setTimeout(() => {
          const el = document.getElementById('long-term-horoscope-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [horoscopeTimeframe]);

  const currentSign = ZODIAC_SIGNS.find(s => s.id === selectedSignId) || ZODIAC_SIGNS[0];
  const horoscopeData = getHoroscopeForSign(selectedSignId, activePeriod);
  
  const bannerTitle = (horoscopeTimeframe || activePeriod).toUpperCase();

  // Sync if context timeframe changed
  const handlePeriodChange = (period) => {
    setActivePeriod(period);
    if (setHoroscopeTimeframe) setHoroscopeTimeframe(period);
  };

  return (
    <div className="min-h-screen bg-[#f3f0fa] pb-16">
      {/* Top Banner Matching Image 2 Header */}
      <div className="bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-700 text-white py-4 px-4 sm:px-8 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('home')}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all border-none cursor-pointer text-white"
            title="Back to Home"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="font-extrabold text-sm sm:text-base tracking-wider uppercase">
            HOROSCOPE / {bannerTitle}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold bg-white/10 px-3 py-1 rounded-full border border-white/20">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>AstroLive Insights</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 space-y-8">

        {/* 12 Zodiac Sign Circular Icon Selector Matching Image 2 */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-purple-100/80">
          <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-2 px-1 justify-start sm:justify-center">
            {ZODIAC_SIGNS.map((sign) => {
              const isSelected = sign.id === selectedSignId;
              return (
                <button
                  key={sign.id}
                  onClick={() => setSelectedSignId(sign.id)}
                  className="flex flex-col items-center gap-1.5 shrink-0 group cursor-pointer border-none bg-transparent"
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all shadow-sm ${
                      isSelected
                        ? 'bg-gradient-to-tr from-amber-400 via-purple-600 to-indigo-700 text-white scale-110 shadow-purple-300 ring-4 ring-purple-300'
                        : 'bg-slate-100 text-slate-700 hover:bg-purple-100 hover:scale-105'
                    }`}
                  >
                    <span>{sign.icon}</span>
                  </div>
                  <span
                    className={`text-[11px] font-extrabold tracking-tight transition-colors ${
                      isSelected ? 'text-purple-900 font-black' : 'text-slate-600 group-hover:text-purple-700'
                    }`}
                  >
                    {sign.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Timeframe Toggle Pills (Yesterday | Today | Tomorrow) Matching Image 2 */}
        <div className="flex items-center justify-center">
          <div className="inline-flex bg-white/90 p-1.5 rounded-full border border-purple-200 shadow-sm gap-1">
            {['yesterday', 'today', 'tomorrow'].map((period) => {
              const isActive = activePeriod === period;
              return (
                <button
                  key={period}
                  onClick={() => handlePeriodChange(period)}
                  className={`px-6 py-2 rounded-full text-xs font-black capitalize transition-all cursor-pointer border-none ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                      : 'text-purple-700 hover:bg-purple-50 bg-transparent'
                  }`}
                >
                  {period}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Sign Title & Badge Matching Image 2 */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 via-purple-600 to-indigo-700 text-white text-3xl shadow-lg ring-4 ring-purple-200">
            {currentSign.icon}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {currentSign.name} Daily Horoscope
          </h1>
          <p className="text-xs sm:text-sm font-bold text-slate-500">
            {horoscopeData.dateText}
          </p>
        </div>

        {/* 6 Category Insight Cards Grid (3 cols x 2 rows) Matching Image 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Personal (Pink Theme) */}
          <div className="bg-[#fdf2f4] border border-pink-200/80 rounded-2xl p-5 space-y-3 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 text-pink-700">
              <div className="w-7 h-7 rounded-full bg-pink-200 flex items-center justify-center text-pink-600">
                <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
              </div>
              <h3 className="font-extrabold text-sm uppercase tracking-wide">Personal</h3>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {horoscopeData.personal}
            </p>
          </div>

          {/* Card 2: Career (Purple Theme) */}
          <div className="bg-[#f5f3ff] border border-purple-200/80 rounded-2xl p-5 space-y-3 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 text-purple-700">
              <div className="w-7 h-7 rounded-full bg-purple-200 flex items-center justify-center text-purple-700">
                <Briefcase className="w-4 h-4 text-purple-700" />
              </div>
              <h3 className="font-extrabold text-sm uppercase tracking-wide">Career</h3>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {horoscopeData.career}
            </p>
          </div>

          {/* Card 3: Health (Cyan Theme) */}
          <div className="bg-[#ecfeff] border border-cyan-200/80 rounded-2xl p-5 space-y-3 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 text-cyan-800">
              <div className="w-7 h-7 rounded-full bg-cyan-200 flex items-center justify-center text-cyan-700">
                <Activity className="w-4 h-4 text-cyan-700" />
              </div>
              <h3 className="font-extrabold text-sm uppercase tracking-wide">Health</h3>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {horoscopeData.health}
            </p>
          </div>

          {/* Card 4: Emotion (Orange Theme) */}
          <div className="bg-[#fff7ed] border border-orange-200/80 rounded-2xl p-5 space-y-3 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 text-orange-700">
              <div className="w-7 h-7 rounded-full bg-orange-200 flex items-center justify-center text-orange-600">
                <Smile className="w-4 h-4 text-orange-600" />
              </div>
              <h3 className="font-extrabold text-sm uppercase tracking-wide">Emotion</h3>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {horoscopeData.emotion}
            </p>
          </div>

          {/* Card 5: Travel (Teal/Green Theme) */}
          <div className="bg-[#f0fdf4] border border-emerald-200/80 rounded-2xl p-5 space-y-3 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 text-emerald-800">
              <div className="w-7 h-7 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-700">
                <Compass className="w-4 h-4 text-emerald-700" />
              </div>
              <h3 className="font-extrabold text-sm uppercase tracking-wide">Travel</h3>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {horoscopeData.travel}
            </p>
          </div>

          {/* Card 6: Luck (Mint Theme) */}
          <div className="bg-[#f0fdfa] border border-teal-200/80 rounded-2xl p-5 space-y-3 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 text-teal-800">
              <div className="w-7 h-7 rounded-full bg-teal-200 flex items-center justify-center text-teal-700">
                <Clover className="w-4 h-4 text-teal-700" />
              </div>
              <h3 className="font-extrabold text-sm uppercase tracking-wide">Luck</h3>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {horoscopeData.luck}
            </p>
          </div>
        </div>

        {/* Long-Term Horizon (Monthly / Yearly) Section Matching Image 2 */}
        <div id="long-term-horoscope-section" className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-purple-100 space-y-6">
          {/* Toggle Buttons: Monthly Horoscope | Yearly Horoscope */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setLongTermTab('monthly')}
              className={`px-6 py-2.5 rounded-full text-xs font-black transition-all cursor-pointer border-none ${
                longTermTab === 'monthly'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
              }`}
            >
              Monthly Horoscope
            </button>

            <button
              onClick={() => setLongTermTab('yearly')}
              className={`px-6 py-2.5 rounded-full text-xs font-black transition-all cursor-pointer border-none ${
                longTermTab === 'yearly'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
              }`}
            >
              Yearly Horoscope
            </button>
          </div>

          {/* Detailed Narrative Reading */}
          <div className="bg-[#fbfafd] rounded-2xl p-5 sm:p-6 border border-purple-100 space-y-4">
            <div className="flex items-center gap-2 font-black text-sm text-purple-900">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>{currentSign.name} {longTermTab === 'monthly' ? 'August 2026' : 'Full 2026'} Detailed Analysis</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              • {longTermTab === 'monthly' ? horoscopeData.monthlyNarrative : horoscopeData.yearlyNarrative}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
