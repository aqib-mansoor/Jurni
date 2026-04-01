import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { format } from 'date-fns';

interface CustomDatePickerProps {
  startDate: Date | null;
  endDate?: Date | null;
  onChange: (dates: any) => void;
  excludeDates?: Date[];
  minDate?: Date;
  className?: string;
  placeholder?: string;
  selectsRange?: boolean;
}

export const CustomDatePicker = ({
  startDate,
  endDate,
  onChange,
  excludeDates = [],
  minDate = new Date(),
  className,
  placeholder = 'Select Dates',
  selectsRange = true
}: CustomDatePickerProps) => {
  return (
    <div className={cn('relative w-full', className)}>
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
        <CalendarIcon className="h-5 w-5 text-midnight opacity-40" />
      </div>
      {selectsRange ? (
        <DatePicker
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          onChange={onChange}
          minDate={minDate}
          excludeDates={excludeDates}
          placeholderText={placeholder}
          className="w-full pl-12 pr-4 py-3 bg-pearl border border-midnight border-opacity-10 rounded-sm text-midnight font-serif focus:outline-none focus:border-champagne transition-all cursor-pointer"
          renderCustomHeader={({
            date,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div className="flex items-center justify-between px-4 py-2 bg-midnight text-pearl">
              <button
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
                className="p-1 hover:bg-pearl/10 rounded-full transition-colors disabled:opacity-20"
              >
                <ChevronLeft className="h-5 w-5 text-champagne" />
              </button>
              <span className="text-sm font-serif font-bold uppercase tracking-widest">
                {format(date, 'MMMM yyyy')}
              </span>
              <button
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
                className="p-1 hover:bg-pearl/10 rounded-full transition-colors disabled:opacity-20"
              >
                <ChevronRight className="h-5 w-5 text-champagne" />
              </button>
            </div>
          )}
        />
      ) : (
        <DatePicker
          selected={startDate}
          onChange={onChange}
          minDate={minDate}
          excludeDates={excludeDates}
          placeholderText={placeholder}
          className="w-full pl-12 pr-4 py-3 bg-pearl border border-midnight border-opacity-10 rounded-sm text-midnight font-serif focus:outline-none focus:border-champagne transition-all cursor-pointer"
          renderCustomHeader={({
            date,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div className="flex items-center justify-between px-4 py-2 bg-midnight text-pearl">
              <button
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
                className="p-1 hover:bg-pearl/10 rounded-full transition-colors disabled:opacity-20"
              >
                <ChevronLeft className="h-5 w-5 text-champagne" />
              </button>
              <span className="text-sm font-serif font-bold uppercase tracking-widest">
                {format(date, 'MMMM yyyy')}
              </span>
              <button
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
                className="p-1 hover:bg-pearl/10 rounded-full transition-colors disabled:opacity-20"
              >
                <ChevronRight className="h-5 w-5 text-champagne" />
              </button>
            </div>
          )}
        />
      )}
      
      <style>{`
        .react-datepicker {
          font-family: 'Playfair Display', serif;
          border: 1px solid rgba(20, 20, 20, 0.1);
          border-radius: 0;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          background-color: #FDFCFB;
        }
        .react-datepicker__header {
          background-color: #141414;
          border-bottom: none;
          padding: 0;
        }
        .react-datepicker__day-name {
          color: #FDFCFB;
          opacity: 0.5;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 600;
          width: 2.5rem;
          line-height: 2.5rem;
          margin: 0;
        }
        .react-datepicker__day {
          width: 2.5rem;
          line-height: 2.5rem;
          margin: 0;
          color: #141414;
          font-size: 0.9rem;
          border-radius: 0;
          transition: all 0.2s;
        }
        .react-datepicker__day:hover {
          background-color: #D4AF37;
          color: #FDFCFB;
        }
        .react-datepicker__day--selected,
        .react-datepicker__day--in-range,
        .react-datepicker__day--in-selecting-range {
          background-color: #D4AF37 !important;
          color: #FDFCFB !important;
        }
        .react-datepicker__day--disabled {
          color: #141414;
          opacity: 0.1;
          text-decoration: line-through;
        }
        .react-datepicker__day--outside-month {
          opacity: 0.2;
        }
        .react-datepicker__month-container {
          background-color: #FDFCFB;
        }
        .react-datepicker__day--keyboard-selected {
          background-color: transparent;
        }
      `}</style>
    </div>
  );
};
