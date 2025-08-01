import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, Eye } from 'lucide-react';
import { Product } from '../../types';
import { formatPKR } from '../../data/products';
import WhatsAppOrderButton from '../WhatsApp/WhatsAppOrderButton';
import { useCart } from '../../contexts/CartContext';

interface ProductCardProps {
  product: Product;
  className?: string;
  showQuickActions?: boolean;
}

/**
 * Product card component optimized for Pakistani mobile users
 * Features: mobile-first design, PKR pricing, WhatsApp integration
 */
const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  className = '',
  showQuickActions = true 
}) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);
  const { addToCart } = useCart();

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link 
      to={`/product/${product.id}`}
      className={`group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 block ${className}`}
    >
      
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        {isImageLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
          </div>
        )}
        
        <img
          src={product.images[0]}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
            isImageLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={handleImageLoad}
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {product.isNew && (
            <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
              New
            </span>
          )}
          {product.isOnSale && discountPercentage > 0 && (
            <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
              -{discountPercentage}%
            </span>
          )}
          {product.featured && (
            <span className="bg-mustard text-black px-3 py-1 rounded text-xs font-bold border-2 border-black shadow-lg flex items-center justify-center">
              <svg className="w-3 h-3 mr-1 text-black" fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10" /></svg>
              Featured
            </span>
          )}
        </div>

        {/* Quick Actions */}
        {showQuickActions && (
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="flex flex-col space-y-2">
              <button
                onClick={handleToggleFavorite}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  isFavorited 
                    ? 'bg-red-500 text-white' 
                    : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
                }`}
              >
                <Heart size={16} className={isFavorited ? 'fill-current' : ''} />
              </button>
              
              <Link
                to={`/product/${product.id}`}
                onClick={(e) => e.stopPropagation()}
                className="w-8 h-8 bg-white/80 hover:bg-white text-gray-600 hover:text-black rounded-full flex items-center justify-center transition-colors"
              >
                <Eye size={16} />
              </Link>
            </div>
          </div>
        )}

        {/* Stock Status */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-white text-black px-4 py-2 rounded-lg font-semibold">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2">
          <h3 className="font-semibold text-gray-800 hover:text-black transition-colors line-clamp-2">
            {product.name}
          </h3>
          
          {product.brand && (
            <p className="text-sm text-gray-500 mt-1">{product.brand}</p>
          )}
        </div>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center space-x-1 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={`${
                    i < Math.floor(product.rating!)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">({product.reviewCount})</span>
          </div>
        )}

        {/* Price */}
        <div className="mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-black">
              {formatPKR(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatPKR(product.originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          {product.inStock ? (
            <>
              <button
                onClick={handleAddToCart}
                className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                Add to Cart
              </button>
              
              <WhatsAppOrderButton
                product={product}
                variant="outline"
                size="sm"
                className="w-full"
              />
            </>
          ) : (
            <button
              disabled
              className="w-full bg-gray-300 text-gray-500 py-2 px-4 rounded-lg cursor-not-allowed font-medium"
            >
              Out of Stock
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;