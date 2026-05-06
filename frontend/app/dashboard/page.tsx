'use client';

import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white">
      <nav className="border-b border-white/10 bg-black/70 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-400 rounded-2xl flex items-center justify-center text-slate-950 font-bold text-3xl">Q</div>
            <div className="font-bold text-3xl tracking-tighter">Quantum SelfFlow</div>
          </div>
          <div className="flex items-center gap-8 text-sm font-medium">
            <Link href="/" className="hover:text-cyan-400">Home</Link>
            <Link href="/onboarding" className="hover:text-cyan-400">Onboarding</Link>
            <span className="text-cyan-400">Dashboard</span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-10">
          <h1 className="text-4xl font-bold">Welcome back!</h1>
          <p className="text-slate-400 text-lg">Your Quantum SelfFlow is now active</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-900 rounded-3xl p-8 border border-green-500/30">
            <div className="text-green-400 text-sm">MONTHLY SAVINGS</div>
            <div className="text-5xl font-bold text-green-400 mt-4">$248,700</div>
            <div className="text-sm text-green-400 mt-2">↑ 11.4% trend reduction</div>
          </div>

          <div className="bg-slate-900 rounded-3xl p-8">
            <div className="text-slate-400 text-sm">CLAIMS PROCESSED</div>
            <div className="text-5xl font-bold mt-4">2,847</div>
            <div className="text-sm text-slate-400 mt-2">This month</div>
          </div>

          <div className="bg-slate-900 rounded-3xl p-8">
            <div className="text-slate-400 text-sm">NETWORK UTILIZATION</div>
            <div className="text-5xl font-bold mt-4">87%</div>
            <div className="text-sm text-slate-400 mt-2">Steered to Priority PPO</div>
          </div>
        </div>

        <div className="bg-slate-900 rounded-3xl p-8">
          <h2 className="text-2xl font-semibold mb-6">Recent Activity</h2>
          <p className="text-slate-400">Real-time claim savings and network reports will appear here once live data is connected.</p>
          <p className="text-cyan-400 mt-6 text-sm">✅ Your plan is now connected and routing claims.</p>
        </div>
      </div>
    </div>
  );
}