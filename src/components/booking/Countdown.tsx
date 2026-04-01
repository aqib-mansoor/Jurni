import React, { useState, useEffect } from 'react';
import { intervalToDuration, isBefore, Duration, differenceInDays } from 'date-fns';

interface CountdownProps {
  targetDate: string;
}

export const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
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
    <div className="flex items-center gap-3">
      {[
        { label: 'D', value: totalDays },
        { label: 'H', value: duration.hours ?? 0 },
        { label: 'M', value: duration.minutes ?? 0 }
      ].map((item, idx) => (
        <React.Fragment key={item.label}>
          <div className="flex flex-col items-center">
            <span className="text-lg font-serif text-champagne leading-none">
              {String(item.value).padStart(2, '0')}
            </span>
            <span className="text-[7px] uppercase font-bold tracking-widest text-pearl opacity-40 mt-0.5">
              {item.label}
            </span>
          </div>
          {idx < 2 && (
            <div className="h-4 w-px bg-pearl opacity-10 self-center" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
