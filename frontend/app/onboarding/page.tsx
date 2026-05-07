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

  const canProceed = () => {
    if (step === 1) return formData.companyName && formData.employeeCount;
    if (step === 2) return formData.planType;
    return true;
  };

  const nextStep = () => {
    if (step === 3) {
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
        {/* Progress Bar */}
        <div className="flex justify-between mb-12">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex-1">
              <div className={`h-2 rounded-full mx-1 transition-all ${step >= s ? 'bg-cyan-400' : 'bg-white/10'}`} />
              <div className="text-center text-xs mt-2 text-slate-400">Step {s}</div>
            </div>
          ))}
        </div>

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold tracking-tighter">Let's Activate Your Savings</h1>
          <p className="text-slate-400 mt-3 text-lg">Takes less than 2 minutes</p>
        </div>

        <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-12">
          {/* Step 1 */}
          {step === 1 && (
            <div>
              <h2 className="text-3xl font-semibold mb-8">Company Information</h2>
              <input
                type="text"
                placeholder="Company Name"
                className="w-full bg-slate-800 border border-white/20 rounded-2xl px-6 py-4 mb-6 text-lg focus:outline-none focus:border-cyan-400"
                value={formData.companyName}
                onChange={(e) => updateField('companyName', e.target.value)}
              />
              <input
                type="number"
                placeholder="Number of Employees / Covered Lives"
                className="w-full bg-slate-800 border border-white/20 rounded-2xl px-6 py-4 text-lg focus:outline-none focus:border-cyan-400"
                value={formData.employeeCount}
                onChange={(e) => updateField('employeeCount', e.target.value)}
              />
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div>
              <h2 className="text-3xl font-semibold mb-8">Select Your Plan Type</h2>
              <div className="space-y-4">
                {[
                  { type: 'Level-Funded', desc: 'Fixed monthly payments with surplus return' },
                  { type: 'Self-Insured', desc: 'Pay claims directly with stop-loss protection' },
                  { type: 'TPA Client', desc: 'Third-party administrator managing your claims' }
                ].map((plan) => (
                  <button
                    key={plan.type}
                    onClick={() => updateField('planType', plan.type)}
                    className={`w-full text-left p-8 rounded-3xl border transition-all hover:border-cyan-400 ${
                      formData.planType === plan.type ? 'border-cyan-400 bg-cyan-900/30' : 'border-white/10'
                    }`}
                  >
                    <div className="font-semibold text-2xl">{plan.type}</div>
                    <div className="text-slate-400 mt-2">{plan.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3 - Confirmation */}
          {step === 3 && (
            <div className="text-center py-12">
              <div className="text-7xl mb-8">🎉</div>
              <h2 className="text-4xl font-bold mb-4">Almost Ready!</h2>
              <p className="text-xl text-slate-300 mb-10">
                {formData.companyName} will now have instant access to the Priority PPO network.
              </p>

              <div className="bg-emerald-900/30 border border-emerald-400/30 rounded-2xl p-8 mb-12">
                <div className="text-5xl font-bold text-emerald-400">10.5%</div>
                <div className="text-slate-300 mt-2">Expected Average Annual Savings</div>
              </div>

              <button
                onClick={nextStep}
                className="w-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold py-6 rounded-2xl text-xl transition"
              >
                Activate Quantum SelfFlow & View Dashboard →
              </button>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-12">
            {step > 1 && (
              <button onClick={prevStep} className="px-8 py-4 text-slate-400 hover:text-white">
                ← Back
              </button>
            )}
            {step < 3 && (
              <button
                onClick={nextStep}
                disabled={!canProceed()}
                className="ml-auto bg-cyan-400 hover:bg-cyan-300 disabled:bg-slate-700 disabled:text-slate-400 text-slate-950 font-semibold px-12 py-4 rounded-2xl transition"
              >
                Continue →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}