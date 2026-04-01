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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="group relative overflow-hidden rounded-3xl border border-midnight border-opacity-5 bg-white shadow-sm transition-all hover:shadow-md">
              <div className="flex flex-col sm:flex-row h-full">
                <div className="h-48 sm:h-auto w-full sm:w-1/3 shrink-0 overflow-hidden">
                  <img 
                    src={listing.images[0]} 
                    alt={listing.title} 
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex flex-col justify-center p-8 sm:p-10 flex-1">
                  <div className="flex items-center gap-2 text-[9px] uppercase font-bold tracking-[0.4em] text-champagne mb-3">
                    <MapPin size={12} /> {listing.location}
                  </div>
                  <h3 className="font-serif text-3xl sm:text-2xl text-midnight mb-2 leading-tight">{listing.title}</h3>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-midnight opacity-40 font-bold uppercase tracking-[0.2em]">{listing.type}</span>
                    <div className="w-1 h-1 rounded-full bg-midnight opacity-20" />
                    <span className="text-[10px] text-midnight opacity-40 font-bold uppercase tracking-[0.2em]">Exclusive Access</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className={cn(
                "p-6 bg-pearl rounded-3xl border border-midnight border-opacity-5 flex items-center gap-5 group/item transition-colors hover:bg-white",
                (listing.type === 'hotel' || listing.type === 'villa') ? "sm:col-span-2" : ""
              )}>
                <div className="h-12 w-12 rounded-full bg-midnight text-pearl flex items-center justify-center transition-transform group-hover/item:scale-110">
                  <Calendar size={20} strokeWidth={1.5} />
                </div>
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <label className="block text-[9px] font-bold uppercase tracking-[0.3em] opacity-40 mb-1">
                      {(listing.type === 'hotel' || listing.type === 'villa') ? 'Check-in' : 'Departure'}
                    </label>
                    <p className="text-midnight font-serif text-xl">{safeFormat(bookingDates.start, 'MMMM dd, yyyy')}</p>
                  </div>
                  {(listing.type === 'hotel' || listing.type === 'villa') && (
                    <div className="hidden sm:block w-px h-8 bg-midnight opacity-10" />
                  )}
                  {(listing.type === 'hotel' || listing.type === 'villa') && (
                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-[0.3em] opacity-40 mb-1">Check-out</label>
                      <p className="text-midnight font-serif text-xl">{safeFormat(bookingDates.end, 'MMMM dd, yyyy')}</p>
                    </div>
                  )}
                  <div className="hidden sm:block w-px h-8 bg-midnight opacity-10" />
                  <div className="text-right">
                    <label className="block text-[9px] font-bold uppercase tracking-[0.3em] opacity-40 mb-1">
                      {numberOfNights > 1 ? `${numberOfNights} Nights` : 'Duration'}
                    </label>
                    <p className="text-midnight font-serif text-xl">{numberOfNights > 1 ? `${numberOfNights} Nights` : '1 Day'}</p>
                  </div>
                </div>
              </div>
              <div className={cn(
                "p-6 bg-pearl rounded-3xl border border-midnight border-opacity-5 flex items-center gap-5 group/item transition-colors hover:bg-white",
                (listing.type === 'hotel' || listing.type === 'villa') ? "sm:col-span-2" : ""
              )}>
                <div className="h-12 w-12 rounded-full bg-midnight text-pearl flex items-center justify-center transition-transform group-hover/item:scale-110">
                  <User size={20} strokeWidth={1.5} />
                </div>
                <div className="flex-1 flex items-center justify-between">
                  <div>
                    <label className="block text-[9px] font-bold uppercase tracking-[0.3em] opacity-40 mb-1">Party Size</label>
                    <p className="text-midnight font-serif text-xl">{passengers} {passengers === 1 ? 'Guest' : 'Guests'}</p>
                  </div>
                  <div className="text-right">
                    <label className="block text-[9px] font-bold uppercase tracking-[0.3em] opacity-40 mb-1">Rate</label>
                    <p className="text-midnight font-serif text-xl">{formatPrice(listing.price)} / {listing.type === 'hotel' || listing.type === 'villa' ? 'night' : 'person'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-8 border-t border-midnight border-opacity-5">
              <div className="flex items-center justify-between px-2">
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Investment Breakdown</span>
                <div className="h-px flex-1 mx-4 bg-midnight opacity-5" />
              </div>
              <div className="bg-pearl rounded-2xl p-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-midnight opacity-60">Base Price ({formatPrice(listing.price)} x {passengers} {passengers > 1 ? 'Guests' : 'Guest'})</span>
                  <span className="text-midnight font-medium">{formatPrice(listing.price * passengers)}</span>
                </div>
                {numberOfNights > 1 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-midnight opacity-60">Duration ({numberOfNights} Nights)</span>
                    <span className="text-midnight font-medium">x {numberOfNights}</span>
                  </div>
                )}
                <div className="h-px w-full bg-midnight opacity-10 my-2" />
                <div className="flex justify-between items-center pt-2">
                  <span className="text-xl font-serif text-midnight">Total Amount</span>
                  <span className="text-2xl font-serif text-champagne font-bold">{formatPrice(totalPrice)}</span>
                </div>
              </div>
            </div>

            <div className="bg-champagne bg-opacity-5 p-5 rounded-2xl flex gap-4 border border-champagne border-opacity-10">
              <Info size={20} className="text-champagne shrink-0" />
              <p className="text-xs text-midnight opacity-70 leading-relaxed italic">
                Your journey is protected. Free cancellation until 48 hours before the experience starts. Full refund guaranteed.
              </p>
            </div>

            <Button 
              className="w-full py-5 rounded-xl text-lg font-serif shadow-2xl shadow-midnight/10 hover:scale-[1.02] transition-transform" 
              onClick={handleNext}
            >
              Continue to Guest Details
              <ChevronRight size={20} className="ml-2" />
            </Button>
          </motion.div>
        );

      case 'guests':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="space-y-8">
              <div className="p-8 bg-white rounded-[2rem] border border-midnight border-opacity-5 shadow-sm space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 ml-2">
                    <div className="h-8 w-8 rounded-full bg-midnight text-pearl flex items-center justify-center">
                      <User size={16} strokeWidth={1.5} />
                    </div>
                    <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-midnight opacity-40">Primary Guest</label>
                  </div>
                  <input 
                    type="text"
                    value={guestDetails.name}
                    onChange={(e) => setGuestDetails({ ...guestDetails, name: e.target.value })}
                    placeholder="Full name as on passport"
                    className="w-full bg-pearl border border-midnight border-opacity-5 rounded-2xl py-5 px-8 focus:outline-none focus:border-champagne focus:bg-white transition-all text-midnight font-serif text-xl placeholder:opacity-30 shadow-inner"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="block text-[10px] font-bold uppercase tracking-[0.4em] text-midnight opacity-40 ml-2">Email Address</label>
                    <input 
                      type="email"
                      value={guestDetails.email}
                      onChange={(e) => setGuestDetails({ ...guestDetails, email: e.target.value })}
                      placeholder="For your itinerary"
                      className="w-full bg-pearl border border-midnight border-opacity-5 rounded-2xl py-5 px-8 focus:outline-none focus:border-champagne focus:bg-white transition-all text-midnight font-serif text-xl placeholder:opacity-30 shadow-inner"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="block text-[10px] font-bold uppercase tracking-[0.4em] text-midnight opacity-40 ml-2">Phone Number</label>
                    <input 
                      type="tel"
                      value={guestDetails.phone}
                      onChange={(e) => setGuestDetails({ ...guestDetails, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-pearl border border-midnight border-opacity-5 rounded-2xl py-5 px-8 focus:outline-none focus:border-champagne focus:bg-white transition-all text-midnight font-serif text-xl placeholder:opacity-30 shadow-inner"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.4em] text-midnight opacity-40 ml-2">Special Requests (Optional)</label>
                  <textarea 
                    value={guestDetails.specialRequests}
                    onChange={(e) => setGuestDetails({ ...guestDetails, specialRequests: e.target.value })}
                    placeholder="Dietary requirements, accessibility needs, or special occasions..."
                    rows={4}
                    className="w-full bg-pearl border border-midnight border-opacity-5 rounded-2xl py-5 px-8 focus:outline-none focus:border-champagne focus:bg-white transition-all text-midnight font-serif text-xl placeholder:opacity-30 shadow-inner resize-none"
                  />
                </div>
              </div>

              <div className="p-6 bg-champagne bg-opacity-5 rounded-2xl flex gap-4 border border-champagne border-opacity-10">
                <ShieldCheck size={20} className="text-champagne shrink-0" />
                <p className="text-xs text-midnight opacity-70 leading-relaxed italic">
                  Your privacy is our priority. Your details are shared only with your host to ensure a seamless experience.
                </p>
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-4 pt-4">
              <Button 
                variant="outline" 
                className="w-full sm:flex-1 py-5 rounded-xl text-lg font-serif hover:bg-midnight hover:text-pearl transition-all" 
                onClick={handleBack}
              >
                <ChevronLeft size={20} className="mr-2" />
                Back
              </Button>
              <Button 
                className="w-full sm:flex-[2] py-5 rounded-xl text-lg font-serif shadow-2xl shadow-midnight/10 hover:scale-[1.02] transition-transform" 
                onClick={handleNext}
                disabled={!guestDetails.name || !guestDetails.email || !guestDetails.phone}
              >
                Continue to Payment
                <ChevronRight size={20} className="ml-2" />
              </Button>
            </div>
          </motion.div>
        );

      case 'payment':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="space-y-8">
              <div className="p-10 bg-pearl rounded-[2.5rem] border border-champagne border-opacity-20 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-champagne opacity-[0.03] rounded-full -mr-32 -mt-32" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-midnight opacity-[0.02] rounded-full -ml-24 -mb-24" />
                
                <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                  <div className="h-20 w-20 rounded-full bg-white shadow-xl shadow-champagne/10 flex items-center justify-center border border-champagne border-opacity-10 mb-2">
                    <ShieldCheck size={40} className="text-champagne" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-serif text-midnight mb-1">Secure Checkout</h3>
                    <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-midnight opacity-30">
                      Encrypted & Protected Payment
                    </p>
                  </div>
                  <div className="flex items-center gap-6 pt-4 opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700">
                    <CreditCard size={24} className="text-midnight" />
                    <div className="w-px h-4 bg-midnight opacity-20" />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-midnight">PCI DSS Compliant</span>
                    <div className="w-px h-4 bg-midnight opacity-20" />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-midnight">SSL Secure</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="block text-[9px] font-bold uppercase tracking-[0.3em] opacity-40 ml-2">Cardholder Name</label>
                  <input 
                    type="text"
                    value={paymentDetails.nameOnCard}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, nameOnCard: e.target.value })}
                    placeholder="As it appears on your card"
                    className="w-full bg-pearl border border-midnight border-opacity-5 rounded-2xl py-5 px-8 focus:outline-none focus:border-champagne focus:bg-white transition-all text-midnight font-serif text-xl placeholder:opacity-30 shadow-inner"
                  />
                </div>
                <div className="space-y-3">
                  <label className="block text-[9px] font-bold uppercase tracking-[0.3em] opacity-40 ml-2">Card Number</label>
                  <div className="relative">
                    <input 
                      type="text"
                      value={paymentDetails.cardNumber}
                      onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
                      placeholder="0000 0000 0000 0000"
                      className="w-full bg-pearl border border-midnight border-opacity-5 rounded-2xl py-5 px-8 focus:outline-none focus:border-champagne focus:bg-white transition-all text-midnight font-serif text-xl placeholder:opacity-30 shadow-inner"
                    />
                    <CreditCard size={24} className="absolute right-8 top-1/2 -translate-y-1/2 text-midnight opacity-20" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="block text-[9px] font-bold uppercase tracking-[0.3em] opacity-40 ml-2">Expiry Date</label>
                    <input 
                      type="text"
                      value={paymentDetails.expiry}
                      onChange={(e) => setPaymentDetails({ ...paymentDetails, expiry: e.target.value })}
                      placeholder="MM / YY"
                      className="w-full bg-pearl border border-midnight border-opacity-5 rounded-2xl py-5 px-8 focus:outline-none focus:border-champagne focus:bg-white transition-all text-midnight font-serif text-xl placeholder:opacity-30 shadow-inner"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="block text-[9px] font-bold uppercase tracking-[0.3em] opacity-40 ml-2">CVC</label>
                    <input 
                      type="text"
                      value={paymentDetails.cvc}
                      onChange={(e) => setPaymentDetails({ ...paymentDetails, cvc: e.target.value })}
                      placeholder="123"
                      className="w-full bg-pearl border border-midnight border-opacity-5 rounded-2xl py-5 px-8 focus:outline-none focus:border-champagne focus:bg-white transition-all text-midnight font-serif text-xl placeholder:opacity-30 shadow-inner"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4">
                <div className="relative flex items-center mt-1">
                  <input 
                    type="checkbox" 
                    id="terms"
                    checked={isAgreed}
                    onChange={(e) => setIsAgreed(e.target.checked)}
                    className="h-6 w-6 rounded-lg border border-midnight border-opacity-20 text-champagne focus:ring-champagne transition-colors cursor-pointer"
                  />
                </div>
                <label htmlFor="terms" className="text-xs text-midnight opacity-60 leading-relaxed cursor-pointer select-none">
                  I have read and agree to JURNİ's <span className="text-midnight font-bold underline decoration-champagne decoration-2 underline-offset-4">Terms of Service</span>, <span className="text-midnight font-bold underline decoration-champagne decoration-2 underline-offset-4">Cancellation Policy</span>, and <span className="text-midnight font-bold underline decoration-champagne decoration-2 underline-offset-4">Privacy Policy</span>.
                </label>
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-4 pt-4">
              <Button 
                variant="outline" 
                className="w-full sm:flex-1 py-5 rounded-xl text-lg font-serif hover:bg-midnight hover:text-pearl transition-all" 
                onClick={handleBack}
              >
                <ChevronLeft size={20} className="mr-2" />
                Back
              </Button>
              <Button 
                className="w-full sm:flex-[2] py-5 rounded-xl text-lg font-serif shadow-2xl shadow-midnight/10 hover:scale-[1.02] transition-transform" 
                onClick={handleConfirmBooking}
                disabled={!isAgreed || !paymentDetails.cardNumber || loading}
                isLoading={loading}
              >
                Complete Booking • {formatPrice(totalPrice)}
              </Button>
            </div>
          </motion.div>
        );

      case 'confirmation':
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative overflow-hidden"
          >
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-champagne opacity-[0.03] rounded-full blur-3xl" />
              <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-midnight opacity-[0.02] rounded-full blur-3xl" />
            </div>

            <div className="text-center space-y-12 py-12 px-4 relative z-10">
              {/* Floating Particles */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 100, x: Math.random() * 400 - 200 }}
                    animate={{ 
                      opacity: [0, 1, 0], 
                      y: -200, 
                      x: (Math.random() * 400 - 200) + (Math.sin(i) * 50)
                    }}
                    transition={{ 
                      duration: 3 + Math.random() * 2, 
                      repeat: Infinity, 
                      delay: i * 0.5,
                      ease: "easeOut"
                    }}
                    className="absolute bottom-0 left-1/2 w-1 h-1 bg-champagne rounded-full"
                  />
                ))}
              </div>

              <div className="flex justify-center">
                <motion.div 
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", damping: 15, stiffness: 150, delay: 0.2 }}
                  className="h-24 w-24 rounded-full bg-midnight flex items-center justify-center text-champagne shadow-2xl relative"
                >
                  <div className="absolute inset-0 rounded-full border border-champagne border-opacity-20 animate-ping opacity-20" />
                  <CheckCircle2 size={48} strokeWidth={1.5} />
                </motion.div>
              </div>
              
              <div className="space-y-4 max-w-lg mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-champagne mb-4 block">Reservation Confirmed</span>
                  <h2 className="text-5xl sm:text-6xl font-serif text-midnight leading-tight">Journey Secured</h2>
                </motion.div>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-lg text-midnight opacity-60 font-light leading-relaxed"
                >
                  Your luxury experience at <span className="font-serif italic text-midnight opacity-100">{listing.title}</span> has been successfully reserved. A digital itinerary has been sent to your email.
                </motion.p>
              </div>

              {/* Premium Ticket Card */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, type: "spring", damping: 20 }}
                className="max-w-md mx-auto relative group"
              >
                <div className="absolute inset-0 bg-midnight rounded-[2rem] transform rotate-1 group-hover:rotate-0 transition-transform duration-500 -z-10 opacity-5 shadow-2xl" />
                <div className="bg-white p-8 sm:p-10 rounded-[2rem] border border-midnight border-opacity-5 shadow-xl relative overflow-hidden">
                  {/* Ticket Notches */}
                  <div className="absolute top-1/2 -left-4 w-8 h-8 bg-pearl rounded-full -translate-y-1/2 border border-midnight border-opacity-5 shadow-inner" />
                  <div className="absolute top-1/2 -right-4 w-8 h-8 bg-pearl rounded-full -translate-y-1/2 border border-midnight border-opacity-5 shadow-inner" />
                  
                  {/* Vertical Rail Text */}
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 h-32 flex items-center pointer-events-none">
                    <span className="writing-mode-vertical text-[8px] font-bold uppercase tracking-[0.3em] text-midnight opacity-10 transform rotate-180">
                      JURNİ EXCLUSIVE • {new Date().getFullYear()}
                    </span>
                  </div>

                  <div className="space-y-8 relative z-10">
                    <div className="flex justify-between items-start">
                      <div className="text-left">
                        <span className="block text-[9px] font-bold uppercase tracking-widest text-midnight opacity-30 mb-1">Primary Guest</span>
                        <span className="font-serif text-xl text-midnight block">{guestDetails.name}</span>
                        <span className="text-[10px] text-midnight opacity-40 block mt-1">{guestDetails.email}</span>
                        <span className="text-[10px] text-midnight opacity-40 block">{guestDetails.phone}</span>
                      </div>
                      <div className="text-right">
                        <span className="block text-[9px] font-bold uppercase tracking-widest text-midnight opacity-30 mb-1">Reference</span>
                        <span className="font-mono font-bold text-midnight text-sm tracking-wider">{referenceNumber}</span>
                      </div>
                    </div>

                    <div className="h-[1px] w-full border-t border-dashed border-midnight border-opacity-10" />

                    <div className="grid grid-cols-2 gap-y-8 gap-x-12">
                      <div className="text-left">
                        <span className="block text-[9px] font-bold uppercase tracking-widest text-midnight opacity-30 mb-1">
                          {(listing.type === 'hotel' || listing.type === 'villa') ? 'Check-in' : 'Departure'}
                        </span>
                        <span className="font-serif text-base text-midnight">{safeFormat(bookingDates.start, 'MMM dd, yyyy')}</span>
                      </div>
                      <div className="text-right">
                        <span className="block text-[9px] font-bold uppercase tracking-widest text-midnight opacity-30 mb-1">
                          {(listing.type === 'hotel' || listing.type === 'villa') ? 'Check-out' : 'Duration'}
                        </span>
                        <span className="font-serif text-base text-midnight">
                          {(listing.type === 'hotel' || listing.type === 'villa') ? safeFormat(bookingDates.end, 'MMM dd, yyyy') : '1 Day'}
                        </span>
                      </div>
                      <div className="text-left">
                        <span className="block text-[9px] font-bold uppercase tracking-widest text-midnight opacity-30 mb-1">Party Size</span>
                        <span className="font-serif text-base text-midnight">{passengers} {passengers > 1 ? 'Guests' : 'Guest'}</span>
                      </div>
                      <div className="text-right">
                        <span className="block text-[9px] font-bold uppercase tracking-widest text-midnight opacity-30 mb-1">Total Investment</span>
                        <span className="font-serif text-xl text-champagne font-bold">{formatPrice(totalPrice)}</span>
                      </div>
                    </div>

                    <div className="pt-4 flex items-center justify-between opacity-20">
                      <div className="flex gap-1">
                        {[...Array(20)].map((_, i) => (
                          <div key={i} className="w-1 h-4 bg-midnight rounded-full" />
                        ))}
                      </div>
                      <span className="text-[8px] font-bold uppercase tracking-[0.2em]">Verified Luxury</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto pt-8"
              >
                <Button 
                  className="flex-1 py-5 rounded-xl text-lg font-serif shadow-2xl shadow-midnight/10 hover:scale-[1.02] transition-transform" 
                  onClick={() => navigate('/platform/bookings')}
                >
                  Manage Bookings
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 py-5 rounded-xl text-lg font-serif hover:bg-midnight hover:text-pearl transition-all" 
                  onClick={onClose}
                >
                  Explore More
                </Button>
              </motion.div>
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
                      "h-10 w-10 sm:h-12 sm:w-12 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 border-2",
                      isActive ? "bg-midnight text-pearl border-midnight scale-110 shadow-lg" : 
                      isCompleted ? "bg-champagne text-midnight border-champagne" : 
                      "bg-pearl text-midnight opacity-30 border-midnight border-opacity-10"
                    )}>
                      {isCompleted ? <CheckCircle2 size={20} /> : i + 1}
                    </div>
                    <span className={cn(
                      "text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] transition-opacity duration-500",
                      isActive ? "opacity-100 text-midnight" : "opacity-30 text-midnight"
                    )}>
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>
            {/* Progress Line */}
            <div className="absolute top-5 sm:top-6 left-0 w-full h-[1px] bg-midnight bg-opacity-5 -z-0">
              <motion.div 
                className="h-full bg-champagne"
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
          <div className="mt-10 pt-8 border-t border-midnight border-opacity-5 flex flex-col sm:flex-row items-center justify-center gap-4 text-[10px] text-midnight opacity-40 uppercase font-bold tracking-[0.2em]">
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} />
              Secure 256-bit SSL Encryption
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-midnight opacity-20" />
            <div className="flex items-center gap-2">
              <CreditCard size={14} />
              Trusted Payment Gateway
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
