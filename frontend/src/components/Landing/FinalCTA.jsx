import React from 'react';
import { ArrowRight, Layers, Radio, Sparkles } from 'lucide-react';

export default function FinalCTA({ onStartAnalysis, onOpenTemporalExplorer }) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full text-center">
      <div className="relative bg-gradient-to-b from-[#0A1624] to-[#06101D] border border-[#183047] rounded-2xl p-8 sm:p-12 overflow-hidden shadow-2xl">
        {/* Subtle Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-radial from-[#38BDF8]/10 via-transparent to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E1C2D] border border-[#183047]">
            <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span className="text-[10px] font-data text-[#38BDF8] tracking-widest uppercase">
              READY TO OBSERVE INDIA?
            </span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#E8F3FF] tracking-tight">
            START SATELLITE CHANGE DETECTION
          </h2>

          <p className="text-sm sm:text-base text-[#91A8BE] leading-relaxed">
            Select an Indian metropolitan region, compare multi-year observation windows, and uncover land-surface transformation with zero setup required.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onStartAnalysis}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#38BDF8] text-[#020611] font-heading font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-3 hover:bg-[#22D3EE] shadow-lg shadow-[#38BDF8]/20 transition-all hover:scale-105"
            >
              <Radio className="w-4 h-4 text-[#020611]" />
              <span>START ANALYSIS</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {onOpenTemporalExplorer && (
              <button
                onClick={onOpenTemporalExplorer}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#0E1C2D] border border-[#183047] hover:border-[#38BDF8] text-[#38BDF8] font-heading font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-3 transition-all hover:scale-105 shadow-md shadow-[#38BDF8]/10"
              >
                <Layers className="w-4 h-4" />
                <span>EXPLORE TEMPORAL CHANGE</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
