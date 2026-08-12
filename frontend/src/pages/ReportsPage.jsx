import React, { useRef } from 'react';
import { FileText, Download, Printer, Shield, CheckCircle2, AlertTriangle, Globe } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function ReportsPage({ reportData }) {
  const reportRef = useRef(null);

  // Fallback demo report data if user opens Reports tab directly
  const data = reportData || {
    analysis_id: 'ANL-[#8F42E1]',
    city_name: 'Mumbai',
    state: 'Maharashtra',
    lat: 19.0760,
    lon: 72.8777,
    date_a: '2023-01',
    date_b: '2026-01',
    analysis_type: 'URBAN EXPANSION',
    stats: {
      urban_change_pct: 14.7,
      vegetation_change_pct: -8.4,
      water_change_pct: -3.2,
      infrastructure_change_pct: 6.1,
      total_affected_area_km2: 8.40
    },
    change_index: {
      score: 68,
      rating: 'HIGH',
      disclaimer: 'EarthLens Change Index is an internal analytical indicator and is not an official scientific standard.'
    },
    ai_insight: {
      summary: 'Significant urban expansion (14.7%) and built-environment activity were detected in Mumbai between 2023-01 and 2026-01.',
      primary_finding: 'Accelerated built-up surface growth coupled with green canopy clearance along eastern suburban transit corridors.',
      recommended_action: 'Deploy ground-truth validation teams to audit high-density construction zones in Eastern peri-urban region.'
    },
    sensor_info: {
      constellation: 'Sentinel-2 / Landsat-8',
      resolution: '10m Ground Sample Distance (GSD)',
      processing_level: 'Level-2A Bottom-Of-Atmosphere Reflectance',
      cloud_cover_pct: 1.8
    },
    demo_label: 'DEMO ANALYSIS'
  };

  const handleDownloadPDF = async () => {
    if (!reportRef.current) return;
    const canvas = await html2canvas(reportRef.current, { scale: 2, backgroundColor: '#0A1624' });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`EarthLens_Report_${data.city_name}_${data.date_b}.pdf`);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6 space-bg min-h-screen">
      {/* Top Actions Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#183047]">
        <div>
          <span className="text-xs font-data text-[#38BDF8] tracking-widest uppercase">
            MISSION DOCUMENTATION
          </span>
          <h1 className="font-heading text-2xl font-bold text-[#E8F3FF]">
            EARTH OBSERVATION REPORT
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-3.5 py-2 rounded-lg bg-[#0E1C2D] border border-[#183047] text-[#91A8BE] hover:text-[#E8F3FF] font-data text-xs flex items-center gap-1.5 transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>PRINT</span>
          </button>

          <button
            onClick={handleDownloadPDF}
            className="px-4 py-2 rounded-lg bg-[#38BDF8] text-[#020611] font-heading font-bold text-xs uppercase flex items-center gap-1.5 hover:bg-[#22D3EE] transition-all shadow-md"
          >
            <Download className="w-4 h-4" />
            <span>EXPORT PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Report Document Container */}
      <div 
        ref={reportRef}
        className="bg-[#0A1624] border border-[#183047] rounded-xl p-6 sm:p-10 space-y-6 shadow-2xl text-[#E8F3FF] font-data"
      >
        {/* Report Header */}
        <div className="flex justify-between items-start border-b border-[#183047] pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Globe className="w-6 h-6 text-[#38BDF8]" />
              <span className="font-heading font-bold text-2xl tracking-wider text-[#E8F3FF]">
                EARTHLENS <span className="text-[#38BDF8]">AI</span>
              </span>
            </div>
            <h2 className="font-heading text-base font-semibold text-[#22D3EE] uppercase tracking-wider">
              INDIAN CITY EARTH OBSERVATION REPORT
            </h2>
            <p className="text-xs text-[#587088] mt-1">
              REPORT ID: <span className="text-[#38BDF8] font-bold">{data.analysis_id}</span>
            </p>
          </div>

          <div className="text-right space-y-1">
            <span className="px-2.5 py-1 rounded bg-[#38BDF8]/10 border border-[#38BDF8]/30 text-[#38BDF8] font-bold text-xs">
              STATUS: {data.demo_label}
            </span>
            <div className="text-[11px] text-[#587088] pt-1">
              GENERATED: {new Date().toLocaleDateString('en-IN')}
            </div>
          </div>
        </div>

        {/* Location & Sensor Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#06101D] border border-[#183047] rounded-lg text-xs">
          <div>
            <div className="text-[#587088] text-[10px] uppercase">TARGET CITY</div>
            <div className="font-bold text-[#E8F3FF] text-sm">{data.city_name}</div>
            <div className="text-[#91A8BE] text-[10px]">{data.state}, India</div>
          </div>

          <div>
            <div className="text-[#587088] text-[10px] uppercase">COORDINATES</div>
            <div className="font-bold text-[#38BDF8]">LAT {data.lat.toFixed(4)}</div>
            <div className="font-bold text-[#38BDF8]">LON {data.lon.toFixed(4)}</div>
          </div>

          <div>
            <div className="text-[#587088] text-[10px] uppercase">OBSERVATION WINDOW</div>
            <div className="font-bold text-[#34D399]">{data.date_a}</div>
            <div className="text-[#587088] text-[10px]">TO</div>
            <div className="font-bold text-[#38BDF8]">{data.date_b}</div>
          </div>

          <div>
            <div className="text-[#587088] text-[10px] uppercase">SENSOR & RESOLUTION</div>
            <div className="font-bold text-[#E8F3FF]">{data.sensor_info.constellation}</div>
            <div className="text-[#22D3EE] text-[10px]">{data.sensor_info.resolution}</div>
          </div>
        </div>

        {/* Change Metrics Summary */}
        <div className="space-y-3">
          <h3 className="font-heading font-bold text-sm text-[#38BDF8] uppercase tracking-wider">
            1. QUANTITATIVE SPECTRAL DIFFERENCING RESULTS
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-[#0E1C2D] border border-[#183047] rounded-lg">
              <span className="text-[#587088] text-[10px]">URBAN GROWTH</span>
              <div className="text-xl font-bold text-[#38BDF8]">+{data.stats.urban_change_pct}%</div>
            </div>

            <div className="p-3 bg-[#0E1C2D] border border-[#183047] rounded-lg">
              <span className="text-[#587088] text-[10px]">VEGETATION SHIFT</span>
              <div className="text-xl font-bold text-[#F43F5E]">{data.stats.vegetation_change_pct}%</div>
            </div>

            <div className="p-3 bg-[#0E1C2D] border border-[#183047] rounded-lg">
              <span className="text-[#587088] text-[10px]">WATER REFLECTANCE</span>
              <div className="text-xl font-bold text-[#22D3EE]">{data.stats.water_change_pct}%</div>
            </div>

            <div className="p-3 bg-[#0E1C2D] border border-[#183047] rounded-lg">
              <span className="text-[#587088] text-[10px]">TOTAL FOOTPRINT</span>
              <div className="text-xl font-bold text-[#34D399]">{data.stats.total_affected_area_km2} km²</div>
            </div>
          </div>
        </div>

        {/* EarthLens Change Index */}
        <div className="p-4 bg-[#06101D] border border-[#183047] rounded-lg flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-[#E8F3FF] uppercase">EARTHLENS CHANGE INDEX</div>
            <div className="text-[#91A8BE] text-xs mt-1 font-italic">
              &ldquo;{data.change_index.disclaimer}&rdquo;
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-extrabold text-[#38BDF8]">{data.change_index.score} / 100</div>
            <span className="text-xs font-bold text-[#F43F5E] uppercase tracking-wider">{data.change_index.rating} IMPACT</span>
          </div>
        </div>

        {/* AI Executive Explanation */}
        <div className="space-y-3">
          <h3 className="font-heading font-bold text-sm text-[#38BDF8] uppercase tracking-wider">
            2. AI OBSERVATIONAL EXPLANATION & INSIGHT
          </h3>
          <p className="text-xs text-[#91A8BE] leading-relaxed bg-[#0E1C2D] p-4 border border-[#183047] rounded-lg">
            {data.ai_insight.summary} {data.ai_insight.primary_finding}
          </p>
        </div>

        {/* Methodology & Verification */}
        <div className="space-y-2 text-xs text-[#587088] pt-4 border-t border-[#183047]">
          <div className="font-bold text-[#91A8BE] uppercase text-[10px]">METHODOLOGY & CONFIDENCE</div>
          <p>
            Multi-spectral band registration using OpenCV computer vision matrix. NDVI vegetation delta and NDWI hydrological balance calculated at 10-meter ground sample distance. Confidence rating: 91%.
          </p>
        </div>

        {/* Responsible AI Disclaimer */}
        <div className="p-3 bg-[#020611] border border-[#FBBF24]/30 rounded-lg text-[11px] text-[#FBBF24] flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>
            «AI-generated analysis is an analytical aid and should be independently verified before operational decision-making.»
          </span>
        </div>
      </div>
    </div>
  );
}
