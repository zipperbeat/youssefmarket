export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  category: string;
  image: string;
  inStock: boolean;
  visible: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'client';
  favorites?: string[];
  createdAt?: string;
}

export interface QuoteRequest {
  id: string;
  productId: string;
  productName: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  quantity: number;
  message: string;
  status: 'pending' | 'responded' | 'closed';
  createdAt: string;
}

export interface Order {
  id: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  totalAmount: number;
  notes?: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}