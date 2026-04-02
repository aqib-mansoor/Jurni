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
    <div className={cn('space-y-5 p-6 bg-midnight/[0.02] rounded-2xl border border-midnight/5', className)}>
      <div className="space-y-3.5">
        <div className="flex justify-between items-center">
          <span className="text-midnight/40 text-[10px] uppercase font-bold tracking-widest">
            {formatPrice(pricePerNight)} × {nights} nights
          </span>
          <span className="text-midnight font-bold text-xs">
            {formatPrice(baseTotal)}
          </span>
        </div>

        {cleaningFee > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-midnight/40 text-[10px] uppercase font-bold tracking-widest underline decoration-dotted underline-offset-4 cursor-help">
              Cleaning fee
            </span>
            <span className="text-midnight font-bold text-xs">
              {formatPrice(cleaningFee)}
            </span>
          </div>
        )}

        {serviceFee > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-midnight/40 text-[10px] uppercase font-bold tracking-widest underline decoration-dotted underline-offset-4 cursor-help">
              JURNİ service fee
            </span>
            <span className="text-midnight font-bold text-xs">
              {formatPrice(serviceFee)}
            </span>
          </div>
        )}

        {taxes > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-midnight/40 text-[10px] uppercase font-bold tracking-widest underline decoration-dotted underline-offset-4 cursor-help">
              Taxes
            </span>
            <span className="text-midnight font-bold text-xs">
              {formatPrice(taxes)}
            </span>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-midnight/5">
        <span className="text-base font-serif text-midnight tracking-tight">Total Investment</span>
        <span className="text-xl font-bold text-midnight tracking-tight">{formatPrice(total)}</span>
      </div>

      <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-midnight/5 shadow-sm">
        <div className="h-8 w-8 rounded-full bg-champagne/10 flex items-center justify-center text-champagne">
          <Info size={14} />
        </div>
        <p className="text-[9px] text-midnight/40 uppercase tracking-[0.2em] font-bold leading-tight">
          Free cancellation for 48 hours. <br />
          <span className="text-champagne">No hidden fees.</span>
        </p>
      </div>
    </div>
  );
};
