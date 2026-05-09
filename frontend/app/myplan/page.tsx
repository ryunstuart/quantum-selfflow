'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function MyPlan() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/dashboard" className="hover:text-cyan-400">Dashboard</Link>
            <Link href="/myplan" className="text-cyan-400 font-medium">My Plan</Link>
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
              <Link href="/resources" className="py-2" onClick={() => setMobileMenuOpen(false)}>Resources</Link>
              <button onClick={handleLogout} className="text-red-400 py-2">Logout</button>
            </div>
          </div>
        )}
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-10 flex-1">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-2">My Plan</h1>
        <p className="text-emerald-400 text-xl">Active • {user?.employeeCount || '1,240'} lives</p>

        {/* Current Plan Summary */}
        <div className="mt-10 bg-slate-900/80 border border-white/10 rounded-3xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <div className="text-sm text-slate-400 mb-1">CURRENT PLAN</div>
              <div className="text-4xl font-semibold">Self-Serve Priority PPO</div>
              <div className="text-emerald-400 mt-2">2% of actual savings</div>
            </div>
            
            <div className="bg-emerald-900/30 text-emerald-400 px-8 py-4 rounded-2xl text-center">
              <div className="text-sm">NETWORK STRENGTH</div>
              <div className="text-5xl font-bold">Strong</div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="text-center">
              <div className="text-4xl mb-3">📍</div>
              <div className="font-medium">ZIP Coverage</div>
              <div className="text-emerald-400">94% of employees</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">📊</div>
              <div className="font-medium">Avg Savings</div>
              <div className="text-emerald-400">$487 per claim</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🔄</div>
              <div className="font-medium">Steering Rate</div>
              <div className="text-emerald-400">68% PPO</div>
            </div>
          </div>
        </div>

        {/* Active Add-ons */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold mb-8">Active Add-ons</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900/80 border border-cyan-400/50 rounded-3xl p-8">
              <div className="flex justify-between">
                <div>
                  <div className="font-semibold text-xl">Reference-Based Pricing</div>
                  <div className="text-emerald-400 text-sm">Active since April 2026</div>
                </div>
                <div className="text-3xl">📉</div>
              </div>
              <div className="mt-8 text-emerald-400 font-medium">+3.1% additional savings this month</div>
            </div>

            <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-8 opacity-75">
              <div className="flex justify-between">
                <div>
                  <div className="font-semibold text-xl">Sentinel AI</div>
                  <div className="text-slate-400 text-sm">Not Active</div>
                </div>
                <div className="text-3xl">🛡️</div>
              </div>
              <button className="mt-8 w-full py-4 border border-white/30 rounded-2xl text-sm">Activate Sentinel AI (+2.8% savings)</button>
            </div>
          </div>
        </div>

        {/* Plan Details */}
        <div className="mt-16 bg-slate-900/60 border border-white/10 rounded-3xl p-8 md:p-12">
          <h3 className="text-xl font-semibold mb-8">Plan Details</h3>
          <div className="space-y-8">
            <div className="flex justify-between border-b border-white/10 pb-6">
              <div>Monthly Service Fee</div>
              <div className="text-emerald-400">None (2% of savings only)</div>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-6">
              <div>Priority PPO Network</div>
              <div className="text-emerald-400">Included</div>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-6">
              <div>Real-time ZIP Checker</div>
              <div className="text-emerald-400">Included</div>
            </div>
            <div className="flex justify-between">
              <div>Money-Back Guarantee</div>
              <div className="text-emerald-400">90 days</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/60 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-400 text-sm">
          © {currentYear} Quantum SelfFlow • Powered by Quantum One Networks<br />
          Self-serve cost containment platform for self-insured employers and regional TPAs
        </div>
      </footer>
    </div>
  );
}