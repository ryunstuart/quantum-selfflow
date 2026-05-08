'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function MyPlan() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('selfflow_user');
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  const currentYear = new Date().getFullYear();

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

          <div className="flex items-center gap-4 md:gap-8 text-sm font-medium">
            <Link href="/" className="hover:text-cyan-400">Home</Link>
            <Link href="/dashboard" className="hover:text-cyan-400">Dashboard</Link>
            <Link href="/myplan" className="text-cyan-400 font-medium">My Plan</Link>
            <button 
              onClick={() => { localStorage.removeItem('selfflow_user'); window.location.href = '/'; }} 
              className="text-red-400 hover:text-red-500"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-12 flex-1">
        <h1 className="text-5xl font-bold tracking-tighter mb-2">My Plan</h1>
        <p className="text-slate-400 text-xl">Quantum SelfFlow • Priority PPO Network</p>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Plan Overview */}
          <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-10">
            <h3 className="text-2xl font-semibold mb-8">Plan Summary</h3>
            
            <div className="space-y-8">
              <div>
                <div className="text-slate-400 text-sm">Company</div>
                <div className="text-3xl font-semibold mt-1">{user?.companyName || "Your Company"}</div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-slate-400 text-sm">Lives Covered</div>
                  <div className="text-4xl font-bold mt-1">{user?.employeeCount || "—"}</div>
                </div>
                <div>
                  <div className="text-slate-400 text-sm">Plan Type</div>
                  <div className="text-2xl font-semibold mt-1">{user?.planType || "Self-Funded"}</div>
                </div>
              </div>

              <div>
                <div className="text-slate-400 text-sm">Activated On</div>
                <div className="text-xl">May 6, 2026</div>
              </div>
            </div>
          </div>

          {/* Network Strength */}
          <div className="bg-slate-900/80 border border-emerald-500/30 rounded-3xl p-10">
            <h3 className="text-2xl font-semibold mb-6">Network Strength</h3>
            <div className="text-7xl font-bold text-emerald-400">Excellent</div>
            <div className="text-emerald-400 mt-2">• 87% of your ZIP codes have strong coverage</div>
            
            <div className="mt-10 pt-8 border-t border-white/10">
              <div className="flex justify-between text-sm mb-4">
                <span>Priority PPO Doctors</span>
                <span className="font-semibold">2,847</span>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[87%] bg-emerald-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Active Add-ons */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold mb-8">Active Add-ons</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/80 border border-cyan-400/50 rounded-3xl p-8">
              <div className="text-5xl mb-4">🛡️</div>
              <div className="font-semibold">Sentinel AI</div>
              <div className="text-emerald-400 text-sm mt-1">ACTIVE • Real-time steering enabled</div>
            </div>

            <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-8 opacity-75">
              <div className="text-5xl mb-4">🏥</div>
              <div className="font-semibold">Hybrid Care</div>
              <div className="text-slate-400 text-sm mt-1">Not Active</div>
              <button className="mt-6 text-cyan-400 text-sm font-medium">Activate →</button>
            </div>

            <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-8 opacity-75">
              <div className="text-5xl mb-4">📈</div>
              <div className="font-semibold">Outcomes Network</div>
              <div className="text-slate-400 text-sm mt-1">Not Active</div>
              <button className="mt-6 text-cyan-400 text-sm font-medium">Activate →</button>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center text-slate-400 text-sm">
          Questions? Contact your Quantum SelfFlow success manager or email support@quantumselfflow.com
        </div>
      </div>

      {/* Auto Year Footer */}
      <footer className="border-t border-white/10 bg-black/60 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-400 text-sm">
          © {currentYear} Quantum SelfFlow • Powered by Quantum One Networks<br />
          Self-serve cost containment platform for self-insured employers and regional TPAs
        </div>
      </footer>
    </div>
  );
}