import React, { useState, useEffect } from 'react';
import { intervalToDuration, isBefore, Duration, differenceInDays } from 'date-fns';

interface CountdownProps {
  targetDate: string;
  label?: string;
}

export const Countdown: React.FC<CountdownProps> = ({ targetDate, label = "Departure In" }) => {
  const [duration, setDuration] = useState<Duration | null>(null);
  const [totalDays, setTotalDays] = useState(0);
  const [isPast, setIsPast] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!targetDate) return;
      const now = new Date();
      const target = new Date(targetDate);
      
      if (isNaN(target.getTime())) return;

      if (isBefore(target, now)) {
        setIsPast(true);
        clearInterval(timer);
        return;
      }

      const d = intervalToDuration({
        start: now,
        end: target
      });
      
      setDuration(d);
      setTotalDays(differenceInDays(target, now));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (isPast || !duration) return null;

  return (
    <div className="flex flex-col items-center gap-1.5 sm:gap-2">
      <div className="text-[7px] sm:text-[9px] font-bold uppercase tracking-[0.3em] sm:tracking-[0.4em] text-pearl whitespace-nowrap">
        {label}
      </div>
      <div className="flex gap-3 sm:gap-5">
        {[
          { label: 'Days', value: totalDays },
          { label: 'Hrs', value: duration.hours ?? 0 },
          { label: 'Mins', value: duration.minutes ?? 0 }
        ].map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-0.5 sm:gap-1">
            <span className="text-lg sm:text-2xl font-serif text-pearl leading-none tracking-tight font-bold">
              {String(item.value).padStart(2, '0')}
            </span>
            <span className="text-[6px] sm:text-[7px] font-bold uppercase tracking-[0.1em] sm:tracking-[0.2em] text-champagne">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
