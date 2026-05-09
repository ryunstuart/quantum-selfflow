'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEmployeeCount, setNewEmployeeCount] = useState('');
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const saved = localStorage.getItem('selfflow_user');
    if (saved) {
      setUser(JSON.parse(saved));
    } else {
      window.location.href = '/';
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('selfflow_user');
    window.location.href = '/';
  };

  const handleAddEmployees = () => {
    if (newEmployeeCount) {
      alert(`✅ ${newEmployeeCount} employees added successfully!`);
      setShowAddModal(false);
      setNewEmployeeCount('');
    }
  };

  const savingsData = [42, 71, 88, 76, 105, 138];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white flex flex-col">
      <nav className="border-b border-white/10 bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition">
            <div className="w-9 h-9 md:w-10 md:h-10 bg-cyan-400 rounded-2xl flex items-center justify-center text-slate-950 font-bold text-2xl md:text-3xl shadow-lg">Q</div>
            <div>
              <div className="font-bold text-2xl md:text-3xl tracking-tighter">Quantum SelfFlow</div>
              <div className="text-cyan-400 text-xs md:text-sm -mt-1">Self-serve savings. Zero complexity.</div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/dashboard" className="text-cyan-400 font-medium">Dashboard</Link>
            <Link href="/myplan" className="hover:text-cyan-400">My Plan</Link>
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

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-10 flex-1">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
              Welcome back, {user?.companyName || 'Quantum Client'}
            </h1>
            <p className="text-emerald-400 text-xl md:text-2xl font-medium mt-2">
              10.5% savings • {user?.employeeCount || '1,240'} lives
            </p>
          </div>
          <div className="mt-6 md:mt-0 bg-emerald-900/30 text-emerald-400 px-6 py-3 rounded-2xl text-sm font-medium whitespace-nowrap">
            YTD Savings: <span className="text-2xl font-bold">$1,248,700</span>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10">
          <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 md:p-8">
            <div className="text-xs md:text-sm text-slate-400">TOTAL SAVED YTD</div>
            <div className="text-3xl md:text-4xl font-bold mt-3">$1,248,700</div>
          </div>
          <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 md:p-8">
            <div className="text-xs md:text-sm text-slate-400">AVG / CLAIM</div>
            <div className="text-3xl md:text-4xl font-bold mt-3">$487</div>
          </div>
          <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 md:p-8">
            <div className="text-xs md:text-sm text-slate-400">NETWORK USE</div>
            <div className="text-3xl md:text-4xl font-bold mt-3">68%</div>
          </div>
          <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 md:p-8">
            <div className="text-xs md:text-sm text-slate-400">TREND ↓</div>
            <div className="text-3xl md:text-4xl font-bold mt-3 text-emerald-400">-9.4%</div>
          </div>
        </div>

        {/* Savings Trend */}
        <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 md:p-10 mb-10">
          <h3 className="text-lg md:text-xl font-semibold mb-6">Monthly Savings Trend</h3>
          <div className="flex items-end gap-2 md:gap-4 h-52 md:h-64">
            {savingsData.map((height, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end items-center">
                <div 
                  className="bg-cyan-400 w-full rounded-t-xl transition-all" 
                  style={{ height: `${height}px` }}
                />
                <div className="text-[10px] md:text-xs text-slate-500 mt-3">M{i+1}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Claims - Scrollable on mobile */}
        <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 md:p-10">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg md:text-xl font-semibold">Recent Claims</h3>
            <button className="text-cyan-400 text-sm hover:underline">View All →</button>
          </div>
          
          <div className="overflow-x-auto -mx-1">
            <table className="w-full min-w-[600px] text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 pl-1">Claim ID</th>
                  <th className="text-left py-4">Date</th>
                  <th className="text-left py-4">Provider</th>
                  <th className="text-right py-4">Billed</th>
                  <th className="text-right py-4 pr-1">Savings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {[
                  { id: "CL-7842", date: "May 6", provider: "St. Louis Ortho", billed: "$8,942", savings: "$2,310" },
                  { id: "CL-7841", date: "May 5", provider: "Midwest Imaging", billed: "$3,245", savings: "$1,089" },
                  { id: "CL-7840", date: "May 4", provider: "Heartland PT", billed: "$1,890", savings: "$672" },
                ].map((claim, i) => (
                  <tr key={i} className="hover:bg-white/5">
                    <td className="py-5 pl-1 font-mono whitespace-nowrap">{claim.id}</td>
                    <td className="py-5 text-slate-400 whitespace-nowrap">{claim.date}</td>
                    <td className="py-5 whitespace-nowrap">{claim.provider}</td>
                    <td className="py-5 text-right whitespace-nowrap">{claim.billed}</td>
                    <td className="py-5 text-right text-emerald-400 font-medium pr-1 whitespace-nowrap">{claim.savings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-12">
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold py-8 md:py-10 rounded-3xl text-lg md:text-xl flex flex-col items-center gap-3 transition"
          >
            👥 Add New Employees
          </button>
          <button 
            onClick={() => alert("✅ Full claims report downloaded")}
            className="bg-slate-900/80 hover:bg-slate-800 border border-white/20 font-semibold py-8 md:py-10 rounded-3xl text-lg md:text-xl flex flex-col items-center gap-3 transition"
          >
            📊 Download Claims Report
          </button>
          <button 
            onClick={() => alert("🔗 TPA Integration instructions sent")}
            className="bg-slate-900/80 hover:bg-slate-800 border border-white/20 font-semibold py-8 md:py-10 rounded-3xl text-lg md:text-xl flex flex-col items-center gap-3 transition"
          >
            🔗 Connect Your TPA
          </button>
        </div>
      </div>

      {/* Add Employees Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[200] px-4">
          <div className="bg-slate-900 border border-white/20 rounded-3xl p-8 w-full max-w-md">
            <h3 className="text-2xl font-semibold mb-6">Add New Employees</h3>
            <input
              type="number"
              value={newEmployeeCount}
              onChange={(e) => setNewEmployeeCount(e.target.value)}
              placeholder="Number of employees"
              className="w-full bg-black/50 border border-white/20 rounded-2xl px-6 py-5 text-lg mb-8"
            />
            <div className="flex gap-4">
              <button 
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-5 border border-white/30 rounded-2xl font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddEmployees}
                className="flex-1 bg-cyan-400 text-slate-950 py-5 rounded-2xl font-semibold"
              >
                Add Employees
              </button>
            </div>
          </div>
        </div>
      )}

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