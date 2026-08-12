import React from 'react';
import { Globe, ArrowRight, Shield, Radio, ChevronRight, Activity, MapPin } from 'lucide-react';

export default function LandingPage({ onStartAnalysis, onSelectCity, onOpenTemporalExplorer }) {
  const featuredCities = [
    { id: 'mumbai', name: 'Mumbai', state: 'Maharashtra', change: '+14.7% Urban Sprawl' },
    { id: 'delhi', name: 'Delhi', state: 'NCT Delhi', change: '+18.2% Infra Growth' },
    { id: 'bengaluru', name: 'Bengaluru', state: 'Karnataka', change: '-8.4% Green Canopy' },
    { id: 'chennai', name: 'Chennai', state: 'Tamil Nadu', change: '-3.2% Water Body Shift' },
    { id: 'ahmedabad', name: 'Ahmedabad', state: 'Gujarat', change: '+12.5% Industrial Zone' },
  ];

  return (
    <div className="min-h-screen bg-[#020611] space-bg flex flex-col justify-between selection:bg-[#38BDF8] selection:text-[#020611]">
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center flex flex-col items-center justify-center min-h-[80vh]">
        {/* Subtle Orbit Decorative Ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] sm:w-[650px] sm:h-[650px] rounded-full border border-[#183047]/40 pointer-events-none animate-[spin_60s_linear_infinite]">
          <div className="absolute top-0 left-1/2 w-2.5 h-2.5 bg-[#38BDF8] rounded-full shadow-[0_0_12px_#38BDF8]"></div>
        </div>

        {/* Minimal System Status Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0A1624] border border-[#183047] mb-8 shadow-xl">
          <span className="w-2.5 h-2.5 rounded-full bg-[#22D3EE] status-pulse-cyan"></span>
          <span className="text-xs font-data font-semibold text-[#22D3EE] tracking-wider uppercase">
            EARTH OBSERVATION SYSTEM ONLINE
          </span>
        </div>

        {/* Main Title */}
        <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#E8F3FF] max-w-4xl leading-tight">
          EARTHLENS <span className="text-[#38BDF8]">AI</span>
        </h1>

        {/* Tagline */}
        <p className="mt-4 font-heading text-lg sm:text-2xl font-semibold tracking-widest text-[#22D3EE] uppercase">
          SEE EARTH. DETECT CHANGE. UNDERSTAND IMPACT.
        </p>

        {/* Description */}
        <p className="mt-6 text-base sm:text-lg text-[#91A8BE] max-w-2xl font-normal leading-relaxed">
          AI-powered multi-spectral satellite intelligence for India&apos;s rapidly evolving megacities. 
          Detect urban sprawl, green cover transitions, and hydrological shifts with 10-meter precision.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={onStartAnalysis}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#38BDF8] text-[#020611] font-heading font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-3 hover:bg-[#22D3EE] shadow-lg shadow-[#38BDF8]/20 transition-all hover:scale-105"
          >
            <span>START ANALYSIS</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {onOpenTemporalExplorer && (
            <button
              onClick={onOpenTemporalExplorer}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#0E1C2D] border border-[#183047] hover:border-[#38BDF8] text-[#38BDF8] font-heading font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-3 transition-all hover:scale-105 shadow-md shadow-[#38BDF8]/10"
            >
              <span>⏱️ TEMPORAL EXPLORER (2022–2026)</span>
            </button>
          )}
        </div>

        {/* Quick Indian Cities Quick-Select Strip */}
        <div className="mt-16 w-full max-w-4xl">
          <p className="text-xs font-data text-[#587088] tracking-widest uppercase mb-4">
            SELECT AN INDIAN CITY TO BEGIN OBSERVATION
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {featuredCities.map((city) => (
              <button
                key={city.id}
                onClick={() => onSelectCity(city.id)}
                className="p-3 bg-[#0A1624] border border-[#183047] hover:border-[#38BDF8]/50 rounded-xl text-left transition-all hover:bg-[#0E1C2D] group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-heading font-bold text-sm text-[#E8F3FF] group-hover:text-[#38BDF8]">
                    {city.name}
                  </span>
                  <MapPin className="w-3.5 h-3.5 text-[#587088] group-hover:text-[#38BDF8]" />
                </div>
                <div className="text-[10px] font-data text-[#587088] mt-1">{city.state}</div>
                <div className="text-[10px] font-data text-[#34D399] mt-1 font-semibold">{city.change}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Pillars Footer */}
      <footer className="border-t border-[#183047] bg-[#06101D]/80 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 font-data text-xs">
          <div className="flex items-start gap-3 p-4 bg-[#0A1624] rounded-lg border border-[#183047]">
            <Radio className="w-5 h-5 text-[#38BDF8] shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-[#E8F3FF] uppercase mb-1">INDIAN CITY FOCUS</div>
              <p className="text-[#91A8BE] text-[11px] leading-relaxed">
                Dedicated high-resolution analysis across 20+ major Indian metropolitan centers.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-[#0A1624] rounded-lg border border-[#183047]">
            <Activity className="w-5 h-5 text-[#22D3EE] shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-[#E8F3FF] uppercase mb-1">COMPUTER VISION ENGINE</div>
              <p className="text-[#91A8BE] text-[11px] leading-relaxed">
                Spectral differencing (NDVI, NDWI, Built-up Index) with automatic polygon masking.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-[#0A1624] rounded-lg border border-[#183047]">
            <Shield className="w-5 h-5 text-[#34D399] shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-[#E8F3FF] uppercase mb-1">ZERO-CREDENTIAL GUARANTEE</div>
              <p className="text-[#91A8BE] text-[11px] leading-relaxed">
                100% self-contained local telemetry processing without paid API key requirements.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
