import React from 'react';
import { Globe, MapPin, Calendar, Database, Activity } from 'lucide-react';

export default function TelemetryStrip({ citiesCount = 20 }) {
  const telemetryItems = [
    {
      icon: <Globe className="w-4 h-4 text-[#38BDF8]" />,
      label: "INDIA COVERAGE",
      value: "INDIAN CITIES ONLY",
      subtext: "STRICT SCOPE"
    },
    {
      icon: <MapPin className="w-4 h-4 text-[#22D3EE]" />,
      label: "SUPPORTED METROS",
      value: `${citiesCount}+ CITIES`,
      subtext: "ALL MAJOR STATES"
    },
    {
      icon: <Calendar className="w-4 h-4 text-[#34D399]" />,
      label: "TEMPORAL RANGE",
      value: "2022 — 2026",
      subtext: "5-YEAR EPOCHS"
    },
    {
      icon: <Database className="w-4 h-4 text-[#FBBF24]" />,
      label: "DATA ARCHITECTURE",
      value: "DEMO & LOCAL",
      subtext: "ZERO CREDENTIALS"
    },
    {
      icon: <Activity className="w-4 h-4 text-[#22D3EE]" />,
      label: "CONSTELLATION STATUS",
      value: "ONLINE",
      subtext: "CV DIFFERENCING"
    }
  ];

  return (
    <section className="w-full border-y border-[#183047] bg-[#06101D]/90 backdrop-blur-sm py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 font-data">
          {telemetryItems.map((item, idx) => (
            <div 
              key={idx} 
              className={`flex items-center gap-3 ${
                idx !== telemetryItems.length - 1 ? 'lg:border-r lg:border-[#183047]/60 pr-4' : ''
              }`}
            >
              <div className="p-2 rounded-lg bg-[#0A1624] border border-[#183047] shrink-0">
                {item.icon}
              </div>
              <div className="min-w-0">
                <div className="text-[10px] text-[#587088] uppercase tracking-wider truncate">
                  {item.label}
                </div>
                <div className="text-xs sm:text-sm font-bold text-[#E8F3FF] tracking-wide truncate">
                  {item.value}
                </div>
                <div className="text-[9px] text-[#91A8BE] tracking-tight truncate">
                  {item.subtext}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
