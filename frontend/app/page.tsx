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
  const [showDemoModal, setShowDemoModal] = useState(false);

  const BACKEND_URL = "https://quantum-selfflow-nhtx.vercel.app";

  useEffect(() => {
    const saved = localStorage.getItem('selfflow_user');
    if (saved) setIsLoggedIn(true);
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

          <div className="flex items-center gap-4 md:gap-8 text-sm font-medium">
            <Link href="/" className="hover:text-cyan-400">Home</Link>
            {!isLoggedIn && <Link href="/onboarding" className="hover:text-cyan-400">Get Started</Link>}
            {isLoggedIn && <Link href="/dashboard" className="hover:text-cyan-400">Dashboard</Link>}
            {isLoggedIn && <Link href="/myplan" className="hover:text-cyan-400">My Plan</Link>}
            {isLoggedIn && <button onClick={() => { localStorage.removeItem('selfflow_user'); window.location.reload(); }} className="text-red-400">Logout</button>}
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 md:px-6 pt-12 md:pt-20 pb-24 flex-1">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">Plug in.<br />Start Saving.</h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">Real-time Priority PPO network + instant savings for self-insured employers and TPAs</p>
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
                disabled={loading || !zipCodes.trim()}
                className="bg-cyan-400 hover:bg-cyan-300 disabled:bg-slate-600 text-slate-950 font-semibold px-8 md:px-12 py-5 rounded-2xl text-lg transition whitespace-nowrap flex items-center justify-center min-w-[160px]"
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
              <div className="mt-12 bg-gradient-to-br from-green-900/70 to-emerald-900/70 border border-green-400/50 rounded-3xl p-10 md:p-12 text-center">
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
        <div className="bg-slate-900/90 border border-white/10 rounded-3xl p-8 md:p-12 mb-16">
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
              <div className="mt-12 p-10 bg-gradient-to-br from-emerald-900/50 to-green-900/50 border border-emerald-400/30 rounded-3xl text-center">
                <div className="text-emerald-400 text-6xl font-bold">${projectedSavings.toLocaleString()}</div>
                <div className="text-2xl text-slate-300 mt-3">Estimated Annual Savings</div>
                <div className="text-emerald-400">at {savingsRate}% average reduction</div>
              </div>
            )}
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-semibold text-center mb-12">How Quantum SelfFlow Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-6xl mb-6">1️⃣</div>
              <div className="font-semibold text-xl mb-3">Enter Your ZIPs</div>
              <p className="text-slate-400">Instantly see real-time Priority PPO network strength in every location.</p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-6">2️⃣</div>
              <div className="font-semibold text-xl mb-3">Activate in One Click</div>
              <p className="text-slate-400">Connect your plan and start steering claims automatically.</p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-6">3️⃣</div>
              <div className="font-semibold text-xl mb-3">Watch Savings Grow</div>
              <p className="text-slate-400">Real-time dashboard + add-ons (AI steering, Hybrid Care, Outcomes).</p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-8 md:p-12">
          <h2 className="text-3xl font-semibold text-center mb-12">Trusted by Self-Insured Employers</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { quote: "Reduced our medical trend by 14% in the first 90 days. The ZIP checker is a game changer.", name: "Sarah Mitchell", title: "HR Director, Midwest Manufacturing" },
              { quote: "As a regional TPA, SelfFlow lets us offer white-label savings with zero extra work.", name: "David Chen", title: "CEO, Heartland TPA" },
              { quote: "The real-time network adequacy and one-click activation saved us months of manual work.", name: "Rachel Thompson", title: "Benefits Manager, St. Louis Logistics" }
            ].map((t, i) => (
              <div key={i} className="bg-slate-950/50 p-8 rounded-3xl">
                <div className="text-amber-400 text-4xl mb-4">★★★★★</div>
                <p className="italic text-slate-300">"{t.quote}"</p>
                <div className="mt-6 text-sm">
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-slate-400">{t.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Demo Button */}
      <button
        onClick={() => setShowDemoModal(true)}
        className="fixed bottom-8 right-8 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-50 transition-all active:scale-95"
      >
        📅 Schedule a Demo
      </button>

      {/* Demo Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[200] p-4">
          <div className="bg-slate-900 border border-white/10 rounded-3xl p-10 max-w-md w-full text-center">
            <h3 className="text-3xl font-semibold mb-4">Ready to See Quantum SelfFlow Live?</h3>
            <p className="text-slate-400 mb-8">Schedule a quick 15-minute demo with our team to review your potential savings and get started.</p>
            
            <button 
              onClick={() => { alert("✅ Demo request sent! Our team will reach out shortly."); setShowDemoModal(false); }}
              className="w-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold py-5 rounded-2xl mb-4"
            >
              Yes - Schedule Demo
            </button>
            
            <button 
              onClick={() => setShowDemoModal(false)}
              className="w-full py-5 border border-white/20 rounded-2xl"
            >
              Close
            </button>
          </div>
        </div>
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