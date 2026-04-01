import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { RootLayout } from './components/layout/RootLayout';
import { LandingPage } from './components/landing/LandingPage';
import { DashboardPage } from './pages/platform/DashboardPage';
import { ExplorePage } from './pages/platform/ExplorePage';
import { ListingDetailPage } from './pages/platform/ListingDetailPage';
import { MyBookingsPage } from './pages/platform/MyBookingsPage';
import { ProfilePage } from './pages/platform/ProfilePage';
import { WishlistPage } from './pages/platform/WishlistPage';
import { ItineraryPage } from './pages/platform/ItineraryPage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { PlatformLayout } from './components/layout/PlatformLayout';
import { seedDatabase } from './lib/seedData';
import { Toaster } from 'react-hot-toast';
import { SearchProvider } from './context/SearchContext';

export default function App() {
  useEffect(() => {
    seedDatabase();
  }, []);

  return (
    <SearchProvider>
      <Router>
        <Toaster position="top-center" />
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<LandingPage />} />
          </Route>
          
          {/* Platform Routes */}
          <Route path="platform" element={<ProtectedRoute><PlatformLayout /></ProtectedRoute>}>
            <Route index element={<Navigate to="/platform/explore" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="explore" element={<ExplorePage />} />
            <Route path="listing/:id" element={<ListingDetailPage />} />
            <Route path="bookings" element={<MyBookingsPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="wishlist" element={<WishlistPage />} />
            <Route path="itinerary/:id" element={<ItineraryPage />} />
          </Route>
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </SearchProvider>
  );
}
