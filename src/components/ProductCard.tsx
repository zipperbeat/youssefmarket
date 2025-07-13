import React from 'react';
import { Package, MessageCircle, ExternalLink, Heart, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../contexts/AppContext';
import { useLanguage } from '../contexts/LanguageContext';

interface ProductCardProps {
  product: Product;
  onRequestQuote?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onRequestQuote, onAddToCart }) => {
  const { isAdmin, isClient, favorites, addToFavorites, removeFromFavorites } = useApp();
  const { t } = useLanguage();
  
  const isFavorite = favorites.includes(product.id);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
          // Could show a toast notification here
          console.log('Link copied to clipboard');
        })
        .catch(console.error);
    }
  };

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product.id);
    }
  };

  const formatPrice = (price: number) => {
    return `${price.toFixed(2)} ${t('currency.symbol')}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 flex space-x-2">
          {!product.visible && isAdmin && (
            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
              Hidden
            </span>
          )}
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
            product.inStock 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {product.inStock ? t('product.inStock') : t('product.onRequest')}
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
            {product.name}
          </h3>
          <div className="text-right">
            <div className="text-xl font-bold text-emerald-600">
              {formatPrice(product.price)}
            </div>
            <div className="text-sm text-gray-500">{product.unit}</div>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Package className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-500">{product.category}</span>
          </div>
        </div>
        
        <div className="flex space-x-2">
          {isClient && (
            <button
              onClick={handleFavoriteToggle}
              className={`${
                isFavorite 
                  ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } py-2 px-3 rounded-lg transition-colors`}
              title={isFavorite ? t('product.removeFromFavorites') : t('product.addToFavorites')}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          )}
          {onAddToCart && (
            <button
              onClick={() => onAddToCart(product)}
              className="bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors"
              title={t('order.addToCart')}
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => onRequestQuote?.(product)}
            className={`${onAddToCart ? 'flex-1' : 'flex-1'} bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2`}
          >
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm font-medium">{t('product.requestQuote')}</span>
          </button>
          <button
            onClick={handleShare}
            className="bg-gray-100 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;