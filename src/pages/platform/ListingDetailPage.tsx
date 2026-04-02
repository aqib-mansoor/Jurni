import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { Listing, Review } from '../../types';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { Star, MapPin, Check, Calendar, Users, ShieldCheck, ChevronLeft, Heart, Share2, Maximize2, X, Sparkles, ChevronRight, Info, Clock } from 'lucide-react';
import { useBooking } from '../../hooks/useBooking';
import { useAvailability } from '../../hooks/useAvailability';
import { useJurniAuth } from '../../hooks/useJurniAuth';
import { formatPrice, cn } from '../../lib/utils';
import { format } from 'date-fns';
import { BookingModal } from '../../components/booking/BookingModal';
import { Modal } from '../../components/ui/Modal';
import { ShareModal } from '../../components/ui/ShareModal';
import { PriceBreakdown } from '../../components/ui/PriceBreakdown';
import { CustomDatePicker } from '../../components/ui/DatePicker';
import { GuestSelector } from '../../components/ui/GuestSelector';
import { RatingStars } from '../../components/ui/RatingStars';
import toast from 'react-hot-toast';

export const ListingDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, toggleWishlist } = useJurniAuth();
  const [listing, setListing] = useState<Listing | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const { bookListing, loading: bookingLoading } = useBooking();
  const { availability, isLowStock } = useAvailability(id || '');

  const [travelDate, setTravelDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [guestCounts, setGuestCounts] = useState({ adults: 1, children: 0, infants: 0 });
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, 'listings', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setListing({ id: docSnap.id, ...docSnap.data() } as Listing);
          
          // Fetch reviews
          const reviewsQ = query(collection(db, 'reviews'), where('listingId', '==', id));
          const reviewsSnap = await getDocs(reviewsQ);
          setReviews(reviewsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Review)));
        } else {
          navigate('/platform/explore');
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleBooking = () => {
    if (!listing) return;
    setIsBookingModalOpen(true);
  };

  const handleShare = () => {
    setIsShareModalOpen(true);
  };

  if (loading || !listing) return <LoadingSpinner fullScreen />;

  return (
    <>
      <div className="bg-pearl min-h-screen pb-24 pt-20 md:pt-24">
        {/* Image Gallery - Bento Grid Style */}
        <div className="max-w-screen-2xl mx-auto px-4 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-3 md:gap-4 h-[50vh] md:h-[65vh]">
            <div className="md:col-span-2 md:row-span-2 relative overflow-hidden rounded-2xl md:rounded-[32px] shadow-lg group">
              <img 
                src={listing.images[0]} 
                alt={listing.title} 
                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/40 to-transparent opacity-60" />
              <button 
                onClick={() => navigate(-1)} 
                className="absolute top-6 left-6 h-10 w-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-midnight transition-all duration-500 z-10"
              >
                <ChevronLeft size={20} />
              </button>
            </div>
            
            <div className="hidden md:block relative overflow-hidden rounded-[24px] shadow-md group">
              <img src={listing.images[1] || listing.images[0]} alt="" className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-midnight/10 group-hover:bg-transparent transition-colors" />
            </div>
            
            <div className="hidden md:block relative overflow-hidden rounded-[24px] shadow-md group">
              <img src={listing.images[2] || listing.images[0]} alt="" className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-midnight/10 group-hover:bg-transparent transition-colors" />
            </div>
            
            <div className="hidden md:block relative overflow-hidden rounded-[24px] shadow-md group">
              <img src={listing.images[3] || listing.images[0]} alt="" className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-midnight/10 group-hover:bg-transparent transition-colors" />
            </div>
            
            <div className="hidden md:block relative overflow-hidden rounded-[24px] shadow-md group">
              <img src={listing.images[4] || listing.images[0]} alt="" className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-midnight/20 group-hover:bg-transparent transition-colors flex items-center justify-center">
                <button 
                  onClick={() => setIsLightboxOpen(true)}
                  className="bg-white/90 backdrop-blur-md text-midnight px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-xl hover:bg-white transition-all"
                >
                  View All Photos
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-screen-2xl mx-auto px-4 md:px-12 mt-8 md:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-12 md:space-y-16">
            <section className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-rose font-bold text-[9px] tracking-[0.3em] uppercase">{listing.type}</span>
                    <div className="h-1 w-1 rounded-full bg-midnight/10" />
                    <RatingStars rating={listing.rating} showCount count={listing.reviewsCount} />
                  </div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-midnight leading-tight tracking-tight">{listing.title}</h1>
                  <div className="flex items-center gap-2 text-midnight/50 text-sm">
                    <MapPin size={16} className="text-champagne" />
                    {listing.location}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={handleShare} className="h-10 w-10 rounded-xl border border-midnight/5 flex items-center justify-center text-midnight/40 hover:text-midnight hover:bg-midnight/5 transition-all">
                    <Share2 size={18} />
                  </button>
                  <button 
                    onClick={() => toggleWishlist(listing.id)} 
                    className={cn(
                      "h-10 w-10 rounded-xl border flex items-center justify-center transition-all",
                      user?.wishlist?.includes(listing.id) ? "border-rose/20 bg-rose/5 text-rose" : "border-midnight/5 text-midnight/40 hover:text-rose"
                    )}
                  >
                    <Heart size={18} className={user?.wishlist?.includes(listing.id) ? "fill-current" : ""} />
                  </button>
                </div>
              </div>
              
              <div className="h-px w-full bg-midnight/5" />
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-2">
                {[
                  { label: 'Guests', value: listing.availability?.totalSeats || 10, icon: Users },
                  { label: 'Rating', value: listing.rating, icon: Star },
                  { label: 'Verified', value: 'Elite', icon: ShieldCheck },
                  { label: 'Type', value: listing.type, icon: MapPin }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-midnight/5 flex items-center justify-center text-midnight/40">
                      <item.icon size={16} />
                    </div>
                    <div>
                      <p className="text-[8px] uppercase font-bold tracking-widest text-midnight/30">{item.label}</p>
                      <p className="text-xs font-bold text-midnight">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="h-px w-full bg-midnight/5" />
            </section>

            <section className="space-y-6">
              <h2 className="text-xl md:text-2xl font-serif text-midnight tracking-tight">The Experience</h2>
              <p className="text-base text-midnight/70 leading-relaxed font-normal max-w-3xl">
                {listing.description}
              </p>
            </section>

            <section className="space-y-8">
              <h2 className="text-xl md:text-2xl font-serif text-midnight tracking-tight">Amenities & Services</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
                {listing.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-3 group">
                    <div className="h-8 w-8 rounded-lg bg-pearl border border-midnight/5 flex items-center justify-center text-champagne group-hover:bg-midnight group-hover:text-champagne transition-all duration-500 shadow-sm">
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <span className="text-sm font-medium text-midnight/70 tracking-tight">{amenity}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="p-8 md:p-10 bg-midnight rounded-[32px] text-pearl relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-champagne/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
              <div className="relative z-10 space-y-8">
                <div className="space-y-2">
                  <span className="text-champagne font-bold text-[9px] tracking-[0.3em] uppercase">Exclusive Privileges</span>
                  <h2 className="text-2xl md:text-3xl font-serif tracking-tight">What's Included</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    'Private Concierge 24/7',
                    'VIP Airport Transfer',
                    'Curated Local Experiences',
                    'Elite Insurance Coverage',
                    'Welcome Champagne Service',
                    'Flexible Check-in/out'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Sparkles size={14} className="text-champagne" />
                      <span className="text-sm font-light text-pearl/70">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="space-y-10">
              <div className="flex items-center justify-between">
                <h2 className="text-xl md:text-2xl font-serif text-midnight tracking-tight">Client Reviews</h2>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-champagne fill-current" />
                  <span className="text-sm font-bold text-midnight">{listing.rating}</span>
                  <span className="text-midnight/30 text-sm">•</span>
                  <span className="text-sm font-medium text-midnight/50">{listing.reviewsCount} reviews</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div key={review.id} className="bg-white p-6 rounded-[24px] border border-midnight/5 shadow-sm hover:shadow-md transition-all">
                      <div className="flex items-center gap-3 mb-4">
                        <img 
                          src={review.userAvatar || `https://i.pravatar.cc/150?u=${review.userId}`} 
                          alt={review.userName} 
                          className="h-10 w-10 rounded-full border border-midnight/5" 
                          referrerPolicy="no-referrer" 
                        />
                        <div>
                          <h4 className="font-bold text-xs text-midnight tracking-tight">{review.userName}</h4>
                          <p className="text-[8px] text-midnight/30 font-bold uppercase tracking-widest mt-0.5">{new Date(review.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
                        </div>
                      </div>
                      <p className="text-sm text-midnight/60 leading-relaxed italic">
                        "{review.comment}"
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 text-center py-12 bg-midnight/5 rounded-[24px] border border-dashed border-midnight/10">
                    <p className="text-midnight/30 italic font-serif">No reviews yet for this masterpiece.</p>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Booking Widget - Desktop Sidebar */}
          <div className="hidden lg:block lg:col-span-4 relative">
            <div className="sticky top-32">
              <div className="bg-white p-8 rounded-[32px] shadow-card border border-midnight/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-champagne" />
                
                <div className="flex justify-between items-end mb-8">
                  <div>
                    <span className="text-3xl font-bold text-midnight tracking-tighter">{formatPrice(listing.price)}</span>
                    <span className="text-midnight/40 text-[9px] uppercase tracking-[0.2em] font-bold block mt-1"> / exclusive night</span>
                  </div>
                  {isLowStock && (
                    <div className="bg-rose/10 text-rose text-[8px] font-bold uppercase px-3 py-1 rounded-full border border-rose/20">
                      High Demand
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="block text-[8px] font-bold uppercase tracking-[0.2em] text-midnight/40 ml-1">Dates</label>
                      <CustomDatePicker
                        startDate={travelDate}
                        endDate={endDate}
                        selectsRange={listing.type === 'hotel' || listing.type === 'villa'}
                        onChange={(dates: any) => {
                          if (listing.type === 'hotel' || listing.type === 'villa') {
                            const [start, end] = dates;
                            setTravelDate(start);
                            setEndDate(end);
                          } else {
                            setTravelDate(dates);
                            setEndDate(dates);
                          }
                        }}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[8px] font-bold uppercase tracking-[0.2em] text-midnight/40 ml-1">Guests</label>
                      <GuestSelector
                        counts={guestCounts}
                        onChange={setGuestCounts}
                        maxGuests={listing.availability?.totalSeats || 10}
                      />
                    </div>
                  </div>

                  <div className="bg-midnight/5 p-5 rounded-2xl border border-midnight/5">
                    <PriceBreakdown
                      pricePerNight={listing.price}
                      nights={travelDate && endDate ? Math.max(1, Math.ceil((endDate.getTime() - travelDate.getTime()) / (1000 * 60 * 60 * 24))) : 1}
                      serviceFee={listing.price * 0.1}
                      cleaningFee={50}
                      taxes={listing.price * 0.05}
                    />
                  </div>

                  <Button 
                    className="w-full py-4 text-xs font-bold uppercase tracking-[0.2em] shadow-xl shadow-champagne/10 rounded-xl bg-midnight text-champagne hover:bg-midnight/90 transition-all" 
                    onClick={handleBooking}
                    isLoading={bookingLoading}
                    disabled={!travelDate || ((listing.type === 'hotel' || listing.type === 'villa') && !endDate)}
                  >
                    Secure Reservation
                  </Button>

                  <div className="flex items-center justify-center gap-2 text-[8px] text-midnight/30 uppercase font-bold tracking-[0.1em]">
                    <ShieldCheck size={14} className="text-champagne" />
                    Elite Encryption Secured
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Booking Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-midnight/5 px-6 py-4 flex items-center justify-between z-[60] safe-bottom shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <div>
          <div className="flex items-center gap-1">
            <span className="text-xl font-bold text-midnight">{formatPrice(listing.price)}</span>
            <span className="text-midnight/40 text-[8px] uppercase font-bold">/ night</span>
          </div>
          <button onClick={() => setIsLightboxOpen(true)} className="text-[9px] font-bold text-champagne uppercase tracking-widest underline underline-offset-4">View Dates</button>
        </div>
        <Button 
          className="px-8 py-3.5 rounded-xl text-[10px] font-bold uppercase tracking-widest bg-midnight text-champagne shadow-xl shadow-midnight/20"
          onClick={handleBooking}
          isLoading={bookingLoading}
        >
          Book Now
        </Button>
      </div>

    {/* Modals */}
    <BookingModal 
      isOpen={isBookingModalOpen}
      onClose={() => setIsBookingModalOpen(false)}
      listing={listing}
      startDate={travelDate ? format(travelDate, 'yyyy-MM-dd') : ''}
      endDate={endDate ? format(endDate, 'yyyy-MM-dd') : (travelDate ? format(travelDate, 'yyyy-MM-dd') : '')}
      passengers={guestCounts.adults + guestCounts.children}
    />

    <ShareModal
      isOpen={isShareModalOpen}
      onClose={() => setIsShareModalOpen(false)}
      url={window.location.href}
      title={listing.title}
    />

    <Modal
      isOpen={isLightboxOpen}
      onClose={() => setIsLightboxOpen(false)}
      maxWidth="max-w-6xl"
    >
      <div className="relative bg-black rounded-xl overflow-hidden aspect-video">
        <img 
          src={listing.images[activeImageIndex]} 
          alt={listing.title} 
          className="h-full w-full object-contain"
          referrerPolicy="no-referrer"
        />
        <button 
          onClick={() => setIsLightboxOpen(false)}
          className="absolute top-4 right-4 h-10 w-10 rounded-full bg-black bg-opacity-50 text-white flex items-center justify-center hover:bg-opacity-70"
        >
          <X size={20} />
        </button>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {listing.images.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setActiveImageIndex(idx)}
              className={cn(
                "h-2 w-2 rounded-full transition-all",
                activeImageIndex === idx ? "bg-champagne w-8" : "bg-white opacity-40"
              )}
            />
          ))}
        </div>
      </div>
    </Modal>
  </>
);
};
