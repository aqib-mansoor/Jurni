import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, Lock, Smartphone } from 'lucide-react';
import { Button } from '../ui/Button';

interface SecuritySettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SecuritySettingsModal = ({ isOpen, onClose }: SecuritySettingsModalProps) => {
  const [twoFactor, setTwoFactor] = useState(false);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-midnight/60 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-pearl rounded-[32px] shadow-modal border border-midnight/10 overflow-hidden"
        >
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-serif text-midnight">Security Settings</h2>
              <button onClick={onClose} className="p-2 hover:bg-midnight/5 rounded-full transition-colors">
                <X size={20} className="text-midnight/40" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-midnight/40">Change Password</h3>
                <div className="space-y-3">
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-midnight/20" />
                    <input
                      type="password"
                      placeholder="Current Password"
                      className="w-full bg-midnight/5 border border-midnight/5 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-champagne transition-all text-sm font-medium"
                    />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-midnight/20" />
                    <input
                      type="password"
                      placeholder="New Password"
                      className="w-full bg-midnight/5 border border-midnight/5 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-champagne transition-all text-sm font-medium"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-midnight/40">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between p-4 bg-midnight/5 rounded-2xl border border-midnight/5">
                  <div className="flex items-center gap-3">
                    <Smartphone size={20} className="text-champagne" />
                    <span className="text-sm font-medium text-midnight/70">2FA Status</span>
                  </div>
                  <button 
                    onClick={() => setTwoFactor(!twoFactor)}
                    className={cn(
                      "w-12 h-6 rounded-full transition-colors relative",
                      twoFactor ? "bg-champagne" : "bg-midnight/10"
                    )}
                  >
                    <div className={cn(
                      "absolute top-1 w-4 h-4 rounded-full bg-pearl transition-all",
                      twoFactor ? "left-7" : "left-1"
                    )} />
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-col gap-3">
              <Button 
                className="w-full bg-champagne text-midnight rounded-2xl py-4 font-bold uppercase tracking-widest text-xs shadow-lg shadow-champagne/20"
                onClick={onClose}
              >
                Update Settings
              </Button>
              <Button 
                variant="ghost" 
                className="w-full text-midnight/40 font-bold uppercase tracking-widest text-[10px]"
                onClick={onClose}
              >
                Cancel
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

import { cn } from '../../lib/utils';
