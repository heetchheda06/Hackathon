import React from 'react';
import { MapPin, Satellite, ScanEye, BrainCircuit, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: <MapPin className="w-5 h-5 text-[#38BDF8]" />,
      title: "SELECT CITY",
      description: "Choose from 20+ supported Indian metropolitan regions across Maharashtra, NCR, Karnataka, and beyond."
    },
    {
      number: "02",
      icon: <Satellite className="w-5 h-5 text-[#22D3EE]" />,
      title: "OBSERVE IMAGERY",
      description: "Align multi-year multi-spectral satellite rasters (2022-2026) across identical geographic spatial bounds."
    },
    {
      number: "03",
      icon: <ScanEye className="w-5 h-5 text-[#34D399]" />,
      title: "DETECT CHANGE",
      description: "Execute computer vision differencing algorithms (NDVI, NDWI, Built-up Index) to calculate surface changes in km²."
    },
    {
      number: "04",
      icon: <BrainCircuit className="w-5 h-5 text-[#FBBF24]" />,
      title: "UNDERSTAND IMPACT",
      description: "Receive EarthLens Change Index (0-100), AI analytical synthesis, and exportable mission verification reports."
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A1624] border border-[#183047] mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
          <span className="text-[10px] font-data text-[#38BDF8] tracking-widest uppercase">
            ANALYTICAL WORKFLOW
          </span>
        </div>
        <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#E8F3FF] tracking-tight">
          HOW EARTHLENS WORKS
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#91A8BE] font-normal">
          From space observation to actionable Earth intelligence in four precision steps.
        </p>
      </div>

      {/* 4 Steps Grid with Connectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {steps.map((step, idx) => (
          <div 
            key={idx}
            className="relative bg-[#0A1624] border border-[#183047] hover:border-[#38BDF8]/40 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#38BDF8]/5 flex flex-col justify-between group"
          >
            <div>
              {/* Step Number & Icon Header */}
              <div className="flex items-center justify-between mb-5">
                <span className="font-data text-xs font-bold text-[#587088] group-hover:text-[#38BDF8] transition-colors">
                  {step.number}
                </span>
                <div className="w-10 h-10 rounded-lg bg-[#0E1C2D] border border-[#183047] flex items-center justify-center group-hover:border-[#38BDF8]/50 transition-colors">
                  {step.icon}
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="font-heading text-base font-bold text-[#E8F3FF] mb-2 tracking-wide">
                {step.title}
              </h3>
              <p className="text-xs text-[#91A8BE] leading-relaxed">
                {step.description}
              </p>
            </div>

            {/* Bottom Step Indicator */}
            <div className="mt-6 pt-4 border-t border-[#183047]/60 flex items-center justify-between text-[11px] font-data text-[#587088]">
              <span>PHASE {step.number}</span>
              {idx < steps.length - 1 && (
                <ArrowRight className="w-3.5 h-3.5 text-[#587088] group-hover:text-[#38BDF8] transition-colors hidden lg:block" />
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
