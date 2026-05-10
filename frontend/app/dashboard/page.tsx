'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleLogout = () => {
    localStorage.removeItem('selfflow_user');
    window.location.href = '/';
  };

  // Fake data
  const savingsData = [42, 71, 88, 76, 105, 138];
  const months = ['M1', 'M2', 'M3', 'M4', 'M5', 'M6'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white flex flex-col overflow-x-hidden">
      <nav className="border-b border-white/10 bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          {/* Standardized Logo - Same as Resources */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition">
            <div className="w-9 h-9 md:w-10 md:h-10 bg-cyan-400 rounded-2xl flex items-center justify-center text-slate-950 font-bold text-2xl md:text-3xl shadow-lg">Q</div>
            <div>
              <div className="font-bold text-3xl md:text-3xl tracking-tighter">Quantum SelfFlow</div>
              <div className="text-cyan-400 text-xs md:text-sm -mt-1">Self-serve savings. Zero complexity.</div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/dashboard" className="text-cyan-400 font-medium">Dashboard</Link>
            <Link href="/myplan" className="hover:text-cyan-400">My Plan</Link>
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

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 flex-1">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">Welcome back, Quantum Inc.</h1>
            <p className="text-slate-400 mt-2">Real-time savings dashboard • 1,284 employees</p>
          </div>
          <div className="text-right">
            <div className="text-emerald-400 text-5xl font-bold">12.4%</div>
            <p className="text-sm text-slate-400">Average Monthly Savings</p>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6">
            <p className="text-slate-400 text-sm">This Month Saved</p>
            <p className="text-4xl font-bold mt-2">$87,420</p>
          </div>
          <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6">
            <p className="text-slate-400 text-sm">Total Savings YTD</p>
            <p className="text-4xl font-bold mt-2">$428,650</p>
          </div>
          <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6">
            <p className="text-slate-400 text-sm">Network Utilization</p>
            <p className="text-4xl font-bold mt-2">87%</p>
          </div>
          <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6">
            <p className="text-slate-400 text-sm">Claims Processed</p>
            <p className="text-4xl font-bold mt-2">1,847</p>
          </div>
        </div>

        {/* Monthly Savings Trend */}
        <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-8">Monthly Savings Trend</h2>
          <div className="flex items-end gap-3 h-64">
            {savingsData.map((height, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end items-center">
                <div 
                  className="bg-gradient-to-t from-cyan-400 to-cyan-300 w-full rounded-t-xl transition-all"
                  style={{ height: `${height}px` }}
                />
                <div className="text-xs text-slate-500 mt-3 font-medium">{months[i]}</div>
              </div>
            ))}
          </div>
          <p className="text-center text-slate-400 mt-6 text-sm">Projected annual savings: <span className="text-emerald-400 font-medium">$1.05M</span></p>
        </div>

        {/* Recent Claims */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Recent Claims</h2>
            <button className="text-cyan-400 hover:underline text-sm">View All Claims →</button>
          </div>
          <div className="bg-slate-900/80 border border-white/10 rounded-3xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-6 font-medium text-slate-400">Date</th>
                  <th className="text-left p-6 font-medium text-slate-400">Provider</th>
                  <th className="text-left p-6 font-medium text-slate-400">Service</th>
                  <th className="text-right p-6 font-medium text-slate-400">Billed</th>
                  <th className="text-right p-6 font-medium text-slate-400">Saved</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {[
                  ["05/08", "St. Louis Ortho", "Knee MRI", "$2,840", "$1,420"],
                  ["05/07", "Midwest Imaging", "CT Scan", "$1,950", "$975"],
                  ["05/06", "Premier Care", "Physical Therapy", "$680", "$340"],
                ].map((row, i) => (
                  <tr key={i}>
                    <td className="p-6">{row[0]}</td>
                    <td className="p-6">{row[1]}</td>
                    <td className="p-6">{row[2]}</td>
                    <td className="p-6 text-right font-medium">{row[3]}</td>
                    <td className="p-6 text-right text-emerald-400 font-medium">{row[4]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions & Add-ons */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-8">
            <h3 className="text-xl font-semibold mb-6">Quick Actions</h3>
            <div className="space-y-4">
              <button onClick={() => setShowEmployeeModal(true)} className="w-full bg-white text-black py-4 rounded-2xl font-medium hover:bg-white/90 transition">Add New Employee</button>
              <button className="w-full border border-white/30 py-4 rounded-2xl font-medium hover:bg-white/10 transition">Download Claims Report</button>
              <button className="w-full border border-white/30 py-4 rounded-2xl font-medium hover:bg-white/10 transition">Add TPA Extension</button>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-8">
            <h3 className="text-xl font-semibold mb-6">Available Add-ons</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-slate-800/50 p-4 rounded-2xl">
                <div>Sentinel AI Bill Review</div>
                <span className="text-emerald-400 text-sm font-medium">+4.2% savings</span>
              </div>
              <div className="flex justify-between items-center bg-slate-800/50 p-4 rounded-2xl">
                <div>Hybrid Care Navigation</div>
                <span className="text-emerald-400 text-sm font-medium">+3.1% savings</span>
              </div>
              <div className="flex justify-between items-center bg-slate-800/50 p-4 rounded-2xl">
                <div>Outcomes-Based Pricing</div>
                <span className="text-emerald-400 text-sm font-medium">+2.8% savings</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-white/10 bg-black/60 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-400 text-sm">
          © {currentYear} Quantum SelfFlow • Powered by Quantum One Networks
        </div>
      </footer>
    </div>
  );
}