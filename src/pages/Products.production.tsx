// Production version of Products.tsx
// Key changes: Async loading of user products from API

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Filter, Grid, List, SortAsc } from 'lucide-react';
import { SAMPLE_PRODUCTS, CATEGORIES, formatPKR } from '../data/products';
import { getUserProducts } from '../services/productService';
import { Product, FilterOptions } from '../types';
import ProductCard from '../components/Product/ProductCard';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { useSearch } from '../contexts/SearchContext';

/**
 * Products page with user-uploaded products from backend API
 */
const Products: React.FC = () => {
  const { category, subcategory } = useParams<{ category: string; subcategory: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchResults, searchQuery } = useSearch();
  
  const [isLoading, setIsLoading] = useState(false);
  const [userProducts, setUserProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    category: category || '',
    subcategory: '',
    sortBy: 'featured',
  });

  // Get current category data
  const currentCategory = CATEGORIES.find(cat => cat.slug === category || cat.id === category);
  
  // Load user products from backend on component mount
  useEffect(() => {
    const loadUserProducts = async () => {
      setIsLoadingProducts(true);
      try {
        const products = await getUserProducts();
        setUserProducts(products);
      } catch (error) {
        console.error('Failed to load user products:', error);
        setUserProducts([]);
      } finally {
        setIsLoadingProducts(false);
      }
    };
    
    loadUserProducts();
  }, []);
  
  // Initialize filters from URL parameters on mount and when params change
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      category: category || '',
      subcategory: subcategory || searchParams.get('subcategory') || '',
      sortBy: (searchParams.get('sort') as FilterOptions['sortBy']) || 'featured',
      priceRange: searchParams.get('minPrice') && searchParams.get('maxPrice') 
        ? [parseInt(searchParams.get('minPrice')!), parseInt(searchParams.get('maxPrice')!)]
        : undefined,
      material: searchParams.get('material') || undefined,
      brand: searchParams.get('brand') || undefined,
      inStock: searchParams.get('inStock') ? searchParams.get('inStock') === 'true' : undefined,
    }));
  }, [category, subcategory, searchParams]);
  
  // Filter and sort products (combine sample + user products)
  const filteredProducts = useMemo(() => {
    // Combine sample products with user-uploaded products
    let products = searchQuery ? searchResults : [...SAMPLE_PRODUCTS, ...userProducts];
    
    // Apply filters
    if (filters.category) {
      products = products.filter(product => 
        product.category === filters.category || 
        product.category === (filters.category === 'watches' ? 'watches' : 'jewelry')
      );
    }
    
    if (filters.subcategory) {
      products = products.filter(product => 
        product.subcategory.toLowerCase().includes(filters.subcategory.toLowerCase())
      );
    }
    
    if (filters.priceRange) {
      products = products.filter(product => 
        product.price >= filters.priceRange![0] && product.price <= filters.priceRange![1]
      );
    }
    
    if (filters.material) {
      products = products.filter(product => 
        product.material?.toLowerCase().includes(filters.material!.toLowerCase())
      );
    }
    
    if (filters.brand) {
      products = products.filter(product => 
        product.brand?.toLowerCase().includes(filters.brand!.toLowerCase())
      );
    }
    
    if (filters.inStock !== undefined) {
      products = products.filter(product => product.inStock === filters.inStock);
    }
    
    // Apply sorting
    switch (filters.sortBy) {
      case 'price-low':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'rating':
        products.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'featured':
      default:
        products.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
        break;
    }
    
    return products;
  }, [searchQuery, searchResults, userProducts, filters, SAMPLE_PRODUCTS]);

  // Show loading spinner while loading user products
  if (isLoadingProducts) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <LoadingSpinner />
          <p className="text-center text-gray-600 mt-4">Loading products...</p>
        </div>
      </div>
    );
  }

  // Rest of the component remains the same...
  // [Include all the existing JSX from the original Products component]
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {searchQuery ? (
              <>Search Results for "{searchQuery}"</>
            ) : currentCategory ? (
              currentCategory.name
            ) : (
              'All Products'
            )}
          </h1>
          
          {/* Product Count */}
          <p className="text-gray-600">
            {isLoading ? 'Loading...' : `${filteredProducts.length} products found`}
            {userProducts.length > 0 && (
              <span className="ml-2 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {userProducts.length} uploaded by admin
              </span>
            )}
          </p>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              viewMode={viewMode}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && !isLoading && (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
