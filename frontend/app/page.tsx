'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [zipCodes, setZipCodes] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const BACKEND_URL = "https://quantum-selfflow-nhtx.vercel.app";

  useEffect(() => {
    const saved = localStorage.getItem('selfflow_user');
    if (saved) setIsLoggedIn(true);
  }, []);

  const validateZip = (zip: string): boolean => {
    return /^\d{5}$/.test(zip.trim());
  };

  const checkNetwork = async () => {
    setError('');
    setResult(null);   // Clear previous results
    const cleanZip = zipCodes.trim();

    if (!cleanZip) {
      setError("Please enter a ZIP code");
      return;
    }

    if (!validateZip(cleanZip)) {
      setError("Please enter a valid 5-digit U.S. ZIP code (example: 63101)");
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
      setError("Unable to check coverage. Please try again later.");
    }
    setLoading(false);
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
            {!isLoggedIn && <Link href="/onboarding" className="hover:text-cyan-400">Get Started</Link>}
            {isLoggedIn && <Link href="/dashboard" className="hover:text-cyan-400">Dashboard</Link>}
            {isLoggedIn && <button onClick={() => { localStorage.removeItem('selfflow_user'); window.location.reload(); }} className="text-red-400">Logout</button>}
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 pt-20 pb-24">
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tighter mb-6">Plug in.<br />Start Saving.</h1>
          <p className="text-xl text-slate-300">Real-time Priority PPO network + instant savings</p>
        </div>

        <div className="bg-slate-900/90 border border-white/10 rounded-3xl p-12">
          <h2 className="text-4xl font-semibold text-center mb-10">Check Your Network Coverage</h2>
          
          <div className="max-w-xl mx-auto">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Enter ZIP code (e.g. 63101)"
                className="flex-1 bg-slate-800 border border-white/20 rounded-2xl px-6 py-5 text-lg focus:outline-none focus:border-cyan-400"
                value={zipCodes}
                onChange={(e) => {
                  setZipCodes(e.target.value);
                  setError('');
                }}
                maxLength={5}
              />
              <button
                onClick={checkNetwork}
                disabled={loading || !zipCodes}
                className="bg-cyan-400 hover:bg-cyan-300 disabled:bg-slate-600 text-slate-950 font-semibold px-12 py-5 rounded-2xl text-lg transition"
              >
                {loading ? "Checking..." : "Check Coverage"}
              </button>
            </div>

            {error && (
              <p className="text-red-400 text-center mt-6 font-medium">{error}</p>
            )}

            {result && (
              <div className="mt-12 bg-gradient-to-br from-green-900/70 to-emerald-900/70 border border-green-400/50 rounded-3xl p-12 text-center">
                <div className="text-6xl mb-4">✅</div>
                <div className="text-3xl font-semibold text-green-400">{result.city}</div>
                <div className="text-7xl font-bold text-green-400 my-6">{result.doctors}</div>
                <div className="text-2xl text-slate-200">Priority PPO doctors found</div>
                <div className="mt-8 inline-block bg-green-400/20 text-green-400 px-6 py-2 rounded-full text-sm">
                  Coverage Strength: <span className="font-semibold">{result.coverageStrength}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}