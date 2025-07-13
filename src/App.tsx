import React, { useState, useEffect } from 'react';
import { AppProvider } from './contexts/AppContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { isSupabaseConfigured } from './lib/supabase';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import ProductGrid from './components/ProductGrid';
import CategoryGrid from './components/CategoryGrid';
import LoginForm from './components/LoginForm';
import AdminDashboard from './components/AdminDashboard';
import CartModal from './components/CartModal';
import OrderForm from './components/OrderForm';
import Toast from './components/Toast';

function App() {
  const [currentView, setCurrentView] = useState<'catalog' | 'categories' | 'login' | 'admin'>('catalog');
  const [showCart, setShowCart] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleCartClick = () => {
    setShowCart(true);
  };

  const handleCheckout = () => {
    setShowCart(false);
    setShowOrderForm(true);
  };

  const handleOrderSuccess = () => {
    setShowOrderForm(false);
    setToast({ type: 'success', message: 'Commande passée avec succès!' });
    setTimeout(() => setToast(null), 3000);
  };

  // Handle navigation from CategoryGrid
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#catalog') {
        setCurrentView('catalog');
        window.location.hash = '';
      }
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderContent = () => {
    switch (currentView) {
      case 'login':
        return (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <LoginForm onSuccess={() => setCurrentView('catalog')} />
          </div>
        );
      case 'admin':
        return (
          <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <AdminDashboard />
            </div>
          </div>
        );
      case 'categories':
        return (
          <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Catégories de Produits</h1>
                <p className="text-gray-600">Parcourez notre large gamme de catégories de produits</p>
              </div>
              <CategoryGrid />
            </div>
          </div>
        );
      case 'catalog':
      default:
        return (
          <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Catalogue Produits</h1>
                    <p className="text-gray-600">Découvrez nos produits frais et de qualité</p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <SearchBar />
                  </div>
                </div>
                <CategoryFilter />
              </div>
              <ProductGrid />
            </div>
          </div>
        );
    }
  };

  return (
    <LanguageProvider>
      <AppProvider>
        {!isSupabaseConfigured() && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>Mode Démonstration:</strong> L'application fonctionne avec des données de test. 
                  Pour utiliser une vraie base de données, configurez Supabase dans le fichier .env
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="min-h-screen bg-gray-50">
          <Header 
            currentView={currentView} 
            setCurrentView={setCurrentView}
            onCartClick={handleCartClick}
          />
          {renderContent()}
          
          {/* Cart Modal */}
          {showCart && (
            <CartModal
              onClose={() => setShowCart(false)}
              onCheckout={handleCheckout}
            />
          )}
          
          {/* Order Form Modal */}
          {showOrderForm && (
            <OrderForm
              onClose={() => setShowOrderForm(false)}
              onSuccess={handleOrderSuccess}
            />
          )}
          
          {/* Toast Notification */}
          {toast && (
            <Toast
              type={toast.type}
              message={toast.message}
              onClose={() => setToast(null)}
            />
          )}
        </div>
      </AppProvider>
    </LanguageProvider>
  );
}

export default App;