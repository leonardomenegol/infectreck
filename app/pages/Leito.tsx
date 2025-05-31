import React from 'react';

const Leito: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Lista de Leitos Infectados</h1>
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Leitos Infectados</h2>
        <ul className="list-disc pl-5">
          <li>
            <span className="text-red-500">🔴</span> Paciente: João Silva, Idade: 45, Bactéria: E. coli, Data: 2025-05-30
          </li>
          <li>
            <span className="text-yellow-500">🟡</span> Paciente: Maria Oliveira, Idade: 60, Bactéria: Staphylococcus, Data: 2025-05-29
          </li>
          <li>
            <span className="text-green-500">🟢</span> Paciente: Carlos Santos, Idade: 50, Bactéria: Klebsiella, Data: 2025-05-28
          </li>
        </ul>
      </div>

      {/* Clinical Actions Panel */}
      <div className="mt-6 bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Ações Clínicas Recomendadas</h2>
        <ul className="list-disc pl-5">
          <li>Isolamento do paciente</li>
          <li>Administração de antibióticos</li>
          <li>Monitoramento contínuo</li>
        </ul>
      </div>

      {/* Checklist Section */}
      <div className="mt-6 bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Checklist de Ações Realizadas</h2>
        <form>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox text-indigo-600" />
              <span className="ml-2">Isolamento realizado</span>
            </label>
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox text-indigo-600" />
              <span className="ml-2">Antibióticos administrados</span>
            </label>
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox text-indigo-600" />
              <span className="ml-2">Monitoramento iniciado</span>
            </label>
          </div>
        </form>
      </div>

      {/* PDF Generator Button */}
      <div className="mt-6 text-center">
        <button
          className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Gerar PDF
        </button>
      </div>
    </div>
  );
};

export default Leito;
