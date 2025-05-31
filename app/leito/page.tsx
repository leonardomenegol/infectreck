"use client";

import React, { useState } from 'react';
import { Chart } from 'react-google-charts';
import { supabase } from '../../frontend/supabaseClient';

const Leito: React.FC = () => {
  const [infectedBeds, setInfectedBeds] = useState([
    { id: 1, risk: '🔴', patient: { name: 'Paciente A', age: 45, bacteria: 'E. coli', infectionDate: '2025-05-01' } },
    { id: 2, risk: '🟡', patient: { name: 'Paciente B', age: 60, bacteria: 'Staphylococcus', infectionDate: '2025-05-15' } },
    { id: 3, risk: '🟢', patient: { name: 'Paciente C', age: 30, bacteria: 'Salmonella', infectionDate: '2025-05-20' } },
  ]);

  const [simulationResult, setSimulationResult] = useState<number | null>(null);

  const simulateImpact = () => {
    const newCases = Math.floor(Math.random() * 10) + 1;
    setSimulationResult(newCases);
  };

  const saveAlert = async (severity: string) => {
    const timestamp = new Date().toISOString();
    await supabase.from('alerts').insert({
      severity,
      timestamp,
    });
    alert('Alert saved successfully!');
  };

  const chartData = [
    ['Time', 'Cases'],
    ['2025-05-01', 5],
    ['2025-05-02', 8],
    ['2025-05-03', 12],
    ['2025-05-04', 15],
    ['2025-05-05', 20],
  ];

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
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Visão por Leito</h1>

        {/* Simulador */}
        <div className="w-full max-w-4xl mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Simulador</h2>
          <button
            onClick={simulateImpact}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Simular Impacto
          </button>
          {simulationResult !== null && (
            <p className="text-gray-700 mt-4">Impacto previsto: {simulationResult} novos casos.</p>
          )}
        </div>

        {/* Gráficos */}
        <div className="w-full max-w-4xl mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Gráficos</h2>
          <Chart
            chartType="LineChart"
            data={chartData}
            width="100%"
            height="400px"
            options={{ title: 'Evolução de Casos' }}
          />
        </div>

        {/* Salvar Alertas */}
        <div className="w-full max-w-4xl mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Salvar Alertas</h2>
          <button
            onClick={() => saveAlert('critical')}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Emitir Alerta Crítico
          </button>
        </div>
      </div>
    </div>
  );
};

export default Leito;
