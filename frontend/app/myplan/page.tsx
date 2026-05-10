'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function MyPlan() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeAddons, setActiveAddons] = useState(['rbp']); // Default: Reference-Based Pricing active
  const currentYear = new Date().getFullYear();

  const handleLogout = () => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white flex flex-col overflow-x-hidden">
      <nav className="border-b border-white/10 bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          {/* Standardized Logo/Header - Same as Resources & Dashboard */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition">
            <div className="w-9 h-9 md:w-10 md:h-10 bg-cyan-400 rounded-2xl flex items-center justify-center text-slate-950 font-bold text-2xl md:text-3xl shadow-lg">Q</div>
            <div>
              <div className="font-bold text-3xl md:text-3xl tracking-tighter">Quantum SelfFlow</div>
              <div className="text-cyan-400 text-xs md:text-sm -mt-1">Self-serve savings. Zero complexity.</div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/dashboard" className="hover:text-cyan-400">Dashboard</Link>
            <Link href="/myplan" className="text-cyan-400 font-medium">My Plan</Link>
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
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-2">My Plan</h1>
        <p className="text-slate-400 mb-10">Quantum Inc. • 1,284 Lives • Level-Funded Plan</p>

        {/* Current Plan Summary */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-8">
            <p className="text-slate-400">Core Network</p>
            <p className="text-4xl font-bold mt-3">Priority PPO</p>
            <p className="text-emerald-400 mt-1">Active • 87% Utilization</p>
          </div>
          <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-8">
            <p className="text-slate-400">Current Savings</p>
            <p className="text-4xl font-bold mt-3">12.4%</p>
            <p className="text-emerald-400 mt-1">+$428K YTD</p>
          </div>
          <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-8">
            <p className="text-slate-400">Reference-Based Pricing</p>
            <p className="text-4xl font-bold mt-3">Enabled</p>
            <p className="text-emerald-400 mt-1">+4.8% additional savings</p>
          </div>
        </div>

        {/* Available Add-ons */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Available Add-ons</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { id: 'rbp', name: 'Reference-Based Pricing', desc: 'Steer claims to lower cost facilities', savings: '+4.8%' },
              { id: 'ai', name: 'Sentinel AI Bill Review', desc: 'Real-time AI claim auditing', savings: '+3.7%' },
              { id: 'hybrid', name: 'Hybrid Care Navigation', desc: 'Virtual + in-network guidance', savings: '+2.9%' },
            ].map((addon) => (
              <div 
                key={addon.id}
                onClick={() => toggleAddon(addon.id)}
                className={`border rounded-3xl p-8 cursor-pointer transition-all hover:border-cyan-400 ${activeAddons.includes(addon.id) ? 'border-emerald-400 bg-emerald-950/30' : 'border-white/10 bg-slate-900/80'}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-xl">{addon.name}</h3>
                    <p className="text-slate-400 mt-2">{addon.desc}</p>
                  </div>
                  <div className={`text-sm font-medium px-4 py-1 rounded-full ${activeAddons.includes(addon.id) ? 'bg-emerald-400 text-black' : 'bg-white/10'}`}>
                    {addon.savings}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Network Utilization */}
        <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-8">
          <h2 className="text-2xl font-semibold mb-6">Network Utilization</h2>
          <div className="h-3 bg-white/10 rounded-full overflow-hidden mb-8">
            <div className="h-3 bg-gradient-to-r from-cyan-400 to-emerald-400 w-[87%] rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div><div className="text-3xl font-bold">87%</div><div className="text-sm text-slate-400">Priority PPO</div></div>
            <div><div className="text-3xl font-bold">64%</div><div className="text-sm text-slate-400">RBP Facilities</div></div>
            <div><div className="text-3xl font-bold">41%</div><div className="text-sm text-slate-400">Hybrid Care</div></div>
            <div><div className="text-3xl font-bold">12%</div><div className="text-sm text-slate-400">Out-of-Network</div></div>
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