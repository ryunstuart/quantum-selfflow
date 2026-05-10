'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Settings() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [companyName, setCompanyName] = useState("Stuart Brothers LLC");
  const [lives, setLives] = useState("345");
  const [email, setEmail] = useState("benefits@stuartbrothers.com");

  const handleLogout = () => {
    localStorage.removeItem('selfflow_user');
    window.location.href = '/';
  };

  const saveProfile = () => {
    alert("✅ Profile updated successfully!");
    setEditMode(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white flex flex-col overflow-x-hidden">
      <nav className="border-b border-white/10 bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition">
            <div className="w-9 h-9 md:w-10 md:h-10 bg-cyan-400 rounded-2xl flex items-center justify-center text-slate-950 font-bold text-2xl md:text-3xl shadow-lg">Q</div>
            <div>
              <div className="font-bold text-3xl md:text-3xl tracking-tighter">Quantum SelfFlow</div>
              <div className="text-cyan-400 text-xs md:text-sm -mt-1">Self-serve savings. Zero complexity.</div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/dashboard" className="hover:text-cyan-400">Dashboard</Link>
            <Link href="/myplan" className="hover:text-cyan-400">My Plan</Link>
            <Link href="/settings" className="text-cyan-400 font-medium">Settings</Link>
            <Link href="/resources" className="hover:text-cyan-400">Resources</Link>
            <button onClick={handleLogout} className="text-red-400 hover:text-red-500 transition">Logout</button>
          </div>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-3xl focus:outline-none"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-black/95 py-8">
            <div className="flex flex-col gap-6 text-center text-lg font-medium">
              <Link href="/dashboard" className="py-2" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
              <Link href="/myplan" className="py-2" onClick={() => setMobileMenuOpen(false)}>My Plan</Link>
              <Link href="/settings" className="py-2" onClick={() => setMobileMenuOpen(false)}>Settings</Link>
              <Link href="/resources" className="py-2" onClick={() => setMobileMenuOpen(false)}>Resources</Link>
              <button onClick={handleLogout} className="text-red-400 py-2">Logout</button>
            </div>
          </div>
        )}
      </nav>

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
        <h1 className="text-5xl font-bold tracking-tighter mb-1">Account Settings</h1>
        <p className="text-slate-400 text-lg">Manage your Quantum SelfFlow profile and preferences</p>

        <div className="mt-10 bg-slate-900/80 border border-white/10 rounded-3xl p-10">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold">Company Profile</h2>
            <button 
              onClick={() => setEditMode(!editMode)}
              className="text-cyan-400 hover:underline"
            >
              {editMode ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          <div className="space-y-8">
            <div>
              <label className="text-sm text-slate-400 block mb-2">Company Name</label>
              <input 
                type="text" 
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                disabled={!editMode}
                className="w-full bg-black/60 border border-white/20 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-400 disabled:opacity-75"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-slate-400 block mb-2">Number of Lives</label>
                <input 
                  type="text" 
                  value={lives}
                  onChange={(e) => setLives(e.target.value)}
                  disabled={!editMode}
                  className="w-full bg-black/60 border border-white/20 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-400 disabled:opacity-75"
                />
              </div>
              <div>
                <label className="text-sm text-slate-400 block mb-2">Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!editMode}
                  className="w-full bg-black/60 border border-white/20 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-400 disabled:opacity-75"
                />
              </div>
            </div>
          </div>

          {editMode && (
            <button 
              onClick={saveProfile}
              className="mt-8 w-full bg-cyan-400 hover:bg-cyan-300 text-black font-semibold py-4 rounded-2xl transition"
            >
              Save Changes
            </button>
          )}
        </div>

        <div className="mt-8 bg-slate-900/80 border border-white/10 rounded-3xl p-10">
          <h2 className="text-2xl font-semibold mb-8">Preferences</h2>
          
          <div className="space-y-8">
            <div className="flex justify-between items-center py-4 border-b border-white/10">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-slate-400">Monthly savings reports and alerts</p>
              </div>
              <div className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer">
                <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow"></div>
              </div>
            </div>

            <div className="flex justify-between items-center py-4 border-b border-white/10">
              <div>
                <p className="font-medium">Weekly Claims Digest</p>
                <p className="text-sm text-slate-400">Summary of steered claims</p>
              </div>
              <div className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer">
                <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow"></div>
              </div>
            </div>

            <div className="flex justify-between items-center py-4">
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-slate-400">Interface theme</p>
              </div>
              <span className="text-emerald-400 font-medium">Enabled</span>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-auto border-t border-white/10 bg-black/60 py-8 text-center text-xs text-slate-500">
        © 2026 Quantum SelfFlow • Powered by Quantum One Networks
      </footer>
    </div>
  );
}