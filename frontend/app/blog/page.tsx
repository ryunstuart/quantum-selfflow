'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Blog() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  const posts = [
    {
      title: "Why Reference-Based Pricing is Exploding in 2026",
      date: "May 1, 2026",
      excerpt: "How forward-thinking employers are using RBP + Priority PPO to slash costs while maintaining access.",
      category: "Strategy"
    },
    {
      title: "The Real Cost of Medical Trend – And How to Beat It",
      date: "April 22, 2026",
      excerpt: "Breaking down the latest trend numbers and what self-insured groups can actually do about them.",
      category: "Data"
    },
    {
      title: "TPA White-Label: A New Revenue Stream for Brokers & TPAs",
      date: "April 15, 2026",
      excerpt: "How regional TPAs and brokers are adding Quantum SelfFlow as a high-margin service.",
      category: "Partners"
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
            <Link href="/blog" className="text-cyan-400 font-medium">Blog</Link>
            <Link href="/resources" className="hover:text-cyan-400">Resources</Link>
            <Link href="/faq" className="hover:text-cyan-400">FAQ</Link>
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
              <Link href="/blog" className="hover:text-cyan-400 py-2" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
              <Link href="/resources" className="hover:text-cyan-400 py-2" onClick={() => setMobileMenuOpen(false)}>Resources</Link>
              <Link href="/faq" className="hover:text-cyan-400 py-2" onClick={() => setMobileMenuOpen(false)}>FAQ</Link>
              <Link href="/onboarding" className="hover:text-cyan-400 py-2" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
            </div>
          </div>
        )}
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-20 flex-1">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-6">Blog & Insights</h1>
          <p className="text-xl text-slate-400">Latest thinking on self-funding, cost containment, and healthcare strategy</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {posts.map((post, i) => (
            <div key={i} className="bg-slate-900/80 border border-white/10 rounded-3xl p-10 hover:border-cyan-400/50 transition group">
              <div className="text-xs uppercase tracking-widest text-cyan-400 mb-4">{post.category}</div>
              <h3 className="text-2xl font-semibold mb-4 group-hover:text-cyan-400 transition">{post.title}</h3>
              <p className="text-slate-400 mb-8 line-clamp-3">{post.excerpt}</p>
              <div className="text-sm text-slate-500">{post.date}</div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center text-slate-400">
          More articles coming soon. Want to contribute? <Link href="/contact" className="text-cyan-400 hover:underline">Reach out</Link>.
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