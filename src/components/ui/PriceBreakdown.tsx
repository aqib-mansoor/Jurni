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
    <div className={cn('space-y-4 p-6 bg-ivory/30 rounded-2xl border border-ivory/50', className)}>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-charcoal/60 text-sm font-medium">
            {formatPrice(pricePerNight)} × {nights} nights
          </span>
          <span className="text-charcoal font-semibold">
            {formatPrice(baseTotal)}
          </span>
        </div>

        {cleaningFee > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-charcoal/60 text-sm font-medium underline decoration-dotted underline-offset-4 cursor-help">
              Cleaning fee
            </span>
            <span className="text-charcoal font-semibold">
              {formatPrice(cleaningFee)}
            </span>
          </div>
        )}

        {serviceFee > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-charcoal/60 text-sm font-medium underline decoration-dotted underline-offset-4 cursor-help">
              JURNİ service fee
            </span>
            <span className="text-charcoal font-semibold">
              {formatPrice(serviceFee)}
            </span>
          </div>
        )}

        {taxes > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-charcoal/60 text-sm font-medium underline decoration-dotted underline-offset-4 cursor-help">
              Taxes
            </span>
            <span className="text-charcoal font-semibold">
              {formatPrice(taxes)}
            </span>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-ivory/50">
        <span className="text-lg font-serif text-charcoal">Total</span>
        <span className="text-2xl font-serif text-terracotta font-bold">{formatPrice(total)}</span>
      </div>

      <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-ivory/50 shadow-sm">
        <div className="h-8 w-8 rounded-full bg-amber/10 flex items-center justify-center text-amber">
          <Info size={16} />
        </div>
        <p className="text-[10px] text-charcoal/60 uppercase tracking-widest font-bold leading-tight">
          Free cancellation for 48 hours. <br />
          <span className="text-terracotta">No hidden fees.</span>
        </p>
      </div>
    </div>
  );
};
