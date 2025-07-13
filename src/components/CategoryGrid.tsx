import React from 'react';
import { useApp } from '../contexts/AppContext';
import { useLanguage } from '../contexts/LanguageContext';

const CategoryGrid: React.FC = () => {
  const { categories, setSelectedCategory, setSearchQuery, loading } = useApp();
  const { t } = useLanguage();

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setSearchQuery('');
    // Navigate to catalog view if we're not already there
    window.location.hash = '#catalog';
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
        <p className="text-gray-600">{t('common.loading')}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map(category => (
        <div
          key={category.id}
          onClick={() => handleCategoryClick(category.name)}
          className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden cursor-pointer group"
        >
          <div className="relative overflow-hidden">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-xl font-bold mb-1">{category.name}</h3>
              <p className="text-sm opacity-90">{category.description}</p>
            </div>
          </div>
          
          <div className="p-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                {category.productCount} {t('categories.products')}
              </span>
              <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
                {t('categories.viewProducts')}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryGrid;