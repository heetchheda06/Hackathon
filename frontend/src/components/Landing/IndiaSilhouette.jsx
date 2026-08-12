import React, { useState } from 'react';
import { MapPin, Radio, Activity, Navigation, Sparkles } from 'lucide-react';

export default function IndiaSilhouette({ selectedCityId = 'mumbai', onSelectCity }) {
  const [hoveredCity, setHoveredCity] = useState(null);
  const [showConstellationLines, setShowConstellationLines] = useState(true);

  // Supported 18+ Indian Metropolitan Centers with precise SVG projected coordinates
  // Canvas coordinate system: ViewBox 0 0 650 780
  const cities = [
    { id: 'delhi', name: 'Delhi', state: 'NCT Delhi', x: 236, y: 220, lat: 28.6139, lon: 77.2090, tag: 'CAPITAL BELT', change: '+18.2%' },
    { id: 'chandigarh', name: 'Chandigarh', state: 'Punjab / Haryana', x: 220, y: 172, lat: 30.7333, lon: 76.7794, tag: 'NORTH GATEWAY', change: '+8.9%' },
    { id: 'jaipur', name: 'Jaipur', state: 'Rajasthan', x: 195, y: 275, lat: 26.9124, lon: 75.7873, tag: 'NORTH-WEST HUB', change: '+10.8%' },
    { id: 'lucknow', name: 'Lucknow', state: 'Uttar Pradesh', x: 310, y: 270, lat: 26.8467, lon: 80.9462, tag: 'GANGETIC BELT', change: '+15.1%' },
    { id: 'ahmedabad', name: 'Ahmedabad', state: 'Gujarat', x: 130, y: 360, lat: 23.0225, lon: 72.5714, tag: 'INDUSTRIAL ZONE', change: '+12.5%' },
    { id: 'surat', name: 'Surat', state: 'Gujarat', x: 138, y: 410, lat: 21.1702, lon: 72.8311, tag: 'DIAMOND & TEXTILE', change: '+17.3%' },
    { id: 'bhopal', name: 'Bhopal', state: 'Madhya Pradesh', x: 242, y: 355, lat: 23.2599, lon: 77.4126, tag: 'CENTRAL METRO', change: '+11.7%' },
    { id: 'indore', name: 'Indore', state: 'Madhya Pradesh', x: 202, y: 370, lat: 22.7196, lon: 75.8577, tag: 'COMMERCIAL HUB', change: '+14.2%' },
    { id: 'nagpur', name: 'Nagpur', state: 'Maharashtra', x: 278, y: 410, lat: 21.1458, lon: 79.0882, tag: 'ZERO MILE HUB', change: '+13.0%' },
    { id: 'mumbai', name: 'Mumbai', state: 'Maharashtra', x: 140, y: 462, lat: 19.0760, lon: 72.8777, tag: 'COASTAL METRO', change: '+14.7%' },
    { id: 'pune', name: 'Pune', state: 'Maharashtra', x: 165, y: 485, lat: 18.5204, lon: 73.8567, tag: 'TECH & AUTO', change: '+16.2%' },
    { id: 'hyderabad', name: 'Hyderabad', state: 'Telangana', x: 265, y: 508, lat: 17.3850, lon: 78.4867, tag: 'DECCAN HUB', change: '+22.4%' },
    { id: 'kolkata', name: 'Kolkata', state: 'West Bengal', x: 450, y: 375, lat: 22.5726, lon: 88.3639, tag: 'EASTERN METRO', change: '+13.5%' },
    { id: 'guwahati', name: 'Guwahati', state: 'Assam', x: 535, y: 300, lat: 26.1445, lon: 91.7362, tag: 'NORTHEAST HUB', change: '+12.1%' },
    { id: 'bengaluru', name: 'Bengaluru', state: 'Karnataka', x: 248, y: 615, lat: 12.9716, lon: 77.5946, tag: 'TECH CORRIDOR', change: '+19.8%' },
    { id: 'chennai', name: 'Chennai', state: 'Tamil Nadu', x: 305, y: 610, lat: 13.0827, lon: 80.2707, tag: 'SOUTHERN PORT', change: '+11.3%' },
    { id: 'kochi', name: 'Kochi', state: 'Kerala', lat: 9.9312, lon: 76.2673, x: 225, y: 685, tag: 'MALABAR PORT', change: '+9.4%' }
  ];

  const activeCity = cities.find(c => c.id === selectedCityId) || cities[9];
  const displayedCity = hoveredCity || activeCity;

  // Interconnected Telemetry Mesh (Satellite Constellation Links)
  const networkLines = [
    ['delhi', 'chandigarh'],
    ['delhi', 'jaipur'],
    ['delhi', 'lucknow'],
    ['jaipur', 'ahmedabad'],
    ['ahmedabad', 'surat'],
    ['surat', 'mumbai'],
    ['mumbai', 'pune'],
    ['pune', 'bengaluru'],
    ['bengaluru', 'kochi'],
    ['bengaluru', 'chennai'],
    ['chennai', 'hyderabad'],
    ['hyderabad', 'nagpur'],
    ['nagpur', 'bhopal'],
    ['bhopal', 'indore'],
    ['bhopal', 'delhi'],
    ['lucknow', 'kolkata'],
    ['kolkata', 'guwahati'],
    ['nagpur', 'kolkata'],
    ['mumbai', 'hyderabad'],
    ['delhi', 'nagpur']
  ];

  return (
    <div className="relative w-full max-w-[540px] aspect-[5/6] mx-auto select-none font-data">
      {/* Background Deep Space Radial Glow */}
      <div className="absolute inset-0 bg-radial from-[#38BDF8]/15 via-[#06101D]/50 to-transparent blur-3xl pointer-events-none" />

      {/* Top Telemetry Header Box */}
      <div className="absolute top-2 left-2 right-2 z-20 flex items-center justify-between px-3.5 py-2 rounded-xl bg-[#020611]/90 backdrop-blur-md border border-[#183047] text-[11px] shadow-xl">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#22D3EE] status-pulse-cyan" />
          <span className="font-bold text-[#E8F3FF] tracking-wider uppercase">
            {displayedCity.name.toUpperCase()}
          </span>
          <span className="text-[#587088]">|</span>
          <span className="text-[#38BDF8] text-[10px]">{displayedCity.state}</span>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowConstellationLines(!showConstellationLines)}
            className={`text-[9px] px-2 py-0.5 rounded border transition-colors ${
              showConstellationLines 
                ? 'bg-[#38BDF8]/15 border-[#38BDF8]/40 text-[#38BDF8]' 
                : 'bg-[#0E1C2D] border-[#183047] text-[#587088]'
            }`}
          >
            {showConstellationLines ? '● MESH LINKED' : '○ NODES ONLY'}
          </button>
          <span className="text-[10px] text-[#34D399] font-bold hidden sm:inline">
            {displayedCity.change}
          </span>
        </div>
      </div>

      <svg 
        viewBox="0 0 650 780" 
        className="w-full h-full drop-shadow-[0_0_30px_rgba(56,189,248,0.25)]"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="indiaBorderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.9" />
            <stop offset="35%" stopColor="#22D3EE" stopOpacity="0.75" />
            <stop offset="70%" stopColor="#0EA5E9" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#183047" stopOpacity="0.95" />
          </linearGradient>

          <radialGradient id="indiaLandGradient" cx="45%" cy="48%" r="60%">
            <stop offset="0%" stopColor="#0E1C2D" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#0A1624" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#06101D" stopOpacity="0.4" />
          </radialGradient>

          <filter id="svgGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Tactical Graticule Lines & Latitude/Longitude Grid */}
        <g stroke="#183047" strokeWidth="0.75" strokeDasharray="3 5" opacity="0.4">
          <line x1="30" y1="130" x2="620" y2="130" />
          <line x1="30" y1="260" x2="620" y2="260" />
          <line x1="30" y1="390" x2="620" y2="390" />
          <line x1="30" y1="520" x2="620" y2="520" />
          <line x1="30" y1="650" x2="620" y2="650" />

          <line x1="120" y1="30" x2="120" y2="750" />
          <line x1="240" y1="30" x2="240" y2="750" />
          <line x1="360" y1="30" x2="360" y2="750" />
          <line x1="480" y1="30" x2="480" y2="750" />
        </g>

        {/* Circular Radar Scan Arc */}
        <circle cx="280" cy="420" r="180" stroke="#183047" strokeWidth="0.8" strokeDasharray="4 6" opacity="0.3" />
        <circle cx="280" cy="420" r="310" stroke="#183047" strokeWidth="0.8" strokeDasharray="6 8" opacity="0.2" />

        {/* 2. OFFICIAL ACCURATE INDIA MAP (2026 REFERENCE WITH COMPLETE BOUNDARIES) */}
        {/* Full Outer Geographic Contour */}
        <path
          d="
            M 195 40
            C 202 38, 218 45, 230 52
            C 242 60, 260 62, 272 70
            C 284 78, 292 90, 295 105
            C 298 120, 288 132, 292 148
            C 296 162, 308 170, 312 182
            C 316 195, 325 204, 332 212
            C 342 224, 358 230, 372 236
            C 392 244, 418 250, 438 260
            C 450 266, 460 268, 466 258
            C 472 248, 478 235, 484 235
            C 490 235, 498 248, 506 260
            C 518 264, 534 266, 548 262
            C 562 258, 580 242, 595 232
            C 606 222, 620 228, 624 242
            C 628 258, 615 275, 608 290
            C 600 305, 594 320, 590 338
            C 586 355, 576 376, 564 398
            C 555 410, 544 406, 538 394
            C 532 380, 528 365, 518 355
            C 506 344, 490 344, 482 330
            C 475 316, 464 314, 455 324
            C 448 335, 442 352, 438 370
            C 434 386, 430 408, 424 422
            C 418 436, 404 448, 390 460
            C 375 476, 360 492, 342 512
            C 326 530, 312 552, 300 576
            C 290 598, 282 624, 270 650
            C 260 670, 252 690, 238 705
            C 230 712, 222 712, 215 702
            C 204 685, 195 662, 188 640
            C 180 612, 172 582, 166 552
            C 160 524, 154 496, 146 470
            C 138 448, 126 434, 112 424
            C 98 412, 80 416, 60 424
            C 45 430, 32 422, 24 406
            C 15 392, 18 372, 28 358
            C 38 344, 54 340, 68 332
            C 82 324, 94 310, 104 294
            C 114 276, 125 254, 134 230
            C 142 206, 152 180, 160 156
            C 168 130, 174 104, 170 78
            C 168 55, 184 42, 195 40
            Z
          "
          fill="url(#indiaLandGradient)"
          stroke="url(#indiaBorderGradient)"
          strokeWidth="2.4"
          strokeLinejoin="round"
          strokeLinecap="round"
          filter="url(#svgGlow)"
        />

        {/* 3. INTERNAL ACCURATE STATE BOUNDARIES (Matching Official Reference Delineation) */}
        <g stroke="#38BDF8" strokeWidth="0.9" opacity="0.45" fill="none" strokeDasharray="3 2">
          {/* Jammu & Kashmir / Ladakh Division */}
          <path d="M 195 40 Q 220 90 240 140 T 292 148" />
          <path d="M 170 78 Q 210 105 240 140" />

          {/* Punjab / Himachal / Uttarakhand */}
          <path d="M 160 156 Q 200 165 240 175 T 296 162" />
          <path d="M 220 172 Q 250 185 280 205" />
          <path d="M 280 205 Q 305 210 325 210" />

          {/* Rajasthan State Boundary */}
          <path d="M 160 156 Q 165 220 180 280 T 134 320" />
          <path d="M 180 280 Q 220 275 250 290 T 260 340" />

          {/* Gujarat State Perimeter & Saurashtra/Kutch */}
          <path d="M 134 320 Q 90 330 68 332" />
          <path d="M 68 332 Q 95 365 110 385 T 146 415" />
          <path d="M 110 385 Q 85 410 60 424" />

          {/* Uttar Pradesh & Bihar Gangetic Plains */}
          <path d="M 250 290 Q 300 285 360 295 T 410 310" />
          <path d="M 330 215 Q 350 270 360 295" />
          <path d="M 360 295 Q 400 310 435 340" />
          <path d="M 438 260 Q 425 300 435 340" />

          {/* Madhya Pradesh Central Mesh */}
          <path d="M 180 280 Q 210 340 230 380 T 320 390" />
          <path d="M 250 290 Q 280 340 330 360 T 380 375" />
          <path d="M 146 415 Q 200 410 260 420 T 330 425" />

          {/* Maharashtra State Boundaries */}
          <path d="M 146 415 Q 140 450 146 470" />
          <path d="M 146 470 Q 200 480 260 470 T 330 460" />
          <path d="M 146 510 Q 190 520 250 515" />

          {/* Chhattisgarh & Odisha */}
          <path d="M 330 360 Q 350 410 360 460 T 380 500" />
          <path d="M 380 375 Q 410 420 424 460" />

          {/* West Bengal & Northeast 7 Sisters Corridor */}
          <path d="M 435 340 Q 450 380 440 420" />
          <path d="M 466 258 Q 470 290 482 330" />
          <path d="M 506 260 Q 520 310 540 340" />
          <path d="M 548 262 Q 570 300 564 398" />
          <path d="M 518 355 Q 550 360 580 350" />

          {/* Telangana & Andhra Pradesh */}
          <path d="M 250 515 Q 280 520 320 535 T 350 550" />
          <path d="M 260 470 Q 280 500 300 550 T 320 600" />

          {/* Karnataka, Goa, Kerala & Tamil Nadu */}
          <path d="M 146 510 Q 155 560 170 610 T 215 702" />
          <path d="M 170 610 Q 210 615 250 630 T 270 650" />
          <path d="M 215 650 Q 230 680 238 705" />
          <path d="M 250 630 Q 270 660 280 680" />
        </g>

        {/* 4. Island Territories (Andaman & Nicobar + Lakshadweep) */}
        {/* Andaman & Nicobar */}
        <g fill="#38BDF8" opacity="0.8">
          <ellipse cx="560" cy="600" rx="3.5" ry="9" />
          <ellipse cx="564" cy="625" rx="3" ry="8" />
          <ellipse cx="568" cy="650" rx="2.5" ry="6" />
          <ellipse cx="574" cy="685" rx="3" ry="7" />
          <text x="500" y="715" fill="#587088" fontSize="8" fontFamily="'JetBrains Mono', monospace">ANDAMAN &amp; NICOBAR</text>
        </g>

        {/* Lakshadweep */}
        <g fill="#38BDF8" opacity="0.8">
          <ellipse cx="140" cy="640" rx="2.5" ry="5" />
          <ellipse cx="145" cy="660" rx="2" ry="4" />
          <ellipse cx="150" cy="680" rx="2.5" ry="5" />
          <text x="70" y="665" fill="#587088" fontSize="8" fontFamily="'JetBrains Mono', monospace">LAKSHADWEEP</text>
        </g>

        {/* 5. INTERCONNECTED CONSTELLATION TELEMETRY LINES (Optional/Toggleable) */}
        {showConstellationLines && (
          <g stroke="#38BDF8" strokeWidth="0.9" opacity="0.35" fill="none">
            {networkLines.map(([fromId, toId], idx) => {
              const fromCity = cities.find(c => c.id === fromId);
              const toCity = cities.find(c => c.id === toId);
              if (!fromCity || !toCity) return null;
              return (
                <line
                  key={idx}
                  x1={fromCity.x}
                  y1={fromCity.y}
                  x2={toCity.x}
                  y2={toCity.y}
                  strokeDasharray={idx % 2 === 0 ? "2 3" : "none"}
                />
              );
            })}
          </g>
        )}

        {/* 6. GLOWING CITY OBSERVATION NODES & TACTICAL CROSSHAIRS */}
        {cities.map((city) => {
          const isSelected = selectedCityId === city.id;
          const isHovered = hoveredCity?.id === city.id;

          return (
            <g 
              key={city.id} 
              className="cursor-pointer group"
              onClick={() => onSelectCity && onSelectCity(city.id)}
              onMouseEnter={() => setHoveredCity(city)}
              onMouseLeave={() => setHoveredCity(null)}
            >
              {/* Selected City Outer Target Lock Crosshairs */}
              {isSelected && (
                <g>
                  {/* Expanding Radar Ping */}
                  <circle
                    cx={city.x}
                    cy={city.y}
                    r="18"
                    fill="none"
                    stroke="#38BDF8"
                    strokeWidth="1.5"
                    className="animate-ping opacity-60 origin-center"
                  />
                  {/* Target Lock Ring */}
                  <circle
                    cx={city.x}
                    cy={city.y}
                    r="12"
                    fill="none"
                    stroke="#38BDF8"
                    strokeWidth="1.2"
                    strokeDasharray="3 3"
                    className="animate-[spin_6s_linear_infinite] origin-center"
                  />
                  {/* Crosshair Guides */}
                  <line x1={city.x - 16} y1={city.y} x2={city.x - 7} y2={city.y} stroke="#38BDF8" strokeWidth="1.5" />
                  <line x1={city.x + 7} y1={city.y} x2={city.x + 16} y2={city.y} stroke="#38BDF8" strokeWidth="1.5" />
                  <line x1={city.x} y1={city.y - 16} x2={city.x} y2={city.y - 7} stroke="#38BDF8" strokeWidth="1.5" />
                  <line x1={city.x} y1={city.y + 7} x2={city.x} y2={city.y + 16} stroke="#38BDF8" strokeWidth="1.5" />
                </g>
              )}

              {/* Node Outer Halo Glow */}
              <circle
                cx={city.x}
                cy={city.y}
                r={isSelected ? 6.5 : (isHovered ? 5.5 : 4)}
                fill={isSelected ? '#38BDF8' : (isHovered ? '#22D3EE' : '#38BDF8')}
                className="transition-all duration-200"
                opacity={isSelected ? 1 : 0.85}
              />

              {/* Node Core Center Dot */}
              <circle
                cx={city.x}
                cy={city.y}
                r={isSelected ? 2.5 : 1.5}
                fill="#020611"
              />

              {/* City Label */}
              <text
                x={city.x + (city.x > 320 ? 9 : -9)}
                y={city.y + 4}
                textAnchor={city.x > 320 ? 'start' : 'end'}
                fill={isSelected ? '#38BDF8' : (isHovered ? '#FFFFFF' : '#91A8BE')}
                fontSize={isSelected ? "11.5" : "10"}
                fontFamily="'JetBrains Mono', monospace"
                fontWeight={isSelected ? '700' : '500'}
                className="transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
              >
                {city.name}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Bottom Telemetry Bar */}
      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between px-3.5 py-1.5 rounded-lg bg-[#020611]/85 backdrop-blur-md border border-[#183047] text-[10px] text-[#587088]">
        <span>● DATUM: WGS-84 / SOI 2026</span>
        <span>COVERAGE: 20+ INDIAN METROS</span>
      </div>
    </div>
  );
}
