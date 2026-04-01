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
  type?: 'danger' | 'warning' | 'info';
  isLoading?: boolean;
  confirmInput?: string; // For delete account: requires typing "DELETE"
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
  confirmInput
}: ConfirmationModalProps) => {
  const [inputValue, setInputValue] = React.useState('');

  const isConfirmDisabled = confirmInput ? inputValue !== confirmInput : false;

  const getIcon = () => {
    switch (type) {
      case 'danger':
        return <Trash2 className="h-12 w-12 text-dusty-rose" />;
      case 'warning':
        return <AlertCircle className="h-12 w-12 text-champagne" />;
      default:
        return <Info className="h-12 w-12 text-midnight" />;
    }
  };

  const getConfirmVariant = () => {
    switch (type) {
      case 'danger':
        return 'outline'; // Or custom red variant if we had one, but let's stick to theme
      case 'warning':
        return 'primary';
      default:
        return 'primary';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="flex flex-col items-center text-center space-y-4 py-4">
        <div className="p-4 rounded-full bg-pearl shadow-sm">
          {getIcon()}
        </div>
        
        <p className="text-midnight opacity-70 max-w-xs">
          {message}
        </p>

        {confirmInput && (
          <div className="w-full space-y-2 text-left">
            <label className="text-xs font-semibold uppercase tracking-wider text-midnight opacity-50">
              Type "{confirmInput}" to confirm
            </label>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full px-4 py-2 bg-pearl border border-midnight border-opacity-10 rounded-sm focus:outline-none focus:border-champagne transition-colors"
              placeholder={confirmInput}
            />
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 w-full pt-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
            disabled={isLoading}
          >
            {cancelText}
          </Button>
          <Button
            variant={getConfirmVariant()}
            onClick={onConfirm}
            className={cn(
              "flex-1",
              type === 'danger' && "bg-dusty-rose text-pearl border-dusty-rose hover:bg-opacity-90"
            )}
            disabled={isLoading || isConfirmDisabled}
            isLoading={isLoading}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
