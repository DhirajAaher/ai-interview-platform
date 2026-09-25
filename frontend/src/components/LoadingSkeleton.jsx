import React from 'react';

export function SkeletonLine({ className = '' }) {
  return <div className={`skeleton rounded-lg h-4 ${className}`} />;
}

export function SkeletonCard({ className = '' }) {
  return (
    <div className={`card animate-pulse ${className}`}>
      <div className="flex items-center gap-4 mb-4">
        <div className="skeleton rounded-full w-12 h-12" />
        <div className="flex-1 space-y-2">
          <SkeletonLine className="w-3/4" />
          <SkeletonLine className="w-1/2 h-3" />
        </div>
      </div>
      <div className="space-y-2">
        <SkeletonLine />
        <SkeletonLine className="w-5/6" />
        <SkeletonLine className="w-4/6" />
      </div>
    </div>
  );
}

export function SkeletonInterviewCard() {
  return (
    <div className="card animate-pulse">
      <div className="flex items-start justify-between mb-3">
        <div className="space-y-2 flex-1">
          <SkeletonLine className="w-2/3 h-5" />
          <SkeletonLine className="w-1/3 h-3" />
        </div>
        <div className="skeleton rounded-full w-16 h-6" />
      </div>
      <div className="space-y-2 mt-4">
        <SkeletonLine className="w-full h-3" />
        <SkeletonLine className="w-4/5 h-3" />
      </div>
      <div className="flex gap-2 mt-4">
        <div className="skeleton rounded-full w-20 h-6" />
        <div className="skeleton rounded-full w-20 h-6" />
      </div>
    </div>
  );
}

export function SkeletonDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="card animate-pulse">
            <div className="flex items-center gap-4">
              <div className="skeleton rounded-xl w-12 h-12" />
              <div className="space-y-2 flex-1">
                <SkeletonLine className="w-1/2 h-3" />
                <SkeletonLine className="w-1/3 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2].map((i) => (
          <SkeletonInterviewCard key={i} />
        ))}
      </div>
    </div>
  );
}

export function SkeletonQuestion() {
  return (
    <div className="card animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="space-y-2 flex-1">
          <SkeletonLine className="w-1/4 h-3" />
          <SkeletonLine className="h-6" />
          <SkeletonLine className="w-3/4 h-6" />
        </div>
      </div>
      <div className="skeleton rounded-xl h-40 mt-4" />
      <div className="skeleton rounded-lg h-11 mt-4" />
    </div>
  );
}

export default function LoadingSkeleton({ type = 'card', count = 1 }) {
  const Component = {
    card: SkeletonCard,
    interview: SkeletonInterviewCard,
    dashboard: SkeletonDashboard,
    question: SkeletonQuestion,
  }[type] || SkeletonCard;

  if (type === 'dashboard') return <Component />;

  return (
    <div className="space-y-4">
      {Array.from({ length: count }, (_, i) => (
        <Component key={i} />
      ))}
    </div>
  );
}
