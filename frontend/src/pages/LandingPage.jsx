import React, { useState, useEffect } from 'react';
import HeroSection from '../components/Landing/HeroSection';
import TelemetryStrip from '../components/Landing/TelemetryStrip';
import FeaturedCities from '../components/Landing/FeaturedCities';
import HowItWorks from '../components/Landing/HowItWorks';
import DetectionFeatures from '../components/Landing/DetectionFeatures';
import TemporalPreview from '../components/Landing/TemporalPreview';
import ObservationPanel from '../components/Landing/ObservationPanel';
import ResponsibleAI from '../components/Landing/ResponsibleAI';
import FinalCTA from '../components/Landing/FinalCTA';
import Footer from '../components/Landing/Footer';

export default function LandingPage({ 
  onStartAnalysis, 
  onSelectCity, 
  onOpenTemporalExplorer 
}) {
  const [selectedCityId, setSelectedCityId] = useState('mumbai');
  const [citiesList, setCitiesList] = useState([
    { id: 'mumbai', name: 'Mumbai', state: 'Maharashtra' },
    { id: 'delhi', name: 'Delhi', state: 'NCT Delhi' },
    { id: 'bengaluru', name: 'Bengaluru', state: 'Karnataka' },
    { id: 'hyderabad', name: 'Hyderabad', state: 'Telangana' },
    { id: 'chennai', name: 'Chennai', state: 'Tamil Nadu' },
    { id: 'kolkata', name: 'Kolkata', state: 'West Bengal' },
    { id: 'pune', name: 'Pune', state: 'Maharashtra' },
    { id: 'ahmedabad', name: 'Ahmedabad', state: 'Gujarat' },
    { id: 'surat', name: 'Surat', state: 'Gujarat' },
    { id: 'jaipur', name: 'Jaipur', state: 'Rajasthan' },
    { id: 'lucknow', name: 'Lucknow', state: 'Uttar Pradesh' },
    { id: 'kochi', name: 'Kochi', state: 'Kerala' },
    { id: 'chandigarh', name: 'Chandigarh', state: 'Punjab / Haryana' },
    { id: 'bhopal', name: 'Bhopal', state: 'Madhya Pradesh' },
    { id: 'nagpur', name: 'Nagpur', state: 'Maharashtra' },
    { id: 'indore', name: 'Indore', state: 'Madhya Pradesh' },
    { id: 'vadodara', name: 'Vadodara', state: 'Gujarat' },
    { id: 'nashik', name: 'Nashik', state: 'Maharashtra' },
    { id: 'thane', name: 'Thane', state: 'Maharashtra' },
    { id: 'navimumbai', name: 'Navi Mumbai', state: 'Maharashtra' }
  ]);

  // Fetch supported cities from backend if online
  useEffect(() => {
    fetch('/api/cities')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setCitiesList(data);
        }
      })
      .catch(() => {
        // Fallback gracefully to default list
      });
  }, []);

  const handleCitySelect = (cityId) => {
    setSelectedCityId(cityId);
  };

  const handleStartAnalysis = () => {
    if (onSelectCity) {
      onSelectCity(selectedCityId);
    } else if (onStartAnalysis) {
      onStartAnalysis();
    }
  };

  return (
    <div className="min-h-screen bg-[#020611] space-bg text-[#E8F3FF] flex flex-col justify-between selection:bg-[#38BDF8] selection:text-[#020611]">
      {/* 1. HERO SECTION (Branding, Tagline, City Selector, Dual CTAs, Vector India Outline) */}
      <HeroSection
        selectedCityId={selectedCityId}
        onSelectCity={handleCitySelect}
        onStartAnalysis={handleStartAnalysis}
        onOpenTemporalExplorer={onOpenTemporalExplorer}
        supportedCities={citiesList}
      />

      {/* 2. INDIA OBSERVATION TELEMETRY STRIP */}
      <TelemetryStrip citiesCount={citiesList.length} />

      {/* 3. FEATURED CITIES GRID */}
      <FeaturedCities
        selectedCityId={selectedCityId}
        onSelectCity={handleCitySelect}
        onStartAnalysis={handleStartAnalysis}
      />

      {/* 4. HOW EARTHLENS WORKS (4-Step Workflow) */}
      <HowItWorks />

      {/* 5. WHAT EARTHLENS DETECTS (6 Computer Vision Modules) */}
      <DetectionFeatures />

      {/* 6. TEMPORAL EXPLORER PREVIEW (Working Interactive Time Slider 2022-2026) */}
      <TemporalPreview
        selectedCityId={selectedCityId}
        onSelectCity={handleCitySelect}
        onOpenTemporalExplorer={onOpenTemporalExplorer}
      />

      {/* 7. CURRENT OBSERVATION INSTRUMENT PANEL */}
      <ObservationPanel
        selectedCityId={selectedCityId}
        onStartAnalysis={handleStartAnalysis}
        onSelectCity={handleCitySelect}
        supportedCities={citiesList}
      />

      {/* 8. RESPONSIBLE EARTH INTELLIGENCE */}
      <ResponsibleAI />

      {/* 9. FINAL CTA */}
      <FinalCTA
        onStartAnalysis={handleStartAnalysis}
        onOpenTemporalExplorer={onOpenTemporalExplorer}
      />

      {/* 10. FOOTER */}
      <Footer
        onStartAnalysis={handleStartAnalysis}
        onOpenTemporalExplorer={onOpenTemporalExplorer}
      />
    </div>
  );
}
