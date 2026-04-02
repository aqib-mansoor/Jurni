import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Mail, Phone } from 'lucide-react';
import { Button } from '../ui/Button';
import { useJurniAuth } from '../../hooks/useJurniAuth';
import toast from 'react-hot-toast';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
}

export const EditProfileModal = ({ isOpen, onClose, user }: EditProfileModalProps) => {
  const { updateUser } = useJurniAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    displayName: user?.displayName || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
  });

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await updateUser(formData);
      onClose();
    } catch (error) {
      console.error('Update error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <h2 className="text-2xl font-serif text-midnight">Edit Profile</h2>
              <button onClick={onClose} className="p-2 hover:bg-midnight/5 rounded-full transition-colors">
                <X size={20} className="text-midnight/40" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-midnight/40 ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-midnight/20" />
                  <input
                    type="text"
                    value={formData.displayName}
                    onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                    className="w-full bg-midnight/5 border border-midnight/5 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-champagne transition-all text-sm font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-midnight/40 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-midnight/20" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-midnight/5 border border-midnight/5 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-champagne transition-all text-sm font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-midnight/40 ml-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-midnight/20" />
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    className="w-full bg-midnight/5 border border-midnight/5 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-champagne transition-all text-sm font-medium"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-col gap-3">
              <Button 
                className="w-full bg-champagne text-midnight rounded-2xl py-4 font-bold uppercase tracking-widest text-xs shadow-lg shadow-champagne/20"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button 
                variant="ghost" 
                className="w-full text-midnight/40 font-bold uppercase tracking-widest text-[10px]"
                onClick={onClose}
                disabled={isSubmitting}
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
