import React, { useState } from 'react';
import { FileText, Save, Download, Eye, Trash2, Sparkles, User, Briefcase, GraduationCap, Code, Link as LinkIcon } from 'lucide-react';
import { resumeAPI } from '../api/api';
import { useApp } from '../context/AppContext';

const INITIAL_FORM = {
  summary: '',
  skills: '',
  experience: '',
  education: '',
  projects: '',
  links: '',
};

const SECTIONS = [
  { key: 'summary', label: 'Professional Summary', icon: User, placeholder: 'Experienced software developer with 5+ years...' },
  { key: 'skills', label: 'Skills & Technologies', icon: Code, placeholder: 'JavaScript, React, Node.js, Python, SQL, AWS...' },
  { key: 'experience', label: 'Work Experience', icon: Briefcase, placeholder: 'Senior Developer @ Tech Corp (2020-Present)\n- Led team of 5 engineers...' },
  { key: 'education', label: 'Education', icon: GraduationCap, placeholder: 'B.Sc. Computer Science, State University (2019)' },
  { key: 'projects', label: 'Projects', icon: Sparkles, placeholder: 'E-Commerce Platform: Built a full-stack app using React & Node.js...' },
  { key: 'links', label: 'Links & Portfolio', icon: LinkIcon, placeholder: 'GitHub: github.com/username\nLinkedIn: linkedin.com/in/username\nPortfolio: mysite.com' },
];

export default function ResumeBuilder() {
  const { user, toast } = useApp();
  const [form, setForm] = useState(INITIAL_FORM);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const content = Object.entries(form)
        .filter(([, v]) => v.trim())
        .map(([k, v]) => `## ${k.toUpperCase()}\n${v}`)
        .join('\n\n');

      await resumeAPI.create({
        userId: user.userId,
        content,
        ...form,
      });
      setSaved(true);
      toast.success('Resume saved successfully! ✅');
    } catch (err) {
      toast.error(err?.userMessage || 'Failed to save resume.');
    } finally {
      setSaving(false);
    }
  };

  const handleDownload = () => {
    const content = SECTIONS
      .filter((s) => form[s.key]?.trim())
      .map((s) => `${s.label.toUpperCase()}\n${'─'.repeat(40)}\n${form[s.key]}`)
      .join('\n\n');

    const blob = new Blob([
      `RESUME - ${user?.name?.toUpperCase()}\n${'═'.repeat(50)}\n\n${content}`
    ], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${user?.name || 'resume'}_resume.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Resume downloaded!');
  };

  const wordCount = Object.values(form).join(' ').split(/\s+/).filter(Boolean).length;
  const filled = Object.values(form).filter((v) => v.trim()).length;

  return (
    <div className="max-w-4xl mx-auto animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="section-title flex items-center gap-2">
            <FileText className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            Resume Builder
          </h1>
          <p className="section-subtitle">
            Build and store your professional resume · {filled}/{SECTIONS.length} sections · {wordCount} words
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setPreview((v) => !v)}
            className="btn-secondary flex items-center gap-2 text-sm py-2"
          >
            <Eye className="w-4 h-4" />
            {preview ? 'Edit Mode' : 'Preview'}
          </button>
          <button
            onClick={handleDownload}
            disabled={wordCount === 0}
            className="btn-secondary flex items-center gap-2 text-sm py-2"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
          <button
            onClick={handleSave}
            disabled={saving || wordCount === 0}
            className="btn-primary flex items-center gap-2 text-sm py-2"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {saving ? 'Saving...' : 'Save Resume'}
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="card py-3">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
          <span>Resume Completeness</span>
          <span>{Math.round((filled / SECTIONS.length) * 100)}%</span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
            style={{ width: `${(filled / SECTIONS.length) * 100}%` }}
          />
        </div>
      </div>

      {preview ? (
        /* Preview mode */
        <div className="card space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-700 pb-4">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">{user?.name}</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">{user?.email}</p>
          </div>
          {SECTIONS.filter((s) => form[s.key]?.trim()).map(({ key, label, icon: Icon }) => (
            <div key={key}>
              <h3 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Icon className="w-4 h-4" />
                {label}
              </h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm whitespace-pre-wrap leading-relaxed">
                {form[key]}
              </p>
            </div>
          ))}
          {SECTIONS.every((s) => !form[s.key]?.trim()) && (
            <p className="text-center text-slate-400 py-8">
              No content yet. Switch to Edit Mode to add your resume content.
            </p>
          )}
        </div>
      ) : (
        /* Edit mode */
        <div className="grid grid-cols-1 gap-5">
          {SECTIONS.map(({ key, label, icon: Icon, placeholder }) => (
            <div key={key} className="card">
              <label className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white mb-3">
                <div className="w-7 h-7 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
                  <Icon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                </div>
                {label}
                {form[key]?.trim() && (
                  <span className="ml-auto w-2 h-2 bg-green-500 rounded-full" />
                )}
              </label>
              <textarea
                rows={key === 'summary' ? 3 : key === 'experience' ? 6 : 4}
                placeholder={placeholder}
                value={form[key]}
                onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                className="input-field resize-y text-sm leading-relaxed"
              />
              <div className="flex justify-between mt-1 text-xs text-slate-400">
                <span>{form[key] ? '✓ Filled' : 'Optional'}</span>
                <span>{form[key].trim().split(/\s+/).filter(Boolean).length} words</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
