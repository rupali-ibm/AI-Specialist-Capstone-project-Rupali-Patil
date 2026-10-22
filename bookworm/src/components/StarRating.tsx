import React from 'react';
import styles from './StarRating.module.css';

interface StarRatingProps {
  rating: number;
  max?: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
  size?: 'sm' | 'md';
}

export default function StarRating({ rating, max = 5, interactive = false, onChange, size = 'md' }: StarRatingProps) {
  return (
    <span className={`${styles.stars} ${styles[size]}`}>
      {Array.from({ length: max }).map((_, i) => {
        const filled = i < Math.floor(rating);
        const half = !filled && i < rating;
        return (
          <span
            key={i}
            className={`${styles.star} ${filled ? styles.filled : ''} ${half ? styles.half : ''}`}
            onClick={interactive && onChange ? () => onChange(i + 1) : undefined}
            style={{ cursor: interactive ? 'pointer' : 'default' }}
          >
            ★
          </span>
        );
      })}
    </span>
  );
}
