import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useEconomy } from '../store/useEconomy';
import { ShieldCheck, ArrowRight, UserPlus, Phone } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const login = useEconomy(state => state.login);
  
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendOTP = (e) => {
    e.preventDefault();
    setError('');
    
    if (!name.trim()) return setError('Please enter your full name.');
    if (phone.length < 10) return setError('Please enter a valid 10-digit mobile number.');

    setLoading(true);
    // Simulate API call to send OTP
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 1200);
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; // Prevent multiple chars
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const fullOtp = otp.join('');
    
    if (fullOtp.length < 4) return setError('Please enter the 4-digit OTP.');
    
    setLoading(true);
    // Simulate verficiation
    setTimeout(() => {
      setLoading(false);
      login(name, phone);
      navigate('/'); // Return to home on success
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center relative overflow-hidden px-6">
      {/* Decorative background blobs */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 rounded-full bg-ayush-green-500/20 blur-[120px]"></div>
      <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-indigo-500/20 blur-[120px]"></div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-slate-800/80 backdrop-blur-2xl border border-slate-700 p-8 rounded-3xl shadow-2xl relative z-10"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-ayush-green-500/20 border border-ayush-green-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="text-ayush-green-400 w-8 h-8" />
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Welcome to AYUSH</h2>
          <p className="text-slate-400 mt-2 text-sm">Log in to sync your progress and economy.</p>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.form 
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={handleSendOTP} 
              className="space-y-6"
            >
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">Full Name</label>
                  <div className="relative">
                    <UserPlus className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name" 
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-ayush-green-500 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">Mobile Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                    <input 
                      type="tel" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="10-digit mobile number" 
                      maxLength={10}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-ayush-green-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {error && <p className="text-red-400 text-sm text-center font-medium bg-red-400/10 py-2 rounded-lg">{error}</p>}

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-gradient-to-r from-ayush-green-600 to-ayush-green-500 hover:from-ayush-green-500 hover:to-ayush-green-400 text-white font-bold py-3.5 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-lg shadow-ayush-green-500/30 disabled:opacity-70"
              >
                {loading ? (
                  <span className="animate-spin h-5 w-5 border-2 border-white/30 border-t-white rounded-full"></span>
                ) : (
                  <>
                    <span>Send OTP</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </motion.form>
          ) : (
            <motion.form 
              key="step2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={handleVerify} 
              className="space-y-6 text-center"
            >
              <p className="text-slate-300 text-sm mb-6">
                We've sent a 4-digit code to <span className="font-bold text-white">+91 {phone}</span>
                <button type="button" onClick={() => setStep(1)} className="ml-2 text-ayush-green-400 hover:text-ayush-green-300 underline text-xs">Edit</button>
              </p>

              <div className="flex justify-center space-x-3 mb-6">
                {otp.map((digit, idx) => (
                  <input 
                    key={idx}
                    id={`otp-${idx}`}
                    type="text" 
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    className="w-14 h-14 bg-slate-900 border border-slate-700 focus:border-ayush-green-500 rounded-xl text-center text-2xl text-white font-bold transition-colors focus:outline-none"
                  />
                ))}
              </div>

              {error && <p className="text-red-400 text-sm text-center font-medium bg-red-400/10 py-2 rounded-lg mb-4">{error}</p>}

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-gradient-to-r from-ayush-green-600 to-ayush-green-500 hover:from-ayush-green-500 hover:to-ayush-green-400 text-white font-bold py-3.5 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-lg shadow-ayush-green-500/30 disabled:opacity-70"
              >
                {loading ? (
                  <span className="animate-spin h-5 w-5 border-2 border-white/30 border-t-white rounded-full"></span>
                ) : (
                  <span>Verify & Login</span>
                )}
              </button>

              <p className="text-slate-500 text-sm mt-6">
                Didn't receive the code? <button type="button" className="text-ayush-green-400 hover:text-ayush-green-300 font-medium">Resend OTP</button>
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
