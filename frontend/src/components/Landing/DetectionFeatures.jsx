import React from 'react';
import { Building2, Trees, Droplets, Network, Wheat, Flame } from 'lucide-react';

export default function DetectionFeatures() {
  const features = [
    {
      icon: <Building2 className="w-5 h-5 text-[#38BDF8]" />,
      title: "URBAN EXPANSION",
      badge: "BUILT-UP INDEX",
      badgeColor: "text-[#38BDF8] bg-[#38BDF8]/10 border-[#38BDF8]/30",
      description: "Identifies newly constructed concrete surfaces, residential sprawl, and commercial development zones."
    },
    {
      icon: <Trees className="w-5 h-5 text-[#34D399]" />,
      title: "VEGETATION CANOPY",
      badge: "NDVI SPECTRAL DELTA",
      badgeColor: "text-[#34D399] bg-[#34D399]/10 border-[#34D399]/30",
      description: "Calculates Normalized Difference Vegetation Index shifts to detect forest clearance or urban greening."
    },
    {
      icon: <Droplets className="w-5 h-5 text-[#22D3EE]" />,
      title: "WATER BODIES",
      badge: "NDWI HYDROLOGY",
      badgeColor: "text-[#22D3EE] bg-[#22D3EE]/10 border-[#22D3EE]/30",
      description: "Measures water body surface changes, wetland inundation shifts, and coastal mangrove tidal boundaries."
    },
    {
      icon: <Network className="w-5 h-5 text-[#FBBF24]" />,
      title: "INFRASTRUCTURE",
      badge: "CORRIDOR TRACKING",
      badgeColor: "text-[#FBBF24] bg-[#FBBF24]/10 border-[#FBBF24]/30",
      description: "Tracks expressway bypasses, metro rail expansions, and newly laid arterial connectivity spines."
    },
    {
      icon: <Wheat className="w-5 h-5 text-[#A78BFA]" />,
      title: "AGRICULTURAL LAND",
      badge: "AGRARIAN CONVERSION",
      badgeColor: "text-[#A78BFA] bg-[#A78BFA]/10 border-[#A78BFA]/30",
      description: "Monitors peri-urban agricultural conversion into residential plots and logistical hubs."
    },
    {
      icon: <Flame className="w-5 h-5 text-[#F43F5E]" />,
      title: "BURNED AREA",
      badge: "SPECTRAL THERMAL",
      badgeColor: "text-[#F43F5E] bg-[#F43F5E]/10 border-[#F43F5E]/30",
      description: "Identifies thermal burn scars, crop residue clearing, and wildfire impact zones."
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A1624] border border-[#183047] mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE]" />
          <span className="text-[10px] font-data text-[#22D3EE] tracking-widest uppercase">
            MULTI-SPECTRAL DETECTION MATRIX
          </span>
        </div>
        <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#E8F3FF] tracking-tight">
          WHAT EARTHLENS DETECTS
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#91A8BE]">
          Precision computer vision differencing algorithms tuned specifically for Indian urban dynamics.
        </p>
      </div>

      {/* 6 Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((item, idx) => (
          <div
            key={idx}
            className="bg-[#0A1624] border border-[#183047] hover:border-[#38BDF8]/40 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#38BDF8]/5 flex flex-col justify-between group"
          >
            <div>
              {/* Top Icon & Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#0E1C2D] border border-[#183047] flex items-center justify-center group-hover:border-[#38BDF8]/50 transition-colors">
                  {item.icon}
                </div>
                <span className={`text-[9px] font-data font-bold px-2 py-0.5 rounded border ${item.badgeColor}`}>
                  {item.badge}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="font-heading text-base font-bold text-[#E8F3FF] mb-2 tracking-wide group-hover:text-[#38BDF8] transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-[#91A8BE] leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Bottom Status */}
            <div className="mt-5 pt-3 border-t border-[#183047]/60 flex items-center justify-between text-[10px] font-data text-[#587088]">
              <span>ALGORITHM: ACTIVE</span>
              <span className="text-[#38BDF8]">100% LOCAL CV</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
