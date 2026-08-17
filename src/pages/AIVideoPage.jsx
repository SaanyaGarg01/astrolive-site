import React, { useState, useRef, useEffect } from 'react';
import { useAstro } from '../context/AstroContext';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  Star,
  Search,
  ChevronRight,
  ShieldCheck,
  Zap,
  Cpu,
  Layers,
  Video,
  Radio,
  Sliders,
  CheckCircle2,
  Maximize2
} from 'lucide-react';

// Video Data Options for Real Playback
const AI_VIDEO_TEMPLATES = [
  {
    id: 'career',
    title: 'Executive Career Transition & 10th House Transit',
    topic: 'Career Transition & Leadership Alignment',
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-stars-in-the-night-sky-4022-large.mp4',
    poster: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=800&auto=format&fit=crop&q=80',
    duration: '00:45',
    generatedDate: '17 August 2026',
    planetaryContext: 'Sun-Jupiter 10th House Conjunction',
    summaryText: 'Your natal chart indicates a major 30-day decision window where career transitions and executive applications carry maximum positive planetary momentum.',
    transcript: [
      { timeSec: 0, timeFormatted: '00:02', text: 'Initializing natal chart alignment for Sun, Jupiter, and 10th House transits...' },
      { timeSec: 8, timeFormatted: '00:10', text: 'Your 10th House of profession is experiencing a powerful Sun-Jupiter alignment this month.' },
      { timeSec: 18, timeFormatted: '00:20', text: 'Senior stakeholders and executive recruiters are unusually receptive to your initiative.' },
      { timeSec: 28, timeFormatted: '00:30', text: 'Optimal timing window identified between August 12 and August 28 for key negotiations.' },
      { timeSec: 38, timeFormatted: '00:40', text: 'Connect with a human astrologer for custom mantras and personalized dasha remedies.' }
    ]
  },
  {
    id: 'love',
    title: 'Venus 7th House Harmony & Relationship Sync',
    topic: 'Love & Relationship Alignment',
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-space-odyssey-through-a-glowing-nebula-42998-large.mp4',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    duration: '00:42',
    generatedDate: '17 August 2026',
    planetaryContext: 'Venus 7th House Direct Phase',
    summaryText: 'Venus transit through your 7th house brings clarity to long-term relationship commitment and co-living goals.',
    transcript: [
      { timeSec: 0, timeFormatted: '00:02', text: 'Synthesizing Venus direct transit through your 7th house of partnerships...' },
      { timeSec: 7, timeFormatted: '00:09', text: 'Emotional hesitancy clears as Mercury turns direct in your communication sector.' },
      { timeSec: 16, timeFormatted: '00:18', text: 'Deep alignment conversations with your partner are heavily favored this week.' },
      { timeSec: 26, timeFormatted: '00:28', text: 'Pushya Nakshatra brings peaceful energy for shared long-term milestone planning.' },
      { timeSec: 35, timeFormatted: '00:38', text: 'Book a Tarot or Synastry session for compatibility deep-dives.' }
    ]
  },
  {
    id: 'wealth',
    title: 'Jupiter 2nd House Asset Acceleration',
    topic: 'Wealth & Financial Growth',
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-flying-through-a-star-field-in-space-41584-large.mp4',
    poster: 'https://images.unsplash.com/photo-1538370965046-79c0d6907d47?w=800&auto=format&fit=crop&q=80',
    duration: '00:40',
    generatedDate: '17 August 2026',
    planetaryContext: 'Jupiter Aspecting 2nd House of Wealth',
    summaryText: 'Jupiter aspects your 2nd house of wealth, signaling strong investment yield and bonus payout alignment.',
    transcript: [
      { timeSec: 0, timeFormatted: '00:02', text: 'Scanning financial transits for Jupiter aspecting 2nd house of accumulated assets...' },
      { timeSec: 8, timeFormatted: '00:10', text: 'Unexpected financial inflows or pending bonuses are supported by planetary aspects.' },
      { timeSec: 18, timeFormatted: '00:20', text: 'Reallocate capital into long-term index assets during this high-clarity window.' },
      { timeSec: 28, timeFormatted: '00:30', text: 'Avoid speculative day trades on Rahu transit days.' },
      { timeSec: 34, timeFormatted: '00:36', text: 'Consult KP financial specialists for precise investment date selection.' }
    ]
  }
];

