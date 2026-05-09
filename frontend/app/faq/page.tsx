'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const faqs = [
    {
      q: "What is Quantum SelfFlow?",
      a: "A self-serve platform that gives mid-market self-insured employers and TPAs instant access to the Priority PPO network, real-time ZIP-level network adequacy, and powerful cost containment tools."
    },
    {
      q: "How much can we save?",
      a: "Most clients see 8-15% reduction in medical spend in the first year through better steering and network utilization."
    },
    {
      q: "Do I need to change my TPA?",
      a: "No. Quantum SelfFlow works alongside your existing TPA. We can also provide white-label integration for TPAs."
    },
    {
      q: "Is there a minimum number of lives?",
      a: "We typically work with groups of 25+ lives, but smaller groups are welcome to start with a pilot."
    },
    {
      q: "How fast can we be live?",
      a: "Most clients are fully activated within 1-3 business days after onboarding."
    },
    {
      q: "What is Reference-Based Pricing?",
      a: "A cost-containment strategy where claims are reimbursed based on a multiple of Medicare rates instead of inflated billed charges."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
            <Link href="/onboarding" className="hover:text-cyan-400">Get Started</Link>
            <Link href="/faq" className="text-cyan-400 font-medium">FAQ</Link>
            <Link href="/settings" className="hover:text-cyan-400">Settings</Link>
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
              <Link href="/onboarding" className="hover:text-cyan-400 py-2" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
              <Link href="/faq" className="hover:text-cyan-400 py-2" onClick={() => setMobileMenuOpen(false)}>FAQ</Link>
              <Link href="/settings" className="hover:text-cyan-400 py-2" onClick={() => setMobileMenuOpen(false)}>Settings</Link>
            </div>
          </div>
        )}
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-20 flex-1">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-slate-400">Everything you need to know about Quantum SelfFlow</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-slate-900/80 border border-white/10 rounded-3xl overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-white/5 transition"
              >
                <span className="font-semibold text-lg">{faq.q}</span>
                <span className="text-2xl text-cyan-400">{openIndex === index ? '−' : '+'}</span>
              </button>
              {openIndex === index && (
                <div className="px-8 pb-8 text-slate-300 leading-relaxed border-t border-white/10">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-slate-400">Still have questions?</p>
          <Link href="/contact" className="inline-block mt-4 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold px-10 py-5 rounded-2xl text-lg">
            Contact Us
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