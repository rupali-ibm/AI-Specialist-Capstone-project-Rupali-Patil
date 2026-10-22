import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem } from '../types';

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered';
}

interface OrdersContextType {
  orders: Order[];
  placeOrder: (items: CartItem[], total: number) => Order;
}

const OrdersContext = createContext<OrdersContextType | null>(null);

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  const placeOrder = (items: CartItem[], total: number): Order => {
    const order: Order = {
      id: `ORD-${Date.now()}`,
      items,
      total,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'Processing',
    };
    setOrders(prev => [order, ...prev]);
    return order;
  };

  return (
    <OrdersContext.Provider value={{ orders, placeOrder }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error('useOrders must be used within OrdersProvider');
  return ctx;
}
