'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [activeAddons, setActiveAddons] = useState(['Sentinel AI']);

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

  const toggleAddon = (addon: string) => {
    if (activeAddons.includes(addon)) {
      setActiveAddons(activeAddons.filter(a => a !== addon));
    } else {
      setActiveAddons([...activeAddons, addon]);
    }
  };

  const fakeClaims = [
    { id: "CL-7842", date: "May 5", provider: "St. Louis Orthopedics", amount: "$2,847", savings: "$612" },
    { id: "CL-7841", date: "May 4", provider: "Midwest Imaging", amount: "$1,394", savings: "$298" },
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

        {/* Metrics - unchanged for brevity */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {/* ... your existing 4 metric cards ... */}
        </div>

        {/* Savings Trend - unchanged */}
        <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-10 mb-12">
          {/* ... your existing chart ... */}
        </div>

        {/* Recent Claims - unchanged */}
        <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-10 mb-12">
          {/* ... your existing table ... */}
        </div>

        {/* Add-ons Marketplace */}
        <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-10">
          <h3 className="text-2xl font-semibold mb-8">Available Add-ons</h3>
          <p className="text-slate-400 mb-8">One-click activation. Powered by Quantum One verticals.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div onClick={() => toggleAddon('Sentinel AI')} className={`rounded-3xl p-8 cursor-pointer transition border ${activeAddons.includes('Sentinel AI') ? 'border-cyan-400 bg-cyan-900/30' : 'border-white/10 hover:border-white/30'}`}>
              <div className="text-4xl mb-4">🛡️</div>
              <div className="font-semibold text-xl">Sentinel AI</div>
              <div className="text-sm text-slate-400 mt-2">Real-time fraud detection & steering</div>
              <div className="mt-6 text-xs bg-cyan-400/20 text-cyan-400 px-3 py-1 inline-block rounded-full">ACTIVE</div>
            </div>

            <div onClick={() => toggleAddon('Hybrid Care')} className={`rounded-3xl p-8 cursor-pointer transition border ${activeAddons.includes('Hybrid Care') ? 'border-cyan-400 bg-cyan-900/30' : 'border-white/10 hover:border-white/30'}`}>
              <div className="text-4xl mb-4">🏥</div>
              <div className="font-semibold text-xl">Hybrid Care</div>
              <div className="text-sm text-slate-400 mt-2">Virtual + in-person care coordination</div>
              <div className="mt-6 text-xs bg-white/10 px-3 py-1 inline-block rounded-full">Activate</div>
            </div>

            <div onClick={() => toggleAddon('Outcomes')} className={`rounded-3xl p-8 cursor-pointer transition border ${activeAddons.includes('Outcomes') ? 'border-cyan-400 bg-cyan-900/30' : 'border-white/10 hover:border-white/30'}`}>
              <div className="text-4xl mb-4">📈</div>
              <div className="font-semibold text-xl">Outcomes Network</div>
              <div className="text-sm text-slate-400 mt-2">Value-based tiered steering</div>
              <div className="mt-6 text-xs bg-white/10 px-3 py-1 inline-block rounded-full">Activate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}