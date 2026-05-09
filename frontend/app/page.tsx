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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white relative flex flex-col overflow-x-hidden">
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

          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            {isLoggedIn ? (
              <>
                <Link href="/dashboard" className="hover:text-cyan-400">Dashboard</Link>
                <Link href="/myplan" className="hover:text-cyan-400">My Plan</Link>
                <Link href="/settings" className="hover:text-cyan-400">Settings</Link>
                <Link href="/resources" className="hover:text-cyan-400">Resources</Link>
                <button onClick={handleLogout} className="text-red-400 hover:text-red-500 transition">Logout</button>
              </>
            ) : (
              <>
                <Link href="/about" className="hover:text-cyan-400">About</Link>
                <Link href="/success-stories" className="hover:text-cyan-400">Success Stories</Link>
                <Link href="/pricing" className="hover:text-cyan-400">Pricing</Link>
                <Link href="/resources" className="hover:text-cyan-400">Resources</Link>
                <Link href="/onboarding" className="hover:text-cyan-400">Get Started</Link>
              </>
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
              {isLoggedIn ? (
                <>
                  <Link href="/dashboard" className="py-2" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
                  <Link href="/myplan" className="py-2" onClick={() => setMobileMenuOpen(false)}>My Plan</Link>
                  <Link href="/settings" className="py-2" onClick={() => setMobileMenuOpen(false)}>Settings</Link>
                  <Link href="/resources" className="py-2" onClick={() => setMobileMenuOpen(false)}>Resources</Link>
                  <button onClick={handleLogout} className="text-red-400 py-2">Logout</button>
                </>
              ) : (
                <>
                  <Link href="/about" className="py-2" onClick={() => setMobileMenuOpen(false)}>About</Link>
                  <Link href="/success-stories" className="py-2" onClick={() => setMobileMenuOpen(false)}>Success Stories</Link>
                  <Link href="/pricing" className="py-2" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
                  <Link href="/resources" className="py-2" onClick={() => setMobileMenuOpen(false)}>Resources</Link>
                  <Link href="/onboarding" className="py-2" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
                </>
              )}
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

      {/* ZIP Checker - Mobile Fixed */}
      <div className="max-w-2xl mx-auto px-4 md:px-6 pb-20 w-full">
        <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-8 md:p-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Check Your Network Coverage</h2>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={zipCodes}
              onChange={(e) => setZipCodes(e.target.value)}
              placeholder="Enter ZIP code"
              className="flex-1 bg-black/50 border border-white/20 rounded-2xl px-6 py-5 text-lg focus:outline-none focus:border-cyan-400"
              maxLength={5}
            />
            <button
              onClick={checkNetwork}
              disabled={loading}
              className="bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold px-10 py-5 rounded-2xl disabled:opacity-70 whitespace-nowrap"
            >
              {loading ? 'Checking...' : 'Check Coverage'}
            </button>
          </div>

          {error && <p className="text-red-400 mt-4 text-center">{error}</p>}

          {result && (
            <div className="mt-10 bg-black/50 rounded-2xl p-8 text-center">
              <p className="text-emerald-400 text-sm font-medium">✅ {result.city}</p>
              <p className="text-6xl font-bold mt-4">{result.doctors}</p>
              <p className="text-xl">Priority PPO doctors found</p>
              <p className="mt-2 text-lg">Coverage Strength: <span className="text-emerald-400 font-semibold">{result.coverageStrength}</span></p>
            </div>
          )}
        </div>
      </div>

      {/* Savings Calculator */}
      <div className="max-w-2xl mx-auto px-4 md:px-6 pb-24 w-full">
        <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-8 md:p-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Estimate Your Annual Savings</h2>
          
          <div className="space-y-8">
            <div>
              <label className="block text-sm mb-3">Monthly Claims Volume ($)</label>
              <input
                type="number"
                value={claimsVolume}
                onChange={(e) => setClaimsVolume(e.target.value)}
                className="w-full bg-black/50 border border-white/20 rounded-2xl px-6 py-5 text-lg"
                placeholder="150000"
              />
            </div>

            <div>
              <label className="block text-sm mb-3">Expected Savings Rate: {savingsRate}%</label>
              <input
                type="range"
                min="5"
                max="18"
                step="0.5"
                value={savingsRate}
                onChange={(e) => setSavingsRate(parseFloat(e.target.value))}
                className="w-full accent-cyan-400"
              />
            </div>

            <button
              onClick={calculateSavings}
              disabled={calculating || !claimsVolume}
              className="w-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold py-5 rounded-3xl text-xl disabled:opacity-70"
            >
              {calculating ? 'Calculating...' : 'Calculate Projected Savings'}
            </button>

            {projectedSavings !== null && (
              <div className="text-center bg-emerald-900/30 border border-emerald-400/30 rounded-2xl p-8">
                <p className="text-emerald-400 text-sm">ESTIMATED ANNUAL SAVINGS</p>
                <p className="text-5xl font-bold mt-3">${projectedSavings.toLocaleString()}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* How It Works - Restored */}
      <div className="max-w-5xl mx-auto px-6 py-20 bg-black/40">
        <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-5xl mb-6">1️⃣</div>
            <h3 className="text-xl font-semibold mb-3">Check Coverage</h3>
            <p className="text-slate-400">Enter your ZIP codes and instantly see Priority PPO network strength.</p>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-6">2️⃣</div>
            <h3 className="text-xl font-semibold mb-3">Activate Instantly</h3>
            <p className="text-slate-400">One-click onboarding. No contracts. No implementation fees.</p>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-6">3️⃣</div>
            <h3 className="text-xl font-semibold mb-3">Start Saving</h3>
            <p className="text-slate-400">Real-time steering + savings dashboard. Money-back guarantee.</p>
          </div>
        </div>
      </div>

      {/* Schedule Demo Button - Only when NOT logged in */}
      {!isLoggedIn && (
        <button
          onClick={() => setShowDemoModal(true)}
          className="fixed bottom-8 right-8 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold px-8 py-4 rounded-3xl shadow-2xl flex items-center gap-3 z-50"
        >
          📅 Schedule a Demo
        </button>
      )}

      <footer className="border-t border-white/10 bg-black/60 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-400 text-sm">
          © {currentYear} Quantum SelfFlow • Powered by Quantum One Networks<br />
          Self-serve cost containment platform for self-insured employers and regional TPAs
        </div>
      </footer>
    </div>
  );
}