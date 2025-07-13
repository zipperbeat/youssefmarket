import React, { createContext, useContext, useState } from 'react';

export type Language = 'fr' | 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  fr: {
    // Navigation
    'nav.products': 'Produits',
    'nav.categories': 'Catégories',
    'nav.admin': 'Admin',
    'nav.login': 'Connexion',
    'nav.logout': 'Déconnexion',
    'nav.register': 'S\'inscrire',
    
    // Store
    'store.name': 'YoussefMarket',
    'store.tagline': 'Découvrez nos produits frais et de qualité',
    
    // Product Catalog
    'catalog.title': 'Catalogue Produits',
    'catalog.description': 'Découvrez nos produits frais et de qualité',
    'catalog.search': 'Rechercher des produits...',
    'catalog.allCategories': 'Toutes les Catégories',
    'catalog.noProducts': 'Aucun produit trouvé',
    'catalog.noProductsDesc': 'Essayez d\'ajuster vos critères de recherche ou de filtre.',
    
    // Categories
    'categories.title': 'Catégories de Produits',
    'categories.description': 'Parcourez notre large gamme de catégories de produits',
    'categories.viewProducts': 'Voir les Produits →',
    'categories.products': 'produits',
    
    // Product Card
    'product.inStock': 'En Stock',
    'product.onRequest': 'Sur Demande',
    'product.requestQuote': 'Demander un Devis',
    'product.addToFavorites': 'Ajouter aux Favoris',
    'product.removeFromFavorites': 'Retirer des Favoris',
    
    // Quote Modal
    'quote.title': 'Demander un Devis',
    'quote.name': 'Nom',
    'quote.email': 'Email',
    'quote.phone': 'Téléphone',
    'quote.quantity': 'Quantité',
    'quote.message': 'Message Supplémentaire',
    'quote.messagePlaceholder': 'Exigences spécifiques ou questions...',
    'quote.send': 'Envoyer la Demande',
    'quote.whatsapp': 'WhatsApp',
    'quote.success': 'Demande de devis envoyée avec succès ! Nous vous contacterons bientôt.',
    
    // Login/Register
    'auth.welcomeBack': 'Bon Retour',
    'auth.signIn': 'Connectez-vous à votre compte',
    'auth.createAccount': 'Créer un Compte',
    'auth.joinUs': 'Rejoignez YoussefMarket',
    'auth.email': 'Adresse Email',
    'auth.password': 'Mot de Passe',
    'auth.confirmPassword': 'Confirmer le Mot de Passe',
    'auth.fullName': 'Nom Complet',
    'auth.signInButton': 'Se Connecter',
    'auth.registerButton': 'S\'inscrire',
    'auth.noAccount': 'Pas de compte ?',
    'auth.hasAccount': 'Déjà un compte ?',
    'auth.registerLink': 'Inscrivez-vous',
    'auth.loginLink': 'Connectez-vous',
    'auth.loginAsClient': 'Connexion Client',
    'auth.loginAsAdmin': 'Connexion Admin',
    
    // Admin Dashboard
    'admin.dashboard': 'Tableau de Bord Admin',
    'admin.addProduct': 'Ajouter Produit',
    'admin.addCategory': 'Ajouter Catégorie',
    'admin.totalProducts': 'Total Produits',
    'admin.visibleProducts': 'Produits Visibles',
    'admin.categories': 'Catégories',
    'admin.inStock': 'En Stock',
    'admin.products': 'Produits',
    'admin.product': 'Produit',
    'admin.category': 'Catégorie',
    'admin.price': 'Prix',
    'admin.status': 'Statut',
    'admin.actions': 'Actions',
    'admin.visible': 'Visible',
    'admin.hidden': 'Masqué',
    'admin.edit': 'Modifier',
    'admin.delete': 'Supprimer',
    'admin.show': 'Afficher',
    'admin.hide': 'Masquer',
    
    // Product Form
    'form.productName': 'Nom du Produit',
    'form.description': 'Description',
    'form.price': 'Prix (MAD)',
    'form.unit': 'Unité',
    'form.category': 'Catégorie',
    'form.image': 'URL de l\'Image',
    'form.inStock': 'En Stock',
    'form.visible': 'Visible pour les Clients',
    'form.save': 'Sauvegarder',
    'form.cancel': 'Annuler',
    'form.saving': 'Sauvegarde...',
    'form.addProduct': 'Ajouter un Produit',
    'form.editProduct': 'Modifier le Produit',
    'form.addCategory': 'Ajouter une Catégorie',
    'form.editCategory': 'Modifier la Catégorie',
    'form.categoryName': 'Nom de la Catégorie',
    'form.selectCategory': 'Sélectionner une Catégorie',
    
    // Validation
    'validation.required': 'Ce champ est requis',
    'validation.email': 'Adresse email invalide',
    'validation.password': 'Le mot de passe doit contenir au moins 6 caractères',
    'validation.passwordMatch': 'Les mots de passe ne correspondent pas',
    'validation.pricePositive': 'Le prix doit être supérieur à 0',
    
    // Messages
    'message.productAdded': 'Produit ajouté avec succès',
    'message.productUpdated': 'Produit modifié avec succès',
    'message.productDeleted': 'Produit supprimé avec succès',
    'message.categoryAdded': 'Catégorie ajoutée avec succès',
    'message.categoryUpdated': 'Catégorie modifiée avec succès',
    'message.categoryDeleted': 'Catégorie supprimée avec succès',
    'message.productHidden': 'Produit masqué avec succès',
    'message.productShown': 'Produit affiché avec succès',
    'message.loginSuccess': 'Connexion réussie',
    'message.registerSuccess': 'Inscription réussie',
    'message.addedToFavorites': 'Ajouté aux favoris',
    'message.removedFromFavorites': 'Retiré des favoris',
    
    // Currency
    'currency.mad': 'MAD',
    'currency.symbol': 'د.م',
    
    // Common
    'common.loading': 'Chargement...',
    'common.error': 'Erreur',
    'common.success': 'Succès',
    'common.close': 'Fermer',
    'common.confirm': 'Confirmer',
    'common.yes': 'Oui',
    'common.no': 'Non',
    'common.required': 'Requis',
    
    // Demo
    'demo.credentials': 'Identifiants de Démonstration',
    'demo.adminEmail': 'Email: admin@youssefmarket.com',
    'demo.adminPassword': 'Mot de passe: admin123',
    'demo.clientEmail': 'Email: client@example.com',
    'demo.clientPassword': 'Mot de passe: client123',
    
    // Orders
    'order.title': 'Passer Commande',
    'order.clientName': 'Nom du Client',
    'order.clientPhone': 'Téléphone',
    'order.clientEmail': 'Email (optionnel)',
    'order.notes': 'Notes',
    'order.notesPlaceholder': 'Instructions spéciales ou commentaires...',
    'order.placeOrder': 'Passer la Commande',
    'order.addToCart': 'Ajouter au Panier',
    'order.cart': 'Panier',
    'order.cartEmpty': 'Votre panier est vide',
    'order.cartItems': 'Articles dans le panier',
    'order.quantity': 'Quantité',
    'order.remove': 'Retirer',
    'order.total': 'Total',
    'order.success': 'Commande passée avec succès ! Nous vous contacterons bientôt.',
    'order.viewCart': 'Voir le Panier',
    'order.checkout': 'Finaliser',
    'order.continueShopping': 'Continuer les Achats',
    'order.orderSummary': 'Résumé de la Commande',
    'order.orderNumber': 'Numéro de Commande',
    'order.orderDate': 'Date de Commande',
    'order.orderStatus': 'Statut',
    'order.orderTotal': 'Total de la Commande',
    
    // Order Status
    'orderStatus.pending': 'En Attente',
    'orderStatus.confirmed': 'Confirmée',
    'orderStatus.preparing': 'En Préparation',
    'orderStatus.ready': 'Prête',
    'orderStatus.delivered': 'Livrée',
    'orderStatus.cancelled': 'Annulée',
    
    // Admin Orders
    'admin.orders': 'Commandes',
    'admin.orderManagement': 'Gestion des Commandes',
    'admin.totalOrders': 'Total Commandes',
    'admin.pendingOrders': 'Commandes en Attente',
    'admin.totalRevenue': 'Revenus Total',
    'admin.orderDetails': 'Détails de la Commande',
    'admin.updateStatus': 'Mettre à Jour le Statut',
    'admin.orderItems': 'Articles de la Commande',
    'admin.clientInfo': 'Informations Client',
    'admin.orderNotes': 'Notes de la Commande'
  },
  en: {
    // Navigation
    'nav.products': 'Products',
    'nav.categories': 'Categories',
    'nav.admin': 'Admin',
    'nav.login': 'Login',
    'nav.logout': 'Logout',
    'nav.register': 'Register',
    
    // Store
    'store.name': 'YoussefMarket',
    'store.tagline': 'Discover our fresh, quality products',
    
    // Product Catalog
    'catalog.title': 'Product Catalog',
    'catalog.description': 'Discover our fresh, quality products',
    'catalog.search': 'Search products...',
    'catalog.allCategories': 'All Categories',
    'catalog.noProducts': 'No products found',
    'catalog.noProductsDesc': 'Try adjusting your search or filter criteria.',
    
    // Categories
    'categories.title': 'Product Categories',
    'categories.description': 'Browse our wide range of product categories',
    'categories.viewProducts': 'View Products →',
    'categories.products': 'products',
    
    // Product Card
    'product.inStock': 'In Stock',
    'product.onRequest': 'On Request',
    'product.requestQuote': 'Request Quote',
    'product.addToFavorites': 'Add to Favorites',
    'product.removeFromFavorites': 'Remove from Favorites',
    
    // Quote Modal
    'quote.title': 'Request Quote',
    'quote.name': 'Name',
    'quote.email': 'Email',
    'quote.phone': 'Phone',
    'quote.quantity': 'Quantity',
    'quote.message': 'Additional Message',
    'quote.messagePlaceholder': 'Any specific requirements or questions...',
    'quote.send': 'Send Quote Request',
    'quote.whatsapp': 'WhatsApp',
    'quote.success': 'Quote request sent successfully! We will contact you soon.',
    
    // Login/Register
    'auth.welcomeBack': 'Welcome Back',
    'auth.signIn': 'Sign in to your account',
    'auth.createAccount': 'Create Account',
    'auth.joinUs': 'Join YoussefMarket',
    'auth.email': 'Email Address',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.fullName': 'Full Name',
    'auth.signInButton': 'Sign In',
    'auth.registerButton': 'Register',
    'auth.noAccount': 'No account?',
    'auth.hasAccount': 'Already have an account?',
    'auth.registerLink': 'Sign up',
    'auth.loginLink': 'Sign in',
    'auth.loginAsClient': 'Client Login',
    'auth.loginAsAdmin': 'Admin Login',
    
    // Admin Dashboard
    'admin.dashboard': 'Admin Dashboard',
    'admin.addProduct': 'Add Product',
    'admin.addCategory': 'Add Category',
    'admin.totalProducts': 'Total Products',
    'admin.visibleProducts': 'Visible Products',
    'admin.categories': 'Categories',
    'admin.inStock': 'In Stock',
    'admin.products': 'Products',
    'admin.product': 'Product',
    'admin.category': 'Category',
    'admin.price': 'Price',
    'admin.status': 'Status',
    'admin.actions': 'Actions',
    'admin.visible': 'Visible',
    'admin.hidden': 'Hidden',
    'admin.edit': 'Edit',
    'admin.delete': 'Delete',
    'admin.show': 'Show',
    'admin.hide': 'Hide',
    
    // Product Form
    'form.productName': 'Product Name',
    'form.description': 'Description',
    'form.price': 'Price (MAD)',
    'form.unit': 'Unit',
    'form.category': 'Category',
    'form.image': 'Image URL',
    'form.inStock': 'In Stock',
    'form.visible': 'Visible to Clients',
    'form.save': 'Save',
    'form.cancel': 'Cancel',
    'form.saving': 'Saving...',
    'form.addProduct': 'Add Product',
    'form.editProduct': 'Edit Product',
    'form.addCategory': 'Add Category',
    'form.editCategory': 'Edit Category',
    'form.categoryName': 'Category Name',
    'form.selectCategory': 'Select Category',
    
    // Validation
    'validation.required': 'This field is required',
    'validation.email': 'Invalid email address',
    'validation.password': 'Password must be at least 6 characters',
    'validation.passwordMatch': 'Passwords do not match',
    'validation.pricePositive': 'Price must be greater than 0',
    
    // Messages
    'message.productAdded': 'Product added successfully',
    'message.productUpdated': 'Product updated successfully',
    'message.productDeleted': 'Product deleted successfully',
    'message.categoryAdded': 'Category added successfully',
    'message.categoryUpdated': 'Category updated successfully',
    'message.categoryDeleted': 'Category deleted successfully',
    'message.productHidden': 'Product hidden successfully',
    'message.productShown': 'Product shown successfully',
    'message.loginSuccess': 'Login successful',
    'message.registerSuccess': 'Registration successful',
    'message.addedToFavorites': 'Added to favorites',
    'message.removedFromFavorites': 'Removed from favorites',
    
    // Currency
    'currency.mad': 'MAD',
    'currency.symbol': 'د.م',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.close': 'Close',
    'common.confirm': 'Confirm',
    'common.yes': 'Yes',
    'common.no': 'No',
    'common.required': 'Required',
    
    // Demo
    'demo.credentials': 'Demo Credentials',
    'demo.adminEmail': 'Email: admin@youssefmarket.com',
    'demo.adminPassword': 'Password: admin123',
    'demo.clientEmail': 'Email: client@example.com',
    'demo.clientPassword': 'Password: client123',
    
    // Orders
    'order.title': 'Place Order',
    'order.clientName': 'Client Name',
    'order.clientPhone': 'Phone Number',
    'order.clientEmail': 'Email (optional)',
    'order.notes': 'Notes',
    'order.notesPlaceholder': 'Special instructions or comments...',
    'order.placeOrder': 'Place Order',
    'order.addToCart': 'Add to Cart',
    'order.cart': 'Cart',
    'order.cartEmpty': 'Your cart is empty',
    'order.cartItems': 'Items in cart',
    'order.quantity': 'Quantity',
    'order.remove': 'Remove',
    'order.total': 'Total',
    'order.success': 'Order placed successfully! We will contact you soon.',
    'order.viewCart': 'View Cart',
    'order.checkout': 'Checkout',
    'order.continueShopping': 'Continue Shopping',
    'order.orderSummary': 'Order Summary',
    'order.orderNumber': 'Order Number',
    'order.orderDate': 'Order Date',
    'order.orderStatus': 'Status',
    'order.orderTotal': 'Order Total',
    
    // Order Status
    'orderStatus.pending': 'Pending',
    'orderStatus.confirmed': 'Confirmed',
    'orderStatus.preparing': 'Preparing',
    'orderStatus.ready': 'Ready',
    'orderStatus.delivered': 'Delivered',
    'orderStatus.cancelled': 'Cancelled',
    
    // Admin Orders
    'admin.orders': 'Orders',
    'admin.orderManagement': 'Order Management',
    'admin.totalOrders': 'Total Orders',
    'admin.pendingOrders': 'Pending Orders',
    'admin.totalRevenue': 'Total Revenue',
    'admin.orderDetails': 'Order Details',
    'admin.updateStatus': 'Update Status',
    'admin.orderItems': 'Order Items',
    'admin.clientInfo': 'Client Information',
    'admin.orderNotes': 'Order Notes'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};