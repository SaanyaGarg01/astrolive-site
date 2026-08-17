import React, { useState } from 'react';
import { useAstro } from '../context/AstroContext';
import { generateAstroVideo } from '../services/astroAIService';
import { Play, Pause, Search, UserCheck, Sparkles, Star, ChevronRight, Info, ShieldCheck } from 'lucide-react';

export default function AIVideoPage() {
  const { userProfile, astrologers, setActiveTab, setSelectedAstrologerProfile, startConsultation } = useAstro();
  const videoMeta = generateAstroVideo(userProfile);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStepIdx, setCurrentStepIdx] = useState(1);

  const matchedCareerAstrologers = astrologers.slice(0, 2);

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6">
      {/* Title */}
      <div className="text-center space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-semibold">
          🎥 Personalized AI Astro Video
        </span>
        <h1 className="text-3xl font-extrabold text-white">{videoMeta.title}</h1>
        <p className="text-xs text-slate-300">
          Generated on {videoMeta.generatedDate} • Topic: <strong className="text-amber-300">{videoMeta.topic}</strong>
        </p>
      </div>

      {/* Video Player Simulator */}
      <div className="glass-card rounded-3xl p-4 overflow-hidden border border-amber-500/30 relative shadow-2xl">
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center border border-slate-800">
          <img
            src={videoMeta.videoPoster}
            alt={videoMeta.title}
            className={`w-full h-full object-cover filter transition-all ${isPlaying ? 'brightness-75' : 'brightness-50'}`}
          />

          {/* Cosmic Graphic Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-purple-950/40 to-transparent pointer-events-none" />

          {/* Video Control Center */}
          <div className="absolute inset-0 flex flex-col items-center justify-between p-6 z-10">
            <div className="w-full flex items-center justify-between">
              <span className="bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-amber-400 border border-amber-500/30">
                AI-Generated Demo Video
              </span>
              <span className="bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono text-slate-300">
                00:45 / {videoMeta.duration}
              </span>
            </div>

            {/* Play/Pause Button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-950 flex items-center justify-center shadow-2xl hover:scale-110 transition-all cursor-pointer"
            >
              {isPlaying ? <Pause className="w-8 h-8 fill-slate-950" /> : <Play className="w-8 h-8 fill-slate-950 ml-1" />}
            </button>

            {/* Voiceover Transcript Stream */}
            <div className="w-full bg-slate-950/85 backdrop-blur-md p-3 rounded-xl border border-slate-800 text-xs text-slate-200">
              <span className="text-[10px] text-amber-400 font-bold uppercase block mb-0.5">Live AI Voiceover:</span>
              <p className="italic">
                "{videoMeta.transcript[currentStepIdx]?.text || videoMeta.summaryText}"
              </p>
            </div>
          </div>
        </div>

        {/* Video Summary */}
        <div className="p-4 bg-slate-900/60 rounded-2xl mt-4 border border-slate-800/80">
          <h4 className="text-xs font-bold text-slate-200 mb-1">Transit Summary Overview</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            "{videoMeta.summaryText}"
          </p>
        </div>
      </div>

      {/* Human Consultation Bridge Section */}
      <section className="glass-card-gold rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
            Human Astrologer Discovery
          </span>
          <h2 className="text-2xl font-bold text-white">Want to explore this deeper?</h2>
          <p className="text-xs text-slate-300">
            While AI synthesizes patterns, human astrologers provide deep personalized intuition, custom remedies, and answer specific questions.
          </p>
        </div>

        {/* Recommended Specialists Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {matchedCareerAstrologers.map((astro) => (
            <div
              key={astro.id}
              className="bg-slate-900/90 border border-amber-500/25 rounded-2xl p-4 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <img
                  src={astro.avatar}
                  alt={astro.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-amber-500/40"
                />
                <div>
                  <h4 className="text-xs font-bold text-white">{astro.name}</h4>
                  <p className="text-[11px] text-amber-300">{astro.specialization}</p>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-0.5">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{astro.rating}</span>
                    <span>• ₹{astro.pricePerMin}/min</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => startConsultation(astro)}
                className="py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shrink-0 transition-all"
              >
                Chat Now
              </button>
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <button
            onClick={() => setActiveTab('astrologers')}
            className="cosmic-gradient-btn px-8 py-3.5 rounded-2xl text-xs font-bold inline-flex items-center gap-2 shadow-xl"
          >
            <Search className="w-4 h-4" />
            <span>Find My Astrologer (Smart Match)</span>
          </button>
        </div>
      </section>
    </div>
  );
}
