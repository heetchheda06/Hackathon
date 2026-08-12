import React from 'react';
import { Globe, Radio, Shield } from 'lucide-react';

export default function Footer({ onStartAnalysis, onOpenTemporalExplorer }) {
  return (
    <footer className="border-t border-[#183047] bg-[#020611] py-12 px-4 sm:px-6 lg:px-8 font-data">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Tagline */}
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2.5">
            <div className="w-7 h-7 rounded-md bg-[#0E1C2D] border border-[#38BDF8]/40 flex items-center justify-center">
              <Globe className="w-4 h-4 text-[#38BDF8]" />
            </div>
            <span className="font-heading text-base font-bold tracking-wider text-[#E8F3FF]">
              EARTHLENS <span className="text-[#38BDF8]">AI</span>
            </span>
          </div>
          <p className="text-xs text-[#22D3EE] font-bold tracking-widest uppercase">
            SEE EARTH. DETECT CHANGE. UNDERSTAND IMPACT.
          </p>
          <p className="text-[11px] text-[#587088]">
            AI-powered Earth observation for India&apos;s changing cities.
          </p>
        </div>

        {/* System & Telemetry Indicator */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-[#91A8BE]">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0A1624] border border-[#183047]">
            <span className="w-2 h-2 rounded-full bg-[#22D3EE] status-pulse-cyan" />
            <span className="text-[11px] font-bold text-[#22D3EE] uppercase tracking-wider">
              EARTH OBSERVATION SYSTEM ONLINE
            </span>
          </div>
          <span className="text-[11px] text-[#587088]">
            100% LOCAL PROCESSING • ZERO EXTERNAL DEPENDENCIES
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-[#183047]/40 flex flex-col sm:flex-row items-center justify-between text-[10px] text-[#587088] gap-3">
        <span>© 2026 EARTHLENS AI. EXCLUSIVELY DESIGNED FOR INDIAN METROPOLITAN REGIONS.</span>
        <span>SENTINEL-2 / LANDSAT-8 COMPATIBLE CV ENGINE</span>
      </div>
    </footer>
  );
}
