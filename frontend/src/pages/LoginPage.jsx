import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Brain, Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles, Shield, Zap } from 'lucide-react';
import { userAPI } from '../api/api';
import { useApp } from '../context/AppContext';

export default function LoginPage() {
  const { login, toast } = useApp();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email address';
    if (!form.password) errs.password = 'Password is required';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setErrors({});
    try {
      // Fetch all users and find by email
      const res = await userAPI.getAll();
      const users = res.data;
      const found = users.find(u => u.email?.toLowerCase() === form.email.trim().toLowerCase());
      if (!found) {
        throw new Error('No account found with this email. Please register first.');
      }
      login(found);
      toast.success(`Welcome back, ${found.name}! 🎉`);
      navigate('/dashboard');
    } catch (err) {
      const msg = err?.message || err?.response?.data?.message || 'Login failed. Please try again.';
      toast.error(msg);
      setErrors({ general: msg });
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: Zap, text: 'AI-powered questions' },
    { icon: Shield, text: 'Real-time feedback' },
    { icon: Sparkles, text: 'Track your progress' },
  ];

  return (
    <div className="min-h-screen auth-bg flex">
      {/* Left panel - branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden">
        {/* Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-indigo-600/20 blur-3xl animate-orb" />
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-purple-600/15 blur-3xl animate-orb" style={{animationDelay:'3s'}} />
        <div className="absolute top-1/2 left-1/2 w-60 h-60 rounded-full bg-pink-600/10 blur-3xl animate-orb" style={{animationDelay:'6s'}} />

        <Link to="/" className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <span className="font-black text-xl text-white">InterviewAI</span>
        </Link>

        <div className="relative z-10">
          <h1 className="text-5xl font-black text-white leading-tight mb-6">
            Ace your next<br />
            <span className="gradient-text">interview</span><br />
            with AI
          </h1>
          <p className="text-slate-400 text-lg mb-10 max-w-sm">
            Practice with personalized questions, get instant AI feedback, and track your improvement over time.
          </p>
          <div className="space-y-4">
            {features.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-indigo-400" />
                </div>
                <span className="text-slate-300 text-sm">{text}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-slate-600 text-sm">
          © 2025 InterviewAI. Built for students.
        </p>
      </div>

      {/* Right panel - form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md animate-fade-in">
          {/* Mobile logo */}
          <Link to="/" className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="font-black text-xl text-white">InterviewAI</span>
          </Link>

          <div className="mb-8">
            <h2 className="text-3xl font-black text-white mb-2">Welcome back</h2>
            <p className="text-slate-400">Sign in to continue your interview practice</p>
          </div>

          {/* Glass card */}
          <div className="glass rounded-2xl p-8 shadow-2xl">
            {errors.general && (
              <div className="mb-5 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-2">
                <span className="mt-0.5">⚠️</span>
                <span>{errors.general}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500" style={{width:'18px',height:'18px'}} />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className={`input-field pl-11 ${errors.email ? 'input-error' : ''}`}
                    style={{background:'rgba(255,255,255,0.05)', color:'#f1f5f9', borderColor: errors.email ? '#f87171' : '#1e3a5f'}}
                    autoFocus
                  />
                </div>
                {errors.email && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">⚠ {errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" style={{width:'18px',height:'18px'}} />
                  <input
                    type={showPass ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                    className={`input-field pl-11 pr-11 ${errors.password ? 'input-error' : ''}`}
                    style={{background:'rgba(255,255,255,0.05)', color:'#f1f5f9', borderColor: errors.password ? '#f87171' : '#1e3a5f'}}
                  />
                  <button type="button" onClick={() => setShowPass(v => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                    {showPass ? <EyeOff style={{width:'18px',height:'18px'}} /> : <Eye style={{width:'18px',height:'18px'}} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-400 text-xs mt-1.5">⚠ {errors.password}</p>}
              </div>

              {/* Submit */}
              <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 text-base mt-2">
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Sign In <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-slate-500 text-sm">
                Don't have an account?{' '}
                <Link to="/register" className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors">
                  Create one free →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
