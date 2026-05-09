'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Brokers() {
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
            <Link href="/brokers" className="text-cyan-400 font-medium">For Brokers</Link>
            <Link href="/pricing" className="hover:text-cyan-400">Pricing</Link>
            <Link href="/onboarding" className="hover:text-cyan-400">Get Started</Link>
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
              <Link href="/brokers" className="hover:text-cyan-400 py-2" onClick={() => setMobileMenuOpen(false)}>For Brokers</Link>
              <Link href="/pricing" className="hover:text-cyan-400 py-2" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
              <Link href="/onboarding" className="hover:text-cyan-400 py-2" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
            </div>
          </div>
        )}
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-20 flex-1">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-6">For Benefits Brokers</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">Offer your clients a powerful, easy-to-use cost containment solution and earn recurring revenue.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-12">
            <div className="text-6xl mb-8">💰</div>
            <h3 className="text-3xl font-semibold mb-6">Earn Recurring Revenue</h3>
            <p className="text-slate-400 text-lg">Get paid a share of the savings your clients generate through Quantum SelfFlow — every month.</p>
          </div>

          <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-12">
            <div className="text-6xl mb-8">⚡</div>
            <h3 className="text-3xl font-semibold mb-6">Differentiate Your Practice</h3>
            <p className="text-slate-400 text-lg">Stand out by offering a modern, tech-forward solution that delivers measurable ROI.</p>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-12 text-center">
          <h2 className="text-4xl font-semibold mb-8">Ready to Partner?</h2>
          <p className="text-xl text-slate-400 mb-10 max-w-xl mx-auto">Join hundreds of brokers already using Quantum SelfFlow to deliver real value to their self-insured clients.</p>
          <Link 
            href="/contact"
            className="inline-block bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold px-12 py-6 rounded-3xl text-xl"
          >
            Become a Partner →
          </Link>
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