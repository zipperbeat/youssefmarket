import { Product, Category } from '../types';

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Epicerie',
    description: 'Produits alimentaires de base et conserves',
    image: 'https://images.pexels.com/photos/4110251/pexels-photo-4110251.jpeg',
    productCount: 15
  },
  {
    id: '2',
    name: 'Hygiène & Beauté',
    description: 'Produits de soins personnels et cosmétiques',
    image: 'https://images.pexels.com/photos/3735657/pexels-photo-3735657.jpeg',
    productCount: 12
  },
  {
    id: '3',
    name: 'Produits Frais',
    description: 'Viandes, poissons et produits frais',
    image: 'https://images.pexels.com/photos/65175/pexels-photo-65175.jpeg',
    productCount: 18
  },
  {
    id: '4',
    name: 'Boissons Froides', 
    description: 'Boissons rafraîchissantes et jus',
    image: 'https://images.pexels.com/photos/544961/pexels-photo-544961.jpeg',
    productCount: 14
  },
  {
    id: '5',
    name: 'Gateaux Dessert',
    description: 'Pâtisseries et desserts sucrés',
    image: 'https://images.pexels.com/photos/298217/pexels-photo-298217.jpeg',
    productCount: 10
  },
  {
    id: '6',
    name: 'Chocolats & Confiseries',
    description: 'Chocolats fins et bonbons',
    image: 'https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg',
    productCount: 12
  },
  {
    id: '7',
    name: 'Boissons Chaudes',
    description: 'Café, thé et boissons chaudes',
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
    productCount: 9
  },
  {
    id: '8',
    name: 'Produits Laitiers',
    description: 'Lait, fromages et produits laitiers',
    image: 'https://images.pexels.com/photos/236010/pexels-photo-236010.jpeg',
    productCount: 16
  },
  {
    id: '9',
    name: 'Entretien & Nettoyage',
    description: 'Produits ménagers et nettoyage',
    image: 'https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg',
    productCount: 11
  },
  {
    id: '10',
    name: 'Asiatique',
    description: 'Spécialités et produits asiatiques',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    productCount: 13
  }
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Riz Basmati Premium',
    description: 'Riz basmati de qualité supérieure, grain long',
    price: 49.90,
    unit: '1kg',
    category: 'Epicerie',
    image: 'https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg',
    inStock: true,
    visible: true,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Shampoing Doux',
    description: 'Shampoing pour cheveux normaux, formule douce',
    price: 69.90,
    unit: '250ml',
    category: 'Hygiène & Beauté',
    image: 'https://images.pexels.com/photos/3735657/pexels-photo-3735657.jpeg',
    inStock: true,
    visible: true,
    createdAt: '2024-01-15T10:35:00Z',
    updatedAt: '2024-01-15T10:35:00Z'
  },
  {
    id: '3',
    name: 'Saumon Frais',
    description: 'Filet de saumon frais de Norvège',
    price: 189.90,
    unit: '500g',
    category: 'Produits Frais',
    image: 'https://images.pexels.com/photos/65175/pexels-photo-65175.jpeg',
    inStock: true,
    visible: true,
    createdAt: '2024-01-15T10:40:00Z',
    updatedAt: '2024-01-15T10:40:00Z'
  },
  {
    id: '4',
    name: 'Coca-Cola',
    description: 'Boisson gazeuse rafraîchissante',
    price: 29.90,
    unit: '500ml',
    category: 'Boissons Froides',
    image: 'https://images.pexels.com/photos/544961/pexels-photo-544961.jpeg',
    inStock: true,
    visible: true,
    createdAt: '2024-01-15T10:45:00Z',
    updatedAt: '2024-01-15T10:45:00Z'
  },
  {
    id: '5',
    name: 'Tarte aux Pommes',
    description: 'Tarte aux pommes artisanale',
    price: 89.90,
    unit: '1 pièce',
    category: 'Gateaux Dessert',
    image: 'https://images.pexels.com/photos/298217/pexels-photo-298217.jpeg',
    inStock: true,
    visible: true,
    createdAt: '2024-01-15T10:55:00Z',
    updatedAt: '2024-01-15T10:55:00Z'
  },
  {
    id: '6',
    name: 'Chocolat Noir 70%',
    description: 'Tablette de chocolat noir intense',
    price: 49.90,
    unit: '100g',
    category: 'Chocolats & Confiseries',
    image: 'https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg',
    inStock: true,
    visible: true,
    createdAt: '2024-01-15T11:00:00Z',
    updatedAt: '2024-01-15T11:00:00Z'
  },
  {
    id: '7',
    name: 'Café Arabica',
    description: 'Café en grains 100% Arabica',
    price: 129.90,
    unit: '500g',
    category: 'Boissons Chaudes',
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
    inStock: true,
    visible: true,
    createdAt: '2024-01-15T11:05:00Z',
    updatedAt: '2024-01-15T11:05:00Z'
  },
  {
    id: '8',
    name: 'Lait Entier Bio',
    description: 'Lait entier biologique de ferme',
    price: 39.90,
    unit: '1L',
    category: 'Produits Laitiers',
    image: 'https://images.pexels.com/photos/236010/pexels-photo-236010.jpeg',
    inStock: true,
    visible: true,
    createdAt: '2024-01-15T11:10:00Z',
    updatedAt: '2024-01-15T11:10:00Z'
  },
  {
    id: '9',
    name: 'Liquide Vaisselle',
    description: 'Liquide vaisselle concentré citron',
    price: 29.90,
    unit: '500ml',
    category: 'Entretien & Nettoyage',
    image: 'https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg',
    inStock: true,
    visible: true,
    createdAt: '2024-01-15T11:15:00Z',
    updatedAt: '2024-01-15T11:15:00Z'
  },
  {
    id: '10',
    name: 'Sauce Soja',
    description: 'Sauce soja traditionnelle japonaise',
    price: 44.90,
    unit: '250ml',
    category: 'Asiatique',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    inStock: true,
    visible: true,
    createdAt: '2024-01-15T11:20:00Z',
    updatedAt: '2024-01-15T11:20:00Z'
  },
  {
    id: '11',
    name: 'Fromage Camembert',
    description: 'Camembert de Normandie AOP',
    price: 59.90,
    unit: '250g',
    category: 'Produits Laitiers',
    image: 'https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg',
    inStock: true,
    visible: true,
    createdAt: '2024-01-15T11:25:00Z',
    updatedAt: '2024-01-15T11:25:00Z'
  }
];