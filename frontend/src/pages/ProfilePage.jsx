import React, { useState } from 'react';
import { User, Mail, Save, Trash2, AlertTriangle, Shield } from 'lucide-react';
import { userAPI } from '../api/api';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const { user, login, logout, toast } = useApp();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [errors, setErrors] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email';
    return errs;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSaving(true);
    setErrors({});
    try {
      const res = await userAPI.update(user.userId, { name: form.name.trim(), email: form.email.trim().toLowerCase() });
      login(res.data);
      toast.success('Profile updated successfully! ✅');
    } catch (err) {
      toast.error(err?.userMessage || 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await userAPI.delete(user.userId);
      logout();
      toast.success('Account deleted successfully.');
      navigate('/');
    } catch (err) {
      toast.error(err?.userMessage || 'Failed to delete account.');
      setDeleting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in space-y-6">
      <div>
        <h1 className="section-title">Profile Settings</h1>
        <p className="section-subtitle">Manage your account information</p>
      </div>

      {/* Avatar */}
      <div className="card flex items-center gap-5">
        <div className="w-20 h-20 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-2xl flex items-center justify-center text-white text-3xl font-black shadow-lg">
          {user?.name?.charAt(0)?.toUpperCase()}
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">{user?.name}</h2>
          <p className="text-slate-500 dark:text-slate-400">{user?.email}</p>
          <div className="flex items-center gap-1 mt-1 text-xs text-indigo-600 dark:text-indigo-400">
            <Shield className="w-3.5 h-3.5" />
            User ID: #{user?.userId}
          </div>
        </div>
      </div>

      {/* Edit form */}
      <form onSubmit={handleSave} className="card space-y-5">
        <h3 className="font-semibold text-slate-900 dark:text-white text-lg">Edit Information</h3>

        {/* Name */}
        <div>
          <label className="label">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className={`input-field pl-11 ${errors.name ? 'border-red-400 focus:ring-red-500' : ''}`}
              placeholder="Your full name"
            />
          </div>
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="label">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className={`input-field pl-11 ${errors.email ? 'border-red-400 focus:ring-red-500' : ''}`}
              placeholder="your@email.com"
            />
          </div>
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2">
          {saving ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>

      {/* Danger zone */}
      <div className="card border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-900/10">
        <h3 className="font-semibold text-red-700 dark:text-red-400 mb-2 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Danger Zone
        </h3>
        <p className="text-sm text-red-600/80 dark:text-red-400/80 mb-4">
          Deleting your account is permanent and cannot be undone. All your interview data will be lost.
        </p>

        {!showDeleteConfirm ? (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="btn-danger flex items-center gap-2 text-sm py-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete Account
          </button>
        ) : (
          <div className="space-y-3">
            <p className="text-sm font-semibold text-red-700 dark:text-red-400">
              Are you sure? This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="btn-danger flex items-center gap-2 text-sm py-2"
              >
                {deleting ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
                Yes, Delete Forever
              </button>
              <button onClick={() => setShowDeleteConfirm(false)} className="btn-secondary text-sm py-2">
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
