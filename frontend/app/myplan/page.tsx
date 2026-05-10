'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function MyPlan() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('selfflow_user');
    window.location.href = '/';
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

          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/dashboard" className="hover:text-cyan-400">Dashboard</Link>
            <Link href="/myplan" className="text-cyan-400 font-medium">My Plan</Link>
            <Link href="/settings" className="hover:text-cyan-400">Settings</Link>
            <Link href="/resources" className="hover:text-cyan-400">Resources</Link>
            <button onClick={handleLogout} className="text-red-400 hover:text-red-500 transition">Logout</button>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-3xl focus:outline-none">
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <h1 className="text-5xl font-bold tracking-tighter mb-1">My Plan</h1>
        <p className="text-emerald-400 text-lg">Self-Serve Priority PPO • Active since April 2026</p>

        <div className="grid md:grid-cols-2 gap-6 mt-10">
          <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-8">
            <p className="text-sm text-slate-400 mb-2">CURRENT PLAN</p>
            <p className="text-3xl font-bold">Priority PPO + RBP</p>
            <p className="text-emerald-400 mt-1">2% of actual savings</p>
          </div>

          <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-8 flex flex-col justify-center">
            <p className="text-sm text-slate-400 mb-2">NETWORK STRENGTH</p>
            <p className="text-5xl font-bold text-emerald-400">92%</p>
            <p className="text-emerald-400">Excellent Coverage</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-8">
            <p className="text-sm text-slate-400">Savings This Year</p>
            <p className="text-4xl font-bold text-emerald-400 mt-3">$1,248,700</p>
            <p className="text-sm text-slate-400 mt-1">10.5% average reduction</p>
          </div>
          <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-8">
            <p className="text-sm text-slate-400">Claims Steered</p>
            <p className="text-4xl font-bold mt-3">687</p>
            <p className="text-sm text-slate-400 mt-1">68% to Priority PPO network</p>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Active Add-ons</h2>
          <div className="space-y-4">
            <div className="bg-slate-900/80 border border-emerald-500/30 rounded-3xl p-8 flex justify-between items-center">
              <div>
                <p className="font-semibold text-lg">Reference-Based Pricing</p>
                <p className="text-slate-400">Caps reimbursement at Medicare + multiplier</p>
                <p className="text-emerald-400 text-sm mt-2">+3.1% additional savings this month</p>
              </div>
              <div className="bg-emerald-500 text-black px-6 py-2 rounded-full text-sm font-medium">Active</div>
            </div>

            <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-8 flex justify-between items-center">
              <div>
                <p className="font-semibold text-lg">Sentinel AI</p>
                <p className="text-slate-400">Automated claim review & anomaly detection</p>
              </div>
              <button className="bg-white/10 hover:bg-white/20 px-6 py-2 rounded-full text-sm font-medium transition">
                Activate (+2.8%)
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-slate-900/80 border border-white/10 rounded-3xl p-8">
          <h2 className="text-2xl font-semibold mb-8">Plan Utilization</h2>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span>Priority PPO Network Access</span>
              <span className="text-emerald-400">Enabled ✓</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Real-time ZIP Checker</span>
              <span className="text-emerald-400">Enabled ✓</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Steering Rules Engine</span>
              <span className="text-emerald-400">Enabled ✓</span>
            </div>
            <div className="flex justify-between items-center">
              <span>90-Day Money-Back Guarantee</span>
              <span className="text-emerald-400">Active</span>
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