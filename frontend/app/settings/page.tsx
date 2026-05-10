'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Settings() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [companyName, setCompanyName] = useState("Quantum Inc.");
  const [employeeCount, setEmployeeCount] = useState("1284");
  const [email, setEmail] = useState("benefits@quantuminc.com");
  const currentYear = new Date().getFullYear();

  const handleLogout = () => {
    localStorage.removeItem('selfflow_user');
    window.location.href = '/';
  };

  const saveSettings = () => {
    // Simulate save
    alert("✅ Settings saved successfully!");
    setEditMode(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white flex flex-col overflow-x-hidden">
      <nav className="border-b border-white/10 bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          {/* Standardized Logo/Header - Same as Resources, Dashboard & My Plan */}
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

      <div className="max-w-3xl mx-auto px-4 md:px-6 py-12 flex-1">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-2">Account Settings</h1>
        <p className="text-slate-400 mb-10">Manage your Quantum SelfFlow organization</p>

        <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-10 space-y-10">
          {/* Company Information */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Company Information</h2>
              <button 
                onClick={() => setEditMode(!editMode)}
                className="text-cyan-400 hover:underline text-sm"
              >
                {editMode ? 'Cancel' : 'Edit'}
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-sm text-slate-400 block mb-2">Company Name</label>
                <input 
                  type="text" 
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  disabled={!editMode}
                  className="w-full bg-black/50 border border-white/20 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-400 disabled:opacity-75"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-slate-400 block mb-2">Number of Employees</label>
                  <input 
                    type="text" 
                    value={employeeCount}
                    onChange={(e) => setEmployeeCount(e.target.value)}
                    disabled={!editMode}
                    className="w-full bg-black/50 border border-white/20 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-400 disabled:opacity-75"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-400 block mb-2">Primary Email</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={!editMode}
                    className="w-full bg-black/50 border border-white/20 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-400 disabled:opacity-75"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-slate-800/50 p-6 rounded-2xl">
                <div>
                  <div className="font-medium">Email Notifications</div>
                  <div className="text-sm text-slate-400">Monthly savings reports and alerts</div>
                </div>
                <div className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>

              <div className="flex items-center justify-between bg-slate-800/50 p-6 rounded-2xl">
                <div>
                  <div className="font-medium">Weekly Claims Summary</div>
                  <div className="text-sm text-slate-400">Sent every Monday</div>
                </div>
                <div className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {editMode && (
            <button 
              onClick={saveSettings}
              className="w-full bg-cyan-400 hover:bg-cyan-300 text-black font-semibold py-5 rounded-2xl transition mt-6"
            >
              Save Changes
            </button>
          )}
        </div>
      </div>

      <footer className="border-t border-white/10 bg-black/60 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-400 text-sm">
          © {currentYear} Quantum SelfFlow • Powered by Quantum One Networks
        </div>
      </footer>
    </div>
  );
}