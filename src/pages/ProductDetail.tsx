import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Heart, Share2, Star, Shield, Truck, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { SAMPLE_PRODUCTS, formatPKR } from '../data/products';
import { getUserProducts } from '../services/productService';
import { useCart } from '../contexts/CartContext';
import WhatsAppOrderButton from '../components/WhatsApp/WhatsAppOrderButton';
import ProductCard from '../components/Product/ProductCard';
import { Product } from '../types';

/**
 * Product detail page optimized for Pakistani mobile users
 * Features: image gallery, specifications, WhatsApp ordering
 */
const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'delivery'>('description');
  const [userProducts, setUserProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load user products
  useEffect(() => {
    const loadUserProducts = async () => {
      try {
        const products = await getUserProducts();
        setUserProducts(products);
      } catch (error) {
        console.error('Failed to load user products:', error);
        setUserProducts([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUserProducts();
  }, []);

  // Find product in both sample and user products
  const allProducts = [...SAMPLE_PRODUCTS, ...userProducts];
  const product = allProducts.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  const relatedProducts = allProducts
    .filter(p => p.id !== product.id && (p.category === product.category || p.subcategory === product.subcategory))
    .slice(0, 4);

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleImageNavigation = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentImageIndex(prev => prev === 0 ? product.images.length - 1 : prev - 1);
    } else {
      setCurrentImageIndex(prev => prev === product.images.length - 1 ? 0 : prev + 1);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: product.name,
      text: `Check out this ${product.name} from ARHAMA KI DUKAN - ${formatPKR(product.price)}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Product link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-6">
        
        {/* Breadcrumb */}
        <nav className="text-sm mb-6">
          <div className="flex items-center space-x-2 text-gray-600">
            <a href="/" className="hover:text-black">Home</a>
            <span>/</span>
            <a href={`/products/${product.category}`} className="hover:text-black">
              {product.category === 'watches' ? 'Watches' : 'Jewelry'}
            </a>
            <span>/</span>
            <span className="text-black">{product.name}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              {/* Navigation arrows for multiple images */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => handleImageNavigation('prev')}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => handleImageNavigation('next')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              {/* Image indicators */}
              {product.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col space-y-2">
                {product.isNew && (
                  <span className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-medium">
                    New Arrival
                  </span>
                )}
                {product.isOnSale && discountPercentage > 0 && (
                  <span className="bg-red-500 text-white px-3 py-1 rounded text-sm font-medium">
                    Save {discountPercentage}%
                  </span>
                )}
                {product.featured && (
                  <span className="bg-mustard text-white px-3 py-1 rounded text-sm font-medium">
                    Featured
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail strip for multiple images */}
            {product.images.length > 1 && (
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex ? 'border-black' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            
            {/* Header */}
            <div>
              {product.brand && (
                <p className="text-gray-600 mb-2">{product.brand}</p>
              )}
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                {product.name}
              </h1>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className={`${
                          i < Math.floor(product.rating!)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">({product.reviewCount} reviews)</span>
                </div>
              )}

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl font-bold text-black">
                    {formatPKR(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-gray-500 line-through">
                      {formatPKR(product.originalPrice)}
                    </span>
                  )}
                  {discountPercentage > 0 && (
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                      -{discountPercentage}%
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Price includes all taxes • Prices in Pakistani Rupees
                </p>
              </div>
            </div>

            {/* Stock Status */}
            <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-medium text-green-800">
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              {product.inStock && (
                <p className="text-green-700 text-sm mt-1">
                  Ready for immediate delivery across Pakistan
                </p>
              )}
            </div>

            {/* Quick Product Details */}
            {(product.material || product.warranty) && (
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                {product.material && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Material:</span>
                    <span className="font-medium">{product.material}</span>
                  </div>
                )}
                {product.warranty && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Warranty:</span>
                    <span className="font-medium">{product.warranty}</span>
                  </div>
                )}
              </div>
            )}

            {/* Quantity and Actions */}
            {product.inStock && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="font-medium">Quantity:</label>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 hover:bg-gray-100 transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 hover:bg-gray-100 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-mustard text-black py-4 px-6 rounded-lg hover:bg-yellow-400 transition-colors font-semibold text-lg"
                  >
                    Add to Cart - {formatPKR(product.price * quantity)}
                  </button>
                  
                  <WhatsAppOrderButton
                    product={product}
                    quantity={quantity}
                    variant="secondary"
                    size="lg"
                    className="w-full"
                  />
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center space-x-4 pt-4 border-t">
              <button
                onClick={() => setIsFavorited(!isFavorited)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                  isFavorited
                    ? 'bg-red-50 border-red-200 text-red-600'
                    : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Heart size={18} className={isFavorited ? 'fill-current' : ''} />
                <span>{isFavorited ? 'Saved' : 'Save'}</span>
              </button>

              <button
                onClick={handleShare}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg border bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <Share2 size={18} />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {[
                { id: 'description', label: 'Description' },
                { id: 'specifications', label: 'Specifications' },
                { id: 'delivery', label: 'Delivery & Returns' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-black text-black'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
                
                {product.tags && (
                  <div className="mt-6">
                    <h4 className="font-semibold mb-3">Tags:</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map(tag => (
                        <span
                          key={tag}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="space-y-4">
                {product.specifications ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-3 border-b border-gray-100">
                        <span className="font-medium text-gray-700">{key}:</span>
                        <span className="text-gray-900">{value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">
                    Contact us via WhatsApp for detailed specifications.
                  </p>
                )}
              </div>
            )}

            {activeTab === 'delivery' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Truck className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Free Delivery</h4>
                      <p className="text-gray-600 text-sm">
                        Free secure delivery across Pakistan on orders above PKR 50,000
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="text-green-600" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Authenticity Guarantee</h4>
                      <p className="text-gray-600 text-sm">
                        100% authentic products with certificates and warranties
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <RotateCcw className="text-purple-600" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Easy Returns</h4>
                      <p className="text-gray-600 text-sm">
                        7-day return policy for unopened items in original condition
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold mb-3">Delivery Information</h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>• Karachi: 1-2 business days</p>
                    <p>• Lahore, Islamabad: 2-3 business days</p>
                    <p>• Other major cities: 3-5 business days</p>
                    <p>• Remote areas: 5-7 business days</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map(relatedProduct => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;