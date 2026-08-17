import React, { useState } from 'react';
import { useAstro } from '../context/AstroContext';
import { useGamification } from '../context/GamificationContext';
import {
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  PhoneCall,
  MessageSquare,
  Star,
  Globe,
  Briefcase,
  Languages,
  CreditCard,
  Flame,
  Award,
  ShieldCheck,
  Calendar,
  Coins
} from 'lucide-react';

export default function Home() {
  const { setActiveTab, startConsultation, userProfile, consultationCredits, predictions, guardEvents } = useAstro();
  const { currentStreak, karmaBalance, earnedBadges, hasCheckedInToday } = useGamification();
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // Exact Chat Astrologers Data from Image 2
  const chatAstrologers = [
    {
      id: 'chat-1',
      name: 'Sanyogita',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
      badges: ['TAROT'],
      languages: 'Hindi • Rajasthani • English',
      exp: 'Exp: 3 Yrs',
      rating: 4.8,
      price: '₹20 / min',
      isOnline: true
    },
    {
      id: 'chat-2',
      name: 'Anikya',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      badges: ['TAROT', 'NUMEROLOGY'],
      languages: 'Hindi • Bhojpuri',
      exp: 'Exp: 9 Yrs',
      rating: 5,
      price: '₹16 / min',
      isOnline: true
    },
    {
      id: 'chat-3',
      name: 'Mystery',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80',
      badges: ['TAROT'],
      languages: 'English • Hindi • Bengali',
      exp: 'Exp: 5 Yrs',
      rating: 5,
      price: '₹12 / min',
      isOnline: true
    },
    {
      id: 'chat-4',
      name: 'Madhavi',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80',
      badges: ['TAROT'],
      languages: 'English • Hindi • Odia • Punjabi',
      exp: 'Exp: 4 Yrs',
      rating: 4.5,
      price: '₹18 / min',
      isOnline: true
    },
    {
      id: 'chat-5',
      name: 'Jai',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
      badges: ['VEDIC', 'NADI'],
      languages: 'Hindi • Bengali',
      exp: 'Exp: 14 Yrs',
      rating: 5,
      price: '₹14 / min',
      isOnline: true
    },
    {
      id: 'chat-6',
      name: 'Divya',
      avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=300&auto=format&fit=crop&q=80',
      badges: ['TAROT', 'FACE READING'],
      languages: 'Hindi',
      exp: 'Exp: 5 Yrs',
      rating: 4.5,
      price: '₹12 / min',
      isOnline: true
    }
  ];

  // Exact Our Astrologers Data from Images 2 & 3
  const ourAstrologers = [
    {
      id: 'our-1',
      name: 'Rudrika',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
      tags: ['Tarot'],
      price: '₹24.00/min',
      languages: 'Hindi • English',
      experience: '9 Years Experience',
      rating: '4.5',
      isOnline: true
    },
    {
      id: 'our-2',
      name: 'Jai',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
      tags: ['Vedic', 'Nadi'],
      price: '₹14.00/min',
      languages: 'Hindi • Bengali',
      experience: '5 Years Experience',
      rating: '5',
      isOnline: true
    },
    {
      id: 'our-3',
      name: 'Vedika',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80',
      tags: ['Tarot', 'Numerology'],
      price: '₹16.00/min',
      languages: 'Hindi',
      experience: '6 Years Experience',
      rating: '4',
      isOnline: true
    },
    {
      id: 'our-4',
      name: 'Divya',
      avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=300&auto=format&fit=crop&q=80',
      tags: ['Tarot', 'Face Reading'],
      price: '₹12.00/min',
      languages: 'Hindi',
      experience: '5 Years Experience',
      rating: '4.5',
      isOnline: true
    },
    {
      id: 'our-5',
      name: 'Anikya',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      tags: ['Tarot', 'Numerology'],
      price: '₹16.00/min',
      languages: 'Hindi • Bhojpuri',
      experience: '7 Years Experience',
      rating: '5',
      isOnline: true
    },
    {
      id: 'our-6',
      name: 'Madhuri',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80',
      tags: ['Tarot', 'Psychic', 'Reiki'],
      price: '₹24.00/min',
      languages: 'English • Hindi',
      experience: '10 Years Experience',
      rating: '4',
      isOnline: true
    }
  ];

  // Testimonials Data from Image 5
  const happyClients = [
    {
      id: 't-1',
      name: 'Ananya Sharma',
      location: 'Mumbai, Maharashtra',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      comment:
        'I have been using AstroLive for the past month, and it has been an amazing experience. The interface is sleek and user-friendly, making it easy to navigate. The astrologers are very knowledgeable and provide insightful guidance. The Live Chat feature is particularly helpful, allowing me to get instant answers to my questions. Highly recommended for anyone seeking guidance from good astrologers!'
    },
    {
      id: 't-2',
      name: 'Rajesh Kumar',
      location: 'Delhi',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      comment:
        'AstroLive has quickly become my favorite astrology platform. The variety of astrologers and their expertise is truly impressive. I consulted for a career-related query, and the guidance I received was spot on. Despite being a new platform, it operates smoothly and efficiently. Kudos to the AstroLive team for creating such a fantastic service!'
    },
    {
      id: 't-3',
      name: 'Priya Patel',
      location: 'Ahmedabad, Gujarat',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
      comment:
        'AstroLive is a great platform with excellent features! The navigation is intuitive, and I love how easy it is to find and consult with different astrologers. The astrologers are very friendly and their readings have been very accurate. I am very impressed with this new platform and will continue using it.'
    }
  ];

  const prevTestimonial = () => {
    setTestimonialIndex((prev) => (prev === 0 ? happyClients.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev === happyClients.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-12 pb-16">
      {/* ==========================================
          1. HERO BANNER (Exact Replica of Image 1)
         ========================================== */}
      <section className="astrolive-hero-card relative my-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Hero Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <h1 className="astrolive-hero-title max-w-xl">
              ARE YOU WORRIED ABOUT YOUR FUTURE?
            </h1>

            <p className="astrolive-hero-sub max-w-xl">
              Where Celestial Guidance Meets Digital Convenience. Explore Your Destiny, Connect With Authentic{' '}
              <strong className="text-white font-black underline decoration-amber-300">Astrologers Live</strong>
            </p>

            {/* Hero White Pill Buttons matching Image 1 */}
            <div className="space-y-3 pt-2">
              {/* Button 1: Chat with Astrologer */}
              <button
                onClick={() => setActiveTab('astrologers')}
                className="astrolive-hero-white-btn"
              >
                <div className="astrolive-btn-icon-orange">💬</div>
                <span className="astrolive-hero-btn-text">
                  CHAT WITH <span className="astrolive-hero-btn-highlight">ASTROLOGER ( ₹10/MIN)</span>
                </span>
              </button>

              {/* Button 2: Talk to Astrologer */}
              <button
                onClick={() => setActiveTab('astrologers')}
                className="astrolive-hero-white-btn"
              >
                <div className="astrolive-btn-icon-orange">📞</div>
                <span className="astrolive-hero-btn-text">
                  TALK TO <span className="astrolive-hero-btn-highlight">ASTROLOGER ( ₹15/MIN)</span>
                </span>
              </button>
            </div>
          </div>

          {/* Right Hero Column: Phone Mockup & Floating 3D Planets from Image 1 */}
          <div className="lg:col-span-5 relative flex items-center justify-center py-4">
            {/* Background Constellation Wheel */}
            <div className="absolute w-80 h-80 rounded-full border border-white/30 animate-spin-slow opacity-30 flex items-center justify-center text-white text-xs">
              <div className="w-64 h-64 rounded-full border border-dashed border-white/40" />
            </div>

            {/* Floating 3D Planets simulator from Image 1 */}
            <div
              className="absolute -top-4 left-2 w-14 h-14 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 border-2 border-white/80 shadow-2xl flex items-center justify-center text-2xl animate-float-slow"
              title="Planet Mars"
            >
              🪐
            </div>
            <div
              className="absolute top-8 -right-4 w-16 h-16 rounded-full bg-gradient-to-tr from-sky-600 via-blue-400 to-cyan-200 border-2 border-white/80 shadow-2xl flex items-center justify-center text-3xl animate-float-slow"
              style={{ animationDelay: '1.2s' }}
              title="Planet Neptune"
            >
              🌐
            </div>
            <div
              className="absolute -bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-tr from-amber-700 via-amber-500 to-yellow-300 border-2 border-white/80 shadow-2xl flex items-center justify-center text-2xl animate-float-slow"
              style={{ animationDelay: '2.4s' }}
              title="Saturn"
            >
              🌞
            </div>

            {/* Phone Mockup Frame from Image 1 */}
            <div className="relative w-64 sm:w-72 h-[410px] rounded-[38px] bg-slate-950 border-4 border-slate-800 shadow-2xl p-2.5 overflow-hidden transform -rotate-1 hover:rotate-0 transition-transform duration-300">
              {/* Notch */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-28 h-4 bg-slate-900 rounded-b-xl z-30" />

              <div className="relative w-full h-full rounded-[30px] overflow-hidden bg-slate-900 flex flex-col justify-between p-3.5">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80"
                  alt="Live Astrologer Consultation"
                  className="absolute inset-0 w-full h-full object-cover filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                {/* Top Phone Header */}
                <div className="relative z-10 flex items-center justify-between text-white text-[11px] pt-4">
                  <div className="flex items-center gap-1.5 bg-slate-950/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                    <span className="font-bold">Rupali Singh</span>
                    <span className="text-[9px] text-purple-300">Following</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="bg-red-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" /> Live
                    </span>
                    <span className="bg-slate-950/70 text-amber-300 text-[10px] font-mono px-2 py-0.5 rounded-full border border-amber-300/30">
                      00:05:56
                    </span>
                  </div>
                </div>

                {/* Bottom Video Live Controls & Tarot Cards */}
                <div className="relative z-10 space-y-2">
                  <div className="bg-slate-950/80 backdrop-blur-md p-2.5 rounded-2xl border border-white/20 text-white text-xs flex items-center justify-between">
                    <span className="font-bold text-amber-300">🔮 Tarot Card Reading</span>
                    <span className="text-[10px] bg-purple-600 text-white font-bold px-2 py-0.5 rounded-full">
                      100/min
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-white px-2 text-lg">
                    <span>💬</span>
                    <span>🎁</span>
                    <span>💖</span>
                    <span>↗️</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating 3D Holographic Planet on bottom left outside card (Image 1) */}
        <div className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full bg-gradient-to-tr from-purple-500 via-pink-400 to-indigo-300 border-2 border-white/80 shadow-2xl flex items-center justify-center text-3xl animate-float-slow z-20 pointer-events-none">
          🔮
        </div>
      </section>

      {/* MUHURAT MARKETPLACE HIGHLIGHT BANNER */}
      <section className="glass-card-gold rounded-3xl p-6 border-2 border-amber-500/40 relative overflow-hidden my-4 shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 text-left">
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[11px] font-black tracking-wide uppercase">
                🪔 NEW FEATURE RELEASE
              </span>
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30">
                ECOSYSTEM LIVE
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Muhurat Marketplace
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-medium">
              “Find the right time. Plan the perfect event.” — Discover auspicious dates for Weddings, Griha Pravesh, & Business Launches + Book verified date-matched vendors!
            </p>
          </div>

          <button
            onClick={() => setActiveTab('muhurat')}
            className="shrink-0 cosmic-gradient-btn px-6 py-3.5 rounded-2xl text-xs font-black shadow-xl hover:scale-105 transition-all flex items-center gap-2"
          >
            Explore Muhurat Marketplace →
          </button>
        </div>
      </section>

      {/* ==========================================
          1.5. UNIFIED DASHBOARD CARDS
         ========================================== */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Streak & Karma Card */}
        <div
          onClick={() => setActiveTab('daily-ritual')}
          className="relative bg-gradient-to-br from-amber-500/15 to-orange-500/10 border border-amber-500/25 rounded-2xl p-4 cursor-pointer hover:scale-[1.02] transition-all group"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center">
              <Flame className="w-4 h-4 text-amber-400" />
            </div>
            <span className="text-[10px] font-bold uppercase text-amber-400">Daily Streak</span>
          </div>
          <div className="text-2xl font-black text-slate-900">{currentStreak}<span className="text-xs font-bold text-slate-500 ml-1">days</span></div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[10px] font-bold text-amber-600 bg-amber-500/15 px-2 py-0.5 rounded-full">
              <Coins className="w-3 h-3 inline mr-0.5" />{karmaBalance} Karma
            </span>
          </div>
          {!hasCheckedInToday && (
            <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
          )}
        </div>

        {/* AstroProof Card */}
        <div
          onClick={() => setActiveTab('astro-proof')}
          className="bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border border-emerald-500/20 rounded-2xl p-4 cursor-pointer hover:scale-[1.02] transition-all"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="text-[10px] font-bold uppercase text-emerald-600">AstroProof</span>
          </div>
          <div className="text-2xl font-black text-slate-900">{predictions?.length || 0}<span className="text-xs font-bold text-slate-500 ml-1">predictions</span></div>
          <div className="text-[10px] text-slate-500 mt-2">
            {predictions?.filter(p => p.status === 'Active' || p.status === 'Pending').length || 0} active tracking
          </div>
        </div>

        {/* Badges Card */}
        <div
          onClick={() => setActiveTab('badges')}
          className="bg-gradient-to-br from-purple-500/10 to-indigo-500/5 border border-purple-500/20 rounded-2xl p-4 cursor-pointer hover:scale-[1.02] transition-all"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <Award className="w-4 h-4 text-purple-400" />
            </div>
            <span className="text-[10px] font-bold uppercase text-purple-600">Badges</span>
          </div>
          <div className="text-2xl font-black text-slate-900">{earnedBadges.length}<span className="text-xs font-bold text-slate-500 ml-1">earned</span></div>
          <div className="text-[10px] text-slate-500 mt-2">Tap to view gallery</div>
        </div>

        {/* Astro Guard Card */}
        <div
          onClick={() => setActiveTab('astro-guard')}
          className="bg-gradient-to-br from-cyan-500/10 to-blue-500/5 border border-cyan-500/20 rounded-2xl p-4 cursor-pointer hover:scale-[1.02] transition-all"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 flex items-center justify-center">
              <Calendar className="w-4 h-4 text-cyan-500" />
            </div>
            <span className="text-[10px] font-bold uppercase text-cyan-600">Astro Guard</span>
          </div>
          <div className="text-2xl font-black text-slate-900">{guardEvents?.length || 0}<span className="text-xs font-bold text-slate-500 ml-1">events</span></div>
          <div className="text-[10px] text-slate-500 mt-2">Timing insights ready</div>
        </div>
      </section>

      {/* ==========================================
          2. QUICK TOOLS GRID (Exact Replica of Image 1)
         ========================================== */}

      {/* ── Membership Banner ─────────────────────────────────── */}
      {userProfile.membership === 'FREE' ? (
        <section className="plus-upsell-banner rounded-3xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-xl flex-shrink-0">
              ✨
            </div>
            <div>
              <h3 className="text-sm font-black text-white">Unlock AstroLive Plus</h3>
              <p className="text-xs text-slate-400 mt-0.5">Get more personalized guidance, exclusive benefits and consultation savings.</p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('membership')}
            className="shrink-0 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-900 font-black text-xs shadow-lg hover:shadow-amber-500/25 transition-all hover:scale-105"
          >
            Explore Plus →
          </button>
        </section>
      ) : (
        <section className={`rounded-3xl p-5 border ${
          userProfile.membership === 'PLUS'
            ? 'bg-gradient-to-br from-amber-500/10 to-orange-500/5 border-amber-500/20'
            : 'bg-gradient-to-br from-purple-500/10 to-indigo-500/5 border-purple-500/20'
        }`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 ${
                userProfile.membership === 'PLUS' ? 'bg-amber-500/20 border border-amber-500/30' : 'bg-purple-500/20 border border-purple-500/30'
              }`}>
                {userProfile.membership === 'PLUS' ? '✨' : '👑'}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-black text-white">AstroLive {userProfile.membership}</h3>
                  <span className="text-[9px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded-full">ACTIVE</span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">Renewal: 15 September 2026</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {consultationCredits > 0 && (
                <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800 rounded-xl px-3 py-2">
                  <CreditCard className={`w-4 h-4 ${userProfile.membership === 'PLUS' ? 'text-amber-400' : 'text-purple-400'}`} />
                  <div>
                    <p className="text-[10px] text-slate-400">Credits</p>
                    <p className="text-xs font-black text-white">₹{consultationCredits}</p>
                  </div>
                </div>
              )}
              <button
                onClick={() => setActiveTab('membership-manage')}
                className="text-xs text-slate-400 hover:text-slate-200 underline underline-offset-2 transition-colors shrink-0"
              >
                Manage
              </button>
            </div>
          </div>
        </section>
      )}

      <section className="space-y-4">
        <div className="astrolive-grid-6">
          {/* Card 1: Daily Horoscope */}
          <div
            onClick={() => setActiveTab('daily-ritual')}
            className="quick-tool-card tool-bg-horoscope"
          >
            <span className="text-2xl">🌅</span>
            <span className="tool-title">Daily Horoscope</span>
          </div>

          {/* Card 2: Today's Panchang */}
          <div
            onClick={() => setActiveTab('muhurat')}
            className="quick-tool-card tool-bg-panchang"
          >
            <span className="text-2xl">☸️</span>
            <span className="tool-title">Today's Panchang</span>
          </div>

          {/* Card 3: Kundli's Match */}
          <div
            onClick={() => setActiveTab('astrologers')}
            className="quick-tool-card tool-bg-match"
          >
            <span className="text-2xl">💍</span>
            <span className="tool-title">Kundli's Match</span>
          </div>

          {/* Card 4: Free Kundli */}
          <div
            onClick={() => setActiveTab('ai-insight')}
            className="quick-tool-card tool-bg-kundli"
          >
            <span className="text-2xl">📜</span>
            <span className="tool-title">Free Kundli</span>
          </div>

          {/* Card 5: Love Calculator */}
          <div
            onClick={() => setActiveTab('astrologers')}
            className="quick-tool-card tool-bg-love"
          >
            <span className="text-2xl">💖</span>
            <span className="tool-title">Love Calculator</span>
          </div>

          {/* Card 6: Wallet */}
          <div
            onClick={() => setActiveTab('coins')}
            className="quick-tool-card tool-bg-wallet"
          >
            <span className="text-2xl">👛</span>
            <span className="tool-title">Wallet</span>
          </div>
        </div>
      </section>

      {/* ==========================================
          3. CHAT WITH ASTROLOGERS (Exact Replica of Image 2)
         ========================================== */}
      <section className="space-y-6 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="astrolive-section-title">
            CHAT WITH ASTROLOGERS
          </h2>

          <button
            onClick={() => setActiveTab('astrologers')}
            className="astrolive-pink-btn"
          >
            <span>VIEW MORE</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 6 Chat Cards Grid matching Image 2 */}
        <div className="astrolive-grid-3">
          {chatAstrologers.map((astro) => (
            <div key={astro.id} className="chat-astro-card">
              <div className="flex items-start gap-3">
                {/* Avatar with Online indicator dot */}
                <div className="relative shrink-0">
                  <img
                    src={astro.avatar}
                    alt={astro.name}
                    className="chat-astro-avatar-img w-16 h-16 rounded-full object-cover border-2 border-purple-100 shadow-sm shrink-0"
                  />
                  {astro.isOnline && (
                    <span className="absolute bottom-0 right-0 bg-emerald-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-white">
                      Online
                    </span>
                  )}
                </div>

                {/* Middle Info */}
                <div className="flex-1 space-y-1">
                  <h3 className="font-extrabold text-base text-slate-900 leading-tight">
                    {astro.name}
                  </h3>

                  {/* Specialty Pill Badges */}
                  <div className="flex flex-wrap gap-1">
                    {astro.badges.map((b, idx) => (
                      <span key={idx} className="badge-tag-beige">
                        {b}
                      </span>
                    ))}
                  </div>

                  <p className="text-[11px] text-slate-600 font-medium pt-0.5">
                    {astro.languages}
                  </p>
                  <p className="text-[11px] text-slate-500 font-bold">
                    {astro.exp}
                  </p>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 pt-0.5">
                    <div className="flex text-amber-400 text-xs">
                      {'★'.repeat(5)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Row: Price Badge & Chat Button */}
              <div className="flex items-center justify-between pt-4 border-t border-purple-50 mt-3">
                <span className="badge-price-green font-black">
                  {astro.price}
                </span>

                <button
                  onClick={() => setActiveTab('astrologers')}
                  className="chat-btn-purple"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Chat</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================
          4. OUR ASTROLOGERS CARDS (Exact Replica of Images 2 & 3)
         ========================================== */}
      <section className="space-y-6 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="astrolive-section-title">
            OUR ASTROLOGERS
          </h2>

          <button
            onClick={() => setActiveTab('astrologers')}
            className="astrolive-pink-btn"
          >
            <span>VIEW MORE</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 6 Call Astrologer Cards Grid matching Image 3 */}
        <div className="astrolive-grid-3">
          {ourAstrologers.map((astro) => (
            <div key={astro.id} className="astrologer-card-exact space-y-4">
              <div>
                {/* Top Row: Avatar on Left, Badges & Price Tag on Right */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="relative shrink-0">
                    <img
                      src={astro.avatar}
                      alt={astro.name}
                      className="astro-card-avatar-img w-16 h-16 rounded-full object-cover border-2 border-purple-200 shadow-sm shrink-0"
                    />
                    {astro.isOnline && (
                      <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
                    )}
                  </div>

                  <div className="text-right space-y-1">
                    <div className="flex flex-wrap justify-end gap-1">
                      {astro.tags.map((t, idx) => (
                        <span key={idx} className="tag-spec-grey">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div>
                      <span className="price-tag-lavender">
                        {astro.price}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Astrologer Name with Purple Circle Badge matching Image 3 */}
                <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-1.5 mb-2">
                  {astro.name}
                  <span className="text-purple-600 font-bold text-sm">🟣</span>
                </h3>

                {/* Information List matching Image 3 */}
                <div className="space-y-1.5 text-xs text-slate-600 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Languages className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{astro.languages}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{astro.experience}</span>
                  </div>

                  {/* Rating Stars matching Image 3 */}
                  <div className="flex items-center gap-1 pt-1">
                    <div className="flex text-amber-400 text-sm">
                      {'★'.repeat(5)}
                    </div>
                    <span className="font-bold text-slate-700 text-xs">
                      ({astro.rating})
                    </span>
                  </div>
                </div>
              </div>

              {/* Blue/Purple Call Button matching Image 3 */}
              <div className="pt-2">
                <button
                  onClick={() => setActiveTab('astrologers')}
                  className="astrolive-blue-call-btn"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>CALL</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================
          5. LIVE SESSIONS SECTION (Exact Replica of Image 4)
         ========================================== */}
      <section className="live-sessions-container space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="astrolive-section-title">
            LIVE SESSIONS
          </h2>

          <button
            onClick={() => setActiveTab('astrologers')}
            className="astrolive-pink-btn"
          >
            <span>VIEW MORE</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Live Session Cards Grid matching Image 4 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          {[
            {
              id: 'live-1',
              name: 'Priya Sharma 🔮',
              spec: 'Vedic & Career',
              lang: 'Hindi',
              image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80'
            },
            {
              id: 'live-2',
              name: 'Dr. Devraj ☸️',
              spec: 'KP & Numerology',
              lang: 'Hindi',
              image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80'
            },
            {
              id: 'live-3',
              name: 'Ananya Roy 🃏',
              spec: 'Tarot Guidance',
              lang: 'English',
              image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'
            },
            {
              id: 'live-4',
              name: 'Guruji Ramanathan 📜',
              spec: 'Nadi Astrology',
              lang: 'Tamil',
              image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80'
            }
          ].map((live) => (
            <div
              key={live.id}
              onClick={() => startConsultation(live)}
              className="live-card-vertical group"
            >
              <img
                src={live.image}
                alt={live.name}
                className="group-hover:scale-105 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-85" />

              {/* Top Badges matching Image 4 */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                <span className="bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                  {live.lang}
                </span>
                <span className="bg-red-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" /> Live
                </span>
              </div>

              {/* Bottom Info matching Image 4 */}
              <div className="absolute bottom-3 left-3 right-3 text-white z-10 space-y-0.5">
                <div className="font-extrabold text-sm truncate">
                  {live.name}
                </div>
                <div className="text-[10px] text-purple-200 font-medium">
                  {live.spec}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================
          6. DOWNLOAD OUR APP BANNER (Exact Replica of Image 4)
         ========================================== */}
      <section className="app-download-banner relative overflow-hidden my-6">
        {/* Floating 3D Star Top Left */}
        <div className="absolute top-4 left-6 text-2xl animate-bounce">
          ⭐
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl sm:text-4xl font-black leading-tight uppercase tracking-tight max-w-lg">
              DOWNLOAD OUR APP & GET YOUR FIRST CONSULTATION FOR FREE
            </h2>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setActiveTab('onboarding')}
                className="app-store-btn-white"
              >
                <span className="text-xl">▶️</span>
                <span>GOOGLE PLAY</span>
              </button>

              <button
                onClick={() => setActiveTab('onboarding')}
                className="app-store-btn-white"
              >
                <span className="text-xl">🍎</span>
                <span>APPLE STORE</span>
              </button>
            </div>

            {/* Floating Gift Box & Star on Bottom Left matching Image 4 */}
            <div className="flex items-center gap-4 pt-4">
              <div className="w-14 h-14 rounded-2xl bg-purple-900/60 border border-white/30 flex items-center justify-center text-3xl shadow-xl animate-bounce">
                🎁
              </div>
              <div className="text-xs font-extrabold text-amber-200">
                Claim Free ₹100 Welcome Coin Bonus On Mobile App
              </div>
            </div>
          </div>

          {/* Right side Phone mockups matching Image 4 */}
          <div className="lg:col-span-5 flex justify-center items-center gap-4 relative">
            {/* Phone 1 */}
            <div className="w-48 sm:w-56 h-[340px] rounded-[32px] bg-slate-950 border-4 border-slate-800 shadow-2xl p-2 relative overflow-hidden transform -rotate-6">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80"
                alt="App Consultation Screen"
                className="w-full h-full object-cover rounded-[24px]"
              />
            </div>

            {/* Phone 2 */}
            <div className="w-44 sm:w-48 h-[300px] rounded-[28px] bg-slate-900 border-4 border-slate-700 shadow-xl p-2 relative overflow-hidden transform rotate-6 hidden sm:block">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"
                alt="App Astrologers List"
                className="w-full h-full object-cover rounded-[20px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          7. OUR HAPPY CLIENTS (Exact Replica of Image 5)
         ========================================== */}
      <section className="space-y-6 pt-6">
        <h2 className="astrolive-section-title text-center">
          OUR HAPPY CLIENTS
        </h2>

        {/* Carousel Container with Arrows matching Image 5 */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-12">
          {/* Left Arrow Button */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-purple-200 text-slate-700 hover:text-purple-700 hover:scale-110 transition-all flex items-center justify-center shadow-md z-20 cursor-pointer"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* 3 Testimonials Grid matching Image 5 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {happyClients.map((client) => (
              <div key={client.id} className="testimonial-card-exact">
                <div>
                  {/* Top Row: Quote mark on left, Avatar on right */}
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-6xl font-serif text-slate-300 leading-none select-none">
                      “
                    </span>
                    <img
                      src={client.avatar}
                      alt={client.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-purple-100 shadow-sm"
                    />
                  </div>

                  {/* Paragraph Text */}
                  <p className="text-xs text-slate-600 leading-relaxed font-medium mb-6">
                    {client.comment}
                  </p>
                </div>

                {/* Bottom Client Info matching Image 5 */}
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    {client.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {client.location}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-purple-200 text-slate-700 hover:text-purple-700 hover:scale-110 transition-all flex items-center justify-center shadow-md z-20 cursor-pointer"
            aria-label="Next Testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </section>
    </div>
  );
}
