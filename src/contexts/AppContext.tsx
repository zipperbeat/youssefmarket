import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Category, User, Order, CartItem } from '../types';
import { useSupabase } from '../hooks/useSupabase';
import { isSupabaseConfigured } from '../lib/supabase';
import { useLanguage } from './LanguageContext';
import { supabase } from '../lib/supabase';
import { mockProducts, mockCategories } from '../data/mockData';

interface AppContextType {
  products: Product[];
  categories: Category[];
  cart: CartItem[];
  orders: Order[];
  selectedCategory: string;
  searchQuery: string;
  user: User | null;
  isAdmin: boolean;
  isClient: boolean;
  favorites: string[];
  loading: boolean;
  setSelectedCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
  setUser: (user: User | null) => void;
  addToFavorites: (productId: string) => void;
  removeFromFavorites: (productId: string) => void;
  addToCart: (product: Product) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  registerUser: (userData: { name: string; email: string; password: string }) => Promise<boolean>;
  loginUser: (email: string, password: string) => Promise<boolean>;
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addCategory: (category: Omit<Category, 'id' | 'productCount'>) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  createOrder: (orderData: { clientName: string; clientPhone: string; clientEmail?: string; notes?: string; items: CartItem[] }) => Promise<void>;
  fetchOrders: () => Promise<Order[]>;
  updateOrderStatus: (orderId: string, status: Order['status']) => Promise<void>;
  filteredProducts: Product[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  
  const supabaseHooks = useSupabase();

  const isAdmin = user?.role === 'admin';
  const isClient = user?.role === 'client';

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const isVisible = isAdmin || product.visible;
    return matchesCategory && matchesSearch && isVisible;
  });

  const createOrder = async (orderData: { clientName: string; clientPhone: string; clientEmail?: string; notes?: string; items: CartItem[] }) => {
    if (!isSupabaseConfigured()) {
      // Mock create order
      const newOrder: Order = {
        id: Date.now().toString(),
        clientName: orderData.clientName,
        clientPhone: orderData.clientPhone,
        clientEmail: orderData.clientEmail,
        notes: orderData.notes,
        items: orderData.items.map(item => ({
          id: Date.now().toString() + Math.random(),
          orderId: Date.now().toString(),
          productId: item.product.id,
          productName: item.product.name,
          quantity: item.quantity,
          unitPrice: item.product.price,
          totalPrice: item.product.price * item.quantity,
          createdAt: new Date().toISOString()
        })),
        totalAmount: orderData.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0),
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setOrders(prev => [...prev, newOrder]);
      return;
    }
    
    try {
      await supabaseHooks.createOrder(orderData);
      await fetchOrders();
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

  const fetchOrders = async (): Promise<Order[]> => {
    if (!isSupabaseConfigured()) {
      // Return mock orders
      return orders;
    }
    
    try {
      const ordersData = await supabaseHooks.fetchOrders();
      setOrders(ordersData);
      return ordersData;
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  };

  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    if (!isSupabaseConfigured()) {
      // Mock update order status
      setOrders(prev => prev.map(order => 
        order.id === orderId 
          ? { ...order, status, updatedAt: new Date().toISOString() }
          : order
      ));
      return;
    }
    
    try {
      await supabaseHooks.updateOrderStatus(orderId, status);
      await fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  };

  const registerUser = async (userData: { name: string; email: string; password: string }): Promise<boolean> => {
    if (!isSupabaseConfigured()) {
      // Mock registration for demo
      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        role: 'client'
      };
      setUser(newUser);
      return true;
    }
    
    try {
      await supabaseHooks.signUp(userData.email, userData.password, userData.name);
      // User will be set via auth state change
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const loginUser = async (email: string, password: string): Promise<boolean> => {
    if (!isSupabaseConfigured()) {
      // Mock login for demo
      let mockUser: User;
      if (email === 'admin@youssefmarket.com' && password === 'admin123') {
        mockUser = {
          id: 'admin-1',
          name: 'Admin User',
          email: 'admin@youssefmarket.com',
          role: 'admin'
        };
      } else if (email === 'client@example.com' && password === 'client123') {
        mockUser = {
          id: 'client-1',
          name: 'Client User',
          email: 'client@example.com',
          role: 'client'
        };
      } else {
        return false;
      }
      setUser(mockUser);
      return true;
    }
    
    try {
      // First try demo credentials for fallback
      if ((email === 'admin@youssefmarket.com' && password === 'admin123') ||
          (email === 'client@example.com' && password === 'client123')) {
        // Demo credentials cannot be used when Supabase is configured
        throw new Error('Demo credentials are not available when Supabase is configured. Please register a new account or use your existing credentials.');
      }
      
      await supabaseHooks.signIn(email, password);
      // User will be set via auth state change
      return true;
    } catch (error) {
      console.error('Login error:', error);
      
      // If it's an invalid credentials error and user tried demo credentials,
      // suggest they either register or use demo mode
      if (error instanceof Error && error.message.includes('Invalid login credentials')) {
        if (email === 'admin@youssefmarket.com' || email === 'client@example.com') {
          throw new Error('Demo credentials not found in this Supabase project. Please register a new account or remove Supabase configuration to use demo mode.');
        } else {
          throw new Error('Invalid login credentials. Please check your email and password or register a new account.');
        }
      }
      
      throw error;
    }
  };

  const addProduct = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!isSupabaseConfigured()) {
      // Mock add product
      const newProduct: Product = {
        ...productData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setProducts(prev => [...prev, newProduct]);
      return;
    }
    
    try {
      await supabaseHooks.addProduct(productData);
      await loadProducts();
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  };

  const updateProduct = async (id: string, productData: Partial<Product>) => {
    if (!isSupabaseConfigured()) {
      // Mock update product
      setProducts(prev => prev.map(product => 
        product.id === id 
          ? { ...product, ...productData, updatedAt: new Date().toISOString() }
          : product
      ));
      return;
    }
    
    try {
      await supabaseHooks.updateProduct(id, productData);
      await loadProducts();
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  };

  const deleteProduct = async (id: string) => {
    if (!isSupabaseConfigured()) {
      // Mock delete product
      setProducts(prev => prev.filter(product => product.id !== id));
      return;
    }
    
    try {
      await supabaseHooks.deleteProduct(id);
      await loadProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  };

  const addCategory = async (categoryData: Omit<Category, 'id' | 'productCount'>) => {
    if (!isSupabaseConfigured()) {
      // Mock add category
      const newCategory: Category = {
        ...categoryData,
        id: Date.now().toString(),
        productCount: 0
      };
      setCategories(prev => [...prev, newCategory]);
      return;
    }
    
    try {
      await supabaseHooks.addCategory(categoryData);
      await loadCategories();
    } catch (error) {
      console.error('Error adding category:', error);
      throw error;
    }
  };

  const updateCategory = async (id: string, categoryData: Partial<Category>) => {
    if (!isSupabaseConfigured()) {
      // Mock update category
      setCategories(prev => prev.map(category => 
        category.id === id 
          ? { ...category, ...categoryData }
          : category
      ));
      return;
    }
    
    try {
      await supabaseHooks.updateCategory(id, categoryData);
      await loadCategories();
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  };

  const deleteCategory = async (id: string) => {
    if (!isSupabaseConfigured()) {
      // Mock delete category
      setCategories(prev => prev.filter(category => category.id !== id));
      return;
    }
    
    try {
      await supabaseHooks.deleteCategory(id);
      await loadCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  };

  const loadProducts = async () => {
    if (!isSupabaseConfigured()) {
      setProducts(mockProducts);
      return;
    }
    
    try {
      const productsData = await supabaseHooks.fetchProducts();
      setProducts(productsData);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  const loadCategories = async () => {
    if (!isSupabaseConfigured()) {
      setCategories(mockCategories);
      return;
    }
    
    try {
      const categoriesData = await supabaseHooks.fetchCategories();
      // Update product counts
      const categoriesWithCounts = categoriesData.map(category => ({
        ...category,
        productCount: products.filter(product => product.category === category.name).length
      }));
      setCategories(categoriesWithCounts);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const loadUserFavorites = async (userId: string) => {
    if (!isSupabaseConfigured()) {
      // Mock favorites
      setFavorites(['1', '3']);
      return;
    }
    
    try {
      const favoritesData = await supabaseHooks.fetchUserFavorites(userId);
      setFavorites(favoritesData);
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  // Initialize data and auth state
  useEffect(() => {
    const initializeApp = async () => {
      setLoading(true);
      
      if (!isSupabaseConfigured()) {
        // Use mock data when Supabase is not configured
        setProducts(mockProducts);
        setCategories(mockCategories);
        setLoading(false);
        return;
      }
      
      // Check for existing session
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const currentUser = await supabaseHooks.getCurrentUser();
          setUser(currentUser);
          if (currentUser) {
            await loadUserFavorites(currentUser.id);
          }
        }
        
        // Load initial data
        await loadProducts();
        await loadCategories();
      } catch (error) {
        console.error('Supabase connection failed, using mock data:', error);
        setProducts(mockProducts);
        setCategories(mockCategories);
      }
      
      setLoading(false);
    };

    initializeApp();

    // Listen for auth changes only if Supabase is configured
    let subscription: any = null;
    if (isSupabaseConfigured()) {
      const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          const currentUser = await supabaseHooks.getCurrentUser();
          setUser(currentUser);
          if (currentUser) {
            await loadUserFavorites(currentUser.id);
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setFavorites([]);
        }
      });
      subscription = data.subscription;
    }

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  // Update category product counts when products change
  useEffect(() => {
    if (categories.length > 0 && products.length > 0) {
      const categoriesWithCounts = categories.map(category => ({
        ...category,
        productCount: products.filter(product => product.category === category.name).length
      }));
      setCategories(categoriesWithCounts);
    }
  }, [products]);

  const addToFavorites = async (productId: string) => {
    if (!user) return;
    
    if (!isSupabaseConfigured()) {
      // Mock add to favorites
      setFavorites(prev => [...prev, productId]);
      return;
    }
    
    try {
      await supabaseHooks.addToFavorites(user.id, productId);
      setFavorites(prev => [...prev, productId]);
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  const removeFromFavorites = async (productId: string) => {
    if (!user) return;
    
    if (!isSupabaseConfigured()) {
      // Mock remove from favorites
      setFavorites(prev => prev.filter(id => id !== productId));
      return;
    }
    
    try {
      await supabaseHooks.removeFromFavorites(user.id, productId);
      setFavorites(prev => prev.filter(id => id !== productId));
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, {
          product: product,
          quantity: 1
        }];
      }
    });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item =>
      item.product.id === productId
        ? { ...item, quantity }
        : item
    ));
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <AppContext.Provider value={{
      products,
      categories,
      cart,
      orders,
      selectedCategory,
      searchQuery,
      user,
      isAdmin,
      isClient,
      favorites,
      loading,
      setSelectedCategory,
      setSearchQuery,
      setUser,
      addToFavorites,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      clearCart,
      removeFromFavorites,
      registerUser,
      loginUser,
      addProduct,
      updateProduct,
      deleteProduct,
      addCategory,
      updateCategory,
      deleteCategory,
      createOrder,
      fetchOrders,
      updateOrderStatus,
      filteredProducts
    }}>
      {children}
    </AppContext.Provider>
  );
};