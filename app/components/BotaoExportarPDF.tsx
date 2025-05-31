import React from 'react';
import { jsPDF } from 'jspdf';

interface BotaoExportarPDFProps {
  targetId: string;
}

const BotaoExportarPDF: React.FC<BotaoExportarPDFProps> = ({ targetId }) => {
  const handleExport = () => {
    const element = document.getElementById(targetId);
    if (element) {
      const pdf = new jsPDF();
      pdf.html(element, {
        callback: (doc) => {
          doc.save('document.pdf');
        },
      });
    }
  };

  return (
    <button
      onClick={handleExport}
      className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
    >
      Exportar PDF
    </button>
  );
};

export default BotaoExportarPDF;
