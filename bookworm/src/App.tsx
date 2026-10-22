import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { OrdersProvider } from './context/OrdersContext';
import Navbar from './components/Navbar';
import CataloguePage from './pages/CataloguePage';
import BookDetailPage from './pages/BookDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import PaymentPage from './pages/PaymentPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import WishlistPage from './pages/WishlistPage';
import OrdersPage from './pages/OrdersPage';

export default function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <OrdersProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<CataloguePage />} />
              <Route path="/book/:id" element={<BookDetailPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              {/* Stubs */}
              <Route path="/writers" element={<PlaceholderPage title="My Writers" />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </OrdersProvider>
      </WishlistProvider>
    </CartProvider>
  );
}

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div style={{
      minHeight: 'calc(100vh - 52px)',
      background: '#141414',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#8a8a8a',
      fontSize: '18px',
    }}>
      {title} — Coming Soon
    </div>
  );
}
