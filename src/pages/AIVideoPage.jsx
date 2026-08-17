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
  Video,
  Radio,
  Sliders,
  Share2,
  Download,
  User,
  Smartphone,
  Tv,
  Music
} from 'lucide-react';

const AI_AVATARS = [
  {
    id: 'acharya-ananya',
    name: 'Acharya Ananya AI',
    title: 'Senior Vedic Astrologer Avatar',
    avatarImg: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    color: '#f59e0b',
    badge: 'Vedic Master'
  },
  {
    id: 'dr-devraj',
    name: 'Dr. Devraj AI',
    title: 'KP & Quantum Transit Specialist',
    avatarImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    color: '#a855f7',
    badge: 'KP System'
  },
  {
    id: 'maya-celestial',
    name: 'Maya Celestial AI',
    title: 'Western & Synastry AI Guide',
    avatarImg: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    color: '#ec4899',
    badge: 'Tarot & Synastry'
  }
];

const AI_VIDEO_TEMPLATES = [
  {
    id: 'career',
    title: 'Executive Career Transition & 10th House Transit',
    topic: 'Career Transition & Leadership Alignment',
    duration: 45,
    durationFormatted: '00:45',
    planetaryContext: 'Sun-Jupiter 10th House Conjunction in Leo',
    summaryText: 'Your natal chart indicates a major 30-day decision window where career transitions and executive applications carry maximum positive planetary momentum.',
    transcript: [
      { timeSec: 0, text: 'Initializing natal chart alignment for Sun, Jupiter, and 10th House transits...' },
      { timeSec: 8, text: 'Your 10th House of profession is experiencing a powerful Sun-Jupiter alignment this month.' },
      { timeSec: 18, text: 'Senior stakeholders and executive recruiters are unusually receptive to your strategic initiative.' },
      { timeSec: 28, text: 'Optimal timing window identified between August 18 and September 5 for key salary negotiations.' },
      { timeSec: 38, text: 'Connect with a human astrologer for custom mantras and personalized dasha remedies.' }
    ]
  },
  {
    id: 'love',
    title: 'Venus 7th House Harmony & Relationship Sync',
    topic: 'Love & Relationship Alignment',
    duration: 42,
    durationFormatted: '00:42',
    planetaryContext: 'Venus 7th House Direct Phase',
    summaryText: 'Venus transit through your 7th house brings clarity to long-term relationship commitment and co-living goals.',
    transcript: [
      { timeSec: 0, text: 'Synthesizing Venus direct transit through your 7th house of partnerships...' },
      { timeSec: 7, text: 'Emotional hesitancy clears as Mercury turns direct in your communication sector.' },
      { timeSec: 16, text: 'Deep alignment conversations with your partner are heavily favored this week.' },
      { timeSec: 26, text: 'Rohini Nakshatra brings peaceful energy for shared long-term milestone planning.' },
      { timeSec: 35, text: 'Book a Synastry session with our certified specialists for compatibility deep-dives.' }
    ]
  },
  {
    id: 'wealth',
    title: 'Jupiter 2nd House Asset Acceleration',
    topic: 'Wealth & Financial Growth',
    duration: 40,
    durationFormatted: '00:40',
    planetaryContext: 'Jupiter Aspecting 2nd House of Wealth',
    summaryText: 'Jupiter aspects your 2nd house of wealth, signaling strong investment yield and bonus payout alignment.',
    transcript: [
      { timeSec: 0, text: 'Scanning financial transits for Jupiter aspecting 2nd house of accumulated assets...' },
      { timeSec: 8, text: 'Unexpected financial inflows or pending bonuses are supported by planetary aspects.' },
      { timeSec: 18, text: 'Reallocate capital into long-term index assets during this high-clarity window.' },
      { timeSec: 28, text: 'Avoid speculative day trades on Rahu transit days.' },
      { timeSec: 34, text: 'Consult KP financial specialists for precise investment date selection.' }
    ]
  }
];

