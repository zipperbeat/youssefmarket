import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { useLanguage } from '../contexts/LanguageContext';
import ProductCard from './ProductCard';
import QuoteModal from './QuoteModal';
import { Product } from '../types';

const ProductGrid: React.FC = () => {
  const { filteredProducts, loading, addToCart } = useApp();
  const { t } = useLanguage();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  const handleRequestQuote = (product: Product) => {
    setSelectedProduct(product);
    setShowQuoteModal(true);
  };

  const handleCloseModal = () => {
    setShowQuoteModal(false);
    setSelectedProduct(null);
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
        <p className="text-gray-600">{t('common.loading')}</p>
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🔍</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">{t('catalog.noProducts')}</h3>
        <p className="text-gray-600">{t('catalog.noProductsDesc')}</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onRequestQuote={handleRequestQuote}
            onAddToCart={addToCart}
          />
        ))}
      </div>
      
      {showQuoteModal && selectedProduct && (
        <QuoteModal
          product={selectedProduct}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default ProductGrid;