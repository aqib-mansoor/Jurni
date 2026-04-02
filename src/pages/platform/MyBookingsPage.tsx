import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, orderBy, doc, getDoc } from 'firebase/firestore';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { Booking, Listing } from '../../types';
import { useJurniAuth } from '../../hooks/useJurniAuth';
import { useBooking } from '../../hooks/useBooking';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { Tab } from '@headlessui/react';
import { Calendar, MapPin, CreditCard, Clock, ChevronRight, AlertCircle, Filter, X, Info, RotateCcw, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { formatPrice } from '../../lib/utils';
import { cn } from '../../lib/utils';
import { Modal } from '../../components/ui/Modal';
import { RefundPolicyModal } from '../../components/ui/RefundPolicyModal';
import { EmptyState } from '../../components/ui/EmptyState';
import { Countdown } from '../../components/booking/Countdown';
import { ItineraryModal } from '../../components/booking/ItineraryModal';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'motion/react';

export const MyBookingsPage = () => {
  const { user } = useJurniAuth();
  const navigate = useNavigate();
  const { cancelBooking, loading: actionLoading } = useBooking();
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = searchParams.get('type');
  const [bookings, setBookings] = useState<(Booking & { listing?: Listing })[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<(Booking & { listing?: Listing }) | null>(null);
  const [isItineraryOpen, setIsItineraryOpen] = useState(false);

  const fetchBookings = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const q = query(
        collection(db, 'bookings'),
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      const bookingsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Booking));
      
      const fullBookings = await Promise.all(bookingsData.map(async (booking) => {
        const listingDoc = await getDoc(doc(db, 'listings', booking.listingId));
        return { ...booking, listing: listingDoc.exists() ? { id: listingDoc.id, ...listingDoc.data() } as Listing : undefined };
      }));
      
      setBookings(fullBookings);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [user]);

  const categories = ['Upcoming', 'Past', 'Cancelled'];

  const filteredBookings = (category: string) => {
    const now = new Date();
    return bookings.filter(b => {
      const matchesCategory = (() => {
        if (category === 'Cancelled') return b.status === 'cancelled';
        if (category === 'Past') return (b.status === 'confirmed' && new Date(b.dates.start) < now);
        return b.status === 'confirmed' && new Date(b.dates.start) >= now;
      })();
      
      const matchesType = typeFilter ? b.listing?.type === typeFilter : true;
      
      return matchesCategory && matchesType;
    });
  };

  const handleCancel = async () => {
    if (!selectedBooking) return;
    const { id } = selectedBooking;
    setCancelModalOpen(false);
    try {
      await cancelBooking(id);
      fetchBookings();
      toast.success('Journey cancelled successfully');
    } catch (err) {
      console.error(err);
    }
  };

  const handleViewItinerary = (booking: Booking & { listing?: Listing }) => {
    setSelectedBooking(booking);
    setIsItineraryOpen(true);
  };

  if (loading) return <LoadingSpinner fullScreen />;

  return (
    <div className="bg-pearl min-h-screen pb-24">
      {/* Header */}
      <header className="px-6 pt-12 pb-8 space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-1 w-12 bg-champagne rounded-full" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-midnight/40">Your Collection</span>
        </div>
        <h1 className="text-4xl lg:text-6xl font-serif text-midnight tracking-tight">Masterpiece Journeys</h1>
        <p className="text-sm lg:text-base text-midnight/50 font-light max-w-2xl leading-relaxed">
          A curated chronicle of your past explorations and the extraordinary journeys that await your arrival.
        </p>
      </header>

      <Tab.Group>
        <Tab.List className="flex px-6 gap-8 border-b border-midnight/5 mb-8 overflow-x-auto no-scrollbar">
          {categories.map((category) => (
            <Tab
              key={category}
              className={({ selected }) => cn(
                "pb-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-all relative focus:outline-none",
                selected ? "text-midnight" : "text-midnight/30 hover:text-midnight/60"
              )}
            >
              {({ selected }) => (
                <>
                  {category}
                  {selected && (
                    <motion.div 
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-champagne"
                    />
                  )}
                </>
              )}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels className="px-6">
          {categories.map((category) => {
            const items = filteredBookings(category);
            return (
              <Tab.Panel key={category} className="space-y-6 focus:outline-none">
                <AnimatePresence mode="popLayout">
                  {items.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {items.map((booking, index) => (
                        <motion.div
                          key={booking.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ delay: index * 0.1 }}
                          className="group bg-white rounded-[32px] overflow-hidden border border-midnight/5 shadow-card hover:shadow-2xl hover:shadow-midnight/5 transition-all duration-700"
                        >
                          <div className="flex flex-col md:flex-row h-full">
                            {/* Image Section */}
                            <div className="relative w-full md:w-48 h-48 md:h-auto overflow-hidden">
                              <img 
                                src={booking.listing?.images[0] || `https://picsum.photos/seed/${booking.listingId}/800/600?travel`}
                                alt={booking.listing?.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 to-transparent" />
                              <div className="absolute top-4 left-4">
                                <span className={cn(
                                  "px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest shadow-xl backdrop-blur-md border border-white/20",
                                  booking.status === 'confirmed' ? "bg-green-500/80 text-white" : "bg-rose/80 text-white"
                                )}>
                                  {booking.status}
                                </span>
                              </div>
                            </div>

                            {/* Content Section */}
                            <div className="flex-1 p-6 lg:p-8 flex flex-col justify-between space-y-6">
                              <div className="space-y-4">
                                <div className="flex justify-between items-start">
                                  <div className="space-y-1">
                                    <h3 className="text-xl font-serif text-midnight group-hover:text-champagne transition-colors duration-500">
                                      {booking.listing?.title}
                                    </h3>
                                    <div className="flex items-center gap-1.5 text-midnight/40">
                                      <MapPin size={12} />
                                      <span className="text-[10px] font-medium tracking-wide">{booking.listing?.location}</span>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-[10px] text-midnight/30 uppercase tracking-widest font-bold">Total</p>
                                    <p className="text-sm font-bold text-midnight">{formatPrice(booking.totalPrice)}</p>
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 py-4 border-y border-midnight/5">
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-1.5 text-midnight/30">
                                      <Calendar size={12} />
                                      <span className="text-[9px] font-bold uppercase tracking-widest">Dates</span>
                                    </div>
                                    <p className="text-[11px] font-bold text-midnight">
                                      {format(new Date(booking.dates.start), 'MMM dd')} - {format(new Date(booking.dates.end), 'MMM dd')}
                                    </p>
                                  </div>
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-1.5 text-midnight/30">
                                      <Clock size={12} />
                                      <span className="text-[9px] font-bold uppercase tracking-widest">Status</span>
                                    </div>
                                    <p className="text-[11px] font-bold text-midnight capitalize">{booking.status}</p>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center justify-between pt-2">
                                <div className="flex items-center gap-2">
                                  <ShieldCheck size={16} className="text-champagne" />
                                  <span className="text-[10px] font-bold uppercase tracking-widest text-midnight/40">Verified Journey</span>
                                </div>
                                <div className="flex gap-4">
                                  {category === 'Upcoming' && booking.status === 'confirmed' && (
                                    <button 
                                      onClick={() => {
                                        setSelectedBooking(booking);
                                        setCancelModalOpen(true);
                                      }}
                                      className="text-[10px] font-bold uppercase tracking-widest text-rose/60 hover:text-rose transition-colors"
                                    >
                                      Cancel
                                    </button>
                                  )}
                                  <button 
                                    onClick={() => handleViewItinerary(booking)}
                                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-midnight hover:text-champagne transition-all group/btn"
                                  >
                                    View Masterpiece
                                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="py-24 flex flex-col items-center text-center space-y-8"
                    >
                      <div className="relative">
                        <div className="absolute -inset-8 bg-champagne/10 rounded-full blur-3xl animate-pulse" />
                        <div className="relative h-32 w-32 rounded-[40px] bg-midnight/5 border border-midnight/5 flex items-center justify-center text-midnight/10">
                          <Calendar size={64} strokeWidth={1} />
                        </div>
                      </div>
                      <div className="space-y-3 max-w-md">
                        <h3 className="text-2xl font-serif text-midnight">A Blank Canvas Awaits</h3>
                        <p className="text-sm text-midnight/40 font-light leading-relaxed">
                          Your {category.toLowerCase()} journey history is currently empty. Every masterpiece begins with a single step towards the extraordinary.
                        </p>
                      </div>
                      <Button 
                        className="bg-midnight text-champagne px-10 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest shadow-2xl shadow-midnight/20 hover:scale-105 transition-all"
                        onClick={() => navigate('/platform/explore')}
                      >
                        Begin Your Journey
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Tab.Panel>
            );
          })}
        </Tab.Panels>
      </Tab.Group>

      {selectedBooking && (
        <ItineraryModal 
          isOpen={isItineraryOpen} 
          onClose={() => setIsItineraryOpen(false)} 
          booking={selectedBooking} 
        />
      )}

      <RefundPolicyModal
        isOpen={cancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
        onConfirm={handleCancel}
        isLoading={actionLoading}
      />
    </div>
  );
};
