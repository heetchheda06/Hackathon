import React from 'react';
import { MapPin, ArrowUpRight } from 'lucide-react';

export default function FeaturedCities({ 
  selectedCityId = 'mumbai', 
  onSelectCity, 
  onStartAnalysis 
}) {
  const featured = [
    { 
      id: 'mumbai', 
      name: 'Mumbai', 
      state: 'Maharashtra', 
      change: '+14.7% Urban Sprawl',
      type: 'Coastal Megacity' 
    },
    { 
      id: 'delhi', 
      name: 'Delhi (NCR)', 
      state: 'NCT Delhi', 
      change: '+18.2% Infra Growth',
      type: 'Capital Expressway Belt' 
    },
    { 
      id: 'bengaluru', 
      name: 'Bengaluru', 
      state: 'Karnataka', 
      change: '-8.4% Green Canopy',
      type: 'Tech Corridor Sprawl' 
    },
    { 
      id: 'hyderabad', 
      name: 'Hyderabad', 
      state: 'Telangana', 
      change: '+22.4% Commercial Belt',
      type: 'HITEC & Financial Hub' 
    },
    { 
      id: 'chennai', 
      name: 'Chennai', 
      state: 'Tamil Nadu', 
      change: '-3.2% Water Body Shift',
      type: 'Port & Marshland Zone' 
    },
    { 
      id: 'ahmedabad', 
      name: 'Ahmedabad', 
      state: 'Gujarat', 
      change: '+12.5% Industrial Zone',
      type: 'Sabarmati & Ring Road' 
    }
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-[10px] font-data text-[#587088] tracking-widest uppercase block">
            RAPID OBSERVATION TARGETS
          </span>
          <h3 className="font-heading text-lg sm:text-xl font-bold text-[#E8F3FF]">
            FEATURED INDIAN METROPOLITAN REGIONS
          </h3>
        </div>

        <span className="text-xs font-data text-[#38BDF8] hidden sm:block">
          ● CLICK TO SELECT & ANALYZE
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {featured.map((city) => {
          const isSelected = selectedCityId === city.id;
          return (
            <button
              key={city.id}
              onClick={() => {
                onSelectCity(city.id);
              }}
              className={`p-3.5 rounded-xl text-left transition-all duration-300 group flex flex-col justify-between border ${
                isSelected
                  ? 'bg-[#0E1C2D] border-[#38BDF8] shadow-lg shadow-[#38BDF8]/15 scale-[1.02]'
                  : 'bg-[#0A1624] border-[#183047] hover:border-[#38BDF8]/50 hover:bg-[#0E1C2D]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className={`font-heading font-bold text-sm tracking-wide transition-colors ${
                    isSelected ? 'text-[#38BDF8]' : 'text-[#E8F3FF] group-hover:text-[#38BDF8]'
                  }`}>
                    {city.name}
                  </span>
                  <ArrowUpRight className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                    isSelected ? 'text-[#38BDF8]' : 'text-[#587088] group-hover:text-[#38BDF8]'
                  }`} />
                </div>
                <div className="text-[10px] font-data text-[#587088] mt-1">
                  {city.state}
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-[#183047]/60">
                <div className="text-[10px] font-data text-[#34D399] font-semibold">
                  {city.change}
                </div>
                <div className="text-[9px] font-data text-[#91A8BE] mt-0.5 truncate">
                  {city.type}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
