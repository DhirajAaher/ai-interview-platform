import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

const CONFIG = {
  success: { Icon: CheckCircle, bg: '#052e16', border: '#166534', text: '#4ade80', bar: '#22c55e' },
  error:   { Icon: XCircle,     bg: '#1c0c0c', border: '#7f1d1d', text: '#f87171', bar: '#ef4444' },
  warning: { Icon: AlertTriangle, bg: '#1c1008', border: '#78350f', text: '#fbbf24', bar: '#f59e0b' },
  info:    { Icon: Info,        bg: '#0c1a2e', border: '#1e40af', text: '#60a5fa', bar: '#3b82f6' },
};

function ToastItem({ toast, onRemove }) {
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(100);
  const cfg = CONFIG[toast.type] || CONFIG.info;

  useEffect(() => {
    const step = 50;
    const decrement = (step / toast.duration) * 100;
    const interval = setInterval(() => setProgress(p => Math.max(0, p - decrement)), step);
    const exitTimer = setTimeout(() => setExiting(true), toast.duration - 300);
    const removeTimer = setTimeout(() => onRemove(toast.id), toast.duration);
    return () => { clearInterval(interval); clearTimeout(exitTimer); clearTimeout(removeTimer); };
  }, [toast.duration, toast.id, onRemove]);

  const handleClose = () => {
    setExiting(true);
    setTimeout(() => onRemove(toast.id), 300);
  };

  return (
    <div className={exiting ? 'toast-exit' : 'toast-enter'}
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '340px',
        maxWidth: 'calc(100vw - 2rem)',
        borderRadius: '16px',
        overflow: 'hidden',
        border: `1px solid ${cfg.border}`,
        background: cfg.bg,
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
      }}>
      <div style={{display:'flex', alignItems:'flex-start', gap:'12px', padding:'14px 16px'}}>
        <cfg.Icon style={{width:'18px', height:'18px', color:cfg.text, flexShrink:0, marginTop:'1px'}} />
        <p style={{color:'#e2e8f0', fontSize:'0.875rem', lineHeight:'1.5', flex:1, fontWeight:500}}>{toast.message}</p>
        <button onClick={handleClose}
          style={{color:'#475569', cursor:'pointer', background:'none', border:'none', padding:0, flexShrink:0, marginTop:'1px'}}>
          <X style={{width:'16px',height:'16px'}} />
        </button>
      </div>
      {/* Progress bar */}
      <div style={{height:'3px', background:'rgba(255,255,255,0.05)'}}>
        <div style={{height:'100%', width:`${progress}%`, background:cfg.bar, transition:'width 0.05s linear', borderRadius:'0 0 16px 16px'}} />
      </div>
    </div>
  );
}

export default function Toast() {
  const { toasts, removeToast } = useApp();
  if (!toasts.length) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '1.5rem',
      right: '1.5rem',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      pointerEvents: 'none',
    }}>
      {toasts.map(t => (
        <div key={t.id} style={{pointerEvents:'auto'}}>
          <ToastItem toast={t} onRemove={removeToast} />
        </div>
      ))}
    </div>
  );
}
