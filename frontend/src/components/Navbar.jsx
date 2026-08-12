import React from 'react';
import { Globe, Radio, Shield, BarChart3, Layers, FileText, Info } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  return (
    <header className="sticky top-0 z-50 bg-[#020611]/90 backdrop-blur-md border-b border-[#183047] px-4 lg:px-8 py-3.5 flex items-center justify-between">
      {/* Brand & Mission Title */}
      <div 
        onClick={() => setActiveTab('landing')}
        className="flex items-center gap-3 cursor-pointer group"
      >
        <div className="w-9 h-9 rounded-lg bg-[#0E1C2D] border border-[#38BDF8]/40 flex items-center justify-center group-hover:border-[#38BDF8] transition-all">
          <Globe className="w-5 h-5 text-[#38BDF8] group-hover:rotate-12 transition-transform duration-300" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-heading text-lg font-bold tracking-wider text-[#E8F3FF] group-hover:text-[#38BDF8] transition-colors">
              EARTHLENS <span className="text-[#38BDF8] font-data text-xs px-1.5 py-0.5 rounded bg-[#38BDF8]/10 border border-[#38BDF8]/30">AI</span>
            </span>
          </div>
          <p className="text-[10px] text-[#587088] font-data tracking-tight">SATELLITE INTELLIGENCE FOR INDIA</p>
        </div>
      </div>

      {/* System Status Telemetry */}
      <div className="hidden md:flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#0A1624] border border-[#183047]">
        <span className="w-2 h-2 rounded-full bg-[#22D3EE] status-pulse-cyan"></span>
        <span className="text-xs font-data font-medium text-[#22D3EE] tracking-wider uppercase">
          EARTH OBSERVATION SYSTEM ONLINE
        </span>
      </div>

      {/* Navigation Tabs */}
      <nav className="flex items-center gap-1 sm:gap-2">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium font-data transition-all ${
            activeTab === 'dashboard'
              ? 'bg-[#0E1C2D] text-[#38BDF8] border border-[#183047]'
              : 'text-[#91A8BE] hover:text-[#E8F3FF] hover:bg-[#0A1624]'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          Dashboard
        </button>

        <button
          onClick={() => setActiveTab('analyze')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-medium font-data transition-all ${
            activeTab === 'analyze'
              ? 'bg-[#38BDF8]/15 text-[#38BDF8] border border-[#38BDF8]/40 shadow-sm shadow-[#38BDF8]/20'
              : 'text-[#91A8BE] hover:text-[#E8F3FF] hover:bg-[#0A1624]'
          }`}
        >
          <Radio className="w-3.5 h-3.5 text-[#22D3EE]" />
          Analyze
        </button>

        <button
          onClick={() => setActiveTab('explorer')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium font-data transition-all ${
            activeTab === 'explorer'
              ? 'bg-[#38BDF8]/15 text-[#38BDF8] border border-[#38BDF8]/40 shadow-sm shadow-[#38BDF8]/20'
              : 'text-[#91A8BE] hover:text-[#E8F3FF] hover:bg-[#0A1624]'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Temporal Explorer</span>
        </button>

        <button
          onClick={() => setActiveTab('reports')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium font-data transition-all ${
            activeTab === 'reports'
              ? 'bg-[#0E1C2D] text-[#38BDF8] border border-[#183047]'
              : 'text-[#91A8BE] hover:text-[#E8F3FF] hover:bg-[#0A1624]'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          Reports
        </button>
      </nav>
    </header>
  );
}
