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
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-400 rounded-2xl flex items-center justify-center text-slate-950 font-bold text-3xl shadow-lg">Q</div>
            <div>
              <div className="font-bold text-3xl tracking-tighter">Quantum SelfFlow</div>
              <div className="text-cyan-400 text-sm -mt-1">Self-serve savings. Zero complexity.</div>
            </div>
          </div>

          <div className="flex items-center gap-8 text-sm font-medium">
            <Link href="/" className="hover:text-cyan-400">Home</Link>
            <Link href="/dashboard" className="hover:text-cyan-400">Dashboard</Link>
            <Link href="/myplan" className="text-cyan-400 font-medium">My Plan</Link>
            <button onClick={() => { localStorage.removeItem('selfflow_user'); window.location.href = '/'; }} className="text-red-400">Logout</button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-5xl font-bold tracking-tighter mb-2">My Plan</h1>
        <p className="text-slate-400 text-xl">Quantum SelfFlow • Active</p>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-10">
            <h3 className="text-xl font-semibold mb-6 text-cyan-400">Plan Details</h3>
            <div className="space-y-6">
              <div>
                <div className="text-sm text-slate-400">Company</div>
                <div className="text-2xl font-medium">{user?.companyName || "Your Company"}</div>
              </div>
              <div>
                <div className="text-sm text-slate-400">Plan Type</div>
                <div className="text-2xl font-medium">{user?.planType || "Self-Insured"}</div>
              </div>
              <div>
                <div className="text-sm text-slate-400">Covered Lives</div>
                <div className="text-2xl font-medium">{user?.employeeCount || "N/A"}</div>
              </div>
              <div>
                <div className="text-sm text-slate-400">Status</div>
                <div className="inline-block bg-emerald-400/20 text-emerald-400 px-4 py-1 rounded-full text-sm font-medium">Active since May 6, 2026</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-10">
            <h3 className="text-xl font-semibold mb-6">Current Performance</h3>
            <div className="space-y-8">
              <div className="flex justify-between">
                <div>Savings This Month</div>
                <div className="text-emerald-400 font-bold">$248,700</div>
              </div>
              <div className="flex justify-between">
                <div>Claims Routed</div>
                <div>2,847</div>
              </div>
              <div className="flex justify-between">
                <div>Average Savings per Claim</div>
                <div className="text-emerald-400 font-bold">21.4%</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/dashboard" className="inline-block bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold px-12 py-5 rounded-2xl text-lg">
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}