import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';

interface BackButtonProps {
  className?: string;
  label?: string;
  onClick?: () => void;
}

export const BackButton = ({ className, label = 'Back', onClick }: BackButtonProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      onClick={handleBack}
      className={cn(
        'group flex items-center gap-2 text-midnight opacity-60 hover:opacity-100 transition-all duration-300',
        className
      )}
    >
      <div className="p-2 rounded-full bg-pearl border border-midnight border-opacity-5 group-hover:border-champagne group-hover:bg-champagne group-hover:bg-opacity-5 transition-all">
        <ChevronLeft className="h-5 w-5" />
      </div>
      <span className="text-sm font-medium uppercase tracking-widest">{label}</span>
    </button>
  );
};
