import React from 'react';
import { useAstro } from '../context/AstroContext';
import { useGamification } from '../context/GamificationContext';
import { Compass, Calendar, Sparkles, Search, Gift, ShieldCheck, Flame } from 'lucide-react';

export default function MobileNav() {
  const { activeTab, setActiveTab } = useAstro();
  const { currentStreak, hasCheckedInToday } = useGamification();

  const mobileItems = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'muhurat', label: 'Muhurat 📅', icon: Calendar },
    { id: 'astro-proof', label: 'Proof', icon: ShieldCheck },
    { id: 'ai-insight', label: 'Astro AI', icon: Sparkles },
    { id: 'astrologers', label: 'Astrologers', icon: Search }
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#070913]/95 backdrop-blur-lg border-t border-slate-800 py-2 px-2">
      <div className="flex items-center justify-around">
        {mobileItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative flex flex-col items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-medium transition-all ${
                isActive ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-amber-400 scale-110' : 'text-slate-400'}`} />
              <span>{item.label}</span>
              {item.badge && (
                <span className="absolute -top-0.5 right-0.5 w-2 h-2 rounded-full bg-red-500" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
