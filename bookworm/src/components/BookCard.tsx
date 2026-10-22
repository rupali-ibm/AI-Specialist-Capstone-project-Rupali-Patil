import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Book } from '../types';
import styles from './BookCard.module.css';

interface BookCardProps {
  book: Book;
  compact?: boolean;
}

export default function BookCard({ book, compact = false }: BookCardProps) {
  const navigate = useNavigate();

  const handleClick = () => navigate(`/book/${book.id}`);

  if (compact) {
    return (
      <div className={styles.compactCard} onClick={handleClick}>
        <BookCover book={book} size="sm" />
        <div className={styles.compactInfo}>
          <p className={styles.compactTitle}>{book.title}</p>
          <p className={styles.compactAuthor}>by <span className={styles.authorLink}>{book.author}</span></p>
          <p className={styles.compactDesc}>{book.description}</p>
          <p className={styles.compactFormat}>{book.format}</p>
          <p className={styles.genres}>
            {book.genres.map((g, i) => (
              <span key={g}><span className={styles.genre}>{g}</span>{i < book.genres.length - 1 ? ', ' : ''}</span>
            ))}
          </p>
          <p className={styles.compactPrice}>₹{book.price}</p>
          <p className={styles.delivery}>Delivery by <strong>{book.delivery}</strong></p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <div className={styles.coverWrapper} onClick={handleClick}>
        <BookCover book={book} size="lg" />
      </div>
      <div className={styles.info}>
        <p className={styles.title} onClick={handleClick}>{book.title}</p>
        <p className={styles.author}>by <span className={styles.authorLink}>{book.author}</span></p>
        <p className={styles.desc}>{book.description}</p>
        <p className={styles.format}>{book.format}</p>
        <p className={styles.genres}>
          {book.genres.map((g, i) => (
            <span key={g}><span className={styles.genre}>{g}</span>{i < book.genres.length - 1 ? ', ' : ''}</span>
          ))}
        </p>
        <p className={styles.price}>₹{book.price}</p>
        <p className={styles.delivery}>Delivery by <strong>{book.delivery}</strong></p>
      </div>
    </div>
  );
}

export function BookCover({ book, size }: { book: Book; size: 'sm' | 'md' | 'lg' }) {
  const sizeMap = { sm: { w: 60, h: 80 }, md: { w: 80, h: 110 }, lg: { w: 100, h: 140 } };
  const { w, h } = sizeMap[size];

  return (
    <div
      className={styles.cover}
      style={{ width: w, height: h, minWidth: w, background: book.coverColor, color: book.coverTextColor }}
    >
      <span className={styles.coverTitle}>{book.title}</span>
      <span className={styles.coverAuthor}>{book.author}</span>
    </div>
  );
}
