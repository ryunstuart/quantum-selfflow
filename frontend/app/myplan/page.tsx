'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function MyPlan() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('selfflow_user');
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white">
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
            <Link href="/myplan" className="text-cyan-400 font-medium">My Plan</Link>
            <button onClick={() => { localStorage.removeItem('selfflow_user'); window.location.href = '/'; }} className="text-red-400">Logout</button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
        <h1 className="text-5xl font-bold tracking-tighter mb-2">My Plan</h1>
        <p className="text-slate-400 text-xl">Quantum SelfFlow • Active</p>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-10">
            <h3 className="text-xl font-semibold mb-8 text-cyan-400">Plan Details</h3>
            <div className="space-y-6 text-lg">
              <div>
                <div className="text-sm text-slate-400">Company</div>
                <div className="font-semibold">{user?.companyName || "Your Company"}</div>
              </div>
              <div>
                <div className="text-sm text-slate-400">Plan Type</div>
                <div className="font-semibold">{user?.planType || "Self-Insured"}</div>
              </div>
              <div>
                <div className="text-sm text-slate-400">Covered Lives</div>
                <div className="font-semibold">{user?.employeeCount || "N/A"}</div>
              </div>
              <div>
                <div className="text-sm text-slate-400">Status</div>
                <div className="inline-flex items-center gap-2 bg-emerald-400/20 text-emerald-400 px-4 py-1 rounded-full text-sm">
                  <span className="text-lg">●</span> Active since May 6, 2026
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-10">
            <h3 className="text-xl font-semibold mb-8">Performance Snapshot</h3>
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <span>Savings This Month</span>
                <span className="text-3xl font-bold text-emerald-400">$248,700</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Claims Routed</span>
                <span className="text-3xl font-bold">2,847</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Avg. Savings per Claim</span>
                <span className="text-3xl font-bold text-emerald-400">21.4%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/dashboard" className="inline-block bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold px-12 py-5 rounded-2xl text-lg">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}