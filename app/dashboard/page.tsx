"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import RankingList from '../components/RankingList';
import CardResumo from '../components/CardResumo';
import { supabase } from '../../frontend/supabaseClient';
import { GoogleMap, HeatmapLayer, useJsApiLoader } from '@react-google-maps/api';

const Dashboard: React.FC = () => {
  const [selectedBacteria, setSelectedBacteria] = useState('');
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [heatmapData, setHeatmapData] = useState<{ lat: number; lng: number; intensity: number }[]>([]);
  const [rankingItems, setRankingItems] = useState<{ name: string; trend: 'up' | 'down' }[]>([]);
  const [summaryData, setSummaryData] = useState({ totalOutbreaks: 0, hospitalsWithAlerts: 0, mostRecurringBacteria: '' });

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: ['visualization'],
  });

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

  const heatmapDataPoints = heatmapData.map((point) => ({ location: new google.maps.LatLng(point.lat, point.lng), weight: point.intensity }));

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
        {isLoaded && (
          <GoogleMap
            mapContainerStyle={{ height: '500px', width: '100%' }}
            center={{ lat: -30.0346, lng: -51.2177 }}
            zoom={12}
          >
            <HeatmapLayer data={heatmapDataPoints} />
          </GoogleMap>
        )}

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
      </div>
    </div>
  );
};

export default Dashboard;
