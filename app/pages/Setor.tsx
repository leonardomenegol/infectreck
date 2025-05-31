import React from 'react';
import HeatmapComponent from '../components/HeatmapComponent';
import TimelineHorizontal from '../components/TimelineHorizontal';
import CardResumo from '../components/CardResumo';
import RankingList from '../components/RankingList';

const Setor: React.FC = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 h-screen bg-gray-800 text-gray-300 flex flex-col p-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-100">Infectrack</h2>
        <nav className="flex flex-col gap-4">
          <a href="/dashboard" className="hover:bg-gray-700 p-2 rounded text-gray-300">Visão por Hospital</a>
          <a href="/setor" className="hover:bg-gray-700 p-2 rounded text-gray-300">Ranking de Setores</a>
          <a href="/leito" className="hover:bg-gray-700 p-2 rounded text-gray-300">Detalhes de Leitos</a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-1 bg-gray-100">
        <h1 className="text-4xl font-bold mb-6 text-black">Mapa de Calor por Setor</h1>

        {/* Mapa de Calor */}
        <div className="w-full max-w-4xl mb-6">
          <HeatmapComponent data={[]} />
        </div>

        {/* Ranking de Setores */}
        <div className="w-full max-w-4xl mb-6">
          <RankingList items={[]} />
        </div>

        {/* Linha do Tempo */}
        <div className="w-full max-w-4xl mb-6">
          <TimelineHorizontal events={[]} />
        </div>

        {/* Painel Resumo */}
        <div className="grid grid-cols-3 gap-4 w-full max-w-4xl">
          <CardResumo title="Total de Casos Ativos" value={5} status="critical" />
          <CardResumo title="Setores com Surtos Recentes" value={3} status="warning" />
        </div>

        {/* Botão para Detalhes */}
        <div className="mt-6 text-center">
          <button
            className="bg-indigo-600 text-gray-100 py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Ver Detalhes do Setor
          </button>
        </div>
      </div>
    </div>
  );
};

export default Setor;
