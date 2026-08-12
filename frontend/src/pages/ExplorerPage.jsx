import React, { useState, useEffect } from 'react';
import { Layers, MapPin, Search, Radio, ChevronRight, Clock, Globe } from 'lucide-react';
import TemporalExplorer from '../components/TemporalExplorer/TemporalExplorer';

export default function ExplorerPage({ onSelectCity, onNavigateToAnalyzer }) {
  const [activeView, setActiveView] = useState('temporal'); // 'temporal' or 'catalog'
  const [cities, setCities] = useState([]);
  const [filterState, setFilterState] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/api/cities')
      .then((res) => res.json())
      .then((data) => setCities(data));
  }, []);

  const states = ['ALL', ...new Set(cities.map((c) => c.state))];

  const filteredCities = cities.filter((city) => {
    const matchesState = filterState === 'ALL' || city.state === filterState;
    const matchesSearch = city.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          city.state.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesState && matchesSearch;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 space-bg min-h-screen font-data">
      {/* Top View Selector Bar: Temporal Explorer vs Geospatial Catalog */}
      <div className="flex items-center justify-between gap-4 pb-2">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0A1624] border border-[#183047]">
          <button
            onClick={() => setActiveView('temporal')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeView === 'temporal'
                ? 'bg-[#38BDF8] text-[#020611] shadow-md shadow-[#38BDF8]/20'
                : 'text-[#91A8BE] hover:text-[#E8F3FF] hover:bg-[#0E1C2D]'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>TEMPORAL EXPLORER (2022–2026)</span>
          </button>

          <button
            onClick={() => setActiveView('catalog')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeView === 'catalog'
                ? 'bg-[#38BDF8] text-[#020611] shadow-md shadow-[#38BDF8]/20'
                : 'text-[#91A8BE] hover:text-[#E8F3FF] hover:bg-[#0E1C2D]'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>GEOSPATIAL CATALOG</span>
          </button>
        </div>
      </div>

      {/* Main View Render */}
      {activeView === 'temporal' ? (
        <TemporalExplorer
          initialCityId="mumbai"
          onSelectCityForAnalyze={onSelectCity}
          onNavigateToAnalyzer={onNavigateToAnalyzer}
        />
      ) : (
        /* Geospatial Catalog View */
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#183047]">
            <div>
              <span className="text-xs text-[#38BDF8] tracking-widest uppercase">
                GEOSPATIAL CATALOG
              </span>
              <h1 className="font-heading text-2xl font-bold text-[#E8F3FF]">
                INDIAN SATELLITE EXPLORER
              </h1>
            </div>

            {/* Search */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter Indian City..."
                className="w-full bg-[#0A1624] border border-[#183047] rounded-lg pl-9 pr-4 py-2 text-xs text-[#E8F3FF] placeholder-[#587088] focus:outline-none focus:border-[#38BDF8]"
              />
              <Search className="w-4 h-4 text-[#587088] absolute left-3 top-2.5" />
            </div>
          </div>

          {/* State Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-[#183047]">
            <span className="text-xs text-[#587088] uppercase shrink-0 mr-2">STATE:</span>
            {states.map((st) => (
              <button
                key={st}
                onClick={() => setFilterState(st)}
                className={`px-3 py-1 rounded text-xs shrink-0 transition-all ${
                  filterState === st
                    ? 'bg-[#38BDF8] text-[#020611] font-bold'
                    : 'bg-[#0A1624] text-[#91A8BE] hover:text-[#E8F3FF] border border-[#183047]'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Cities Catalog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCities.map((city) => (
              <div
                key={city.id}
                className="bg-[#0A1624] border border-[#183047] hover:border-[#38BDF8]/50 rounded-xl p-4 flex flex-col justify-between space-y-3 transition-all hover:bg-[#0E1C2D] group"
              >
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-[#183047]">
                    <div>
                      <h3 className="font-heading font-bold text-base text-[#E8F3FF] group-hover:text-[#38BDF8]">
                        {city.name}
                      </h3>
                      <p className="text-xs text-[#91A8BE]">{city.state}</p>
                    </div>
                    <div className="w-7 h-7 rounded-lg bg-[#0E1C2D] border border-[#183047] flex items-center justify-center text-[#38BDF8]">
                      <MapPin className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="mt-3 text-xs space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-[#587088]">COORDINATES:</span>
                      <span className="text-[#E8F3FF] font-semibold">{city.lat.toFixed(4)}, {city.lon.toFixed(4)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#587088]">COVERAGE:</span>
                      <span className="text-[#34D399] font-semibold">100% Sentinel-2</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#587088]">ANALYSIS TYPES:</span>
                      <span className="text-[#38BDF8]">{city.analysis_types.join(", ")}</span>
                    </div>
                  </div>

                  <p className="mt-3 text-xs text-[#91A8BE] leading-relaxed line-clamp-2">
                    {city.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#183047]">
                  <button
                    onClick={() => {
                      setActiveView('temporal');
                    }}
                    className="w-full py-2 rounded-lg bg-[#0E1C2D] border border-[#183047] hover:border-[#38BDF8] text-[#38BDF8] font-bold text-xs uppercase flex items-center justify-center gap-1 transition-all"
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>TIMELINE</span>
                  </button>

                  <button
                    onClick={() => onSelectCity(city.id)}
                    className="w-full py-2 rounded-lg bg-[#38BDF8]/15 border border-[#38BDF8]/40 hover:bg-[#38BDF8] hover:text-[#020611] text-[#38BDF8] font-bold text-xs uppercase flex items-center justify-center gap-1 transition-all"
                  >
                    <span>ANALYZE</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
