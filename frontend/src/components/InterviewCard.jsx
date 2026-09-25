import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, ChevronRight, Award, Briefcase, Clock } from 'lucide-react';

const STATUS_STYLES = {
  COMPLETED: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  IN_PROGRESS: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  PENDING: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
};

function formatDate(dateStr) {
  if (!dateStr) return '';
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

export default function InterviewCard({ interview, score }) {
  const navigate = useNavigate();
  const status = interview?.status || 'PENDING';

  return (
    <div
      className="card-hover group"
      onClick={() => navigate(`/results/${interview.interviewId}`)}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Briefcase className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white truncate">
              {interview?.jobRole || 'Unknown Role'}
            </h3>
          </div>
          <div className="ml-10 flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatDate(interview?.createdAt)}
            </span>
            {interview?.experienceLevel && (
              <span className="capitalize">{interview.experienceLevel}</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {score !== undefined && score !== null && (
            <div className="flex items-center gap-1 text-sm font-bold text-indigo-600 dark:text-indigo-400">
              <Award className="w-4 h-4" />
              {Number(score).toFixed(1)}/10
            </div>
          )}
          <span
            className={`badge text-xs ${STATUS_STYLES[status] || STATUS_STYLES.PENDING}`}
          >
            {status.replace('_', ' ')}
          </span>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors duration-200 group-hover:translate-x-0.5" />
        </div>
      </div>

      {interview?.jobDescription && (
        <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {interview.jobDescription}
        </p>
      )}
    </div>
  );
}
