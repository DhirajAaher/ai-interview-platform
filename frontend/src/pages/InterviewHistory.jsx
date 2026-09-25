import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { History, Plus, Search, Filter, Calendar } from 'lucide-react';
import { interviewAPI } from '../api/api';
import { useApp } from '../context/AppContext';
import InterviewCard from '../components/InterviewCard';
import { SkeletonInterviewCard } from '../components/LoadingSkeleton';

const STATUS_OPTIONS = ['ALL', 'COMPLETED', 'IN_PROGRESS', 'PENDING'];

export default function InterviewHistory() {
  const { user, toast } = useApp();
  const navigate = useNavigate();

  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const fetchInterviews = useCallback(async () => {
    setLoading(true);
    try {
      const res = await interviewAPI.getAll();
      const all = res.data || [];
      const mine = all.filter(
        (iv) => iv.user?.userId === user?.userId || iv.userId === user?.userId
      );
      setInterviews(mine.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch {
      toast.error('Failed to load interview history.');
    } finally {
      setLoading(false);
    }
  }, [user?.userId, toast]);

  useEffect(() => {
    fetchInterviews();
  }, [fetchInterviews]);

  const filtered = interviews.filter((iv) => {
    const matchSearch =
      !search ||
      iv.jobRole?.toLowerCase().includes(search.toLowerCase()) ||
      iv.jobDescription?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'ALL' || iv.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="section-title flex items-center gap-2">
            <History className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            Interview History
          </h1>
          <p className="section-subtitle">
            {interviews.length} total interview{interviews.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={() => navigate('/start-interview')}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          New Interview
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by role or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-11"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-field pl-9 pr-8 appearance-none cursor-pointer min-w-[160px]"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s === 'ALL' ? 'All Statuses' : s.replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => <SkeletonInterviewCard key={i} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="card text-center py-16">
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
            {interviews.length === 0 ? 'No interviews yet' : 'No results match'}
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
            {interviews.length === 0
              ? 'Start your first AI interview session!'
              : 'Try adjusting your search or filter.'}
          </p>
          {interviews.length === 0 && (
            <button onClick={() => navigate('/start-interview')} className="btn-primary inline-flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Start First Interview
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filtered.map((iv) => (
            <InterviewCard key={iv.interviewId} interview={iv} score={iv.averageScore} />
          ))}
        </div>
      )}
    </div>
  );
}
