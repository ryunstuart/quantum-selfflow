'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEmployeeCount, setNewEmployeeCount] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('selfflow_user');
    if (saved) setUser(JSON.parse(saved));
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

  const handleAddEmployees = () => {
    if (newEmployeeCount) {
      alert(`✅ ${newEmployeeCount} new employees added successfully!\nThey will be routed through Priority PPO.`);
      setShowAddModal(false);
      setNewEmployeeCount('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white pb-20">
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
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter">
              Welcome back, {user?.companyName || "Your Company"}
            </h1>
            <p className="text-slate-400 text-xl mt-2">
              Active since May 6, 2026 • {user?.employeeCount || "N/A"} lives
            </p>
          </div>
          <div className="text-right bg-slate-900/70 px-8 py-6 rounded-3xl border border-emerald-400/30">
            <div className="text-emerald-400 text-6xl font-bold">10.5%</div>
            <div className="text-sm text-slate-400">Avg Monthly Savings</div>
          </div>
        </div>

        {/* Key Metrics - Full Color Restored */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-slate-900/80 border border-emerald-500/30 rounded-3xl p-8 hover:border-emerald-400 transition-all">
            <div className="text-emerald-400 text-sm font-medium">TOTAL SAVED YTD</div>
            <div className="text-5xl font-bold mt-4">$1,248,700</div>
            <div className="text-emerald-400 text-sm mt-2">↑ 24% this quarter</div>
          </div>

          <div className="bg-slate-900/80 border border-cyan-500/30 rounded-3xl p-8 hover:border-cyan-400 transition-all">
            <div className="text-cyan-400 text-sm font-medium">CLAIMS PROCESSED</div>
            <div className="text-5xl font-bold mt-4">14,872</div>
            <div className="text-slate-400 text-sm mt-2">This month</div>
          </div>

          <div className="bg-slate-900/80 border border-amber-500/30 rounded-3xl p-8 hover:border-amber-400 transition-all">
            <div className="text-amber-400 text-sm font-medium">NETWORK UTILIZATION</div>
            <div className="text-5xl font-bold mt-4">92%</div>
            <div className="text-slate-400 text-sm mt-2">Priority PPO</div>
          </div>

          <div className="bg-slate-900/80 border border-purple-500/30 rounded-3xl p-8 hover:border-purple-400 transition-all">
            <div className="text-purple-400 text-sm font-medium">TREND REDUCTION</div>
            <div className="text-5xl font-bold mt-4">-11.4%</div>
            <div className="text-slate-400 text-sm mt-2">vs industry average</div>
          </div>
        </div>

        {/* Savings Trend */}
        <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-8 md:p-10 mb-12">
          <h3 className="text-2xl font-semibold mb-8">Monthly Savings Trend (Last 6 Months)</h3>
          <div className="h-80 flex items-end gap-4 md:gap-6 px-4">
            {[42, 71, 88, 76, 105, 138].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center justify-end h-full gap-3 group">
                <div className="text-emerald-400 text-xs font-mono opacity-0 group-hover:opacity-100 transition"> ${height}k </div>
                <div 
                  className="bg-gradient-to-t from-cyan-400 to-emerald-400 w-full rounded-t-xl transition-all duration-700"
                  style={{ height: `${height}%` }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Claims */}
        <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-8 md:p-10 mb-12">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-semibold">Recent Claims Activity</h3>
            <button 
              onClick={() => alert("✅ Full claims report downloaded!")}
              className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-2xl text-sm transition"
            >
              📥 Download Report
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-white/10 text-left text-sm text-slate-400">
                  <th className="pb-4">Claim ID</th>
                  <th className="pb-4">Date</th>
                  <th className="pb-4">Provider</th>
                  <th className="pb-4 text-right">Billed</th>
                  <th className="pb-4 text-right">Savings</th>
                </tr>
              </thead>
              <tbody>
                {fakeClaims.map((claim) => (
                  <tr key={claim.id} className="border-b border-white/10 hover:bg-white/5 transition">
                    <td className="py-6 font-mono">{claim.id}</td>
                    <td className="py-6 text-slate-400">{claim.date}</td>
                    <td className="py-6">{claim.provider}</td>
                    <td className="py-6 text-right">{claim.amount}</td>
                    <td className="py-6 text-right text-emerald-400 font-medium">{claim.savings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-cyan-400 hover:bg-cyan-300 active:scale-[0.97] text-slate-950 rounded-3xl p-10 text-center transition-all duration-200 shadow-lg"
          >
            <div className="text-6xl mb-6">👥</div>
            <div className="text-2xl font-semibold">Add New Employees</div>
            <div className="text-sm opacity-75 mt-2">Instant Priority PPO routing</div>
          </button>

          <button 
            onClick={() => alert("✅ Claims report downloaded!")}
            className="bg-slate-900/80 border border-white/10 hover:border-cyan-400 active:scale-[0.97] rounded-3xl p-10 text-center transition-all duration-200"
          >
            <div className="text-6xl mb-6">📊</div>
            <div className="text-2xl font-semibold">Download Claims Report</div>
            <div className="text-sm text-slate-400 mt-2">Last 90 days • CSV</div>
          </button>

          <button 
            onClick={() => alert("🔗 TPA Integration coming soon!")}
            className="bg-slate-900/80 border border-white/10 hover:border-purple-400 active:scale-[0.97] rounded-3xl p-10 text-center transition-all duration-200"
          >
            <div className="text-6xl mb-6">🔗</div>
            <div className="text-2xl font-semibold">Connect Your TPA</div>
            <div className="text-sm text-slate-400 mt-2">White-label access</div>
          </button>
        </div>

        {/* Add-ons */}
        <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-10">
          <h3 className="text-2xl font-semibold mb-2">Available Add-ons</h3>
          <p className="text-slate-400 mb-10">One-click activation. Powered by Quantum One Networks.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-cyan-400/50 bg-slate-900/50 rounded-3xl p-8">
              <div className="text-5xl mb-4">🛡️</div>
              <div className="font-semibold text-xl mb-1">Sentinel AI</div>
              <div className="text-sm text-slate-400 mb-6">Real-time fraud detection & steering</div>
              <div className="inline-block bg-emerald-400/20 text-emerald-400 text-xs px-4 py-1 rounded-full">ACTIVE</div>
            </div>

            <div className="border border-white/10 hover:border-cyan-400 rounded-3xl p-8 transition cursor-pointer group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition">🏥</div>
              <div className="font-semibold text-xl mb-1">Hybrid Care</div>
              <div className="text-sm text-slate-400 mb-6">Virtual + in-person care coordination</div>
              <button className="text-cyan-400 text-sm font-medium">Activate →</button>
            </div>

            <div className="border border-white/10 hover:border-cyan-400 rounded-3xl p-8 transition cursor-pointer group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition">📈</div>
              <div className="font-semibold text-xl mb-1">Outcomes Network</div>
              <div className="text-sm text-slate-400 mb-6">Value-based tiered steering</div>
              <button className="text-cyan-400 text-sm font-medium">Activate →</button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Employees Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[200] p-4">
          <div className="bg-slate-900 border border-white/10 rounded-3xl p-10 w-full max-w-md">
            <h3 className="text-3xl font-semibold mb-8">Add New Employees</h3>
            <input
              type="number"
              placeholder="Number of new employees / lives"
              className="w-full bg-slate-800 border border-white/20 rounded-2xl px-6 py-5 text-lg mb-8 focus:outline-none focus:border-cyan-400"
              value={newEmployeeCount}
              onChange={(e) => setNewEmployeeCount(e.target.value)}
            />
            <div className="flex gap-4">
              <button onClick={() => setShowAddModal(false)} className="flex-1 py-4 border border-white/20 rounded-2xl font-medium">Cancel</button>
              <button onClick={handleAddEmployees} disabled={!newEmployeeCount} className="flex-1 bg-cyan-400 hover:bg-cyan-300 disabled:bg-slate-700 text-slate-950 font-semibold py-4 rounded-2xl">Add Employees</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}