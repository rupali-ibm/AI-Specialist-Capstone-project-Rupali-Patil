import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CartItem } from '../types';
import styles from './OrderConfirmationPage.module.css';

export default function OrderConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const purchasedItems: CartItem[] = location.state?.purchasedItems ?? [];

  return (
    <div className={styles.backdrop}>
      <div className={styles.bgIllustration}>
        <ConfirmationBackground />
      </div>

      <div className={styles.modal}>
        {/* Success checkmark */}
        <div className={styles.successIcon}>
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="18" r="18" fill="#48bb78" />
            <path d="M10 18l6 6 10-12" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <p className={styles.successMsg}>
          Your purchase of the<br />following reads is successful
        </p>

        {/* Purchased books */}
        <div className={styles.booksList}>
          {purchasedItems.length === 0 ? (
            <p className={styles.noItems}>No items found.</p>
          ) : (
            purchasedItems.map(({ book }) => (
              <div key={book.id} className={styles.bookItem}>
                <div
                  className={styles.bookCover}
                  style={{ background: book.coverColor, color: book.coverTextColor }}
                >
                  <span className={styles.coverTitle}>{book.title}</span>
                  <span className={styles.coverAuthor}>{book.author}</span>
                </div>
                <div className={styles.bookInfo}>
                  <p className={styles.bookTitle}>{book.title}</p>
                  <p className={styles.bookAuthor}>by <span className={styles.authorLink}>{book.author}</span></p>
                  <p className={styles.bookDesc}>{book.description}</p>
                  <p className={styles.bookFormat}>{book.format}</p>
                  <p className={styles.bookGenres}>
                    {book.genres.map((g, i) => (
                      <span key={g}><span className={styles.genre}>{g}</span>{i < book.genres.length - 1 ? ', ' : ''}</span>
                    ))}
                  </p>
                  <p className={styles.bookPrice}>₹{book.price}</p>
                  <p className={styles.bookDelivery}>Delivery by <strong>{book.delivery}</strong></p>
                </div>
              </div>
            ))
          )}
        </div>

        <button className={styles.continueBtn} onClick={() => navigate('/')}>
          Continue your Shopping 🏦
        </button>
      </div>
    </div>
  );
}

function ConfirmationBackground() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 900 600" fill="none">
      <rect width="900" height="600" fill="#1a3a5c" />
      <circle cx="750" cy="80" r="100" fill="#2a4a6c" opacity="0.5" />
      <circle cx="100" cy="500" r="120" fill="#0d2137" opacity="0.5" />
      <circle cx="800" cy="500" r="80" fill="#2a4a6c" opacity="0.3" />
      <rect x="650" y="150" width="14" height="14" rx="2" fill="#f5a623" opacity="0.7" transform="rotate(45 657 157)" />
      <rect x="200" y="100" width="10" height="10" rx="1" fill="#e53e3e" opacity="0.6" transform="rotate(45 205 105)" />
      <rect x="760" y="380" width="12" height="12" rx="1" fill="#f5c518" opacity="0.7" transform="rotate(45 766 386)" />
      <rect x="80" y="280" width="10" height="10" rx="1" fill="#e53e3e" opacity="0.5" transform="rotate(45 85 285)" />
      <path d="M50 350 Q 150 320 250 350 Q 350 380 450 350" stroke="#c8a862" strokeWidth="2" fill="none" opacity="0.4" />
      <path d="M500 500 Q 600 480 700 510 Q 800 535 850 510" stroke="#c8a862" strokeWidth="2" fill="none" opacity="0.4" />
      <g transform="translate(320, 60) rotate(-15)">
        <rect width="110" height="150" rx="6" fill="#c8842a" />
        <rect x="8" y="8" width="94" height="134" rx="4" fill="#d4922a" />
        <rect x="0" y="0" width="12" height="150" rx="3" fill="#a06820" />
      </g>
      <g transform="translate(130, 420) rotate(8)">
        <rect width="90" height="120" rx="5" fill="#1a5a6a" />
        <rect x="7" y="7" width="76" height="106" rx="3" fill="#1e6878" />
        <rect x="0" y="0" width="10" height="120" rx="3" fill="#0d3a48" />
      </g>
      <g transform="translate(540, 430) rotate(-5)">
        <rect width="140" height="100" rx="4" fill="#d4c89a" />
        <rect x="68" y="0" width="4" height="100" rx="2" fill="#b0a070" />
      </g>
    </svg>
  );
}
