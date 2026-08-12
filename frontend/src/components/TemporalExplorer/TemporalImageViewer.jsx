import React, { useState } from 'react';
import { Layers, Eye, EyeOff, Sparkles, Maximize2, Scale, Info, Radio } from 'lucide-react';

export default function TemporalImageViewer({
  cityName = "Mumbai",
  stateName = "Maharashtra",
  lat = 19.0760,
  lon = 72.8777,
  year = 2024,
  imageUrl = "/static/mumbai/after_2026-01.png",
  overlayPolygons = [],
  showOverlay = true,
  onToggleOverlay,
  onOpenCompare
}) {
  const [hoveredPolygon, setHoveredPolygon] = useState(null);

  const getPolygonStyle = (type, severity) => {
    switch (type) {
      case 'vegetation':
        return {
          fill: 'rgba(52, 211, 153, 0.25)',
          stroke: '#34D399',
          filter: 'drop-shadow(0 0 6px rgba(52, 211, 153, 0.6))'
        };
      case 'water':
        return {
          fill: 'rgba(56, 189, 248, 0.3)',
          stroke: '#38BDF8',
          filter: 'drop-shadow(0 0 6px rgba(56, 189, 248, 0.6))'
        };
      case 'infrastructure':
        return {
          fill: 'rgba(251, 191, 36, 0.25)',
          stroke: '#FBBF24',
          filter: 'drop-shadow(0 0 6px rgba(251, 191, 36, 0.6))'
        };
      case 'urban':
      default:
        return {
          fill: 'rgba(244, 63, 94, 0.25)',
          stroke: '#F43F5E',
          filter: 'drop-shadow(0 0 6px rgba(244, 63, 94, 0.6))'
        };
    }
  };

  return (
    <div className="bg-[#0A1624] border border-[#183047] rounded-xl overflow-hidden font-data relative flex flex-col shadow-2xl">
      {/* Top Telemetry Header Bar */}
      <div className="px-4 py-3 bg-[#06101D] border-b border-[#183047] flex flex-wrap items-center justify-between gap-3 z-20">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-[#22D3EE] animate-pulse" />
          <span className="text-xs font-bold text-[#E8F3FF] tracking-wider uppercase">
            {cityName} SATELLITE RASTER
          </span>
          <span className="text-[10px] text-[#38BDF8] px-2 py-0.5 rounded bg-[#38BDF8]/10 border border-[#38BDF8]/30 font-semibold">
            {year} EPOCH
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Change Overlay Toggle Button */}
          <button
            onClick={onToggleOverlay}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              showOverlay
                ? 'bg-[#F43F5E]/20 text-[#F43F5E] border border-[#F43F5E]/60 shadow-sm shadow-[#F43F5E]/20'
                : 'bg-[#0E1C2D] text-[#91A8BE] hover:text-[#E8F3FF] border border-[#183047]'
            }`}
            title="Toggle Detected Change Overlay Regions"
          >
            {showOverlay ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>CHANGE OVERLAY</span>
          </button>

          {/* Quick Compare in Analyzer Button */}
          {onOpenCompare && (
            <button
              onClick={onOpenCompare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0E1C2D] border border-[#183047] hover:bg-[#38BDF8] hover:text-[#020611] text-[#38BDF8] text-xs font-bold transition-all"
              title="Open in Split-View Comparison Analyzer"
            >
              <Scale className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">COMPARE YEARS</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Satellite Image Viewport */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-[#020611] overflow-hidden group">
        {/* Real Satellite Photo with smooth crossfade */}
        <img
          key={`${cityName}-${year}`}
          src={imageUrl}
          alt={`${cityName} Satellite View ${year}`}
          className="w-full h-full object-cover select-none transition-opacity duration-500 ease-in-out"
          onError={(e) => {
            // Fallback to static placeholder if image path fails
            e.target.src = "/static/mumbai/before_2023-01.png";
          }}
        />

        {/* Change Overlay Vector Polygons (SVG Layer) */}
        {showOverlay && overlayPolygons && overlayPolygons.length > 0 && (
          <svg className="absolute inset-0 w-full h-full pointer-events-auto z-10">
            {overlayPolygons.map((poly) => {
              const style = getPolygonStyle(poly.type, poly.severity);
              const isHovered = hoveredPolygon?.id === poly.id;

              return (
                <g key={poly.id}>
                  <polygon
                    points={poly.points}
                    style={{
                      fill: isHovered ? style.fill.replace('0.25', '0.45') : style.fill,
                      stroke: style.stroke,
                      strokeWidth: isHovered ? '2.5' : '1.5',
                      strokeDasharray: poly.type === 'infrastructure' ? '4 2' : 'none',
                      filter: style.filter,
                      transition: 'all 0.3s ease'
                    }}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredPolygon(poly)}
                    onMouseLeave={() => setHoveredPolygon(null)}
                  />
                </g>
              );
            })}
          </svg>
        )}

        {/* Hovered Zone Floating Tooltip */}
        {hoveredPolygon && (
          <div className="absolute top-4 right-4 z-30 p-3 rounded-lg bg-[#0A1624]/95 backdrop-blur-md border border-[#38BDF8]/60 text-xs shadow-2xl space-y-1">
            <div className="text-[#38BDF8] font-bold uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#22D3EE]" />
              <span>{hoveredPolygon.label}</span>
            </div>
            <div className="text-[11px] text-[#91A8BE] flex justify-between gap-4">
              <span>TYPE:</span>
              <span className="text-[#E8F3FF] uppercase font-semibold">{hoveredPolygon.type}</span>
            </div>
            <div className="text-[11px] text-[#91A8BE] flex justify-between gap-4">
              <span>SEVERITY:</span>
              <span className={`font-semibold ${
                hoveredPolygon.severity === 'HIGH' ? 'text-[#F43F5E]' : 'text-[#FBBF24]'
              }`}>
                {hoveredPolygon.severity}
              </span>
            </div>
          </div>
        )}

        {/* HUD Watermark & Sensor Telemetry Badges */}
        <div className="absolute bottom-3 left-3 z-20 flex flex-col gap-1.5 pointer-events-none">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#020611]/85 backdrop-blur-md border border-[#183047] text-[11px] text-[#E8F3FF]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE]" />
            <span className="font-bold">{cityName}</span>
            <span className="text-[#587088]">|</span>
            <span className="text-[#91A8BE]">{lat.toFixed(3)}°N, {lon.toFixed(3)}°E</span>
          </div>

          <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded bg-[#020611]/70 text-[10px] text-[#587088]">
            <span>10M MULTI-SPECTRAL (GSD)</span>
            <span>● BOA LEVEL-2A</span>
          </div>
        </div>

        {/* Year Big Telemetry Badge */}
        <div className="absolute bottom-3 right-3 z-20 px-3 py-1.5 rounded-lg bg-[#020611]/90 backdrop-blur-md border border-[#38BDF8]/40 shadow-lg text-right pointer-events-none">
          <div className="text-[9px] text-[#38BDF8] tracking-widest uppercase">OBSERVATION YEAR</div>
          <div className="text-xl sm:text-2xl font-bold text-[#E8F3FF] tracking-wider leading-none">
            {year}
          </div>
        </div>
      </div>
    </div>
  );
}
