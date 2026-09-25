import React from 'react';

export default function ProgressBar({ current, total, className = '' }) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className={`space-y-1 ${className}`}>
      <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
        <span>Question {current} of {total}</span>
        <span>{pct}% complete</span>
      </div>
      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
