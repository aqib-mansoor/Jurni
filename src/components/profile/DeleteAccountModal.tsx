import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteAccountModal = ({ isOpen, onClose, onConfirm }: DeleteAccountModalProps) => {
  const [confirmText, setConfirmText] = useState('');

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
          className="relative w-full max-w-md bg-pearl rounded-[32px] shadow-modal border border-rose/20 overflow-hidden"
        >
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-serif text-rose">Delete Account</h2>
              <button onClick={onClose} className="p-2 hover:bg-rose/5 rounded-full transition-colors">
                <X size={20} className="text-rose/40" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="p-4 bg-rose/5 rounded-2xl border border-rose/10 flex items-start gap-3">
                <AlertCircle size={20} className="text-rose shrink-0 mt-0.5" />
                <p className="text-sm text-rose/80 leading-relaxed">
                  This action is irreversible. All your data, including curated journeys and wishlist items, will be permanently deleted.
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-sm font-medium text-midnight/60">
                  Please type <span className="text-rose font-bold">DELETE</span> to confirm.
                </p>
                <input
                  type="text"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  className="w-full bg-midnight/5 border border-midnight/5 rounded-2xl py-4 px-6 focus:outline-none focus:border-rose transition-all text-sm font-bold uppercase tracking-widest"
                  placeholder="DELETE"
                />
              </div>
            </div>

            <div className="pt-4 flex flex-col gap-3">
              <Button 
                className="w-full bg-rose text-pearl rounded-2xl py-4 font-bold uppercase tracking-widest text-xs shadow-lg shadow-rose/20 disabled:opacity-50"
                onClick={onConfirm}
                disabled={confirmText !== 'DELETE'}
              >
                Delete Permanently
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
