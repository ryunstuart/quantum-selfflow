'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Pricing() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const saved = localStorage.getItem('selfflow_user');
    if (saved) setIsLoggedIn(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('selfflow_user');
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white flex flex-col overflow-x-hidden">
      <nav className="border-b border-white/10 bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition">
            <div className="w-9 h-9 md:w-10 md:h-10 bg-cyan-400 rounded-2xl flex items-center justify-center text-slate-950 font-bold text-2xl md:text-3xl shadow-lg">Q</div>
            <div>
              <div className="font-bold text-2xl md:text-3xl tracking-tighter">Quantum SelfFlow</div>
              <div className="text-cyan-400 text-xs md:text-sm -mt-1">Self-serve savings. Zero complexity.</div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            {isLoggedIn ? (
              <>
                <Link href="/dashboard" className="hover:text-cyan-400">Dashboard</Link>
                <Link href="/myplan" className="hover:text-cyan-400">My Plan</Link>
                <Link href="/settings" className="hover:text-cyan-400">Settings</Link>
                <Link href="/resources" className="hover:text-cyan-400">Resources</Link>
                <button onClick={handleLogout} className="text-red-400 hover:text-red-500 transition">Logout</button>
              </>
            ) : (
              <>
                <Link href="/" className="hover:text-cyan-400">Home</Link>
                <Link href="/about" className="hover:text-cyan-400">About</Link>
                <Link href="/success-stories" className="hover:text-cyan-400">Success Stories</Link>
                <Link href="/pricing" className="text-cyan-400 font-medium">Pricing</Link>
                <Link href="/resources" className="hover:text-cyan-400">Resources</Link>
                <Link href="/onboarding" className="hover:text-cyan-400">Get Started</Link>
              </>
            )}
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
              {isLoggedIn ? (
                <>
                  <Link href="/dashboard" className="py-2" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
                  <Link href="/myplan" className="py-2" onClick={() => setMobileMenuOpen(false)}>My Plan</Link>
                  <Link href="/settings" className="py-2" onClick={() => setMobileMenuOpen(false)}>Settings</Link>
                  <Link href="/resources" className="py-2" onClick={() => setMobileMenuOpen(false)}>Resources</Link>
                  <button onClick={handleLogout} className="text-red-400 py-2">Logout</button>
                </>
              ) : (
                <>
                  <Link href="/" className="py-2" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                  <Link href="/about" className="py-2" onClick={() => setMobileMenuOpen(false)}>About</Link>
                  <Link href="/success-stories" className="py-2" onClick={() => setMobileMenuOpen(false)}>Success Stories</Link>
                  <Link href="/pricing" className="py-2" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
                  <Link href="/resources" className="py-2" onClick={() => setMobileMenuOpen(false)}>Resources</Link>
                  <Link href="/onboarding" className="py-2" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Rest of Pricing Content (unchanged) */}
      <div className="max-w-6xl mx-auto px-6 py-20 flex-1">
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tighter mb-6">Simple. Transparent. Volume-Based.</h1>
          <p className="text-2xl text-slate-400">No setup fees. No contracts. Only pay when you save.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-10 flex flex-col">
            <div className="text-emerald-400 text-sm font-medium tracking-widest mb-4">PILOT</div>
            <h3 className="text-3xl font-semibold mb-2">90-Day Pilot</h3>
            <p className="text-slate-400 mb-8">Test drive with zero risk</p>
            <div className="text-5xl font-bold mb-2">$0</div>
            <p className="text-slate-400 mb-10">Setup + first 90 days</p>
            <ul className="space-y-4 mb-12 flex-1">
              <li className="flex items-center gap-3">✅ Full Priority PPO Network</li>
              <li className="flex items-center gap-3">✅ Real-time ZIP Checker</li>
              <li className="flex items-center gap-3">✅ Basic Savings Dashboard</li>
              <li className="flex items-center gap-3">✅ Money-back guarantee</li>
            </ul>
            <Link href="/onboarding" className="block text-center border border-white/30 hover:bg-white/10 py-4 rounded-2xl font-medium transition">
              Start Free Pilot
            </Link>
          </div>

          <div className="bg-gradient-to-b from-cyan-400/10 to-transparent border-2 border-cyan-400 rounded-3xl p-10 flex flex-col relative scale-105 shadow-2xl">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-400 text-slate-950 text-xs font-bold px-6 py-1 rounded-full">MOST POPULAR</div>
            <div className="text-cyan-400 text-sm font-medium tracking-widest mb-4">STANDARD</div>
            <h3 className="text-3xl font-semibold mb-2">Self-Serve</h3>
            <p className="text-slate-400 mb-8">For employers 25–2,000 lives</p>
            <div className="text-5xl font-bold mb-1">2%</div>
            <p className="text-slate-400 mb-10">of actual savings</p>
            <ul className="space-y-4 mb-12 flex-1">
              <li className="flex items-center gap-3">✅ Everything in Pilot</li>
              <li className="flex items-center gap-3">✅ Full Dashboard + Reports</li>
              <li className="flex items-center gap-3">✅ Reference-Based Pricing</li>
              <li className="flex items-center gap-3">✅ AI Steering Rules</li>
              <li className="flex items-center gap-3">✅ Broker/TPA White-Label</li>
            </ul>
            <Link href="/onboarding" className="block text-center bg-cyan-400 hover:bg-cyan-300 text-slate-950 py-5 rounded-2xl font-semibold text-lg transition">
              Activate SelfFlow
            </Link>
          </div>

          <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-10 flex flex-col">
            <div className="text-slate-400 text-sm font-medium tracking-widest mb-4">ENTERPRISE</div>
            <h3 className="text-3xl font-semibold mb-2">TPA & Large Groups</h3>
            <p className="text-slate-400 mb-8">2,000+ lives or white-label</p>
            <div className="text-5xl font-bold mb-1">Custom</div>
            <p className="text-slate-400 mb-10">Volume + white-label pricing</p>
            <ul className="space-y-4 mb-12 flex-1">
              <li className="flex items-center gap-3">✅ Everything in Standard</li>
              <li className="flex items-center gap-3">✅ Dedicated account manager</li>
              <li className="flex items-center gap-3">✅ Custom integrations</li>
              <li className="flex items-center gap-3">✅ Multi-employer dashboards</li>
              <li className="flex items-center gap-3">✅ Revenue share for TPAs</li>
            </ul>
            <Link href="/contact" className="block text-center border border-white/30 hover:bg-white/10 py-4 rounded-2xl font-medium transition">
              Contact Sales
            </Link>
          </div>
        </div>

        <div className="text-center mt-16 text-slate-400 text-sm">
          All plans include real-time API access, 90-day money-back savings guarantee, and no long-term contracts.
        </div>
      </div>

      <footer className="border-t border-white/10 bg-black/60 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-400 text-sm">
          © {currentYear} Quantum SelfFlow • Powered by Quantum One Networks<br />
          Self-serve cost containment platform for self-insured employers and regional TPAs
        </div>
      </footer>
    </div>
  );
}