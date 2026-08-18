import React, { useState, useRef, useEffect } from 'react';
import { useAstro } from '../context/AstroContext';
import { useNotifications } from '../context/NotificationContext';
import { Search, Bell } from 'lucide-react';

export default function Navbar() {
  const {
    activeTab,
    setActiveTab,
    horoscopeTimeframe,
    setHoroscopeTimeframe,
    occultSubView,
    setOccultSubView,
    healingSubView,
    setHealingSubView,
    panchangSubView,
    setPanchangSubView,
    lalKitabSubView,
    setLalKitabSubView,
    kpSubView,
    setKpSubView,
    compatibilitySubView,
    setCompatibilitySubView,
    calculatorSubView,
    setCalculatorSubView
  } = useAstro();

  const { unreadCount, setShowCenter } = useNotifications();
  const [horoscopeMenuOpen, setHoroscopeMenuOpen] = useState(false);
  const [occultMenuOpen, setOccultMenuOpen] = useState(false);
  const [healingMenuOpen, setHealingMenuOpen] = useState(false);
  const [panchangMenuOpen, setPanchangMenuOpen] = useState(false);
  const [lalKitabMenuOpen, setLalKitabMenuOpen] = useState(false);
  const [kpMenuOpen, setKpMenuOpen] = useState(false);
  const [compatibilityMenuOpen, setCompatibilityMenuOpen] = useState(false);
  const [calculatorMenuOpen, setCalculatorMenuOpen] = useState(false);

  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
  const [occultDropdownPos, setOccultDropdownPos] = useState({ top: 0, left: 0 });
  const [healingDropdownPos, setHealingDropdownPos] = useState({ top: 0, left: 0 });
  const [panchangDropdownPos, setPanchangDropdownPos] = useState({ top: 0, left: 0 });
  const [lalKitabDropdownPos, setLalKitabDropdownPos] = useState({ top: 0, left: 0 });
  const [kpDropdownPos, setKpDropdownPos] = useState({ top: 0, left: 0 });
  const [compatibilityDropdownPos, setCompatibilityDropdownPos] = useState({ top: 0, left: 0 });
  const [calculatorDropdownPos, setCalculatorDropdownPos] = useState({ top: 0, left: 0 });

  const horoscopeBtnRef = useRef(null);
  const occultBtnRef = useRef(null);
  const healingBtnRef = useRef(null);
  const panchangBtnRef = useRef(null);
  const lalKitabBtnRef = useRef(null);
  const kpBtnRef = useRef(null);
  const compatibilityBtnRef = useRef(null);
  const calculatorBtnRef = useRef(null);

  const updateDropdownPos = () => {
    if (horoscopeBtnRef.current) {
      const rect = horoscopeBtnRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + 6,
        left: Math.max(12, rect.left)
      });
    }
  };

  const updateOccultDropdownPos = () => {
    if (occultBtnRef.current) {
      const rect = occultBtnRef.current.getBoundingClientRect();
      setOccultDropdownPos({
        top: rect.bottom + 6,
        left: Math.max(12, rect.left)
      });
    }
  };

  const updateHealingDropdownPos = () => {
    if (healingBtnRef.current) {
      const rect = healingBtnRef.current.getBoundingClientRect();
      setHealingDropdownPos({
        top: rect.bottom + 6,
        left: Math.max(12, rect.left)
      });
    }
  };

  const updatePanchangDropdownPos = () => {
    if (panchangBtnRef.current) {
      const rect = panchangBtnRef.current.getBoundingClientRect();
      setPanchangDropdownPos({
        top: rect.bottom + 6,
        left: Math.max(12, rect.left)
      });
    }
  };

  const updateLalKitabDropdownPos = () => {
    if (lalKitabBtnRef.current) {
      const rect = lalKitabBtnRef.current.getBoundingClientRect();
      setLalKitabDropdownPos({
        top: rect.bottom + 6,
        left: Math.max(12, rect.left)
      });
    }
  };

  const updateKpDropdownPos = () => {
    if (kpBtnRef.current) {
      const rect = kpBtnRef.current.getBoundingClientRect();
      setKpDropdownPos({
        top: rect.bottom + 6,
        left: Math.max(12, rect.left)
      });
    }
  };

  const updateCompatibilityDropdownPos = () => {
    if (compatibilityBtnRef.current) {
      const rect = compatibilityBtnRef.current.getBoundingClientRect();
      setCompatibilityDropdownPos({
        top: rect.bottom + 6,
        left: Math.max(12, rect.left)
      });
    }
  };

  const updateCalculatorDropdownPos = () => {
    if (calculatorBtnRef.current) {
      const rect = calculatorBtnRef.current.getBoundingClientRect();
      setCalculatorDropdownPos({
        top: rect.bottom + 6,
        left: Math.max(12, rect.left)
      });
    }
  };

  const handleOpenHoroscopeMenu = () => {
    updateDropdownPos();
    setHoroscopeMenuOpen(true);
  };

  const handleOpenOccultMenu = () => {
    updateOccultDropdownPos();
    setOccultMenuOpen(true);
  };

  const handleOpenHealingMenu = () => {
    updateHealingDropdownPos();
    setHealingMenuOpen(true);
  };

  const handleOpenPanchangMenu = () => {
    updatePanchangDropdownPos();
    setPanchangMenuOpen(true);
  };

  const handleOpenLalKitabMenu = () => {
    updateLalKitabDropdownPos();
    setLalKitabMenuOpen(true);
  };

  const handleOpenKpMenu = () => {
    updateKpDropdownPos();
    setKpMenuOpen(true);
  };

  const handleOpenCompatibilityMenu = () => {
    updateCompatibilityDropdownPos();
    setCompatibilityMenuOpen(true);
  };

  const handleOpenCalculatorMenu = () => {
    updateCalculatorDropdownPos();
    setCalculatorMenuOpen(true);
  };

  const navPills = [
    { id: 'store', label: 'STORE' },
    { id: 'horoscope', label: 'HOROSCOPE ▼', isHoroscope: true },
    { id: 'daily-ritual', label: '🔥 DAILY', isStreak: true },
    { id: 'astrologers', label: 'ASTROLOGY' },
    { id: 'blog', label: 'BLOG' },
    { id: 'occult', label: 'OCCULT ▼', isOccult: true },
    { id: 'astro-proof', label: '🔮 ASTROPROOF', isProof: true },
    { id: 'patterns', label: '🧬 MY PATTERNS', isPatterns: true },
    { id: 'free-reports', label: 'FREE REPORTS' },
    { id: 'healing', label: 'HEALING ▼', isHealing: true },
    { id: 'astro-guard', label: '🛡️ GUARD' },
    { id: 'panchang', label: 'PANCHANG ▼', isPanchang: true },
    { id: 'muhurat', label: '📅 MUHURAT MARKETPLACE', isMuhurat: true },
    { id: 'lal-kitab', label: 'LAL KITAB ▼', isLalKitab: true },
    { id: 'kp', label: 'KP ▼', isKp: true },
    { id: 'compatibility', label: 'COMPATIBILITY ▼', isCompatibility: true },
    { id: 'calculators', label: 'CALCULATORS ▼', isCalculators: true },
    { id: 'kundli', label: '🔮 Kundli Analysis ▼', isKundli: true },
    { id: 'badges', label: '🏆 BADGES' },
    { id: 'membership', label: '✨ PLUS', isPlus: true },
    { id: 'admin', label: '⚙️ ADMIN', isAdmin: true }
  ];

  const horoscopeDropdownItems = [
    { label: "TODAY'S HOROSCOPE", value: 'today' },
    { label: "YESTERDAY'S HOROSCOPE", value: 'yesterday' },
    { label: "TOMORROW'S HOROSCOPE", value: 'tomorrow' },
    { label: "MONTHLY HOROSCOPE", value: 'monthly' },
    { label: "YEARLY HOROSCOPE", value: 'yearly' }
  ];

  const occultDropdownItems = [
    { label: 'PALMISTRY', value: 'palmistry' },
    { label: 'TAROT READING', value: 'tarot' },
    { label: 'PSYCHIC', value: 'psychic' },
    { label: 'VASTU', value: 'vastu' },
    { label: 'CHINESE ASTROLOGY', value: 'chinese-astrology' }
  ];

  const healingDropdownItems = [
    { label: 'FENG SHUI', value: 'feng-shui' },
    { label: 'REIKI HEALING', value: 'reiki' },
    { label: 'MEDITATION', value: 'meditation' },
    { label: 'YOGA', value: 'yoga' },
    { label: 'CRYSTAL THERAPY', value: 'crystal-therapy' }
  ];

  const panchangDropdownItems = [
    { label: "TODAY'S PANCHANG", value: 'todays-panchang' },
    { label: 'INDIAN CALENDAR', value: 'indian-calendar' },
    { label: 'HORA CALCULATOR', value: 'hora-calculator' },
    { label: 'CHOGHADIYA', value: 'choghadiya' }
  ];

  const lalKitabDropdownItems = [
    { label: 'LAL KITAB HOME', value: 'lal-kitab-home' },
    { label: 'WHAT IS LAL KITAB?', value: 'what-is-lal-kitab' },
    { label: 'HOUSES', value: 'houses' },
    { label: 'PLANETS', value: 'planets' }
  ];

  const kpDropdownItems = [
    { label: 'WHAT IS KP SYSTEM?', value: 'what-is-kp-system' },
    { label: 'KP HORARY (1-249)', value: 'kp-horary' },
    { label: 'CUSPAL SUB LORD', value: 'cuspal-sub-lord' },
    { label: 'PLANETARY SIGNIFICATORS', value: 'planetary-significators' }
  ];

  const compatibilityDropdownItems = [
    { label: 'ZODIAC COMPATIBILITY', value: 'zodiac-compatibility' },
    { label: 'KUNDLI MILAN (36 GUNAS)', value: 'kundli-milan' },
    { label: 'LOVE CALCULATOR (%)', value: 'love-calculator' },
    { label: 'NUMEROLOGY COMPATIBILITY', value: 'numerology-compatibility' }
  ];

  const calculatorDropdownItems = [
    { label: 'LOVE CALCULATOR', value: 'love-calculator-tool' },
    { label: 'FRIENDSHIP CALCULATOR', value: 'friendship-calculator' },
    { label: 'MOON SIGN CALCULATOR', value: 'moon-sign-calculator' },
    { label: 'SUN SIGN CALCULATOR', value: 'sun-sign-calculator' },
    { label: 'ASCENDANT CALCULATOR', value: 'ascendant-calculator' },
    { label: 'SADE SATI CALCULATOR', value: 'sade-sati-calculator' },
    { label: 'GEMSTONE CALCULATOR', value: 'gemstone-calculator' }
  ];

  const handleHoroscopeClick = (timeframe) => {
    if (setHoroscopeTimeframe) setHoroscopeTimeframe(timeframe);
    setActiveTab('horoscope');
    setHoroscopeMenuOpen(false);
  };

  const handleOccultClick = (subView) => {
    if (setOccultSubView) setOccultSubView(subView);
    setActiveTab('occult');
    setOccultMenuOpen(false);
  };

  const handleHealingClick = (subView) => {
    if (setHealingSubView) setHealingSubView(subView);
    setActiveTab('healing');
    setHealingMenuOpen(false);
  };

  const handlePanchangClick = (subView) => {
    if (setPanchangSubView) setPanchangSubView(subView);
    setActiveTab('panchang');
    setPanchangMenuOpen(false);
  };

  const handleLalKitabClick = (subView) => {
    if (setLalKitabSubView) setLalKitabSubView(subView);
    setActiveTab('lal-kitab');
    setLalKitabMenuOpen(false);
  };

  const handleKpClick = (subView) => {
    if (setKpSubView) setKpSubView(subView);
    setActiveTab('kp');
    setKpMenuOpen(false);
  };




  return (
    <header className="sticky top-0 z-40 bg-[#f4f3f9]/95 backdrop-blur-md border-b border-purple-100/60 pb-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 space-y-3">
        {/* Top Header Row matching Image 1 */}
        <div className="flex items-center justify-between">
          {/* Logo matching Image 1 */}
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 group text-left cursor-pointer border-none bg-transparent"
          >
            {/* Celestial Planet Icon */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-900 via-purple-600 to-pink-500 p-0.5 shadow-md group-hover:scale-105 transition-all flex items-center justify-center">
              <div className="w-full h-full bg-[#181824] rounded-full flex items-center justify-center text-white text-xl">
                🪐
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="astrolive-logo-text tracking-tight">
                ASTROLIVE
              </span>
            </div>
          </button>

          {/* Right Section: Search, Notifications & LOGIN */}
          <div className="flex items-center gap-3">
            {/* Search Icon button */}
            <button
              onClick={() => setActiveTab('astrologers')}
              className="p-2 rounded-full bg-white border border-purple-100 text-slate-700 hover:text-purple-700 shadow-sm cursor-pointer"
              title="Search Astrologers & Services"
            >
              <Search className="w-5 h-5 text-slate-700" />
            </button>

            {/* Notifications Bell — opens NotificationCenter */}
            <button
              onClick={() => setShowCenter(true)}
              className="relative p-2 rounded-full bg-white border border-purple-100 text-slate-700 hover:text-purple-700 shadow-sm cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-5 h-5 text-slate-700" />
              {unreadCount > 0 && (
                <>
                  <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-[#ff5e7e] animate-ping" />
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                </>
              )}
            </button>

            {/* Exact Pink LOGIN Pill Button from Image 1 */}
            <button
              onClick={() => setActiveTab('onboarding')}
              className="astrolive-pink-btn"
            >
              LOGIN
            </button>
          </div>
        </div>

        <div className="astrolive-pill-bar">
          {navPills.map((pill) => {
            if (pill.isHoroscope) {
              return (
                <div
                  key={pill.id}
                  className="relative shrink-0"
                  onMouseEnter={handleOpenHoroscopeMenu}
                  onMouseLeave={() => setHoroscopeMenuOpen(false)}
                >
                  <button
                    ref={horoscopeBtnRef}
                    onClick={() => {
                      if (setHoroscopeTimeframe && !horoscopeTimeframe) setHoroscopeTimeframe('daily');
                      setActiveTab('horoscope');
                      handleOpenHoroscopeMenu();
                    }}
                    className={`astrolive-pill-item ${
                      activeTab === 'horoscope' ? 'active' : ''
                    }`}
                  >
                    {pill.label}
                  </button>
                </div>
              );
            }

            if (pill.isOccult) {
              return (
                <div
                  key={pill.id}
                  className="relative shrink-0"
                  onMouseEnter={handleOpenOccultMenu}
                  onMouseLeave={() => setOccultMenuOpen(false)}
                >
                  <button
                    ref={occultBtnRef}
                    onClick={() => {
                      if (setOccultSubView && !occultSubView) setOccultSubView('numerology');
                      setActiveTab('occult');
                      handleOpenOccultMenu();
                    }}
                    className={`astrolive-pill-item ${
                      activeTab === 'occult' ? 'active' : ''
                    }`}
                  >
                    {pill.label}
                  </button>
                </div>
              );
            }

            if (pill.isHealing) {
              return (
                <div
                  key={pill.id}
                  className="relative shrink-0"
                  onMouseEnter={handleOpenHealingMenu}
                  onMouseLeave={() => setHealingMenuOpen(false)}
                >
                  <button
                    ref={healingBtnRef}
                    onClick={() => {
                      if (setHealingSubView && !healingSubView) setHealingSubView('reiki');
                      setActiveTab('healing');
                      handleOpenHealingMenu();
                    }}
                    className={`astrolive-pill-item ${
                      activeTab === 'healing' ? 'active' : ''
                    }`}
                  >
                    {pill.label}
                  </button>
                </div>
              );
            }

            if (pill.isPanchang) {
              return (
                <div
                  key={pill.id}
                  className="relative shrink-0"
                  onMouseEnter={handleOpenPanchangMenu}
                  onMouseLeave={() => setPanchangMenuOpen(false)}
                >
                  <button
                    ref={panchangBtnRef}
                    onClick={() => {
                      if (setPanchangSubView && !panchangSubView) setPanchangSubView('todays-panchang');
                      setActiveTab('panchang');
                      handleOpenPanchangMenu();
                    }}
                    className={`astrolive-pill-item ${
                      activeTab === 'panchang' ? 'active' : ''
                    }`}
                  >
                    {pill.label}
                  </button>
                </div>
              );
            }

            if (pill.isLalKitab) {
              return (
                <div
                  key={pill.id}
                  className="relative shrink-0"
                  onMouseEnter={handleOpenLalKitabMenu}
                  onMouseLeave={() => setLalKitabMenuOpen(false)}
                >
                  <button
                    ref={lalKitabBtnRef}
                    onClick={() => handleLalKitabClick('lal-kitab-home')}
                    className={`astrolive-pill-item ${
                      activeTab === 'lal-kitab' ? 'active' : ''
                    }`}
                  >
                    {pill.label}
                  </button>
                </div>
              );
            }

            if (pill.isKp) {
              return (
                <div
                  key={pill.id}
                  className="relative shrink-0"
                  onMouseEnter={handleOpenKpMenu}
                  onMouseLeave={() => setKpMenuOpen(false)}
                >
                  <button
                    ref={kpBtnRef}
                    onClick={() => {
                      if (setKpSubView && !kpSubView) setKpSubView('what-is-kp-system');
                      setActiveTab('kp');
                      handleOpenKpMenu();
                    }}
                    className={`astrolive-pill-item ${
                      activeTab === 'kp' ? 'active' : ''
                    }`}
                  >
                    {pill.label}
                  </button>
                </div>
              );
            }

            if (pill.isCompatibility) {
              return (
                <div
                  key={pill.id}
                  className="relative shrink-0"
                  onMouseEnter={handleOpenCompatibilityMenu}
                  onMouseLeave={() => setCompatibilityMenuOpen(false)}
                >
                  <button
                    ref={compatibilityBtnRef}
                    onClick={() => {
                      if (setCompatibilitySubView && !compatibilitySubView) setCompatibilitySubView('zodiac-compatibility');
                      setActiveTab('compatibility');
                      handleOpenCompatibilityMenu();
                    }}
                    className={`astrolive-pill-item ${
                      activeTab === 'compatibility' ? 'active' : ''
                    }`}
                  >
                    {pill.label}
                  </button>
                </div>
              );
            }

            if (pill.isCalculators) {
              return (
                <div
                  key={pill.id}
                  className="relative shrink-0"
                  onMouseEnter={handleOpenCalculatorMenu}
                  onMouseLeave={() => setCalculatorMenuOpen(false)}
                >
                  <button
                    ref={calculatorBtnRef}
                    onClick={() => {
                      if (setCalculatorSubView && !calculatorSubView) setCalculatorSubView('love-calculator-tool');
                      setActiveTab('calculators');
                      handleOpenCalculatorMenu();
                    }}
                    className={`astrolive-pill-item ${
                      activeTab === 'calculators' ? 'active' : ''
                    }`}
                  >
                    {pill.label}
                  </button>
                </div>
              );
            }

            return (
              <button
                key={pill.id}
                onClick={() => setActiveTab(pill.id)}
                className={`astrolive-pill-item ${
                  activeTab === pill.id ? 'active' : ''
                } ${pill.isPlus ? 'astrolive-pill-item--plus' : ''} ${
                  pill.isProof ? 'astrolive-pill-item--proof' : ''
                } ${pill.isPatterns ? 'astrolive-pill-item--patterns' : ''} ${
                  pill.isStreak ? 'astrolive-pill-item--streak' : ''
                } ${pill.isAdmin ? 'astrolive-pill-item--admin' : ''}`}
              >
                {pill.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Floating Fixed Horoscope Dropdown Menu */}
      {horoscopeMenuOpen && (
        <div
          style={{ top: `${dropdownPos.top}px`, left: `${dropdownPos.left}px` }}
          className="fixed w-64 bg-white rounded-2xl shadow-2xl border border-purple-100 py-3 z-[9999] animate-in fade-in slide-in-from-top-2 duration-150"
          onMouseEnter={() => setHoroscopeMenuOpen(true)}
          onMouseLeave={() => setHoroscopeMenuOpen(false)}
        >
          {horoscopeDropdownItems.map((item) => (
            <button
              key={item.value}
              onClick={() => handleHoroscopeClick(item.value)}
              className="w-full text-left px-6 py-3 text-[11px] font-extrabold text-slate-800 tracking-wider hover:bg-purple-50 hover:text-purple-700 transition-colors border-none bg-transparent cursor-pointer uppercase flex items-center justify-between"
            >
              <span>{item.label}</span>
              {horoscopeTimeframe === item.value && activeTab === 'horoscope' && (
                <span className="w-2 h-2 rounded-full bg-purple-600" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Floating Fixed Occult Dropdown Menu matching User Screenshot */}
      {occultMenuOpen && (
        <div
          style={{ top: `${occultDropdownPos.top}px`, left: `${occultDropdownPos.left}px` }}
          className="fixed w-64 bg-white rounded-2xl shadow-2xl border border-purple-100 py-3 z-[9999] animate-in fade-in slide-in-from-top-2 duration-150"
          onMouseEnter={() => setOccultMenuOpen(true)}
          onMouseLeave={() => setOccultMenuOpen(false)}
        >
          {occultDropdownItems.map((item) => (
            <button
              key={item.value}
              onClick={() => handleOccultClick(item.value)}
              className="w-full text-left px-6 py-3 text-[11px] font-extrabold text-slate-800 tracking-wider hover:bg-purple-50 hover:text-purple-700 transition-colors border-none bg-transparent cursor-pointer uppercase flex items-center justify-between"
            >
              <span>{item.label}</span>
              {occultSubView === item.value && activeTab === 'occult' && (
                <span className="w-2 h-2 rounded-full bg-purple-600" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Floating Fixed Healing Dropdown Menu matching User Screenshot */}
      {healingMenuOpen && (
        <div
          style={{ top: `${healingDropdownPos.top}px`, left: `${healingDropdownPos.left}px` }}
          className="fixed w-64 bg-white rounded-2xl shadow-2xl border border-purple-100 py-3 z-[9999] animate-in fade-in slide-in-from-top-2 duration-150"
          onMouseEnter={() => setHealingMenuOpen(true)}
          onMouseLeave={() => setHealingMenuOpen(false)}
        >
          {healingDropdownItems.map((item) => (
            <button
              key={item.value}
              onClick={() => handleHealingClick(item.value)}
              className="w-full text-left px-6 py-3 text-[11px] font-extrabold text-slate-800 tracking-wider hover:bg-purple-50 hover:text-purple-700 transition-colors border-none bg-transparent cursor-pointer uppercase flex items-center justify-between"
            >
              <span>{item.label}</span>
              {healingSubView === item.value && activeTab === 'healing' && (
                <span className="w-2 h-2 rounded-full bg-purple-600" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Floating Fixed Panchang Dropdown Menu matching User Screenshot */}
      {panchangMenuOpen && (
        <div
          style={{ top: `${panchangDropdownPos.top}px`, left: `${panchangDropdownPos.left}px` }}
          className="fixed w-64 bg-white rounded-2xl shadow-2xl border border-purple-100 py-3 z-[9999] animate-in fade-in slide-in-from-top-2 duration-150"
          onMouseEnter={() => setPanchangMenuOpen(true)}
          onMouseLeave={() => setPanchangMenuOpen(false)}
        >
          {panchangDropdownItems.map((item) => (
            <button
              key={item.value}
              onClick={() => handlePanchangClick(item.value)}
              className="w-full text-left px-6 py-3 text-[11px] font-extrabold text-slate-800 tracking-wider hover:bg-purple-50 hover:text-purple-700 transition-colors border-none bg-transparent cursor-pointer uppercase flex items-center justify-between"
            >
              <span>{item.label}</span>
              {panchangSubView === item.value && activeTab === 'panchang' && (
                <span className="w-2 h-2 rounded-full bg-purple-600" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Floating Fixed Lal Kitab Dropdown Menu matching User Screenshot */}
      {lalKitabMenuOpen && (
        <div
          style={{ top: `${lalKitabDropdownPos.top}px`, left: `${lalKitabDropdownPos.left}px` }}
          className="fixed w-64 bg-white rounded-2xl shadow-2xl border border-purple-100 py-3 z-[9999] animate-in fade-in slide-in-from-top-2 duration-150"
          onMouseEnter={() => setLalKitabMenuOpen(true)}
          onMouseLeave={() => setLalKitabMenuOpen(false)}
        >
          {lalKitabDropdownItems.map((item) => (
            <button
              key={item.value}
              onClick={() => handleLalKitabClick(item.value)}
              className="w-full text-left px-6 py-3 text-[11px] font-extrabold text-slate-800 tracking-wider hover:bg-purple-50 hover:text-purple-700 transition-colors border-none bg-transparent cursor-pointer uppercase flex items-center justify-between"
            >
              <span>{item.label}</span>
              {lalKitabSubView === item.value && activeTab === 'lal-kitab' && (
                <span className="w-2 h-2 rounded-full bg-purple-600" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Floating Fixed KP Dropdown Menu matching User Screenshot */}
      {kpMenuOpen && (
        <div
          style={{ top: `${kpDropdownPos.top}px`, left: `${kpDropdownPos.left}px` }}
          className="fixed w-64 bg-white rounded-2xl shadow-2xl border border-purple-100 py-3 z-[9999] animate-in fade-in slide-in-from-top-2 duration-150"
          onMouseEnter={() => setKpMenuOpen(true)}
          onMouseLeave={() => setKpMenuOpen(false)}
        >
          {kpDropdownItems.map((item) => (
            <button
              key={item.value}
              onClick={() => handleKpClick(item.value)}
              className="w-full text-left px-6 py-3 text-[11px] font-extrabold text-slate-800 tracking-wider hover:bg-purple-50 hover:text-purple-700 transition-colors border-none bg-transparent cursor-pointer uppercase flex items-center justify-between"
            >
              <span>{item.label}</span>
              {kpSubView === item.value && activeTab === 'kp' && (
                <span className="w-2 h-2 rounded-full bg-purple-600" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Floating Fixed Compatibility Dropdown Menu matching User Screenshot */}
      {compatibilityMenuOpen && (
        <div
          style={{ top: `${compatibilityDropdownPos.top}px`, left: `${compatibilityDropdownPos.left}px` }}
          className="fixed w-64 bg-white rounded-2xl shadow-2xl border border-purple-100 py-3 z-[9999] animate-in fade-in slide-in-from-top-2 duration-150"
          onMouseEnter={() => setCompatibilityMenuOpen(true)}
          onMouseLeave={() => setCompatibilityMenuOpen(false)}
        >
          {compatibilityDropdownItems.map((item) => (
            <button
              key={item.value}
              onClick={() => handleCompatibilityClick(item.value)}
              className="w-full text-left px-6 py-3 text-[11px] font-extrabold text-slate-800 tracking-wider hover:bg-purple-50 hover:text-purple-700 transition-colors border-none bg-transparent cursor-pointer uppercase flex items-center justify-between"
            >
              <span>{item.label}</span>
              {compatibilitySubView === item.value && activeTab === 'compatibility' && (
                <span className="w-2 h-2 rounded-full bg-purple-600" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Floating Fixed Calculators Dropdown Menu matching User Screenshot */}
      {calculatorMenuOpen && (
        <div
          style={{ top: `${calculatorDropdownPos.top}px`, left: `${calculatorDropdownPos.left}px` }}
          className="fixed w-64 bg-white rounded-2xl shadow-2xl border border-purple-100 py-3 z-[9999] animate-in fade-in slide-in-from-top-2 duration-150"
          onMouseEnter={() => setCalculatorMenuOpen(true)}
          onMouseLeave={() => setCalculatorMenuOpen(false)}
        >
          {calculatorDropdownItems.map((item) => (
            <button
              key={item.value}
              onClick={() => handleCalculatorClick(item.value)}
              className="w-full text-left px-6 py-3 text-[11px] font-extrabold text-slate-800 tracking-wider hover:bg-purple-50 hover:text-purple-700 transition-colors border-none bg-transparent cursor-pointer uppercase flex items-center justify-between"
            >
              <span>{item.label}</span>
              {calculatorSubView === item.value && activeTab === 'calculators' && (
                <span className="w-2 h-2 rounded-full bg-purple-600" />
              )}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
