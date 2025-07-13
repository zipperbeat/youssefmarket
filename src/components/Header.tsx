import React from 'react';
import { ShoppingCart, User, LogOut, Settings, ShoppingBag } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

interface HeaderProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  onCartClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setCurrentView, onCartClick }) => {
  const { user, setUser, isAdmin, isClient, cart } = useApp();
  const { t } = useLanguage();

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    setUser(null);
    setCurrentView('catalog');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <ShoppingCart className="w-8 h-8 text-emerald-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">{t('store.name')}</h1>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => setCurrentView('catalog')}
              className={`${
                currentView === 'catalog' 
                  ? 'text-emerald-600 border-b-2 border-emerald-600' 
                  : 'text-gray-700 hover:text-emerald-600'
              } px-3 py-2 text-sm font-medium transition-colors`}
            >
              {t('nav.products')}
            </button>
            <button
              onClick={() => setCurrentView('categories')}
              className={`${
                currentView === 'categories' 
                  ? 'text-emerald-600 border-b-2 border-emerald-600' 
                  : 'text-gray-700 hover:text-emerald-600'
              } px-3 py-2 text-sm font-medium transition-colors`}
            >
              {t('nav.categories')}
            </button>
            {isAdmin && (
              <button
                onClick={() => setCurrentView('admin')}
                className={`${
                  currentView === 'admin' 
                    ? 'text-emerald-600 border-b-2 border-emerald-600' 
                    : 'text-gray-700 hover:text-emerald-600'
                } px-3 py-2 text-sm font-medium transition-colors`}
              >
                {t('nav.admin')}
              </button>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            
            {/* Cart Button */}
            {onCartClick && (
              <button
                onClick={onCartClick}
                className="relative p-2 text-gray-600 hover:text-emerald-600 transition-colors"
              >
                <ShoppingBag className="w-6 h-6" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </button>
            )}
            
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                  {isAdmin && (
                    <span className="px-2 py-1 text-xs bg-emerald-100 text-emerald-800 rounded-full">
                      Admin
                    </span>
                  )}
                  {isClient && (
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                      Client
                    </span>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">{t('nav.logout')}</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setCurrentView('login')}
                className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">{t('nav.login')}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;