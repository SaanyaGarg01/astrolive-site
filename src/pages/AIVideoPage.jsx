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
  Maximize2,
  Share2,
  Download,
  User,
  Activity,
  Globe,
  Smartphone,
  Tv
} from 'lucide-react';

// AI Presenter Avatars
const AI_AVATARS = [
  {
    id: 'acharya-ananya',
    name: 'Acharya Ananya AI',
    title: 'Senior Vedic Astrologer Avatar',
    avatarImg: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    videoLoop: 'https://assets.mixkit.co/videos/preview/mixkit-woman-smiling-at-the-camera-41551-large.mp4',
    badge: 'Vedic Master',
    voice: 'Google UK English Female'
  },
  {
    id: 'dr-devraj',
    name: 'Dr. Devraj AI',
    title: 'KP & Quantum Transit Specialist',
    avatarImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    videoLoop: 'https://assets.mixkit.co/videos/preview/mixkit-man-holding-a-tablet-41554-large.mp4',
    badge: 'KP System',
    voice: 'Google US English Male'
  },
  {
    id: 'maya-celestial',
    name: 'Maya Celestial AI',
    title: 'Western & Synastry AI Guide',
    avatarImg: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    videoLoop: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-smiling-at-the-camera-41552-large.mp4',
    badge: 'Tarot & Synastry',
    voice: 'Google UK English Female'
  }
];

