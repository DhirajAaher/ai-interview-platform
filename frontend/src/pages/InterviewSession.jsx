import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Clock,
  Send,
  SkipForward,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  ChevronRight,
  Flag,
} from 'lucide-react';
import { questionAPI, answerAPI } from '../api/api';
import { useApp } from '../context/AppContext';
import ProgressBar from '../components/ProgressBar';
import QuestionCard from '../components/QuestionCard';
import { SkeletonQuestion } from '../components/LoadingSkeleton';

const TIMER_SECONDS = 120; // 2 minutes per question

const TIPS = [
  'Structure your answer with clear sections.',
  'Give examples from real projects when possible.',
  'It\'s OK to take a moment to think before answering.',
  'Mention trade-offs when discussing technical decisions.',
  'Be concise but thorough.',
  'Use the STAR method for behavioral questions.',
  'Mention specific technologies/tools you\'ve used.',
];

function Timer({ seconds, isWarning }) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono font-bold text-lg transition-colors duration-300 ${
        isWarning
          ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 animate-pulse'
          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
      }`}
    >
      <Clock className="w-5 h-5" />
      {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
    </div>
  );
}

export default function InterviewSession() {
  const { interviewId } = useParams();
  const navigate = useNavigate();
  const { toast } = useApp();

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [submittedCount, setSubmittedCount] = useState(0);
  const [tip, setTip] = useState(TIPS[0]);
  const [finished, setFinished] = useState(false);
  const textareaRef = useRef(null);
  const timerRef = useRef(null);

  // Load questions
  useEffect(() => {
    const load = async () => {
      try {
        const res = await questionAPI.getByInterview(interviewId);
        setQuestions(res.data || []);
      } catch {
        toast.error('Failed to load questions.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [interviewId, toast]);

  // Timer
  useEffect(() => {
    if (loading || finished) return;
    setTimeLeft(TIMER_SECONDS);

    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          handleTimeUp();
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [currentIndex, loading, finished]);

  // Rotate tips
  useEffect(() => {
    const idx = Math.floor(Math.random() * TIPS.length);
    setTip(TIPS[idx]);
  }, [currentIndex]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') handleSkip();
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handleSubmit();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [answer, currentIndex, questions]);

  const handleTimeUp = useCallback(() => {
    toast.warning('Time\'s up! Moving to next question.');
    goNext();
  }, []);

  const goNext = useCallback(() => {
    if (currentIndex >= questions.length - 1) {
      setFinished(true);
      clearInterval(timerRef.current);
    } else {
      setCurrentIndex((i) => i + 1);
      setAnswer('');
      setTimeout(() => textareaRef.current?.focus(), 100);
    }
  }, [currentIndex, questions.length]);

  const handleSkip = useCallback(() => {
    clearInterval(timerRef.current);
    toast.info('Question skipped.');
    goNext();
  }, [goNext, toast]);

  const handleSubmit = useCallback(async () => {
    if (!answer.trim()) {
      toast.warning('Please write an answer before submitting.');
      return;
    }
    const question = questions[currentIndex];
    if (!question) return;

    setSubmitting(true);
    clearInterval(timerRef.current);

    try {
      // Submit answer
      const submitRes = await answerAPI.submit({
        questionId: question.questionId,
        answerText: answer.trim(),
      });
      const answerId = submitRes.data?.answerId;
      setSubmittedCount((c) => c + 1);
      toast.success('Answer submitted! Evaluating...');

      // Auto-evaluate
      if (answerId) {
        setEvaluating(true);
        try {
          await answerAPI.evaluate(answerId);
          toast.success('AI evaluation complete! ✨');
        } catch {
          toast.warning('Evaluation queued — will be ready in results.');
        } finally {
          setEvaluating(false);
        }
      }
      goNext();
    } catch (err) {
      toast.error(err?.userMessage || 'Failed to submit answer.');
    } finally {
      setSubmitting(false);
    }
  }, [answer, questions, currentIndex, goNext, toast]);

  const handleFinish = () => {
    clearInterval(timerRef.current);
    navigate(`/results/${interviewId}`);
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto">
        <SkeletonQuestion />
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="max-w-xl mx-auto text-center card py-16">
        <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No questions found</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-4">
          The interview may still be generating questions. Try refreshing.
        </p>
        <button onClick={() => window.location.reload()} className="btn-primary">
          Refresh
        </button>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="max-w-xl mx-auto text-center animate-fade-in">
        <div className="card py-16">
          <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-200 dark:shadow-green-900/30 animate-pulse-ring">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">
            Interview Complete! 🎉
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-2">
            You answered {submittedCount} out of {questions.length} questions.
          </p>
          <p className="text-slate-500 dark:text-slate-400 mb-8">
            AI feedback and scores are ready in your results.
          </p>
          <button onClick={handleFinish} className="btn-primary flex items-center gap-2 mx-auto">
            View Results
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const isWarning = timeLeft <= 30;

  return (
    <div className="max-w-3xl mx-auto animate-fade-in space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Interview Session</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {submittedCount} submitted · {questions.length - currentIndex - 1} remaining
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Timer seconds={timeLeft} isWarning={isWarning} />
          <button
            onClick={handleFinish}
            className="btn-secondary text-sm flex items-center gap-1.5 py-2"
          >
            <Flag className="w-4 h-4" />
            Finish Early
          </button>
        </div>
      </div>

      {/* Progress */}
      <ProgressBar current={currentIndex + 1} total={questions.length} />

      {/* Question */}
      <QuestionCard question={currentQuestion} index={currentIndex + 1} total={questions.length}>
        <textarea
          ref={textareaRef}
          rows={6}
          placeholder="Type your answer here... (Ctrl+Enter to submit, Esc to skip)"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          disabled={submitting || evaluating}
          autoFocus
          className="input-field resize-none text-sm leading-relaxed"
        />
        <div className="flex items-center gap-3 mt-3 flex-wrap">
          <button
            onClick={handleSubmit}
            disabled={submitting || evaluating || !answer.trim()}
            className="btn-primary flex items-center gap-2 flex-1 justify-center py-2.5"
          >
            {submitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Submitting...
              </>
            ) : evaluating ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                AI Evaluating...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Submit Answer
              </>
            )}
          </button>
          <button
            onClick={handleSkip}
            disabled={submitting}
            className="btn-secondary flex items-center gap-2 py-2.5"
          >
            <SkipForward className="w-4 h-4" />
            Skip
          </button>
        </div>
        <p className="text-xs text-slate-400 mt-2 text-center">
          Ctrl+Enter to submit · Escape to skip
        </p>
      </QuestionCard>

      {/* Tips sidebar row */}
      <div className="card bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-indigo-100 dark:border-indigo-800 flex items-start gap-3">
        <Lightbulb className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 mb-0.5">Interview Tip</p>
          <p className="text-sm text-slate-600 dark:text-slate-400">{tip}</p>
        </div>
      </div>
    </div>
  );
}
