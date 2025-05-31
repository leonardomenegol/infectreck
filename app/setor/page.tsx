"use client";

import React, { useEffect, useState } from 'react';
import RankingList from '../components/RankingList';
import CardResumo from '../components/CardResumo';
import { supabase } from '../../frontend/supabaseClient';
import HeatmapComponent from '../components/HeatmapComponent';
import TimelineHorizontal from '../components/TimelineHorizontal';

const Setor: React.FC = () => {
  const [rankingItems, setRankingItems] = useState<{ name: string; trend: 'up' | 'down' }[]>([]);
  const [summaryData, setSummaryData] = useState({ totalOutbreaks: 0, hospitalsWithAlerts: 0, mostRecurringBacteria: '' });
  const [selectedBacteria, setSelectedBacteria] = useState('');
  const [heatmapData, setHeatmapData] = useState<{ lat: number; lng: number; intensity: number }[]>([]);
  const [timelineEvents, setTimelineEvents] = useState<{ date: string; label: string; isPeak: boolean }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: setores } = await supabase
          .from('setores')
          .select('nome, tendencia')
          .eq('bacteria', selectedBacteria);
        setRankingItems(setores ? setores.map((s) => ({ name: s.nome, trend: s.tendencia })) : []);

        const { data: resumo } = await supabase
          .from('resumo')
          .select('*')
          .eq('bacteria', selectedBacteria)
          .single();
        setSummaryData({
          totalOutbreaks: resumo?.total_surtos || 0,
          hospitalsWithAlerts: resumo?.hospitais_com_alertas || 0,
          mostRecurringBacteria: resumo?.bacteria_mais_recorrente || '',
        });

        const { data: heatmap } = await supabase
          .from('heatmap')
          .select('*')
          .eq('bacteria', selectedBacteria);
        setHeatmapData(
          heatmap ? heatmap.map((h) => ({ lat: h.latitude, lng: h.longitude, intensity: h.intensity })) : []
        );

        const { data: timeline } = await supabase
          .from('timeline')
          .select('*')
          .eq('bacteria', selectedBacteria);
        setTimelineEvents(
          timeline ? timeline.map((t) => ({ date: t.date, label: t.label, isPeak: t.is_peak })) : []
        );
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (selectedBacteria) {
      fetchData();
    }
  }, [selectedBacteria]);

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

    // Mock data for timeline
    const mockTimelineEvents = [
      { date: "2025-05-01", label: "Surto A", isPeak: true },
      { date: "2025-05-15", label: "Surto B", isPeak: false },
      { date: "2025-05-30", label: "Surto C", isPeak: true },
    ];
    setTimelineEvents(mockTimelineEvents);

    // Mock data for summary panel
    const mockSummaryData = {
      totalOutbreaks: 15,
      hospitalsWithAlerts: 3,
      mostRecurringBacteria: "E. coli",
    };
    setSummaryData(mockSummaryData);
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
        <h1 className="text-4xl font-bold mb-6 text-black">Ranking de Setores</h1>

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
        </div>

        {/* Mapa de Calor */}
        <div className="w-full max-w-4xl mb-6">
          <HeatmapComponent data={heatmapData} initialCenter={{ lat: -30.0346, lng: -51.2177 }} />
        </div>

        {/* Ranking de Setores */}
        <div className="w-full max-w-4xl mb-6">
          <RankingList items={rankingItems} />
        </div>

        {/* Linha do Tempo */}
        <div className="w-full max-w-4xl mb-6">
          <TimelineHorizontal events={timelineEvents} />
        </div>

        {/* Painel de Resumo */}
        <div className="grid grid-cols-3 gap-4 w-full max-w-4xl">
          <CardResumo title="Total de Surtos Ativos" value={summaryData.totalOutbreaks} status="critical" />
          <CardResumo title="Hospitais com Alertas" value={summaryData.hospitalsWithAlerts} status="warning" />
          <CardResumo title="Bactéria Mais Recorrente" value={summaryData.mostRecurringBacteria} status="normal" />
        </div>
      </div>
    </div>
  );
};

export default Setor;
