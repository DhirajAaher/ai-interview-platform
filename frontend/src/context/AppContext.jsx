import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { userAPI } from '../api/api';

const AppContext = createContext(null);

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};

// ─── Toast ────────────────────────────────────────────────────────────────────
let toastIdCounter = 0;

export function AppProvider({ children }) {
  // ── Theme ──────────────────────────────────────────────────────────────────
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  }, []);

  // ── User ───────────────────────────────────────────────────────────────────
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const login = useCallback((userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
  }, []);

  const refreshUser = useCallback(async () => {
    if (!user?.userId) return;
    try {
      const res = await userAPI.getById(user.userId);
      const updated = res.data;
      setUser(updated);
      localStorage.setItem('user', JSON.stringify(updated));
    } catch {
      // silently fail
    }
  }, [user?.userId]);

  // ── Toasts ─────────────────────────────────────────────────────────────────
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = ++toastIdCounter;
    setToasts((prev) => [...prev, { id, message, type, duration }]);
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = {
    success: (msg, dur) => addToast(msg, 'success', dur),
    error: (msg, dur) => addToast(msg, 'error', dur),
    info: (msg, dur) => addToast(msg, 'info', dur),
    warning: (msg, dur) => addToast(msg, 'warning', dur),
  };

  // ── Loading ────────────────────────────────────────────────────────────────
  const [globalLoading, setGlobalLoading] = useState(false);

  const value = {
    theme,
    toggleTheme,
    user,
    login,
    logout,
    refreshUser,
    toasts,
    addToast,
    removeToast,
    toast,
    globalLoading,
    setGlobalLoading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
