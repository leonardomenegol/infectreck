import React from 'react';

interface HeatmapProps {
  data: { lat: number; lng: number; intensity: number }[];
  initialCenter?: { lat: number; lng: number };
}

const HeatmapComponent: React.FC<HeatmapProps> = ({ data, initialCenter }) => {
  console.log('Heatmap data:', data);
  console.log('Initial center:', initialCenter);

  const centerStyle = initialCenter
    ? {
        top: `${(initialCenter.lat + 90) / 180 * 100}%`,
        left: `${(initialCenter.lng + 180) / 360 * 100}%`,
        width: '10px',
        height: '10px',
        backgroundColor: 'blue',
        borderRadius: '50%',
        position: 'absolute' as const,
      }
    : {};

  return (
    <div style={{ width: '100%', height: '400px', position: 'relative', backgroundColor: '#e0e0e0', border: '1px solid black' }}>
      {initialCenter && <div style={centerStyle}></div>}
      {data.map((point, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            top: `${(point.lat + 90) / 180 * 100}%`,
            left: `${(point.lng + 180) / 360 * 100}%`,
            width: `${Math.max(point.intensity * 10, 5)}px`,
            height: `${Math.max(point.intensity * 10, 5)}px`,
            backgroundColor: 'red',
            borderRadius: '50%',
            opacity: 0.5,
          }}
        ></div>
      ))}
    </div>
  );
};

export default HeatmapComponent;
