import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, RotateCcw, Calendar, ChevronLeft, ChevronRight, 
  TrendingUp, Activity, MapPin, Layers, Sparkles, AlertCircle, ArrowRight
} from 'lucide-react';
import { getCityTemporalData } from '../../data/temporalData';

export default function TemporalPreview({ 
  selectedCityId = 'mumbai', 
  onSelectCity,
  onOpenTemporalExplorer 
}) {
  const [currentYear, setCurrentYear] = useState(2024);
  const [isPlaying, setIsPlaying] = useState(false);
  const years = [2022, 2023, 2024, 2025, 2026];
  const timerRef = useRef(null);

  const cityData = getCityTemporalData(selectedCityId);
  const activeYearData = cityData.years?.[currentYear] || cityData.years?.[2024] || {};
  const evolution = cityData.fiveYearEvolution || {};

  // Auto-play timeline animation loop (1.5s per step)
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentYear((prev) => {
          const nextIdx = years.indexOf(prev) + 1;
          if (nextIdx >= years.length) {
            setIsPlaying(false);
            return 2026;
          }
          return years[nextIdx];
        });
      }, 1400);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    const idx = years.indexOf(currentYear);
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      if (idx > 0) setCurrentYear(years[idx - 1]);
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (idx < years.length - 1) setCurrentYear(years[idx + 1]);
    } else if (e.key === 'Home') {
      e.preventDefault();
      setCurrentYear(2022);
    } else if (e.key === 'End') {
      e.preventDefault();
      setCurrentYear(2026);
    } else if (e.key === ' ') {
      e.preventDefault();
      setIsPlaying(!isPlaying);
    }
  };

  const handlePlayToggle = () => {
    if (currentYear === 2026) {
      setCurrentYear(2022);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleReplay = () => {
    setCurrentYear(2022);
    setIsPlaying(true);
  };

  // Severity color mapping
  const getSeverityBadge = (rating) => {
    switch (rating) {
      case 'HIGH':
        return 'text-[#F43F5E] bg-[#F43F5E]/10 border-[#F43F5E]/30';
      case 'MODERATE':
        return 'text-[#FBBF24] bg-[#FBBF24]/10 border-[#FBBF24]/30';
      case 'LOW':
        return 'text-[#34D399] bg-[#34D399]/10 border-[#34D399]/30';
      default:
        return 'text-[#38BDF8] bg-[#38BDF8]/10 border-[#38BDF8]/30';
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A1624] border border-[#183047] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
            <span className="text-[10px] font-data text-[#38BDF8] tracking-widest uppercase">
              INTERACTIVE TEMPORAL ENGINE
            </span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#E8F3FF] tracking-tight">
            TEMPORAL EXPLORER PREVIEW
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#91A8BE]">
            Watch Indian cities evolve through multi-spectral space observation (2022 → 2026).
          </p>
        </div>

        {/* Demo Analysis Warning Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0E1C2D] border border-[#183047] text-xs font-data text-[#FBBF24] self-start md:self-auto">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>DEMO ANALYSIS MODE</span>
        </div>
      </div>

      {/* Main Grid: Interactive Satellite Viewer & Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Satellite Imagery Viewer & Time Controls (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Satellite Image Frame with Change Overlay */}
          <div className="relative aspect-video sm:aspect-[16/10] w-full rounded-xl overflow-hidden border border-[#183047] bg-[#020611] shadow-2xl group">
            {/* Satellite Image */}
            <img 
              src={activeYearData.image || "/static/mumbai/after_2026-01.png"}
              alt={`${cityData.cityName} satellite observation in ${currentYear}`}
              className="w-full h-full object-cover transition-opacity duration-700 ease-in-out"
              onError={(e) => {
                // Fallback if local image path fails
                e.currentTarget.src = "/static/mumbai/after_2026-01.png";
              }}
            />

            {/* Subtle Vignette & Scanline Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#020611] via-transparent to-black/30 pointer-events-none" />

            {/* Top Telemetry Overlay */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 font-data pointer-events-none">
              <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-[#020611]/80 backdrop-blur-md border border-[#183047] text-[11px] text-[#E8F3FF]">
                <span className="w-2 h-2 rounded-full bg-[#22D3EE] status-pulse-cyan" />
                <span className="font-bold">{cityData.cityName.toUpperCase()}</span>
                <span className="text-[#587088]">|</span>
                <span className="text-[#38BDF8]">{currentYear}</span>
              </div>

              <div className="px-2.5 py-1 rounded bg-[#020611]/80 backdrop-blur-md border border-[#183047] text-[10px] text-[#91A8BE]">
                LAT {cityData.lat?.toFixed(4)}°N  LON {cityData.lon?.toFixed(4)}°E
              </div>
            </div>

            {/* Change Overlay Polygons */}
            {activeYearData.overlayPolygons?.map((poly) => (
              <div 
                key={poly.id}
                className="absolute inset-0 pointer-events-none flex items-center justify-center"
              >
                <div className="absolute px-2 py-1 rounded bg-[#020611]/90 border border-[#F43F5E] text-[#F43F5E] font-data text-[10px] font-bold shadow-lg animate-pulse"
                  style={{ top: '35%', left: '55%' }}
                >
                  ⚡ {poly.label}
                </div>
              </div>
            ))}

            {/* Bottom Status Bar on Image */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10 font-data pointer-events-none">
              <div className="text-[10px] text-[#91A8BE] px-2 py-1 rounded bg-[#020611]/80 backdrop-blur-md border border-[#183047]">
                EPOCH: {activeYearData.label || `Year ${currentYear}`}
              </div>

              <div className="text-[10px] font-bold text-[#34D399] px-2 py-1 rounded bg-[#020611]/80 backdrop-blur-md border border-[#183047]">
                MULTI-SPECTRAL SENTINEL-2
              </div>
            </div>
          </div>

          {/* Time Slider & Play Controls */}
          <div 
            className="bg-[#0A1624] border border-[#183047] rounded-xl p-4 sm:p-5 font-data space-y-4 select-none focus:outline-none focus:border-[#38BDF8]"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            role="slider"
            aria-label={`Observation year slider, currently ${currentYear}`}
            aria-valuenow={currentYear}
            aria-valuemin={2022}
            aria-valuemax={2026}
          >
            {/* Header / Play Controls Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-[#183047]">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#38BDF8]" />
                <span className="text-xs text-[#91A8BE] uppercase tracking-wider">
                  TIMELINE CONTROL (2022—2026)
                </span>
              </div>

              {/* Play / Pause / Replay Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePlayToggle}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#38BDF8] text-[#020611] font-heading font-bold text-xs hover:bg-[#22D3EE] transition-all shadow-md shadow-[#38BDF8]/20"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 fill-current" />
                      <span>PAUSE</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{currentYear === 2026 ? "REPLAY" : "PLAY TIMELINE"}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleReplay}
                  className="p-1.5 rounded-lg bg-[#0E1C2D] border border-[#183047] text-[#91A8BE] hover:text-[#38BDF8] transition-colors"
                  title="Reset to 2022 (Home)"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Stepped Year Buttons & Slider Track */}
            <div className="space-y-3 pt-2">
              {/* Year Buttons Strip */}
              <div className="grid grid-cols-5 gap-2">
                {years.map((yr) => {
                  const isCurrent = yr === currentYear;
                  return (
                    <button
                      key={yr}
                      onClick={() => setCurrentYear(yr)}
                      className={`py-2 px-1 rounded-lg text-center font-data transition-all border ${
                        isCurrent
                          ? 'bg-[#0E1C2D] border-[#38BDF8] text-[#38BDF8] font-bold shadow-md shadow-[#38BDF8]/15 scale-[1.02]'
                          : 'bg-[#06101D] border-[#183047] text-[#91A8BE] hover:text-[#E8F3FF] hover:border-[#587088]'
                      }`}
                    >
                      <div className="text-xs sm:text-sm">{yr}</div>
                      <div className="text-[9px] text-[#587088] hidden sm:block">
                        {yr === 2022 ? 'BASELINE' : `+${(yr - 2022) * 4}% SPRAWL`}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Slider Range Input */}
              <input
                type="range"
                min="2022"
                max="2026"
                step="1"
                value={currentYear}
                onChange={(e) => setCurrentYear(Number(e.target.value))}
                className="w-full accent-[#38BDF8] cursor-pointer bg-[#06101D] h-2 rounded-lg"
              />

              {/* Keyboard shortcuts hint */}
              <div className="flex items-center justify-between text-[10px] text-[#587088]">
                <span>KEYBOARD: ← PREV / NEXT → / SPACE PLAY</span>
                <span>OBSERVATION WINDOW: 5 YEARS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Telemetry Stats, Dynamic Insight & Evolution (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Dynamic Annual Statistics Card */}
          <div className="bg-[#0A1624] border border-[#183047] rounded-xl p-5 font-data space-y-4 shadow-lg">
            <div className="flex items-center justify-between pb-3 border-b border-[#183047]">
              <div>
                <span className="text-[10px] text-[#587088] uppercase block">ACTIVE YEAR METRICS</span>
                <span className="text-sm font-bold text-[#E8F3FF]">{currentYear} SPECTRAL DELTA</span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getSeverityBadge(activeYearData.changeIndexRating)}`}>
                {activeYearData.changeIndexRating || "NORMAL"}
              </span>
            </div>

            {/* 4 Vector Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-[#0E1C2D] border border-[#183047]">
                <div className="text-[10px] text-[#587088] uppercase">URBAN AREA</div>
                <div className="text-base font-bold text-[#38BDF8] mt-0.5">
                  +{activeYearData.urbanChangePct?.toFixed(1) || "0.0"}%
                </div>
                <div className="text-[9px] text-[#91A8BE]">BUILT-UP EXPANSION</div>
              </div>

              <div className="p-3 rounded-lg bg-[#0E1C2D] border border-[#183047]">
                <div className="text-[10px] text-[#587088] uppercase">VEGETATION</div>
                <div className="text-base font-bold text-[#F43F5E] mt-0.5">
                  {activeYearData.vegetationChangePct?.toFixed(1) || "0.0"}%
                </div>
                <div className="text-[9px] text-[#91A8BE]">NDVI GREEN COVER</div>
              </div>

              <div className="p-3 rounded-lg bg-[#0E1C2D] border border-[#183047]">
                <div className="text-[10px] text-[#587088] uppercase">WATER BODY</div>
                <div className="text-base font-bold text-[#FBBF24] mt-0.5">
                  {activeYearData.waterChangePct?.toFixed(1) || "0.0"}%
                </div>
                <div className="text-[9px] text-[#91A8BE]">NDWI HYDROLOGY</div>
              </div>

              <div className="p-3 rounded-lg bg-[#0E1C2D] border border-[#183047]">
                <div className="text-[10px] text-[#587088] uppercase">CHANGE INDEX</div>
                <div className="text-base font-bold text-[#22D3EE] mt-0.5">
                  {activeYearData.changeIndexScore || 0} <span className="text-xs text-[#587088]">/100</span>
                </div>
                <div className="text-[9px] text-[#91A8BE]">IMPACT SCORE</div>
              </div>
            </div>

            {/* Dynamic Insight Box */}
            <div className="p-3.5 rounded-lg bg-[#06101D] border border-[#183047] space-y-1.5">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#38BDF8] uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>TEMPORAL INSIGHT ({currentYear})</span>
              </div>
              <p className="text-xs text-[#91A8BE] leading-relaxed">
                {activeYearData.insight || "Baseline satellite observation established. Localized urban and vegetation changes detected."}
              </p>
            </div>
          </div>

          {/* 5-Year Cumulative Evolution Card */}
          <div className="bg-[#0A1624] border border-[#183047] rounded-xl p-5 font-data space-y-3 shadow-lg">
            <div className="flex items-center justify-between pb-2.5 border-b border-[#183047]">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#38BDF8]" />
                <span className="text-xs font-bold text-[#E8F3FF] uppercase tracking-wide">
                  5-YEAR EVOLUTION (2022 → 2026)
                </span>
              </div>
              <span className="text-[10px] text-[#22D3EE] font-bold">CUMULATIVE</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#91A8BE]">CUMULATIVE URBAN SPRAWL</span>
                <span className="text-[#38BDF8] font-bold">+{evolution.urbanTotalPct || 18.4}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#91A8BE]">NET VEGETATION DELTA</span>
                <span className="text-[#F43F5E] font-bold">{evolution.vegetationTotalPct || -9.2}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#91A8BE]">HYDROLOGICAL SHIFT</span>
                <span className="text-[#FBBF24] font-bold">{evolution.waterTotalPct || -3.1}%</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-[#183047]/60">
                <span className="text-[#587088]">OVERALL 5-YEAR CHANGE INDEX</span>
                <span className="text-[#22D3EE] font-bold">{evolution.overallChangeIndex || 72} / 100</span>
              </div>
            </div>

            {/* Direct Link to Full Temporal Explorer */}
            {onOpenTemporalExplorer && (
              <button
                onClick={onOpenTemporalExplorer}
                className="w-full mt-3 py-2.5 px-3 rounded-lg bg-[#0E1C2D] border border-[#183047] hover:border-[#38BDF8] text-[#38BDF8] font-heading font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all hover:bg-[#38BDF8]/10"
              >
                <span>OPEN FULL TEMPORAL EXPLORER</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
