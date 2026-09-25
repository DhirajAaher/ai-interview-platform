import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Brain, Eye, EyeOff, Mail, Lock, User, ArrowRight, CheckCircle } from 'lucide-react';
import { userAPI } from '../api/api';
import { useApp } from '../context/AppContext';

export default function RegisterPage() {
  const { login, toast } = useApp();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Full name is required';
    else if (form.name.trim().length < 2) errs.name = 'Name must be at least 2 characters';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email address';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (!form.confirmPassword) errs.confirmPassword = 'Please confirm your password';
    else if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setErrors({});
    try {
      const res = await userAPI.create({
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });
      const user = res.data;
      login(user);
      toast.success(`Account created! Welcome, ${user.name}! 🎉`);
      navigate('/dashboard');
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || 'Registration failed. Please try again.';
      toast.error(msg);
      setErrors({ general: msg });
    } finally {
      setLoading(false);
    }
  };

  const perks = [
    'AI-generated interview questions tailored to your role',
    'Instant scoring and feedback on your answers',
    'Track improvement across multiple sessions',
    'Resume builder for interview preparation',
  ];

  const inputStyle = (key) => ({
    background: 'rgba(255,255,255,0.05)',
    color: '#f1f5f9',
    borderColor: errors[key] ? '#f87171' : '#1e3a5f',
  });

  return (
    <div className="min-h-screen auth-bg flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-purple-600/20 blur-3xl animate-orb" />
        <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-indigo-600/15 blur-3xl animate-orb" style={{animationDelay:'4s'}} />

        <Link to="/" className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <span className="font-black text-xl text-white">InterviewAI</span>
        </Link>

        <div className="relative z-10">
          <h1 className="text-5xl font-black text-white leading-tight mb-6">
            Start your<br />
            <span className="gradient-text">journey</span><br />
            today
          </h1>
          <p className="text-slate-400 text-lg mb-10 max-w-sm">
            Join thousands of students who've aced their interviews using our AI-powered platform.
          </p>
          <div className="space-y-3">
            {perks.map((perk) => (
              <div key={perk} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300 text-sm">{perk}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-slate-600 text-sm">© 2025 InterviewAI. Free to get started.</p>
      </div>

      {/* Right panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 overflow-y-auto">
        <div className="w-full max-w-md animate-fade-in py-8">
          {/* Mobile logo */}
          <Link to="/" className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="font-black text-xl text-white">InterviewAI</span>
          </Link>

          <div className="mb-8">
            <h2 className="text-3xl font-black text-white mb-2">Create account</h2>
            <p className="text-slate-400">Free forever. No credit card required.</p>
          </div>

          <div className="glass rounded-2xl p-8 shadow-2xl">
            {errors.general && (
              <div className="mb-5 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-2">
                <span className="mt-0.5">⚠️</span>
                <span>{errors.general}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" style={{width:'18px',height:'18px'}} />
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="input-field pl-11"
                    style={inputStyle('name')}
                    autoFocus
                  />
                </div>
                {errors.name && <p className="text-red-400 text-xs mt-1.5">⚠ {errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" style={{width:'18px',height:'18px'}} />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className="input-field pl-11"
                    style={inputStyle('email')}
                  />
                </div>
                {errors.email && <p className="text-red-400 text-xs mt-1.5">⚠ {errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" style={{width:'18px',height:'18px'}} />
                  <input
                    type={showPass ? 'text' : 'password'}
                    placeholder="Min. 6 characters"
                    value={form.password}
                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                    className="input-field pl-11 pr-11"
                    style={inputStyle('password')}
                  />
                  <button type="button" onClick={() => setShowPass(v => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                    {showPass ? <EyeOff style={{width:'18px',height:'18px'}} /> : <Eye style={{width:'18px',height:'18px'}} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-400 text-xs mt-1.5">⚠ {errors.password}</p>}
                {form.password && (
                  <div className="mt-2 flex gap-1">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="h-1 flex-1 rounded-full transition-all duration-300"
                        style={{background: form.password.length >= i * 2
                          ? i <= 1 ? '#ef4444' : i <= 2 ? '#f59e0b' : i <= 3 ? '#10b981' : '#6366f1'
                          : '#1e293b'}} />
                    ))}
                  </div>
                )}
              </div>

              {/* Confirm password */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" style={{width:'18px',height:'18px'}} />
                  <input
                    type={showPass ? 'text' : 'password'}
                    placeholder="Repeat password"
                    value={form.confirmPassword}
                    onChange={e => setForm(f => ({ ...f, confirmPassword: e.target.value }))}
                    className="input-field pl-11"
                    style={inputStyle('confirmPassword')}
                  />
                  {form.confirmPassword && form.password === form.confirmPassword && (
                    <CheckCircle className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-400" style={{width:'18px',height:'18px'}} />
                  )}
                </div>
                {errors.confirmPassword && <p className="text-red-400 text-xs mt-1.5">⚠ {errors.confirmPassword}</p>}
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 text-base mt-2">
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Create Account <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </form>

            <p className="text-center text-xs text-slate-600 mt-4">
              By signing up, you agree to our{' '}
              <span className="text-indigo-400 cursor-pointer hover:text-indigo-300">Terms</span> &{' '}
              <span className="text-indigo-400 cursor-pointer hover:text-indigo-300">Privacy Policy</span>
            </p>

            <div className="mt-5 text-center">
              <p className="text-slate-500 text-sm">
                Already have an account?{' '}
                <Link to="/login" className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors">
                  Sign in →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
