import { createClient } from '@supabase/supabase-js';

// Use placeholder values if environment variables are not set
const defaultUrl = 'https://placeholder.supabase.co';
const defaultKey = 'placeholder-anon-key';

// Helper function to validate URL
const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Get environment variables with validation
const envUrl = import.meta.env.VITE_SUPABASE_URL;
const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseUrl = envUrl && isValidUrl(envUrl) ? envUrl : defaultUrl;
const supabaseAnonKey = envKey && envKey.trim() !== '' ? envKey : defaultKey;

export const supabase = createClient(
  supabaseUrl, 
  supabaseAnonKey, 
  {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return envUrl && envKey && 
         isValidUrl(envUrl) && 
         envUrl !== defaultUrl && 
         envKey !== defaultKey;
};

// Database types
export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          description: string;
          image: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          image: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          image?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          description: string;
          price: number;
          unit: string;
          category_id: string;
          image: string;
          in_stock: boolean;
          visible: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          price: number;
          unit: string;
          category_id: string;
          image: string;
          in_stock?: boolean;
          visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          price?: number;
          unit?: string;
          category_id?: string;
          image?: string;
          in_stock?: boolean;
          visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          name: string;
          email: string;
          role: 'admin' | 'client';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          email: string;
          role?: 'admin' | 'client';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          role?: 'admin' | 'client';
          created_at?: string;
          updated_at?: string;
        };
      };
      user_favorites: {
        Row: {
          id: string;
          user_id: string;
          product_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          product_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          product_id?: string;
          created_at?: string;
        };
      };
      quote_requests: {
        Row: {
          id: string;
          product_id: string;
          product_name: string;
          client_name: string;
          client_email: string;
          client_phone: string | null;
          quantity: number;
          message: string | null;
          status: 'pending' | 'responded' | 'closed';
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          product_name: string;
          client_name: string;
          client_email: string;
          client_phone?: string | null;
          quantity?: number;
          message?: string | null;
          status?: 'pending' | 'responded' | 'closed';
          created_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          product_name?: string;
          client_name?: string;
          client_email?: string;
          client_phone?: string | null;
          quantity?: number;
          message?: string | null;
          status?: 'pending' | 'responded' | 'closed';
          created_at?: string;
        };
      };
    };
  };
}