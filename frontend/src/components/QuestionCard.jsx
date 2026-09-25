import React from 'react';
import { Copy, Check, BookOpen } from 'lucide-react';
import { useState } from 'react';

const DIFFICULTY_BADGE = {
  EASY: 'badge-easy',
  MEDIUM: 'badge-medium',
  HARD: 'badge-hard',
  easy: 'badge-easy',
  medium: 'badge-medium',
  hard: 'badge-hard',
};

export default function QuestionCard({ question, index, total, children }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(question.questionText || '');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const difficulty = question?.difficulty?.toUpperCase() || 'MEDIUM';

  return (
    <div className="card animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded-full">
            Q{index} / {total}
          </span>
          {question?.difficulty && (
            <span className={DIFFICULTY_BADGE[question.difficulty] || 'badge-medium'}>
              {question.difficulty}
            </span>
          )}
          {question?.questionType && (
            <span className="badge bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400">
              {question.questionType}
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          title="Copy question"
          className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-200"
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      {/* Question text */}
      <div className="flex items-start gap-3 mb-5">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5">
          <BookOpen className="w-4 h-4 text-white" />
        </div>
        <p className="text-slate-900 dark:text-white text-base font-medium leading-relaxed">
          {question?.questionText || 'Loading question...'}
        </p>
      </div>

      {/* Content slot (answer textarea, etc.) */}
      {children}
    </div>
  );
}
