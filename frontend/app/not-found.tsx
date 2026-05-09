'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function NotFound() {
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
            <div className="w-9 h-9 bg-cyan-400 rounded-2xl flex items-center justify-center text-slate-950 font-bold text-2xl shadow-lg">Q</div>
            <div>
              <div className="font-bold text-2xl tracking-tighter">Quantum SelfFlow</div>
              <div className="text-cyan-400 text-xs -mt-1">Self-serve savings. Zero complexity.</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="hover:text-cyan-400">Home</Link>
            <Link href="/about" className="hover:text-cyan-400">About</Link>
            <Link href="/success-stories" className="hover:text-cyan-400">Success Stories</Link>
            <Link href="/pricing" className="hover:text-cyan-400">Pricing</Link>
            <Link href="/resources" className="hover:text-cyan-400">Resources</Link>
            
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

      <div className="flex-1 flex items-center justify-center px-6 text-center py-20">
        <div>
          <div className="text-[120px] md:text-[160px] leading-none mb-8">404</div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-6">Page Not Found</h1>
          <p className="text-xl text-slate-400 max-w-md mx-auto mb-12">
            The page you're looking for doesn't exist or may have been moved.
          </p>
          
          <Link 
            href="/"
            className="inline-block bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold px-12 py-6 rounded-3xl text-xl transition"
          >
            ← Return to Home
          </Link>
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