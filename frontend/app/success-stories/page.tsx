'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function SuccessStories() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  const stories = [
    {
      company: "Midwest Manufacturing",
      lives: "1,850",
      savings: "$487,000",
      quote: "We went live in 4 days and immediately saw strong network coverage in all our locations.",
      result: "14.2% medical trend reduction in first year"
    },
    {
      company: "Heartland TPA",
      lives: "Multiple Clients",
      savings: "White-label",
      quote: "SelfFlow has become one of our most requested value-add services for clients.",
      result: "Added 7 new self-insured groups in 90 days"
    },
    {
      company: "St. Louis Logistics",
      lives: "920",
      savings: "$218,000",
      quote: "The real-time ZIP checker helped us fix coverage gaps we didn't even know existed.",
      result: "11% savings in 6 months"
    }
  ];

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
            <Link href="/features" className="hover:text-cyan-400">Features</Link>
            <Link href="/success-stories" className="text-cyan-400 font-medium">Success Stories</Link>
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
              <Link href="/features" className="hover:text-cyan-400 py-2" onClick={() => setMobileMenuOpen(false)}>Features</Link>
              <Link href="/success-stories" className="hover:text-cyan-400 py-2" onClick={() => setMobileMenuOpen(false)}>Success Stories</Link>
              <Link href="/pricing" className="hover:text-cyan-400 py-2" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
              <Link href="/onboarding" className="hover:text-cyan-400 py-2" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
            </div>
          </div>
        )}
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-20 flex-1">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-6">Real Results. Real Companies.</h1>
          <p className="text-xl text-slate-400">See how organizations like yours are saving with Quantum SelfFlow</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {stories.map((story, i) => (
            <div key={i} className="bg-slate-900/80 border border-white/10 rounded-3xl p-10 hover:border-cyan-400/50 transition-all group">
              <div className="text-emerald-400 text-6xl mb-8">“</div>
              <p className="text-lg leading-relaxed mb-10 italic">"{story.quote}"</p>
              
              <div>
                <div className="font-semibold text-xl">{story.company}</div>
                <div className="text-slate-400 text-sm">{story.lives} lives</div>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="text-emerald-400 font-bold text-3xl">{story.savings}</div>
                <div className="text-sm text-slate-400">Saved in first year</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <Link 
            href="/onboarding"
            className="inline-block bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold px-12 py-6 rounded-3xl text-xl"
          >
            Join These Success Stories →
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