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
      {/* Consistent Clickable Logo Nav */}
      <nav className="border-b border-white/10 bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition">
            <div className="w-9 h-9 md:w-10 md:h-10 bg-cyan-400 rounded-2xl flex items-center justify-center text-slate-950 font-bold text-2xl md:text-3xl shadow-lg">Q</div>
            <div>
              <div className="font-bold text-2xl md:text-3xl tracking-tighter">Quantum SelfFlow</div>
              <div className="text-cyan-400 text-xs md:text-sm -mt-1">Self-serve savings. Zero complexity.</div>
            </div>
          </Link>

          <Link href="/" className="text-slate-400 hover:text-white">← Back to Home</Link>
        </div>
      </nav>

      {/* Rest of your onboarding content stays the same */}
      <div className="max-w-2xl mx-auto px-6 pt-16 pb-24">
        {/* Progress Bar + Content from previous version */}
        {/* ... keep your existing onboarding steps here ... */}
      </div>
    </div>
  );
}