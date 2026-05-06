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
            <h1 className="text-5xl font-bold tracking-tighter">Welcome back, {user?.companyName || "Team"}</h1>
            <p className="text-slate-400 text-xl mt-2">Your Priority PPO savings dashboard</p>
          </div>
          <div className="text-right">
            <div className="text-emerald-400 text-4xl font-bold">10.5%</div>
            <div className="text-sm text-slate-400">Avg. Savings This Month</div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-8">
            <div className="text-emerald-400 text-sm font-medium">TOTAL SAVED</div>
            <div className="text-5xl font-bold mt-4">$248,700</div>
            <div className="text-slate-400 mt-2">This month • +18% from last</div>
          </div>

          <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-8">
            <div className="text-cyan-400 text-sm font-medium">CLAIMS PROCESSED</div>
            <div className="text-5xl font-bold mt-4">2,847</div>
            <div className="text-slate-400 mt-2">Through Priority PPO</div>
          </div>

          <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-8">
            <div className="text-amber-400 text-sm font-medium">NETWORK UTILIZATION</div>
            <div className="text-5xl font-bold mt-4">87%</div>
            <div className="text-slate-400 mt-2">Doctors in network</div>
          </div>

          <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-8">
            <div className="text-purple-400 text-sm font-medium">TREND REDUCTION</div>
            <div className="text-5xl font-bold mt-4">-11.4%</div>
            <div className="text-slate-400 mt-2">vs industry average</div>
          </div>
        </div>

        {/* Savings Chart Placeholder */}
        <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-10 mb-12">
          <h3 className="text-2xl font-semibold mb-6">Monthly Savings Trend</h3>
          <div className="h-80 bg-gradient-to-r from-cyan-900/30 to-emerald-900/30 rounded-2xl flex items-center justify-center border border-dashed border-white/20">
            <div className="text-center">
              <div className="text-6xl mb-4">📈</div>
              <div className="text-xl text-slate-300">Savings Chart Coming Soon</div>
              <div className="text-sm text-slate-500">(We can add real Chart.js later)</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/onboarding" className="bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold rounded-3xl p-8 text-center transition">
            <div className="text-4xl mb-4">🔄</div>
            <div className="text-xl">Add New Employees</div>
          </Link>

          <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-8 text-center hover:border-cyan-400/50 transition cursor-pointer">
            <div className="text-4xl mb-4">📋</div>
            <div className="text-xl">Download Claims Report</div>
          </div>

          <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-8 text-center hover:border-cyan-400/50 transition cursor-pointer">
            <div className="text-4xl mb-4">👥</div>
            <div className="text-xl">Invite Team Members</div>
          </div>
        </div>
      </div>
    </div>
  );
}