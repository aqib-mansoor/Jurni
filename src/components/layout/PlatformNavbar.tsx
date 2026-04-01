import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, User as UserIcon, LogOut, Settings, Briefcase, Heart, HelpCircle, MapPin, Star, X } from 'lucide-react';
import { Menu, Transition } from '@headlessui/react';
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
    await logout();
    setIsSignOutModalOpen(false);
    navigate('/');
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-midnight text-pearl px-6 py-4 shadow-2xl border-b border-pearl/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
          <Link to="/platform/explore" className="text-2xl font-serif font-bold text-champagne tracking-[0.3em] shrink-0 hover:opacity-80 transition-opacity">
            JURNİ
          </Link>

          {/* Search Bar Trigger */}
          <div 
            onClick={onSearchClick}
            className="flex-1 max-w-xl relative cursor-pointer group"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-pearl opacity-50 group-hover:text-champagne transition-colors" />
            <div className="w-full bg-pearl/10 border border-pearl/10 rounded-none py-2.5 pl-12 pr-4 text-sm text-pearl/50 font-medium group-hover:bg-pearl/15 transition-all hidden md:block">
              Search destinations, hotels, flights...
            </div>
            <div className="w-full bg-pearl/10 border border-pearl/10 rounded-none py-2.5 pl-12 pr-4 text-sm text-pearl/50 font-medium group-hover:bg-pearl/15 transition-all md:hidden">
              Search...
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-pearl/30 uppercase tracking-widest hidden md:block">
              ⌘ K
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/platform/explore" className="hidden lg:block text-[10px] font-bold uppercase tracking-[0.3em] text-pearl/70 hover:text-champagne transition-colors">
              Explore
            </Link>
            
            <button className="relative p-1 text-pearl/70 hover:text-champagne transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-rose rounded-full border-2 border-midnight" />
            </button>

            {/* User Dropdown */}
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="h-10 w-10 rounded-full bg-champagne/10 border border-champagne/20 flex items-center justify-center overflow-hidden p-0.5">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.displayName} className="h-full w-full object-cover rounded-full" />
                  ) : (
                    <div className="h-full w-full rounded-full bg-champagne flex items-center justify-center">
                      <UserIcon className="h-5 w-5 text-midnight" />
                    </div>
                  )}
                </div>
              </Menu.Button>

              <Transition
                as={React.Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-3 w-64 origin-top-right rounded-none bg-pearl shadow-2xl ring-1 ring-midnight/5 focus:outline-none overflow-hidden">
                  <div className="px-6 py-5 bg-midnight/5 border-b border-midnight/5">
                    <p className="text-xs font-bold uppercase tracking-widest text-midnight/40 mb-1">Authenticated as</p>
                    <p className="text-sm font-serif font-bold text-midnight">{user?.displayName}</p>
                    <p className="text-[10px] text-midnight/50 truncate font-medium">{user?.email}</p>
                  </div>
                  <div className="py-2">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/platform/profile"
                          className={cn(
                            'flex items-center gap-4 px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-midnight/70 transition-colors',
                            active ? 'bg-midnight/5 text-midnight' : ''
                          )}
                        >
                          <UserIcon className="h-4 w-4" /> Profile
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/platform/bookings"
                          className={cn(
                            'flex items-center gap-4 px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-midnight/70 transition-colors',
                            active ? 'bg-midnight/5 text-midnight' : ''
                          )}
                        >
                          <Briefcase className="h-4 w-4" /> My Bookings
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/platform/wishlist"
                          className={cn(
                            'flex items-center gap-4 px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-midnight/70 transition-colors',
                            active ? 'bg-midnight/5 text-midnight' : ''
                          )}
                        >
                          <Heart className="h-4 w-4" /> Wishlist
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/platform/settings"
                          className={cn(
                            'flex items-center gap-4 px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-midnight/70 transition-colors',
                            active ? 'bg-midnight/5 text-midnight' : ''
                          )}
                        >
                          <Settings className="h-4 w-4" /> Settings
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/platform/help"
                          className={cn(
                            'flex items-center gap-4 px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-midnight/70 transition-colors',
                            active ? 'bg-midnight/5 text-midnight' : ''
                          )}
                        >
                          <HelpCircle className="h-4 w-4" /> Help & Support
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="py-2 border-t border-midnight/5">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => setIsSignOutModalOpen(true)}
                          className={cn(
                            'flex items-center gap-4 w-full px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-rose transition-colors',
                            active ? 'bg-rose/5' : ''
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

      {/* Search Modal */}
      <Modal 
        isOpen={isSearchModalOpen} 
        onClose={() => {
          setIsSearchModalOpen(false);
          setSearchQuery('');
          setSearchResults([]);
        }}
        className="max-w-4xl p-0 overflow-visible rounded-none bg-pearl"
      >
        <div className="relative border-b border-midnight/5 bg-white">
          <Search className="absolute left-8 top-1/2 -translate-y-1/2 h-8 w-8 text-midnight/20" />
          <input 
            autoFocus
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search destinations, hotels, flights..." 
            className="w-full bg-transparent border-none py-10 pl-20 pr-20 text-2xl md:text-4xl font-serif text-midnight focus:ring-0 placeholder:text-midnight/10"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-8 top-1/2 -translate-y-1/2 p-3 hover:bg-midnight/5 rounded-full transition-all duration-300"
            >
              <X size={24} className="text-midnight/30" />
            </button>
          )}
        </div>

        <div className="max-h-[70vh] overflow-y-auto">
          {isSearching ? (
            <div className="p-20 flex flex-col items-center justify-center gap-6">
              <div className="h-12 w-12 border-2 border-champagne border-t-transparent rounded-full animate-spin" />
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-midnight/30 animate-pulse">Curating your results...</p>
            </div>
          ) : searchQuery.length >= 1 && searchResults.length > 0 ? (
            <div className="p-4 md:p-8">
              <div className="flex items-center justify-between mb-8 px-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-midnight/30">Extraordinary Matches</p>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-midnight/30">{searchResults.length} results</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {searchResults.map((listing) => (
                  <button
                    key={listing.id}
                    onClick={() => {
                      navigate(`/platform/listing/${listing.id}`);
                      setIsSearchModalOpen(false);
                      setSearchQuery('');
                    }}
                    className="w-full flex items-center gap-6 p-4 bg-white border border-midnight/5 hover:border-champagne transition-all duration-500 text-left group shadow-sm hover:shadow-xl"
                  >
                    <div className="h-24 w-24 shrink-0 overflow-hidden rounded-none relative">
                      <img src={listing.images[0]} alt={listing.title} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-midnight/10 group-hover:bg-transparent transition-colors duration-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-[9px] uppercase font-bold tracking-[0.2em] text-midnight/40 mb-2">
                        <MapPin size={10} className="text-champagne" /> {listing.location}
                      </div>
                      <h4 className="text-lg font-serif text-midnight truncate group-hover:text-champagne transition-colors duration-300">{listing.title}</h4>
                      <div className="flex items-center justify-between mt-3">
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
            <div className="p-24 text-center">
              <div className="h-20 w-20 bg-midnight/5 rounded-full flex items-center justify-center mx-auto mb-8">
                <Search size={32} className="text-midnight/10" />
              </div>
              <p className="text-2xl font-serif text-midnight mb-4">No results found for "{searchQuery}"</p>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-midnight/30 max-w-sm mx-auto leading-relaxed">We couldn't find any matches for your current search. Try exploring our curated categories instead.</p>
            </div>
          ) : (
            <div className="px-8 pb-12 pt-10">
              <div className="mb-12">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-midnight/30 mb-8 text-center">Trending Searches</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {['Maldives', 'Private Jet', 'Santorini', 'Dubai', 'Wellness Retreat', 'Yacht Charter'].map(term => (
                    <button 
                      key={term}
                      onClick={() => setSearchQuery(term)}
                      className="px-6 py-3 bg-white border border-midnight/5 hover:border-champagne rounded-full text-[10px] font-bold uppercase tracking-widest text-midnight/60 hover:text-midnight transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-midnight/30 mb-8 text-center">Curated Collections</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {[
                  { name: 'Flights', icon: '✈️', color: 'bg-blue-50' },
                  { name: 'Hotels', icon: '🏨', color: 'bg-amber-50' },
                  { name: 'Villas', icon: '🏡', color: 'bg-emerald-50' },
                  { name: 'Adventures', icon: '🗺️', color: 'bg-rose-50' }
                ].map(item => (
                  <button 
                    key={item.name} 
                    onClick={() => setSearchQuery(item.name)}
                    className="flex flex-col items-center gap-4 p-8 bg-white border border-midnight/5 hover:border-champagne transition-all duration-500 group shadow-sm hover:shadow-2xl"
                  >
                    <div className={cn("h-16 w-16 rounded-full flex items-center justify-center text-3xl transition-transform duration-500 group-hover:scale-110", item.color)}>
                      {item.icon}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-midnight/40 group-hover:text-midnight transition-colors">{item.name}</span>
                  </button>
                ))}
              </div>
              
              <div className="mt-12 p-8 bg-midnight rounded-none text-center">
                <p className="text-champagne font-serif text-xl mb-2">Need personal assistance?</p>
                <p className="text-pearl/50 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">Our concierge is available 24/7 to curate your journey.</p>
                <Button className="bg-white text-midnight hover:bg-champagne transition-all px-10 py-4 rounded-none text-[10px] font-bold uppercase tracking-widest">
                  Contact Concierge
                </Button>
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
        title="Sign Out"
        message="Are you sure you want to sign out of your Jurni account? Your curated experiences will be waiting for your return."
        confirmText="Sign Out"
        type="danger"
      />
    </>
  );
};
