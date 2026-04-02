import React from 'react';
import { cn } from '../../lib/utils';

export const Card = ({ className, children, ...props }: { className?: string; children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) => (
  <div 
    className={cn('bg-pearl border border-midnight border-opacity-10 rounded-[20px] overflow-hidden shadow-card hover:shadow-hover transition-all duration-500', className)}
    {...props}
  >
    {children}
  </div>
);
