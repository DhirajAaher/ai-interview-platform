import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Brain, Menu, X, Bell, LogOut, User } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ThemeToggle from './ThemeToggle';

export default function Navbar({ sidebarOpen, setSidebarOpen }) {
  const { user, logout } = useApp();
  const [dropOpen, setDropOpen] = useState(false);

  const initials = user?.name
    ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-16 flex items-center"
      style={{
        background: 'rgba(10,15,30,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
      <div className="flex items-center w-full px-4 gap-4">
        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Logo (mobile) */}
        <Link to="/dashboard" className="md:hidden flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <span className="font-black text-white text-base">InterviewAI</span>
        </Link>

        <div className="flex-1" />

        <div className="flex items-center gap-3">
          <ThemeToggle />

          {/* Notification bell */}
          <button className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-all relative">
            <Bell className="w-4.5 h-4.5" style={{width:'18px',height:'18px'}} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full" />
          </button>

          {/* Avatar dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropOpen(v => !v)}
              className="flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-white/5 transition-all"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs">
                {initials}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-white text-sm font-semibold leading-tight">{user?.name?.split(' ')[0]}</p>
                <p className="text-slate-500 text-xs leading-tight">{user?.email?.split('@')[0]}@…</p>
              </div>
            </button>

            {dropOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setDropOpen(false)} />
                <div className="absolute right-0 top-full mt-2 w-52 rounded-2xl overflow-hidden z-20 shadow-2xl animate-scale-in"
                  style={{background:'#111827', border:'1px solid rgba(255,255,255,0.08)'}}>
                  <div className="px-4 py-3 border-b" style={{borderColor:'rgba(255,255,255,0.06)'}}>
                    <p className="text-white font-semibold text-sm">{user?.name}</p>
                    <p className="text-slate-500 text-xs mt-0.5">{user?.email}</p>
                  </div>
                  <div className="p-1.5">
                    <Link to="/profile" onClick={() => setDropOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-300 hover:bg-white/5 hover:text-white text-sm transition-all">
                      <User className="w-4 h-4" /> Profile Settings
                    </Link>
                    <button
                      onClick={() => { logout(); setDropOpen(false); }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 text-sm transition-all">
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export function MobileSidebar({ open, onClose }) {
  const location = useLocation();
  const { logout } = useApp();
  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: '⊞' },
    { to: '/start-interview', label: 'New Interview', icon: '▶' },
    { to: '/history', label: 'History', icon: '◷' },
    { to: '/resume', label: 'Resume Builder', icon: '📄' },
    { to: '/profile', label: 'Profile', icon: '👤' },
  ];

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden" onClick={onClose} />
      <div className="fixed top-0 left-0 h-full w-64 z-50 md:hidden flex flex-col animate-fade-in-left"
        style={{background:'#0a0f1e', borderRight:'1px solid rgba(255,255,255,0.06)'}}>
        <div className="flex items-center gap-2.5 px-5 h-16 border-b" style={{borderColor:'rgba(255,255,255,0.06)'}}>
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <span className="font-black text-white text-base">InterviewAI</span>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(({ to, label, icon }) => {
            const active = location.pathname === to;
            return (
              <Link key={to} to={to} onClick={onClose}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active ? 'nav-item-active' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}>
                <span>{icon}</span>
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t" style={{borderColor:'rgba(255,255,255,0.06)'}}>
          <button onClick={() => { logout(); onClose(); }}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 text-sm transition-all">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>
    </>
  );
}
