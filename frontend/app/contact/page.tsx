'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Contact() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
    interest: 'demo'
  });

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const saved = localStorage.getItem('selfflow_user');
    if (saved) setIsLoggedIn(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('selfflow_user');
    window.location.reload();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      alert("✅ Thank you! We'll get back to you within 1 business day.");
      setFormSubmitted(false);
      setFormData({ name: '', company: '', email: '', phone: '', message: '', interest: 'demo' });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white flex flex-col">
      <nav className="border-b border-white/10 bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition">
            <div className="w-9 h-9 md:w-10 md:h-10 bg-cyan-400 rounded-2xl flex items-center justify-center text-slate-950 font-bold text-2xl md:text-3xl shadow-lg">Q</div>
            <div>
              <div className="font-bold text-2xl md:text-3xl tracking-tighter">Quantum SelfFlow</div>
              <div className="text-cyan-400 text-xs md:text-sm -mt-1">Self-serve savings. Zero complexity.</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="hover:text-cyan-400">Home</Link>
            <Link href="/about" className="hover:text-cyan-400">About</Link>
            <Link href="/success-stories" className="hover:text-cyan-400">Success Stories</Link>
            <Link href="/pricing" className="hover:text-cyan-400">Pricing</Link>
            <Link href="/resources" className="hover:text-cyan-400">Resources</Link>
            <Link href="/contact" className="text-cyan-400 font-medium">Contact</Link>
            
            {!isLoggedIn && <Link href="/onboarding" className="hover:text-cyan-400">Get Started</Link>}
            {isLoggedIn && <Link href="/dashboard" className="hover:text-cyan-400">Dashboard</Link>}
            
            {isLoggedIn && (
              <button onClick={handleLogout} className="text-red-400 hover:text-red-500 transition">
                Logout
              </button>
            )}
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
              <Link href="/about" className="py-2" onClick={() => setMobileMenuOpen(false)}>About</Link>
              <Link href="/success-stories" className="py-2" onClick={() => setMobileMenuOpen(false)}>Success Stories</Link>
              <Link href="/pricing" className="py-2" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
              <Link href="/resources" className="py-2" onClick={() => setMobileMenuOpen(false)}>Resources</Link>
              <Link href="/contact" className="py-2" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
              <Link href={isLoggedIn ? "/dashboard" : "/onboarding"} className="py-2" onClick={() => setMobileMenuOpen(false)}>
                {isLoggedIn ? "Dashboard" : "Get Started"}
              </Link>
              {isLoggedIn && <button onClick={handleLogout} className="text-red-400 py-2">Logout</button>}
            </div>
          </div>
        )}
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-20 flex-1">
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tighter mb-6">Let's Talk Savings</h1>
          <p className="text-2xl text-slate-400">Ready to reduce your medical trend? Tell us about your group.</p>
        </div>

        {formSubmitted ? (
          <div className="bg-emerald-900/30 border border-emerald-400/50 rounded-3xl p-16 text-center">
            <div className="text-6xl mb-6">🎉</div>
            <h3 className="text-3xl font-semibold mb-4">Thank You!</h3>
            <p className="text-xl text-slate-300">We'll reach out within one business day to schedule a quick demo or answer your questions.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-slate-900/80 border border-white/10 rounded-3xl p-10 md:p-16 space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm mb-2">Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/50 border border-white/20 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Company Name</label>
                <input 
                  type="text" 
                  name="company" 
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/50 border border-white/20 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm mb-2">Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/50 border border-white/20 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  name="phone" 
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-white/20 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2">What are you most interested in?</label>
              <select 
                name="interest" 
                value={formData.interest}
                onChange={handleChange}
                className="w-full bg-black/50 border border-white/20 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-400"
              >
                <option value="demo">Schedule a Demo</option>
                <option value="pricing">Pricing Information</option>
                <option value="tpa">TPA / White-Label Partnership</option>
                <option value="other">General Question</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-2">Message / Details</label>
              <textarea 
                name="message" 
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full bg-black/50 border border-white/20 rounded-3xl px-6 py-4 focus:outline-none focus:border-cyan-400"
                placeholder="Tell us about your group size, current challenges, etc."
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold py-6 rounded-3xl text-xl transition"
            >
              Send Message
            </button>
          </form>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/60 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-400 text-sm">
          © {currentYear} Quantum SelfFlow • Powered by Quantum One Networks<br />
          Self-serve cost containment platform for self-insured employers and regional TPAs
        </div>
      </footer>
    </div>
  );
}