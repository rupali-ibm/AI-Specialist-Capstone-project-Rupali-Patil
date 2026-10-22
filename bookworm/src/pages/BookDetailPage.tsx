import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BOOKS, REVIEWS } from '../data/books';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import Breadcrumb from '../components/Breadcrumb';
import BookCard from '../components/BookCard';
import StarRating from '../components/StarRating';
import styles from './BookDetailPage.module.css';

export default function BookDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(0);

  const book = BOOKS.find(b => b.id === id);
  if (!book) {
    return <div className={styles.notFound}>Book not found.</div>;
  }

  const related = BOOKS.filter(b => b.id !== book.id && b.genres.some(g => book.genres.includes(g))).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(book);
    navigate('/checkout');
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Home', to: '/' },
            { label: book.genres[0] ?? 'Books', to: '/' },
            { label: book.genres[1] ?? book.genres[0] ?? '', to: '/' },
          ]}
        />

        <div className={styles.content}>
          {/* Left: book visual */}
          <div className={styles.coverSection}>
            <div className={styles.bookCoverLarge} style={{ background: book.coverColor, color: book.coverTextColor }}>
              <span className={styles.coverTitleLg}>{book.title}</span>
              <blockquote className={styles.coverQuote}>"A refreshing path to clarity in a cluttered world."</blockquote>
              <span className={styles.coverAuthorLg}>{book.author}</span>
            </div>
            <div className={styles.bookCoverBack} style={{ background: book.coverColor, color: book.coverTextColor }}>
              <p className={styles.backDesc}>
                In <em>{book.title}</em>, {book.author} guides you through practical strategies to declutter your mind, space, and schedule. Whether you're overwhelmed, over-committed, or just over it — this book offers a calm, mindful approach to building a simpler, more fulfilling life.
              </p>
              <div className={styles.aboutAuthorBack}>
                <strong>About the Author</strong>
                <p>{book.authorBio?.substring(0, 200)}...</p>
              </div>
              <div className={styles.barcode}>▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌</div>
            </div>
          </div>

          {/* Middle: book info */}
          <div className={styles.infoSection}>
            <h1 className={styles.title}>{book.title}</h1>
            <p className={styles.author}>by <span className={styles.authorLink}>{book.author}</span></p>
            <p className={styles.desc}>{book.description}</p>
            {book.publisher && (
              <p className={styles.publisher}>Published by: <span className={styles.pubLink}>{book.publisher}</span></p>
            )}
            <p className={styles.format}>{book.format}</p>
            <p className={styles.genres}>
              {book.genres.map((g, i) => (
                <span key={g}><span className={styles.genre}>{g}</span>{i < book.genres.length - 1 ? ', ' : ''}</span>
              ))}
            </p>
            <p className={styles.price}>₹{book.price}</p>
            <p className={styles.delivery}>Delivery by <strong>{book.delivery}</strong></p>

            <div className={styles.actions}>
              <button className={styles.addToCartBtn} onClick={handleAddToCart}>
                Add to Cart
                <CartIcon />
              </button>
              <button
                className={`${styles.wishlistBtn} ${isWishlisted(book.id) ? styles.wishlisted : ''}`}
                onClick={() => toggleWishlist(book)}
              >
                {isWishlisted(book.id) ? 'Wishlisted' : 'Add to Wishlist'}
                <WishlistIcon filled={isWishlisted(book.id)} />
              </button>
            </div>

            <div className={styles.metaRow}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>🌐 Language</span>
                <span className={styles.metaValue}>{book.language ?? 'English'}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>☆ Rating</span>
                <StarRating rating={book.rating ?? 0} size="sm" />
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>$ Sells</span>
                <span className={styles.metaValue}>{book.sellsCount ?? 0} copies sold</span>
              </div>
            </div>
          </div>

          {/* Right: related reads */}
          <aside className={styles.relatedSidebar}>
            <h3 className={styles.relatedTitle}>Related Reads</h3>
            {related.map(r => (
              <BookCard key={r.id} book={r} compact />
            ))}
          </aside>
        </div>

        {/* About the writer */}
        <section className={styles.authorSection}>
          <h2 className={styles.sectionHeading}>About the writer</h2>
          <div className={styles.authorCard}>
            <img
              src={book.authorImage ?? `https://i.pravatar.cc/80?img=1`}
              alt={book.author}
              className={styles.authorAvatar}
            />
            <div>
              <h3 className={styles.authorName}>{book.author}</h3>
              <p className={styles.authorBio}>{book.authorBio}</p>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className={styles.reviewsSection}>
          <h2 className={styles.sectionHeading}>Reviews</h2>
          <div className={styles.reviewLayout}>
            {/* Leave a review */}
            <div className={styles.reviewForm}>
              <label className={styles.reviewLabel}>
                Leave Your Review
                <span className={styles.charCount}>{reviewText.length}/100</span>
              </label>
              <textarea
                className={styles.reviewTextarea}
                placeholder="Placeholder text"
                maxLength={100}
                value={reviewText}
                onChange={e => setReviewText(e.target.value)}
              />
              <div className={styles.reviewFormFooter}>
                <StarRating
                  rating={reviewRating}
                  interactive
                  onChange={setReviewRating}
                  size="md"
                />
                <button className={styles.submitBtn} onClick={() => { setReviewText(''); setReviewRating(0); }}>
                  Submit →
                </button>
              </div>
            </div>

            {/* Existing reviews */}
            <div className={styles.reviewList}>
              {REVIEWS.map(r => (
                <div key={r.id} className={styles.reviewItem}>
                  <h4 className={styles.reviewerName}>{r.reviewer}</h4>
                  <p className={styles.reviewText}>{r.text}</p>
                  <StarRating rating={r.rating} size="sm" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function CartIcon() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}

function WishlistIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="16" height="16" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" />
    </svg>
  );
}
