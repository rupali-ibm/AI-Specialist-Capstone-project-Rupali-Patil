export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  format: 'Paperback' | 'Hard Cover' | 'eBook' | 'Hardcover';
  genres: string[];
  delivery: string;
  coverColor: string;
  coverTextColor: string;
  publisher?: string;
  language?: string;
  rating?: number;
  sellsCount?: number;
  authorBio?: string;
  authorImage?: string;
}

export interface CartItem {
  book: Book;
  quantity: number;
}

export interface Review {
  id: string;
  reviewer: string;
  text: string;
  rating: number;
}

export interface Address {
  firstName: string;
  lastName: string;
  addressLine: string;
  email: string;
  city: string;
  pin: string;
  phoneNumber: string;
  state: string;
  country: string;
}