// Video Template Scenarios
const AI_VIDEO_TEMPLATES = [
  {
    id: 'career',
    title: 'Executive Career Transition & 10th House Transit',
    topic: 'Career Transition & Leadership Alignment',
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-stars-in-the-night-sky-4022-large.mp4',
    poster: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=800&auto=format&fit=crop&q=80',
    duration: '00:45',
    generatedDate: '18 August 2026',
    planetaryContext: 'Sun-Jupiter 10th House Conjunction in Leo',
    summaryText: 'Your natal chart indicates a major 30-day decision window where career transitions and executive applications carry maximum positive planetary momentum.',
    transcript: [
      { timeSec: 0, timeFormatted: '00:02', text: 'Initializing natal chart alignment for Sun, Jupiter, and 10th House transits...' },
      { timeSec: 8, timeFormatted: '00:10', text: 'Your 10th House of profession is experiencing a powerful Sun-Jupiter alignment this month.' },
      { timeSec: 18, timeFormatted: '00:20', text: 'Senior stakeholders and executive recruiters are unusually receptive to your strategic initiative.' },
      { timeSec: 28, timeFormatted: '00:30', text: 'Optimal timing window identified between August 18 and September 5 for key salary negotiations.' },
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
    generatedDate: '18 August 2026',
    planetaryContext: 'Venus 7th House Direct Phase',
    summaryText: 'Venus transit through your 7th house brings clarity to long-term relationship commitment and co-living goals.',
    transcript: [
      { timeSec: 0, timeFormatted: '00:02', text: 'Synthesizing Venus direct transit through your 7th house of partnerships...' },
      { timeSec: 7, timeFormatted: '00:09', text: 'Emotional hesitancy clears as Mercury turns direct in your communication sector.' },
      { timeSec: 16, timeFormatted: '00:18', text: 'Deep alignment conversations with your partner are heavily favored this week.' },
      { timeSec: 26, timeFormatted: '00:28', text: 'Rohini Nakshatra brings peaceful energy for shared long-term milestone planning.' },
      { timeSec: 35, timeFormatted: '00:38', text: 'Book a Synastry session with our certified specialists for compatibility deep-dives.' }
    ]
  },
  {
    id: 'wealth',
    title: 'Jupiter 2nd House Asset Acceleration',
    topic: 'Wealth & Financial Growth',
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-flying-through-a-star-field-in-space-41584-large.mp4',
    poster: 'https://images.unsplash.com/photo-1538370965046-79c0d6907d47?w=800&auto=format&fit=crop&q=80',
    duration: '00:40',
    generatedDate: '18 August 2026',
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
  
  // Active Video & Avatar Selection
  const [selectedTemplate, setSelectedTemplate] = useState(AI_VIDEO_TEMPLATES[0]);
  const [selectedAvatar, setSelectedAvatar] = useState(AI_AVATARS[0]);
  const [aspectRatio, setAspectRatio] = useState('widescreen'); // 'widescreen' | 'portrait'
  const [showChartOverlay, setShowChartOverlay] = useState(true);

  // Playback States
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [useVoiceover, setUseVoiceover] = useState(true);
  const [currentTimeSec, setCurrentTimeSec] = useState(0);
  const [durationSec, setDurationSec] = useState(45);
  const [currentCaption, setCurrentCaption] = useState(selectedTemplate.transcript[0].text);
  const [isGeneratingNew, setIsGeneratingNew] = useState(false);

  // Refs
  const mainVideoRef = useRef(null);
  const avatarVideoRef = useRef(null);
  const canvasRef = useRef(null);

  // 1. Canvas Dynamic Hologram Animation (Kundli Chart & Audio Waveform Overlay)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (showChartOverlay) {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(centerX, centerY) * 0.45;

        // Draw Rotating Celestial Zodiac Ring
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate((angle * Math.PI) / 180);

        // Outer Ring
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
        ctx.lineWidth = 2;
        ctx.setLineDash([8, 8]);
        ctx.stroke();

        // Inner Kundli Square
        ctx.beginPath();
        ctx.rect(-radius * 0.6, -radius * 0.6, radius * 1.2, radius * 1.2);
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.35)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([]);
        ctx.stroke();

        // Kundli Diagonals
        ctx.beginPath();
        ctx.moveTo(-radius * 0.6, -radius * 0.6);
        ctx.lineTo(radius * 0.6, radius * 0.6);
        ctx.moveTo(radius * 0.6, -radius * 0.6);
        ctx.lineTo(-radius * 0.6, radius * 0.6);
        ctx.strokeStyle = 'rgba(236, 72, 153, 0.3)';
        ctx.stroke();

        // Planetary Nodes
        const planets = [
          { name: '☉ Sun', a: 0 },
          { name: '♃ Jup', a: 40 },
          { name: '☽ Moon', a: 110 },
          { name: '♀ Ven', a: 200 },
          { name: '♂ Mars', a: 290 }
        ];

        planets.forEach((p) => {
          const rad = (p.a * Math.PI) / 180;
          const px = Math.cos(rad) * radius;
          const py = Math.sin(rad) * radius;

          ctx.beginPath();
          ctx.arc(px, py, 5, 0, 2 * Math.PI);
          ctx.fillStyle = '#f59e0b';
          ctx.fill();

          ctx.font = '10px monospace';
          ctx.fillStyle = '#fbbf24';
          ctx.fillText(p.name, px + 8, py + 3);
        });

        ctx.restore();

        // Audio Waveform Spectrum (Active when playing)
        if (isPlaying) {
          ctx.save();
          ctx.fillStyle = 'rgba(245, 158, 11, 0.6)';
          const bars = 30;
          const barWidth = 3;
          const startX = 20;
          const startY = canvas.height - 35;

          for (let i = 0; i < bars; i++) {
            const height = Math.sin(angle * 0.1 + i) * 12 + 15;
            ctx.fillRect(startX + i * 6, startY - height / 2, barWidth, height);
          }
          ctx.restore();
        }

        angle += isPlaying ? 0.6 : 0.1;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying, showChartOverlay]);

  // 2. Playback Synchronization (Main Video + Avatar Video + Speech Voiceover)
  useEffect(() => {
    if (mainVideoRef.current) {
      if (isPlaying) {
        mainVideoRef.current.play().catch(() => {});
        if (avatarVideoRef.current) avatarVideoRef.current.play().catch(() => {});

        if (useVoiceover && 'speechSynthesis' in window) {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(currentCaption);
          utterance.rate = 1.0;
          utterance.pitch = 1.0;
          window.speechSynthesis.speak(utterance);
        }
      } else {
        mainVideoRef.current.pause();
        if (avatarVideoRef.current) avatarVideoRef.current.pause();
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
        }
      }
    }
  }, [isPlaying, selectedTemplate, selectedAvatar]);

  // 3. Time Update & Subtitle Sync
  const handleTimeUpdate = () => {
    if (!mainVideoRef.current) return;
    const time = mainVideoRef.current.currentTime;
    setCurrentTimeSec(time);

    // Find current active caption block
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
    if (mainVideoRef.current) {
      setDurationSec(mainVideoRef.current.duration || 45);
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
    if (mainVideoRef.current) {
      mainVideoRef.current.muted = !isMuted;
      if (avatarVideoRef.current) avatarVideoRef.current.muted = true;
      setIsMuted(!isMuted);
    }
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    if (mainVideoRef.current) {
      mainVideoRef.current.currentTime = newTime;
      if (avatarVideoRef.current) avatarVideoRef.current.currentTime = newTime;
      setCurrentTimeSec(newTime);
    }
  };

  // Re-Generate AI Video Simulation
  const handleGenerateNewAI = () => {
    setIsGeneratingNew(true);
    showToast('🤖 Rendering 1080p AI Video Avatar & Natal Transit Map...', 'info');
    setTimeout(() => {
      setIsGeneratingNew(false);
      const randomTmpl = AI_VIDEO_TEMPLATES[Math.floor(Math.random() * AI_VIDEO_TEMPLATES.length)];
      setSelectedTemplate(randomTmpl);
      showToast('✨ New AI Astro Video Generated Successfully!', 'success');
      setIsPlaying(true);
    }, 2200);
  };

  const matchedAstrologers = astrologers.slice(0, 2);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 py-6 px-2 sm:px-4">
      {/* Title & Engine Header */}
      <div className="text-center space-y-2 max-w-3xl mx-auto">
        <div className="flex items-center justify-center gap-2">
          <span className="px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-black tracking-wide uppercase flex items-center gap-1.5 shadow-md">
            <Cpu className="w-3.5 h-3.5 text-amber-400" /> ASTROLIVE AI VIDEO STUDIO 2.0
          </span>
          <span className="text-[10px] bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 px-2.5 py-1 rounded-full font-bold">
            🟢 1080p AI RENDERER LIVE
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Personalized AI Astro Video
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Generated for <strong className="text-amber-300">{userProfile.name}</strong> • Transit: <strong className="text-emerald-400">{selectedTemplate.planetaryContext}</strong>
        </p>
      </div>

      {/* AI Controls Toolbar (Avatar Choice, Aspect Ratio, Hologram Layer) */}
      <div className="bg-[#0f111a] border border-amber-500/30 rounded-3xl p-4 sm:p-5 shadow-2xl space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          
          {/* Avatar Selector */}
          <div className="space-y-1.5">
            <label className="block text-slate-300 font-bold flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-amber-400" /> Select AI Presenter Avatar:
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {AI_AVATARS.map((av) => (
                <button
                  key={av.id}
                  onClick={() => {
                    setSelectedAvatar(av);
                    showToast(`✨ Switched to ${av.name} AI Presenter!`, 'info');
                  }}
                  className={`p-2 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                    selectedAvatar.id === av.id
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <img src={av.avatarImg} alt={av.name} className="w-8 h-8 rounded-full object-cover border border-amber-400/40" />
                  <span className="text-[10px] leading-tight truncate w-full">{av.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Topic Scenario Selector */}
          <div className="space-y-1.5">
            <label className="block text-slate-300 font-bold flex items-center gap-1">
              <Video className="w-3.5 h-3.5 text-purple-400" /> Select Forecast Topic:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {AI_VIDEO_TEMPLATES.map((tmpl) => (
                <button
                  key={tmpl.id}
                  onClick={() => {
                    setSelectedTemplate(tmpl);
                    setIsPlaying(false);
                    setCurrentTimeSec(0);
                    setCurrentCaption(tmpl.transcript[0].text);
                  }}
                  className={`px-3 py-2 rounded-xl border text-[11px] font-bold transition-all ${
                    selectedTemplate.id === tmpl.id
                      ? 'bg-purple-500/20 border-purple-400 text-purple-300 shadow-md'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {tmpl.id.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Controls & Generate CTA */}
          <div className="space-y-1.5 flex flex-col justify-between">
            <label className="block text-slate-300 font-bold flex items-center gap-1">
              <Sliders className="w-3.5 h-3.5 text-emerald-400" /> Display Overlays:
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowChartOverlay(!showChartOverlay)}
                className={`flex-1 py-1.5 px-2.5 rounded-xl border text-[11px] font-bold transition-all ${
                  showChartOverlay ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-500'
                }`}
              >
                {showChartOverlay ? '✓ Kundli Overlay ON' : '○ Kundli Overlay OFF'}
              </button>

              <button
                onClick={() => setAspectRatio(aspectRatio === 'widescreen' ? 'portrait' : 'widescreen')}
                className="py-1.5 px-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-[11px] font-bold flex items-center gap-1"
              >
                {aspectRatio === 'widescreen' ? <Tv className="w-3.5 h-3.5 text-amber-300" /> : <Smartphone className="w-3.5 h-3.5 text-purple-300" />}
                <span>{aspectRatio === 'widescreen' ? '16:9 HD' : '9:16 Reel'}</span>
              </button>
            </div>

            <button
              onClick={handleGenerateNewAI}
              disabled={isGeneratingNew}
              className="w-full py-2 rounded-xl cosmic-gradient-btn text-xs font-black shadow-lg flex items-center justify-center gap-1.5"
            >
              <Sparkles className={`w-3.5 h-3.5 ${isGeneratingNew ? 'animate-spin' : ''}`} />
              <span>{isGeneratingNew ? 'Rendering AI Video...' : 'Re-Generate AI Video'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* MASTER AI VIDEO PLAYER CONTAINER */}
      <div className={`glass-card-gold rounded-3xl p-4 sm:p-6 overflow-hidden border-2 border-amber-500/40 relative shadow-2xl space-y-4 max-w-4xl mx-auto transition-all ${
        aspectRatio === 'portrait' ? 'max-w-md' : 'max-w-4xl'
      }`}>
        <div className={`relative rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center border-2 border-slate-800 group shadow-2xl ${
          aspectRatio === 'portrait' ? 'aspect-[9/16]' : 'aspect-video'
        }`}>
          
          {/* 1. BACKGROUND COSMIC STREAM VIDEO */}
          <video
            ref={mainVideoRef}
            src={selectedTemplate.videoSrc}
            poster={selectedTemplate.poster}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleVideoLoaded}
            onEnded={handleVideoEnded}
            loop={false}
            playsInline
            className="w-full h-full object-cover"
          />

          {/* 2. DYNAMIC CANVAS OVERLAY (Kundli Zodiac Ring & Spectrum Waveform) */}
          <canvas
            ref={canvasRef}
            width={640}
            height={360}
            className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-90"
          />

          {/* 3. AI PRESENTING AVATAR (PICTURE-IN-PICTURE TALKING HEAD) */}
          <div className="absolute bottom-16 right-4 z-20 flex items-center gap-2 bg-slate-950/85 backdrop-blur-md p-2 rounded-2xl border-2 border-amber-500/50 shadow-2xl animate-in zoom-in-90 duration-300">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-amber-400">
              <video
                ref={avatarVideoRef}
                src={selectedAvatar.videoLoop}
                poster={selectedAvatar.avatarImg}
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute top-1 left-1 bg-amber-500 text-slate-950 text-[9px] font-black px-1.5 py-0.2 rounded-md">
                AI AVATAR
              </div>
            </div>

            <div className="hidden sm:block text-left text-xs pr-2 space-y-0.5">
              <strong className="text-white block font-bold">{selectedAvatar.name}</strong>
              <span className="text-[10px] text-amber-300 font-mono block">{selectedAvatar.title}</span>
              <span className="text-[9px] text-emerald-400 font-bold bg-emerald-500/20 px-1.5 py-0.5 rounded-full inline-block">
                🟢 Presenting Live
              </span>
            </div>
          </div>

          {/* HUD Top Badges */}
          <div className="absolute top-4 left-4 bg-slate-950/85 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[11px] font-bold text-amber-300 border border-amber-500/40 flex items-center gap-2 shadow-lg z-20">
            <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            <span>AI SYNTHESIZED STREAM</span>
          </div>

          <div className="absolute top-4 right-4 bg-slate-950/85 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[11px] font-mono text-purple-300 border border-purple-500/40 shadow-lg z-20">
            {formatTime(currentTimeSec)} / {selectedTemplate.duration}
          </div>

          {/* Big Centered Play/Pause Overlay Button */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center z-20 bg-slate-950/50 backdrop-blur-xs">
              <button
                onClick={togglePlayPause}
                className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 text-slate-950 flex items-center justify-center shadow-2xl hover:scale-110 transition-all cursor-pointer border-4 border-slate-950"
              >
                <Play className="w-10 h-10 fill-slate-950 ml-1" />
              </button>
            </div>
          )}

          {/* Subtitle & Narration Ticker */}
          <div className="absolute bottom-16 left-4 right-24 sm:right-56 z-20 bg-slate-950/90 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-amber-500/40 shadow-2xl space-y-1">
            <div className="flex items-center justify-between text-[10px] text-amber-400 font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> AI Presenter Narration & Subtitle Sync
              </span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-white italic leading-relaxed">
              "{currentCaption}"
            </p>
          </div>

          {/* Control Bar */}
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
                showToast('📲 AI Video clip prepared for Instagram Reels / WhatsApp export!', 'success');
              }}
              className="p-2 rounded-xl bg-purple-950/60 border border-purple-500/40 text-purple-300 hover:text-white"
              title="Share AI Video"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* AI Voice & Export Footer Row */}
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
              <h4 className="font-bold text-amber-300 mb-1">AI Voiceover Controls</h4>
              <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={useVoiceover}
                  onChange={(e) => setUseVoiceover(e.target.checked)}
                  className="accent-amber-400 w-4 h-4"
                />
                <span>Enable Browser AI Speech Synthesis</span>
              </label>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  if (mainVideoRef.current) {
                    mainVideoRef.current.currentTime = 0;
                    setIsPlaying(true);
                  }
                }}
                className="py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Replay
              </button>

              <button
                onClick={() => {
                  showToast('📥 Simulated MP4 download started: astro_insight_video.mp4', 'success');
                }}
                className="py-2.5 rounded-xl cosmic-gradient-btn font-black text-xs flex items-center justify-center gap-1 shadow-md"
              >
                <Download className="w-3.5 h-3.5" /> Export MP4
              </button>
            </div>
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
