import React from 'react';
import { LucideIcon, HelpCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface FloatingActionButtonProps {
  icon?: LucideIcon;
  onClick: () => void;
  className?: string;
  label?: string;
  show?: boolean;
}

export const FloatingActionButton = ({
  icon: Icon = HelpCircle,
  onClick,
  className,
  label,
  show = true
}: FloatingActionButtonProps) => (
  <AnimatePresence>
    {show && (
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClick}
        className={cn(
          'fixed bottom-24 right-6 z-40 flex items-center gap-3 p-4 rounded-full bg-midnight text-pearl shadow-xl hover:bg-opacity-90 transition-all duration-300 group',
          className
        )}
      >
        <Icon className="h-6 w-6 text-champagne group-hover:rotate-12 transition-transform" />
        {label && (
          <span className="text-xs font-semibold uppercase tracking-widest pr-2">
            {label}
          </span>
        )}
      </motion.button>
    )}
  </AnimatePresence>
);
