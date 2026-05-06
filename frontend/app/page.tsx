'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);

  const [zipCodes, setZipCodes] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const [claimsVolume, setClaimsVolume] = useState('');
  const [projectedSavings, setProjectedSavings] = useState<number | null>(null);

  const BACKEND_URL = "https://quantum-selfflow-nhtx.vercel.app";

  useEffect(() => {
    const saved = localStorage.getItem('selfflow_user');
    if (saved) {
      setIsLoggedIn(true);
      setUser(JSON.parse(saved));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('selfflow_user');
    setIsLoggedIn(false);
    setUser(null);
    window.location.reload();
  };

  const checkNetwork = async () => {
    if (!zipCodes) return;
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/zip-check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ zip_codes: zipCodes }),
      });
      const data = await response.json();
      setResult(data);
    } catch (e) {
      alert("Backend not responding. Make sure the backend is deployed and running.");
    }
    setLoading(false);
  };

  const calculateSavings = () => {
    if (!claimsVolume) return;
    const volume = parseInt(claimsVolume);
    setProjectedSavings(Math.round(volume * 0.105));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white">
      <nav className="border-b border-white/10 bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-400 rounded-2xl flex items-center justify-center text-slate-950 font-bold text-3xl shadow-lg">Q</div>
            <div>
              <div className="font-bold text-3xl tracking-tighter">Quantum SelfFlow</div>
              <div className="text-cyan-400 text-sm -mt-1">Self-serve savings. Zero complexity.</div>
            </div>
          </div>

          <div className="flex items-center gap-8 text-sm font-medium">
            <Link href="/" className="hover:text-cyan-400">Home</Link>
            <Link href="/onboarding" className="hover:text-cyan-400">Get Started</Link>
            {isLoggedIn && <Link href="/dashboard" className="hover:text-cyan-400">Dashboard</Link>}
            {isLoggedIn && <button onClick={logout} className="text-red-400 hover:text-red-500">Logout</button>}
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 pt-16 pb-20">
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tighter mb-6">
            Plug in.<br />Start Saving.
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Real-time Priority PPO network access + instant savings for self-insured employers and regional TPAs.
          </p>
        </div>

        {/* ZIP Checker */}
        <div className="bg-slate-900/90 border border-white/10 rounded-3xl p-10 mb-12">
          <h2 className="text-3xl font-semibold mb-8 text-center">Check Your Network Coverage</h2>
          <div className="flex gap-3 max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Enter ZIP codes (e.g. 63101, 63017)"
              className="flex-1 bg-slate-800 border border-white/20 rounded-2xl px-6 py-4 text-lg focus:outline-none focus:border-cyan-400"
              value={zipCodes}
              onChange={(e) => setZipCodes(e.target.value)}
            />
            <button
              onClick={checkNetwork}
              disabled={loading}
              className="bg-cyan-400 hover:bg-cyan-300 disabled:bg-slate-600 text-slate-950 font-semibold px-10 py-4 rounded-2xl text-lg transition"
            >
              {loading ? "Checking..." : "Check Coverage"}
            </button>
          </div>

          {result && (
            <div className="mt-10 bg-gradient-to-br from-green-900/70 to-emerald-900/70 border border-green-400/50 rounded-2xl p-10 text-center">
              <div className="text-5xl mb-4">✅</div>
              <div className="text-green-400 text-3xl font-semibold">Excellent Coverage</div>
              <div className="text-7xl font-bold text-green-400 my-4">{result.doctors}</div>
              <div className="text-slate-300 mb-8">Priority PPO doctors found</div>
              <button 
                onClick={() => window.location.href = "/onboarding"}
                className="w-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold py-5 rounded-2xl text-lg"
              >
                Activate Quantum SelfFlow →
              </button>
            </div>
          )}
        </div>

        {/* Savings Calculator */}
        <div className="bg-slate-900/90 border border-white/10 rounded-3xl p-10">
          <h2 className="text-3xl font-semibold mb-8 text-center">Estimate Your Potential Savings</h2>
          <div className="max-w-md mx-auto text-center">
            <input
              type="number"
              placeholder="Annual Medical Claims Volume ($)"
              value={claimsVolume}
              onChange={(e) => setClaimsVolume(e.target.value)}
              className="w-full bg-slate-800 border border-white/20 rounded-2xl px-6 py-4 text-lg mb-6 text-center"
            />
            <button 
              onClick={calculateSavings} 
              className="w-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold py-5 rounded-2xl text-lg"
            >
              Calculate My Savings
            </button>

            {projectedSavings && (
              <div className="mt-10 p-8 bg-green-900/40 border border-green-500/50 rounded-2xl">
                <div className="text-green-400 text-6xl font-bold">${projectedSavings.toLocaleString()}</div>
                <div className="text-slate-300 text-xl mt-2">Estimated Annual Savings</div>
                <div className="text-sm text-slate-400 mt-1">(~10.5% average reduction)</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}