'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  provider: 'google' | 'github' | 'twitter' | 'apple';
  badge: string;
  cityHome: string;
  savedPlacesCount: number;
}

interface AuthContextType {
  user: UserProfile | null;
  savedPlaces: string[];
  isAuthModalOpen: boolean;
  isShareModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  openShareModal: () => void;
  closeShareModal: () => void;
  signInWithSocial: (provider: 'google' | 'github' | 'twitter' | 'apple') => Promise<void>;
  signOut: () => void;
  toggleSavePlace: (placeId: string) => void;
  isPlaceSaved: (placeId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [savedPlaces, setSavedPlaces] = useState<string[]>([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('canadacity_user');
      const storedPlaces = localStorage.getItem('canadacity_saved_places');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      if (storedPlaces) {
        setSavedPlaces(JSON.parse(storedPlaces));
      }
    } catch {
      // ignore
    }
  }, []);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);
  const openShareModal = () => setIsShareModalOpen(true);
  const closeShareModal = () => setIsShareModalOpen(false);

  const signInWithSocial = async (provider: 'google' | 'github' | 'twitter' | 'apple') => {
    // Generate simulated/real social profile based on selected provider
    const sampleNames = {
      google: { name: 'Alex Tremblay', email: 'alex.tremblay@gmail.com', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' },
      github: { name: 'Devin Chen', email: 'devin.chen@github.com', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80' },
      twitter: { name: 'Sarah MacDonald', email: 'sarah.m@x.com', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80' },
      apple: { name: 'Jordan Roy', email: 'jordan.roy@icloud.com', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80' },
    };

    const data = sampleNames[provider];
    const newUser: UserProfile = {
      id: `usr_${Date.now()}`,
      name: data.name,
      email: data.email,
      avatar: data.avatar,
      provider,
      badge: 'Verified Canadian Explorer 🍁',
      cityHome: 'Calgary (YYC)',
      savedPlacesCount: savedPlaces.length,
    };

    setUser(newUser);
    try {
      localStorage.setItem('canadacity_user', JSON.stringify(newUser));
    } catch {
      // ignore
    }
    closeAuthModal();
  };

  const signOut = () => {
    setUser(null);
    try {
      localStorage.removeItem('canadacity_user');
    } catch {
      // ignore
    }
  };

  const toggleSavePlace = (placeId: string) => {
    setSavedPlaces((prev) => {
      const updated = prev.includes(placeId) ? prev.filter((id) => id !== placeId) : [...prev, placeId];
      try {
        localStorage.setItem('canadacity_saved_places', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const isPlaceSaved = (placeId: string) => savedPlaces.includes(placeId);

  return (
    <AuthContext.Provider
      value={{
        user,
        savedPlaces,
        isAuthModalOpen,
        isShareModalOpen,
        openAuthModal,
        closeAuthModal,
        openShareModal,
        closeShareModal,
        signInWithSocial,
        signOut,
        toggleSavePlace,
        isPlaceSaved,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
