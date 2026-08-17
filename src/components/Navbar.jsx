import React, { useState } from 'react';
import { useAstro } from '../context/AstroContext';
import { useNotifications } from '../context/NotificationContext';
import { Search, Bell } from 'lucide-react';

export default function Navbar() {
  const {
    activeTab,
    setActiveTab
  } = useAstro();

  const { unreadCount, setShowCenter } = useNotifications();

  // Exact Pills from Image 1 + new features
  const navPills = [
    { id: 'store', label: 'STORE' },
    { id: 'daily-ritual', label: '🔥 DAILY', isStreak: true },
    { id: 'astrologers', label: 'ASTROLOGY' },
    { id: 'astro-proof', label: '🔮 ASTROPROOF', isProof: true },
    { id: 'patterns', label: '🧬 MY PATTERNS', isPatterns: true },
    { id: 'astro-guard', label: '🛡️ GUARD' },
    { id: 'badges', label: '🏆 BADGES' },
    { id: 'blog', label: 'BLOG' },
    { id: 'ai-insight', label: 'FREE REPORTS' },
    { id: 'muhurat', label: 'PANCHANG' },
    { id: 'membership', label: '✨ PLUS', isPlus: true },
    { id: 'admin', label: '⚙️ ADMIN', isAdmin: true }
  ];

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

        {/* Category Navigation Pill Bar matching Image 1 */}
        <div className="astrolive-pill-bar">
          {navPills.map((pill) => (
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
          ))}
        </div>
      </div>
    </header>
  );
}
