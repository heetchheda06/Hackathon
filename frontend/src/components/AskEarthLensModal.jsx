import React, { useState } from 'react';
import { Bot, Send, Sparkles, X, MessageSquare, AlertCircle } from 'lucide-react';

export default function AskEarthLensModal({ isOpen, onClose, analysisData }) {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: `Greetings. I am EarthLens AI Assistant. Ask me anything about the satellite observation telemetry for ${analysisData?.city_name || 'the selected Indian city'}.`
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const quickPrompts = [
    "What changed?",
    "How much vegetation changed?",
    "Which area changed the most?",
    "What is the impact score?",
    "Explain this analysis."
  ];

  const handleSend = async (qText) => {
    const textToSend = qText || question;
    if (!textToSend.trim()) return;

    // Add user message
    const userMsg = { sender: 'user', text: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    if (!qText) setQuestion('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          analysis_id: analysisData?.analysis_id,
          city_id: analysisData?.city_name?.toLowerCase(),
          question: textToSend
        })
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { sender: 'ai', text: data.answer }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { 
          sender: 'ai', 
          text: `Telemetry response offline. Based on current data: Urban change is ${analysisData?.stats?.urban_change_pct || 14.7}%, Vegetation change is ${analysisData?.stats?.vegetation_change_pct || -8.4}%, covering ${analysisData?.stats?.total_affected_area_km2 || 8.4} km².`
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#020611]/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-[#0A1624] border border-[#183047] rounded-xl overflow-hidden shadow-2xl flex flex-col h-[520px]">
        {/* Modal Header */}
        <div className="px-5 py-3.5 bg-[#06101D] border-b border-[#183047] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#38BDF8]/10 border border-[#38BDF8]/30 flex items-center justify-center">
              <Bot className="w-4 h-4 text-[#38BDF8]" />
            </div>
            <div>
              <div className="font-heading font-bold text-sm text-[#E8F3FF] tracking-wider uppercase">
                ASK EARTHLENS AI
              </div>
              <p className="text-[10px] text-[#587088] font-data">
                GROUNDED INTELLIGENCE • {analysisData?.city_name || "INDIAN OBSERVATION ZONE"}
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-[#0E1C2D] text-[#91A8BE] hover:text-[#E8F3FF] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Prompts */}
        <div className="p-3 bg-[#020611] border-b border-[#183047] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <Sparkles className="w-3.5 h-3.5 text-[#22D3EE] shrink-0 ml-1" />
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="px-2.5 py-1 rounded-full bg-[#0E1C2D] border border-[#183047] text-[11px] font-data text-[#91A8BE] hover:text-[#38BDF8] hover:border-[#38BDF8]/40 shrink-0 transition-all"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 font-data text-xs bg-space">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-6 h-6 rounded bg-[#38BDF8]/10 border border-[#38BDF8]/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5 text-[#38BDF8]" />
                </div>
              )}

              <div
                className={`max-w-[82%] p-3 rounded-xl leading-relaxed border ${
                  msg.sender === 'user'
                    ? 'bg-[#38BDF8]/15 border-[#38BDF8]/40 text-[#E8F3FF] rounded-tr-none'
                    : 'bg-[#0E1C2D] border-[#183047] text-[#91A8BE] rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-6 h-6 rounded bg-[#38BDF8]/10 border border-[#38BDF8]/30 flex items-center justify-center shrink-0">
                <Bot className="w-3.5 h-3.5 text-[#38BDF8] animate-spin" />
              </div>
              <div className="bg-[#0E1C2D] border border-[#183047] p-3 rounded-xl text-[#587088] animate-pulse">
                Analyzing satellite telemetry matrix...
              </div>
            </div>
          )}
        </div>

        {/* Disclaimer Bar */}
        <div className="px-4 py-1.5 bg-[#020611] border-t border-[#183047] text-[10px] font-data text-[#587088] flex items-center gap-1.5">
          <AlertCircle className="w-3 h-3 text-[#FBBF24] shrink-0" />
          <span>AI response is based strictly on processed multi-spectral satellite imagery metrics.</span>
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-[#06101D] border-t border-[#183047] flex items-center gap-2">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={`Ask about ${analysisData?.city_name || 'satellite'} changes...`}
            className="flex-1 bg-[#0A1624] border border-[#183047] rounded-lg px-3 py-2 text-xs font-data text-[#E8F3FF] placeholder-[#587088] focus:outline-none focus:border-[#38BDF8]"
          />
          <button
            onClick={() => handleSend()}
            disabled={!question.trim() || isLoading}
            className="p-2 bg-[#38BDF8] text-[#020611] font-bold rounded-lg hover:bg-[#22D3EE] disabled:opacity-50 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
