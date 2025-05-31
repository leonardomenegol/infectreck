import React, { useState } from 'react';

interface ModalChecklistProps {
  actions: string[];
}

const ModalChecklist: React.FC<ModalChecklistProps> = ({ actions }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
      >
        Abrir Checklist
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-lg font-semibold mb-4">Checklist de Ações</h2>
            <ul className="list-disc pl-5">
              {actions.map((action, index) => (
                <li key={index}>
                  <label className="inline-flex items-center">
                    <input type="checkbox" className="form-checkbox text-indigo-600" />
                    <span className="ml-2">{action}</span>
                  </label>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalChecklist;
