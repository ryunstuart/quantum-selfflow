'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function About() {
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
            <Link href="/about" className="text-cyan-400 font-medium">About</Link>
            <Link href="/features" className="hover:text-cyan-400">Features</Link>
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
              <Link href="/about" className="hover:text-cyan-400 py-2" onClick={() => setMobileMenuOpen(false)}>About</Link>
              <Link href="/features" className="hover:text-cyan-400 py-2" onClick={() => setMobileMenuOpen(false)}>Features</Link>
              <Link href="/pricing" className="hover:text-cyan-400 py-2" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
              <Link href="/onboarding" className="hover:text-cyan-400 py-2" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
            </div>
          </div>
        )}
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-20 flex-1">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-6">About Quantum SelfFlow</h1>
          <p className="text-xl text-slate-400">Built for self-insured employers and regional TPAs who want better outcomes with less complexity.</p>
        </div>

        <div className="prose prose-invert max-w-none text-lg leading-relaxed space-y-8">
          <p className="text-slate-300">
            Quantum SelfFlow was created to solve a real problem: self-insured employers and smaller TPAs struggle with high medical trends, fragmented networks, and complex technology.
          </p>
          <p className="text-slate-300">
            We combined a powerful Priority PPO network with real-time ZIP-level intelligence and a dead-simple self-serve platform so you can start saving immediately — without long implementation timelines or heavy IT involvement.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mt-20">
          <div>
            <h3 className="text-2xl font-semibold mb-6">Our Mission</h3>
            <p className="text-slate-400">
              Make high-quality healthcare more affordable and accessible by giving self-insured groups the tools and network they need to control costs without sacrificing care.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-6">Why We Exist</h3>
            <p className="text-slate-400">
              Medical costs continue to rise 8-12% annually. Traditional solutions are too slow and complicated. We built a platform that delivers results in days, not months.
            </p>
          </div>
        </div>

        <div className="mt-20 text-center">
          <Link 
            href="/onboarding"
            className="inline-block bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold px-12 py-6 rounded-3xl text-xl"
          >
            Start Saving Today →
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