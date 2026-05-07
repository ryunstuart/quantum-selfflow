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

  const BACKEND_URL = "https://quantum-selfflow-nhtx.vercel.app";

  useEffect(() => {
    const saved = localStorage.getItem('selfflow_user');
    if (saved) setIsLoggedIn(true);
  }, []);

  const validateZip = (zip: string): boolean => /^\d{5}$/.test(zip.trim());

  const checkNetwork = async () => { /* ... same as before ... */ };

  const calculateSavings = () => {
    if (!claimsVolume) return;
    const volume = parseFloat(claimsVolume);
    const savings = Math.round(volume * (savingsRate / 100));
    setProjectedSavings(savings);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white">
      {/* Nav stays the same */}

      <div className="max-w-5xl mx-auto px-6 pt-20 pb-24">
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tighter mb-6">Plug in.<br />Start Saving.</h1>
          <p className="text-xl text-slate-300">Real-time Priority PPO network + instant savings</p>
        </div>

        {/* ZIP Checker - keep your current improved version */}

        {/* Enhanced Savings Calculator */}
        <div className="bg-slate-900/90 border border-white/10 rounded-3xl p-12 mt-16">
          <h2 className="text-4xl font-semibold text-center mb-10">Estimate Your Potential Savings</h2>
          
          <div className="max-w-md mx-auto">
            <div className="mb-8">
              <label className="block text-sm text-slate-400 mb-2">Annual Medical Claims Volume</label>
              <div className="relative">
                <span className="absolute left-6 top-5 text-slate-400">$</span>
                <input
                  type="number"
                  placeholder="1,250,000"
                  className="w-full bg-slate-800 border border-white/20 rounded-2xl pl-10 pr-6 py-5 text-2xl focus:outline-none focus:border-cyan-400"
                  value={claimsVolume}
                  onChange={(e) => setClaimsVolume(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-10">
              <label className="block text-sm text-slate-400 mb-3">Expected Savings Rate</label>
              <input
                type="range"
                min="6"
                max="15"
                step="0.5"
                value={savingsRate}
                onChange={(e) => setSavingsRate(parseFloat(e.target.value))}
                className="w-full accent-cyan-400"
              />
              <div className="flex justify-between text-sm text-slate-400 mt-1">
                <span>6%</span>
                <span className="font-semibold text-cyan-400">{savingsRate}%</span>
                <span>15%</span>
              </div>
            </div>

            <button 
              onClick={calculateSavings}
              className="w-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold py-5 rounded-2xl text-lg transition"
            >
              Calculate My Savings
            </button>

            {projectedSavings && (
              <div className="mt-12 p-10 bg-gradient-to-br from-emerald-900/50 to-green-900/50 border border-emerald-400/30 rounded-3xl text-center">
                <div className="text-emerald-400 text-6xl font-bold">
                  ${projectedSavings.toLocaleString()}
                </div>
                <div className="text-2xl text-slate-300 mt-3">Estimated Annual Savings</div>
                <div className="text-emerald-400 mt-1">at {savingsRate}% average reduction</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}