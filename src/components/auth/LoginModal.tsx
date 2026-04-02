import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { useJurniAuth } from '../../hooks/useJurniAuth';
import { Mail, Lock, Chrome, ArrowRight, UserPlus, LogIn, Eye, EyeOff, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import toast from 'react-hot-toast';
import { cn } from '../../lib/utils';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthMode = 'login' | 'signup';

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const { login, signInWithEmail, signUpWithEmail } = useJurniAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<AuthMode>('login');
  const [showPassword, setShowPassword] = useState(false);
  
  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await login();
      toast.success('Welcome to Jurni');
      onClose();
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (mode === 'signup' && !fullName)) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      if (mode === 'login') {
        await signInWithEmail(email, password);
        toast.success('Welcome back');
      } else {
        await signUpWithEmail(email, password, fullName);
        toast.success('Account created successfully');
      }
      onClose();
    } catch (err: any) {
      console.error('Auth Error:', err.code, err.message);
      
      // Handle common Firebase Auth errors
      let errorMessage = 'Authentication failed. Please try again.';
      
      switch (err.code) {
        case 'auth/invalid-credential':
          errorMessage = mode === 'login' 
            ? 'Invalid email or password. Please check your credentials or sign up.' 
            : 'Authentication failed. Please check your details.';
          break;
        case 'auth/email-already-in-use':
          errorMessage = 'This email is already registered. Please sign in instead.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password is too weak. Please use at least 6 characters.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Please enter a valid email address.';
          break;
        case 'auth/user-disabled':
          errorMessage = 'This account has been disabled. Please contact support.';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Email/Password sign-in is not enabled. Please use Google or contact the administrator.';
          break;
        case 'auth/popup-closed-by-user':
          errorMessage = 'Login cancelled. Please try again.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your connection.';
          break;
      }
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-4xl" className="p-0">
      <div className="flex flex-col md:flex-row min-h-[500px] md:min-h-[600px]">
        {/* Left Side - Image & Branding */}
        <div className="hidden md:flex md:w-1/2 relative overflow-hidden bg-midnight">
          <img 
            src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80" 
            alt="Luxury Interior" 
            className="absolute inset-0 w-full h-full object-cover opacity-60 animate-slow-zoom"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/20 to-transparent" />
          
          <div className="relative z-10 p-12 flex flex-col justify-between h-full text-pearl">
            <div>
              <h2 className="text-4xl font-serif mb-4 leading-tight">Your Journey <br />Starts Here.</h2>
              <div className="w-12 h-1 bg-champagne" />
            </div>
            
            <div className="space-y-6">
              <p className="text-sm font-light opacity-80 leading-relaxed italic max-w-xs">
                "Travel is the only thing you buy that makes you richer."
              </p>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-midnight overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?u=${i}`} alt="User" />
                    </div>
                  ))}
                </div>
                <p className="text-[10px] uppercase tracking-widest font-bold opacity-60">Joined by 10k+ explorers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 p-8 sm:p-12 flex flex-col justify-center bg-pearl relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-10"
            >
              <div className="space-y-3">
                <span className="text-rose font-bold text-[10px] tracking-[0.5em] uppercase block">
                  {mode === 'login' ? 'Welcome Back' : 'Join Jurni'}
                </span>
                <h3 className="text-4xl lg:text-5xl font-serif text-midnight leading-tight tracking-tight">
                  {mode === 'login' ? 'Sign In' : 'Create Account'}
                </h3>
                <p className="text-base lg:text-lg text-midnight/50 font-light leading-relaxed">
                  {mode === 'login' 
                    ? 'Enter your credentials to access your curated travel portfolio.' 
                    : 'Begin your journey into the world\'s most exclusive experiences.'}
                </p>
              </div>

              <div className="space-y-6">
                <Button 
                  className="w-full py-5 flex items-center justify-center gap-4 rounded-2xl border border-midnight/10 hover:border-champagne bg-white text-midnight hover:bg-pearl transition-all shadow-sm group"
                  onClick={handleGoogleLogin}
                  isLoading={isLoading}
                  type="button"
                >
                  <Chrome size={20} className="text-champagne group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Continue with Google</span>
                </Button>

                <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-midnight/5"></div>
                  </div>
                  <div className="relative flex justify-center text-[9px] uppercase tracking-[0.4em] font-bold">
                    <span className="bg-pearl px-6 text-midnight/20">Or use email</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {mode === 'signup' && (
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-midnight/40 ml-1">Full Name</label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                          <User className="text-midnight opacity-20 group-focus-within:text-champagne group-focus-within:opacity-100 transition-all" size={18} />
                        </div>
                        <input 
                          type="text" 
                          placeholder="Alexander Jurni"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full bg-midnight/[0.03] border border-transparent focus:border-champagne/30 p-5 pl-14 text-sm focus:ring-4 focus:ring-champagne/5 outline-none rounded-2xl transition-all placeholder:text-midnight/20"
                          required={mode === 'signup'}
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-midnight/40 ml-1">Email Address</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                        <Mail className="text-midnight opacity-20 group-focus-within:text-champagne group-focus-within:opacity-100 transition-all" size={18} />
                      </div>
                      <input 
                        type="email" 
                        placeholder="alexander@jurni.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-midnight/[0.03] border border-transparent focus:border-champagne/30 p-5 pl-14 text-sm focus:ring-4 focus:ring-champagne/5 outline-none rounded-2xl transition-all placeholder:text-midnight/20"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-midnight/40 ml-1">Password</label>
                      {mode === 'login' && (
                        <button type="button" className="text-[9px] uppercase tracking-widest font-bold text-champagne hover:text-midnight transition-colors">Forgot Password?</button>
                      )}
                    </div>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                        <Lock className="text-midnight opacity-20 group-focus-within:text-champagne group-focus-within:opacity-100 transition-all" size={18} />
                      </div>
                      <input 
                        type={showPassword ? 'text' : 'password'} 
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-midnight/[0.03] border border-transparent focus:border-champagne/30 p-5 pl-14 pr-14 text-sm focus:ring-4 focus:ring-champagne/5 outline-none rounded-2xl transition-all placeholder:text-midnight/20"
                        required
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-5 flex items-center text-midnight opacity-20 hover:opacity-100 transition-all"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <Button 
                    className="w-full py-5 rounded-2xl text-[11px] uppercase tracking-[0.3em] font-bold mt-6 group bg-midnight text-pearl hover:bg-midnight/90 shadow-2xl shadow-midnight/20"
                    isLoading={isLoading}
                    type="submit"
                  >
                    <span className="flex items-center justify-center gap-3">
                      {mode === 'login' ? 'Sign In' : 'Create Account'}
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </form>
              </div>

              <div className="pt-8 border-t border-midnight/5 flex flex-col items-center gap-6">
                <button 
                  onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                  className="text-[11px] uppercase tracking-widest font-bold text-midnight/60 hover:text-midnight transition-colors flex items-center gap-3 group"
                >
                  {mode === 'login' ? (
                    <>
                      <UserPlus size={16} className="text-champagne group-hover:scale-110 transition-transform" />
                      Don't have an account? <span className="text-midnight underline underline-offset-4 decoration-champagne/50">Sign Up</span>
                    </>
                  ) : (
                    <>
                      <LogIn size={16} className="text-champagne group-hover:scale-110 transition-transform" />
                      Already a member? <span className="text-midnight underline underline-offset-4 decoration-champagne/50">Sign In</span>
                    </>
                  )}
                </button>

                <p className="text-[10px] text-center text-midnight/30 leading-relaxed uppercase tracking-[0.2em] max-w-[280px]">
                  By continuing, you agree to Jurni's <br />
                  <span className="underline cursor-pointer hover:text-midnight transition-colors">Terms of Service</span> and <span className="underline cursor-pointer hover:text-midnight transition-colors">Privacy Policy</span>
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Modal>
  );
};
