'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [companyName, setCompanyName] = useState('');
  const [employeeCount, setEmployeeCount] = useState('');
  const [planType, setPlanType] = useState('');
  const [loading, setLoading] = useState(false);

  const progress = ((step - 1) / 3) * 100;

  const nextStep = () => {
    if (step === 1 && !companyName) return;
    if (step === 2 && !employeeCount) return;
    if (step === 3 && !planType) return;
    
    if (step < 3) {
      setStep(step + 1);
    } else {
      setLoading(true);
      setTimeout(() => {
        const userData = {
          companyName,
          employeeCount,
          planType,
          activatedAt: new Date().toISOString()
        };
        localStorage.setItem('selfflow_user', JSON.stringify(userData));
        
        alert("🎉 Quantum SelfFlow Activated!\n\nYour Priority PPO network is now live.");
        window.location.href = '/dashboard';
      }, 1200);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white">
      <nav className="border-b border-white/10 bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition">
            <div className="w-9 h-9 bg-cyan-400 rounded-2xl flex items-center justify-center text-slate-950 font-bold text-2xl shadow-lg">Q</div>
            <div className="font-bold text-2xl tracking-tighter">Quantum SelfFlow</div>
          </Link>
          <Link href="/" className="text-slate-400 hover:text-white">← Back to Home</Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 pt-16 pb-24">
        <div className="text-center mb-12">
          <div className="inline-block bg-cyan-400/10 text-cyan-400 text-sm px-4 py-2 rounded-full mb-4">Step {step} of 3</div>
          <h1 className="text-5xl font-bold tracking-tighter">Let’s Get You Set Up</h1>
          <p className="text-slate-400 mt-3 text-lg">Takes less than 2 minutes</p>
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-white/10 rounded-full mb-12 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full transition-all duration-500" 
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div>
            <h2 className="text-3xl font-semibold mb-8">What’s your company name?</h2>
            <input
              type="text"
              placeholder="e.g. Quantum Growth Partners LLC"
              className="w-full bg-slate-900 border border-white/20 rounded-3xl px-8 py-6 text-2xl focus:outline-none focus:border-cyan-400"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div>
            <h2 className="text-3xl font-semibold mb-8">How many lives are you covering?</h2>
            <input
              type="number"
              placeholder="e.g. 250"
              className="w-full bg-slate-900 border border-white/20 rounded-3xl px-8 py-6 text-2xl focus:outline-none focus:border-cyan-400"
              value={employeeCount}
              onChange={(e) => setEmployeeCount(e.target.value)}
            />
            <p className="text-slate-400 mt-4 text-center">This includes employees + dependents</p>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div>
            <h2 className="text-3xl font-semibold mb-8">Choose your plan type</h2>
            <div className="grid gap-4">
              {['Level-Funded', 'Fully Self-Funded', 'Reference-Based Pricing'].map((type) => (
                <button
                  key={type}
                  onClick={() => setPlanType(type)}
                  className={`p-8 rounded-3xl text-left transition-all border ${
                    planType === type 
                      ? 'border-cyan-400 bg-cyan-400/10' 
                      : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="font-semibold text-xl">{type}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-4 mt-12">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex-1 py-6 border border-white/20 rounded-3xl font-medium"
            >
              Back
            </button>
          )}
          <button
            onClick={nextStep}
            disabled={loading || 
              (step === 1 && !companyName) || 
              (step === 2 && !employeeCount) || 
              (step === 3 && !planType)}
            className="flex-1 py-6 bg-cyan-400 hover:bg-cyan-300 disabled:bg-slate-700 text-slate-950 font-semibold rounded-3xl text-xl transition-all active:scale-[0.98]"
          >
            {loading ? "Activating..." : step === 3 ? "Activate Quantum SelfFlow" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}