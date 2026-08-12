import React, { useState, useEffect } from 'react';
import { Activity, Building2, Layers, AlertCircle, ArrowUpRight, Radio, Search } from 'lucide-react';
import IndiaMap from '../components/IndiaMap';

export default function Dashboard({ onSelectCity, onNavigateAnalyze, onOpenTemporalExplorer }) {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchError, setSearchError] = useState('');

  useEffect(() => {
    fetch('/api/cities')
      .then((res) => res.json())
      .then((data) => {
        setCities(data);
        if (data.length > 0) setSelectedCity(data[0]); // Default Mumbai
      })
      .catch((err) => console.error("Error fetching cities:", err));
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    fetch(`/api/cities/search?query=${encodeURIComponent(searchQuery)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.found && data.city) {
          setSelectedCity(data.city);
          setSearchError('');
        } else {
          setSearchError(data.message || 'EarthLens currently supports Indian cities only.');
        }
      });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 space-bg min-h-screen">
      {/* Dashboard Title & Telemetry Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#183047]">
        <div>
          <div className="flex items-center gap-2 text-xs font-data text-[#38BDF8] tracking-widest uppercase mb-1">
            <Radio className="w-4 h-4 text-[#22D3EE] animate-pulse" />
            INDIAN EARTH OBSERVATION INTELLIGENCE
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#E8F3FF] tracking-tight">
            EARTHLENS COMMAND CENTER
          </h1>
        </div>

        {/* City Search Bar with Indian Scope Validation */}
        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSearchError('');
            }}
            placeholder="Search Indian City (e.g. Mumbai)..."
            className="w-full bg-[#0A1624] border border-[#183047] rounded-lg pl-9 pr-4 py-2 text-xs font-data text-[#E8F3FF] placeholder-[#587088] focus:outline-none focus:border-[#38BDF8]"
          />
          <Search className="w-4 h-4 text-[#587088] absolute left-3 top-2.5" />

          {searchError && (
            <div className="absolute top-11 left-0 right-0 z-50 p-2.5 bg-[#0E1C2D] border border-[#F43F5E] rounded-lg font-data text-xs text-[#F43F5E] flex items-center gap-2 shadow-xl">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{searchError}</span>
            </div>
          )}
        </form>
      </div>

      {/* Mission Control Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-data">
        <div className="bg-[#0A1624] border border-[#183047] p-4 rounded-xl relative overflow-hidden group hover:border-[#38BDF8]/50 transition-all">
          <div className="text-[11px] text-[#91A8BE] tracking-wider uppercase mb-1">CITIES ANALYZED</div>
          <div className="text-2xl sm:text-3xl font-bold text-[#E8F3FF] tracking-tight">24</div>
          <div className="text-[10px] text-[#22D3EE] mt-1 flex items-center gap-1">
            <span>● 100% Indian Urban Coverage</span>
          </div>
        </div>

        <div className="bg-[#0A1624] border border-[#183047] p-4 rounded-xl relative overflow-hidden group hover:border-[#38BDF8]/50 transition-all">
          <div className="text-[11px] text-[#91A8BE] tracking-wider uppercase mb-1">TOTAL ANALYSES</div>
          <div className="text-2xl sm:text-3xl font-bold text-[#38BDF8] tracking-tight">1,248</div>
          <div className="text-[10px] text-[#587088] mt-1">Multi-spectral passes</div>
        </div>

        <div className="bg-[#0A1624] border border-[#183047] p-4 rounded-xl relative overflow-hidden group hover:border-[#38BDF8]/50 transition-all">
          <div className="text-[11px] text-[#91A8BE] tracking-wider uppercase mb-1">CHANGES DETECTED</div>
          <div className="text-2xl sm:text-3xl font-bold text-[#34D399] tracking-tight">486</div>
          <div className="text-[10px] text-[#34D399] mt-1">Ground surface shifts</div>
        </div>

        <div className="bg-[#0A1624] border border-[#183047] p-4 rounded-xl relative overflow-hidden group hover:border-[#F43F5E]/50 transition-all">
          <div className="text-[11px] text-[#91A8BE] tracking-wider uppercase mb-1">HIGH IMPACT ALERTS</div>
          <div className="text-2xl sm:text-3xl font-bold text-[#F43F5E] tracking-tight">27</div>
          <div className="text-[10px] text-[#F43F5E] mt-1">Requires audit review</div>
        </div>
      </div>

      {/* Main Grid: Map + Selected City Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* India Map Component (Spans 2 cols) */}
        <div className="lg:col-span-2 space-y-3">
          <IndiaMap
            cities={cities}
            selectedCity={selectedCity}
            onSelectCity={(city) => setSelectedCity(city)}
            mapHeight="500px"
          />
        </div>

        {/* Selected City Telemetry Card */}
        <div className="bg-[#0A1624] border border-[#183047] rounded-xl p-5 flex flex-col justify-between space-y-4">
          {selectedCity ? (
            <>
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#183047]">
                  <div>
                    <h2 className="font-heading text-xl font-bold text-[#38BDF8]">
                      {selectedCity.name}
                    </h2>
                    <p className="font-data text-xs text-[#91A8BE]">{selectedCity.state}, India</p>
                  </div>
                  <span className="font-data text-[10px] text-[#22D3EE] px-2 py-0.5 rounded bg-[#22D3EE]/10 border border-[#22D3EE]/30">
                    LIVE TARGET
                  </span>
                </div>

                <div className="mt-4 font-data text-xs space-y-2.5">
                  <div className="flex justify-between py-1 border-b border-[#183047]/50">
                    <span className="text-[#587088]">LATITUDE:</span>
                    <span className="text-[#E8F3FF] font-bold">{selectedCity.lat.toFixed(4)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#183047]/50">
                    <span className="text-[#587088]">LONGITUDE:</span>
                    <span className="text-[#E8F3FF] font-bold">{selectedCity.lon.toFixed(4)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#183047]/50">
                    <span className="text-[#587088]">COVERAGE:</span>
                    <span className="text-[#34D399] font-bold">100% Sentinel-2</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#183047]/50">
                    <span className="text-[#587088]">AVAILABLE YEARS:</span>
                    <span className="text-[#38BDF8] font-bold">2021 – 2026</span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-[#06101D] border border-[#183047] rounded-lg text-xs font-data text-[#91A8BE] leading-relaxed">
                  {selectedCity.description}
                </div>
              </div>

              <button
                onClick={() => {
                  if (onSelectCity) onSelectCity(selectedCity.id);
                  if (onNavigateAnalyze) onNavigateAnalyze();
                }}
                className="w-full py-3 rounded-lg bg-[#38BDF8] text-[#020611] font-heading font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#22D3EE] transition-colors"
              >
                <span>ANALYZE {selectedCity.name.toUpperCase()}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </>
          ) : (
            <div className="text-center py-12 text-xs font-data text-[#587088]">
              Select an Indian city node on the map to inspect telemetry.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
