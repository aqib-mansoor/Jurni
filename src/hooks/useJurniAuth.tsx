import { useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  User as FirebaseUser,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { User } from '../types';
import toast from 'react-hot-toast';
import { handleFirestoreError, OperationType } from '../firebase';

export const useJurniAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser({ 
              id: firebaseUser.uid, 
              ...userData,
              wishlist: userData.wishlist || []
            } as User);
          } else {
            const newUser: User = {
              id: firebaseUser.uid,
              uid: firebaseUser.uid,
              displayName: firebaseUser.displayName || 'Anonymous',
              email: firebaseUser.email || '',
              avatar: firebaseUser.photoURL || undefined,
              memberSince: new Date().toISOString(),
              role: 'user',
              wishlist: []
            };
            await setDoc(doc(db, 'users', firebaseUser.uid), newUser);
            setUser(newUser);
          }
        } catch (err) {
          console.error('Auth state change error:', err);
          if (err instanceof Error && err.message.includes('permission')) {
            try {
              handleFirestoreError(err, OperationType.GET, `users/${firebaseUser.uid}`);
            } catch (e) {
              // Error already logged
            }
          }
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const signInWithEmail = async (email: string, pass: string) => {
    await signInWithEmailAndPassword(auth, email, pass);
  };

  const signUpWithEmail = async (email: string, pass: string, name: string) => {
    const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, pass);
    await updateProfile(firebaseUser, { displayName: name });
    
    const newUser: User = {
      id: firebaseUser.uid,
      uid: firebaseUser.uid,
      displayName: name,
      email: email,
      memberSince: new Date().toISOString(),
      role: 'user',
      wishlist: []
    };
    await setDoc(doc(db, 'users', firebaseUser.uid), newUser);
    setUser(newUser);
  };

  const logout = async () => {
    await signOut(auth);
  };

  const toggleWishlist = async (listingId: string) => {
    if (!user) {
      toast.error('Please login to manage wishlist');
      return;
    }

    const newWishlist = user.wishlist.includes(listingId)
      ? user.wishlist.filter(id => id !== listingId)
      : [...user.wishlist, listingId];

    try {
      await setDoc(doc(db, 'users', user.id), { ...user, wishlist: newWishlist });
      setUser({ ...user, wishlist: newWishlist });
      toast.success(newWishlist.includes(listingId) ? 'Added to wishlist' : 'Removed from wishlist');
    } catch (err) {
      console.error(err);
      if (err instanceof Error && err.message.includes('permission')) {
        try {
          handleFirestoreError(err, OperationType.UPDATE, `users/${user.id}`);
        } catch (e) {
          // Error already logged
        }
      }
      toast.error('Failed to update wishlist');
    }
  };

  return { user, loading, login, logout, toggleWishlist, signInWithEmail, signUpWithEmail };
};
