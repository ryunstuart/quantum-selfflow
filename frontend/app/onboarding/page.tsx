'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    employeeCount: '',
    planType: '',
  });

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (step === 3) {
      // Save to localStorage and redirect to dashboard
      localStorage.setItem('selfflow_user', JSON.stringify({
        ...formData,
        activatedAt: new Date().toISOString(),
      }));
      window.location.href = '/dashboard';
    } else {
      setStep(step + 1);
    }
  };

  const prevStep = () => setStep(step - 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white">
      <nav className="border-b border-white/10 bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-cyan-400 rounded-2xl flex items-center justify-center text-slate-950 font-bold">Q</div>
            <div className="font-bold text-2xl">Quantum SelfFlow</div>
          </div>
          <Link href="/" className="text-slate-400 hover:text-white">← Back to Home</Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 pt-16 pb-24">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-cyan-900/50 text-cyan-400 px-4 py-1 rounded-full text-sm mb-4">
            Step {step} of 3
          </div>
          <h1 className="text-5xl font-bold tracking-tighter">Let's Get You Set Up</h1>
          <p className="text-slate-400 mt-3 text-lg">It only takes a minute to activate your savings.</p>
        </div>

        <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-10">
          {/* Step 1: Company Info */}
          {step === 1 && (
            <div>
              <h2 className="text-3xl font-semibold mb-8">Tell us about your company</h2>
              <input
                type="text"
                placeholder="Company Name"
                className="w-full bg-slate-800 border border-white/20 rounded-2xl px-6 py-4 mb-6 text-lg"
                value={formData.companyName}
                onChange={(e) => updateField('companyName', e.target.value)}
              />
              <input
                type="number"
                placeholder="Number of Employees / Lives"
                className="w-full bg-slate-800 border border-white/20 rounded-2xl px-6 py-4 text-lg"
                value={formData.employeeCount}
                onChange={(e) => updateField('employeeCount', e.target.value)}
              />
              <button
                onClick={nextStep}
                disabled={!formData.companyName || !formData.employeeCount}
                className="w-full mt-10 bg-cyan-400 hover:bg-cyan-300 disabled:bg-slate-700 text-slate-950 font-semibold py-5 rounded-2xl text-lg"
              >
                Continue →
              </button>
            </div>
          )}

          {/* Step 2: Plan Type */}
          {step === 2 && (
            <div>
              <h2 className="text-3xl font-semibold mb-8">What type of plan do you have?</h2>
              <div className="space-y-4">
                {['Level-Funded', 'Self-Insured', 'TPA Client'].map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      updateField('planType', type);
                      nextStep();
                    }}
                    className={`w-full text-left p-6 rounded-2xl border transition-all ${
                      formData.planType === type 
                        ? 'border-cyan-400 bg-cyan-900/30' 
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="font-semibold text-xl">{type}</div>
                    <div className="text-slate-400 text-sm mt-1">
                      {type === 'Level-Funded' && 'Fixed monthly payments with surplus return'}
                      {type === 'Self-Insured' && 'Pay claims directly + stop-loss protection'}
                      {type === 'TPA Client' && 'Third-party administrator managing claims'}
                    </div>
                  </button>
                ))}
              </div>
              <button onClick={prevStep} className="mt-8 text-slate-400 hover:text-white">← Back</button>
            </div>
          )}

          {/* Step 3: Activation */}
          {step === 3 && (
            <div className="text-center py-8">
              <div className="text-6xl mb-6">🎉</div>
              <h2 className="text-4xl font-bold mb-4">You're Ready to Start Saving!</h2>
              <p className="text-xl text-slate-300 mb-10">
                {formData.companyName} is now connected to the Priority PPO network.
              </p>

              <div className="bg-emerald-900/30 border border-emerald-500/30 rounded-2xl p-8 mb-10">
                <div className="text-emerald-400 text-5xl font-bold mb-2">10.5%</div>
                <div className="text-slate-300">Expected Average Annual Savings</div>
              </div>

              <button
                onClick={nextStep}
                className="w-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold py-6 rounded-2xl text-xl"
              >
                Activate Quantum SelfFlow & Go to Dashboard →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}