/*
  # Insert Sample Products

  1. Sample Products
    - Insert products for each category
    - Use proper category references
    - Set appropriate prices in MAD
*/

-- Insert sample products
DO $$
DECLARE
  epicerie_id uuid;
  hygiene_id uuid;
  frais_id uuid;
  boissons_froides_id uuid;
  gateaux_id uuid;
  chocolats_id uuid;
  boissons_chaudes_id uuid;
  laitiers_id uuid;
  entretien_id uuid;
  asiatique_id uuid;
BEGIN
  -- Get category IDs
  SELECT id INTO epicerie_id FROM categories WHERE name = 'Epicerie';
  SELECT id INTO hygiene_id FROM categories WHERE name = 'Hygiène & Beauté';
  SELECT id INTO frais_id FROM categories WHERE name = 'Produits Frais';
  SELECT id INTO boissons_froides_id FROM categories WHERE name = 'Boissons Froides';
  SELECT id INTO gateaux_id FROM categories WHERE name = 'Gateaux Dessert';
  SELECT id INTO chocolats_id FROM categories WHERE name = 'Chocolats & Confiseries';
  SELECT id INTO boissons_chaudes_id FROM categories WHERE name = 'Boissons Chaudes';
  SELECT id INTO laitiers_id FROM categories WHERE name = 'Produits Laitiers';
  SELECT id INTO entretien_id FROM categories WHERE name = 'Entretien & Nettoyage';
  SELECT id INTO asiatique_id FROM categories WHERE name = 'Asiatique';

  -- Insert products
  INSERT INTO products (name, description, price, unit, category_id, image, in_stock, visible) VALUES
    ('Riz Basmati Premium', 'Riz basmati de qualité supérieure, grain long', 49.90, '1kg', epicerie_id, 'https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg', true, true),
    ('Huile d''Olive Extra Vierge', 'Huile d''olive première pression à froid', 89.90, '500ml', epicerie_id, 'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg', true, true),
    ('Pâtes Italiennes', 'Pâtes de blé dur de qualité premium', 25.90, '500g', epicerie_id, 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg', true, true),
    
    ('Shampoing Doux', 'Shampoing pour cheveux normaux, formule douce', 69.90, '250ml', hygiene_id, 'https://images.pexels.com/photos/3735657/pexels-photo-3735657.jpeg', true, true),
    ('Dentifrice Blancheur', 'Dentifrice blanchissant au fluor', 35.90, '75ml', hygiene_id, 'https://images.pexels.com/photos/298864/pexels-photo-298864.jpeg', true, true),
    
    ('Saumon Frais', 'Filet de saumon frais de Norvège', 189.90, '500g', frais_id, 'https://images.pexels.com/photos/65175/pexels-photo-65175.jpeg', true, true),
    ('Poulet Fermier', 'Poulet fermier élevé au grain', 79.90, '1kg', frais_id, 'https://images.pexels.com/photos/616354/pexels-photo-616354.jpeg', true, true),
    ('Crevettes Fraîches', 'Crevettes fraîches de la côte', 149.90, '500g', frais_id, 'https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg', true, true),
    
    ('Coca-Cola', 'Boisson gazeuse rafraîchissante', 29.90, '500ml', boissons_froides_id, 'https://images.pexels.com/photos/544961/pexels-photo-544961.jpeg', true, true),
    ('Jus d''Orange Frais', 'Jus d''orange 100% naturel', 39.90, '1L', boissons_froides_id, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg', true, true),
    
    ('Tarte aux Pommes', 'Tarte aux pommes artisanale', 89.90, '1 pièce', gateaux_id, 'https://images.pexels.com/photos/298217/pexels-photo-298217.jpeg', true, true),
    ('Éclair au Chocolat', 'Éclair fourré à la crème au chocolat', 25.90, '1 pièce', gateaux_id, 'https://images.pexels.com/photos/2067396/pexels-photo-2067396.jpeg', true, true),
    
    ('Chocolat Noir 70%', 'Tablette de chocolat noir intense', 49.90, '100g', chocolats_id, 'https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg', true, true),
    ('Bonbons Assortis', 'Mélange de bonbons colorés', 35.90, '200g', chocolats_id, 'https://images.pexels.com/photos/1055272/pexels-photo-1055272.jpeg', true, true),
    
    ('Café Arabica', 'Café en grains 100% Arabica', 129.90, '500g', boissons_chaudes_id, 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg', true, true),
    ('Thé Vert Bio', 'Thé vert biologique en sachets', 45.90, '20 sachets', boissons_chaudes_id, 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg', true, true),
    
    ('Lait Entier Bio', 'Lait entier biologique de ferme', 39.90, '1L', laitiers_id, 'https://images.pexels.com/photos/236010/pexels-photo-236010.jpeg', true, true),
    ('Fromage Camembert', 'Camembert de Normandie AOP', 59.90, '250g', laitiers_id, 'https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg', true, true),
    ('Yaourt Nature', 'Yaourt nature au lait entier', 15.90, '4x125g', laitiers_id, 'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg', true, true),
    
    ('Liquide Vaisselle', 'Liquide vaisselle concentré citron', 29.90, '500ml', entretien_id, 'https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg', true, true),
    ('Lessive Liquide', 'Lessive liquide pour linge délicat', 79.90, '1L', entretien_id, 'https://images.pexels.com/photos/4239119/pexels-photo-4239119.jpeg', true, true),
    
    ('Sauce Soja', 'Sauce soja traditionnelle japonaise', 44.90, '250ml', asiatique_id, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg', true, true),
    ('Nouilles Ramen', 'Nouilles ramen instantanées', 19.90, '85g', asiatique_id, 'https://images.pexels.com/photos/884600/pexels-photo-884600.jpeg', true, true),
    ('Riz Jasmin', 'Riz jasmin parfumé de Thaïlande', 55.90, '1kg', asiatique_id, 'https://images.pexels.com/photos/1586947/pexels-photo-1586947.jpeg', true, true);
END $$;