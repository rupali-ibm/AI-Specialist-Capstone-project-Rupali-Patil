import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useOrders } from '../context/OrdersContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { itemCount } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { orders } = useOrders();
  const navigate = useNavigate();

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <Link to="/" className={styles.brand}>
          <span className={styles.brandIcon}>📖</span>
          <span className={styles.brandName}>Book Worm</span>
        </Link>
        <div className={styles.divider} />
        <Link to="/orders" className={styles.navLink}>
          My Orders
          {orders.length > 0 && (
            <span className={styles.wishlistBadge}>{orders.length}</span>
          )}
        </Link>
        <Link to="/wishlist" className={styles.navLink}>
          My Wishlist
          {wishlistItems.length > 0 && (
            <span className={styles.wishlistBadge}>{wishlistItems.length}</span>
          )}
        </Link>
        <Link to="/writers" className={styles.navLink}>My Writers</Link>
      </div>
      <div className={styles.right}>
        <button
          className={styles.cartBtn}
          onClick={() => navigate('/checkout')}
          aria-label="Shopping cart"
        >
          <CartIcon />
          {itemCount > 0 && <span className={styles.cartBadge}>{itemCount}</span>}
        </button>
        <button className={styles.profileBtn} aria-label="Profile">
          <ProfileIcon />
        </button>
      </div>
    </nav>
  );
}

function CartIcon() {
  return (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
