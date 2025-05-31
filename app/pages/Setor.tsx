import React from 'react';

const Setor: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Mapa de Calor por Setor</h1>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Heatmap Section */}
        <div className="flex-1 bg-white p-4 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-4">Mapa de Calor</h2>
          <div className="h-64 bg-gray-200 rounded">Heatmap Placeholder</div>
        </div>

        {/* Ranking Section */}
        <div className="flex-1 bg-white p-4 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-4">Ranking de Setores</h2>
          <ul className="list-disc pl-5">
            <li>Setor A <span className="text-green-500">↑</span></li>
            <li>Setor B <span className="text-red-500">↓</span></li>
            <li>Setor C <span className="text-green-500">↑</span></li>
          </ul>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="mt-6 bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Timeline de Surtos</h2>
        <div className="h-32 bg-gray-200 rounded">Timeline Placeholder</div>
      </div>

      {/* Summary Panel */}
      <div className="mt-6 bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Painel Resumo</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-100 p-4 rounded">
            <p><strong>Surtos ativos:</strong> 5</p>
          </div>
          <div className="bg-gray-100 p-4 rounded">
            <p><strong>Setores com surtos recentes:</strong> 3</p>
          </div>
        </div>
      </div>

      {/* Button to Leitos */}
      <div className="mt-6 text-center">
        <button
          className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Ver Leitos
        </button>
      </div>
    </div>
  );
};

export default Setor;
