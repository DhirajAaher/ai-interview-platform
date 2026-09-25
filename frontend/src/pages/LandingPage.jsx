import React from 'react';
import { Link } from 'react-router-dom';
import {
  Brain, Zap, Target, BarChart3, Shield, ArrowRight,
  Star, CheckCircle, Sparkles, Users, Trophy, Clock
} from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Generated Questions',
    desc: 'Google Gemini AI creates custom questions based on your exact job role, experience level, and job description.',
    gradient: 'from-indigo-500 to-purple-600',
    glow: 'rgba(99,102,241,0.3)',
  },
  {
    icon: Target,
    title: 'Instant AI Feedback',
    desc: 'Get detailed scores and personalized feedback on every answer the moment you submit it.',
    gradient: 'from-purple-500 to-pink-600',
    glow: 'rgba(139,92,246,0.3)',
  },
  {
    icon: BarChart3,
    title: 'Performance Analytics',
    desc: 'Visualize your scores across sessions, track trends, and identify areas for improvement.',
    gradient: 'from-pink-500 to-rose-600',
    glow: 'rgba(236,72,153,0.3)',
  },
  {
    icon: Zap,
    title: 'Multiple Domains',
    desc: 'Prepare for any role — Software Engineer, Data Scientist, Product Manager, and many more.',
    gradient: 'from-amber-500 to-orange-600',
    glow: 'rgba(245,158,11,0.3)',
  },
  {
    icon: Shield,
    title: 'Real-time Timer',
    desc: 'Practice under realistic interview pressure with configurable per-question timers.',
    gradient: 'from-emerald-500 to-teal-600',
    glow: 'rgba(16,185,129,0.3)',
  },
  {
    icon: Sparkles,
    title: 'Resume Builder',
    desc: 'Build a professional resume right inside the platform to complement your interview prep.',
    gradient: 'from-blue-500 to-cyan-600',
    glow: 'rgba(59,130,246,0.3)',
  },
];

const steps = [
  { step: '01', title: 'Create Account', desc: 'Sign up for free in under 30 seconds.' },
  { step: '02', title: 'Set Your Role', desc: 'Choose job role, experience level & description.' },
  { step: '03', title: 'Practice Interview', desc: 'AI generates tailored questions for you.' },
  { step: '04', title: 'Get Feedback', desc: 'Receive instant AI scores and improvement tips.' },
];

const stats = [
  { icon: Users, value: '10,000+', label: 'Students Prepared' },
  { icon: Trophy, value: '95%', label: 'Success Rate' },
  { icon: Clock, value: '2 min', label: 'Setup Time' },
  { icon: Star, value: '4.9/5', label: 'Student Rating' },
];

