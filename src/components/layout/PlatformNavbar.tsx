import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, User as UserIcon, LogOut, Settings, Briefcase, Heart, HelpCircle, MapPin, Star, X, Sparkles, Plane, Hotel, Palmtree, Compass } from 'lucide-react';
import { Menu, Transition } from '@headlessui/react';
import { toast } from 'react-hot-toast';
import { Button } from '../ui/Button';
import { useJurniAuth } from '../../hooks/useJurniAuth';
import { cn, formatPrice } from '../../lib/utils';
import { Modal } from '../ui/Modal';
import { ConfirmationModal } from '../ui/ConfirmationModal';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '../../firebase';
import { Listing } from '../../types';

export const PlatformNavbar = ({ onSearchClick, isSearchModalOpen, setIsSearchModalOpen }: { 
  onSearchClick: () => void; 
  isSearchModalOpen: boolean; 
  setIsSearchModalOpen: (open: boolean) => void;
}) => {
  const { user, logout } = useJurniAuth();
  const navigate = useNavigate();
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Listing[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim().length >= 1) {
        handleSearch();
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSearch = async () => {
    setIsSearching(true);
    try {
      const listingsRef = collection(db, 'listings');
      const querySnapshot = await getDocs(listingsRef);
      const allListings: Listing[] = [];
      querySnapshot.forEach((doc) => {
        allListings.push({ id: doc.id, ...doc.data() } as Listing);
      });

      const queryLower = searchQuery.toLowerCase().trim();
      const results = allListings.filter(listing => 
        listing.title.toLowerCase().includes(queryLower) ||
        listing.location.toLowerCase().includes(queryLower) ||
        listing.type.toLowerCase().includes(queryLower) ||
        listing.description.toLowerCase().includes(queryLower)
      ).slice(0, 6);

      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await logout();
      setIsSignOutModalOpen(false);
      toast.success('Successfully signed out of your luxury portal');
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Sign out error:', error);
      toast.error('Failed to sign out. Please try again.');
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-midnight text-pearl px-6 sm:px-12 py-3 md:py-5 shadow-2xl border-b border-pearl/5 hidden md:block">
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between gap-4 md:gap-12">
          <Link to="/platform/explore" className="text-2xl md:text-4xl font-serif font-bold text-champagne tracking-[0.3em] shrink-0 hover:opacity-80 transition-all duration-500 mx-auto md:mx-0">
            JURNİ
          </Link>

          {/* Search Bar Trigger - Hidden on Mobile (already in bottom nav) */}
          <div 
            onClick={onSearchClick}
            className="hidden md:block flex-1 max-w-xl relative cursor-pointer group"
          >
            <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center gap-3">
              <Search className="h-4 w-4 text-champagne group-hover:scale-110 transition-all duration-500" />
              <div className="h-4 w-[1px] bg-pearl/10" />
            </div>
            <div className="w-full bg-pearl/5 border border-pearl/10 rounded-2xl py-3.5 pl-14 pr-6 text-[10px] text-pearl/40 font-bold uppercase tracking-[0.2em] group-hover:border-champagne/30 group-hover:bg-pearl/10 transition-all duration-500 shadow-inner backdrop-blur-md">
              Search your next <span className="text-champagne italic lowercase font-serif text-sm tracking-normal">masterpiece</span> journey...
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/platform/explore" className="text-[10px] font-bold uppercase tracking-[0.5em] text-pearl/40 hover:text-champagne transition-all duration-500">
              Explore
            </Link>
            
            <button className="relative p-3 text-pearl/40 hover:text-champagne transition-all duration-500 bg-pearl/5 rounded-2xl border border-pearl/10 shadow-xl group">
              <Bell className="h-5 w-5 group-hover:animate-swing" />
              <span className="absolute top-3 right-3 h-2.5 w-2.5 bg-rose rounded-full border-2 border-midnight shadow-sm" />
            </button>

            {/* User Dropdown */}
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center gap-2 hover:scale-105 transition-transform duration-500">
                <div className="h-12 w-12 rounded-2xl bg-pearl/10 border-2 border-pearl/20 flex items-center justify-center overflow-hidden shadow-xl">
                  {user?.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full bg-champagne/10 flex items-center justify-center">
                      <UserIcon className="h-6 w-6 text-champagne" />
                    </div>
                  )}
                </div>
              </Menu.Button>

              <Transition
                as={React.Fragment}
                enter="transition ease-out duration-300"
                enterFrom="transform opacity-0 scale-95 translate-y-2"
                enterTo="transform opacity-100 scale-100 translate-y-0"
                leave="transition ease-in duration-200"
                leaveFrom="transform opacity-100 scale-100 translate-y-0"
                leaveTo="transform opacity-0 scale-95 translate-y-2"
              >
                <Menu.Items className="absolute right-0 mt-6 w-80 origin-top-right rounded-[40px] bg-midnight shadow-2xl ring-1 ring-pearl/5 focus:outline-none overflow-hidden border border-pearl/10">
                  <div className="px-10 py-10 bg-gradient-to-br from-pearl/10 to-transparent border-b border-pearl/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-champagne opacity-[0.05] rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                    <div className="relative z-10 space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="h-14 w-14 rounded-2xl bg-champagne/20 border border-champagne/30 flex items-center justify-center overflow-hidden shadow-2xl">
                          {user?.photoURL ? (
                            <img src={user.photoURL} alt={user.displayName} className="h-full w-full object-cover" />
                          ) : (
                            <UserIcon className="h-6 w-6 text-champagne" />
                          )}
                        </div>
                        <div>
                          <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-champagne/60 mb-1">Private Member</p>
                          <p className="text-xl font-serif font-bold text-pearl leading-tight">{user?.displayName}</p>
                        </div>
                      </div>
                      <p className="text-[10px] text-pearl/30 truncate font-bold uppercase tracking-widest pt-2 border-t border-pearl/5">{user?.email}</p>
                    </div>
                  </div>
                  <div className="p-4 space-y-1">
                    {[
                      { to: '/platform/profile', icon: UserIcon, label: 'Profile' },
                      { to: '/platform/bookings', icon: Briefcase, label: 'My Bookings' },
                      { to: '/platform/wishlist', icon: Heart, label: 'Wishlist' },
                      { to: '/platform/settings', icon: Settings, label: 'Settings' },
                    ].map((item) => (
                      <Menu.Item key={item.to}>
                        {({ active }) => (
                          <Link
                            to={item.to}
                            className={cn(
                              'flex items-center gap-4 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.3em] text-pearl/60 transition-all duration-500 rounded-2xl',
                              active ? 'bg-pearl/5 text-champagne translate-x-2' : ''
                            )}
                          >
                            <item.icon className={cn("h-4 w-4 transition-colors", active ? "text-champagne" : "text-pearl/20")} /> 
                            {item.label}
                          </Link>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                  <div className="p-4 border-t border-pearl/5 bg-pearl/[0.02]">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => setIsSignOutModalOpen(true)}
                          className={cn(
                            'flex items-center gap-4 w-full px-6 py-4 text-[10px] font-bold uppercase tracking-[0.3em] text-rose transition-all duration-500 rounded-2xl',
                            active ? 'bg-rose/5 translate-x-2' : ''
                          )}
                        >
                          <LogOut className="h-4 w-4" /> Sign Out
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </nav>

      {/* Search Modal - Concierge Experience */}
      <Modal 
        isOpen={isSearchModalOpen} 
        onClose={() => {
          setIsSearchModalOpen(false);
          setSearchQuery('');
          setSearchResults([]);
        }}
        className="max-w-5xl p-0 overflow-visible bg-pearl rounded-[40px]"
      >
        <div className="relative border-b border-midnight/5 bg-white/95 backdrop-blur-2xl p-3 md:p-4 rounded-t-[32px] md:rounded-t-[40px]">
          <div className="flex items-center gap-4 md:gap-6 px-4 md:px-8">
            <Search className="h-5 w-5 md:h-6 md:w-6 text-champagne" />
            <input 
              autoFocus
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Where shall we take you next?" 
              className="flex-1 bg-transparent border-none py-6 md:py-8 text-xl md:text-3xl font-serif text-midnight focus:ring-0 placeholder:text-midnight/10"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="p-2 hover:bg-midnight/5 rounded-full transition-all duration-300"
              >
                <X size={20} className="text-midnight/30" />
              </button>
            )}
          </div>
        </div>

        <div className="max-h-[75vh] overflow-y-auto no-scrollbar bg-pearl rounded-b-[40px]">
          {isSearching ? (
            <div className="p-32 flex flex-col items-center justify-center gap-8">
              <div className="relative">
                <div className="h-20 w-20 border-2 border-champagne border-t-transparent rounded-full animate-spin" />
                <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-champagne animate-pulse" size={24} />
              </div>
              <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-midnight/30 animate-pulse">Curating your masterpiece results...</p>
            </div>
          ) : searchQuery.length >= 1 && searchResults.length > 0 ? (
            <div className="p-8 lg:p-12">
              <div className="flex items-center justify-between mb-10 px-4">
                <div className="flex items-center gap-3">
                  <div className="h-1 w-8 bg-champagne rounded-full" />
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-midnight/40">Extraordinary Matches</p>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-midnight/20">{searchResults.length} results</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {searchResults.map((listing) => (
                  <button
                    key={listing.id}
                    onClick={() => {
                      navigate(`/platform/listing/${listing.id}`);
                      setIsSearchModalOpen(false);
                      setSearchQuery('');
                    }}
                    className="w-full flex items-center gap-6 p-6 bg-white border border-midnight/5 hover:border-champagne/40 transition-all duration-700 text-left group shadow-sm hover:shadow-2xl rounded-[32px]"
                  >
                    <div className="h-28 w-28 shrink-0 overflow-hidden rounded-2xl relative shadow-xl">
                      <img src={listing.images[0]} alt={listing.title} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-1000" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-midnight/5 group-hover:bg-transparent transition-colors duration-500" />
                    </div>
                    <div className="flex-1 min-w-0 space-y-3">
                      <div className="flex items-center gap-2 text-[9px] uppercase font-bold tracking-[0.2em] text-midnight/40">
                        <MapPin size={10} className="text-champagne" /> {listing.location}
                      </div>
                      <h4 className="text-xl font-serif text-midnight truncate group-hover:text-champagne transition-colors duration-300">{listing.title}</h4>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-sm font-bold text-midnight">{formatPrice(listing.price)} <span className="text-[10px] text-midnight/30 font-normal uppercase tracking-widest">/ night</span></span>
                        <div className="flex items-center gap-1 text-[10px] font-bold text-midnight/60">
                          <Star size={10} className="fill-champagne text-champagne" /> {listing.rating}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : searchQuery.length >= 1 && !isSearching ? (
            <div className="p-32 text-center">
              <div className="h-24 w-24 bg-midnight/5 rounded-full flex items-center justify-center mx-auto mb-10 border border-midnight/5">
                <Search size={40} className="text-midnight/10" />
              </div>
              <h3 className="text-3xl font-serif text-midnight mb-4">A Blank Canvas</h3>
              <p className="text-sm font-light text-midnight/40 max-w-sm mx-auto leading-relaxed">We couldn't find any masterpieces matching "{searchQuery}". Try exploring our curated collections instead.</p>
            </div>
          ) : (
            <div className="px-6 md:px-12 pb-12 md:pb-16 pt-8 md:pt-12">
              <div className="mb-12 md:mb-16">
                <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-midnight/30 mb-6 md:mb-8 text-center">Trending Destinations</p>
                <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                  {['Maldives', 'Amalfi Coast', 'Santorini', 'Kyoto', 'St. Barts', 'Swiss Alps'].map(term => (
                    <button 
                      key={term}
                      onClick={() => setSearchQuery(term)}
                      className="px-5 md:px-6 py-2.5 md:py-3 bg-white border border-midnight/5 hover:border-champagne rounded-xl text-[9px] font-bold uppercase tracking-[0.1em] text-midnight/60 hover:text-midnight transition-all duration-500 shadow-sm hover:shadow-md"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-8">
                {[
                  { name: 'Flights', icon: Plane, color: 'bg-midnight/5 text-midnight' },
                  { name: 'Hotels', icon: Hotel, color: 'bg-midnight/5 text-midnight' },
                  { name: 'Villas', icon: Palmtree, color: 'bg-midnight/5 text-midnight' },
                  { name: 'Adventures', icon: Compass, color: 'bg-midnight/5 text-midnight' }
                ].map(item => (
                  <button 
                    key={item.name} 
                    onClick={() => setSearchQuery(item.name)}
                    className="flex flex-col items-center gap-4 md:gap-6 p-6 md:p-8 bg-white border border-midnight/5 hover:border-champagne/40 transition-all duration-700 group shadow-sm hover:shadow-xl rounded-[24px] md:rounded-[32px]"
                  >
                    <div className={cn("h-12 w-12 md:h-16 md:w-16 rounded-2xl flex items-center justify-center transition-all duration-700 group-hover:scale-110 group-hover:bg-midnight group-hover:text-champagne shadow-sm", item.color)}>
                      <item.icon size={24} strokeWidth={1.5} />
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-midnight/40 group-hover:text-midnight transition-colors">{item.name}</span>
                  </button>
                ))}
              </div>
              
              <div className="mt-12 md:mt-16 p-8 md:p-10 bg-midnight rounded-[32px] md:rounded-[40px] text-center shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-48 h-48 bg-champagne/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-champagne/10 transition-all duration-1000" />
                <div className="relative z-10">
                  <p className="text-champagne font-serif text-2xl md:text-3xl mb-3">Need personal assistance?</p>
                  <p className="text-pearl/40 text-[9px] font-bold uppercase tracking-[0.2em] mb-8 max-w-md mx-auto leading-relaxed">Our elite concierge is available 24/7 to curate your next masterpiece journey.</p>
                  <Button className="bg-champagne text-midnight hover:scale-105 transition-all px-10 md:px-12 py-4 rounded-xl text-[9px] font-bold uppercase tracking-[0.3em] shadow-xl shadow-champagne/10">
                    Speak with Concierge
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>

      {/* Sign Out Confirmation Modal */}
      <ConfirmationModal
        isOpen={isSignOutModalOpen}
        onClose={() => setIsSignOutModalOpen(false)}
        onConfirm={handleSignOut}
        title=""
        message="Are you sure you want to sign out of your luxury portal? Your curated experiences will be waiting for your return."
        confirmText="Sign Out"
        cancelText="Stay Connected"
        type="warning"
        icon={<LogOut size={48} className="text-amber" />}
      />
    </>
  );
};
