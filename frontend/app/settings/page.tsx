'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Settings() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    employeeCount: '',
    email: '',
    phone: ''
  });
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const saved = localStorage.getItem('selfflow_user');
    if (saved) {
      const data = JSON.parse(saved);
      setIsLoggedIn(true);
      setUser(data);
      setFormData({
        companyName: data.companyName || '',
        employeeCount: data.employeeCount || '',
        email: data.email || '',
        phone: data.phone || ''
      });
    } else {
      window.location.href = '/';
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('selfflow_user');
    window.location.href = '/';
  };

  const handleSave = () => {
    const updatedUser = { ...user, ...formData };
    localStorage.setItem('selfflow_user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setEditMode(false);
    alert("✅ Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white flex flex-col overflow-x-hidden">
      <nav className="border-b border-white/10 bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition">
            <div className="w-9 h-9 bg-cyan-400 rounded-2xl flex items-center justify-center text-slate-950 font-bold text-2xl shadow-lg">Q</div>
            <div>
              <div className="font-bold text-2xl tracking-tighter">Quantum SelfFlow</div>
              <div className="text-cyan-400 text-xs -mt-1">Self-serve savings. Zero complexity.</div>
            </div>
          </Link>

          {/* Desktop Nav - Settings visible */}
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

      <div className="max-w-4xl mx-auto px-4 py-10 flex-1">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-2">Account Settings</h1>
        <p className="text-slate-400">Manage your Quantum SelfFlow profile and preferences</p>

        {/* Profile Section */}
        <div className="mt-10 bg-slate-900/80 border border-white/10 rounded-3xl p-8 md:p-12">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-semibold">Company Profile</h3>
            <button 
              onClick={() => setEditMode(!editMode)}
              className="text-cyan-400 hover:underline text-sm font-medium"
            >
              {editMode ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          <div className="space-y-8">
            <div>
              <label className="block text-sm text-slate-400 mb-2">Company Name</label>
              <input 
                type="text" 
                value={formData.companyName}
                onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                disabled={!editMode}
                className="w-full bg-black/50 border border-white/20 rounded-2xl px-6 py-4 disabled:opacity-75"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-slate-400 mb-2">Number of Lives</label>
                <input 
                  type="number" 
                  value={formData.employeeCount}
                  onChange={(e) => setFormData({...formData, employeeCount: e.target.value})}
                  disabled={!editMode}
                  className="w-full bg-black/50 border border-white/20 rounded-2xl px-6 py-4 disabled:opacity-75"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Email Address</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  disabled={!editMode}
                  className="w-full bg-black/50 border border-white/20 rounded-2xl px-6 py-4 disabled:opacity-75"
                />
              </div>
            </div>

            {editMode && (
              <button 
                onClick={handleSave}
                className="w-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold py-5 rounded-3xl text-lg"
              >
                Save Changes
              </button>
            )}
          </div>
        </div>

        {/* Preferences */}
        <div className="mt-10 bg-slate-900/80 border border-white/10 rounded-3xl p-8 md:p-12">
          <h3 className="text-2xl font-semibold mb-8">Preferences</h3>
          <div className="space-y-6">
            <div className="flex justify-between items-center py-4 border-b border-white/10">
              <div>
                <div className="font-medium">Email Notifications</div>
                <div className="text-sm text-slate-400">Monthly savings reports and alerts</div>
              </div>
              <div className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer">
                <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full"></div>
              </div>
            </div>

            <div className="flex justify-between items-center py-4 border-b border-white/10">
              <div>
                <div className="font-medium">Weekly Claims Digest</div>
                <div className="text-sm text-slate-400">Summary of steered claims</div>
              </div>
              <div className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer">
                <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full"></div>
              </div>
            </div>

            <div className="flex justify-between items-center py-4">
              <div>
                <div className="font-medium">Dark Mode</div>
                <div className="text-sm text-slate-400">Interface theme</div>
              </div>
              <div className="text-emerald-400 font-medium">Enabled</div>
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-white/10 bg-black/60 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-400 text-sm">
          © {currentYear} Quantum SelfFlow • Powered by Quantum One Networks<br />
          Self-serve cost containment platform for self-insured employers and regional TPAs
        </div>
      </footer>
    </div>
  );
}