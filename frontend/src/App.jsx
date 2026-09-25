import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useApp } from './context/AppContext';
import Navbar, { MobileSidebar } from './components/Navbar';
import Sidebar from './components/Sidebar';
import Toast from './components/Toast';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import StartInterview from './pages/StartInterview';
import InterviewSession from './pages/InterviewSession';
import InterviewResults from './pages/InterviewResults';
import InterviewHistory from './pages/InterviewHistory';
import ProfilePage from './pages/ProfilePage';
import ResumeBuilder from './pages/ResumeBuilder';

// ─── Protected route wrapper ──────────────────────────────────────────────────
function RequireAuth({ children }) {
  const { user } = useApp();
  const location = useLocation();
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

// ─── Redirect if already authed ───────────────────────────────────────────────
function RedirectIfAuth({ children }) {
  const { user } = useApp();
  if (user) return <Navigate to="/dashboard" replace />;
  return children;
}

// ─── Authenticated layout (Navbar + Sidebar + content) ───────────────────────
function AppLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{minHeight:'100vh', background:'#0a0f1e'}}>
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <MobileSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Sidebar />
      <main className="pt-16 md:pl-60" style={{minHeight:'100vh'}}>
        <div className="p-5 md:p-8 max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route
          path="/"
          element={
            <RedirectIfAuth>
              <LandingPage />
            </RedirectIfAuth>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectIfAuth>
              <LoginPage />
            </RedirectIfAuth>
          }
        />
        <Route
          path="/register"
          element={
            <RedirectIfAuth>
              <RegisterPage />
            </RedirectIfAuth>
          }
        />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <AppLayout>
                <Dashboard />
              </AppLayout>
            </RequireAuth>
          }
        />
        <Route
          path="/start-interview"
          element={
            <RequireAuth>
              <AppLayout>
                <StartInterview />
              </AppLayout>
            </RequireAuth>
          }
        />
        <Route
          path="/interview/:interviewId"
          element={
            <RequireAuth>
              <AppLayout>
                <InterviewSession />
              </AppLayout>
            </RequireAuth>
          }
        />
        <Route
          path="/results/:interviewId"
          element={
            <RequireAuth>
              <AppLayout>
                <InterviewResults />
              </AppLayout>
            </RequireAuth>
          }
        />
        <Route
          path="/history"
          element={
            <RequireAuth>
              <AppLayout>
                <InterviewHistory />
              </AppLayout>
            </RequireAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <AppLayout>
                <ProfilePage />
              </AppLayout>
            </RequireAuth>
          }
        />
        <Route
          path="/resume"
          element={
            <RequireAuth>
              <AppLayout>
                <ResumeBuilder />
              </AppLayout>
            </RequireAuth>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Global toast notifications */}
      <Toast />
    </>
  );
}
