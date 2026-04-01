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
import { Calendar, MapPin, CreditCard, Clock, ChevronRight, AlertCircle, Filter, X, Info, RotateCcw } from 'lucide-react';
import { formatPrice } from '../../lib/utils';
import { cn } from '../../lib/utils';
import { Modal } from '../../components/ui/Modal';
import { RefundPolicyModal } from '../../components/ui/RefundPolicyModal';
import { EmptyState } from '../../components/ui/EmptyState';
import { Countdown } from '../../components/booking/Countdown';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export const MyBookingsPage = () => {
  const { user } = useJurniAuth();
  const navigate = useNavigate();
  const { cancelBooking, loading: actionLoading } = useBooking();
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = searchParams.get('type');
  const [bookings, setBookings] = useState<(Booking & { listing?: Listing })[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<{ id: string, listingId: string } | null>(null);

  const fetchBookings = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const q = query(
        collection(db, 'bookings'),
        where('userId', '==', user.id),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      const bookingsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Booking));
      
      // Fetch associated listings
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

  const categories = ['Upcoming', 'Completed', 'Cancelled'];

  const filteredBookings = (category: string) => {
    const now = new Date();
    return bookings.filter(b => {
      const matchesCategory = (() => {
        if (category === 'Cancelled') return b.status === 'cancelled';
        if (category === 'Completed') return b.status === 'confirmed' && new Date(b.dates.start) < now;
        return b.status === 'confirmed' && new Date(b.dates.start) >= now;
      })();
      
      const matchesType = typeFilter ? b.listing?.type === typeFilter : true;
      
      return matchesCategory && matchesType;
    });
  };

  const handleCancel = async () => {
    if (!selectedBooking) return;
    
    const { id, listingId } = selectedBooking;
    setCancelModalOpen(false);
    
    try {
      await cancelBooking(id);
      fetchBookings();
      
      toast((t) => (
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">Journey cancelled.</span>
          <button 
            onClick={() => {
              toast.dismiss(t.id);
              // In a real app, we would call an 'undo' API here
              toast.success('Undo requested. Our concierge will contact you.');
            }}
            className="flex items-center gap-1 text-champagne text-xs font-bold uppercase tracking-widest hover:underline"
          >
            <RotateCcw size={14} /> Undo
          </button>
        </div>
      ), { duration: 5000 });
    } catch (err) {
      console.error(err);
    }
  };

  const openCancelModal = (id: string, listingId: string) => {
    setSelectedBooking({ id, listingId });
    setCancelModalOpen(true);
  };

  if (loading) return <LoadingSpinner fullScreen />;

  return (
    <div className="p-4 sm:p-8 lg:p-12 max-w-screen-2xl mx-auto space-y-8 lg:space-y-12">
      <div data-aos="fade-down">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-midnight mb-2">My Bookings</h1>
        <p className="text-sm sm:text-base text-midnight opacity-60 font-light italic">Manage your upcoming and past luxury experiences.</p>
      </div>

      {typeFilter && (
        <div className="flex items-center gap-3 bg-champagne bg-opacity-10 p-3 sm:p-4 rounded-none border border-champagne border-opacity-20 animate-fade-in">
          <Filter size={16} className="text-champagne" />
          <p className="text-xs sm:text-sm font-medium text-midnight">
            Showing <span className="capitalize">{typeFilter}</span> bookings only
          </p>
          <button 
            onClick={() => setSearchParams({})}
            className="ml-auto text-[10px] font-bold uppercase tracking-widest text-midnight opacity-50 hover:opacity-100 flex items-center gap-1"
          >
            Clear Filter <X size={12} />
          </button>
        </div>
      )}

      <Tab.Group>
        <Tab.List className="flex space-x-6 sm:space-x-8 border-b border-midnight border-opacity-10 mb-8 lg:mb-12 overflow-x-auto no-scrollbar">
          {['Upcoming', 'Past', 'Cancelled'].map((category) => (
            <Tab
              key={category}
              className={({ selected }) => cn(
                'pb-3 sm:pb-4 text-base sm:text-lg font-serif transition-all duration-300 focus:outline-none whitespace-nowrap',
                selected ? 'text-champagne border-b-2 border-champagne' : 'text-midnight opacity-40 hover:opacity-100'
              )}
            >
              {category}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels>
          {['Upcoming', 'Past', 'Cancelled'].map((category) => (
            <Tab.Panel key={category} className="space-y-6 lg:space-y-8 animate-fade-in focus:outline-none">
              {filteredBookings(category === 'Past' ? 'Completed' : category).length > 0 ? (
                filteredBookings(category === 'Past' ? 'Completed' : category).map((booking, index) => (
                  <Card key={booking.id} className="flex flex-col lg:flex-row overflow-hidden group rounded-none border-none shadow-lg" data-aos="fade-up" data-aos-delay={index * 100}>
                    <div className="w-full lg:w-80 h-48 sm:h-64 lg:h-auto overflow-hidden relative">
                      <img 
                        src={booking.listing?.images[0] || 'https://images.unsplash.com/photo-1506929194244-8673bb7b9da7'} 
                        alt={booking.listing?.title} 
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent opacity-40" />
                      {category === 'Upcoming' && (
                        <div className="absolute top-4 left-4 bg-midnight/90 backdrop-blur-xl px-4 py-2 rounded-none border border-pearl/10 shadow-2xl">
                          <Countdown targetDate={booking.dates.start} />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 p-5 sm:p-8 flex flex-col justify-between bg-white">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                        <div className="space-y-3 sm:space-y-4 w-full">
                          <div>
                            <div className="flex items-center gap-2 text-midnight opacity-50 text-[9px] sm:text-[10px] uppercase font-bold tracking-widest mb-1">
                              <MapPin size={10} /> {booking.listing?.location}
                            </div>
                            <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif text-midnight leading-tight">{booking.listing?.title}</h3>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 sm:gap-8 pt-2 sm:pt-4">
                            <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-midnight opacity-70">
                              <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-none bg-pearl flex items-center justify-center text-champagne">
                                <Calendar size={14} className="sm:size-[18px]" />
                              </div>
                              <div>
                                <p className="text-[8px] sm:text-[10px] uppercase font-bold opacity-50 tracking-widest">Departure</p>
                                <p className="font-medium">{format(new Date(booking.dates.start), 'MMM dd, yyyy')}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-midnight opacity-70">
                              <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-none bg-pearl flex items-center justify-center text-champagne">
                                <CreditCard size={14} className="sm:size-[18px]" />
                              </div>
                              <div>
                                <p className="text-[8px] sm:text-[10px] uppercase font-bold opacity-50 tracking-widest">Investment</p>
                                <p className="font-medium">{formatPrice(booking.totalPrice)}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start w-full sm:w-auto gap-3">
                          <span className={cn(
                            'px-3 py-1 sm:px-4 sm:py-1.5 rounded-none text-[9px] sm:text-[10px] font-bold uppercase tracking-widest border',
                            booking.status === 'confirmed' ? 'bg-champagne bg-opacity-10 text-midnight border-champagne' : 'bg-rose bg-opacity-10 text-rose border-rose'
                          )}>
                            {booking.status}
                          </span>
                          <p className="text-[9px] sm:text-[10px] text-midnight opacity-40 font-mono uppercase">REF: {booking.id.slice(-8)}</p>
                        </div>
                      </div>

                      <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-midnight border-opacity-5 flex flex-col sm:flex-row gap-4 justify-between items-center">
                        <div className="flex items-center gap-2 text-[10px] sm:text-xs text-midnight opacity-40 italic">
                          <Clock size={12} className="sm:size-3.5" /> Reserved on {format(booking.createdAt?.toDate ? booking.createdAt.toDate() : new Date(), 'MMM dd, yyyy')}
                        </div>
                        <div className="flex flex-wrap gap-2 sm:gap-4 w-full sm:w-auto justify-center sm:justify-end">
                          {booking.status === 'confirmed' && category === 'Upcoming' && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-rose border-rose hover:bg-rose hover:text-pearl transition-all rounded-none text-[10px] sm:text-xs px-3 sm:px-4"
                              onClick={() => openCancelModal(booking.id, booking.listingId)}
                              isLoading={actionLoading}
                            >
                              Cancel Journey
                            </Button>
                          )}
                          <Link to={`/platform/itinerary/${booking.id}`} className="flex-1 sm:flex-none">
                            <Button size="sm" variant="outline" className="w-full flex items-center justify-center gap-2 rounded-none text-[10px] sm:text-xs px-3 sm:px-4">
                              View Itinerary <ChevronRight size={14} />
                            </Button>
                          </Link>
                          <Link to={`/platform/listing/${booking.listingId}`} className="flex-1 sm:flex-none">
                            <Button size="sm" variant="secondary" className="w-full flex items-center justify-center gap-2 rounded-none text-[10px] sm:text-xs px-3 sm:px-4">
                              Experience Details <ChevronRight size={14} />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <EmptyState
                  icon={AlertCircle}
                  title={`No ${category.toLowerCase()} journeys`}
                  message={`Your luxury travel log is empty for this category. Start exploring to write your next chapter.`}
                  actionText="Start Exploring"
                  onAction={() => navigate('/platform/explore')}
                  className="py-16 sm:py-24"
                />
              )}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>

      {/* Cancellation Confirmation Modal */}
      <RefundPolicyModal
        isOpen={cancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
        onConfirm={handleCancel}
        isLoading={actionLoading}
      />
    </div>
  );
};
