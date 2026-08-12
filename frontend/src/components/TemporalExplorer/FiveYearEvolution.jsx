import React from 'react';
import { TrendingUp, BarChart3, ShieldCheck, Sparkles } from 'lucide-react';

export default function FiveYearEvolution({
  evolutionData = {},
  cityName = "Mumbai"
}) {
  const urbanTotal = evolutionData.urbanTotalPct || 18.4;
  const vegTotal = evolutionData.vegetationTotalPct || -9.2;
  const waterTotal = evolutionData.waterTotalPct || -3.1;
  const infraTotal = evolutionData.infrastructureTotalPct || 8.9;
  const overallIndex = evolutionData.overallChangeIndex || 72;
  const severity = evolutionData.overallSeverity || "HIGH";

  return (
    <div className="bg-[#0A1624] border border-[#183047] rounded-xl p-4 sm:p-5 space-y-4 font-data shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#183047]">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#38BDF8]" />
          <div>
            <span className="text-[10px] text-[#38BDF8] tracking-widest uppercase block">
              MULTI-YEAR SYNTHESIS
            </span>
            <h3 className="font-heading text-sm sm:text-base font-bold text-[#E8F3FF]">
              FIVE-YEAR EVOLUTION
            </h3>
          </div>
        </div>

        <div className="px-2.5 py-1 rounded bg-[#0E1C2D] border border-[#183047] text-xs font-bold text-[#22D3EE]">
          2022 → 2026
        </div>
      </div>

      {/* Progress Bars for 4 Macro Vectors */}
      <div className="space-y-3">
        {/* Urban Expansion */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-[#91A8BE]">CUMULATIVE URBAN SPRAWL</span>
            <span className="text-[#38BDF8] font-bold">+{urbanTotal.toFixed(1)}%</span>
          </div>
          <div className="h-1.5 w-full bg-[#06101D] rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#38BDF8] to-[#22D3EE] rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, urbanTotal * 3.5)}%` }}
            />
          </div>
        </div>

        {/* Vegetation Canopy Loss */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-[#91A8BE]">NET GREEN CANOPY SHIFT</span>
            <span className="text-[#F43F5E] font-bold">{vegTotal.toFixed(1)}%</span>
          </div>
          <div className="h-1.5 w-full bg-[#06101D] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#F43F5E] rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.abs(vegTotal) * 6)}%` }}
            />
          </div>
        </div>

        {/* Hydrological Dynamics */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-[#91A8BE]">HYDROLOGICAL SHIFT</span>
            <span className="text-[#FBBF24] font-bold">{waterTotal.toFixed(1)}%</span>
          </div>
          <div className="h-1.5 w-full bg-[#06101D] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#FBBF24] rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.abs(waterTotal) * 12)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Overall Five-Year Change Score Banner */}
      <div className="pt-2 border-t border-[#183047] flex items-center justify-between">
        <div>
          <span className="text-[10px] text-[#587088] uppercase block">
            OVERALL 5-YEAR CHANGE INDEX
          </span>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="text-xl font-bold text-[#E8F3FF]">{overallIndex}</span>
            <span className="text-xs text-[#587088]">/ 100</span>
            <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#F43F5E]/15 text-[#F43F5E] border border-[#F43F5E]/30">
              {severity}
            </span>
          </div>
        </div>

        <div className="text-right max-w-[50%]">
          <p className="text-[11px] text-[#91A8BE] line-clamp-2 leading-relaxed">
            {evolutionData.summary || `Significant cumulative landscape transformation recorded for ${cityName}.`}
          </p>
        </div>
      </div>
    </div>
  );
}
