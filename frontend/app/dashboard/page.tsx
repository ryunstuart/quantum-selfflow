'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEmployeeCount, setNewEmployeeCount] = useState('');

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

  const handleAddEmployees = () => {
    if (newEmployeeCount) {
      alert(`✅ ${newEmployeeCount} new employees added successfully!\nThey will be routed through Priority PPO.`);
      setShowAddModal(false);
      setNewEmployeeCount('');
    }
  };

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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <h1 className="text-5xl font-bold tracking-tighter">
              Welcome back, {user?.companyName || "Your Company"}
            </h1>
            <p className="text-slate-400 text-xl mt-1">
              Active since May 6, 2026 • {user?.employeeCount || "N/A"} lives
            </p>
          </div>
        </div>

        {/* Metrics, Chart, Recent Claims - same as before */}

        {/* Available Add-ons + Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-3xl p-10 text-center transition"
          >
            <div className="text-6xl mb-4">👥</div>
            <div className="text-2xl font-semibold">Add New Employees</div>
          </button>

          <button 
            onClick={() => alert("✅ Claims report downloaded!")}
            className="bg-slate-900/80 border border-white/10 hover:border-cyan-400 rounded-3xl p-10 text-center transition"
          >
            <div className="text-6xl mb-4">📊</div>
            <div className="text-2xl font-semibold">Download Claims Report</div>
          </button>

          <button 
            onClick={() => alert("🔗 TPA Integration coming soon!")}
            className="bg-slate-900/80 border border-white/10 hover:border-purple-400 rounded-3xl p-10 text-center transition"
          >
            <div className="text-6xl mb-4">🔗</div>
            <div className="text-2xl font-semibold">Connect Your TPA</div>
          </button>
        </div>
      </div>

      {/* Add New Employees Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[200]">
          <div className="bg-slate-900 border border-white/10 rounded-3xl p-10 w-full max-w-md mx-4">
            <h3 className="text-3xl font-semibold mb-8">Add New Employees</h3>
            
            <input
              type="number"
              placeholder="Number of new employees / lives"
              className="w-full bg-slate-800 border border-white/20 rounded-2xl px-6 py-5 text-lg mb-8"
              value={newEmployeeCount}
              onChange={(e) => setNewEmployeeCount(e.target.value)}
            />

            <div className="flex gap-4">
              <button 
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-4 border border-white/20 rounded-2xl"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddEmployees}
                disabled={!newEmployeeCount}
                className="flex-1 bg-cyan-400 hover:bg-cyan-300 disabled:bg-slate-700 text-slate-950 font-semibold py-4 rounded-2xl"
              >
                Add Employees
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}