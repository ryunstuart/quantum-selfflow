'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [companyName, setCompanyName] = useState('');
  const [employeeCount, setEmployeeCount] = useState('');
  const [planType, setPlanType] = useState('');

  // Check if user is already activated
  useEffect(() => {
    const saved = localStorage.getItem('selfflow_user');
    if (saved) {
      window.location.href = "/dashboard";
    }
  }, []);

  const handleActivate = () => {
    const userData = {
      companyName: companyName || "Your Company",
      employeeCount,
      planType: planType || "Self-Insured",
      activatedAt: new Date().toISOString()
    };
    
    localStorage.setItem('selfflow_user', JSON.stringify(userData));
    
    alert(`🎉 Quantum SelfFlow Activated for ${companyName || "your company"}!`);
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-blue-950 text-white">
      <nav className="border-b border-white/10 bg-black/70 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-400 rounded-2xl flex items-center justify-center text-slate-950 font-bold text-3xl">Q</div>
            <div className="font-bold text-3xl tracking-tighter">Quantum SelfFlow</div>
          </div>
          <Link href="/" className="text-cyan-400 hover:text-cyan-300">← Back to Home</Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Let's Get You Started</h1>
          <p className="text-xl text-slate-400">Takes under 5 minutes • Free 90-day pilot</p>
        </div>

        <div className="bg-slate-900 rounded-3xl p-10">
          <div className="flex justify-between mb-10 text-sm">
            <div className={step >= 1 ? 'text-cyan-400 font-medium' : 'text-slate-500'}>1. Info</div>
            <div className={step >= 2 ? 'text-cyan-400 font-medium' : 'text-slate-500'}>2. Plan</div>
            <div className={step >= 3 ? 'text-cyan-400 font-medium' : 'text-slate-500'}>3. Activate</div>
          </div>

          {step === 1 && (
            <div>
              <h2 className="text-2xl font-semibold mb-8">Company Information</h2>
              <input 
                type="text" 
                placeholder="Company Name" 
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full bg-slate-800 border border-white/20 rounded-2xl px-6 py-4 mb-6 text-lg" 
              />
              <input 
                type="number" 
                placeholder="Number of Employees (25–5000)" 
                value={employeeCount}
                onChange={(e) => setEmployeeCount(e.target.value)}
                className="w-full bg-slate-800 border border-white/20 rounded-2xl px-6 py-4 mb-8 text-lg" 
              />
              <button onClick={() => setStep(2)} className="w-full bg-cyan-400 text-slate-950 py-5 rounded-2xl font-semibold text-lg hover:bg-cyan-300">
                Continue →
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-semibold mb-8">What type of plan do you have?</h2>
              <div className="space-y-4">
                <button onClick={() => { setPlanType("Level-Funded Plan"); setStep(3); }} className="w-full p-6 border border-white/20 hover:border-cyan-400 rounded-2xl text-left text-lg hover:bg-slate-800">Level-Funded Plan</button>
                <button onClick={() => { setPlanType("Self-Insured Plan"); setStep(3); }} className="w-full p-6 border border-white/20 hover:border-cyan-400 rounded-2xl text-left text-lg hover:bg-slate-800">Self-Insured Plan</button>
                <button onClick={() => { setPlanType("TPA Client"); setStep(3); }} className="w-full p-6 border border-white/20 hover:border-cyan-400 rounded-2xl text-left text-lg hover:bg-slate-800">Using a Regional TPA (White Label)</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-12">
              <h2 className="text-4xl font-bold mb-6">Ready to Start Saving?</h2>
              <p className="text-slate-300 mb-10">
                {companyName ? `Great, ${companyName}! ` : ''}We'll connect your {planType || "plan"} immediately.
              </p>
              <button onClick={handleActivate} className="w-full bg-green-500 hover:bg-green-400 py-6 rounded-2xl text-2xl font-semibold">
                Activate Quantum SelfFlow →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}