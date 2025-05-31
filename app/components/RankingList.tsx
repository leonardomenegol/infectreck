import React from 'react';

interface RankingItem {
  name: string;
  trend: 'up' | 'down';
}

interface RankingListProps {
  items: RankingItem[];
}

const RankingList: React.FC<RankingListProps> = ({ items }) => {
  return (
    <ul className="list-disc pl-5">
      {items.map((item, index) => (
        <li key={index} className="flex items-center">
          {item.name}
          <span className={item.trend === 'up' ? 'text-green-500 ml-2' : 'text-red-500 ml-2'}>
            {item.trend === 'up' ? '↑' : '↓'}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default RankingList;
