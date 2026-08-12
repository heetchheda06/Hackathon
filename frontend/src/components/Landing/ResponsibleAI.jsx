import React from 'react';
import { ShieldCheck, AlertTriangle, FileCheck } from 'lucide-react';

export default function ResponsibleAI() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full font-data">
      <div className="bg-[#06101D] border border-[#183047] rounded-xl p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2 rounded-lg bg-[#0A1624] border border-[#183047] shrink-0 mt-0.5">
            <ShieldCheck className="w-5 h-5 text-[#34D399]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#E8F3FF] uppercase tracking-wider">
                RESPONSIBLE EARTH INTELLIGENCE
              </span>
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#34D399]/15 text-[#34D399] border border-[#34D399]/30">
                SCIENTIFIC AID
              </span>
            </div>
            <p className="text-xs text-[#91A8BE] mt-1 leading-relaxed max-w-3xl">
              AI-generated analysis and EarthLens Change Index scores are computational decision-support aids designed for preliminary spatial orientation. 
              All telemetry and spectral differencing should be independently verified before operational, municipal, or infrastructure decision-making.
            </p>
          </div>
        </div>

        <div className="text-[10px] text-[#587088] shrink-0 uppercase tracking-widest pl-11 md:pl-0">
          ● ISO-COMPLIANT DISCLAIMER
        </div>
      </div>
    </section>
  );
}
