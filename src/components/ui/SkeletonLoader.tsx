import React from 'react';
import { cn } from '../../lib/utils';

export const SkeletonLoader = ({ className }: { className?: string }) => (
  <div className={cn('animate-pulse bg-midnight bg-opacity-5 rounded-sm', className)} />
);

export const ListingSkeleton = () => (
  <div className="space-y-6">
    <SkeletonLoader className="aspect-[4/5] w-full rounded-3xl md:rounded-[2.5rem]" />
    <div className="space-y-3 px-2">
      <SkeletonLoader className="h-4 w-1/4 rounded-full" />
      <SkeletonLoader className="h-8 w-3/4 rounded-lg" />
    </div>
  </div>
);
