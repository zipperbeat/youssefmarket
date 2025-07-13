import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Product, Category, User, Order, OrderItem, CartItem } from '../types';

export const useSupabase = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Categories
  const fetchCategories = async (): Promise<Category[]> => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;

      return data.map(cat => ({
        id: cat.id,
        name: cat.name,
        description: cat.description,
        image: cat.image,
        productCount: 0 // Will be calculated separately
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching categories');
      return [];
    } finally {
      setLoading(false);
    }
  };

  const addCategory = async (category: Omit<Category, 'id' | 'productCount'>) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('categories')
        .insert({
          name: category.name,
          description: category.description,
          image: category.image
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error adding category');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateCategory = async (id: string, updates: Partial<Category>) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('categories')
        .update({
          name: updates.name,
          description: updates.description,
          image: updates.image
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating category');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting category');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Products
  const fetchProducts = async (): Promise<Product[]> => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories (name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data.map(product => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        unit: product.unit,
        category: product.categories?.name || '',
        image: product.image,
        inStock: product.in_stock,
        visible: product.visible,
        createdAt: product.created_at,
        updatedAt: product.updated_at
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching products');
      return [];
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    setLoading(true);
    setError(null);
    
    try {
      // Get category ID
      const { data: categoryData, error: categoryError } = await supabase
        .from('categories')
        .select('id')
        .eq('name', product.category)
        .single();

      if (categoryError) throw categoryError;

      const { data, error } = await supabase
        .from('products')
        .insert({
          name: product.name,
          description: product.description,
          price: product.price,
          unit: product.unit,
          category_id: categoryData.id,
          image: product.image,
          in_stock: product.inStock,
          visible: product.visible
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error adding product');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    setLoading(true);
    setError(null);
    
    try {
      let categoryId = undefined;
      
      if (updates.category) {
        const { data: categoryData, error: categoryError } = await supabase
          .from('categories')
          .select('id')
          .eq('name', updates.category)
          .single();

        if (categoryError) throw categoryError;
        categoryId = categoryData.id;
      }

      const updateData: any = {};
      if (updates.name) updateData.name = updates.name;
      if (updates.description) updateData.description = updates.description;
      if (updates.price !== undefined) updateData.price = updates.price;
      if (updates.unit) updateData.unit = updates.unit;
      if (categoryId) updateData.category_id = categoryId;
      if (updates.image) updateData.image = updates.image;
      if (updates.inStock !== undefined) updateData.in_stock = updates.inStock;
      if (updates.visible !== undefined) updateData.visible = updates.visible;

      const { data, error } = await supabase
        .from('products')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating product');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting product');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Authentication
  const signUp = async (email: string, password: string, name: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name
          }
        }
      });

      if (error) throw error;

      // Create profile
      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            name,
            email,
            role: 'client'
          });

        if (profileError) throw profileError;
      }

      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error signing up');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error signing in');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error signing out');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getCurrentUser = async (): Promise<User | null> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return null;

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      return {
        id: profile.id,
        name: profile.name,
        email: profile.email,
        role: profile.role,
        createdAt: profile.created_at
      };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error getting current user');
      return null;
    }
  };

  // Favorites
  const fetchUserFavorites = async (userId: string): Promise<string[]> => {
    try {
      const { data, error } = await supabase
        .from('user_favorites')
        .select('product_id')
        .eq('user_id', userId);

      if (error) throw error;
      return data.map(fav => fav.product_id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching favorites');
      return [];
    }
  };

  const addToFavorites = async (userId: string, productId: string) => {
    try {
      const { error } = await supabase
        .from('user_favorites')
        .insert({
          user_id: userId,
          product_id: productId
        });

      if (error) throw error;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error adding to favorites');
      throw err;
    }
  };

  const removeFromFavorites = async (userId: string, productId: string) => {
    try {
      const { error } = await supabase
        .from('user_favorites')
        .delete()
        .eq('user_id', userId)
        .eq('product_id', productId);

      if (error) throw error;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error removing from favorites');
      throw err;
    }
  };

  // Quote Requests
  const submitQuoteRequest = async (quoteData: {
    productId: string;
    productName: string;
    clientName: string;
    clientEmail: string;
    clientPhone?: string;
    quantity: number;
    message?: string;
  }) => {
    try {
      const { data, error } = await supabase
        .from('quote_requests')
        .insert({
          product_id: quoteData.productId,
          product_name: quoteData.productName,
          client_name: quoteData.clientName,
          client_email: quoteData.clientEmail,
          client_phone: quoteData.clientPhone,
          quantity: quoteData.quantity,
          message: quoteData.message
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error submitting quote request');
      throw err;
    }
  };

  // Orders
  const fetchOrders = async (): Promise<Order[]> => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            id,
            product_id,
            product_name,
            quantity,
            unit_price,
            total_price,
            created_at
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data.map(order => ({
        id: order.id,
        clientName: order.client_name,
        clientPhone: order.client_phone,
        clientEmail: order.client_email,
        totalAmount: order.total_amount,
        notes: order.notes,
        status: order.status,
        createdAt: order.created_at,
        updatedAt: order.updated_at,
        items: order.order_items.map((item: any) => ({
          id: item.id,
          orderId: order.id,
          productId: item.product_id,
          productName: item.product_name,
          quantity: item.quantity,
          unitPrice: item.unit_price,
          totalPrice: item.total_price,
          createdAt: item.created_at
        }))
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching orders');
      return [];
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (orderData: {
    clientName: string;
    clientPhone: string;
    clientEmail?: string;
    notes?: string;
    items: CartItem[];
  }) => {
    setLoading(true);
    setError(null);
    
    try {
      // Calculate total
      const totalAmount = orderData.items.reduce(
        (sum, item) => sum + (item.product.price * item.quantity), 
        0
      );

      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          client_name: orderData.clientName,
          client_phone: orderData.clientPhone,
          client_email: orderData.clientEmail,
          notes: orderData.notes,
          total_amount: totalAmount
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = orderData.items.map(item => ({
        order_id: order.id,
        product_id: item.product.id,
        product_name: item.product.name,
        quantity: item.quantity,
        unit_price: item.product.price,
        total_price: item.product.price * item.quantity
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      return order;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error creating order');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('orders')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', orderId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating order status');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    // Categories
    fetchCategories,
    addCategory,
    updateCategory,
    deleteCategory,
    // Products
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    // Auth
    signUp,
    signIn,
    signOut,
    getCurrentUser,
    // Favorites
    fetchUserFavorites,
    addToFavorites,
    removeFromFavorites,
    // Quote Requests
    submitQuoteRequest,
    // Orders
    fetchOrders,
    createOrder,
    updateOrderStatus
  };
};