import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrders, Order } from '../context/OrdersContext';
import { BookCover } from '../components/BookCard';
import styles from './OrdersPage.module.css';

const STATUS_COLOR: Record<Order['status'], string> = {
  Processing: '#f5a623',
  Shipped: '#4a9eff',
  Delivered: '#48bb78',
};

export default function OrdersPage() {
  const { orders } = useOrders();
  const navigate = useNavigate();

  if (orders.length === 0) {
    return (
      <div className={styles.empty}>
        <span className={styles.emptyIcon}>📦</span>
        <p className={styles.emptyTitle}>No orders yet</p>
        <p className={styles.emptySubtitle}>Books you purchase will appear here.</p>
        <button className={styles.browseBtn} onClick={() => navigate('/')}>Browse Books</button>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>My Orders</h1>
          <span className={styles.count}>{orders.length} {orders.length === 1 ? 'order' : 'orders'}</span>
        </div>

        <div className={styles.orderList}>
          {orders.map(order => (
            <div key={order.id} className={styles.orderCard}>
              {/* Order header */}
              <div className={styles.orderHeader}>
                <div className={styles.orderMeta}>
                  <span className={styles.orderId}>{order.id}</span>
                  <span className={styles.orderDate}>Placed on {order.date}</span>
                </div>
                <div className={styles.orderRight}>
                  <span
                    className={styles.statusBadge}
                    style={{ background: STATUS_COLOR[order.status] + '22', color: STATUS_COLOR[order.status], borderColor: STATUS_COLOR[order.status] + '55' }}
                  >
                    {order.status}
                  </span>
                  <span className={styles.orderTotal}>₹{order.total}</span>
                </div>
              </div>

              {/* Order items */}
              <div className={styles.itemsGrid}>
                {order.items.map(({ book, quantity }) => (
                  <div key={book.id} className={styles.item} onClick={() => navigate(`/book/${book.id}`)}>
                    <BookCover book={book} size="sm" />
                    <div className={styles.itemInfo}>
                      <p className={styles.itemTitle}>{book.title}</p>
                      <p className={styles.itemAuthor}>by {book.author}</p>
                      <p className={styles.itemFormat}>{book.format}</p>
                      <p className={styles.itemPrice}>₹{book.price} × {quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className={styles.orderActions}>
                <button
                  className={styles.buyAgainBtn}
                  onClick={() => {
                    order.items.forEach(({ book }) => navigate(`/book/${book.id}`));
                    navigate(`/book/${order.items[0].book.id}`);
                  }}
                >
                  Buy Again
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
