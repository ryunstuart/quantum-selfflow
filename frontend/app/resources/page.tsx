'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Resources() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const saved = localStorage.getItem('selfflow_user');
    if (saved) setIsLoggedIn(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('selfflow_user');
    window.location.reload();
  };

  const faqs = [
    { q: "What is Quantum SelfFlow?", a: "A self-serve platform giving mid-market self-insured employers instant access to Priority PPO network, real-time ZIP checking, and powerful cost containment tools." },
    { q: "How much can we save?", a: "Most clients see 8-15% reduction in medical spend in the first year." },
    { q: "Do I need to change my TPA?", a: "No. We work alongside your existing TPA with optional white-label integration." },
    { q: "How fast can we go live?", a: "Most clients are fully activated within 1-3 business days." },
    { q: "Is there a long-term contract?", a: "No. You can cancel anytime. We only earn when you save." },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white flex flex-col overflow-x-hidden">
      <nav className="border-b border-white/10 bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition">
            <div className="w-9 h-9 bg-cyan-400 rounded-2xl flex items-center justify-center text-slate-950 font-bold text-2xl shadow-lg">Q</div>
            <div>
              <div className="font-bold text-2xl tracking-tighter">Quantum SelfFlow</div>
              <div className="text-cyan-400 text-xs -mt-1">Self-serve savings. Zero complexity.</div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="hover:text-cyan-400">Home</Link>
            <Link href="/about" className="hover:text-cyan-400">About</Link>
            <Link href="/success-stories" className="hover:text-cyan-400">Success Stories</Link>
            <Link href="/pricing" className="hover:text-cyan-400">Pricing</Link>
            <Link href="/resources" className="text-cyan-400 font-medium">Resources</Link>
            
            {isLoggedIn && <Link href="/dashboard" className="hover:text-cyan-400">Dashboard</Link>}
            {isLoggedIn && <Link href="/settings" className="hover:text-cyan-400">Settings</Link>}
            
            {isLoggedIn && (
              <button onClick={handleLogout} className="text-red-400 hover:text-red-500 transition">Logout</button>
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
              <Link href="/" className="py-2" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link href="/about" className="py-2" onClick={() => setMobileMenuOpen(false)}>About</Link>
              <Link href="/success-stories" className="py-2" onClick={() => setMobileMenuOpen(false)}>Success Stories</Link>
              <Link href="/pricing" className="py-2" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
              <Link href="/resources" className="py-2" onClick={() => setMobileMenuOpen(false)}>Resources</Link>
              {isLoggedIn && <Link href="/dashboard" className="py-2" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>}
              {isLoggedIn && <Link href="/settings" className="py-2" onClick={() => setMobileMenuOpen(false)}>Settings</Link>}
              {isLoggedIn && <button onClick={handleLogout} className="text-red-400 py-2">Logout</button>}
            </div>
          </div>
        )}
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-20 flex-1">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-6">Resources & Knowledge</h1>
          <p className="text-xl text-slate-400">Guides, FAQs, and insights to help you maximize savings.</p>
        </div>

        {/* FAQ Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-semibold mb-10 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-slate-900/80 border border-white/10 rounded-3xl overflow-hidden">
                <button
                  onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                  className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-white/5 transition"
                >
                  <span className="font-medium pr-8">{faq.q}</span>
                  <span className="text-2xl text-cyan-400">{openFAQ === i ? '−' : '+'}</span>
                </button>
                {openFAQ === i && (
                  <div className="px-8 pb-8 text-slate-300 border-t border-white/10 pt-6">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Guides */}
        <div>
          <h2 className="text-3xl font-semibold mb-10 text-center">Helpful Guides</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-10 hover:border-cyan-400/50 transition">
              <h3 className="font-semibold text-xl mb-3">The Self-Insured Playbook 2026</h3>
              <p className="text-slate-400 mb-6">Key strategies for controlling medical costs in today's environment.</p>
              <Link href="#" className="text-cyan-400 hover:underline">Download PDF →</Link>
            </div>
            <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-10 hover:border-cyan-400/50 transition">
              <h3 className="font-semibold text-xl mb-3">Reference-Based Pricing Guide</h3>
              <p className="text-slate-400 mb-6">Everything employers need to know about RBP + network steering.</p>
              <Link href="#" className="text-cyan-400 hover:underline">Read Guide →</Link>
            </div>
          </div>
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