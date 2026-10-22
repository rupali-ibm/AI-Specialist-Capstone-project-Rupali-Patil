import React, { useState, useMemo } from 'react';
import BookCard from '../components/BookCard';
import { BOOKS, CATEGORIES, RECOMMENDED_IDS, BESTSELLER_IDS, NEW_LAUNCH_IDS } from '../data/books';
import { Book } from '../types';
import styles from './CataloguePage.module.css';

const FORMATS = ['All', 'Paperback', 'Hard Cover', 'eBook', 'Hardcover'];
const LANGUAGES = ['All', 'English', 'Hindi', 'Spanish', 'French'];

function applySort(books: Book[], sortBy: string): Book[] {
  const copy = [...books];
  if (sortBy === 'Price Low') return copy.sort((a, b) => a.price - b.price);
  if (sortBy === 'Price High') return copy.sort((a, b) => b.price - a.price);
  if (sortBy === 'Rating') return copy.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
  return copy;
}

export default function CataloguePage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState('All');
  const [format, setFormat] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const [sortBy, setSortBy] = useState('Relevance');

  // true when user has applied any filter/search beyond just "All" with no search
  const isFiltered = activeCategory !== 'All' || searchQuery !== '' || format !== 'All' || language !== 'All' || priceRange !== 'All';

  const filteredBooks = useMemo(() => {
    let books = BOOKS.filter(book => {
      const matchesCategory =
        activeCategory === 'All' ||
        book.genres.some(g => g.toLowerCase() === activeCategory.toLowerCase());

      const matchesSearch =
        searchQuery === '' ||
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFormat = format === 'All' || book.format === format;
      const matchesLanguage = language === 'All' || book.language === language;

      const matchesPrice =
        priceRange === 'All' ||
        (priceRange === '0-200' && book.price < 200) ||
        (priceRange === '200-400' && book.price >= 200 && book.price <= 400) ||
        (priceRange === '400+' && book.price > 400);

      return matchesCategory && matchesSearch && matchesFormat && matchesLanguage && matchesPrice;
    });
    return applySort(books, sortBy);
  }, [activeCategory, searchQuery, language, format, priceRange, sortBy]);

  // Curated sections only used on the "All" homepage view
  const recommended = RECOMMENDED_IDS.map(id => BOOKS.find(b => b.id === id)!).filter(Boolean);
  const bestsellers = BESTSELLER_IDS.map(id => BOOKS.find(b => b.id === id)!).filter(Boolean);
  const newLaunches = NEW_LAUNCH_IDS.map(id => BOOKS.find(b => b.id === id)!).filter(Boolean);

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`${styles.categoryBtn} ${activeCategory === cat ? styles.active : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </aside>

      {/* Main content */}
      <main className={styles.main}>
        {/* Filters row */}
        <div className={styles.filtersRow}>
          <div className={styles.searchBox}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search you want to read here"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <span className={styles.searchIcon}>🔍</span>
          </div>
          <select className={styles.select} value={language} onChange={e => setLanguage(e.target.value)}>
            <option value="" disabled>Language</option>
            {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
          <select className={styles.select} value={format} onChange={e => setFormat(e.target.value)}>
            <option value="" disabled>Format (Paperback, ebook etc)</option>
            {FORMATS.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
          <select className={styles.select} value={priceRange} onChange={e => setPriceRange(e.target.value)}>
            <option value="All">Price Range — All</option>
            <option value="0-200">Under ₹200</option>
            <option value="200-400">₹200–₹400</option>
            <option value="400+">₹400+</option>
          </select>
          <select className={styles.select} value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="Relevance">Sort by — Relevance</option>
            <option value="Price Low">Price: Low to High</option>
            <option value="Price High">Price: High to Low</option>
            <option value="Rating">Top Rated</option>
          </select>
        </div>

        {/* ── Filtered / category view ── */}
        {isFiltered ? (
          filteredBooks.length === 0 ? (
            <div className={styles.empty}>No books found for your filters.</div>
          ) : (
            <BookSection title={`${activeCategory === 'All' ? 'Results' : activeCategory} (${filteredBooks.length})`} books={filteredBooks} />
          )
        ) : (
          /* ── Home "All" curated sections ── */
          <>
            <BookSection title="Recommended for You" books={recommended} />
            <BookSection title="Bestsellers this Month" books={bestsellers} />
            <BookSection title="New Launches" books={newLaunches} />
          </>
        )}
      </main>
    </div>
  );
}

function BookSection({ title, books }: { title: string; books: Book[] }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.bookGrid}>
        {books.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
}
