import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  ChevronDown,
  FileText,
  Hash,
  Sparkles,
  ArrowRight,
  Lightbulb,
} from 'lucide-react';
import { interviewAPI } from '../api/api';
import { useApp } from '../context/AppContext';

const EXPERIENCE_LEVELS = [
  { value: 'FRESHER', label: 'Fresher', desc: '0-1 years experience', emoji: '🌱' },
  { value: 'JUNIOR', label: 'Junior', desc: '1-3 years experience', emoji: '🚀' },
  { value: 'MID', label: 'Mid-Level', desc: '3-5 years experience', emoji: '⚡' },
  { value: 'SENIOR', label: 'Senior', desc: '5+ years experience', emoji: '🏆' },
];

const QUESTION_COUNTS = [5, 10, 15];

const TIPS = [
  'Be specific with your job description for more targeted questions.',
  'Choose a realistic experience level for the best practice.',
  'Start with fewer questions to get comfortable with the format.',
  'Read each question carefully before typing your answer.',
  'Use the STAR method (Situation, Task, Action, Result) for behavioral questions.',
];

export default function StartInterview() {
  const { user, toast } = useApp();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    jobRole: '',
    experienceLevel: 'FRESHER',
    jobDescription: '',
    numberOfQuestions: 5,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.jobRole.trim()) errs.jobRole = 'Job role is required';
    if (!form.jobDescription.trim()) errs.jobDescription = 'Job description is required';
    else if (form.jobDescription.trim().length < 20)
      errs.jobDescription = 'Please provide a more detailed description (min 20 chars)';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    setErrors({});
    try {
      const payload = {
        userId: user.userId,
        jobRole: form.jobRole.trim(),
        experienceLevel: form.experienceLevel,
        jobDescription: form.jobDescription.trim(),
        numberOfQuestions: Number(form.numberOfQuestions),
      };
      const res = await interviewAPI.start(payload);
      const interview = res.data;
      toast.success('Interview started! Questions are ready. 🎉');
      navigate(`/interview/${interview.interviewId}`);
    } catch (err) {
      const msg = err?.userMessage || 'Failed to start interview. Please try again.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="section-title text-3xl font-black">Start New Interview</h1>
        <p className="section-subtitle">Configure your AI-powered practice session</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="card space-y-6">
            {/* Job Role */}
            <div>
              <label className="label">
                <Briefcase className="w-4 h-4 inline mr-1.5" />
                Job Role *
              </label>
              <input
                type="text"
                placeholder="e.g., Frontend Developer, Data Scientist"
                value={form.jobRole}
                onChange={(e) => setForm((f) => ({ ...f, jobRole: e.target.value }))}
                className={`input-field ${errors.jobRole ? 'border-red-400 focus:ring-red-500' : ''}`}
              />
              {errors.jobRole && <p className="text-red-500 text-xs mt-1">{errors.jobRole}</p>}
            </div>

            {/* Experience Level */}
            <div>
              <label className="label">Experience Level *</label>
              <div className="grid grid-cols-2 gap-3">
                {EXPERIENCE_LEVELS.map(({ value, label, desc, emoji }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, experienceLevel: value }))}
                    className={`p-3 rounded-xl border-2 text-left transition-all duration-200 ${
                      form.experienceLevel === value
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                        : 'border-slate-200 dark:border-slate-600 hover:border-indigo-300 dark:hover:border-indigo-700'
                    }`}
                  >
                    <div className="text-lg mb-0.5">{emoji}</div>
                    <div className={`text-sm font-semibold ${form.experienceLevel === value ? 'text-indigo-700 dark:text-indigo-300' : 'text-slate-900 dark:text-white'}`}>
                      {label}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Job Description */}
            <div>
              <label className="label">
                <FileText className="w-4 h-4 inline mr-1.5" />
                Job Description *
              </label>
              <textarea
                rows={4}
                placeholder="Paste the job description or describe the role requirements..."
                value={form.jobDescription}
                onChange={(e) => setForm((f) => ({ ...f, jobDescription: e.target.value }))}
                className={`input-field resize-none ${errors.jobDescription ? 'border-red-400 focus:ring-red-500' : ''}`}
              />
              <div className="flex items-center justify-between mt-1">
                {errors.jobDescription ? (
                  <p className="text-red-500 text-xs">{errors.jobDescription}</p>
                ) : (
                  <p className="text-xs text-slate-400">More detail = better questions</p>
                )}
                <p className="text-xs text-slate-400">{form.jobDescription.length} chars</p>
              </div>
            </div>

            {/* Number of Questions */}
            <div>
              <label className="label">
                <Hash className="w-4 h-4 inline mr-1.5" />
                Number of Questions *
              </label>
              <div className="flex gap-3">
                {QUESTION_COUNTS.map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, numberOfQuestions: n }))}
                    className={`flex-1 py-3 rounded-xl border-2 font-semibold text-sm transition-all duration-200 ${
                      form.numberOfQuestions === n
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300'
                        : 'border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:border-indigo-300'
                    }`}
                  >
                    {n} Qs
                    {n === 5 && <div className="text-xs font-normal text-slate-400">~10 min</div>}
                    {n === 10 && <div className="text-xs font-normal text-slate-400">~20 min</div>}
                    {n === 15 && <div className="text-xs font-normal text-slate-400">~30 min</div>}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 py-3.5"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating questions...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Interview
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Tips sidebar */}
        <div className="space-y-4">
          <div className="card border-l-4 border-indigo-500">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-yellow-500" />
              Interview Tips
            </h3>
            <ul className="space-y-3">
              {TIPS.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <span className="w-5 h-5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          <div className="card bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-0">
            <div className="text-center">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">
                AI-Powered Questions
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Our AI generates role-specific questions based on your job description and experience level.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
