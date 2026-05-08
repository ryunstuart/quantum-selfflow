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

  const fakeClaims = [
    { id: "CL-7842", date: "May 5", provider: "St. Louis Orthopedics", amount: "$2,847", savings: "$612" },
    { id: "CL-7841", date: "May 4", provider: "Midwest Imaging", amount: "$1,394", savings: "$298" },
    { id: "CL-7840", date: "May 3", provider: "SSM Health", amount: "$3,210", savings: "$874" },
  ];

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
            <Link href="/dashboard" className="text-cyan-400 font-medium">Dashboard</Link>
            <button onClick={logout} className="text-red-400 hover:text-red-500">Logout</button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
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

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
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
            <div className="text-slate-400 text-sm mt-1">vs industry average</div>
          </div>
        </div>

        {/* Savings Trend Chart */}
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

        {/* Recent Claims */}
        <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-10 mb-12">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold">Recent Claims Activity</h3>
            <button 
              onClick={() => alert("✅ Claims report downloaded! (Demo)")}
              className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl text-sm transition"
            >
              📥 Download Full Report
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 text-left text-sm text-slate-400">
                  <th className="pb-4">Claim ID</th>
                  <th className="pb-4">Date</th>
                  <th className="pb-4">Provider</th>
                  <th className="pb-4 text-right">Billed</th>
                  <th className="pb-4 text-right">Savings</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {fakeClaims.map((claim) => (
                  <tr key={claim.id} className="border-b border-white/10 last:border-0 hover:bg-white/5">
                    <td className="py-5 font-mono">{claim.id}</td>
                    <td className="py-5 text-slate-400">{claim.date}</td>
                    <td className="py-5">{claim.provider}</td>
                    <td className="py-5 text-right">{claim.amount}</td>
                    <td className="py-5 text-right text-emerald-400 font-medium">{claim.savings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Available Add-ons */}
        <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-10">
          <h3 className="text-2xl font-semibold mb-2">Available Add-ons</h3>
          <p className="text-slate-400 mb-8">One-click activation. Powered by Quantum One verticals.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-cyan-400/50 bg-slate-900/50 rounded-3xl p-8">
              <div className="text-5xl mb-4">🛡️</div>
              <div className="font-semibold text-xl mb-1">Sentinel AI</div>
              <div className="text-sm text-slate-400 mb-6">Real-time fraud detection & steering</div>
              <div className="inline-block bg-emerald-400/20 text-emerald-400 text-xs px-4 py-1 rounded-full">ACTIVE</div>
            </div>

            <div className="border border-white/10 hover:border-cyan-400 rounded-3xl p-8 transition cursor-pointer">
              <div className="text-5xl mb-4">🏥</div>
              <div className="font-semibold text-xl mb-1">Hybrid Care</div>
              <div className="text-sm text-slate-400 mb-6">Virtual + in-person care coordination</div>
              <button className="text-cyan-400 text-sm font-medium">Activate →</button>
            </div>

            <div className="border border-white/10 hover:border-cyan-400 rounded-3xl p-8 transition cursor-pointer">
              <div className="text-5xl mb-4">📈</div>
              <div className="font-semibold text-xl mb-1">Outcomes Network</div>
              <div className="text-sm text-slate-400 mb-6">Value-based tiered steering</div>
              <button className="text-cyan-400 text-sm font-medium">Activate →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}