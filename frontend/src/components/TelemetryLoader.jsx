import React, { useState, useEffect } from 'react';
import { Radio, CheckCircle2, Loader2, Circle } from 'lucide-react';

const STEPS = [
  "CITY IDENTIFIED",
  "SATELLITE DATA PREPARED",
  "COMPARING IMAGERY",
  "DETECTING CHANGES",
  "CALCULATING IMPACT",
  "GENERATING INSIGHT"
];

export default function TelemetryLoader({ onComplete, cityName = "MUMBAI" }) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < STEPS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 600);
          return prev;
        }
      });
    }, 450);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-[#020611]/90 backdrop-blur-lg flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#0A1624] border border-[#183047] rounded-xl p-6 sm:p-8 shadow-2xl space-bg relative overflow-hidden">
        {/* Top Orbit Telemetry Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#183047]">
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-[#38BDF8] animate-pulse" />
            <span className="font-heading font-bold text-sm text-[#E8F3FF] tracking-wider uppercase">
              EARTHLENS ANALYSIS
            </span>
          </div>
          <span className="font-data text-xs text-[#22D3EE] px-2 py-0.5 rounded bg-[#22D3EE]/10 border border-[#22D3EE]/30">
            {cityName.toUpperCase()}
          </span>
        </div>

        {/* Dynamic Checklist */}
        <div className="my-6 space-y-3.5">
          {STEPS.map((stepText, idx) => {
            const isDone = idx < currentStep;
            const isCurrent = idx === currentStep;
            const isPending = idx > currentStep;

            return (
              <div 
                key={idx} 
                className={`flex items-center justify-between p-2.5 rounded-lg border transition-all duration-300 ${
                  isDone 
                    ? 'bg-[#0E1C2D]/60 border-[#183047] text-[#E8F3FF]' 
                    : (isCurrent 
                        ? 'bg-[#38BDF8]/10 border-[#38BDF8]/50 text-[#38BDF8] shadow-sm shadow-[#38BDF8]/20' 
                        : 'bg-[#06101D]/40 border-transparent text-[#587088]')
                }`}
              >
                <div className="flex items-center gap-3 font-data text-xs tracking-wide">
                  {isDone && <CheckCircle2 className="w-4 h-4 text-[#34D399]" />}
                  {isCurrent && <Loader2 className="w-4 h-4 text-[#38BDF8] animate-spin" />}
                  {isPending && <Circle className="w-4 h-4 text-[#587088]" />}
                  <span>{stepText}</span>
                </div>
                
                <span className="font-data text-[10px]">
                  {isDone && <span className="text-[#34D399]">READY</span>}
                  {isCurrent && <span className="text-[#38BDF8] animate-pulse">PROCESSING</span>}
                  {isPending && <span className="text-[#587088]">QUEUED</span>}
                </span>
              </div>
            );
          })}
        </div>

        {/* Telemetry Progress Bar */}
        <div className="w-full bg-[#06101D] h-1.5 rounded-full overflow-hidden border border-[#183047]">
          <div 
            className="bg-gradient-to-r from-[#38BDF8] to-[#22D3EE] h-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
          ></div>
        </div>

        <div className="mt-4 text-center font-data text-[10px] text-[#587088]">
          Processing Sentinel-2 10m bands • Computer Vision Matrix Active
        </div>
      </div>
    </div>
  );
}
