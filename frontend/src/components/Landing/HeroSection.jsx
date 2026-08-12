import React from 'react';
import { ArrowRight, Layers, MapPin, Radio, Sparkles, ChevronDown } from 'lucide-react';
import IndiaSilhouette from './IndiaSilhouette';

export default function HeroSection({
  selectedCityId = 'mumbai',
  onSelectCity,
  onStartAnalysis,
  onOpenTemporalExplorer,
  supportedCities = []
}) {
  const selectedCityObj = supportedCities.find(c => c.id === selectedCityId) || {
    id: 'mumbai',
    name: 'Mumbai',
    state: 'Maharashtra'
  };

  return (
    <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full min-h-[85vh] flex flex-col justify-center">
      {/* Background Subtle Radial Cyan/Blue Atmospheric Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-radial from-[#38BDF8]/8 via-transparent to-transparent blur-3xl pointer-events-none" />

      {/* Decorative Subtle Orbital Line */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full border border-[#183047]/30 pointer-events-none hidden lg:block animate-[spin_120s_linear_infinite]">
        <div className="absolute top-0 left-1/2 w-2 h-2 bg-[#38BDF8] rounded-full shadow-[0_0_10px_#38BDF8]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Mission Control Hero Content (7 cols) */}
        <div className="lg:col-span-7 text-left space-y-6">
          {/* Mission Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0A1624] border border-[#183047] shadow-xl">
            <span className="w-2 h-2 rounded-full bg-[#22D3EE] status-pulse-cyan" />
            <span className="text-xs font-data font-bold text-[#22D3EE] tracking-wider uppercase">
              EARTH OBSERVATION SYSTEM ONLINE
            </span>
          </div>

          {/* Main Title */}
          <div>
            <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#E8F3FF] leading-tight">
              EARTHLENS <span className="text-[#38BDF8]">AI</span>
            </h1>

            {/* Tagline */}
            <p className="mt-3 font-heading text-lg sm:text-2xl font-bold tracking-widest text-[#22D3EE] uppercase">
              SEE EARTH. DETECT CHANGE. UNDERSTAND IMPACT.
            </p>
          </div>

          {/* Supporting Statement & Description */}
          <div className="space-y-2">
            <p className="text-base sm:text-lg font-semibold text-[#E8F3FF]">
              AI-powered Earth observation for India&apos;s changing cities.
            </p>
            <p className="text-sm sm:text-base text-[#91A8BE] max-w-xl font-normal leading-relaxed">
              Explore how India&apos;s cities evolve through satellite imagery, computer vision, temporal analysis, and intelligent change detection.
            </p>
          </div>

          {/* City Selection Action Box */}
          <div className="pt-2 space-y-4 max-w-xl">
            {/* Prominent City Selector */}
            <div className="relative">
              <label className="block text-[11px] font-data text-[#587088] uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>SELECT AN INDIAN CITY TARGET</span>
              </label>
              
              <div className="relative">
                <select
                  value={selectedCityId}
                  onChange={(e) => onSelectCity(e.target.value)}
                  className="w-full appearance-none bg-[#0A1624] border border-[#183047] hover:border-[#38BDF8] focus:border-[#38BDF8] rounded-xl px-4 py-3.5 pr-10 text-sm sm:text-base font-heading font-bold text-[#E8F3FF] focus:outline-none transition-all cursor-pointer shadow-lg shadow-black/40"
                >
                  {supportedCities.map((city) => (
                    <option key={city.id} value={city.id} className="bg-[#0A1624] text-[#E8F3FF]">
                      📍 {city.name}, {city.state}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#38BDF8]">
                  <ChevronDown className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Primary & Secondary Dual Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-1">
              <button
                onClick={onStartAnalysis}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#38BDF8] text-[#020611] font-heading font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-3 hover:bg-[#22D3EE] shadow-lg shadow-[#38BDF8]/20 transition-all hover:scale-105"
              >
                <Radio className="w-4 h-4 text-[#020611]" />
                <span>START ANALYSIS ({selectedCityObj.name})</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {onOpenTemporalExplorer && (
                <button
                  onClick={onOpenTemporalExplorer}
                  className="w-full sm:w-auto px-7 py-4 rounded-xl bg-[#0E1C2D] border border-[#183047] hover:border-[#38BDF8] text-[#38BDF8] font-heading font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2.5 transition-all hover:scale-105 shadow-md shadow-[#38BDF8]/10"
                >
                  <Layers className="w-4 h-4" />
                  <span>EXPLORE TIMELINE (2022–2026)</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: India Silhouette Visualization (5 cols) */}
        <div className="lg:col-span-5 flex items-center justify-center relative">
          <div className="w-full max-w-sm lg:max-w-none">
            <IndiaSilhouette 
              selectedCityId={selectedCityId}
              onSelectCity={onSelectCity}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
