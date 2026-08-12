import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, AlertTriangle, ShieldCheck } from 'lucide-react';

// Custom Leaflet Dark Marker Icon
const createDarkMarker = (isSelected = false) => {
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="
        width: ${isSelected ? '18px' : '12px'};
        height: ${isSelected ? '18px' : '12px'};
        background-color: ${isSelected ? '#38BDF8' : '#22D3EE'};
        border: 2px solid ${isSelected ? '#FFFFFF' : '#020611'};
        border-radius: 50%;
        box-shadow: 0 0 ${isSelected ? '12px #38BDF8' : '6px #22D3EE'};
        cursor: pointer;
        transition: all 0.3s ease;
      "></div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });
};

function MapController({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom, { duration: 1.2 });
    }
  }, [center, zoom, map]);
  return null;
}

export default function IndiaMap({ 
  cities = [], 
  selectedCity = null, 
  onSelectCity = null, 
  zones = [],
  mapHeight = "480px"
}) {
  const defaultCenter = [20.5937, 78.9629];
  const defaultZoom = 5;

  const currentCenter = selectedCity ? [selectedCity.lat, selectedCity.lon] : defaultCenter;
  const currentZoom = selectedCity ? 11 : defaultZoom;

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-[#183047] shadow-2xl bg-[#06101D]">
      {/* Top Map Header */}
      <div className="px-4 py-2.5 bg-[#020611] border-b border-[#183047] flex items-center justify-between z-10 relative">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#38BDF8]" />
          <span className="font-heading font-semibold text-xs text-[#E8F3FF] tracking-wider uppercase">
            INDIAN SATELLITE GEOSPATIAL MAP
          </span>
        </div>
        
        {selectedCity && (
          <div className="font-data text-xs text-[#38BDF8] flex items-center gap-2 bg-[#0E1C2D] px-2.5 py-1 rounded border border-[#183047]">
            <span className="text-[#E8F3FF] font-bold">{selectedCity.name.toUpperCase()}</span>
            <span className="text-[#587088]">|</span>
            <span>LAT: {selectedCity.lat.toFixed(4)}</span>
            <span>LON: {selectedCity.lon.toFixed(4)}</span>
          </div>
        )}
      </div>

      {/* Leaflet Map */}
      <div style={{ height: mapHeight, width: '100%' }}>
        <MapContainer
          center={defaultCenter}
          zoom={defaultZoom}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%', background: '#06101D' }}
        >
          <MapController center={currentCenter} zoom={currentZoom} />

          {/* Free CartoDB Dark Matter Tiles (No API key needed) */}
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://openstreetmap.org">OSM</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            maxZoom={18}
          />

          {/* City Markers */}
          {cities.map((city) => {
            const isSelected = selectedCity && selectedCity.id === city.id;
            return (
              <Marker
                key={city.id}
                position={[city.lat, city.lon]}
                icon={createDarkMarker(isSelected)}
                eventHandlers={{
                  click: () => {
                    if (onSelectCity) onSelectCity(city);
                  }
                }}
              >
                <Popup>
                  <div className="p-1 font-data text-xs space-y-1.5">
                    <div className="font-heading font-bold text-sm text-[#38BDF8] border-b border-[#183047] pb-1">
                      {city.name}, <span className="text-[#E8F3FF]">{city.state}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px]">
                      <span className="text-[#91A8BE]">LATITUDE:</span>
                      <span className="text-[#E8F3FF] font-semibold">{city.lat.toFixed(4)}</span>
                      <span className="text-[#91A8BE]">LONGITUDE:</span>
                      <span className="text-[#E8F3FF] font-semibold">{city.lon.toFixed(4)}</span>
                    </div>
                    <div className="text-[10px] text-[#22D3EE] bg-[#0E1C2D] p-1 rounded border border-[#183047] mt-1">
                      ● {city.satellite_coverage}
                    </div>
                    {onSelectCity && (
                      <button
                        onClick={() => onSelectCity(city)}
                        className="w-full mt-2 py-1 bg-[#38BDF8] text-[#020611] font-bold rounded text-[11px] hover:bg-[#22D3EE] transition-colors"
                      >
                        SELECT CITY FOR ANALYSIS
                      </button>
                    )}
                  </div>
                </Popup>
              </Marker>
            );
          })}

          {/* Detected Zone Polygons overlay */}
          {zones.map((zone, idx) => {
            const colors = {
              HIGH: '#F43F5E',
              CRITICAL: '#F43F5E',
              MODERATE: '#FBBF24',
              LOW: '#34D399'
            };
            const zoneColor = colors[zone.severity] || '#38BDF8';
            return (
              <Polygon
                key={zone.zone_id || idx}
                positions={zone.coordinates}
                pathOptions={{
                  color: zoneColor,
                  fillColor: zoneColor,
                  fillOpacity: 0.35,
                  weight: 2,
                  dashArray: '4, 4'
                }}
              >
                <Popup>
                  <div className="font-data text-xs space-y-1 p-1">
                    <div className="font-bold text-sm text-[#F43F5E]">
                      {zone.zone_id}: {zone.name}
                    </div>
                    <div>Change Vector: <span className="text-[#E8F3FF]">{zone.change_type}</span></div>
                    <div>Area Affected: <span className="text-[#38BDF8] font-bold">{zone.area_km2} km²</span></div>
                    <div>Detection Confidence: <span className="text-[#34D399] font-bold">{zone.confidence_pct}%</span></div>
                    <div>Impact Severity: <span className="font-bold uppercase" style={{ color: zoneColor }}>{zone.severity}</span></div>
                  </div>
                </Popup>
              </Polygon>
            );
          })}
        </MapContainer>
      </div>

      {/* Map Legend Overlay */}
      <div className="absolute bottom-3 left-3 z-[1000] bg-[#020611]/90 backdrop-blur border border-[#183047] p-2.5 rounded-lg font-data text-[10px] space-y-1.5 shadow-xl">
        <div className="text-[#91A8BE] font-bold tracking-wider uppercase mb-1">GEO-LAYERS</div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#38BDF8]"></span>
          <span className="text-[#E8F3FF]">Indian City Node</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded border border-[#F43F5E] bg-[#F43F5E]/40"></span>
          <span className="text-[#E8F3FF]">Detected Change Zone</span>
        </div>
      </div>
    </div>
  );
}
