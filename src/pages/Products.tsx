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
 * Products page with advanced filtering for Pakistani market
 * Mobile-optimized with touch-friendly controls
 */
const Products: React.FC = () => {
  const { category, subcategory } = useParams<{ category: string; subcategory: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchResults, searchQuery, clearSearch } = useSearch();
  
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
  
  // Load user products from GitHub on component mount
  useEffect(() => {
    const loadUserProducts = async () => {
      console.log('🔄 Loading user products...');
      setIsLoadingProducts(true);
      try {
        const products = await getUserProducts();
        console.log('📦 Loaded user products:', products);
        console.log('📊 Number of products:', products.length);
        setUserProducts(products);
      } catch (error) {
        console.error('❌ Failed to load user products:', error);
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
  
  // Filter and sort products
  const filteredProducts = useMemo(() => {
    console.log('🎯 Filtering products...');
    console.log('📥 User products:', userProducts);
    console.log('📋 Sample products count:', SAMPLE_PRODUCTS.length);
    console.log('🔍 Search query:', searchQuery);
    console.log('🔎 Search results:', searchResults);
    
    // Combine sample products with user-uploaded products
    let products = searchQuery ? searchResults : [...SAMPLE_PRODUCTS, ...userProducts];
    console.log('🔀 Combined products:', products);
    console.log('📊 Total products count:', products.length);
    
    // Apply category filter
    if (filters.category) {
      products = products.filter(product => 
        product.category === filters.category || 
        product.category === currentCategory?.id
      );
    }
    
    // Apply subcategory filter
    if (filters.subcategory) {
      products = products.filter(product => product.subcategory === filters.subcategory);
    }
    
    // Apply price range filter
    if (filters.priceRange) {
      products = products.filter(product => 
        product.price >= filters.priceRange![0] && 
        product.price <= filters.priceRange![1]
      );
    }
    
    // Apply material filter
    if (filters.material) {
      products = products.filter(product => 
        product.material?.toLowerCase().includes(filters.material!.toLowerCase())
      );
    }
    
    // Apply brand filter
    if (filters.brand) {
      products = products.filter(product => 
        product.brand?.toLowerCase().includes(filters.brand!.toLowerCase())
      );
    }
    
    // Apply stock filter
    if (filters.inStock !== undefined) {
      products = products.filter(product => product.inStock === filters.inStock);
    }
    
    // Sort products
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
      case 'name':
        products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
      default:
        products.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
    }
    
    return products;
  }, [filters, searchResults, searchQuery, currentCategory, userProducts]);

  // Update URL params when filters change (but not during initial load)
  useEffect(() => {
    // Skip URL update during initial mount to prevent conflicts
    if (filters.category === '' && filters.subcategory === '') return;
    
    const params = new URLSearchParams();
    
    if (filters.subcategory && filters.subcategory !== subcategory) {
      params.set('subcategory', filters.subcategory);
    }
    if (filters.sortBy && filters.sortBy !== 'featured') params.set('sort', filters.sortBy);
    if (filters.priceRange) {
      params.set('minPrice', filters.priceRange[0].toString());
      params.set('maxPrice', filters.priceRange[1].toString());
    }
    if (filters.material) params.set('material', filters.material);
    if (filters.brand) params.set('brand', filters.brand);
    if (filters.inStock !== undefined) params.set('inStock', filters.inStock.toString());
    
    // Only update if params have actually changed
    const currentParams = searchParams.toString();
    const newParams = params.toString();
    if (currentParams !== newParams) {
      setSearchParams(params, { replace: true });
    }
  }, [filters.sortBy, filters.priceRange, filters.material, filters.brand, filters.inStock]);

  // Get unique values for filter options
  const filterOptions = useMemo(() => {
    const allProducts = SAMPLE_PRODUCTS;
    
    return {
      materials: [...new Set(allProducts.map(p => p.material).filter(Boolean))],
      brands: [...new Set(allProducts.map(p => p.brand).filter(Boolean))],
      priceRange: {
        min: Math.min(...allProducts.map(p => p.price)),
        max: Math.max(...allProducts.map(p => p.price))
      }
    };
  }, []);

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: category || '',
      subcategory: subcategory || '', // Keep the URL subcategory if present
      sortBy: 'featured'
    });
    // Clear URL parameters except for the base category/subcategory route
    setSearchParams({}, { replace: true });
    // Also clear search
    clearSearch();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                {searchQuery 
                  ? `Search Results for "${searchQuery}"` 
                  : currentCategory?.name || 'All Products'
                }
              </h1>
              <p className="text-gray-600 mt-1">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
              </p>
            </div>
            
            {/* Desktop Controls */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow' : ''}`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow' : ''}`}
                >
                  <List size={20} />
                </button>
              </div>
              
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Filter size={20} />
                <span>Filters</span>
              </button>
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center justify-between mt-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-3 py-2 bg-mustard text-black rounded-lg hover:bg-yellow-400"
              >
                <Filter size={16} />
                <span>Filter</span>
              </button>
              
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price ↑</option>
                <option value="price-high">Price ↓</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow' : ''}`}
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow' : ''}`}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="lg:w-64 bg-white rounded-lg p-6 h-fit">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Clear All
                </button>
              </div>

              {/* Subcategory Filter */}
              {currentCategory?.subcategories && (
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Category</h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="subcategory"
                        checked={!filters.subcategory}
                        onChange={() => handleFilterChange('subcategory', '')}
                        className="text-black focus:ring-black"
                      />
                      <span>All {currentCategory.name}</span>
                    </label>
                    {currentCategory.subcategories.map(sub => (
                      <label key={sub.id} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="subcategory"
                          checked={filters.subcategory === sub.slug}
                          onChange={() => handleFilterChange('subcategory', sub.slug)}
                          className="text-black focus:ring-black"
                        />
                        <span>{sub.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Price Range Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Price Range (PKR)</h4>
                <div className="space-y-2">
                  <input
                    type="range"
                    min={filterOptions.priceRange.min}
                    max={filterOptions.priceRange.max}
                    value={filters.priceRange?.[1] || filterOptions.priceRange.max}
                    onChange={(e) => {
                      const max = parseInt(e.target.value);
                      handleFilterChange('priceRange', [filters.priceRange?.[0] || filterOptions.priceRange.min, max]);
                    }}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{formatPKR(filters.priceRange?.[0] || filterOptions.priceRange.min)}</span>
                    <span>{formatPKR(filters.priceRange?.[1] || filterOptions.priceRange.max)}</span>
                  </div>
                </div>
              </div>

              {/* Material Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Material</h4>
                <select
                  value={filters.material || ''}
                  onChange={(e) => handleFilterChange('material', e.target.value || undefined)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="">All Materials</option>
                  {filterOptions.materials.map(material => (
                    <option key={material} value={material}>{material}</option>
                  ))}
                </select>
              </div>

              {/* Brand Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Brand</h4>
                <select
                  value={filters.brand || ''}
                  onChange={(e) => handleFilterChange('brand', e.target.value || undefined)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="">All Brands</option>
                  {filterOptions.brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              {/* Stock Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Availability</h4>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.inStock === true}
                    onChange={(e) => handleFilterChange('inStock', e.target.checked ? true : undefined)}
                    className="text-black focus:ring-black"
                  />
                  <span>In Stock Only</span>
                </label>
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <LoadingSpinner size="lg" />
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product}
                    className={viewMode === 'list' ? 'flex flex-row' : ''}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SortAsc className="text-gray-400" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No Products Found</h3>
                <p className="text-gray-600 mb-6">
                  {searchQuery 
                    ? `No products match your search for "${searchQuery}"`
                    : 'No products match your current filters'
                  }
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-mustard text-black px-6 py-3 rounded-lg hover:bg-yellow-400 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;