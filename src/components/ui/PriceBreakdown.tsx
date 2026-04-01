import React from 'react';
import { formatPrice } from '../../lib/utils';
import { Info } from 'lucide-react';
import { cn } from '../../lib/utils';

interface PriceBreakdownProps {
  pricePerNight: number;
  nights: number;
  serviceFee?: number;
  cleaningFee?: number;
  taxes?: number;
  className?: string;
}

export const PriceBreakdown = ({
  pricePerNight,
  nights,
  serviceFee = 0,
  cleaningFee = 0,
  taxes = 0,
  className
}: PriceBreakdownProps) => {
  const baseTotal = pricePerNight * nights;
  const total = baseTotal + serviceFee + cleaningFee + taxes;

  return (
    <div className={cn('space-y-4 py-4 border-t border-midnight border-opacity-5', className)}>
      <div className="flex justify-between items-center">
        <span className="text-midnight opacity-60">
          {formatPrice(pricePerNight)} x {nights} nights
        </span>
        <span className="text-midnight font-medium">
          {formatPrice(baseTotal)}
        </span>
      </div>

      {cleaningFee > 0 && (
        <div className="flex justify-between items-center">
          <span className="text-midnight opacity-60 underline decoration-dotted underline-offset-4 cursor-help">
            Cleaning fee
          </span>
          <span className="text-midnight font-medium">
            {formatPrice(cleaningFee)}
          </span>
        </div>
      )}

      {serviceFee > 0 && (
        <div className="flex justify-between items-center">
          <span className="text-midnight opacity-60 underline decoration-dotted underline-offset-4 cursor-help">
            JURNİ service fee
          </span>
          <span className="text-midnight font-medium">
            {formatPrice(serviceFee)}
          </span>
        </div>
      )}

      {taxes > 0 && (
        <div className="flex justify-between items-center">
          <span className="text-midnight opacity-60 underline decoration-dotted underline-offset-4 cursor-help">
            Taxes
          </span>
          <span className="text-midnight font-medium">
            {formatPrice(taxes)}
          </span>
        </div>
      )}

      <div className="flex justify-between items-center pt-4 border-t border-midnight border-opacity-10">
        <span className="text-lg font-serif text-midnight">Total</span>
        <span className="text-xl font-serif text-midnight">{formatPrice(total)}</span>
      </div>

      <div className="flex items-center gap-2 p-3 bg-pearl rounded-sm border border-midnight border-opacity-5">
        <Info className="h-4 w-4 text-champagne" />
        <p className="text-[10px] text-midnight opacity-50 uppercase tracking-wider font-semibold">
          Free cancellation for 48 hours. No hidden fees.
        </p>
      </div>
    </div>
  );
};
