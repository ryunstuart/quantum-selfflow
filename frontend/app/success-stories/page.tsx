'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function SuccessStories() {
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

  const stories = [
    {
      company: "Midwest Manufacturing",
      lives: "1,850 employees",
      savings: "14.2% in first 6 months",
      quote: "The ZIP checker showed us we had major gaps in 7 states. Quantum SelfFlow filled them instantly and delivered real steering. Best decision we've made in years.",
      name: "Sarah Mitchell",
      title: "Director of Benefits"
    },
    {
      company: "Heartland TPA",
      lives: "12 client groups",
      savings: "Added $380K in new revenue",
      quote: "We white-labeled Quantum SelfFlow for our clients. It's become one of our highest-margin services with almost zero additional work.",
      name: "David Chen",
      title: "CEO"
    },
    {
      company: "St. Louis Logistics",
      lives: "920 employees",
      savings: "11.8% YTD",
      quote: "We were skeptical about self-serve, but the onboarding took 4 days and we started seeing savings in week 3. The dashboard is actually useful.",
      name: "Rachel Thompson",
      title: "HR Manager"
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

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="hover:text-cyan-400">Home</Link>
            <Link href="/about" className="hover:text-cyan-400">About</Link>
            <Link href="/success-stories" className="text-cyan-400 font-medium">Success Stories</Link>
            <Link href="/pricing" className="hover:text-cyan-400">Pricing</Link>
            <Link href="/resources" className="hover:text-cyan-400">Resources</Link>
            
            {!isLoggedIn && <Link href="/onboarding" className="hover:text-cyan-400">Get Started</Link>}
            {isLoggedIn && <Link href="/dashboard" className="hover:text-cyan-400">Dashboard</Link>}
            
            {isLoggedIn && (
              <button onClick={handleLogout} className="text-red-400 hover:text-red-500 transition">
                Logout
              </button>
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
              <Link href={isLoggedIn ? "/dashboard" : "/onboarding"} className="py-2" onClick={() => setMobileMenuOpen(false)}>
                {isLoggedIn ? "Dashboard" : "Get Started"}
              </Link>
              {isLoggedIn && <button onClick={handleLogout} className="text-red-400 py-2">Logout</button>}
            </div>
          </div>
        )}
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-20 flex-1">
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tighter mb-6">Real Results. Real Companies.</h1>
          <p className="text-2xl text-slate-400">See how self-insured employers and TPAs are using Quantum SelfFlow to reduce costs without complexity.</p>
        </div>

        <div className="space-y-16">
          {stories.map((story, index) => (
            <div key={index} className="bg-slate-900/80 border border-white/10 rounded-3xl p-12 md:p-16">
              <div className="flex flex-col md:flex-row gap-12 items-start">
                <div className="flex-1">
                  <div className="text-6xl text-amber-400 mb-8">“</div>
                  <p className="text-2xl md:text-3xl leading-relaxed italic text-slate-200">
                    {story.quote}
                  </p>
                  <div className="mt-10">
                    <div className="font-semibold text-xl">{story.name}</div>
                    <div className="text-slate-400">{story.title}, {story.company}</div>
                  </div>
                </div>

                <div className="md:w-80 bg-black/50 rounded-2xl p-8 shrink-0">
                  <div className="text-emerald-400 text-sm mb-2">ANNUAL MEDICAL SPEND</div>
                  <div className="text-4xl font-bold mb-6">{story.savings}</div>
                  
                  <div className="text-emerald-400 text-sm mb-2">LIVES COVERED</div>
                  <div className="text-3xl font-medium">{story.lives}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <Link 
            href="/onboarding"
            className="inline-block bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold px-14 py-7 rounded-3xl text-xl transition"
          >
            Start Seeing Your Own Results →
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/60 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-400 text-sm">
          © {currentYear} Quantum SelfFlow • Powered by Quantum One Networks<br />
          Self-serve cost containment platform for self-insured employers and regional TPAs
        </div>
      </footer>
    </div>
  );
}