import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  CreditCard, 
  User, 
  Calendar, 
  CheckCircle2, 
  AlertCircle,
  ShieldCheck,
  Info,
  MapPin
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Modal } from '../ui/Modal';
import { Listing } from '../../types';
import { formatPrice, cn } from '../../lib/utils';
import { format } from 'date-fns';
import { useBooking } from '../../hooks/useBooking';
import { useNavigate } from 'react-router-dom';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing: Listing;
  startDate: string;
  endDate: string;
  passengers: number;
}

type Step = 'review' | 'guests' | 'payment' | 'confirmation';

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  listing,
  startDate,
  endDate,
  passengers
}) => {
  const [step, setStep] = useState<Step>('review');
  const [bookingDates, setBookingDates] = useState({ start: startDate, end: endDate });

  useEffect(() => {
    setBookingDates({ start: startDate, end: endDate });
  }, [startDate, endDate]);

  const [guestDetails, setGuestDetails] = useState({
    name: '',
    email: '',
    phone: '',
    specialRequests: ''
  });
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
    nameOnCard: ''
  });
  const [isAgreed, setIsAgreed] = useState(false);
  const { bookListing, loading } = useBooking();
  const navigate = useNavigate();

  const calculateNights = () => {
    if (!bookingDates.start || !bookingDates.end) return 1;
    const start = new Date(bookingDates.start);
    const end = new Date(bookingDates.end);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const numberOfNights = (listing.type === 'hotel' || listing.type === 'villa') ? calculateNights() : 1;
  const totalPrice = listing.price * passengers * numberOfNights;

  const referenceNumber = useMemo(() => `JRN-${Math.random().toString(36).substr(2, 6).toUpperCase()}`, []);

  const safeFormat = (dateStr: string, formatStr: string) => {
    if (!dateStr) return 'Not selected';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return 'Invalid date';
    return format(date, formatStr);
  };

  const handleNext = () => {
    if (step === 'review') setStep('guests');
    else if (step === 'guests') setStep('payment');
  };

  const handleBack = () => {
    if (step === 'guests') setStep('review');
    else if (step === 'payment') setStep('guests');
  };

  const handleConfirmBooking = async () => {
    if (!isAgreed) return;
    
    const result = await bookListing(
      listing.id,
      bookingDates,
      {
        name: guestDetails.name,
        email: guestDetails.email,
        phone: guestDetails.phone,
        specialRequests: guestDetails.specialRequests
      },
      totalPrice,
      passengers
    );

    if (result) {
      setStep('confirmation');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 'review':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="flex gap-4 p-4 bg-midnight/5 rounded-2xl border border-midnight/5">
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                <img 
                  src={listing.images[0]} 
                  alt={listing.title} 
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-[8px] uppercase font-bold tracking-[0.2em] text-midnight/40 mb-1">{listing.location}</p>
                <h3 className="font-serif text-lg text-midnight leading-tight">{listing.title}</h3>
                <p className="text-[9px] text-midnight/30 font-bold uppercase tracking-widest mt-1">{listing.type} • Exclusive Access</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-white rounded-2xl border border-midnight/5 flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-midnight/5 text-midnight/40 flex items-center justify-center">
                  <Calendar size={18} />
                </div>
                <div>
                  <label className="block text-[8px] font-bold uppercase tracking-widest text-midnight/30">Dates</label>
                  <p className="text-midnight font-medium text-sm">
                    {safeFormat(bookingDates.start, 'MMM dd')} - {safeFormat(bookingDates.end, 'MMM dd, yyyy')}
                  </p>
                </div>
              </div>
              <div className="p-5 bg-white rounded-2xl border border-midnight/5 flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-midnight/5 text-midnight/40 flex items-center justify-center">
                  <User size={18} />
                </div>
                <div>
                  <label className="block text-[8px] font-bold uppercase tracking-widest text-midnight/30">Guests</label>
                  <p className="text-midnight font-medium text-sm">{passengers} {passengers === 1 ? 'Guest' : 'Guests'}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-midnight/5">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-midnight/40">Base Price ({formatPrice(listing.price)} x {passengers} x {numberOfNights})</span>
                <span className="text-midnight">{formatPrice(listing.price * passengers * numberOfNights)}</span>
              </div>
              <div className="flex justify-between text-xs font-medium">
                <span className="text-midnight/40">Service & Elite Support</span>
                <span className="text-midnight">{formatPrice(listing.price * 0.1)}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-serif text-midnight tracking-tight">Total Investment</span>
                <span className="text-xl font-bold text-midnight tracking-tight">{formatPrice(totalPrice + (listing.price * 0.1))}</span>
              </div>
            </div>

            <div className="bg-champagne/10 p-4 rounded-xl flex gap-3 border border-champagne/20">
              <Info size={16} className="text-champagne shrink-0 mt-0.5" />
              <p className="text-[10px] text-midnight/60 leading-relaxed italic">
                Elite Protection: Free cancellation until 48 hours before the experience starts.
              </p>
            </div>

            <Button 
              className="w-full py-4 rounded-xl text-xs font-bold uppercase tracking-widest bg-midnight text-champagne hover:bg-midnight/90 transition-all" 
              onClick={handleNext}
            >
              Continue to Guest Details
              <ChevronRight size={16} className="ml-2" />
            </Button>
          </motion.div>
        );

      case 'guests':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="space-y-6">
              <div className="space-y-4">
                <label className="block text-[8px] font-bold uppercase tracking-widest text-midnight/40 ml-1">Primary Guest Name</label>
                <input 
                  type="text"
                  value={guestDetails.name}
                  onChange={(e) => setGuestDetails({ ...guestDetails, name: e.target.value })}
                  placeholder="Full name as on passport"
                  className="w-full bg-midnight/5 border border-midnight/5 rounded-xl py-3.5 px-5 focus:outline-none focus:border-champagne/50 focus:bg-white transition-all text-sm text-midnight placeholder:text-midnight/20"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <label className="block text-[8px] font-bold uppercase tracking-widest text-midnight/40 ml-1">Email Address</label>
                  <input 
                    type="email"
                    value={guestDetails.email}
                    onChange={(e) => setGuestDetails({ ...guestDetails, email: e.target.value })}
                    placeholder="For your itinerary"
                    className="w-full bg-midnight/5 border border-midnight/5 rounded-xl py-3.5 px-5 focus:outline-none focus:border-champagne/50 focus:bg-white transition-all text-sm text-midnight placeholder:text-midnight/20"
                  />
                </div>
                <div className="space-y-4">
                  <label className="block text-[8px] font-bold uppercase tracking-widest text-midnight/40 ml-1">Phone Number</label>
                  <input 
                    type="tel"
                    value={guestDetails.phone}
                    onChange={(e) => setGuestDetails({ ...guestDetails, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-midnight/5 border border-midnight/5 rounded-xl py-3.5 px-5 focus:outline-none focus:border-champagne/50 focus:bg-white transition-all text-sm text-midnight placeholder:text-midnight/20"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-[8px] font-bold uppercase tracking-widest text-midnight/40 ml-1">Special Requests (Optional)</label>
                <textarea 
                  value={guestDetails.specialRequests}
                  onChange={(e) => setGuestDetails({ ...guestDetails, specialRequests: e.target.value })}
                  placeholder="Dietary requirements, accessibility needs, or special occasions..."
                  rows={3}
                  className="w-full bg-midnight/5 border border-midnight/5 rounded-xl py-3.5 px-5 focus:outline-none focus:border-champagne/50 focus:bg-white transition-all text-sm text-midnight placeholder:text-midnight/20 resize-none"
                />
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-4 pt-4">
              <Button 
                variant="ghost" 
                className="w-full sm:flex-1 py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest text-midnight/40 hover:text-midnight" 
                onClick={handleBack}
              >
                Back
              </Button>
              <Button 
                className="w-full sm:flex-[2] py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest bg-midnight text-champagne hover:bg-midnight/90 transition-all" 
                onClick={handleNext}
                disabled={!guestDetails.name || !guestDetails.email || !guestDetails.phone}
              >
                Continue to Payment
              </Button>
            </div>
          </motion.div>
        );

      case 'payment':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="p-6 bg-midnight rounded-2xl text-center space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-champagne/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
              <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-2">
                <ShieldCheck size={24} className="text-champagne" />
              </div>
              <h3 className="text-xl font-serif text-pearl tracking-tight">Secure Checkout</h3>
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-pearl/40">Encrypted 256-bit SSL Connection</p>
            </div>

            <div className="space-y-5">
              <div className="space-y-3">
                <label className="block text-[8px] font-bold uppercase tracking-widest text-midnight/40 ml-1">Cardholder Name</label>
                <input 
                  type="text"
                  value={paymentDetails.nameOnCard}
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, nameOnCard: e.target.value })}
                  placeholder="As it appears on your card"
                  className="w-full bg-midnight/5 border border-midnight/5 rounded-xl py-3.5 px-5 focus:outline-none focus:border-champagne/50 focus:bg-white transition-all text-sm text-midnight placeholder:text-midnight/20"
                />
              </div>
              <div className="space-y-3">
                <label className="block text-[8px] font-bold uppercase tracking-widest text-midnight/40 ml-1">Card Number</label>
                <div className="relative">
                  <input 
                    type="text"
                    value={paymentDetails.cardNumber}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
                    placeholder="0000 0000 0000 0000"
                    className="w-full bg-midnight/5 border border-midnight/5 rounded-xl py-3.5 px-5 focus:outline-none focus:border-champagne/50 focus:bg-white transition-all text-sm text-midnight placeholder:text-midnight/20"
                  />
                  <CreditCard size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-midnight/20" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="block text-[8px] font-bold uppercase tracking-widest text-midnight/40 ml-1">Expiry Date</label>
                  <input 
                    type="text"
                    value={paymentDetails.expiry}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, expiry: e.target.value })}
                    placeholder="MM / YY"
                    className="w-full bg-midnight/5 border border-midnight/5 rounded-xl py-3.5 px-5 focus:outline-none focus:border-champagne/50 focus:bg-white transition-all text-sm text-midnight placeholder:text-midnight/20"
                  />
                </div>
                <div className="space-y-3">
                  <label className="block text-[8px] font-bold uppercase tracking-widest text-midnight/40 ml-1">CVC</label>
                  <input 
                    type="text"
                    value={paymentDetails.cvc}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, cvc: e.target.value })}
                    placeholder="123"
                    className="w-full bg-midnight/5 border border-midnight/5 rounded-xl py-3.5 px-5 focus:outline-none focus:border-champagne/50 focus:bg-white transition-all text-sm text-midnight placeholder:text-midnight/20"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-2">
              <input 
                type="checkbox" 
                id="terms"
                checked={isAgreed}
                onChange={(e) => setIsAgreed(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-midnight/20 text-midnight focus:ring-midnight transition-colors cursor-pointer"
              />
              <label htmlFor="terms" className="text-[10px] text-midnight/50 leading-relaxed cursor-pointer select-none">
                I agree to the <span className="text-midnight font-bold underline decoration-champagne underline-offset-2">Terms of Service</span> and <span className="text-midnight font-bold underline decoration-champagne underline-offset-2">Cancellation Policy</span>.
              </label>
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-4 pt-4">
              <Button 
                variant="ghost" 
                className="w-full sm:flex-1 py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest text-midnight/40 hover:text-midnight" 
                onClick={handleBack}
              >
                Back
              </Button>
              <Button 
                className="w-full sm:flex-[2] py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest bg-midnight text-champagne hover:bg-midnight/90 transition-all" 
                onClick={handleConfirmBooking}
                disabled={!isAgreed || !paymentDetails.cardNumber || loading}
                isLoading={loading}
              >
                Complete Reservation • {formatPrice(totalPrice + (listing.price * 0.1))}
              </Button>
            </div>
          </motion.div>
        );

      case 'confirmation':
        return (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8 space-y-8"
          >
            <div className="flex justify-center">
              <div className="h-20 w-20 rounded-full bg-midnight text-champagne flex items-center justify-center shadow-2xl relative">
                <div className="absolute inset-0 rounded-full border border-champagne/20 animate-ping" />
                <CheckCircle2 size={40} strokeWidth={1.5} />
              </div>
            </div>
            
            <div className="space-y-3">
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-champagne block">Success</span>
              <h2 className="text-3xl md:text-4xl font-serif text-midnight tracking-tight">Journey Secured</h2>
              <p className="text-sm text-midnight/50 max-w-xs mx-auto leading-relaxed">
                Your reservation at <span className="font-serif italic text-midnight">{listing.title}</span> is confirmed. Your digital itinerary has been sent.
              </p>
            </div>

            <div className="bg-white p-8 rounded-[24px] border border-midnight/5 shadow-sm max-w-sm mx-auto space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-midnight/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="flex justify-between items-start text-left">
                <div>
                  <p className="text-[8px] font-bold uppercase tracking-widest text-midnight/30 mb-1">Reference</p>
                  <p className="font-mono font-bold text-midnight text-sm">{referenceNumber}</p>
                </div>
                <div className="text-right">
                  <p className="text-[8px] font-bold uppercase tracking-widest text-midnight/30 mb-1">Status</p>
                  <p className="text-[9px] font-bold uppercase text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">Confirmed</p>
                </div>
              </div>
              <div className="h-px w-full border-t border-dashed border-midnight/10" />
              <div className="grid grid-cols-2 gap-4 text-left">
                <div>
                  <p className="text-[8px] font-bold uppercase tracking-widest text-midnight/30 mb-1">Check-in</p>
                  <p className="text-xs font-bold text-midnight">{safeFormat(bookingDates.start, 'MMM dd, yyyy')}</p>
                </div>
                <div className="text-right">
                  <p className="text-[8px] font-bold uppercase tracking-widest text-midnight/30 mb-1">Guests</p>
                  <p className="text-xs font-bold text-midnight">{passengers} Guests</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 max-w-sm mx-auto pt-4">
              <Button 
                className="flex-1 py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest bg-midnight text-champagne shadow-xl shadow-midnight/10" 
                onClick={() => navigate('/platform/bookings')}
              >
                Manage Bookings
              </Button>
              <Button 
                variant="ghost" 
                className="flex-1 py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest text-midnight/40 hover:text-midnight" 
                onClick={onClose}
              >
                Explore More
              </Button>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={step === 'confirmation' ? () => {} : onClose}
      title={step === 'confirmation' ? '' : 'Begin Your Journey'}
      maxWidth="max-w-2xl"
    >
      <div className="w-full">
        {step !== 'confirmation' && (
          <div className="relative mb-10 sm:mb-12">
            <div className="flex items-center justify-between relative z-10">
              {[
                { id: 'review', label: 'Review' },
                { id: 'guests', label: 'Guests' },
                { id: 'payment', label: 'Payment' }
              ].map((s, i) => {
                const stepIndex = ['review', 'guests', 'payment'].indexOf(step);
                const isActive = step === s.id;
                const isCompleted = i < stepIndex;
                
                return (
                  <div key={s.id} className="flex flex-col items-center gap-3">
                    <div className={cn(
                      "h-12 w-12 sm:h-14 sm:w-14 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 border-2",
                      isActive ? "bg-charcoal text-white border-charcoal scale-110 shadow-xl shadow-charcoal/10" : 
                      isCompleted ? "bg-amber text-charcoal border-amber" : 
                      "bg-ivory text-charcoal/20 border-charcoal/5"
                    )}>
                      {isCompleted ? <CheckCircle2 size={24} /> : i + 1}
                    </div>
                    <span className={cn(
                      "text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] transition-opacity duration-500",
                      isActive ? "opacity-100 text-charcoal" : "opacity-30 text-charcoal"
                    )}>
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>
            {/* Progress Line */}
            <div className="absolute top-6 sm:top-7 left-0 w-full h-[1px] bg-charcoal/5 -z-0">
              <motion.div 
                className="h-full bg-amber"
                initial={{ width: '0%' }}
                animate={{ 
                  width: step === 'review' ? '0%' : 
                         step === 'guests' ? '50%' : '100%' 
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>

        {step !== 'confirmation' && (
          <div className="mt-12 pt-10 border-t border-charcoal/5 flex flex-col sm:flex-row items-center justify-center gap-6 text-[10px] text-charcoal/30 uppercase font-bold tracking-[0.3em]">
            <div className="flex items-center gap-3">
              <ShieldCheck size={16} className="text-amber" />
              Secure 256-bit SSL Encryption
            </div>
            <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-charcoal/10" />
            <div className="flex items-center gap-3">
              <CreditCard size={16} className="text-amber" />
              Trusted Payment Gateway
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
