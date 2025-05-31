import React from 'react';

const Hospital: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Mapa de Calor por Hospital</h1>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Heatmap Section */}
        <div className="flex-1 bg-white p-4 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-4">Mapa de Calor</h2>
          <div className="h-64 bg-gray-200 rounded">Heatmap Placeholder</div>
        </div>

        {/* Filters Section */}
        <div className="flex-1 bg-white p-4 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-4">Filtros</h2>
          <div className="mb-4">
            <label htmlFor="bacteria" className="block text-sm font-medium text-gray-700">Bactéria</label>
            <select
              id="bacteria"
              name="bacteria"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Selecione</option>
              <option value="e_coli">E. coli</option>
              <option value="staphylococcus">Staphylococcus</option>
              <option value="klebsiella">Klebsiella</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="period" className="block text-sm font-medium text-gray-700">Período</label>
            <input
              type="date"
              id="period"
              name="period"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Ranking Section */}
        <div className="flex-1 bg-white p-4 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-4">Ranking de Hospitais</h2>
          <ul className="list-disc pl-5">
            <li>Hospital A <span className="text-green-500">↑</span></li>
            <li>Hospital B <span className="text-red-500">↓</span></li>
            <li>Hospital C <span className="text-green-500">↑</span></li>
          </ul>
        </div>
      </div>

      {/* Summary Panel */}
      <div className="mt-6 bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Painel Resumo</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-100 p-4 rounded">
            <p><strong>Nº de surtos ativos:</strong> 10</p>
          </div>
          <div className="bg-gray-100 p-4 rounded">
            <p><strong>Hospitais com alertas:</strong> 5</p>
          </div>
          <div className="bg-gray-100 p-4 rounded">
            <p><strong>Bactéria mais comum:</strong> E. coli</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hospital;
