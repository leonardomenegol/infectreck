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
    const fetchData = async () => {
      // Fetch heatmap data
      const { data: surtos } = await supabase
        .from('surtos') 
        .select('lat, lng, intensidade');
      setHeatmapData(
        surtos
          ? surtos.map((s) => ({
              lat: s.lat,
              lng: s.lng,
              intensity: s.intensidade,
            }))
          : []
      );

      // Fetch ranking data
      const { data: hospitais } = await supabase
        .from('hospitais') 
        .select('nome, tendencia'); 
      setRankingItems(hospitais ? hospitais.map((h) => ({ name: h.nome, trend: h.tendencia })) : []);

      // Fetch summary data
      const { data: resumo } = await supabase
        .from('resumo') 
        .select('*')
        .single();
      setSummaryData({
        totalOutbreaks: resumo?.total_surtos || 0, 
        hospitalsWithAlerts: resumo?.hospitais_com_alertas || 0, 
        mostRecurringBacteria: resumo?.bacteria_mais_recorrente || '', 
      });
    };

    fetchData();
  }, []);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 h-screen bg-gray-800 text-white flex flex-col p-4">
        <h2 className="text-2xl font-bold mb-6">Infectrack</h2>
        <nav className="flex flex-col gap-4">
          <a href="/dashboard" className="hover:bg-gray-700 p-2 rounded">Visão por Hospital</a>
          <a href="/setor" className="hover:bg-gray-700 p-2 rounded">Ranking de Setores</a>
          <a href="/leito" className="hover:bg-gray-700 p-2 rounded">Detalhes de Leitos</a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-1 bg-gray-100">
        <h1 className="text-4xl font-bold mb-6 text-black">Visão por Hospital</h1>

        {/* Mapa de Calor */}
        <div className="w-full max-w-4xl mb-6">
          <HeatmapComponent data={heatmapData} />
        </div>

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

        {/* Ranking de Hospitais */}
        <div className="w-full max-w-4xl mb-6">
          <RankingList items={rankingItems} />
        </div>

        {/* Painel de Resumo */}
        <div className="grid grid-cols-3 gap-4 w-full max-w-4xl">
          <CardResumo title="Total de Surtos Ativos" value={summaryData.totalOutbreaks} status="critical" />
          <CardResumo title="Hospitais com Alertas" value={summaryData.hospitalsWithAlerts} status="warning" />
          <CardResumo title="Bactéria Mais Recorrente" value={summaryData.mostRecurringBacteria} status="normal" />
        </div>

        {/* Mapa de Hospitais com Mais Surtos */}
        <div className="w-full max-w-4xl mt-6">
          <h2 className="text-2xl font-bold mb-4 text-black">Mapa de Hospitais com Mais Surtos</h2>
          <HeatmapComponent data={heatmapData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
