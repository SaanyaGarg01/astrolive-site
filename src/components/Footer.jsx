import React from 'react';
import { useAstro } from '../context/AstroContext';
import { MessageSquare, PhoneCall } from 'lucide-react';

export default function Footer() {
  const { setActiveTab } = useAstro();

  return (
    <footer className="bg-[#835cf6] text-white py-12 px-4 sm:px-6 lg:px-8 relative z-10 shadow-2xl">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Footer Section matching Image 5 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Brand & Action Buttons (Left 5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-950 p-0.5 shadow-md flex items-center justify-center">
                <span className="text-xl">🪐</span>
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                ASTROLIVE
              </span>
            </div>

            {/* White Capsule Buttons matching Image 5 */}
            <div className="space-y-3 max-w-md">
              <button
                onClick={() => setActiveTab('astrologers')}
                className="w-full bg-white rounded-full px-5 py-3 flex items-center gap-3 shadow-md hover:scale-[1.02] transition-all text-left border-none cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-[#ff521d] text-white flex items-center justify-center text-sm font-bold shrink-0">
                  💬
                </div>
                <span className="text-xs font-black text-slate-900 uppercase tracking-wide">
                  CHAT WITH <span className="text-[#ff521d]">ASTROLOGER ( ₹10/MIN)</span>
                </span>
              </button>

              <button
                onClick={() => setActiveTab('astrologers')}
                className="w-full bg-white rounded-full px-5 py-3 flex items-center gap-3 shadow-md hover:scale-[1.02] transition-all text-left border-none cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-[#ff521d] text-white flex items-center justify-center text-sm font-bold shrink-0">
                  📞
                </div>
                <span className="text-xs font-black text-slate-900 uppercase tracking-wide">
                  TALK TO <span className="text-[#ff521d]">ASTROLOGER ( ₹15/MIN)</span>
                </span>
              </button>
            </div>
          </div>

          {/* Links Columns (Right 7 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs">
            {/* Column 1: HOME */}
            <div className="space-y-3">
              <h4 className="font-black text-white uppercase tracking-wider text-xs">
                HOME
              </h4>
              <ul className="space-y-2 font-bold text-purple-100">
                <li>
                  <button
                    onClick={() => setActiveTab('astrologers')}
                    className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>BOOK A POOJA</span>
                    <span className="bg-red-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded uppercase">
                      New
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('muhurat')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    TODAY'S PANCHANG
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('astrologers')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    KUNDLI'S MATCH
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('ai-insight')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    FREE KUNDLI
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('astrologers')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    LOVE CALCULATOR
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('blog')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    BLOG
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 2: HOROSCOPE */}
            <div className="space-y-3">
              <h4 className="font-black text-white uppercase tracking-wider text-xs">
                HOROSCOPE
              </h4>
              <ul className="space-y-2 font-bold text-purple-100">
                <li>
                  <button
                    onClick={() => setActiveTab('daily-ritual')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    DAILY HOROSCOPE
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('daily-ritual')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    MONTHLY HOROSCOPE
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('daily-ritual')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    YEARLY HOROSCOPE
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: LIVE ASTROLOGY */}
            <div className="space-y-3">
              <h4 className="font-black text-white uppercase tracking-wider text-xs">
                LIVE ASTROLOGY
              </h4>
              <ul className="space-y-2 font-bold text-purple-100">
                <li>
                  <button
                    onClick={() => setActiveTab('astrologers')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    LIVE SESSION
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('astrologers')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    VIDEO CALL
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div className="border-t border-purple-400/40 pt-6 text-center space-y-3 text-[11px] text-purple-100">
          <p className="font-bold">
            @2026 Tech4Billion Media Pvt. Ltd. All Rights Reserved
          </p>

          <p className="space-x-2 font-medium">
            <a href="#" className="hover:underline text-purple-100">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:underline text-purple-100">Refund Policy</a>
            <span>|</span>
            <a href="#" className="hover:underline text-purple-100">Terms and Conditions</a>
            <span>|</span>
            <a href="#" className="hover:underline text-purple-100">About Us</a>
            <span>|</span>
            <a href="#" className="hover:underline text-purple-100">Contact Us</a>
          </p>

          <p className="font-medium text-purple-200">
            GST Number: 29AAHCT0333P1ZF
          </p>

          <p className="text-[10px] text-purple-200">
            Address: #2/32 The Pavilion, Wework The Pavilion, Church Street, Bangalore, Karnataka, 560001
          </p>
        </div>
      </div>
    </footer>
  );
}

