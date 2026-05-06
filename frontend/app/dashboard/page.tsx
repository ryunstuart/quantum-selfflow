'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [activeSince] = useState("May 6, 2026");

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
              Active since {activeSince} • {user?.employeeCount || "N/A"} employees
            </p>
          </div>
          <div className="text-right">
            <div className="text-emerald-400 text-5xl font-bold">10.5%</div>
            <div className="text-sm text-slate-400">Average Monthly Savings</div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-8">
            <div className="text-emerald-400 text-sm font-medium">TOTAL SAVED YTD</div>
            <div className="text-5xl font-bold mt-4">$1,248,700</div>
            <div className="text-emerald-400 text-sm mt-2">↑ 24% from last quarter</div>
          </div>

          <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-8">
            <div className="text-cyan-400 text-sm font-medium">CLAIMS PROCESSED</div>
            <div className="text-5xl font-bold mt-4">14,872</div>
            <div className="text-slate-400 mt-2">Through Priority PPO Network</div>
          </div>

          <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-8">
            <div className="text-amber-400 text-sm font-medium">NETWORK UTILIZATION</div>
            <div className="text-5xl font-bold mt-4">92%</div>
            <div className="text-slate-400 mt-2">Doctors in network (Missouri + Midwest)</div>
          </div>

          <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-8">
            <div className="text-purple-400 text-sm font-medium">TREND REDUCTION</div>
            <div className="text-5xl font-bold mt-4">-11.4%</div>
            <div className="text-slate-400 mt-2">vs national 8-9% trend</div>
          </div>
        </div>

        {/* Savings Trend Chart */}
        <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-10 mb-12">
          <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
            Monthly Savings Trend 
            <span className="text-emerald-400 text-sm font-normal">(Last 6 Months)</span>
          </h3>
          <div className="h-80 bg-gradient-to-r from-cyan-950 to-emerald-950 rounded-2xl p-8 flex items-end gap-4">
            {[45, 68, 82, 79, 95, 112].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end h-full gap-2">
                <div className="text-emerald-400 text-xs text-center font-mono">${height}k</div>
                <div 
                  className="bg-gradient-to-t from-emerald-400 to-cyan-400 rounded-t w-full transition-all" 
                  style={{ height: `${height}%` }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/onboarding" className="bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold rounded-3xl p-10 text-center transition group">
            <div className="text-5xl mb-6 group-hover:scale-110 transition">👥</div>
            <div className="text-2xl">Add New Employees</div>
            <div className="text-sm mt-2 opacity-75">Level-funded or self-insured</div>
          </Link>

          <div className="bg-slate-900/80 border border-white/10 hover:border-cyan-400/50 rounded-3xl p-10 text-center transition cursor-pointer">
            <div className="text-5xl mb-6">📊</div>
            <div className="text-2xl">Download Claims Report</div>
            <div className="text-sm mt-2 text-slate-400">CSV • PDF • Last 30 days</div>
          </div>

          <div 
            onClick={() => alert("TPA Connection coming in next update!")}
            className="bg-slate-900/80 border border-white/10 hover:border-purple-400/50 rounded-3xl p-10 text-center transition cursor-pointer"
          >
            <div className="text-5xl mb-6">🔗</div>
            <div className="text-2xl">Connect Your TPA</div>
            <div className="text-sm mt-2 text-purple-400">For regional TPAs &amp; self-insured groups</div>
          </div>
        </div>
      </div>
    </div>
  );
}