import React, { useState, useEffect } from 'react';
import { getUserProducts } from '../services/productService';
import { Link } from 'react-router-dom';
import { Package, Upload, Eye, ArrowRight } from 'lucide-react';

/**
 * Demo page to show the complete product flow
 */
const ProductFlowDemo: React.FC = () => {
  const [userProducts, setUserProducts] = useState<any[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    loadProducts();
  }, [refreshKey]);

  const loadProducts = () => {
    const products = getUserProducts();
    setUserProducts(products);
  };

  const refreshData = () => {
    setRefreshKey(prev => prev + 1);
  };

  const formatPKR = (amount: number): string => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount).replace('PKR', 'PKR ');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            📍 Product Flow Demonstration
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            This page shows exactly how products flow from Admin upload to customer display.
            Upload a product in Admin panel and see it appear here and on the main Products page.
          </p>
        </div>

        {/* Flow Steps */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          
          {/* Step 1: Upload */}
          <div className="bg-white rounded-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center mb-4">
              <Upload className="w-8 h-8 text-blue-500 mr-3" />
              <h3 className="text-lg font-semibold">1. Admin Upload</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Admin goes to <code className="bg-gray-100 px-2 py-1 rounded">/admin</code> and uploads products with images
            </p>
            <Link 
              to="/admin" 
              className="inline-flex items-center text-blue-600 hover:text-blue-700"
            >
              Go to Admin Panel <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {/* Step 2: Storage */}
          <div className="bg-white rounded-lg p-6 border-l-4 border-orange-500">
            <div className="flex items-center mb-4">
              <Package className="w-8 h-8 text-orange-500 mr-3" />
              <h3 className="text-lg font-semibold">2. Storage</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Products are saved to <code className="bg-gray-100 px-2 py-1 rounded">localStorage</code> with key <code className="bg-gray-100 px-2 py-1 rounded">'user-products'</code>
            </p>
            <p className="text-sm text-gray-500">
              Currently stored: <strong>{userProducts.length}</strong> products
            </p>
          </div>

          {/* Step 3: Display */}
          <div className="bg-white rounded-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center mb-4">
              <Eye className="w-8 h-8 text-green-500 mr-3" />
              <h3 className="text-lg font-semibold">3. Customer View</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Products appear on the main Products page alongside sample products
            </p>
            <Link 
              to="/products" 
              className="inline-flex items-center text-green-600 hover:text-green-700"
            >
              View Products Page <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>

        {/* Storage Details */}
        <div className="bg-white rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">📦 Current Storage (localStorage)</h2>
            <button 
              onClick={refreshData}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Refresh Data
            </button>
          </div>
          
          <div className="bg-gray-50 rounded p-4 mb-4">
            <p className="text-sm text-gray-600 mb-2">
              <strong>Storage Key:</strong> <code>'user-products'</code>
            </p>
            <p className="text-sm text-gray-600">
              <strong>Total Products:</strong> {userProducts.length}
            </p>
          </div>

          {userProducts.length === 0 ? (
            <div className="text-center py-8">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-2">No products uploaded yet</p>
              <p className="text-gray-400 mb-4">Go to Admin panel and upload your first product!</p>
              <Link 
                to="/admin" 
                className="inline-flex items-center bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700"
              >
                Upload First Product <Upload className="w-4 h-4 ml-2" />
              </Link>
            </div>
          ) : (
            <div className="grid gap-4">
              {userProducts.map((product, index) => (
                <div key={product.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-4">
                    
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      {product.images && product.images.length > 0 ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                          <span className="text-gray-400 text-xs">No Image</span>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-gray-900">
                        {product.name}
                      </h3>
                      
                      <p className="text-sm text-gray-600 mt-1">
                        {product.description}
                      </p>

                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-lg font-semibold text-green-600">
                          {formatPKR(product.price)}
                        </span>
                        
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          product.inStock
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>

                        {product.featured && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Featured
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-gray-500 mt-2">
                        {product.category} → {product.subcategory}
                        {product.brand && ` • ${product.brand}`}
                      </div>

                      <div className="text-xs text-gray-400 mt-1">
                        Created: {new Date(product.createdAt).toLocaleString()}
                        <br />
                        Product ID: <code className="bg-gray-100 px-1 rounded">{product.id}</code>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Where Products Appear */}
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">🌐 Where Your Products Appear</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Admin Panel - Manage Tab</h3>
              <p className="text-sm text-gray-600 mb-3">
                View and manage all uploaded products with edit/delete options
              </p>
              <Link 
                to="/admin" 
                className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm"
              >
                View in Admin <ArrowRight className="w-3 h-3 ml-1" />
              </Link>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Main Products Page</h3>
              <p className="text-sm text-gray-600 mb-3">
                Products appear alongside sample products for customers to browse and buy
              </p>
              <Link 
                to="/products" 
                className="inline-flex items-center text-green-600 hover:text-green-700 text-sm"
              >
                View Products <ArrowRight className="w-3 h-3 ml-1" />
              </Link>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">💡 For Production</h4>
            <p className="text-sm text-blue-700">
              Replace localStorage with your actual backend API. Update the <code>createProduct</code> function 
              in <code>productService.ts</code> to send data to your server instead of localStorage.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFlowDemo;
