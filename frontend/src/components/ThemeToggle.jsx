import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useApp();
  return (
    <button
      onClick={toggleTheme}
      className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-all"
      style={{background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)'}}
      title={theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
    >
      {theme === 'dark'
        ? <Sun style={{width:'17px',height:'17px'}} />
        : <Moon style={{width:'17px',height:'17px'}} />
      }
    </button>
  );
}
