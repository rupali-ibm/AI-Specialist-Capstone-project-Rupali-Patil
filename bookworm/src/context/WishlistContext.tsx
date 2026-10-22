import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Book } from '../types';

interface WishlistContextType {
  items: Book[];
  addToWishlist: (book: Book) => void;
  removeFromWishlist: (bookId: string) => void;
  isWishlisted: (bookId: string) => boolean;
  toggleWishlist: (book: Book) => void;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Book[]>([]);

  const addToWishlist = (book: Book) => {
    setItems(prev => prev.find(b => b.id === book.id) ? prev : [...prev, book]);
  };

  const removeFromWishlist = (bookId: string) => {
    setItems(prev => prev.filter(b => b.id !== bookId));
  };

  const isWishlisted = (bookId: string) => items.some(b => b.id === bookId);

  const toggleWishlist = (book: Book) => {
    isWishlisted(book.id) ? removeFromWishlist(book.id) : addToWishlist(book);
  };

  return (
    <WishlistContext.Provider value={{ items, addToWishlist, removeFromWishlist, isWishlisted, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
