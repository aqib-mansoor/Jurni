import React from 'react';
import { Button } from './Button';
import { LucideIcon, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  message: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState = ({
  icon: Icon = Sparkles,
  title,
  message,
  actionText,
  onAction,
  className
}: EmptyStateProps) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={cn('flex flex-col items-center justify-center text-center p-12 bg-pearl rounded-sm border border-midnight border-opacity-5 shadow-sm', className)}
  >
    <div className="p-6 rounded-full bg-champagne bg-opacity-10 mb-6">
      <Icon className="h-12 w-12 text-champagne" />
    </div>
    
    <h3 className="text-2xl font-serif text-midnight mb-2">
      {title}
    </h3>
    
    <p className="text-midnight opacity-60 max-w-md mb-8 leading-relaxed">
      {message}
    </p>

    {actionText && onAction && (
      <Button 
        variant="primary" 
        onClick={onAction}
        className="px-8"
      >
        {actionText}
      </Button>
    )}
  </motion.div>
);
