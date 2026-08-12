import React, { useState, useRef, useEffect } from 'react';
import { Layers, Sliders, Eye, Zap } from 'lucide-react';

export default function SplitViewSlider({ beforeUrl, afterUrl, maskUrl, dateA, dateB, cityName }) {
  const [sliderPos, setSliderPos] = useState(50);
  const [viewMode, setViewMode] = useState('split'); // 'split' | 'before' | 'after' | 'mask'
  const [maskOpacity, setMaskOpacity] = useState(0.75);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pos = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pos);
  };

  const handleTouchMove = (e) => {
    if (!containerRef.current || !e.touches[0]) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const pos = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pos);
  };

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  return (
    <div className="bg-[#0A1624] border border-[#183047] rounded-xl overflow-hidden shadow-2xl flex flex-col">
      {/* Top Controls Bar */}
      <div className="px-4 py-3 bg-[#06101D] border-b border-[#183047] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-[#38BDF8]" />
          <span className="font-heading font-semibold text-xs text-[#E8F3FF] tracking-wider uppercase">
            {cityName} SATELLITE COMPARISON
          </span>
        </div>

        {/* View Mode Toggle Buttons */}
        <div className="flex items-center gap-1 bg-[#020611] p-1 rounded-lg border border-[#183047]">
          <button
            onClick={() => setViewMode('split')}
            className={`px-3 py-1 rounded text-xs font-data transition-all ${
              viewMode === 'split'
                ? 'bg-[#38BDF8] text-[#020611] font-bold shadow'
                : 'text-[#91A8BE] hover:text-[#E8F3FF]'
            }`}
          >
            SPLIT VIEW
          </button>
          <button
            onClick={() => setViewMode('before')}
            className={`px-3 py-1 rounded text-xs font-data transition-all ${
              viewMode === 'before'
                ? 'bg-[#38BDF8] text-[#020611] font-bold shadow'
                : 'text-[#91A8BE] hover:text-[#E8F3FF]'
            }`}
          >
            BEFORE
          </button>
          <button
            onClick={() => setViewMode('after')}
            className={`px-3 py-1 rounded text-xs font-data transition-all ${
              viewMode === 'after'
                ? 'bg-[#38BDF8] text-[#020611] font-bold shadow'
                : 'text-[#91A8BE] hover:text-[#E8F3FF]'
            }`}
          >
            AFTER
          </button>
          <button
            onClick={() => setViewMode('mask')}
            className={`px-3 py-1 rounded text-xs font-data flex items-center gap-1 transition-all ${
              viewMode === 'mask'
                ? 'bg-[#F43F5E] text-white font-bold shadow'
                : 'text-[#F43F5E] hover:bg-[#F43F5E]/10'
            }`}
          >
            <Zap className="w-3 h-3" />
            CHANGE MASK
          </button>
        </div>
      </div>

      {/* Main Image Display Area */}
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative w-full h-[420px] sm:h-[480px] bg-[#020611] select-none overflow-hidden cursor-ew-resize"
      >
        {/* Mode 1: Split View */}
        {viewMode === 'split' && (
          <>
            {/* AFTER Image (Background) */}
            <div className="absolute inset-0">
              <img 
                src={afterUrl} 
                alt={`After - ${dateB}`} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 bg-[#020611]/80 backdrop-blur border border-[#183047] px-2.5 py-1 rounded text-xs font-data text-[#38BDF8]">
                AFTER: <span className="text-[#E8F3FF] font-semibold">{dateB}</span>
              </div>
            </div>

            {/* BEFORE Image (Clipped Foreground) */}
            <div 
              className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-[#38BDF8]"
              style={{ width: `${sliderPos}%` }}
            >
              <img 
                src={beforeUrl} 
                alt={`Before - ${dateA}`} 
                className="absolute inset-0 w-full h-full object-cover max-w-none"
                style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
              />
              <div className="absolute top-3 left-3 bg-[#020611]/80 backdrop-blur border border-[#183047] px-2.5 py-1 rounded text-xs font-data text-[#34D399]">
                BEFORE: <span className="text-[#E8F3FF] font-semibold">{dateA}</span>
              </div>
            </div>

            {/* Slider Drag Line & Handle */}
            <div 
              onMouseDown={handleMouseDown}
              onTouchStart={handleMouseDown}
              className="absolute top-0 bottom-0 z-20 flex items-center justify-center -ml-4 w-8 cursor-ew-resize group"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="w-1 h-full bg-[#38BDF8] shadow-[0_0_10px_#38BDF8]"></div>
              <div className="absolute w-8 h-8 rounded-full bg-[#0E1C2D] border-2 border-[#38BDF8] shadow-lg flex items-center justify-center text-[#38BDF8] group-hover:scale-110 transition-transform">
                <Sliders className="w-4 h-4" />
              </div>
            </div>
          </>
        )}

        {/* Mode 2: BEFORE Single View */}
        {viewMode === 'before' && (
          <div className="w-full h-full relative">
            <img src={beforeUrl} alt="Before" className="w-full h-full object-cover" />
            <div className="absolute top-3 left-3 bg-[#020611]/80 backdrop-blur border border-[#183047] px-3 py-1.5 rounded text-xs font-data text-[#34D399]">
              OBSERVATION DATE A: <span className="text-[#E8F3FF] font-semibold">{dateA}</span>
            </div>
          </div>
        )}

        {/* Mode 3: AFTER Single View */}
        {viewMode === 'after' && (
          <div className="w-full h-full relative">
            <img src={afterUrl} alt="After" className="w-full h-full object-cover" />
            <div className="absolute top-3 left-3 bg-[#020611]/80 backdrop-blur border border-[#183047] px-3 py-1.5 rounded text-xs font-data text-[#38BDF8]">
              OBSERVATION DATE B: <span className="text-[#E8F3FF] font-semibold">{dateB}</span>
            </div>
          </div>
        )}

        {/* Mode 4: CHANGE MASK View */}
        {viewMode === 'mask' && (
          <div className="w-full h-full relative">
            {/* Background Image */}
            <img src={afterUrl} alt="After Background" className="w-full h-full object-cover" />
            {/* Change Mask Overlay */}
            <img 
              src={maskUrl} 
              alt="Change Mask" 
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-200"
              style={{ opacity: maskOpacity }}
            />
            
            <div className="absolute top-3 left-3 bg-[#020611]/80 backdrop-blur border border-[#F43F5E]/40 px-3 py-1.5 rounded text-xs font-data text-[#F43F5E] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F43F5E] animate-ping"></span>
              SPECTRAL DIFFERENCING MASK ACTIVE
            </div>

            {/* Opacity Control slider */}
            <div className="absolute bottom-3 right-3 bg-[#020611]/90 backdrop-blur border border-[#183047] px-3 py-2 rounded-lg flex items-center gap-2 text-xs font-data">
              <span className="text-[#91A8BE]">Mask Opacity:</span>
              <input 
                type="range" 
                min="0.1" 
                max="1.0" 
                step="0.05"
                value={maskOpacity}
                onChange={(e) => setMaskOpacity(parseFloat(e.target.value))}
                className="w-24 accent-[#F43F5E] cursor-pointer"
              />
              <span className="text-[#E8F3FF] font-bold w-8 text-right">{Math.round(maskOpacity * 100)}%</span>
            </div>
          </div>
        )}
      </div>

      {/* Footer Instructions */}
      <div className="px-4 py-2 bg-[#06101D] border-t border-[#183047] text-[11px] font-data text-[#587088] flex items-center justify-between">
        <span>Sentinel-2 10m Multi-Spectral Differencing</span>
        <span>Drag handle to visually compare temporal changes</span>
      </div>
    </div>
  );
}
