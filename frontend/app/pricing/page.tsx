'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Pricing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="hover:text-cyan-400">Home</Link>
            <Link href="/pricing" className="text-cyan-400 font-medium">Pricing</Link>
            <Link href="/onboarding" className="hover:text-cyan-400">Get Started</Link>
            <Link href="/faq" className="hover:text-cyan-400">FAQ</Link>
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
              <Link href="/" className="hover:text-cyan-400 py-2" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link href="/pricing" className="hover:text-cyan-400 py-2" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
              <Link href="/onboarding" className="hover:text-cyan-400 py-2" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
              <Link href="/faq" className="hover:text-cyan-400 py-2" onClick={() => setMobileMenuOpen(false)}>FAQ</Link>
            </div>
          </div>
        )}
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-20 flex-1">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-6">Simple, Transparent Pricing</h1>
          <p className="text-xl text-slate-400">No hidden fees. No long contracts. Pay only for what you save.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Starter */}
          <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-10">
            <div className="text-cyan-400 font-medium mb-2">STARTER</div>
            <div className="text-5xl font-bold mb-8">$0<span className="text-base font-normal text-slate-400">/month</span></div>
            <ul className="space-y-4 mb-12 text-slate-300">
              <li>✓ Basic Priority PPO access</li>
              <li>✓ ZIP coverage checker</li>
              <li>✓ Savings dashboard</li>
              <li>✓ Up to 100 lives</li>
            </ul>
            <Link href="/onboarding" className="block text-center bg-white/10 hover:bg-white/20 py-5 rounded-2xl font-semibold">Get Started Free</Link>
          </div>

          {/* Growth (Recommended) */}
          <div className="bg-gradient-to-b from-cyan-500/10 to-transparent border-2 border-cyan-400 rounded-3xl p-10 relative -mt-4 md:-mt-6">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-400 text-slate-950 text-sm font-bold px-6 py-1 rounded-full">MOST POPULAR</div>
            <div className="text-cyan-400 font-medium mb-2">GROWTH</div>
            <div className="text-5xl font-bold mb-8">2% <span className="text-base font-normal text-slate-400">of savings</span></div>
            <ul className="space-y-4 mb-12 text-slate-300">
              <li>✓ Everything in Starter</li>
              <li>✓ Full Priority PPO network</li>
              <li>✓ Sentinel AI steering</li>
              <li>✓ Unlimited lives</li>
              <li>✓ White-label TPA option</li>
            </ul>
            <Link href="/onboarding" className="block text-center bg-cyan-400 hover:bg-cyan-300 text-slate-950 py-5 rounded-2xl font-semibold">Start Saving Now</Link>
          </div>

          {/* Enterprise */}
          <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-10">
            <div className="text-cyan-400 font-medium mb-2">ENTERPRISE</div>
            <div className="text-5xl font-bold mb-8">Custom</div>
            <ul className="space-y-4 mb-12 text-slate-300">
              <li>✓ Everything in Growth</li>
              <li>✓ Dedicated success manager</li>
              <li>✓ Custom integrations</li>
              <li>✓ Hybrid + Outcomes add-ons</li>
              <li>✓ SLA guarantees</li>
            </ul>
            <Link href="/contact" className="block text-center bg-white/10 hover:bg-white/20 py-5 rounded-2xl font-semibold">Contact Sales</Link>
          </div>
        </div>

        <div className="text-center mt-16 text-slate-400">
          You only pay when you save. No savings = No fee.
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