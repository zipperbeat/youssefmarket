/*
  # Initial Schema for YoussefMarket

  1. New Tables
    - `categories`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `description` (text)
      - `image` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `products`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `price` (decimal)
      - `unit` (text)
      - `category_id` (uuid, foreign key)
      - `image` (text)
      - `in_stock` (boolean)
      - `visible` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `users`
      - Uses Supabase Auth (auth.users)
      - `profiles` table for additional user data
    
    - `user_favorites`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `product_id` (uuid, foreign key to products)
      - `created_at` (timestamp)
    
    - `quote_requests`
      - `id` (uuid, primary key)
      - `product_id` (uuid, foreign key)
      - `client_name` (text)
      - `client_email` (text)
      - `client_phone` (text)
      - `quantity` (integer)
      - `message` (text)
      - `status` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Admin-only policies for products/categories management
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text NOT NULL,
  image text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price decimal(10,2) NOT NULL DEFAULT 0,
  unit text NOT NULL,
  category_id uuid REFERENCES categories(id) ON DELETE CASCADE,
  image text NOT NULL,
  in_stock boolean DEFAULT true,
  visible boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create user profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text NOT NULL,
  role text DEFAULT 'client' CHECK (role IN ('admin', 'client')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create user favorites table
CREATE TABLE IF NOT EXISTS user_favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- Create quote requests table
CREATE TABLE IF NOT EXISTS quote_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  product_name text NOT NULL,
  client_name text NOT NULL,
  client_email text NOT NULL,
  client_phone text,
  quantity integer DEFAULT 1,
  message text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'responded', 'closed')),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;

-- Categories policies
CREATE POLICY "Categories are viewable by everyone"
  ON categories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Categories are manageable by admins"
  ON categories
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Products policies
CREATE POLICY "Products are viewable by everyone"
  ON products
  FOR SELECT
  TO public
  USING (visible = true OR EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  ));

CREATE POLICY "Products are manageable by admins"
  ON products
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- User favorites policies
CREATE POLICY "Users can manage own favorites"
  ON user_favorites
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Quote requests policies
CREATE POLICY "Quote requests are viewable by admins"
  ON quote_requests
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Anyone can create quote requests"
  ON quote_requests
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert initial categories
INSERT INTO categories (name, description, image) VALUES
  ('Epicerie', 'Produits alimentaires de base et conserves', 'https://images.pexels.com/photos/4110251/pexels-photo-4110251.jpeg'),
  ('Hygiène & Beauté', 'Produits de soins personnels et cosmétiques', 'https://images.pexels.com/photos/3735657/pexels-photo-3735657.jpeg'),
  ('Produits Frais', 'Viandes, poissons et produits frais', 'https://images.pexels.com/photos/65175/pexels-photo-65175.jpeg'),
  ('Boissons Froides', 'Boissons rafraîchissantes et jus', 'https://images.pexels.com/photos/544961/pexels-photo-544961.jpeg'),
  ('Gateaux Dessert', 'Pâtisseries et desserts sucrés', 'https://images.pexels.com/photos/298217/pexels-photo-298217.jpeg'),
  ('Chocolats & Confiseries', 'Chocolats fins et bonbons', 'https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg'),
  ('Boissons Chaudes', 'Café, thé et boissons chaudes', 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg'),
  ('Produits Laitiers', 'Lait, fromages et produits laitiers', 'https://images.pexels.com/photos/236010/pexels-photo-236010.jpeg'),
  ('Entretien & Nettoyage', 'Produits ménagers et nettoyage', 'https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg'),
  ('Asiatique', 'Spécialités et produits asiatiques', 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg')
ON CONFLICT (name) DO NOTHING;