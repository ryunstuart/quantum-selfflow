'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [zipCodes, setZipCodes] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [claimsVolume, setClaimsVolume] = useState('');
  const [projectedSavings, setProjectedSavings] = useState<number | null>(null);
  const [savingsRate, setSavingsRate] = useState(10.5);
  const [calculating, setCalculating] = useState(false);

  const BACKEND_URL = "https://quantum-selfflow-nhtx.vercel.app";

  useEffect(() => {
    const saved = localStorage.getItem('selfflow_user');
    if (saved) setIsLoggedIn(true);
  }, []);

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
      setError("Please enter a valid 5-digit ZIP code (e.g. 63101)");
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
        city: city,
        coverageStrength: backendData.doctors > 100 ? 'Excellent' : backendData.doctors > 50 ? 'Strong' : 'Good'
      });
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
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white">
      <nav className="border-b border-white/10 bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition">
            <div className="w-9 h-9 md:w-10 md:h-10 bg-cyan-400 rounded-2xl flex items-center justify-center text-slate-950 font-bold text-2xl md:text-3xl shadow-lg">Q</div>
            <div>
              <div className="font-bold text-2xl md:text-3xl tracking-tighter">Quantum SelfFlow</div>
              <div className="text-cyan-400 text-xs md:text-sm -mt-1">Self-serve savings. Zero complexity.</div>
            </div>
          </Link>

          <div className="flex items-center gap-4 md:gap-8 text-sm font-medium">
            <Link href="/" className="hover:text-cyan-400">Home</Link>
            {!isLoggedIn && <Link href="/onboarding" className="hover:text-cyan-400">Get Started</Link>}
            {isLoggedIn && <Link href="/dashboard" className="hover:text-cyan-400">Dashboard</Link>}
            {isLoggedIn && <button onClick={() => { localStorage.removeItem('selfflow_user'); window.location.reload(); }} className="text-red-400">Logout</button>}
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 md:px-6 pt-12 md:pt-20 pb-24">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">Plug in.<br />Start Saving.</h1>
          <p className="text-lg md:text-xl text-slate-300">Real-time Priority PPO network + instant savings</p>
        </div>

        {/* ZIP Checker */}
        <div className="bg-slate-900/90 border border-white/10 rounded-3xl p-8 md:p-12 mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-10">Check Your Network Coverage</h2>
          <div className="max-w-xl mx-auto">
            <div className="flex flex-col md:flex-row gap-3">
              <input
                type="text"
                placeholder="Enter ZIP code (e.g. 63101)"
                className="flex-1 bg-slate-800 border border-white/20 rounded-2xl px-6 py-5 text-lg focus:outline-none focus:border-cyan-400"
                value={zipCodes}
                onChange={(e) => { setZipCodes(e.target.value); setError(''); }}
                maxLength={5}
              />
              <button
                onClick={checkNetwork}
                disabled={loading || !zipCodes}
                className="bg-cyan-400 hover:bg-cyan-300 disabled:bg-slate-600 text-slate-950 font-semibold px-8 md:px-12 py-5 rounded-2xl text-lg transition whitespace-nowrap flex items-center justify-center min-w-[140px]"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin">⟳</span> Checking...
                  </span>
                ) : "Check Coverage"}
              </button>
            </div>

            {error && <p className="text-red-400 text-center mt-4 font-medium">{error}</p>}

            {result && (
              <div className="mt-12 bg-gradient-to-br from-green-900/70 to-emerald-900/70 border border-green-400/50 rounded-3xl p-10 md:p-12 text-center animate-fade-in">
                <div className="text-6xl mb-4">✅</div>
                <div className="text-3xl font-semibold text-green-400">{result.city}</div>
                <div className="text-7xl font-bold text-green-400 my-6">{result.doctors}</div>
                <div className="text-2xl text-slate-200">Priority PPO doctors found</div>
                <div className="mt-8 inline-block bg-green-400/20 text-green-400 px-6 py-2 rounded-full text-sm">
                  Coverage Strength: <span className="font-semibold">{result.coverageStrength}</span>
                </div>

                <button 
                  onClick={() => window.location.href = "/onboarding"}
                  className="w-full mt-12 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold py-6 rounded-2xl text-xl transition"
                >
                  Activate Quantum SelfFlow →
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Savings Calculator */}
        <div className="bg-slate-900/90 border border-white/10 rounded-3xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-10">Estimate Your Potential Savings</h2>
          <div className="max-w-md mx-auto">
            <div className="mb-8">
              <label className="block text-sm text-slate-400 mb-2">Annual Medical Claims Volume</label>
              <div className="relative">
                <span className="absolute left-6 top-5 text-slate-400">$</span>
                <input
                  type="number"
                  placeholder="1250000"
                  className="w-full bg-slate-800 border border-white/20 rounded-2xl pl-10 pr-6 py-5 text-2xl focus:outline-none focus:border-cyan-400"
                  value={claimsVolume}
                  onChange={(e) => setClaimsVolume(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-10">
              <label className="block text-sm text-slate-400 mb-3">Expected Savings Rate: <span className="text-cyan-400">{savingsRate}%</span></label>
              <input
                type="range"
                min="6" max="15" step="0.5"
                value={savingsRate}
                onChange={(e) => setSavingsRate(parseFloat(e.target.value))}
                className="w-full accent-cyan-400"
              />
            </div>

            <button 
              onClick={calculateSavings}
              disabled={calculating}
              className="w-full bg-cyan-400 hover:bg-cyan-300 disabled:bg-slate-600 text-slate-950 font-semibold py-5 rounded-2xl text-lg transition flex items-center justify-center"
            >
              {calculating ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin">⟳</span> Calculating...
                </span>
              ) : "Calculate My Savings"}
            </button>

            {projectedSavings && (
              <div className="mt-12 p-10 bg-gradient-to-br from-emerald-900/50 to-green-900/50 border border-emerald-400/30 rounded-3xl text-center animate-fade-in">
                <div className="text-emerald-400 text-6xl font-bold">${projectedSavings.toLocaleString()}</div>
                <div className="text-2xl text-slate-300 mt-3">Estimated Annual Savings</div>
                <div className="text-emerald-400">at {savingsRate}% average reduction</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}