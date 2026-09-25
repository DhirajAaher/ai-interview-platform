import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, TrendingUp, Clock, Award, BarChart2, ArrowRight, Zap, Play } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { interviewAPI } from '../api/api';

function StatCard({ label, value, sub, icon: Icon, gradient, delay = 0 }) {
  return (
    <div className="stat-card animate-fade-in" style={{animationDelay:`${delay}s`, opacity:0, animationFillMode:'forwards'}}>
      <div style={{position:'absolute', top:'-30px', right:'-30px', width:'90px', height:'90px', borderRadius:'50%',
        background: gradient, opacity:0.12, pointerEvents:'none'}} />
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background: gradient.replace('linear-gradient','').slice(0,-1).replace('135deg,','').split(',')[0].trim() + '22'}}>
          <Icon className="w-5 h-5" style={{color: 'white'}} />
        </div>
        <span className="text-xs font-semibold px-2 py-1 rounded-full"
          style={{background:'rgba(99,102,241,0.12)', color:'#818cf8'}}>{sub}</span>
      </div>
      <p className="text-3xl font-black text-white mb-1">{value}</p>
      <p className="text-sm text-slate-500">{label}</p>
    </div>
  );
}

function InterviewRow({ interview }) {
  const statusColor = {
    STARTED: { bg:'#1e293b', text:'#94a3b8', dot:'#94a3b8' },
    COMPLETED: { bg:'rgba(16,185,129,0.12)', text:'#34d399', dot:'#10b981' },
    IN_PROGRESS: { bg:'rgba(245,158,11,0.12)', text:'#fbbf24', dot:'#f59e0b' },
  }[interview.status] || { bg:'#1e293b', text:'#94a3b8', dot:'#94a3b8' };

  return (
    <div className="flex items-center justify-between py-3.5 border-b"
      style={{borderColor:'rgba(255,255,255,0.05)'}}>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base"
          style={{background:'rgba(99,102,241,0.12)'}}>
          🎯
        </div>
        <div>
          <p className="text-white font-semibold text-sm">{interview.jobRole || 'Interview'}</p>
          <p className="text-slate-500 text-xs">{interview.experienceLevel} • {interview.createdAt}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5"
          style={{background: statusColor.bg, color: statusColor.text}}>
          <span className="w-1.5 h-1.5 rounded-full" style={{background: statusColor.dot}} />
          {interview.status}
        </span>
        <Link to={`/results/${interview.interviewId}`}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-500 hover:text-indigo-400 hover:bg-indigo-500/10 transition-all">
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { user, toast } = useApp();
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    interviewAPI.getAll()
      .then(r => setInterviews(r.data || []))
      .catch(() => toast.error('Could not load interview history.'))
      .finally(() => setLoading(false));
  }, []);

  // Filter by current user
  const myInterviews = interviews.filter(i => i.user?.userId === user?.userId);
  const completed = myInterviews.filter(i => i.status === 'COMPLETED');
  const recent = [...myInterviews].sort((a,b) => b.interviewId - a.interviewId).slice(0, 5);

  const statCards = [
    { label: 'Total Interviews', value: myInterviews.length, sub: 'All time', icon: BarChart2, gradient:'linear-gradient(135deg,#6366f1,#8b5cf6)', delay:0 },
    { label: 'Completed', value: completed.length, sub: 'Sessions', icon: Award, gradient:'linear-gradient(135deg,#10b981,#059669)', delay:0.05 },
    { label: 'In Progress', value: myInterviews.filter(i=>i.status==='STARTED').length, sub: 'Active', icon: Clock, gradient:'linear-gradient(135deg,#f59e0b,#d97706)', delay:0.1 },
    { label: 'Best Streak', value: '🔥 3', sub: 'Days', icon: TrendingUp, gradient:'linear-gradient(135deg,#ec4899,#db2777)', delay:0.15 },
  ];

  const quickActions = [
    { to: '/start-interview', icon: Play, label: 'Start Interview', desc: 'New AI session', gradient: 'linear-gradient(135deg,#6366f1,#8b5cf6)', glow:'rgba(99,102,241,0.3)' },
    { to: '/history', icon: Clock, label: 'View History', desc: 'Past sessions', gradient: 'linear-gradient(135deg,#10b981,#059669)', glow:'rgba(16,185,129,0.3)' },
    { to: '/resume', icon: Zap, label: 'Resume Builder', desc: 'Build resume', gradient: 'linear-gradient(135deg,#f59e0b,#d97706)', glow:'rgba(245,158,11,0.3)' },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-black text-white mb-1">
              Welcome back, <span className="gradient-text">{user?.name?.split(' ')[0]}</span> 👋
            </h1>
            <p className="text-slate-500 text-sm">Ready to practice? Your next opportunity is waiting.</p>
          </div>
          <Link to="/start-interview" className="btn-primary hidden sm:inline-flex">
            <PlusCircle className="w-4 h-4" /> New Interview
          </Link>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map(s => <StatCard key={s.label} {...s} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent interviews */}
        <div className="lg:col-span-2">
          <div className="card" style={{background:'#111827', border:'1px solid rgba(255,255,255,0.06)'}}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-bold text-base">Recent Interviews</h2>
              <Link to="/history" className="text-indigo-400 text-sm hover:text-indigo-300 transition-colors flex items-center gap-1">
                View all <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {loading ? (
              <div className="space-y-3">
                {[1,2,3].map(i => <div key={i} className="skeleton h-12" />)}
              </div>
            ) : recent.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">🎯</div>
                <p className="text-white font-semibold mb-2">No interviews yet</p>
                <p className="text-slate-500 text-sm mb-5">Start your first AI interview session to begin tracking your progress.</p>
                <Link to="/start-interview" className="btn-primary py-2.5 px-5 text-sm">
                  <PlusCircle className="w-4 h-4" /> Start Interview
                </Link>
              </div>
            ) : (
              <div>
                {recent.map(interview => (
                  <InterviewRow key={interview.interviewId} interview={interview} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <div className="card" style={{background:'#111827', border:'1px solid rgba(255,255,255,0.06)'}}>
            <h2 className="text-white font-bold text-base mb-4">Quick Actions</h2>
            <div className="space-y-3">
              {quickActions.map(({ to, icon: Icon, label, desc, gradient, glow }) => (
                <Link key={to} to={to}
                  className="flex items-center gap-3 p-3 rounded-xl transition-all hover:-translate-y-0.5 group"
                  style={{background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.05)'}}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = `0 8px 24px ${glow}`}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{background: gradient}}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{label}</p>
                    <p className="text-slate-500 text-xs">{desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-600 ml-auto group-hover:text-slate-400 transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="card relative overflow-hidden"
            style={{background:'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1))', border:'1px solid rgba(99,102,241,0.2)'}}>
            <div className="absolute top-0 right-0 text-6xl opacity-10 pointer-events-none">💡</div>
            <h3 className="text-white font-bold text-sm mb-2 relative z-10">💡 Interview Tip</h3>
            <p className="text-slate-400 text-xs leading-relaxed relative z-10">
              Use the STAR method (Situation, Task, Action, Result) when answering behavioral questions for maximum impact.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
