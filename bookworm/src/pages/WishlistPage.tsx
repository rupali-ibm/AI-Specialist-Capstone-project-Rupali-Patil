import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { BookCover } from '../components/BookCard';
import styles from './WishlistPage.module.css';

export default function WishlistPage() {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <span className={styles.emptyIcon}>🤍</span>
        <p className={styles.emptyTitle}>Your wishlist is empty</p>
        <p className={styles.emptySubtitle}>Browse books and click "Add to Wishlist" to save them here.</p>
        <button className={styles.browseBtn} onClick={() => navigate('/')}>Browse Books</button>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>My Wishlist</h1>
          <span className={styles.count}>{items.length} {items.length === 1 ? 'book' : 'books'}</span>
        </div>

        <div className={styles.grid}>
          {items.map(book => (
            <div key={book.id} className={styles.card}>
              <div className={styles.coverWrapper} onClick={() => navigate(`/book/${book.id}`)}>
                <BookCover book={book} size="md" />
              </div>
              <div className={styles.info}>
                <p className={styles.bookTitle} onClick={() => navigate(`/book/${book.id}`)}>{book.title}</p>
                <p className={styles.bookAuthor}>by <span className={styles.authorLink}>{book.author}</span></p>
                <p className={styles.bookFormat}>{book.format}</p>
                <p className={styles.bookGenres}>
                  {book.genres.map((g, i) => (
                    <span key={g}>
                      <span className={styles.genre}>{g}</span>
                      {i < book.genres.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </p>
                <p className={styles.bookPrice}>₹{book.price}</p>
                <p className={styles.bookDelivery}>Delivery by <strong>{book.delivery}</strong></p>
              </div>
              <div className={styles.actions}>
                <button
                  className={styles.addToCartBtn}
                  onClick={() => { addToCart(book); navigate('/checkout'); }}
                >
                  Add to Cart
                </button>
                <button
                  className={styles.removeBtn}
                  onClick={() => removeFromWishlist(book.id)}
                  title="Remove from wishlist"
                >
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
