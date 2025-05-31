import React from 'react';

interface HeatmapProps {
  data: number[];
}

const HeatmapComponent: React.FC<HeatmapProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-5 gap-2">
      {data.map((intensity, index) => (
        <div
          key={index}
          className="h-10 w-10 rounded"
          style={{ backgroundColor: `rgba(255, 0, 0, ${intensity})` }}
        ></div>
      ))}
    </div>
  );
};

export default HeatmapComponent;
