"use client";

import React, { useState, useEffect } from 'react';
import HeatmapComponent from '../components/HeatmapComponent';
import RankingList from '../components/RankingList';
import CardResumo from '../components/CardResumo';
import { supabase } from '../../frontend/supabaseClient';

const Dashboard: React.FC = () => {
  const [selectedBacteria, setSelectedBacteria] = useState('');
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [heatmapData, setHeatmapData] = useState<{ lat: number; lng: number; intensity: number }[]>([]);
  const [rankingItems, setRankingItems] = useState<{ name: string; trend: 'up' | 'down' }[]>([]);
  const [summaryData, setSummaryData] = useState({ totalOutbreaks: 0, hospitalsWithAlerts: 0, mostRecurringBacteria: '' });

  useEffect(() => {
    // Mock data for heatmap
    const mockHeatmapData = [
      { lat: -30.0346, lng: -51.2177, intensity: 5 },
      { lat: -30.0350, lng: -51.2180, intensity: 3 },
      { lat: -30.0330, lng: -51.2160, intensity: 4 },
    ];
    setHeatmapData(mockHeatmapData);

    // Mock data for ranking
    const mockRankingItems: { name: string; trend: "up" | "down" }[] = [
      { name: "Setor A", trend: "up" },
      { name: "Setor B", trend: "down" },
      { name: "Setor C", trend: "up" },
    ];
    setRankingItems(mockRankingItems);

    // Mock data for summary panel
    const mockSummaryData = {
      totalOutbreaks: 15,
      hospitalsWithAlerts: 3,
      mostRecurringBacteria: "E. coli",
    };
    setSummaryData(mockSummaryData);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-black">Painel de Controle</h1>

      {/* Componente de Mapa de Calor */}
      <HeatmapComponent data={heatmapData} />

      {/* Filtros */}
      <div className="flex justify-between w-full max-w-4xl mb-6">
        <select
          value={selectedBacteria}
          onChange={(e) => setSelectedBacteria(e.target.value)}
          className="border border-gray-300 rounded-md p-2 text-black"
        >
          <option value="">Selecione a Bactéria</option>
          <option value="E. coli">E. coli</option>
          <option value="Staphylococcus">Staphylococcus</option>
          <option value="Salmonella">Salmonella</option>
        </select>

        <input
          type="date"
          value={dateRange[0].toISOString().split('T')[0]}
          onChange={(e) => setDateRange([new Date(e.target.value), dateRange[1]])}
          className="border border-gray-300 rounded-md p-2 text-black"
        />
        <input
          type="date"
          value={dateRange[1].toISOString().split('T')[0]}
          onChange={(e) => setDateRange([dateRange[0], new Date(e.target.value)])}
          className="border border-gray-300 rounded-md p-2 text-black"
        />
      </div>

      {/* Lista de Rankings */}
      <RankingList items={rankingItems} />

      {/* Painel de Resumo */}
      <div className="grid grid-cols-3 gap-4 w-full max-w-4xl">
        <CardResumo title="Total de Surtos Ativos" value={summaryData.totalOutbreaks} status="critical" />
        <CardResumo title="Hospitais com Alertas" value={summaryData.hospitalsWithAlerts} status="warning" />
        <CardResumo title="Bactéria Mais Recorrente" value={summaryData.mostRecurringBacteria} status="normal" />
      </div>
    </div>
  );
};

export default Dashboard;
