import React, { useState, useEffect } from 'react';
import { Play, Sparkles, AlertCircle, FileText, Bot, Layers, BarChart2, ShieldCheck, MapPin } from 'lucide-react';
import SplitViewSlider from '../components/SplitViewSlider';
import TelemetryLoader from '../components/TelemetryLoader';
import AskEarthLensModal from '../components/AskEarthLensModal';
import IndiaMap from '../components/IndiaMap';

export default function AnalyzePage({ initialCityId = 'mumbai', onGenerateReport }) {
  const [cities, setCities] = useState([]);
  const [selectedCityId, setSelectedCityId] = useState(initialCityId);
  const [dateA, setDateA] = useState('2023-01');
  const [dateB, setDateB] = useState('2026-01');
  const [analysisType, setAnalysisType] = useState('auto');
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAskModalOpen, setIsAskModalOpen] = useState(false);
  const [searchError, setSearchError] = useState('');

  useEffect(() => {
    fetch('/api/cities')
      .then((res) => res.json())
      .then((data) => {
        setCities(data);
        if (initialCityId) setSelectedCityId(initialCityId);
      });
  }, [initialCityId]);

  // Execute change detection on load if no result yet
  useEffect(() => {
    if (selectedCityId && !analysisResult) {
      handleRunAnalysis();
    }
  }, [selectedCityId]);

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);

    fetch('/api/analysis/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        city_id: selectedCityId,
        date_a: dateA,
        date_b: dateB,
        analysis_type: analysisType
      })
    })
      .then((res) => {
        if (!res.ok) throw new Error("Analysis failed");
        return res.json();
      })
      .then((data) => {
        setAnalysisResult(data);
      })
      .catch((err) => console.error("Analysis execution error:", err));
  };

  const currentCityObj = cities.find((c) => c.id === selectedCityId) || {
    name: selectedCityId.toUpperCase(),
    state: 'India',
    lat: 19.0760,
    lon: 72.8777
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 space-bg min-h-screen">
      {/* Telemetry Loader overlay */}
      {isAnalyzing && (
        <TelemetryLoader
          cityName={currentCityObj.name}
          onComplete={() => setIsAnalyzing(false)}
        />
      )}

      {/* Ask EarthLens Assistant Modal */}
      <AskEarthLensModal
        isOpen={isAskModalOpen}
        onClose={() => setIsAskModalOpen(false)}
        analysisData={analysisResult}
      />

      {/* Analysis Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#183047]">
        <div>
          <span className="text-xs font-data text-[#38BDF8] tracking-widest uppercase">
            OBSERVATION MISSION CONTROL
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#E8F3FF] tracking-tight">
            NEW EARTH ANALYSIS
          </h1>
        </div>

        {/* Demo Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0E1C2D] border border-[#183047] font-data text-xs text-[#38BDF8]">
          <span className="w-2 h-2 rounded-full bg-[#38BDF8]"></span>
          <span>STATUS: DEMO ANALYSIS</span>
        </div>
      </div>

      {/* Selection Control Panel Form */}
      <div className="bg-[#0A1624] border border-[#183047] rounded-xl p-4 sm:p-6 shadow-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        {/* City Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-data text-[#91A8BE] uppercase">INDIAN CITY</label>
          <select
            value={selectedCityId}
            onChange={(e) => setSelectedCityId(e.target.value)}
            className="w-full bg-[#06101D] border border-[#183047] rounded-lg px-3 py-2 text-xs font-data text-[#E8F3FF] focus:outline-none focus:border-[#38BDF8]"
          >
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name} ({city.state})
              </option>
            ))}
          </select>
        </div>

        {/* Date A Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-data text-[#91A8BE] uppercase">DATE A (BASELINE)</label>
          <select
            value={dateA}
            onChange={(e) => setDateA(e.target.value)}
            className="w-full bg-[#06101D] border border-[#183047] rounded-lg px-3 py-2 text-xs font-data text-[#E8F3FF] focus:outline-none focus:border-[#38BDF8]"
          >
            <option value="2021-01">January 2021</option>
            <option value="2022-01">January 2022</option>
            <option value="2023-01">January 2023</option>
            <option value="2024-01">January 2024</option>
            <option value="2025-01">January 2025</option>
          </select>
        </div>

        {/* Date B Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-data text-[#91A8BE] uppercase">DATE B (TARGET)</label>
          <select
            value={dateB}
            onChange={(e) => setDateB(e.target.value)}
            className="w-full bg-[#06101D] border border-[#183047] rounded-lg px-3 py-2 text-xs font-data text-[#E8F3FF] focus:outline-none focus:border-[#38BDF8]"
          >
            <option value="2025-01">January 2025</option>
            <option value="2026-01">January 2026</option>
          </select>
        </div>

        {/* Analysis Type Dropdown */}
        <div className="space-y-1.5">
          <label className="text-xs font-data text-[#91A8BE] uppercase">ANALYSIS TYPE</label>
          <select
            value={analysisType}
            onChange={(e) => setAnalysisType(e.target.value)}
            className="w-full bg-[#06101D] border border-[#183047] rounded-lg px-3 py-2 text-xs font-data text-[#E8F3FF] focus:outline-none focus:border-[#38BDF8]"
          >
            <option value="auto">Auto Detect</option>
            <option value="urban">Urban Expansion</option>
            <option value="vegetation">Vegetation Changes</option>
            <option value="water">Flood / Water Expansion</option>
            <option value="infrastructure">Infrastructure Changes</option>
            <option value="agriculture">Agriculture / Green Cover</option>
            <option value="burned">Burned Area Indicators</option>
          </select>
        </div>

        {/* Run Analysis Trigger Button */}
        <div className="sm:col-span-2 lg:col-span-4 pt-2 flex justify-end">
          <button
            onClick={handleRunAnalysis}
            className="w-full sm:w-auto px-8 py-3 rounded-lg bg-[#38BDF8] text-[#020611] font-heading font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#22D3EE] transition-all shadow-lg shadow-[#38BDF8]/20"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>RUN ANALYSIS</span>
          </button>
        </div>
      </div>

      {/* Analysis Results Dashboard */}
      {analysisResult && (
        <div className="space-y-6">
          {/* Main Grid: Split View Slider + Change Stats & Index */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Split View Satellite Comparison Slider (2 Cols) */}
            <div className="lg:col-span-2">
              <SplitViewSlider
                beforeUrl={analysisResult.before_image_url}
                afterUrl={analysisResult.after_image_url}
                maskUrl={analysisResult.change_mask_url}
                dateA={analysisResult.date_a}
                dateB={analysisResult.date_b}
                cityName={analysisResult.city_name}
              />
            </div>

            {/* Metrics Column: Change Stats & Change Index */}
            <div className="space-y-4 font-data">
              {/* Change Statistics Card */}
              <div className="bg-[#0A1624] border border-[#183047] rounded-xl p-4 space-y-3">
                <div className="text-xs font-bold text-[#E8F3FF] tracking-wider uppercase border-b border-[#183047] pb-2 flex items-center justify-between">
                  <span>CHANGE STATISTICS</span>
                  <span className="text-[10px] text-[#38BDF8]">10m GSD</span>
                </div>

                <div className="space-y-2.5">
                  <div className="flex justify-between items-center p-2 rounded bg-[#06101D] border border-[#183047]">
                    <span className="text-xs text-[#91A8BE]">URBAN AREA</span>
                    <span className="text-sm font-bold text-[#38BDF8]">
                      {analysisResult.stats.urban_change_pct > 0 ? `+${analysisResult.stats.urban_change_pct}%` : `${analysisResult.stats.urban_change_pct}%`}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-2 rounded bg-[#06101D] border border-[#183047]">
                    <span className="text-xs text-[#91A8BE]">VEGETATION</span>
                    <span className="text-sm font-bold text-[#F43F5E]">
                      {analysisResult.stats.vegetation_change_pct > 0 ? `+${analysisResult.stats.vegetation_change_pct}%` : `${analysisResult.stats.vegetation_change_pct}%`}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-2 rounded bg-[#06101D] border border-[#183047]">
                    <span className="text-xs text-[#91A8BE]">WATER SURFACE</span>
                    <span className="text-sm font-bold text-[#22D3EE]">
                      {analysisResult.stats.water_change_pct > 0 ? `+${analysisResult.stats.water_change_pct}%` : `${analysisResult.stats.water_change_pct}%`}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-2 rounded bg-[#06101D] border border-[#183047]">
                    <span className="text-xs text-[#91A8BE]">INFRASTRUCTURE</span>
                    <span className="text-sm font-bold text-[#34D399]">
                      +{analysisResult.stats.infrastructure_change_pct}%
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#183047] flex justify-between items-center text-xs">
                  <span className="text-[#587088]">TOTAL FOOTPRINT:</span>
                  <span className="font-bold text-[#E8F3FF] text-sm">{analysisResult.stats.total_affected_area_km2} km²</span>
                </div>
              </div>

              {/* EarthLens Change Index Widget */}
              <div className="bg-[#0A1624] border border-[#183047] rounded-xl p-4 space-y-3">
                <div className="text-xs font-bold text-[#E8F3FF] tracking-wider uppercase border-b border-[#183047] pb-2 flex items-center justify-between">
                  <span>EARTHLENS CHANGE INDEX</span>
                  <span className="text-[10px] text-[#FBBF24]">0 – 100</span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-extrabold text-[#38BDF8]">
                      {analysisResult.change_index.score} <span className="text-xs text-[#587088] font-normal">/ 100</span>
                    </div>
                    <div className="text-xs font-bold mt-0.5 tracking-wider" style={{
                      color: analysisResult.change_index.rating === 'HIGH' || analysisResult.change_index.rating === 'CRITICAL' ? '#F43F5E' : '#FBBF24'
                    }}>
                      {analysisResult.change_index.rating} IMPACT SEVERITY
                    </div>
                  </div>

                  {/* Rating Badge */}
                  <div className="w-16 h-16 rounded-full bg-[#0E1C2D] border-2 border-[#38BDF8] flex items-center justify-center font-heading font-extrabold text-lg text-[#38BDF8]">
                    {analysisResult.change_index.score}
                  </div>
                </div>

                {/* Mandated Scientific Disclaimer */}
                <p className="text-[10px] text-[#587088] leading-tight pt-2 border-t border-[#183047] italic">
                  &ldquo;{analysisResult.change_index.disclaimer}&rdquo;
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => setIsAskModalOpen(true)}
                  className="flex-1 py-2.5 rounded-lg bg-[#0E1C2D] border border-[#38BDF8]/40 hover:border-[#38BDF8] text-[#38BDF8] font-bold text-xs uppercase flex items-center justify-center gap-1.5 transition-all"
                >
                  <Bot className="w-4 h-4" />
                  <span>ASK EARTHLENS</span>
                </button>

                <button
                  onClick={() => {
                    if (onGenerateReport) onGenerateReport(analysisResult);
                  }}
                  className="py-2.5 px-4 rounded-lg bg-[#34D399] text-[#020611] font-bold text-xs uppercase flex items-center justify-center gap-1.5 hover:bg-[#34D399]/80 transition-all"
                >
                  <FileText className="w-4 h-4" />
                  <span>REPORT</span>
                </button>
              </div>
            </div>
          </div>

          {/* AI Insight Section */}
          <div className="bg-[#0A1624] border border-[#183047] rounded-xl p-5 space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-[#183047]">
              <Sparkles className="w-5 h-5 text-[#22D3EE]" />
              <h3 className="font-heading font-bold text-base text-[#E8F3FF] tracking-wider uppercase">
                AI OBSERVED TELEMETRY INSIGHT
              </h3>
            </div>

            <p className="font-data text-xs text-[#E8F3FF] leading-relaxed">
              &ldquo;{analysisResult.ai_insight.summary}&rdquo;
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-data text-xs pt-2">
              <div className="p-3 bg-[#06101D] border border-[#183047] rounded-lg space-y-1">
                <span className="text-[#38BDF8] font-bold uppercase text-[10px]">PRIMARY FINDING</span>
                <p className="text-[#91A8BE]">{analysisResult.ai_insight.primary_finding}</p>
              </div>

              <div className="p-3 bg-[#06101D] border border-[#183047] rounded-lg space-y-1">
                <span className="text-[#34D399] font-bold uppercase text-[10px]">RECOMMENDED AUDIT</span>
                <p className="text-[#91A8BE]">{analysisResult.ai_insight.recommended_action}</p>
              </div>
            </div>
          </div>

          {/* Interactive Change Map with Detected Zone Polygons */}
          <div className="space-y-3">
            <h3 className="font-heading font-bold text-sm text-[#E8F3FF] tracking-wider uppercase flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#38BDF8]" />
              DETECTED CHANGE ZONES MAP
            </h3>

            <IndiaMap
              cities={cities}
              selectedCity={currentCityObj}
              zones={analysisResult.zones}
              mapHeight="420px"
            />
          </div>
        </div>
      )}
    </div>
  );
}
