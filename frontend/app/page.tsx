'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [zipCodes, setZipCodes] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const [claimsVolume, setClaimsVolume] = useState('');
  const [projectedSavings, setProjectedSavings] = useState<number | null>(null);
  const [savingsRate, setSavingsRate] = useState(10.5);
  const [calculating, setCalculating] = useState(false);

  const BACKEND_URL = "https://quantum-selfflow-nhtx.vercel.app";

  useEffect(() => {
    const saved = localStorage.getItem('selfflow_user');
    if (saved) setIsLoggedIn(true);
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3500);
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
      showToast(`Projected savings calculated: $${savings.toLocaleString()}`);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white relative">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 text-white transition-all duration-300 ${
          toast.type === 'success' ? 'bg-emerald-600' : 'bg-red-600'
        }`}>
          {toast.type === 'success' ? '✅' : '❌'} {toast.message}
        </div>
      )}

      {/* Rest of your page remains the same */}
      {/* ... (keep the rest of the code from previous full version) ... */}
    </div>
  );
}