"use client";

import React, { useState, useEffect } from 'react';
import HeatmapComponent from '../components/HeatmapComponent';
import RankingList from '../components/RankingList';
import CardResumo from '../components/CardResumo';
import { supabase } from '../../frontend/supabaseClient';

const Dashboard: React.FC = () => {
  const [selectedBacteria, setSelectedBacteria] = useState('');
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [heatmapData, setHeatmapData] = useState<number[]>([]);
  const [rankingItems, setRankingItems] = useState<{ name: string; trend: 'up' | 'down' }[]>([]);
  const [summaryData, setSummaryData] = useState({ totalOutbreaks: 0, hospitalsWithAlerts: 0, mostRecurringBacteria: '' });

  useEffect(() => {
    const fetchData = async () => {
      // Fetch heatmap data
      const { data: outbreaks } = await supabase
        .from('outbreaks')
        .select('intensity');
      setHeatmapData(outbreaks ? outbreaks.map((o: { intensity: number }) => o.intensity) : []);

      // Fetch ranking data
      const { data: hospitals } = await supabase
        .from('hospitals')
        .select('name, trend');
      setRankingItems(hospitals ? hospitals.map((h: { name: string; trend: 'up' | 'down' }) => ({ name: h.name, trend: h.trend })) : []);

      // Fetch summary data
      const { data: summary } = await supabase
        .from('summary')
        .select('*')
        .single();
      setSummaryData({
        totalOutbreaks: summary?.total_outbreaks || 0,
        hospitalsWithAlerts: summary?.hospitals_with_alerts || 0,
        mostRecurringBacteria: summary?.most_recurring_bacteria || '',
      });
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Dashboard</h1>

      {/* Heatmap Component */}
      <HeatmapComponent data={heatmapData} />

      {/* Filters */}
      <div className="flex justify-between w-full max-w-4xl mb-6">
        <select
          value={selectedBacteria}
          onChange={(e) => setSelectedBacteria(e.target.value)}
          className="border border-gray-300 rounded-md p-2"
        >
          <option value="">Select Bacteria</option>
          <option value="E. coli">E. coli</option>
          <option value="Staphylococcus">Staphylococcus</option>
          <option value="Salmonella">Salmonella</option>
        </select>

        <input
          type="date"
          value={dateRange[0].toISOString().split('T')[0]}
          onChange={(e) => setDateRange([new Date(e.target.value), dateRange[1]])}
          className="border border-gray-300 rounded-md p-2"
        />
        <input
          type="date"
          value={dateRange[1].toISOString().split('T')[0]}
          onChange={(e) => setDateRange([dateRange[0], new Date(e.target.value)])}
          className="border border-gray-300 rounded-md p-2"
        />
      </div>

      {/* Ranking List */}
      <RankingList items={rankingItems} />

      {/* Summary Panel */}
      <div className="grid grid-cols-3 gap-4 w-full max-w-4xl">
        <CardResumo title="Total Active Outbreaks" value={summaryData.totalOutbreaks} status="critical" />
        <CardResumo title="Hospitals with Alerts" value={summaryData.hospitalsWithAlerts} status="warning" />
        <CardResumo title="Most Recurring Bacteria" value={summaryData.mostRecurringBacteria} status="normal" />
      </div>
    </div>
  );
};

export default Dashboard;
