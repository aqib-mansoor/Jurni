import React from 'react';
import { cn } from '../../lib/utils';

export const Card = ({ className, children, ...props }: { className?: string; children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) => (
  <div 
    className={cn('bg-pearl border border-midnight border-opacity-10 rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300', className)}
    {...props}
  >
    {children}
  </div>
);
