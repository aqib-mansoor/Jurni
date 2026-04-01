import React from 'react';
import { User, Plus, Minus, Info } from 'lucide-react';
import { cn } from '../../lib/utils';

interface GuestCounts {
  adults: number;
  children: number;
  infants: number;
}

interface GuestSelectorProps {
  counts: GuestCounts;
  onChange: (counts: GuestCounts) => void;
  maxGuests?: number;
  className?: string;
}

export const GuestSelector = ({
  counts,
  onChange,
  maxGuests = 10,
  className
}: GuestSelectorProps) => {
  const totalGuests = counts.adults + counts.children;

  const updateCount = (type: keyof GuestCounts, delta: number) => {
    const newCounts = { ...counts };
    const newValue = counts[type] + delta;

    if (newValue < 0) return;
    if (type !== 'infants' && totalGuests + delta > maxGuests) return;
    if (type === 'infants' && newValue > 5) return; // Arbitrary limit for infants
    if (type === 'adults' && newValue === 0 && (counts.children > 0 || counts.infants > 0)) return; // Need at least one adult

    newCounts[type] = newValue;
    onChange(newCounts);
  };

  return (
    <div className={cn('space-y-6 p-4 bg-pearl rounded-sm border border-midnight border-opacity-5', className)}>
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-serif text-midnight">Adults</h4>
          <p className="text-[10px] text-midnight opacity-50 uppercase tracking-wider">Ages 13+</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => updateCount('adults', -1)}
            disabled={counts.adults <= 1}
            className="p-1 rounded-full border border-midnight border-opacity-20 disabled:opacity-20 hover:border-champagne transition-colors"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-4 text-center font-serif text-midnight">{counts.adults}</span>
          <button
            onClick={() => updateCount('adults', 1)}
            disabled={totalGuests >= maxGuests}
            className="p-1 rounded-full border border-midnight border-opacity-20 disabled:opacity-20 hover:border-champagne transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-serif text-midnight">Children</h4>
          <p className="text-[10px] text-midnight opacity-50 uppercase tracking-wider">Ages 2-12</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => updateCount('children', -1)}
            disabled={counts.children <= 0}
            className="p-1 rounded-full border border-midnight border-opacity-20 disabled:opacity-20 hover:border-champagne transition-colors"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-4 text-center font-serif text-midnight">{counts.children}</span>
          <button
            onClick={() => updateCount('children', 1)}
            disabled={totalGuests >= maxGuests}
            className="p-1 rounded-full border border-midnight border-opacity-20 disabled:opacity-20 hover:border-champagne transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-serif text-midnight">Infants</h4>
          <p className="text-[10px] text-midnight opacity-50 uppercase tracking-wider">Under 2</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => updateCount('infants', -1)}
            disabled={counts.infants <= 0}
            className="p-1 rounded-full border border-midnight border-opacity-20 disabled:opacity-20 hover:border-champagne transition-colors"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-4 text-center font-serif text-midnight">{counts.infants}</span>
          <button
            onClick={() => updateCount('infants', 1)}
            disabled={counts.infants >= 5}
            className="p-1 rounded-full border border-midnight border-opacity-20 disabled:opacity-20 hover:border-champagne transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {totalGuests >= maxGuests && (
        <div className="flex items-center gap-2 p-3 bg-dusty-rose bg-opacity-5 rounded-sm border border-dusty-rose border-opacity-10">
          <Info className="h-4 w-4 text-dusty-rose" />
          <p className="text-[10px] text-dusty-rose font-bold uppercase tracking-wider">
            Maximum capacity reached ({maxGuests} guests)
          </p>
        </div>
      )}
    </div>
  );
};