export default function LandingPage() {
  return (
    <div style={{background:'#060a17', minHeight:'100vh', overflowX:'hidden'}}>
      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{background:'rgba(6,10,23,0.8)', backdropFilter:'blur(20px)', borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <span className="font-black text-lg text-white">InterviewAI</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-slate-400 hover:text-white text-sm font-medium transition-colors px-4 py-2">Sign In</Link>
          <Link to="/register" className="btn-primary py-2 px-5 text-sm">Get Started Free</Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="pt-32 pb-24 px-6 relative">
        {/* Background orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-indigo-600/15 blur-3xl pointer-events-none animate-orb" />
        <div className="absolute top-40 right-1/4 w-80 h-80 rounded-full bg-purple-600/12 blur-3xl pointer-events-none animate-orb" style={{animationDelay:'3s'}} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-40 bg-indigo-500/5 blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 animate-fade-in"
            style={{background:'rgba(99,102,241,0.12)', border:'1px solid rgba(99,102,241,0.3)'}}>
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-indigo-300 text-xs font-semibold tracking-wide">Powered by Google Gemini AI</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-black text-white leading-tight mb-6 animate-fade-in"
            style={{animationDelay:'0.1s', opacity:0, animationFillMode:'forwards'}}>
            Land Your{' '}
            <span className="gradient-text">Dream Job</span>
            <br />with AI Practice
          </h1>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 animate-fade-in leading-relaxed"
            style={{animationDelay:'0.2s', opacity:0, animationFillMode:'forwards'}}>
            Get personalized interview questions, instant AI feedback, and detailed performance analytics —
            all in one platform built for students.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in"
            style={{animationDelay:'0.3s', opacity:0, animationFillMode:'forwards'}}>
            <Link to="/register" className="btn-primary py-4 px-8 text-base">
              Start Practicing Free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/login" className="btn-secondary py-4 px-8 text-base"
              style={{background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', color:'#e2e8f0'}}>
              Sign In
            </Link>
          </div>

          {/* Social proof */}
          <div className="flex items-center justify-center gap-2 mt-8 animate-fade-in"
            style={{animationDelay:'0.4s', opacity:0, animationFillMode:'forwards'}}>
            <div className="flex -space-x-2">
              {['A','B','C','D'].map((l,i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold text-white"
                  style={{borderColor:'#060a17', background:`hsl(${i*60+200},70%,50%)`}}>
                  {l}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1 ml-2">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />)}
            </div>
            <span className="text-slate-400 text-sm">Trusted by 10,000+ students</span>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="text-center p-6 rounded-2xl"
              style={{background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.06)'}}>
              <Icon className="w-6 h-6 text-indigo-400 mx-auto mb-3" />
              <div className="text-2xl font-black text-white mb-1">{value}</div>
              <div className="text-slate-500 text-sm">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Everything you need to{' '}
              <span className="gradient-text">succeed</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Our platform combines cutting-edge AI with proven interview techniques to give you the best preparation experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc, gradient, glow }, i) => (
              <div key={title}
                className="group p-6 rounded-2xl transition-all duration-300 cursor-default animate-fade-in"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  animationDelay: `${i * 0.08}s`,
                  opacity: 0,
                  animationFillMode: 'forwards',
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = `0 20px 60px ${glow}`}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4">How it <span className="gradient-text">works</span></h2>
            <p className="text-slate-400">Get started in minutes, not hours.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-8 left-1/8 right-1/8 h-0.5"
              style={{background:'linear-gradient(90deg, rgba(99,102,241,0.3), rgba(139,92,246,0.3), rgba(236,72,153,0.3))'}} />

            {steps.map(({ step, title, desc }, i) => (
              <div key={step} className="relative text-center animate-fade-in"
                style={{animationDelay:`${i*0.1}s`, opacity:0, animationFillMode:'forwards'}}>
                <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center font-black text-lg text-white relative z-10"
                  style={{background:'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow:'0 8px 24px rgba(99,102,241,0.4)'}}>
                  {step}
                </div>
                <h3 className="text-white font-bold mb-2">{title}</h3>
                <p className="text-slate-400 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="p-12 rounded-3xl relative overflow-hidden"
            style={{background:'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1))', border:'1px solid rgba(99,102,241,0.25)'}}>
            <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none"
              style={{background:'radial-gradient(ellipse at center, rgba(99,102,241,0.08), transparent 70%)'}} />
            <Sparkles className="w-10 h-10 text-indigo-400 mx-auto mb-6" />
            <h2 className="text-4xl font-black text-white mb-4">Ready to ace your interview?</h2>
            <p className="text-slate-400 mb-8 text-lg">Join thousands of students already preparing smarter with AI.</p>
            <Link to="/register" className="btn-primary py-4 px-10 text-base inline-flex">
              Get Started — It's Free <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-8 px-6 text-center border-t" style={{borderColor:'rgba(255,255,255,0.05)'}}>
        <div className="flex items-center justify-center gap-2 mb-3">
          <Brain className="w-4 h-4 text-indigo-400" />
          <span className="text-white font-bold">InterviewAI</span>
        </div>
        <p className="text-slate-600 text-sm">Built with ❤️ for students. © 2025 InterviewAI.</p>
      </footer>
    </div>
  );
}
