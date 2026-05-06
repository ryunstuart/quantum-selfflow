'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [zipCodes, setZipCodes] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const checkNetwork = () => {
    if (!zipCodes) return;
    setLoading(true);
    setTimeout(() => {
      setResult({
        status: "excellent",
        message: `Coverage checked for ${zipCodes}`,
        doctors: Math.floor(Math.random() * 80) + 60,
        coverageLevel: "Excellent",
        recommendation: "Strong Priority PPO network coverage."
      });
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-400 rounded-2xl flex items-center justify-center text-slate-950 font-bold text-3xl">Q</div>
            <div>
              <div className="font-bold text-3xl tracking-tighter">Quantum SelfFlow</div>
              <div className="text-cyan-400 text-sm -mt-1">Self-serve savings. Zero complexity.</div>
            </div>
          </div>

          <div className="flex items-center gap-8 text-sm">
            <Link href="/" className="hover:text-cyan-400">Home</Link>
            <Link href="/onboarding" className="hover:text-cyan-400 font-medium">Get Started</Link>
            <Link href="#" className="hover:text-cyan-400">For TPAs</Link>
          </div>
        </div>
      </nav>

      {/* Hero + ZIP Checker */}
      <div className="max-w-5xl mx-auto px-6 pt-20 pb-12 text-center">
        <h1 className="text-6xl md:text-7xl font-bold tracking-tighter mb-6">
          Plug in.<br />Start Saving.
        </h1>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-10">
          Real-time Priority PPO network access for self-insured employers and regional TPAs.
        </p>
      </div>

      {/* ZIP Checker */}
      <div className="max-w-2xl mx-auto px-6 pb-20">
        <div className="bg-slate-900/70 border border-white/10 rounded-3xl p-10">
          <h2 className="text-3xl font-semibold mb-8 text-center">Try Network Coverage Checker</h2>
          <div className="flex gap-3">
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
            <div className="mt-8 bg-green-900/30 border border-green-500/30 rounded-2xl p-6">
              <div className="text-green-400 text-xl font-medium">{result.coverageLevel} Coverage</div>
              <p className="text-5xl font-bold text-green-400 mt-3">{result.doctors}</p>
              <p className="text-slate-400">Priority PPO doctors found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}