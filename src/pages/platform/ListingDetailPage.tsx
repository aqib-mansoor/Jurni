import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { Listing, Review } from '../../types';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { Star, MapPin, Check, Calendar, Users, ShieldCheck, ChevronLeft, Heart, Share2, Maximize2, X } from 'lucide-react';
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
      <div className="bg-pearl min-h-screen pb-24">
      {/* Image Gallery */}
      <div className="relative h-[50vh] lg:h-[70vh] w-full overflow-hidden group">
        <img 
          src={listing.images[activeImageIndex]} 
          alt={listing.title} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent opacity-60" />
        
        <div className="absolute top-4 left-4 lg:top-8 lg:left-8 z-10 flex gap-4">
          <button onClick={() => navigate(-1)} className="h-10 w-10 lg:h-12 lg:w-12 rounded-full bg-pearl shadow-lg text-midnight flex items-center justify-center hover:bg-champagne transition-all">
            <ChevronLeft size={20} className="lg:size-6" />
          </button>
        </div>

        <div className="absolute top-4 right-4 lg:top-8 lg:right-8 z-10 flex gap-3 lg:gap-4">
          <button 
            onClick={handleShare}
            className="h-10 w-10 lg:h-12 lg:w-12 rounded-full bg-pearl shadow-lg text-midnight flex items-center justify-center hover:bg-champagne transition-all"
          >
            <Share2 size={18} className="lg:size-5" />
          </button>
          <button 
            onClick={() => setIsLightboxOpen(true)}
            className="h-10 w-10 lg:h-12 lg:w-12 rounded-full bg-pearl shadow-lg text-midnight flex items-center justify-center hover:bg-champagne transition-all"
          >
            <Maximize2 size={18} className="lg:size-5" />
          </button>
        </div>

        <div className="absolute bottom-6 right-6 lg:bottom-12 lg:right-12 z-10 hidden sm:flex gap-2">
          {listing.images.map((img, idx) => (
            <button 
              key={idx}
              onClick={() => setActiveImageIndex(idx)}
              className={cn(
                "h-12 w-12 lg:h-16 lg:w-16 rounded-md overflow-hidden border-2 transition-all",
                activeImageIndex === idx ? "border-champagne scale-110" : "border-transparent opacity-60 hover:opacity-100"
              )}
            >
              <img src={img} alt={`Gallery ${idx}`} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
            </button>
          ))}
        </div>

        <div className="absolute bottom-6 left-6 lg:bottom-12 lg:left-12 z-10 text-pearl max-w-4xl pr-6">
          <div className="flex items-center gap-3 mb-2 lg:mb-4">
            <span className="bg-champagne text-midnight px-2 py-0.5 lg:px-3 lg:py-1 rounded-sm text-[10px] lg:text-xs font-bold uppercase tracking-widest">
              {listing.type}
            </span>
            <RatingStars rating={listing.rating} showCount count={listing.reviewsCount} />
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-serif mb-2 lg:mb-4 leading-tight">{listing.title}</h1>
          <div className="flex items-center gap-1.5 opacity-80 text-sm lg:text-lg">
            <MapPin size={16} className="lg:size-5" />
            {listing.location}
          </div>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 mt-8 lg:mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8 lg:space-y-12">
          <section data-aos="fade-up">
            <h2 className="text-2xl lg:text-3xl font-serif text-midnight mb-4 lg:mb-6">About this Experience</h2>
            <p className="text-base lg:text-lg text-midnight opacity-70 leading-relaxed">
              {listing.description}
            </p>
          </section>

          <section data-aos="fade-up">
            <h2 className="text-2xl lg:text-3xl font-serif text-midnight mb-4 lg:mb-6">Amenities & Services</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
              {listing.amenities.map((amenity) => (
                <div key={amenity} className="flex items-center gap-2 lg:gap-3 text-midnight opacity-80">
                  <div className="h-6 w-6 lg:h-8 lg:w-8 rounded-full bg-champagne bg-opacity-20 flex items-center justify-center text-champagne">
                    <Check size={14} className="lg:size-4" />
                  </div>
                  <span className="text-sm lg:text-base font-medium">{amenity}</span>
                </div>
              ))}
            </div>
          </section>

          <section data-aos="fade-up">
            <h2 className="text-2xl lg:text-3xl font-serif text-midnight mb-6 lg:mb-8">Client Reviews</h2>
            <div className="space-y-6 lg:space-y-8">
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <div key={review.id} className="border-b border-midnight border-opacity-10 pb-6 lg:pb-8">
                    <div className="flex items-center justify-between mb-3 lg:mb-4">
                      <div className="flex items-center gap-3 lg:gap-4">
                        <img src={review.userAvatar || `https://i.pravatar.cc/150?u=${review.userId}`} alt={review.userName} className="h-10 w-10 lg:h-12 lg:w-12 rounded-full border border-champagne" referrerPolicy="no-referrer" />
                        <div>
                          <h4 className="font-serif text-sm lg:text-base text-midnight">{review.userName}</h4>
                          <p className="text-[10px] lg:text-xs opacity-50">{new Date(review.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5 lg:gap-1">
                        <RatingStars rating={review.rating} />
                      </div>
                    </div>
                    <p className="text-sm lg:text-base text-midnight opacity-70 italic leading-relaxed">"{review.comment}"</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-midnight opacity-40 italic">No reviews yet for this listing.</p>
              )}
            </div>
          </section>
        </div>

        {/* Booking Widget */}
        <div className="relative">
          <div className="lg:sticky lg:top-32">
            <Card className="p-6 lg:p-8 shadow-2xl border-midnight border-opacity-5 bg-white rounded-none" data-aos="fade-left">
              <div className="flex justify-between items-end mb-6 lg:mb-8">
                <div>
                  <span className="text-3xl lg:text-4xl font-bold text-midnight">{formatPrice(listing.price)}</span>
                  <span className="text-sm lg:text-base text-midnight opacity-50"> / night</span>
                </div>
                {isLowStock && (
                  <span className="bg-rose text-pearl text-[9px] lg:text-[10px] font-bold uppercase px-2 py-1 rounded-none animate-pulse">
                    Low Stock
                  </span>
                )}
              </div>

              <div className="space-y-4 lg:space-y-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-midnight opacity-40 mb-2">
                    {(listing.type === 'hotel' || listing.type === 'villa') ? 'Check-in & Check-out' : 'Travel Date'}
                  </label>
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

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-midnight opacity-40 mb-2">Guests</label>
                  <GuestSelector
                    counts={guestCounts}
                    onChange={setGuestCounts}
                    maxGuests={listing.availability?.totalSeats || 10}
                  />
                </div>

                <PriceBreakdown
                  pricePerNight={listing.price}
                  nights={travelDate && endDate ? Math.max(1, Math.ceil((endDate.getTime() - travelDate.getTime()) / (1000 * 60 * 60 * 24))) : 1}
                  serviceFee={listing.price * 0.1}
                  cleaningFee={50}
                  taxes={listing.price * 0.05}
                />

                <Button 
                  className="w-full py-4 lg:py-5 text-lg lg:text-xl font-serif shadow-xl rounded-none" 
                  onClick={handleBooking}
                  isLoading={bookingLoading}
                  disabled={!travelDate || ((listing.type === 'hotel' || listing.type === 'villa') && !endDate)}
                >
                  Confirm Booking
                </Button>

                <div className="flex items-center justify-center gap-2 text-[9px] lg:text-[10px] text-midnight opacity-40 uppercase font-bold tracking-widest">
                  <ShieldCheck size={12} className="lg:size-3.5" />
                  Secure Payment Guaranteed
                </div>
              </div>
            </Card>

            <button 
              onClick={() => listing && toggleWishlist(listing.id)}
              className={cn(
                "w-full mt-4 lg:mt-6 flex items-center justify-center gap-2 transition-colors font-bold text-[10px] uppercase tracking-widest",
                user?.wishlist?.includes(listing.id) ? "text-rose" : "text-midnight opacity-60 hover:text-rose"
              )}
            >
              <Heart size={16} className={user?.wishlist?.includes(listing.id) ? "fill-current" : ""} /> 
              {user?.wishlist?.includes(listing.id) ? "In Wishlist" : "Add to Wishlist"}
            </button>
          </div>
        </div>
      </div>
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
