import React from 'react';
import { useAstro } from '../context/AstroContext';
import { Sparkles, CheckCircle2, AlertCircle, Info } from 'lucide-react';

export default function NotificationToast() {
  const { toastMessage } = useAstro();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-20 lg:bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-[#0f1226]/95 border border-amber-500/40 text-slate-100 px-4 py-3 rounded-xl shadow-2xl backdrop-blur-md flex items-center gap-3 max-w-sm">
        <Sparkles className="w-5 h-5 text-amber-400 shrink-0 animate-spin-slow" />
        <p className="text-xs font-medium text-amber-100">{toastMessage.message}</p>
      </div>
    </div>
  );
}
