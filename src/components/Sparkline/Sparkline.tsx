import React from 'react';
import { TickerHistoryItem } from '../../types';

interface SparklineProps {
  history: TickerHistoryItem[];
  width: number;
  height: number;
}

const Sparkline: React.FC<SparklineProps> = ({ history, width, height }) => {
  if (!history || history.length < 2) return null;

  const data = history.map((v) => v.close);

  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const change = data[data.length - 1] - data[0];

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = ((value - minValue) / (maxValue - minValue)) * height;

    return `${x},${height - y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} className="overflow-visible ml-auto">
      <polyline
        data-testid="sparkline"
        className={`fill-none stroke-2 ${change >= 0 ? 'stroke-green-800' : 'stroke-red-800'}`}
        points={points}
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Sparkline;
