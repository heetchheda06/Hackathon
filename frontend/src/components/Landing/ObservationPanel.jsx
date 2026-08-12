import React from 'react';
import { Radio, MapPin, Calendar, Database, CheckCircle2, ArrowRight } from 'lucide-react';
import { getCityTemporalData } from '../../data/temporalData';

export default function ObservationPanel({ 
  selectedCityId = 'mumbai', 
  onStartAnalysis, 
  onSelectCity,
  supportedCities = [] 
}) {
  const cityData = getCityTemporalData(selectedCityId);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
      <div className="bg-[#0A1624] border border-[#183047] rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-radial from-[#38BDF8]/10 via-transparent to-transparent blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Column: Mission Observation Instrument (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#22D3EE] status-pulse-cyan" />
              <span className="text-xs font-data font-bold text-[#22D3EE] uppercase tracking-widest">
                CURRENT OBSERVATION TARGET
              </span>
            </div>

            <div>
              <div className="flex items-baseline gap-3">
                <h3 className="font-heading text-3xl sm:text-4xl font-bold text-[#E8F3FF] tracking-tight">
                  {cityData.cityName}
                </h3>
                <span className="text-base font-data text-[#38BDF8]">
                  {cityData.state}
                </span>
              </div>
              <p className="mt-2 text-sm text-[#91A8BE] leading-relaxed max-w-xl">
                {cityData.description || "Active high-resolution multi-spectral satellite telemetry monitoring for urban sprawl, hydrological shifts, and vegetation dynamics."}
              </p>
            </div>

            {/* Aerospace Instrument Telemetry Readouts */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-data">
              <div className="p-3 rounded-xl bg-[#0E1C2D] border border-[#183047]">
                <div className="text-[10px] text-[#587088] uppercase">COORDINATES</div>
                <div className="text-xs font-bold text-[#E8F3FF] mt-1">
                  {cityData.lat?.toFixed(4)}° N
                </div>
                <div className="text-[10px] text-[#38BDF8]">
                  {cityData.lon?.toFixed(4)}° E
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#0E1C2D] border border-[#183047]">
                <div className="text-[10px] text-[#587088] uppercase">TEMPORAL RANGE</div>
                <div className="text-xs font-bold text-[#34D399] mt-1">
                  2022 — 2026
                </div>
                <div className="text-[10px] text-[#587088]">
                  5-YEAR EPOCHS
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#0E1C2D] border border-[#183047]">
                <div className="text-[10px] text-[#587088] uppercase">DATA MODE</div>
                <div className="text-xs font-bold text-[#FBBF24] mt-1">
                  DEMO ANALYSIS
                </div>
                <div className="text-[10px] text-[#587088]">
                  LOCAL CV ENGINE
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#0E1C2D] border border-[#183047]">
                <div className="text-[10px] text-[#587088] uppercase">SENSOR STATUS</div>
                <div className="text-xs font-bold text-[#22D3EE] mt-1">
                  READY
                </div>
                <div className="text-[10px] text-[#587088]">
                  SENTINEL-2 MSI
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: City Quick-Switch & Immediate Action (5 cols) */}
          <div className="lg:col-span-5 bg-[#06101D] border border-[#183047] rounded-xl p-5 space-y-4 font-data">
            <div className="flex items-center justify-between pb-3 border-b border-[#183047]">
              <span className="text-xs text-[#91A8BE] uppercase tracking-wider">
                SWITCH ACTIVE CITY TARGET
              </span>
              <span className="text-[10px] text-[#38BDF8] font-bold">20+ METROS</span>
            </div>

            {/* City Selector Dropdown */}
            <div>
              <label className="text-[10px] text-[#587088] uppercase tracking-widest block mb-1.5">
                SELECT INDIAN METRO
              </label>
              <select
                value={selectedCityId}
                onChange={(e) => onSelectCity(e.target.value)}
                className="w-full bg-[#0E1C2D] border border-[#183047] hover:border-[#38BDF8] text-[#E8F3FF] text-sm rounded-xl px-4 py-3 font-sans focus:outline-none focus:border-[#38BDF8] transition-colors cursor-pointer"
              >
                {supportedCities.map((city) => (
                  <option key={city.id} value={city.id} className="bg-[#0A1624] text-[#E8F3FF]">
                    {city.name}, {city.state}
                  </option>
                ))}
              </select>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-2.5">
              <button
                onClick={onStartAnalysis}
                className="w-full py-3.5 px-4 rounded-xl bg-[#38BDF8] text-[#020611] font-heading font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-[#22D3EE] shadow-lg shadow-[#38BDF8]/20 transition-all hover:scale-[1.02]"
              >
                <span>RUN COMPUTER VISION ANALYSIS</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
