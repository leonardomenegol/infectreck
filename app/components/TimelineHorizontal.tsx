import React from 'react';

interface TimelineEvent {
  date: string;
  label: string;
  isPeak: boolean;
}

interface TimelineHorizontalProps {
  events: TimelineEvent[];
}

const TimelineHorizontal: React.FC<TimelineHorizontalProps> = ({ events }) => {
  return (
    <div className="flex space-x-4">
      {events.map((event, index) => (
        <div key={index} className="flex flex-col items-center">
          <div
            className={`h-4 w-4 rounded-full ${event.isPeak ? 'bg-red-500' : 'bg-gray-300'}`}
          ></div>
          <span className="text-xs mt-1">{event.label}</span>
        </div>
      ))}
    </div>
  );
};

export default TimelineHorizontal;
