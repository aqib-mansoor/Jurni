import React from 'react';
import { Star, StarHalf } from 'lucide-react';
import { cn } from '../../lib/utils';

interface RatingStarsProps {
  rating: number;
  max?: number;
  className?: string;
  showCount?: boolean;
  count?: number;
}

export const RatingStars = ({
  rating,
  max = 5,
  className,
  showCount = false,
  count
}: RatingStarsProps) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = max - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="h-4 w-4 fill-champagne text-champagne" />
      ))}
      {hasHalfStar && <StarHalf className="h-4 w-4 fill-champagne text-champagne" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="h-4 w-4 text-midnight opacity-20" />
      ))}
      {showCount && count !== undefined && (
        <span className="ml-2 text-xs font-medium text-midnight opacity-50">
          ({count})
        </span>
      )}
    </div>
  );
};
