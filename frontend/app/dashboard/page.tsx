'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('selfflow_user');
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('selfflow_user');
    window.location.href = '/';
  };

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
            <Link href="/dashboard" className="text-cyan-400 font-medium">Dashboard</Link>
            <button onClick={logout} className="text-red-400 hover:text-red-500">Logout</button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-5xl font-bold tracking-tighter">
              Welcome back, {user?.companyName || "Your Company"}
            </h1>
            <p className="text-slate-400 text-xl mt-1">
              Active since May 6, 2026 • {user?.employeeCount || "N/A"} lives
            </p>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-slate-900/80 border border-emerald-500/30 rounded-3xl p-8">
            <div className="text-emerald-400 text-sm">TOTAL SAVED YTD</div>
            <div className="text-5xl font-bold mt-3">$1,248,700</div>
            <div className="text-emerald-400 text-sm mt-1">↑ 24% this quarter</div>
          </div>
          <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-8">
            <div className="text-cyan-400 text-sm">CLAIMS PROCESSED</div>
            <div className="text-5xl font-bold mt-3">14,872</div>
            <div className="text-slate-400 text-sm mt-1">This month</div>
          </div>
          <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-8">
            <div className="text-amber-400 text-sm">NETWORK UTILIZATION</div>
            <div className="text-5xl font-bold mt-3">92%</div>
            <div className="text-slate-400 text-sm mt-1">Priority PPO</div>
          </div>
          <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-8">
            <div className="text-purple-400 text-sm">TREND REDUCTION</div>
            <div className="text-5xl font-bold mt-3">-11.4%</div>
            <div className="text-slate-400 text-sm mt-1">vs industry</div>
          </div>
        </div>

        {/* Real Savings Chart */}
        <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-10 mb-12">
          <h3 className="text-2xl font-semibold mb-6">Monthly Savings Trend (Last 6 Months)</h3>
          <div className="h-80 bg-gradient-to-r from-cyan-950 to-emerald-950 rounded-2xl flex items-end gap-6 p-8">
            {[42, 71, 88, 76, 105, 138].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center justify-end h-full gap-2">
                <div className="text-emerald-400 text-xs font-mono">${h}k</div>
                <div className="bg-gradient-to-t from-cyan-400 to-emerald-400 w-full rounded-t" style={{height: `${h}%`}} />
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/onboarding" className="bg-cyan-400 text-slate-950 rounded-3xl p-10 text-center hover:scale-105 transition">
            <div className="text-6xl mb-4">👥</div>
            <div className="text-2xl font-semibold">Add New Employees</div>
          </Link>

          <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-10 text-center hover:border-cyan-400 transition cursor-pointer">
            <div className="text-6xl mb-4">📊</div>
            <div className="text-2xl font-semibold">Download Claims Report</div>
          </div>

          <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-10 text-center hover:border-purple-400 transition cursor-pointer" onClick={() => alert('TPA Integration coming soon!')}>
            <div className="text-6xl mb-4">🔗</div>
            <div className="text-2xl font-semibold">Connect Your TPA</div>
          </div>
        </div>
      </div>
    </div>
  );
}