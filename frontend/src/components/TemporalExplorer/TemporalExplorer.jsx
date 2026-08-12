import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, RotateCcw, Search, Sparkles, 
  Radio, AlertCircle, ChevronRight 
} from 'lucide-react';
import TimelineSlider from './TimelineSlider';
import TemporalImageViewer from './TemporalImageViewer';
import TemporalStats from './TemporalStats';
import FiveYearEvolution from './FiveYearEvolution';
import { getCityTemporalData } from '../../data/temporalData';

export default function TemporalExplorer({
  initialCityId = 'mumbai',
  onSelectCityForAnalyze,
  onNavigateToAnalyzer
}) {
  const [cities, setCities] = useState([]);
  const [selectedCityId, setSelectedCityId] = useState(initialCityId);
  const [selectedYear, setSelectedYear] = useState(2024);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1500); // 1.5s per year
  const [showOverlay, setShowOverlay] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchError, setSearchError] = useState('');
  
  // Temporal Dataset State
  const [cityData, setCityData] = useState(() => getCityTemporalData(initialCityId));

  const availableYears = [2022, 2023, 2024, 2025, 2026];
  const timerRef = useRef(null);

  // Fetch cities list on mount
  useEffect(() => {
    fetch('/api/cities')
      .then((res) => res.json())
      .then((data) => {
        setCities(data);
      })
      .catch((err) => console.error("Error fetching cities:", err));
  }, []);

  // Update temporal dataset when city changes (try backend first, fallback to local dataset)
  useEffect(() => {
    if (!selectedCityId) return;

    fetch(`/api/temporal/${selectedCityId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Backend temporal API error");
        return res.json();
      })
      .then((data) => {
        // Transform backend response to frontend format
        const formatted = {
          cityId: data.city_id,
          cityName: data.city_name,
          state: data.state,
          lat: data.lat,
          lon: data.lon,
          mode: data.mode || "DEMO ANALYSIS",
          description: `Satellite telemetry observation for ${data.city_name}.`,
          fiveYearEvolution: {
            startYear: data.five_year_evolution.start_year,
            endYear: data.five_year_evolution.end_year,
            urbanTotalPct: data.five_year_evolution.urban_total_pct,
            vegetationTotalPct: data.five_year_evolution.vegetation_total_pct,
            waterTotalPct: data.five_year_evolution.water_total_pct,
            infrastructureTotalPct: data.five_year_evolution.infrastructure_total_pct,
            overallChangeIndex: data.five_year_evolution.overall_change_index,
            overallSeverity: data.five_year_evolution.overall_severity,
            summary: data.five_year_evolution.summary
          },
          years: {}
        };

        Object.keys(data.years).forEach((yr) => {
          const y = data.years[yr];
          formatted.years[yr] = {
            year: y.year,
            label: y.label,
            urbanChangePct: y.urban_change_pct,
            vegetationChangePct: y.vegetation_change_pct,
            waterChangePct: y.water_change_pct,
            infrastructureChangePct: y.infrastructure_change_pct,
            totalAreaKm2: y.total_area_km2,
            changeIndexScore: y.change_index_score,
            changeIndexRating: y.change_index_rating,
            insight: y.insight,
            image: y.image_url,
            overlayPolygons: (y.overlay_polygons || []).map((p, idx) => ({
              id: p.id || `poly-${yr}-${idx}`,
              label: p.label || "Detected Change Zone",
              type: p.type || "urban",
              severity: p.severity || "MODERATE",
              points: "45%,20% 85%,18% 88%,55% 48%,58%"
            }))
          };
        });

        setCityData(formatted);
      })
      .catch(() => {
        // Fallback to rich client-side temporal dataset
        const cityObj = cities.find((c) => c.id === selectedCityId);
        setCityData(getCityTemporalData(selectedCityId, cityObj));
      });
  }, [selectedCityId, cities]);

  // Handle Playback Loop
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setSelectedYear((prev) => {
          const currentIndex = availableYears.indexOf(prev);
          if (currentIndex < availableYears.length - 1) {
            return availableYears[currentIndex + 1];
          } else {
            // Reached 2026, stop playback or loop
            setIsPlaying(false);
            return prev;
          }
        });
      }, playbackSpeed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playbackSpeed]);

  const handlePlayToggle = () => {
    if (selectedYear === 2026 && !isPlaying) {
      // If at end, start from 2022
      setSelectedYear(2022);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReplay = () => {
    setSelectedYear(2022);
    setIsPlaying(true);
  };

  const handleCitySelect = (cityId) => {
    setSelectedCityId(cityId);
    setSelectedYear(2024);
    setIsPlaying(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    fetch(`/api/cities/search?query=${encodeURIComponent(searchQuery)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.found && data.city) {
          handleCitySelect(data.city.id);
          setSearchError('');
          setSearchQuery('');
        } else {
          setSearchError(data.message || 'EarthLens currently supports Indian cities only.');
        }
      })
      .catch(() => {
        setSearchError('EarthLens currently supports Indian cities only.');
      });
  };

  const currentYearData = cityData.years?.[selectedYear] || {
    year: selectedYear,
    label: `Year ${selectedYear}`,
    urbanChangePct: 0,
    vegetationChangePct: 0,
    waterChangePct: 0,
    infrastructureChangePct: 0,
    changeIndexScore: 0,
    changeIndexRating: "BASELINE",
    insight: `Observation established for ${cityData.cityName}.`,
    image: "/static/mumbai/before_2023-01.png",
    overlayPolygons: []
  };

  return (
    <div className="space-y-6 font-data">
      {/* Top Mission Header & Indian City Selector Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#183047]">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#38BDF8] tracking-widest uppercase mb-1">
            <Radio className="w-3.5 h-3.5 text-[#22D3EE] animate-pulse" />
            <span>TEMPORAL EARTH OBSERVATION EXPLORER</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#E8F3FF] tracking-tight">
            WATCH INDIA CHANGE THROUGH TIME
          </h1>
        </div>

        {/* City Dropdown & Search Filter */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Indian Cities Dropdown */}
          <div className="relative">
            <select
              value={selectedCityId}
              onChange={(e) => handleCitySelect(e.target.value)}
              className="bg-[#0A1624] border border-[#183047] hover:border-[#38BDF8]/60 rounded-lg px-3.5 py-2 text-xs font-data text-[#E8F3FF] focus:outline-none focus:border-[#38BDF8] cursor-pointer appearance-none pr-8"
            >
              {cities.length > 0 ? (
                cities.map((c) => (
                  <option key={c.id} value={c.id} className="bg-[#0A1624] text-[#E8F3FF]">
                    {c.name} ({c.state})
                  </option>
                ))
              ) : (
                <option value="mumbai">Mumbai (Maharashtra)</option>
              )}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#91A8BE]">
              <ChevronRight className="w-4 h-4 rotate-90" />
            </div>
          </div>

          {/* Quick Search with Validation */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSearchError('');
              }}
              placeholder="Search Indian City..."
              className="w-44 sm:w-56 bg-[#0A1624] border border-[#183047] rounded-lg pl-8 pr-3 py-2 text-xs text-[#E8F3FF] placeholder-[#587088] focus:outline-none focus:border-[#38BDF8]"
            />
            <Search className="w-3.5 h-3.5 text-[#587088] absolute left-2.5 top-2.5" />

            {searchError && (
              <div className="absolute top-11 right-0 z-50 p-2.5 bg-[#0E1C2D] border border-[#F43F5E] rounded-lg text-xs text-[#F43F5E] flex items-center gap-2 shadow-2xl w-64">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{searchError}</span>
              </div>
            )}
          </form>

          {/* Mode Tag */}
          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0E1C2D] border border-[#183047] text-xs text-[#38BDF8]">
            <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
            <span>MODE: DEMO ANALYSIS</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Visualizer & Timeline Slider / Right Telemetry & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Satellite Viewer & Time Slider Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Satellite Image Viewer */}
          <TemporalImageViewer
            cityName={cityData.cityName}
            stateName={cityData.state}
            lat={cityData.lat}
            lon={cityData.lon}
            year={selectedYear}
            imageUrl={currentYearData.image}
            overlayPolygons={currentYearData.overlayPolygons}
            showOverlay={showOverlay}
            onToggleOverlay={() => setShowOverlay(!showOverlay)}
            onOpenCompare={() => {
              if (onNavigateToAnalyzer) {
                onNavigateToAnalyzer(cityData.cityId, '2022', '2026');
              }
            }}
          />

          {/* Draggable Horizontal Timeline Slider */}
          <TimelineSlider
            selectedYear={selectedYear}
            onChangeYear={(yr) => {
              setSelectedYear(yr);
              setIsPlaying(false);
            }}
            availableYears={availableYears}
            isPlaying={isPlaying}
          />

          {/* Playback Controls & Speed Toggle Bar */}
          <div className="bg-[#0A1624] border border-[#183047] rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {/* Play / Pause Button */}
              <button
                onClick={handlePlayToggle}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  isPlaying
                    ? 'bg-[#FBBF24] text-[#020611] shadow-md shadow-[#FBBF24]/20'
                    : 'bg-[#38BDF8] text-[#020611] hover:bg-[#22D3EE] shadow-md shadow-[#38BDF8]/20'
                }`}
                title="Play Multi-Year Temporal Sequence"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                <span>{isPlaying ? 'PAUSE' : 'PLAY TIMELINE'}</span>
              </button>

              {/* Replay Button */}
              <button
                onClick={handleReplay}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#0E1C2D] border border-[#183047] hover:border-[#38BDF8] text-[#91A8BE] hover:text-[#E8F3FF] text-xs transition-colors"
                title="Replay from 2022"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>REPLAY</span>
              </button>
            </div>

            {/* Playback Speed Toggles */}
            <div className="flex items-center gap-1.5 text-xs text-[#587088]">
              <span className="text-[10px] uppercase mr-1">SPEED:</span>
              {[
                { label: '1.0x', speed: 1800 },
                { label: '1.5x', speed: 1200 },
                { label: '2.0x', speed: 700 }
              ].map((sp) => (
                <button
                  key={sp.label}
                  onClick={() => setPlaybackSpeed(sp.speed)}
                  className={`px-2 py-1 rounded text-[11px] font-semibold transition-colors ${
                    playbackSpeed === sp.speed
                      ? 'bg-[#0E1C2D] text-[#38BDF8] border border-[#38BDF8]/40'
                      : 'text-[#91A8BE] hover:text-[#E8F3FF]'
                  }`}
                >
                  {sp.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Telemetry Status, Dynamic Stats & 5-Year Evolution (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Observation Telemetry Status HUD Panel */}
          <div className="bg-[#0A1624] border border-[#183047] rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#183047]">
              <span className="text-[10px] text-[#38BDF8] tracking-widest uppercase">
                TEMPORAL STATUS TELEMETRY
              </span>
              <div className="flex items-center gap-1.5 text-[10px] text-[#34D399]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-ping" />
                <span>ANALYSIS AVAILABLE</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div>
                <span className="text-[10px] text-[#587088] uppercase block">CITY</span>
                <span className="text-[#E8F3FF] font-bold">{cityData.cityName}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#587088] uppercase block">STATE</span>
                <span className="text-[#91A8BE]">{cityData.state}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#587088] uppercase block">ACTIVE YEAR</span>
                <span className="text-[#22D3EE] font-bold">{selectedYear}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#587088] uppercase block">MODE</span>
                <span className="text-[#38BDF8]">DEMO</span>
              </div>
            </div>
          </div>

          {/* Dynamic Year-Specific Statistics */}
          <TemporalStats
            yearData={currentYearData}
            selectedYear={selectedYear}
          />

          {/* Year-Specific AI Telemetry Insight Card */}
          <div className="bg-[#0A1624] border border-[#183047] rounded-xl p-4 space-y-2 relative overflow-hidden">
            <div className="flex items-center gap-2 text-xs text-[#38BDF8] font-bold uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#22D3EE]" />
              <span>YEAR {selectedYear} TELEMETRY INSIGHT</span>
            </div>

            <p className="text-xs text-[#E8F3FF] leading-relaxed italic">
              “{currentYearData.insight}”
            </p>

            <div className="pt-2 border-t border-[#183047] flex items-center justify-between text-[9px] text-[#587088]">
              <span>CONFIDENCE: 92% (LEVEL-2A BOA)</span>
              <span>ESTIMATED INDICATOR</span>
            </div>
          </div>

          {/* Five-Year Evolution Cumulative Summary Card */}
          <FiveYearEvolution
            evolutionData={cityData.fiveYearEvolution}
            cityName={cityData.cityName}
          />
        </div>
      </div>
    </div>
  );
}
