'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Settings() {
  const [user, setUser] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [employeeCount, setEmployeeCount] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('selfflow_user');
    if (saved) {
      const data = JSON.parse(saved);
      setUser(data);
      setCompanyName(data.companyName || '');
      setEmployeeCount(data.employeeCount || '');
    }
  }, []);

  const saveChanges = () => {
    if (!companyName.trim() || !employeeCount.trim()) {
      alert("Please fill in all fields");
      return;
    }

    setSaving(true);
    setTimeout(() => {
      const updated = { 
        ...user, 
        companyName: companyName.trim(), 
        employeeCount: employeeCount.trim() 
      };
      localStorage.setItem('selfflow_user', JSON.stringify(updated));
      setUser(updated);
      setEditing(false);
      setSaving(false);
      alert("✅ Settings updated successfully!");
    }, 800);
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white flex flex-col">
      <nav className="border-b border-white/10 bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition">
            <div className="w-9 h-9 md:w-10 md:h-10 bg-cyan-400 rounded-2xl flex items-center justify-center text-slate-950 font-bold text-2xl md:text-3xl shadow-lg">Q</div>
            <div>
              <div className="font-bold text-2xl md:text-3xl tracking-tighter">Quantum SelfFlow</div>
              <div className="text-cyan-400 text-xs md:text-sm -mt-1">Self-serve savings. Zero complexity.</div>
            </div>
          </Link>

          <div className="flex items-center gap-4 md:gap-8 text-sm font-medium">
            <Link href="/" className="hover:text-cyan-400">Home</Link>
            <Link href="/dashboard" className="hover:text-cyan-400">Dashboard</Link>
            <Link href="/myplan" className="hover:text-cyan-400">My Plan</Link>
            <Link href="/settings" className="text-cyan-400 font-medium">Settings</Link>
            <button onClick={() => { localStorage.removeItem('selfflow_user'); window.location.href = '/'; }} className="text-red-400 hover:text-red-500">Logout</button>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 md:px-6 py-12 flex-1">
        <div className="mb-12">
          <h1 className="text-5xl font-bold tracking-tighter">Account Settings</h1>
          <p className="text-slate-400 mt-2">Manage your Quantum SelfFlow profile and preferences</p>
        </div>

        <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-10">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-semibold">Company Information</h2>
            <button 
              onClick={() => setEditing(!editing)}
              className="px-6 py-2 border border-white/20 rounded-2xl hover:bg-white/5 transition"
            >
              {editing ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          <div className="space-y-8">
            <div>
              <label className="block text-sm text-slate-400 mb-3">Company Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                disabled={!editing}
                className="w-full bg-slate-800 border border-white/20 rounded-2xl px-6 py-5 text-lg disabled:opacity-75"
                placeholder="Company Name"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-3">Number of Lives Covered</label>
              <input
                type="number"
                value={employeeCount}
                onChange={(e) => setEmployeeCount(e.target.value)}
                disabled={!editing}
                className="w-full bg-slate-800 border border-white/20 rounded-2xl px-6 py-5 text-lg disabled:opacity-75"
                placeholder="250"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-3">Current Plan Type</label>
              <div className="bg-slate-800 border border-white/20 rounded-2xl px-6 py-5 text-lg text-slate-300">
                {user?.planType || "Not Selected"}
              </div>
            </div>
          </div>

          {editing && (
            <button 
              onClick={saveChanges}
              disabled={saving}
              className="mt-12 w-full bg-cyan-400 hover:bg-cyan-300 disabled:bg-slate-700 text-slate-950 font-semibold py-6 rounded-2xl text-xl transition"
            >
              {saving ? "Saving Changes..." : "Save Changes"}
            </button>
          )}
        </div>

        <div className="mt-12 text-center text-slate-400 text-sm">
          Need help? <span className="text-cyan-400">support@quantumselfflow.com</span>
        </div>
      </div>

      {/* Auto Year Footer */}
      <footer className="border-t border-white/10 bg-black/60 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-400 text-sm">
          © {currentYear} Quantum SelfFlow • Powered by Quantum One Networks<br />
          Self-serve cost containment platform for self-insured employers and regional TPAs
        </div>
      </footer>
    </div>
  );
}