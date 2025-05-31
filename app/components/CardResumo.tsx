import React from 'react';

interface CardResumoProps {
  title: string;
  value: string | number;
  status: 'critical' | 'warning' | 'normal';
}

const CardResumo: React.FC<CardResumoProps> = ({ title, value, status }) => {
  const borderColor =
    status === 'critical' ? 'border-red-500' : status === 'warning' ? 'border-yellow-500' : 'border-green-500';

  return (
    <div className={`border-2 ${borderColor} p-4 rounded shadow-md`}> 
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
};

export default CardResumo;
