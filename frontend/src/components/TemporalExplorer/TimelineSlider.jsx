import React, { useRef, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

export default function TimelineSlider({
  selectedYear,
  onChangeYear,
  availableYears = [2022, 2023, 2024, 2025, 2026],
  isPlaying = false
}) {
  const sliderRef = useRef(null);
  const minYear = availableYears[0];
  const maxYear = availableYears[availableYears.length - 1];

  // Keyboard accessibility
  const handleKeyDown = (e) => {
    const currentIndex = availableYears.indexOf(selectedYear);
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      if (currentIndex > 0) onChangeYear(availableYears[currentIndex - 1]);
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (currentIndex < availableYears.length - 1) onChangeYear(availableYears[currentIndex + 1]);
    } else if (e.key === 'Home') {
      e.preventDefault();
      onChangeYear(minYear);
    } else if (e.key === 'End') {
      e.preventDefault();
      onChangeYear(maxYear);
    }
  };

  const getPercentage = (year) => {
    return ((year - minYear) / (maxYear - minYear)) * 100;
  };

  const handleTrackClick = (e) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    
    // Find closest year
    let closest = availableYears[0];
    let minDiff = Infinity;
    availableYears.forEach((yr) => {
      const yrPct = (yr - minYear) / (maxYear - minYear);
      const diff = Math.abs(yrPct - pct);
      if (diff < minDiff) {
        minDiff = diff;
        closest = yr;
      }
    });
    onChangeYear(closest);
  };

  return (
    <div 
      className="bg-[#0A1624] border border-[#183047] rounded-xl p-4 sm:p-5 space-y-4 font-data select-none focus:outline-none focus:border-[#38BDF8]"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      role="slider"
      aria-label={`Temporal year slider, currently ${selectedYear}`}
      aria-valuenow={selectedYear}
      aria-valuemin={minYear}
      aria-valuemax={maxYear}
    >
      {/* Header telemetry & Year Display */}
      <div className="flex items-center justify-between pb-3 border-b border-[#183047]">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#38BDF8]" />
          <span className="text-xs text-[#91A8BE] tracking-wider uppercase">
            TEMPORAL OBSERVATION EPOCH
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const idx = availableYears.indexOf(selectedYear);
              if (idx > 0) onChangeYear(availableYears[idx - 1]);
            }}
            disabled={selectedYear === minYear}
            className="p-1 rounded bg-[#0E1C2D] border border-[#183047] text-[#91A8BE] hover:text-[#38BDF8] disabled:opacity-30 disabled:hover:text-[#91A8BE] transition-colors"
            title="Previous Year (←)"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="px-3 py-1 rounded bg-[#0E1C2D] border border-[#38BDF8]/40 shadow-sm shadow-[#38BDF8]/10 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#22D3EE] status-pulse-cyan"></span>
            <span className="text-sm sm:text-base font-bold text-[#E8F3FF] tracking-wider">
              {selectedYear}
            </span>
          </div>

          <button
            onClick={() => {
              const idx = availableYears.indexOf(selectedYear);
              if (idx < availableYears.length - 1) onChangeYear(availableYears[idx + 1]);
            }}
            disabled={selectedYear === maxYear}
            className="p-1 rounded bg-[#0E1C2D] border border-[#183047] text-[#91A8BE] hover:text-[#38BDF8] disabled:opacity-30 disabled:hover:text-[#91A8BE] transition-colors"
            title="Next Year (→)"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Timeline Track */}
      <div className="pt-2 pb-1 px-3 sm:px-6">
        <div 
          ref={sliderRef}
          onClick={handleTrackClick}
          className="relative h-3 bg-[#06101D] border border-[#183047] rounded-full cursor-pointer group"
        >
          {/* Progress fill line */}
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#38BDF8]/40 to-[#22D3EE] rounded-full transition-all duration-300"
            style={{ width: `${getPercentage(selectedYear)}%` }}
          />

          {/* Draggable Active Indicator Handle */}
          <div 
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#020611] border-2 border-[#22D3EE] shadow-lg shadow-[#22D3EE]/30 flex items-center justify-center cursor-grab active:cursor-grabbing transition-all duration-300 group-hover:scale-110"
            style={{ left: `${getPercentage(selectedYear)}%` }}
          >
            <div className="w-2 h-2 rounded-full bg-[#22D3EE]" />
          </div>

          {/* Year Milestone Ticks on Track */}
          {availableYears.map((year) => {
            const pct = getPercentage(year);
            const isCurrent = year === selectedYear;
            const isPast = year < selectedYear;

            return (
              <div 
                key={year}
                onClick={(e) => {
                  e.stopPropagation();
                  onChangeYear(year);
                }}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer group/tick"
                style={{ left: `${pct}%` }}
              >
                {/* Milestone Node */}
                <div 
                  className={`w-3.5 h-3.5 rounded-full border transition-all ${
                    isCurrent 
                      ? 'bg-[#22D3EE] border-[#E8F3FF] scale-125 shadow-md shadow-[#22D3EE]/50' 
                      : isPast 
                        ? 'bg-[#38BDF8]/60 border-[#38BDF8]' 
                        : 'bg-[#0E1C2D] border-[#183047] group-hover/tick:border-[#38BDF8]'
                  }`}
                />

                {/* Milestone Label */}
                <div className={`mt-5 text-[11px] sm:text-xs font-semibold tracking-wider transition-colors ${
                  isCurrent 
                    ? 'text-[#22D3EE] scale-110' 
                    : 'text-[#587088] group-hover/tick:text-[#E8F3FF]'
                }`}>
                  {year}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Keyboard Shortcuts Helper Hint */}
      <div className="flex items-center justify-between text-[10px] text-[#587088] pt-4">
        <span>KEYBOARD: [← / →] PREV/NEXT YEAR</span>
        <span>[HOME / END] MIN/MAX</span>
      </div>
    </div>
  );
}
