import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Breadcrumb from '../components/Breadcrumb';
import { Address } from '../types';
import styles from './CheckoutPage.module.css';

const TAX_RATE = 0.12;
const DELIVERY_FREE_THRESHOLD = 499;

export default function CheckoutPage() {
  const { items, updateQuantity, removeFromCart, total } = useCart();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [useSaved, setUseSaved] = useState(false);
  const [address, setAddress] = useState<Address>({
    firstName: '', lastName: '', addressLine: '', email: '',
    city: '', pin: '', phoneNumber: '', state: '', country: 'India',
  });

  const tax = Math.round(total * TAX_RATE);
  const deliveryCharge = total >= DELIVERY_FREE_THRESHOLD ? 0 : 50;
  const grandTotal = total + tax + deliveryCharge - discount;

  const handleApplyCoupon = () => {
    if (coupon.toUpperCase() === 'SAVE100') setDiscount(100);
  };

  const handleAddressChange = (field: keyof Address, value: string) => {
    setAddress(prev => ({ ...prev, [field]: value }));
  };

  const handlePayNow = () => {
    navigate('/payment');
  };

  if (items.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <p>Your cart is empty.</p>
        <button className={styles.browseBtn} onClick={() => navigate('/')}>Browse Books</button>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Breadcrumb
          items={[
            { label: 'Home', to: '/' },
            { label: 'Non-Fiction', to: '/' },
            { label: 'Self Help', to: '/' },
            { label: 'Shopping Cart' },
          ]}
        />

        <h1 className={styles.pageTitle}>Shopping Cart</h1>

        {/* Cart items */}
        <div className={styles.cartItems}>
          {items.map(({ book, quantity }) => (
            <div key={book.id} className={styles.cartItem}>
              <div
                className={styles.cartCover}
                style={{ background: book.coverColor, color: book.coverTextColor }}
              >
                <span className={styles.cartCoverTitle}>{book.title}</span>
                <span className={styles.cartCoverAuthor}>{book.author}</span>
              </div>
              <div className={styles.cartInfo}>
                <p className={styles.cartTitle}>{book.title}</p>
                <p className={styles.cartAuthor}>by <span className={styles.authorLink}>{book.author}</span></p>
                <p className={styles.cartDesc}>{book.description}</p>
                <p className={styles.cartFormat}>{book.format}</p>
                <p className={styles.cartGenres}>
                  {book.genres.map((g, i) => (
                    <span key={g}><span className={styles.genre}>{g}</span>{i < book.genres.length - 1 ? ', ' : ''}</span>
                  ))}
                </p>
                <p className={styles.cartPrice}>₹{book.price}</p>
                <p className={styles.cartDelivery}>Delivery by <strong>{book.delivery}</strong></p>
                <div className={styles.qtyRow}>
                  <span className={styles.qtyLabel}>{quantity}</span>
                  <button className={styles.qtyBtn} onClick={() => updateQuantity(book.id, quantity - 1)}>−</button>
                  <button className={styles.qtyBtn} onClick={() => updateQuantity(book.id, quantity + 1)}>+</button>
                  <button className={styles.removeBtn} onClick={() => removeFromCart(book.id)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.bottomSection}>
          {/* Address form */}
          <section className={styles.addressSection}>
            <h2 className={styles.sectionTitle}>Address</h2>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" checked={useSaved} onChange={e => setUseSaved(e.target.checked)} />
              Use Saved Address
            </label>
            <div className={styles.formGrid}>
              <input
                className={styles.input}
                placeholder="First Name"
                value={address.firstName}
                onChange={e => handleAddressChange('firstName', e.target.value)}
              />
              <input
                className={styles.input}
                placeholder="Last Name"
                value={address.lastName}
                onChange={e => handleAddressChange('lastName', e.target.value)}
              />
              <input
                className={`${styles.input} ${styles.fullWidth}`}
                placeholder="Address Line 2"
                value={address.addressLine}
                onChange={e => handleAddressChange('addressLine', e.target.value)}
              />
              <input
                className={`${styles.input} ${styles.fullWidth}`}
                placeholder="e-mail"
                type="email"
                value={address.email}
                onChange={e => handleAddressChange('email', e.target.value)}
              />
              <input
                className={styles.input}
                placeholder="City"
                value={address.city}
                onChange={e => handleAddressChange('city', e.target.value)}
              />
              <input
                className={styles.input}
                placeholder="000000"
                value={address.pin}
                onChange={e => handleAddressChange('pin', e.target.value)}
              />
              <div className={styles.phoneRow}>
                <select className={styles.phoneCode}>
                  <option>+91</option>
                  <option>+1</option>
                  <option>+44</option>
                </select>
                <input
                  className={`${styles.input} ${styles.phoneInput}`}
                  placeholder="12345567890"
                  value={address.phoneNumber}
                  onChange={e => handleAddressChange('phoneNumber', e.target.value)}
                />
              </div>
              <input
                className={styles.input}
                placeholder="State"
                value={address.state}
                onChange={e => handleAddressChange('state', e.target.value)}
              />
              <input
                className={styles.input}
                placeholder="Country"
                value={address.country}
                onChange={e => handleAddressChange('country', e.target.value)}
              />
            </div>
          </section>

          {/* Order summary */}
          <aside className={styles.summary}>
            <div className={styles.summaryIllustration}>
              <BooksIllustration />
            </div>
            <div className={styles.summaryContent}>
              <h3 className={styles.summaryTitle}>Grand Total</h3>
              <div className={styles.summaryRow}>
                <span>Price ({items.length} items)</span>
                <span>₹{total}.00</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Tax</span>
                <span>₹{tax}.00</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Delivery Charges</span>
                <span className={styles.freeText}>{deliveryCharge === 0 ? 'Free' : `₹${deliveryCharge}`}</span>
              </div>
              <div className={styles.couponRow}>
                <input
                  className={styles.couponInput}
                  placeholder="Apply Coupon"
                  value={coupon}
                  onChange={e => setCoupon(e.target.value)}
                />
                <button className={styles.couponApplyBtn} onClick={handleApplyCoupon}>Apply</button>
              </div>
              {discount > 0 && (
                <div className={styles.summaryRow}>
                  <span>Discount</span>
                  <span className={styles.discountText}>−₹{discount}</span>
                </div>
              )}
              <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                <span>Total Amount</span>
                <span>₹{grandTotal}</span>
              </div>
              <button className={styles.payNowBtn} onClick={handlePayNow}>
                Pay Now 🏦
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function BooksIllustration() {
  return (
    <svg width="100%" height="100" viewBox="0 0 200 100" fill="none">
      <rect width="200" height="100" rx="8" fill="#1a3a5c" />
      <rect x="20" y="30" width="30" height="50" rx="3" fill="#4a9eff" opacity="0.8" />
      <rect x="25" y="25" width="30" height="50" rx="3" fill="#f5a623" opacity="0.9" />
      <rect x="60" y="20" width="25" height="60" rx="3" fill="#e53e3e" opacity="0.8" />
      <rect x="90" y="35" width="28" height="45" rx="3" fill="#48bb78" opacity="0.8" />
      <circle cx="150" cy="50" r="25" fill="#4a9eff" opacity="0.2" />
      <circle cx="170" cy="30" r="15" fill="#f5a623" opacity="0.2" />
    </svg>
  );
}