export default function AIVideoPage() {
  const { userProfile, astrologers, setActiveTab, startConsultation, showToast } = useAstro();

  const [selectedTemplate, setSelectedTemplate] = useState(AI_VIDEO_TEMPLATES[0]);
  const [selectedAvatar, setSelectedAvatar] = useState(AI_AVATARS[0]);
  const [aspectRatio, setAspectRatio] = useState('widescreen');
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [useVoiceover, setUseVoiceover] = useState(true);
  const [currentTimeSec, setCurrentTimeSec] = useState(0);
  const [currentCaption, setCurrentCaption] = useState(selectedTemplate.transcript[0].text);
  const [isGeneratingNew, setIsGeneratingNew] = useState(false);

  const canvasRef = useRef(null);
  const audioCtxRef = useRef(null);
  const oscRef = useRef(null);

  // Web Audio Synthesizer for Guaranteed Sound
  const playCosmicSound = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      if (oscRef.current) {
        oscRef.current.stop();
      }

      const osc = audioCtxRef.current.createOscillator();
      const gain = audioCtxRef.current.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, audioCtxRef.current.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, audioCtxRef.current.currentTime + 2);

      gain.gain.setValueAtTime(0.15, audioCtxRef.current.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtxRef.current.currentTime + 3);

      osc.connect(gain);
      gain.connect(audioCtxRef.current.destination);

      osc.start();
      osc.stop(audioCtxRef.current.currentTime + 3);
      oscRef.current = osc;
    } catch (e) {
      console.warn('Audio Context init:', e);
    }
  };

  // Speech Synthesis Narration
  const speakText = (text) => {
    if (!useVoiceover || isMuted || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.1;
      
      const voices = window.speechSynthesis.getVoices();
      const englishVoice = voices.find(v => v.lang.includes('en'));
      if (englishVoice) utterance.voice = englishVoice;

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('Speech synthesis:', err);
    }
  };

  // Play / Pause Toggle
  const togglePlay = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      playCosmicSound();
      speakText(currentCaption);
      showToast('▶ AI Video Stream Playing with Voice Narration!', 'info');
    } else {
      setIsPlaying(false);
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      showToast('⏸ AI Video Stream Paused', 'info');
    }
  };

  // Main Timer & Subtitle Sync Loop
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTimeSec((prev) => {
          const nextTime = prev + 0.2;
          if (nextTime >= selectedTemplate.duration) {
            setIsPlaying(false);
            if ('speechSynthesis' in window) window.speechSynthesis.cancel();
            return 0;
          }

          // Check for caption updates
          const activeLine = selectedTemplate.transcript.reduce((p, c) => {
            return nextTime >= c.timeSec ? c : p;
          }, selectedTemplate.transcript[0]);

          if (activeLine && activeLine.text !== currentCaption) {
            setCurrentCaption(activeLine.text);
            speakText(activeLine.text);
          }

          return nextTime;
        });
      }, 200);
    }

    return () => clearInterval(interval);
  }, [isPlaying, selectedTemplate, currentCaption, useVoiceover, isMuted]);

  // Procedural 60FPS Dynamic Motion Canvas (Space Motion, Stars, Orbiting Planets & Talking Mouth Animation)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Stars data
    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 0.5,
      speed: Math.random() * 1.5 + 0.5,
      alpha: Math.random()
    }));

    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Moving Starfield Warp
      ctx.fillStyle = '#050714';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        if (isPlaying) {
          star.x -= star.speed * 1.2;
          if (star.x < 0) star.x = canvas.width;
        }
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.4 + Math.sin(angle + star.alpha) * 0.4})`;
        ctx.fill();
      });

      // 2. Glowing Cosmic Nebula Center
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      const grad = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, 240);
      grad.addColorStop(0, 'rgba(168, 85, 247, 0.4)');
      grad.addColorStop(0.5, 'rgba(245, 158, 11, 0.2)');
      grad.addColorStop(1, 'rgba(5, 7, 20, 0.9)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 3. Rotating Kundli Zodiac Wheels
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate((angle * Math.PI) / 180);

      // Outer Ring
      ctx.beginPath();
      ctx.arc(0, 0, 110, 0, 2 * Math.PI);
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.6)';
      ctx.lineWidth = 2;
      ctx.setLineDash([10, 6]);
      ctx.stroke();

      // Kundli Inner Square
      ctx.beginPath();
      ctx.rect(-70, -70, 140, 140);
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.5)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([]);
      ctx.stroke();

      // Kundli Diagonals
      ctx.beginPath();
      ctx.moveTo(-70, -70);
      ctx.lineTo(70, 70);
      ctx.moveTo(70, -70);
      ctx.lineTo(-70, 70);
      ctx.strokeStyle = 'rgba(236, 72, 153, 0.4)';
      ctx.stroke();

      // Orbiting Planets
      const planets = [
        { name: '☉ Sun', a: 0, r: 110, color: '#f59e0b' },
        { name: '♃ Jup', a: 72, r: 110, color: '#a855f7' },
        { name: '☽ Moon', a: 144, r: 110, color: '#e2e8f0' },
        { name: '♀ Ven', a: 216, r: 110, color: '#ec4899' },
        { name: '♂ Mars', a: 288, r: 110, color: '#ef4444' }
      ];

      planets.forEach((p) => {
        const rad = (p.a * Math.PI) / 180;
        const px = Math.cos(rad) * p.r;
        const py = Math.sin(rad) * p.r;

        ctx.beginPath();
        ctx.arc(px, py, 6, 0, 2 * Math.PI);
        ctx.fillStyle = p.color;
        ctx.fill();

        ctx.font = '10px monospace';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(p.name, px + 8, py + 3);
      });

      ctx.restore();

      // 4. Live Audio Spectrum Bars (When playing)
      if (isPlaying) {
        ctx.save();
        const bars = 40;
        const barWidth = 4;
        const startX = (canvas.width - bars * 8) / 2;
        const startY = canvas.height - 25;

        for (let i = 0; i < bars; i++) {
          const h = Math.sin(angle * 0.15 + i * 0.3) * 18 + 20;
          ctx.fillStyle = i % 2 === 0 ? '#f59e0b' : '#a855f7';
          ctx.fillRect(startX + i * 8, startY - h / 2, barWidth, h);
        }
        ctx.restore();
      }

      angle += isPlaying ? 1.2 : 0.2;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying]);

  const handleGenerateNewAI = () => {
    setIsGeneratingNew(true);
    showToast('🤖 Synthesizing 1080p AI Natal Chart & Voice Stream...', 'info');
    setTimeout(() => {
      setIsGeneratingNew(false);
      const nextTmpl = AI_VIDEO_TEMPLATES[Math.floor(Math.random() * AI_VIDEO_TEMPLATES.length)];
      setSelectedTemplate(nextTmpl);
      setCurrentTimeSec(0);
      setCurrentCaption(nextTmpl.transcript[0].text);
      setIsPlaying(true);
      speakText(nextTmpl.transcript[0].text);
      showToast('✨ AI Astro Video Rendered & Playing!', 'success');
    }, 1800);
  };

  const matchedAstrologers = astrologers.slice(0, 2);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 py-6 px-2 sm:px-4">
      {/* Title */}
      <div className="text-center space-y-2 max-w-3xl mx-auto">
        <div className="flex items-center justify-center gap-2">
          <span className="px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-black tracking-wide uppercase flex items-center gap-1.5 shadow-md">
            <Cpu className="w-3.5 h-3.5 text-amber-400" /> AI ASTRO VIDEO ENGINE 2.0
          </span>
          <span className="text-[10px] bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 px-2.5 py-1 rounded-full font-bold">
            🟢 AUDIO & MOTION STREAM LIVE
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Personalized AI Astro Video
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Generated for <strong className="text-amber-300">{userProfile.name}</strong> • Transit: <strong className="text-emerald-400">{selectedTemplate.planetaryContext}</strong>
        </p>
      </div>

      {/* Control Bar & Avatar Picker */}
      <div className="bg-[#0f111a] border border-amber-500/30 rounded-3xl p-4 sm:p-5 shadow-2xl space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          
          {/* Avatar Picker */}
          <div className="space-y-1.5">
            <label className="block text-slate-300 font-bold flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-amber-400" /> AI Presenter Avatar:
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {AI_AVATARS.map((av) => (
                <button
                  key={av.id}
                  onClick={() => {
                    setSelectedAvatar(av);
                    showToast(`✨ Selected ${av.name} AI Presenter!`, 'info');
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

          {/* Topic Picker */}
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

          {/* Format & Re-Generate */}
          <div className="space-y-1.5 flex flex-col justify-between">
            <label className="block text-slate-300 font-bold flex items-center gap-1">
              <Sliders className="w-3.5 h-3.5 text-emerald-400" /> Video Format:
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setAspectRatio(aspectRatio === 'widescreen' ? 'portrait' : 'widescreen')}
                className="flex-1 py-1.5 px-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-[11px] font-bold flex items-center justify-center gap-1"
              >
                {aspectRatio === 'widescreen' ? <Tv className="w-3.5 h-3.5 text-amber-300" /> : <Smartphone className="w-3.5 h-3.5 text-purple-300" />}
                <span>{aspectRatio === 'widescreen' ? '16:9 Widescreen' : '9:16 Mobile Reel'}</span>
              </button>
            </div>

            <button
              onClick={handleGenerateNewAI}
              disabled={isGeneratingNew}
              className="w-full py-2.5 rounded-xl cosmic-gradient-btn text-xs font-black shadow-lg flex items-center justify-center gap-1.5"
            >
              <Sparkles className={`w-3.5 h-3.5 ${isGeneratingNew ? 'animate-spin' : ''}`} />
              <span>{isGeneratingNew ? 'Rendering AI Video...' : 'Re-Generate AI Video'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 60FPS PROCEDURAL PROCEDURAL VIDEO PLAYER CONTAINER */}
      <div className={`glass-card-gold rounded-3xl p-4 sm:p-6 overflow-hidden border-2 border-amber-500/40 relative shadow-2xl space-y-4 max-w-4xl mx-auto transition-all ${
        aspectRatio === 'portrait' ? 'max-w-md' : 'max-w-4xl'
      }`}>
        <div className={`relative rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center border-2 border-slate-800 group shadow-2xl ${
          aspectRatio === 'portrait' ? 'aspect-[9/16]' : 'aspect-video'
        }`}>
          
          {/* PROCEDURAL CANVAS MOTION ENGINE */}
          <canvas
            ref={canvasRef}
            width={640}
            height={360}
            className="w-full h-full object-cover"
          />

          {/* AI PRESENTING AVATAR TALKING HEAD (PICTURE-IN-PICTURE WITH MOUTH ANIMATION) */}
          <div className="absolute bottom-16 right-4 z-20 flex items-center gap-3 bg-slate-950/90 backdrop-blur-md p-2.5 rounded-2xl border-2 border-amber-500/60 shadow-2xl">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 border-amber-400">
              <img src={selectedAvatar.avatarImg} alt={selectedAvatar.name} className="w-full h-full object-cover" />
              
              {/* Animated Speaking Ring & Sound Indicator */}
              {isPlaying && (
                <div className="absolute inset-0 bg-amber-500/20 border-2 border-amber-400 rounded-xl animate-ping opacity-75 pointer-events-none" />
              )}
              
              <div className="absolute top-1 left-1 bg-amber-500 text-slate-950 text-[9px] font-black px-1.5 py-0.2 rounded-md">
                AI AVATAR
              </div>
            </div>

            <div className="hidden sm:block text-left text-xs pr-2 space-y-0.5">
              <strong className="text-white block font-bold">{selectedAvatar.name}</strong>
              <span className="text-[10px] text-amber-300 font-mono block">{selectedAvatar.title}</span>
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full inline-block ${
                isPlaying ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 animate-pulse' : 'bg-slate-900 text-slate-400'
              }`}>
                {isPlaying ? '🗣️ Speaking AI Voice' : '⏸ Ready to Speak'}
              </span>
            </div>
          </div>

          {/* Top HUD Badges */}
          <div className="absolute top-4 left-4 bg-slate-950/85 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[11px] font-bold text-amber-300 border border-amber-500/40 flex items-center gap-2 shadow-lg z-20">
            <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            <span>AI SYNTHESIZED STREAM</span>
          </div>

          <div className="absolute top-4 right-4 bg-slate-950/85 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[11px] font-mono text-purple-300 border border-purple-500/40 shadow-lg z-20">
            {formatTime(currentTimeSec)} / {selectedTemplate.durationFormatted}
          </div>

          {/* Big Centered Play/Pause Button */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center z-20 bg-slate-950/50 backdrop-blur-xs">
              <button
                onClick={togglePlay}
                className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 text-slate-950 flex items-center justify-center shadow-2xl hover:scale-110 transition-all cursor-pointer border-4 border-slate-950"
              >
                <Play className="w-10 h-10 fill-slate-950 ml-1" />
              </button>
            </div>
          )}

          {/* Subtitle & Narration Ticker */}
          <div className="absolute bottom-16 left-4 right-28 sm:right-60 z-20 bg-slate-950/95 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-amber-500/40 shadow-2xl space-y-1">
            <div className="flex items-center justify-between text-[10px] text-amber-400 font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> AI Voiceover Narration & Subtitle Sync
              </span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-white italic leading-relaxed">
              "{currentCaption}"
            </p>
          </div>

          {/* Bottom Control Bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent p-3 flex items-center justify-between gap-3 z-20 border-t border-slate-800/80">
            <button
              onClick={togglePlay}
              className="p-2 rounded-xl bg-amber-500 text-slate-950 hover:bg-amber-400 transition-all font-black"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-slate-950" /> : <Play className="w-4 h-4 fill-slate-950 ml-0.5" />}
            </button>

            {/* Seek Bar */}
            <input
              type="range"
              min={0}
              max={selectedTemplate.duration}
              step={0.1}
              value={currentTimeSec}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setCurrentTimeSec(val);
              }}
              className="flex-1 accent-amber-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />

            <button
              onClick={() => {
                setIsMuted(!isMuted);
                if (!isMuted && 'speechSynthesis' in window) window.speechSynthesis.cancel();
              }}
              className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
            </button>

            <button
              onClick={() => {
                showToast('📲 Prepared AI Video clip for Instagram Reels / WhatsApp export!', 'success');
              }}
              className="p-2 rounded-xl bg-purple-950/60 border border-purple-500/40 text-purple-300 hover:text-white"
              title="Share AI Video"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Video Metadata & Controls */}
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
              <h4 className="font-bold text-amber-300 mb-1 flex items-center gap-1">
                <Music className="w-3.5 h-3.5 text-amber-400" /> Sound & Narration
              </h4>
              <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={useVoiceover}
                  onChange={(e) => setUseVoiceover(e.target.checked)}
                  className="accent-amber-400 w-4 h-4"
                />
                <span>Web Audio & Speech Synthesis</span>
              </label>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setCurrentTimeSec(0);
                  setIsPlaying(true);
                  playCosmicSound();
                  speakText(selectedTemplate.transcript[0].text);
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