export default function AIVideoPage() {
  const { userProfile, astrologers, setActiveTab, startConsultation, showToast } = useAstro();
  
  // Active Video Selection
  const [selectedTemplate, setSelectedTemplate] = useState(AI_VIDEO_TEMPLATES[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [useVoiceover, setUseVoiceover] = useState(true);
  const [currentTimeSec, setCurrentTimeSec] = useState(0);
  const [durationSec, setDurationSec] = useState(45);
  const [currentCaption, setCurrentCaption] = useState(selectedTemplate.transcript[0].text);
  const [isGeneratingNew, setIsGeneratingNew] = useState(false);

  const videoRef = useRef(null);

  // Sync Video Element State
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
        if (useVoiceover && 'speechSynthesis' in window) {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(currentCaption);
          utterance.rate = 1.0;
          utterance.pitch = 1.0;
          window.speechSynthesis.speak(utterance);
        }
      } else {
        videoRef.current.pause();
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
        }
      }
    }
  }, [isPlaying, selectedTemplate]);

  // Handle Video Time Updates & Subtitle Sync
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const time = videoRef.current.currentTime;
    setCurrentTimeSec(time);

    // Sync transcript line based on current timestamp
    const activeLine = selectedTemplate.transcript.reduce((prev, curr) => {
      return time >= curr.timeSec ? curr : prev;
    }, selectedTemplate.transcript[0]);

    if (activeLine && activeLine.text !== currentCaption) {
      setCurrentCaption(activeLine.text);
      if (isPlaying && useVoiceover && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(activeLine.text);
        utterance.rate = 1.05;
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  const handleVideoLoaded = () => {
    if (videoRef.current) {
      setDurationSec(videoRef.current.duration || 45);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setCurrentTimeSec(0);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTimeSec(newTime);
    }
  };

  // Simulate AI Video Generation
  const handleGenerateNewAI = () => {
    setIsGeneratingNew(true);
    showToast('🤖 Synthesizing custom AI natal video chart...', 'info');
    setTimeout(() => {
      setIsGeneratingNew(false);
      setSelectedTemplate(AI_VIDEO_TEMPLATES[Math.floor(Math.random() * AI_VIDEO_TEMPLATES.length)]);
      showToast('✨ Dynamic AI Astro Video Generated!', 'success');
      setIsPlaying(true);
    }, 2000);
  };

  const matchedAstrologers = astrologers.slice(0, 2);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-6 px-2 sm:px-4">
      {/* Title */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-black tracking-wide uppercase">
          🎥 GEN-AI VIDEO SYNTHESIS ENGINE
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Personalized AI Astro Video
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          HD Video report generated specifically for <strong className="text-amber-300">{userProfile.name}</strong> • Transit: <strong className="text-emerald-400">{selectedTemplate.planetaryContext}</strong>
        </p>
      </div>

      {/* Video Selector Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-1 text-xs">
        {AI_VIDEO_TEMPLATES.map((tmpl) => (
          <button
            key={tmpl.id}
            onClick={() => {
              setSelectedTemplate(tmpl);
              setIsPlaying(false);
              setCurrentTimeSec(0);
              setCurrentCaption(tmpl.transcript[0].text);
            }}
            className={`px-4 py-2 rounded-2xl border font-bold shrink-0 transition-all flex items-center gap-2 ${
              selectedTemplate.id === tmpl.id
                ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-lg'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Video className="w-3.5 h-3.5 text-amber-400" />
            <span>{tmpl.id.toUpperCase()} FORECAST</span>
          </button>
        ))}

        <button
          onClick={handleGenerateNewAI}
          disabled={isGeneratingNew}
          className="px-4 py-2 rounded-2xl cosmic-gradient-btn font-black shrink-0 shadow-lg flex items-center gap-1.5 text-xs"
        >
          <Sparkles className={`w-3.5 h-3.5 ${isGeneratingNew ? 'animate-spin' : ''}`} />
          <span>{isGeneratingNew ? 'Generating AI...' : 'Re-Generate AI Video'}</span>
        </button>
      </div>

      {/* REAL HTML5 VIDEO PLAYER WITH COSMIC HUD OVERLAY */}
      <div className="glass-card-gold rounded-3xl p-4 sm:p-6 overflow-hidden border-2 border-amber-500/40 relative shadow-2xl space-y-4">
        {/* Video Canvas Container */}
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center border-2 border-slate-800 group">
          
          {/* REAL HTML5 VIDEO ELEMENT THAT PLAYS! */}
          <video
            ref={videoRef}
            src={selectedTemplate.videoSrc}
            poster={selectedTemplate.poster}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleVideoLoaded}
            onEnded={handleVideoEnded}
            loop={false}
            playsInline
            className="w-full h-full object-cover"
          />

          {/* Cosmic Graphic Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-purple-950/30 to-transparent pointer-events-none" />

          {/* Planetary Orbital Graphic Badge */}
          <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] font-bold text-amber-300 border border-amber-500/40 flex items-center gap-2 shadow-lg z-20">
            <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            <span>AI SYNTHESIZED STREAM</span>
          </div>

          <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] font-mono text-purple-300 border border-purple-500/30 shadow-lg z-20">
            {formatTime(currentTimeSec)} / {selectedTemplate.duration}
          </div>

          {/* Big Centered Play/Pause Button Overlay */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center z-20 bg-slate-950/40 backdrop-blur-xs">
              <button
                onClick={togglePlayPause}
                className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 text-slate-950 flex items-center justify-center shadow-2xl hover:scale-110 transition-all cursor-pointer border-4 border-slate-950"
              >
                <Play className="w-10 h-10 fill-slate-950 ml-1" />
              </button>
            </div>
          )}

          {/* Live Subtitle / Voiceover Transcript Ticker */}
          <div className="absolute bottom-14 left-4 right-4 z-20 bg-slate-950/90 backdrop-blur-md p-3.5 rounded-2xl border border-amber-500/30 shadow-2xl text-center space-y-1">
            <div className="flex items-center justify-between text-[10px] text-amber-400 font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Live AI Narration & Subtitle Sync
              </span>
              <span className="text-slate-400 font-mono">{formatTime(currentTimeSec)}</span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-white italic leading-relaxed">
              "{currentCaption}"
            </p>
          </div>

          {/* Custom Video Control Bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent p-3 flex items-center justify-between gap-3 z-20 border-t border-slate-800/80">
            <button
              onClick={togglePlayPause}
              className="p-2 rounded-xl bg-amber-500 text-slate-950 hover:bg-amber-400 transition-all font-black"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-slate-950" /> : <Play className="w-4 h-4 fill-slate-950 ml-0.5" />}
            </button>

            {/* Seek Bar */}
            <input
              type="range"
              min={0}
              max={durationSec || 45}
              value={currentTimeSec}
              onChange={handleSeek}
              className="flex-1 accent-amber-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />

            <button
              onClick={toggleMute}
              className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <button
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.requestFullscreen().catch(() => {});
                }
              }}
              className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Audio Narration Toggle & Summary Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
          <div className="md:col-span-2 bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h4 className="font-bold text-white text-sm">AI Transit Summary Overview</h4>
              <span className="text-amber-300 font-mono text-[11px]">{selectedTemplate.planetaryContext}</span>
            </div>
            <p className="text-slate-300 leading-relaxed italic">
              "{selectedTemplate.summaryText}"
            </p>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
            <div>
              <h4 className="font-bold text-amber-300 mb-1">AI Voice Settings</h4>
              <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={useVoiceover}
                  onChange={(e) => setUseVoiceover(e.target.checked)}
                  className="accent-amber-400 w-4 h-4"
                />
                <span>Enable Live AI Speech Synthesis</span>
              </label>
            </div>

            <button
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.currentTime = 0;
                  setIsPlaying(true);
                }
              }}
              className="py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Replay From Start
            </button>
          </div>
        </div>
      </div>

      {/* Human Astrologer Discovery Bridge */}
      <section className="glass-card-purple rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
            Human Astrologer Deep-Dive
          </span>
          <h2 className="text-2xl font-bold text-white">Want to explore this AI video deeper?</h2>
          <p className="text-xs text-slate-300">
            While AI synthesizes mathematical transits, human astrologers provide intuitive alignment, custom remedies, and address specific life questions.
          </p>
        </div>

        {/* Recommended Specialists Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {matchedAstrologers.map((astro) => (
            <div
              key={astro.id}
              className="bg-slate-950/90 border border-purple-500/30 rounded-2xl p-4 flex items-center justify-between gap-4"
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
                className="py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shrink-0 transition-all shadow-md"
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
