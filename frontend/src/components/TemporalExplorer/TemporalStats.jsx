import React from 'react';
import { Building2, Trees, Droplets, Construction, Activity, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function TemporalStats({
  yearData = {},
  selectedYear = 2024
}) {
  const isBaseline = selectedYear === 2022;

  const urbanPct = yearData.urbanChangePct || 0;
  const vegPct = yearData.vegetationChangePct || 0;
  const waterPct = yearData.waterChangePct || 0;
  const infraPct = yearData.infrastructureChangePct || 0;
  const score = yearData.changeIndexScore || 0;
  const rating = yearData.changeIndexRating || (isBaseline ? "BASELINE" : "LOW");

  const getScoreColor = (sc) => {
    if (sc <= 25) return '#34D399'; // Success green
    if (sc <= 50) return '#38BDF8'; // Cyan
    if (sc <= 75) return '#FBBF24'; // Warning amber
    return '#F43F5E'; // Critical red
  };

  return (
    <div className="space-y-4 font-data">
      {/* 4 Multi-Spectral Delta Metric Cards */}
      <div className="grid grid-cols-2 gap-3">
        {/* Urban Built-Up Area */}
        <div className="bg-[#0A1624] border border-[#183047] p-3.5 rounded-xl flex flex-col justify-between hover:border-[#38BDF8]/40 transition-all">
          <div className="flex items-center justify-between text-[11px] text-[#91A8BE]">
            <span className="tracking-wider uppercase">URBAN AREA</span>
            <Building2 className="w-3.5 h-3.5 text-[#38BDF8]" />
          </div>
          <div className="mt-2">
            <div className="text-xl sm:text-2xl font-bold text-[#E8F3FF] tracking-tight">
              {isBaseline ? "Baseline" : `+${urbanPct.toFixed(1)}%`}
            </div>
            <div className="text-[10px] text-[#587088] mt-0.5">
              {isBaseline ? "Reference 0.0 km²" : `~${yearData.totalAreaKm2 || 0} km² footprint`}
            </div>
          </div>
        </div>

        {/* Vegetation Canopy Cover */}
        <div className="bg-[#0A1624] border border-[#183047] p-3.5 rounded-xl flex flex-col justify-between hover:border-[#34D399]/40 transition-all">
          <div className="flex items-center justify-between text-[11px] text-[#91A8BE]">
            <span className="tracking-wider uppercase">VEGETATION</span>
            <Trees className="w-3.5 h-3.5 text-[#34D399]" />
          </div>
          <div className="mt-2">
            <div className={`text-xl sm:text-2xl font-bold tracking-tight ${
              isBaseline ? "text-[#E8F3FF]" : "text-[#F43F5E]"
            }`}>
              {isBaseline ? "Baseline" : `${vegPct.toFixed(1)}%`}
            </div>
            <div className="text-[10px] text-[#587088] mt-0.5">
              {isBaseline ? "Reference canopy" : "NDVI green delta"}
            </div>
          </div>
        </div>

        {/* Water Surface Dynamics */}
        <div className="bg-[#0A1624] border border-[#183047] p-3.5 rounded-xl flex flex-col justify-between hover:border-[#38BDF8]/40 transition-all">
          <div className="flex items-center justify-between text-[11px] text-[#91A8BE]">
            <span className="tracking-wider uppercase">WATER SURFACE</span>
            <Droplets className="w-3.5 h-3.5 text-[#22D3EE]" />
          </div>
          <div className="mt-2">
            <div className={`text-xl sm:text-2xl font-bold tracking-tight ${
              isBaseline ? "text-[#E8F3FF]" : "text-[#FBBF24]"
            }`}>
              {isBaseline ? "Baseline" : `${waterPct.toFixed(1)}%`}
            </div>
            <div className="text-[10px] text-[#587088] mt-0.5">
              {isBaseline ? "Reference hydro" : "NDWI boundary shift"}
            </div>
          </div>
        </div>

        {/* Infrastructure Corridors */}
        <div className="bg-[#0A1624] border border-[#183047] p-3.5 rounded-xl flex flex-col justify-between hover:border-[#FBBF24]/40 transition-all">
          <div className="flex items-center justify-between text-[11px] text-[#91A8BE]">
            <span className="tracking-wider uppercase">INFRASTRUCTURE</span>
            <Construction className="w-3.5 h-3.5 text-[#FBBF24]" />
          </div>
          <div className="mt-2">
            <div className="text-xl sm:text-2xl font-bold text-[#E8F3FF] tracking-tight">
              {isBaseline ? "Baseline" : `+${infraPct.toFixed(1)}%`}
            </div>
            <div className="text-[10px] text-[#587088] mt-0.5">
              {isBaseline ? "Reference roads" : "Road / transit grid"}
            </div>
          </div>
        </div>
      </div>

      {/* EarthLens Change Index Composite Card */}
      <div className="bg-[#0A1624] border border-[#183047] p-4 rounded-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#38BDF8]" />
            <span className="text-xs font-bold text-[#E8F3FF] tracking-wider uppercase">
              EARTHLENS CHANGE INDEX
            </span>
          </div>
          <span className="text-[10px] text-[#587088]">0 — 100 SCALE</span>
        </div>

        <div className="flex items-center justify-between gap-4 pt-1">
          <div>
            <div className="flex items-baseline gap-2">
              <span 
                className="text-3xl font-bold tracking-tight"
                style={{ color: isBaseline ? '#91A8BE' : getScoreColor(score) }}
              >
                {isBaseline ? "—" : score}
              </span>
              <span className="text-xs text-[#587088]">/ 100</span>
            </div>

            <div className="mt-1">
              <span 
                className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider"
                style={{ 
                  backgroundColor: `${getScoreColor(score)}15`,
                  color: isBaseline ? '#91A8BE' : getScoreColor(score),
                  border: `1px solid ${isBaseline ? '#183047' : getScoreColor(score)}40`
                }}
              >
                {isBaseline ? "BASELINE EPOCH" : `${rating} IMPACT SEVERITY`}
              </span>
            </div>
          </div>

          {/* Radial Progress Gauge Dial */}
          <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-[#0E1C2D]"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                strokeDasharray={`${isBaseline ? 0 : score}, 100`}
                strokeWidth="3.5"
                stroke={isBaseline ? '#183047' : getScoreColor(score)}
                strokeLinecap="round"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-[11px] font-bold text-[#E8F3FF]">
              {isBaseline ? "0" : score}
            </span>
          </div>
        </div>

        <p className="text-[10px] text-[#587088] leading-tight pt-1 border-t border-[#183047]">
          «EarthLens Change Index is an internal analytical indicator and is not an official scientific standard.»
        </p>
      </div>
    </div>
  );
}
