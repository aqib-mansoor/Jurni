import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { AlertCircle, LogOut, Trash2, XCircle, Info } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info' | 'logout';
  isLoading?: boolean;
  confirmInput?: string; // For delete account: requires typing "DELETE"
  icon?: React.ReactNode;
  requireConfirmationText?: string;
}

export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'info',
  isLoading = false,
  confirmInput,
  icon,
  requireConfirmationText
}: ConfirmationModalProps) => {
  const [inputValue, setInputValue] = React.useState('');

  const finalConfirmInput = confirmInput || requireConfirmationText;
  const isConfirmDisabled = finalConfirmInput ? inputValue !== finalConfirmInput : false;

  const getIcon = () => {
    if (icon) return icon;
    switch (type) {
      case 'danger':
        return <Trash2 className="h-10 w-10 text-terracotta" />;
      case 'logout':
        return <LogOut className="h-10 w-10 text-terracotta" />;
      case 'warning':
        return <AlertCircle className="h-10 w-10 text-amber" />;
      default:
        return <Info className="h-10 w-10 text-charcoal" />;
    }
  };

  const getConfirmVariant = () => {
    switch (type) {
      case 'danger':
      case 'logout':
        return 'danger';
      case 'warning':
        return 'primary';
      default:
        return 'primary';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="">
      <div className="flex flex-col items-center text-center space-y-8 py-4">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-amber opacity-20 blur-2xl rounded-full" />
          <div className="relative p-6 rounded-full bg-white shadow-xl border border-ivory/50">
            {getIcon()}
          </div>
        </div>
        
        <div className="space-y-3">
          <h3 className="font-serif text-3xl text-charcoal tracking-tight">{title}</h3>
          <p className="text-charcoal/60 max-w-xs leading-relaxed text-sm font-medium">
            {message}
          </p>
        </div>

        {finalConfirmInput && (
          <div className="w-full space-y-3 text-left">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal/40 ml-1">
              Type "{finalConfirmInput}" to confirm
            </label>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full px-6 py-4 bg-ivory/30 border border-charcoal/5 rounded-2xl focus:outline-none focus:border-amber/50 focus:bg-white transition-all text-charcoal font-medium shadow-inner"
              placeholder={finalConfirmInput}
            />
          </div>
        )}

        <div className="flex flex-col gap-4 w-full pt-4">
          <Button
            variant={getConfirmVariant()}
            onClick={onConfirm}
            className="w-full py-5 rounded-2xl shadow-xl shadow-terracotta/10"
            disabled={isLoading || isConfirmDisabled}
            isLoading={isLoading}
          >
            {confirmText}
          </Button>
          <Button
            variant="ghost"
            onClick={onClose}
            className="w-full py-5 rounded-2xl text-charcoal/40 hover:text-charcoal hover:bg-ivory/50"
            disabled={isLoading}
          >
            {cancelText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
