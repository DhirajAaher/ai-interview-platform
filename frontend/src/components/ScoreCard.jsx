import React from 'react';
import { TrendingUp } from 'lucide-react';

function CircularProgress({ value, size = 120, strokeWidth = 10 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(Math.max(value, 0), 10);
  const offset = circumference - (progress / 10) * circumference;

  const color =
    progress >= 7
      ? 'stroke-green-500'
      : progress >= 4
      ? 'stroke-yellow-500'
      : 'stroke-red-500';

  const textColor =
    progress >= 7
      ? 'text-green-600 dark:text-green-400'
      : progress >= 4
      ? 'text-yellow-600 dark:text-yellow-400'
      : 'text-red-600 dark:text-red-400';

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="circular-progress">
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-slate-200 dark:text-slate-700"
        />
        {/* Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={`${color} transition-all duration-700 ease-out`}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className={`text-2xl font-bold ${textColor}`}>{progress.toFixed(1)}</span>
        <span className="text-xs text-slate-400 dark:text-slate-500">/ 10</span>
      </div>
    </div>
  );
}

export { CircularProgress };

export default function ScoreCard({ score, label = 'Score', size = 120 }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <CircularProgress value={score} size={size} />
      <div className="flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-400">
        <TrendingUp className="w-4 h-4" />
        {label}
      </div>
    </div>
  );
}
