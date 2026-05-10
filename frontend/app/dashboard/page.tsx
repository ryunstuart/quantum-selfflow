'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Dashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('selfflow_user');
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col overflow-x-hidden">
      <nav className="border-b border-white/10 bg-black/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition">
            <div className="w-9 h-9 md:w-10 md:h-10 bg-cyan-400 rounded-2xl flex items-center justify-center text-slate-950 font-bold text-2xl md:text-3xl shadow-lg">Q</div>
            <div>
              <div className="font-bold text-3xl md:text-3xl tracking-tighter">Quantum SelfFlow</div>
              <div className="text-cyan-400 text-xs md:text-sm -mt-1">Self-serve savings. Zero complexity.</div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/dashboard" className="text-cyan-400 font-medium">Dashboard</Link>
            <Link href="/myplan" className="hover:text-cyan-400">My Plan</Link>
            <Link href="/settings" className="hover:text-cyan-400">Settings</Link>
            <Link href="/resources" className="hover:text-cyan-400">Resources</Link>
            <button onClick={handleLogout} className="text-red-400 hover:text-red-500 transition">Logout</button>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-3xl">
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">Welcome back, Stuart Brothers LLC</h1>
            <p className="text-emerald-400 text-lg mt-1">10.5% savings • 345 lives</p>
          </div>
          <div className="mt-4 md:mt-0 bg-emerald-900/30 border border-emerald-500/30 text-emerald-400 px-6 py-3 rounded-2xl text-right">
            YTD Savings: <span className="font-bold text-2xl">$1,248,700</span>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-3xl p-6">
            <p className="text-slate-400 text-sm">TOTAL SAVED YTD</p>
            <p className="text-3xl font-bold mt-3">$1,248,700</p>
          </div>
          <div className="bg-[#1a1a1a] border border-white/10 rounded-3xl p-6">
            <p className="text-slate-400 text-sm">AVG / CLAIM</p>
            <p className="text-3xl font-bold mt-3">$487</p>
          </div>
          <div className="bg-[#1a1a1a] border border-white/10 rounded-3xl p-6">
            <p className="text-slate-400 text-sm">NETWORK USE</p>
            <p className="text-3xl font-bold mt-3">68%</p>
          </div>
          <div className="bg-[#1a1a1a] border border-white/10 rounded-3xl p-6">
            <p className="text-slate-400 text-sm">TREND ↓</p>
            <p className="text-3xl font-bold mt-3 text-emerald-400">-9.4%</p>
          </div>
        </div>

        {/* Monthly Savings Trend */}
        <div className="bg-[#1a1a1a] border border-white/10 rounded-3xl p-8 mb-12">
          <h2 className="text-xl font-semibold mb-8">Monthly Savings Trend</h2>
          <div className="flex items-end gap-4 h-64">
            {[38, 62, 78, 65, 92, 118].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end items-center group">
                <div 
                  className="bg-cyan-400 w-full rounded-t-xl transition-all group-hover:bg-cyan-300" 
                  style={{ height: `${height}px` }}
                />
                <div className="text-xs text-slate-500 mt-4">M{i+1}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Claims */}
        <div className="bg-[#1a1a1a] border border-white/10 rounded-3xl p-8 mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Recent Claims</h2>
            <Link href="#" className="text-cyan-400 text-sm hover:underline">View All →</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-white/10 text-left text-sm text-slate-400">
                  <th className="pb-4 font-medium">Claim ID</th>
                  <th className="pb-4 font-medium">Date</th>
                  <th className="pb-4 font-medium">Provider</th>
                  <th className="pb-4 font-medium text-right">Billed</th>
                  <th className="pb-4 font-medium text-right">Savings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-sm">
                <tr>
                  <td className="py-5">CL-7842</td>
                  <td className="py-5">May 6</td>
                  <td className="py-5">St. Louis Ortho</td>
                  <td className="py-5 text-right">$8,942</td>
                  <td className="py-5 text-right text-emerald-400 font-medium">$2,310</td>
                </tr>
                <tr>
                  <td className="py-5">CL-7841</td>
                  <td className="py-5">May 5</td>
                  <td className="py-5">Midwest Imaging</td>
                  <td className="py-5 text-right">$3,245</td>
                  <td className="py-5 text-right text-emerald-400 font-medium">$1,089</td>
                </tr>
                <tr>
                  <td className="py-5">CL-7840</td>
                  <td className="py-5">May 4</td>
                  <td className="py-5">Heartland PT</td>
                  <td className="py-5 text-right">$1,890</td>
                  <td className="py-5 text-right text-emerald-400 font-medium">$672</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-12">
          <button className="flex-1 md:flex-none bg-cyan-400 hover:bg-cyan-300 text-black font-semibold px-8 py-4 rounded-2xl flex items-center justify-center gap-3 transition">
            👥 Add New Employees
          </button>
          <button className="flex-1 md:flex-none border border-white/30 hover:bg-white/5 font-medium px-8 py-4 rounded-2xl flex items-center justify-center gap-3 transition">
            📊 Download Claims Report
          </button>
          <button className="flex-1 md:flex-none border border-white/30 hover:bg-white/5 font-medium px-8 py-4 rounded-2xl flex items-center justify-center gap-3 transition">
            🔗 Connect Your TPA
          </button>
        </div>

        {/* Available Add-ons */}
        <div className="bg-[#1a1a1a] border border-white/10 rounded-3xl p-8">
          <h2 className="text-xl font-semibold mb-8">Available Add-ons</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-black/60 border border-white/10 rounded-3xl p-8 hover:border-cyan-400/50 transition">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="font-semibold text-lg">Sentinel AI</h3>
              <p className="text-slate-400 mt-2">AI-powered claim review</p>
              <p className="text-emerald-400 mt-6 font-medium">+2.8% savings</p>
            </div>
            <div className="bg-black/60 border border-white/10 rounded-3xl p-8 hover:border-cyan-400/50 transition">
              <div className="text-4xl mb-4">🏥</div>
              <h3 className="font-semibold text-lg">Hybrid Care</h3>
              <p className="text-slate-400 mt-2">Telehealth navigation</p>
              <p className="text-emerald-400 mt-6 font-medium">+1.9% savings</p>
            </div>
            <div className="bg-black/60 border border-white/10 rounded-3xl p-8 hover:border-cyan-400/50 transition">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="font-semibold text-lg">Outcomes Tier</h3>
              <p className="text-slate-400 mt-2">Performance incentives</p>
              <p className="text-emerald-400 mt-6 font-medium">+3.4% savings</p>
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