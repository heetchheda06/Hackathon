import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import AnalyzePage from './pages/AnalyzePage';
import ExplorerPage from './pages/ExplorerPage';
import ReportsPage from './pages/ReportsPage';

export default function App() {
  const [activeTab, setActiveTab] = useState('landing');
  const [selectedCityId, setSelectedCityId] = useState('mumbai');
  const [activeReportData, setActiveReportData] = useState(null);

  const handleSelectCity = (cityId) => {
    setSelectedCityId(cityId);
    setActiveTab('analyze');
  };

  const handleNavigateToAnalyzer = (cityId, dateA = '2023-01', dateB = '2026-01') => {
    setSelectedCityId(cityId);
    setActiveTab('analyze');
  };

  const handleGenerateReport = (analysisResult) => {
    setActiveReportData(analysisResult);
    setActiveTab('reports');
  };

  return (
    <div className="min-h-screen bg-[#020611] text-[#E8F3FF] space-bg flex flex-col font-sans selection:bg-[#38BDF8] selection:text-[#020611]">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1">
        {activeTab === 'landing' && (
          <LandingPage
            onStartAnalysis={() => setActiveTab('analyze')}
            onSelectCity={handleSelectCity}
            onOpenTemporalExplorer={() => setActiveTab('explorer')}
          />
        )}

        {activeTab === 'dashboard' && (
          <Dashboard
            onSelectCity={handleSelectCity}
            onNavigateAnalyze={() => setActiveTab('analyze')}
            onOpenTemporalExplorer={() => setActiveTab('explorer')}
          />
        )}

        {activeTab === 'analyze' && (
          <AnalyzePage
            initialCityId={selectedCityId}
            onGenerateReport={handleGenerateReport}
          />
        )}

        {activeTab === 'explorer' && (
          <ExplorerPage 
            onSelectCity={handleSelectCity}
            onNavigateToAnalyzer={handleNavigateToAnalyzer}
          />
        )}

        {activeTab === 'reports' && (
          <ReportsPage reportData={activeReportData} />
        )}
      </main>
    </div>
  );
}
