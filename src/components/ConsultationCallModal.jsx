import React, { useState, useEffect } from 'react';
import { useAstro } from '../context/AstroContext';
import { generateConsultationSummary } from '../services/astroAIService';
import { PhoneOff, Mic, MicOff, Video, VideoOff, MessageSquare, Send, Sparkles, ShieldCheck, Clock } from 'lucide-react';

export default function ConsultationCallModal() {
  const { activeConsultation, endConsultation, showToast } = useAstro();
  const [seconds, setSeconds] = useState(14);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [activeView, setActiveView] = useState('video'); // 'video' or 'chat'
  const [messages, setMessages] = useState([
    {
      sender: 'astrologer',
      text: 'Namaste Saanya! I have your birth chart and career transits open right now.',
      time: '10:00 AM'
    },
    {
      sender: 'user',
      text: 'Namaste Acharya Ji! I am looking for guidance regarding a senior role interview on August 12th.',
      time: '10:01 AM'
    },
    {
      sender: 'astrologer',
      text: 'Your 10th house is heavily energized by Sun & Jupiter. August 12 between 09:45 AM – 11:30 AM is an exceptionally strong timing window.',
      time: '10:01 AM'
    }
  ]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    if (!activeConsultation) return;
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [activeConsultation]);

  if (!activeConsultation) return null;

  const formatTime = (totalSecs) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const userMsg = { sender: 'user', text: inputText, time: 'Just now' };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Simulate astrologer reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'astrologer',
          text: `Regarding your question, the transit strength peaks around August 28th. I will record a prediction in your AstroProof ledger for reference.`,
          time: 'Just now'
        }
      ]);
    }, 1200);
  };

  const handleFinishCall = () => {
    showToast('✨ Consultation ended. Generating AI Consultation Summary...', 'info');
    const summary = generateConsultationSummary(activeConsultation);
    endConsultation(summary);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-lg animate-in fade-in duration-300">
      <div className="bg-[#0b0e1e] border border-amber-500/30 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl flex flex-col h-[90vh]">
        {/* Call Header */}
        <div className="bg-[#0f132a] border-b border-slate-800 px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={activeConsultation.avatar}
              alt={activeConsultation.name}
              className="w-10 h-10 rounded-full object-cover border border-amber-500/40"
            />
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                {activeConsultation.name}
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </h4>
              <p className="text-xs text-amber-300/90">{activeConsultation.specialization}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-700 px-3 py-1 rounded-full text-xs font-mono text-amber-300">
              <Clock className="w-3.5 h-3.5" />
              <span>{formatTime(seconds)}</span>
              <span className="text-[10px] text-slate-400">({activeConsultation.pricePerMin} ₹/min)</span>
            </div>

            <div className="flex rounded-lg bg-slate-900 p-1 border border-slate-800">
              <button
                onClick={() => setActiveView('video')}
                className={`px-3 py-1 rounded-md text-xs font-semibold ${activeView === 'video' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'}`}
              >
                Video Session
              </button>
              <button
                onClick={() => setActiveView('chat')}
                className={`px-3 py-1 rounded-md text-xs font-semibold ${activeView === 'chat' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'}`}
              >
                Live Chat
              </button>
            </div>
          </div>
        </div>

        {/* Call Body */}
        <div className="flex-1 relative bg-slate-950 flex flex-col md:flex-row overflow-hidden">
          {activeView === 'video' ? (
            <div className="flex-1 relative flex items-center justify-center bg-gradient-to-b from-slate-900 via-purple-950/20 to-slate-950 p-6">
              {/* Astrologer Video Simulation */}
              <div className="relative w-full h-full max-h-[500px] rounded-2xl overflow-hidden border border-amber-500/20 shadow-2xl flex items-center justify-center">
                <img
                  src={activeConsultation.avatar}
                  alt={activeConsultation.name}
                  className="w-full h-full object-cover filter brightness-95"
                />
                
                {/* Audio Wave Visualizer Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-950/80 backdrop-blur-md border border-slate-800 rounded-xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-amber-300 font-medium">Live Audio Feed:</span>
                    <div className="flex items-center gap-1">
                      <span className="w-1 h-4 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1 h-6 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1 h-3 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      <span className="w-1 h-7 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
                      <span className="w-1 h-4 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '100ms' }} />
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-400">Sun-Jupiter 10th House Analysis in Progress</span>
                </div>

                {/* Self View Floating Camera */}
                <div className="absolute top-4 right-4 w-32 h-24 bg-slate-900 border-2 border-amber-500/50 rounded-xl overflow-hidden shadow-2xl flex items-center justify-center">
                  <div className="w-full h-full bg-slate-950 flex flex-col items-center justify-center p-2 text-center">
                    <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center text-xs">
                      S
                    </div>
                    <span className="text-[10px] text-slate-300 mt-1">Saanya (You)</span>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {/* Chat Sidepanel / Full Chat */}
          <div className={`${activeView === 'chat' ? 'flex-1' : 'w-80 hidden md:flex'} border-l border-slate-800 bg-[#0c0f22] flex flex-col`}>
            <div className="p-3 border-b border-slate-800 text-xs font-semibold text-slate-300 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-amber-400" /> Session Notes & Chat
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl ${
                      msg.sender === 'user'
                        ? 'bg-amber-500 text-slate-950 font-medium rounded-br-none'
                        : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-slate-500 mt-1 px-1">{msg.time}</span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-800 flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask Acharya Ji a question..."
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 p-2 rounded-xl"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Call Footer Bar */}
        <div className="bg-[#0f132a] border-t border-slate-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-3 rounded-full border transition-all ${
                isMuted ? 'bg-red-500/20 border-red-500/40 text-red-400' : 'bg-slate-800 border-slate-700 text-slate-200'
              }`}
            >
              {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={`p-3 rounded-full border transition-all ${
                !isVideoOn ? 'bg-red-500/20 border-red-500/40 text-red-400' : 'bg-slate-800 border-slate-700 text-slate-200'
              }`}
            >
              {!isVideoOn ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
            </button>
          </div>

          <button
            onClick={handleFinishCall}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold text-xs shadow-lg shadow-red-500/20 transition-all"
          >
            <PhoneOff className="w-4 h-4" />
            End Call & Save AI Summary
          </button>
        </div>
      </div>
    </div>
  );
}
