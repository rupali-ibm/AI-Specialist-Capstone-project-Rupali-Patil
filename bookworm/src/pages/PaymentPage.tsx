import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrdersContext';
import styles from './PaymentPage.module.css';

type PaymentMethod = 'Credit Card' | 'Debit card' | 'UPI' | 'Wallet';

export default function PaymentPage() {
  const navigate = useNavigate();
  const { total, items, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const [method, setMethod] = useState<PaymentMethod>('Credit Card');
  const [cardNumber, setCardNumber] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [cvv, setCvv] = useState('');
  const [expiry, setExpiry] = useState('');
  const [upiId, setUpiId] = useState('');
  const [processing, setProcessing] = useState(false);

  const TAX_RATE = 0.12;
  const tax = Math.round(total * TAX_RATE);
  const payable = total + tax;

  const handlePayNow = () => {
    setProcessing(true);
    const snapshot = [...items];
    const orderTotal = payable;
    setTimeout(() => {
      placeOrder(snapshot, orderTotal);
      clearCart();
      navigate('/order-confirmation', { state: { purchasedItems: snapshot } });
    }, 1200);
  };

  const methods: PaymentMethod[] = ['Credit Card', 'Debit card', 'UPI', 'Wallet'];

  return (
    <div className={styles.backdrop}>
      {/* Animated books background */}
      <div className={styles.bgIllustration}>
        <FloatingBooksIllustration />
      </div>

      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Complete Payment</h2>
          <span className={styles.payableAmount}>Payable Amount: ₹{payable}</span>
        </div>

        <div className={styles.modalBody}>
          {/* Payment method sidebar */}
          <div className={styles.methodList}>
            {methods.map(m => (
              <button
                key={m}
                className={`${styles.methodBtn} ${method === m ? styles.methodActive : ''}`}
                onClick={() => setMethod(m)}
              >
                {m}
              </button>
            ))}
          </div>

          {/* Payment form */}
          <div className={styles.paymentForm}>
            {(method === 'Credit Card' || method === 'Debit card') && (
              <>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Card Number</label>
                    <input
                      className={styles.input}
                      placeholder="XXXX-XXXX-XXXX-XXXX"
                      value={cardNumber}
                      onChange={e => setCardNumber(e.target.value)}
                      maxLength={19}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Name on Card</label>
                    <input
                      className={styles.input}
                      placeholder="Name"
                      value={nameOnCard}
                      onChange={e => setNameOnCard(e.target.value)}
                    />
                  </div>
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>CVV</label>
                    <input
                      className={styles.input}
                      placeholder="XXX"
                      value={cvv}
                      onChange={e => setCvv(e.target.value)}
                      maxLength={3}
                      type="password"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Date of Expiry</label>
                    <input
                      className={styles.input}
                      placeholder="MM/YYYY"
                      value={expiry}
                      onChange={e => setExpiry(e.target.value)}
                      maxLength={7}
                    />
                  </div>
                </div>
              </>
            )}

            {method === 'UPI' && (
              <div className={styles.formGroup}>
                <label className={styles.label}>UPI ID</label>
                <input
                  className={`${styles.input} ${styles.fullInput}`}
                  placeholder="yourname@upi"
                  value={upiId}
                  onChange={e => setUpiId(e.target.value)}
                />
              </div>
            )}

            {method === 'Wallet' && (
              <div className={styles.walletOptions}>
                {['Paytm', 'PhonePe', 'Amazon Pay', 'Google Pay'].map(w => (
                  <button key={w} className={styles.walletBtn}>{w}</button>
                ))}
              </div>
            )}

            <div className={styles.payBtnRow}>
              <button
                className={styles.payNowBtn}
                onClick={handlePayNow}
                disabled={processing}
              >
                {processing ? 'Processing...' : 'Pay Now 🏦'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FloatingBooksIllustration() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 900 600" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="900" height="600" fill="#1a3a5c" />
      {/* Background circles */}
      <circle cx="750" cy="80" r="100" fill="#2a4a6c" opacity="0.5" />
      <circle cx="100" cy="500" r="120" fill="#0d2137" opacity="0.5" />
      <circle cx="800" cy="500" r="80" fill="#2a4a6c" opacity="0.3" />
      {/* Diamond decorations */}
      <rect x="650" y="150" width="14" height="14" rx="2" fill="#f5a623" opacity="0.7" transform="rotate(45 657 157)" />
      <rect x="200" y="100" width="10" height="10" rx="1" fill="#e53e3e" opacity="0.6" transform="rotate(45 205 105)" />
      <rect x="760" y="380" width="12" height="12" rx="1" fill="#f5c518" opacity="0.7" transform="rotate(45 766 386)" />
      <rect x="80" y="280" width="10" height="10" rx="1" fill="#e53e3e" opacity="0.5" transform="rotate(45 85 285)" />
      <rect x="500" y="50" width="10" height="10" rx="1" fill="#f5a623" opacity="0.6" transform="rotate(45 505 55)" />
      {/* Wavy lines */}
      <path d="M50 350 Q 150 320 250 350 Q 350 380 450 350" stroke="#c8a862" strokeWidth="2" fill="none" opacity="0.4" />
      <path d="M500 500 Q 600 480 700 510 Q 800 535 850 510" stroke="#c8a862" strokeWidth="2" fill="none" opacity="0.4" />
      {/* Book 1 - large orange floating */}
      <g transform="translate(320, 60) rotate(-15)">
        <rect width="110" height="150" rx="6" fill="#c8842a" />
        <rect x="8" y="8" width="94" height="134" rx="4" fill="#d4922a" />
        <rect x="15" y="20" width="60" height="8" rx="2" fill="#8a5c1a" opacity="0.6" />
        <rect x="15" y="35" width="50" height="6" rx="2" fill="#8a5c1a" opacity="0.4" />
        <rect x="0" y="0" width="12" height="150" rx="3" fill="#a06820" />
      </g>
      {/* Book 2 - teal bottom center */}
      <g transform="translate(130, 420) rotate(8)">
        <rect width="90" height="120" rx="5" fill="#1a5a6a" />
        <rect x="7" y="7" width="76" height="106" rx="3" fill="#1e6878" />
        <rect x="12" y="18" width="50" height="6" rx="2" fill="#0d3a48" opacity="0.7" />
        <rect x="0" y="0" width="10" height="120" rx="3" fill="#0d3a48" />
      </g>
      {/* Book 3 - beige open book */}
      <g transform="translate(540, 430) rotate(-5)">
        <rect width="140" height="100" rx="4" fill="#d4c89a" />
        <rect x="68" y="0" width="4" height="100" rx="2" fill="#b0a070" />
        <rect x="10" y="15" width="50" height="4" rx="1" fill="#8a7850" opacity="0.5" />
        <rect x="10" y="25" width="50" height="4" rx="1" fill="#8a7850" opacity="0.4" />
        <rect x="10" y="35" width="40" height="4" rx="1" fill="#8a7850" opacity="0.3" />
        <rect x="78" y="15" width="50" height="4" rx="1" fill="#8a7850" opacity="0.5" />
        <rect x="78" y="25" width="50" height="4" rx="1" fill="#8a7850" opacity="0.4" />
      </g>
    </svg>
  );
}
