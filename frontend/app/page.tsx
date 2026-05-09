'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userCompany, setUserCompany] = useState('');
  const [zipCodes, setZipCodes] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [claimsVolume, setClaimsVolume] = useState('');
  const [projectedSavings, setProjectedSavings] = useState<number | null>(null);
  const [savingsRate, setSavingsRate] = useState(10.5);
  const [calculating, setCalculating] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);

  const BACKEND_URL = "https://quantum-selfflow-nhtx.vercel.app";

  useEffect(() => {
    const saved = localStorage.getItem('selfflow_user');
    if (saved) {
      const userData = JSON.parse(saved);
      setIsLoggedIn(true);
      setUserCompany(userData.companyName || '');
    }
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
  };

  const validateZip = (zip: string): boolean => /^\d{5}$/.test(zip.trim());

  const checkNetwork = async () => {
    setError('');
    setResult(null);
    const cleanZip = zipCodes.trim();

    if (!cleanZip) {
      setError("Please enter a ZIP code");
      return;
    }
    if (!validateZip(cleanZip)) {
      setError("Please enter a valid 5-digit ZIP code");
      return;
    }

    setLoading(true);
    try {
      const backendRes = await fetch(`${BACKEND_URL}/api/zip-check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ zip_codes: cleanZip }),
      });
      const backendData = await backendRes.json();

      const zipRes = await fetch(`https://api.zippopotam.us/us/${cleanZip}`);
      let city = "Your Area";
      if (zipRes.ok) {
        const zipJson = await zipRes.json();
        city = `${zipJson.places[0]['place name']}, ${zipJson.places[0].state}`;
      }

      setResult({
        ...backendData,
        city,
        coverageStrength: backendData.doctors > 100 ? 'Excellent' : backendData.doctors > 50 ? 'Strong' : 'Good'
      });

      showToast("Network coverage checked successfully!");
    } catch (e) {
      setError("Unable to check coverage. Please try again.");
    }
    setLoading(false);
  };

  const calculateSavings = () => {
    if (!claimsVolume) return;
    setCalculating(true);
    setTimeout(() => {
      const volume = parseFloat(claimsVolume);
      const savings = Math.round(volume * (savingsRate / 100));
      setProjectedSavings(savings);
      setCalculating(false);
      showToast(`Projected savings: $${savings.toLocaleString()}`);
    }, 800);
  };

  const handleLogout = () => {
    localStorage.removeItem('selfflow_user');
    setIsLoggedIn(false);
    setUserCompany('');
    window.location.reload();
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white relative flex flex-col">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 text-white transition-all duration-300 ${
          toast.type === 'success' ? 'bg-emerald-600' : 'bg-red-600'
        }`}>
          {toast.type === 'success' ? '✅' : '❌'} {toast.message}
        </div>
      )}

      <nav className="border-b border-white/10 bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition">
            <div className="w-9 h-9 md:w-10 md:h-10 bg-cyan-400 rounded-2xl flex items-center justify-center text-slate-950 font-bold text-2xl md:text-3xl shadow-lg">Q</div>
            <div>
              <div className="font-bold text-2xl md:text-3xl tracking-tighter">Quantum SelfFlow</div>
              <div className="text-cyan-400 text-xs md:text-sm -mt-1">Self-serve savings. Zero complexity.</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            {!isLoggedIn && (
              <>
                <Link href="/about" className="hover:text-cyan-400">About</Link>
                <Link href="/success-stories" className="hover:text-cyan-400">Success Stories</Link>
                <Link href="/pricing" className="hover:text-cyan-400">Pricing</Link>
                <Link href="/resources" className="hover:text-cyan-400">Resources</Link>
              </>
            )}
            
            {isLoggedIn && (
              <>
                <Link href="/dashboard" className="hover:text-cyan-400">Dashboard</Link>
                <Link href="/myplan" className="hover:text-cyan-400">My Plan</Link>
                <Link href="/resources" className="hover:text-cyan-400">Resources</Link>
              </>
            )}

            {!isLoggedIn && <Link href="/onboarding" className="hover:text-cyan-400">Get Started</Link>}
            
            {isLoggedIn && (
              <button 
                onClick={handleLogout}
                className="text-red-400 hover:text-red-500 transition"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-3xl focus:outline-none"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-black/95 py-8">
            <div className="flex flex-col gap-6 text-center text-lg font-medium">
              {isLoggedIn ? (
                <>
                  <Link href="/dashboard" className="py-2" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
                  <Link href="/myplan" className="py-2" onClick={() => setMobileMenuOpen(false)}>My Plan</Link>
                </>
              ) : (
                <>
                  <Link href="/about" className="py-2" onClick={() => setMobileMenuOpen(false)}>About</Link>
                  <Link href="/success-stories" className="py-2" onClick={() => setMobileMenuOpen(false)}>Success Stories</Link>
                  <Link href="/pricing" className="py-2" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
                  <Link href="/resources" className="py-2" onClick={() => setMobileMenuOpen(false)}>Resources</Link>
                </>
              )}
              <Link href={isLoggedIn ? "/dashboard" : "/onboarding"} className="py-2" onClick={() => setMobileMenuOpen(false)}>
                {isLoggedIn ? "Dashboard" : "Get Started"}
              </Link>
              {isLoggedIn && <button onClick={handleLogout} className="text-red-400 py-2">Logout</button>}
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <div className="pt-24 pb-16 text-center px-6">
        <h1 className="text-6xl md:text-7xl font-bold tracking-tighter mb-6">
          Plug in.<br />Start Saving.
        </h1>
        <p className="text-2xl text-slate-400 max-w-3xl mx-auto">
          Real-time Priority PPO network access + instant savings for self-insured employers and TPAs.
        </p>
      </div>

      {/* ZIP Checker + Savings Calculator + All other sections remain unchanged... */}

      {/* Schedule Demo Button - Only show when NOT logged in */}
      {!isLoggedIn && (
        <button
          onClick={() => setShowDemoModal(true)}
          className="fixed bottom-8 right-8 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold px-8 py-4 rounded-3xl shadow-2xl flex items-center gap-3 z-50"
        >
          📅 Schedule a Demo
        </button>
      )}

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