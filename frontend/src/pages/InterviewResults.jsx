import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Trophy,
  MessageSquare,
  Star,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Share2,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from 'recharts';
import { interviewAPI } from '../api/api';
import { useApp } from '../context/AppContext';
import { CircularProgress } from '../components/ScoreCard';
import { SkeletonCard } from '../components/LoadingSkeleton';

function ScoreBadge({ score }) {
  if (score === null || score === undefined) return <span className="badge bg-slate-100 dark:bg-slate-700 text-slate-500">Pending</span>;
  const s = Number(score);
  if (s >= 7) return <span className="badge bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">Score: {s.toFixed(1)}/10</span>;
  if (s >= 4) return <span className="badge bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400">Score: {s.toFixed(1)}/10</span>;
  return <span className="badge bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400">Score: {s.toFixed(1)}/10</span>;
}

function QuestionResult({ item, index }) {
  const [open, setOpen] = useState(false);
  const score = item.score !== undefined && item.score !== null ? Number(item.score) : null;
  const hasAnswer = item.answer && item.answer.trim();

  return (
    <div className="card border-l-4 transition-all duration-200 hover:shadow-md"
      style={{
        borderLeftColor: score === null ? '#94a3b8' : score >= 7 ? '#22c55e' : score >= 4 ? '#eab308' : '#ef4444'
      }}>
      <div
        className="flex items-start justify-between gap-3 cursor-pointer"
        onClick={() => setOpen((v) => !v)}
      >
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <span className="w-7 h-7 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-400 flex-shrink-0">
            {index}
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900 dark:text-white line-clamp-2">
              {item.question || item.questionText || 'Question'}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <ScoreBadge score={score} />
              {!hasAnswer && (
                <span className="badge bg-slate-100 dark:bg-slate-700 text-slate-500 text-xs">Skipped</span>
              )}
            </div>
          </div>
        </div>
        <button className="text-slate-400 flex-shrink-0 mt-0.5">
          {open ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 space-y-4 animate-fade-in">
          {hasAnswer ? (
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Your Answer</p>
              <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                {item.answer}
              </div>
            </div>
          ) : (
            <div className="text-sm text-slate-400 dark:text-slate-500 italic">No answer provided (skipped)</div>
          )}
          {item.feedback && (
            <div>
              <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                <Star className="w-3.5 h-3.5" />
                AI Feedback
              </p>
              <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-xl p-4 text-sm text-indigo-800 dark:text-indigo-200 leading-relaxed">
                {item.feedback}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function InterviewResults() {
  const { interviewId } = useParams();
  const navigate = useNavigate();
  const { toast } = useApp();

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await interviewAPI.getResult(interviewId);
        setResult(res.data);
      } catch (err) {
        toast.error('Failed to load results.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [interviewId, toast]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto space-y-4">
        {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (!result) {
    return (
      <div className="max-w-xl mx-auto text-center card py-16">
        <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Results not available</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-4">The interview may still be processing.</p>
        <button onClick={() => navigate('/history')} className="btn-secondary">
          Back to History
        </button>
      </div>
    );
  }

  const avgScore = result.averageScore || 0;
  const questions = result.questions || [];

  // Bar chart data
  const barData = questions.map((q, i) => ({
    name: `Q${i + 1}`,
    score: q.score !== null && q.score !== undefined ? Number(q.score) : 0,
  }));

  const getGrade = (score) => {
    if (score >= 8) return { label: 'Excellent', icon: Trophy, color: 'text-green-600 dark:text-green-400' };
    if (score >= 6) return { label: 'Good', icon: CheckCircle, color: 'text-blue-600 dark:text-blue-400' };
    if (score >= 4) return { label: 'Needs Work', icon: AlertCircle, color: 'text-yellow-600 dark:text-yellow-400' };
    return { label: 'Keep Practicing', icon: XCircle, color: 'text-red-600 dark:text-red-400' };
  };

  const grade = getGrade(avgScore);
  const GradeIcon = grade.icon;

  return (
    <div className="max-w-3xl mx-auto animate-fade-in space-y-6">
      {/* Header actions */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <button onClick={() => navigate('/history')} className="btn-secondary flex items-center gap-2 text-sm py-2">
          <ArrowLeft className="w-4 h-4" />
          Back to History
        </button>
        <div className="flex gap-2">
          <button onClick={() => navigate('/start-interview')} className="btn-primary flex items-center gap-2 text-sm py-2">
            <RotateCcw className="w-4 h-4" />
            New Interview
          </button>
        </div>
      </div>

      {/* Score overview */}
      <div className="card bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white border-0">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-black mb-1">{result.jobRole || 'Interview Results'}</h1>
            <p className="text-indigo-100 text-sm mb-4">
              {result.answeredQuestions || 0} / {result.totalQuestions || questions.length} questions answered
            </p>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <GradeIcon className="w-5 h-5 text-white" />
              <span className="font-semibold text-white">{grade.label}</span>
            </div>
          </div>
          <div className="flex-shrink-0">
            <div className="relative">
              <CircularProgress value={avgScore} size={140} strokeWidth={12} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center mt-2">
                  <div className="text-3xl font-black text-white">{Number(avgScore).toFixed(1)}</div>
                  <div className="text-indigo-200 text-xs">/ 10</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      {barData.length > 0 && (
        <div className="card">
          <h2 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-indigo-500" />
            Score Per Question
          </h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} className="text-slate-500" />
              <YAxis domain={[0, 10]} tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  background: 'var(--color-bg-secondary)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '12px',
                  fontSize: '12px',
                }}
              />
              <Bar
                dataKey="score"
                fill="url(#scoreGradient)"
                radius={[6, 6, 0, 0]}
              />
              <defs>
                <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Question details */}
      <div>
        <h2 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-indigo-500" />
          Detailed Feedback ({questions.length} questions)
        </h2>
        <div className="space-y-3">
          {questions.map((q, i) => (
            <QuestionResult key={q.questionId || i} item={q} index={i + 1} />
          ))}
        </div>
      </div>
    </div>
  );
}
