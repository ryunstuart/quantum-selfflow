'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function MyPlan() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeAddons, setActiveAddons] = useState(['rbp']);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const saved = localStorage.getItem('selfflow_user');
    if (saved) {
      setIsLoggedIn(true);
      setUser(JSON.parse(saved));
    } else {
      window.location.href = '/';
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('selfflow_user');
    window.location.href = '/';
  };

  const toggleAddon = (addon: string) => {
    if (activeAddons.includes(addon)) {
      setActiveAddons(activeAddons.filter(a => a !== addon));
    } else {
      setActiveAddons([...activeAddons, addon]);
    }
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

          {/* Desktop Nav with Settings */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/dashboard" className="hover:text-cyan-400">Dashboard</Link>
            <Link href="/myplan" className="text-cyan-400 font-medium">My Plan</Link>
            <Link href="/settings" className="hover:text-cyan-400">Settings</Link>
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

      <div className="max-w-5xl mx-auto px-4 py-10 flex-1">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-2">My Plan</h1>
        <p className="text-emerald-400">Self-Serve Priority PPO • Active since April 2026</p>

        {/* Plan Overview */}
        <div className="mt-10 bg-slate-900/80 border border-white/10 rounded-3xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div>
              <div className="text-sm text-slate-400">CURRENT PLAN</div>
              <div className="text-4xl font-semibold mt-2">Priority PPO + RBP</div>
              <div className="text-emerald-400 mt-1">2% of actual savings</div>
            </div>

            <div className="text-center md:text-right">
              <div className="text-sm text-slate-400">NETWORK STRENGTH</div>
              <div className="text-6xl font-bold text-emerald-400 mt-1">92%</div>
              <div className="text-sm">Excellent Coverage</div>
            </div>
          </div>
        </div>

        {/* Savings Breakdown */}
        <div className="mt-10 grid md:grid-cols-2 gap-6">
          <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-8">
            <h3 className="font-semibold mb-6">Savings This Year</h3>
            <div className="text-5xl font-bold text-emerald-400">$1,248,700</div>
            <div className="text-sm text-slate-400 mt-2">10.5% average reduction</div>
          </div>
          <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-8">
            <h3 className="font-semibold mb-6">Claims Steered</h3>
            <div className="text-5xl font-bold">687</div>
            <div className="text-sm text-slate-400 mt-2">68% to Priority PPO network</div>
          </div>
        </div>

        {/* Active Add-ons */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold mb-8">Active Add-ons</h3>
          <div className="space-y-6">
            <div className={`border rounded-3xl p-8 transition-all ${activeAddons.includes('rbp') ? 'border-emerald-400 bg-emerald-900/20' : 'border-white/10'}`}>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-xl">Reference-Based Pricing</h4>
                  <p className="text-slate-400">Caps reimbursement at Medicare + multiplier</p>
                </div>
                <button 
                  onClick={() => toggleAddon('rbp')}
                  className={`px-6 py-2 rounded-full text-sm font-medium ${activeAddons.includes('rbp') ? 'bg-emerald-400 text-slate-950' : 'bg-slate-800'}`}
                >
                  {activeAddons.includes('rbp') ? 'Active' : 'Activate'}
                </button>
              </div>
              <div className="text-emerald-400 text-xs mt-6">+3.1% additional savings this month</div>
            </div>

            <div className={`border rounded-3xl p-8 transition-all ${activeAddons.includes('ai') ? 'border-emerald-400 bg-emerald-900/20' : 'border-white/10 opacity-75'}`}>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-xl">Sentinel AI</h4>
                  <p className="text-slate-400">Automated claim review & anomaly detection</p>
                </div>
                <button 
                  onClick={() => toggleAddon('ai')}
                  className={`px-6 py-2 rounded-full text-sm font-medium ${activeAddons.includes('ai') ? 'bg-emerald-400 text-slate-950' : 'bg-slate-800'}`}
                >
                  {activeAddons.includes('ai') ? 'Active' : 'Activate (+2.8%)'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Plan Utilization */}
        <div className="mt-16 bg-slate-900/60 border border-white/10 rounded-3xl p-8 md:p-12">
          <h3 className="text-xl font-semibold mb-8">Plan Utilization</h3>
          <div className="space-y-6 text-sm">
            <div className="flex justify-between py-4 border-b border-white/10">
              <span>Priority PPO Network Access</span>
              <span className="text-emerald-400">Enabled ✓</span>
            </div>
            <div className="flex justify-between py-4 border-b border-white/10">
              <span>Real-time ZIP Checker</span>
              <span className="text-emerald-400">Enabled ✓</span>
            </div>
            <div className="flex justify-between py-4 border-b border-white/10">
              <span>Steering Rules Engine</span>
              <span className="text-emerald-400">Enabled ✓</span>
            </div>
            <div className="flex justify-between py-4">
              <span>90-Day Money-Back Guarantee</span>
              <span className="text-emerald-400">Active</span>
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