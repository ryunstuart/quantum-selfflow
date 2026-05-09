'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [companyName, setCompanyName] = useState('');
  const [employeeCount, setEmployeeCount] = useState('');
  const [planType, setPlanType] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleComplete = () => {
    if (!companyName || !employeeCount || !planType) {
      alert("Please fill in all fields");
      return;
    }
    const userData = {
      companyName,
      employeeCount,
      planType,
      activatedAt: new Date().toISOString()
    };
    localStorage.setItem('selfflow_user', JSON.stringify(userData));
    alert("🎉 Quantum SelfFlow Activated!");
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white flex flex-col overflow-x-hidden">
      <nav className="border-b border-white/10 bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition">
            <div className="w-9 h-9 md:w-10 md:h-10 bg-cyan-400 rounded-2xl flex items-center justify-center text-slate-950 font-bold text-2xl md:text-3xl shadow-lg">Q</div>
            <div>
              <div className="font-bold text-2xl md:text-3xl tracking-tighter">Quantum SelfFlow</div>
              <div className="text-cyan-400 text-xs md:text-sm -mt-1">Self-serve savings. Zero complexity.</div>
            </div>
          </Link>

          {/* Simple Navigation - Only Home */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="hover:text-cyan-400">Home</Link>
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
            </div>
          </div>
        )}
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-12 flex-1">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold tracking-tighter mb-4">Let's Get You Started</h1>
          <p className="text-slate-400 text-lg">It only takes a minute to activate Quantum SelfFlow</p>
        </div>

        {/* Progress Bar */}
        <div className="flex justify-between mb-10 px-2">
          {[1,2,3].map((s) => (
            <div key={s} className={`h-2 flex-1 mx-1 rounded-full transition-all ${step >= s ? 'bg-cyan-400' : 'bg-white/10'}`} />
          ))}
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-10">
            <h2 className="text-3xl font-semibold mb-8">What is your company name?</h2>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Acme Corporation"
              className="w-full bg-black/50 border border-white/20 rounded-2xl px-6 py-5 text-lg focus:outline-none focus:border-cyan-400"
            />
            <button
              onClick={() => setStep(2)}
              disabled={!companyName.trim()}
              className="mt-8 w-full bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 text-slate-950 font-semibold py-5 rounded-3xl text-lg"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-10">
            <h2 className="text-3xl font-semibold mb-8">How many employees / lives?</h2>
            <input
              type="number"
              value={employeeCount}
              onChange={(e) => setEmployeeCount(e.target.value)}
              placeholder="1240"
              className="w-full bg-black/50 border border-white/20 rounded-2xl px-6 py-5 text-lg focus:outline-none focus:border-cyan-400"
            />
            <div className="flex gap-4 mt-8">
              <button onClick={() => setStep(1)} className="flex-1 py-5 border border-white/30 rounded-3xl">Back</button>
              <button
                onClick={() => setStep(3)}
                disabled={!employeeCount}
                className="flex-1 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 text-slate-950 font-semibold py-5 rounded-3xl"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-10">
            <h2 className="text-3xl font-semibold mb-8">Choose your plan type</h2>
            <div className="space-y-4">
              {['Priority PPO Only', 'Priority PPO + Reference-Based Pricing', 'Full Platform (PPO + AI + Hybrid)'].map((plan, i) => (
                <button
                  key={i}
                  onClick={() => setPlanType(plan)}
                  className={`w-full text-left p-6 rounded-3xl border transition-all ${planType === plan ? 'border-cyan-400 bg-cyan-400/10' : 'border-white/10 hover:border-white/30'}`}
                >
                  {plan}
                </button>
              ))}
            </div>

            <div className="flex gap-4 mt-10">
              <button onClick={() => setStep(2)} className="flex-1 py-5 border border-white/30 rounded-3xl">Back</button>
              <button
                onClick={handleComplete}
                disabled={!planType}
                className="flex-1 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 text-slate-950 font-semibold py-5 rounded-3xl"
              >
                Activate Quantum SelfFlow
              </button>
            </div>
          </div>
        )}
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