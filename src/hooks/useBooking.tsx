import { useState } from 'react';
import { collection, doc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useJurniAuth } from './useJurniAuth';
import toast from 'react-hot-toast';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const useBooking = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useJurniAuth();

  const bookListing = async (
    listingId: string, 
    dates: { start: string; end: string }, 
    guestInfo: { name: string; email: string; phone: string; specialRequests?: string }, 
    totalPrice: number,
    passengers: number
  ) => {
    if (!user) {
      toast.error('Please login to book');
      return;
    }

    setLoading(true);
    const path = 'bookings';
    try {
      const newBookingRef = doc(collection(db, path));
      const bookingData = {
        id: newBookingRef.id,
        userId: user.uid,
        listingId,
        dates,
        guests: {
          adults: passengers,
          children: 0,
          infants: 0
        },
        totalPrice,
        status: 'confirmed',
        createdAt: serverTimestamp(),
        passengerManifest: [
          {
            name: guestInfo.name,
            email: guestInfo.email,
            phone: guestInfo.phone
          }
        ],
        specialRequests: guestInfo.specialRequests || ''
      };

      await setDoc(newBookingRef, bookingData);
      toast.success('Booking confirmed!');
      return newBookingRef.id;
    } catch (err) {
      if (err instanceof Error && err.message.includes('permission')) {
        handleFirestoreError(err, OperationType.WRITE, path);
      }
      console.error('Booking error:', err);
      toast.error('Failed to confirm booking');
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId: string) => {
    if (!user) return;
    setLoading(true);
    const path = `bookings/${bookingId}`;
    try {
      await updateDoc(doc(db, 'bookings', bookingId), {
        status: 'cancelled',
        updatedAt: serverTimestamp()
      });
      toast.success('Booking cancelled');
    } catch (err) {
      if (err instanceof Error && err.message.includes('permission')) {
        handleFirestoreError(err, OperationType.UPDATE, path);
      }
      console.error('Cancel error:', err);
      toast.error('Failed to cancel booking');
    } finally {
      setLoading(false);
    }
  };

  return { bookListing, cancelBooking, loading };
};
