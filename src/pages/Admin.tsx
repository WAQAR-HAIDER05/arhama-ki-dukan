import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, Plus, Trash2, Eye, Package, AlertCircle, CheckCircle, Lock, User, EyeOff } from 'lucide-react';
import { createProduct, getUserProducts, deleteUserProduct, CreateProductData } from '../services/productService';
import { Product } from '../types';
import { CATEGORIES } from '../data/products';

// Admin credentials
const ADMIN_CREDENTIALS = {
  username: 'arhamakidukhan',
  password: '21-arid-887'
};

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [activeTab, setActiveTab] = useState<'upload' | 'manage'>('upload');
  const [userProducts, setUserProducts] = useState<Product[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ stage: '', progress: 0 });
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  // Form states
  const [formData, setFormData] = useState<CreateProductData>({
    name: '',
    description: '',
    price: 0,
    originalPrice: undefined,
    category: 'watches',
    subcategory: '',
    material: '',
    brand: '',
    gender: 'unisex',
    inStock: true,
    featured: false,
    isNew: true,
    isOnSale: false,
    images: []
  });

  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Check if user is already logged in
  useEffect(() => {
    const savedAuth = localStorage.getItem('admin-auth');
    if (savedAuth) {
      try {
        const authData = JSON.parse(savedAuth);
        if (authData.isAuthenticated && authData.username === ADMIN_CREDENTIALS.username) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        localStorage.removeItem('admin-auth');
      }
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadUserProducts();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    try {
      if (loginUsername === ADMIN_CREDENTIALS.username && loginPassword === ADMIN_CREDENTIALS.password) {
        setIsAuthenticated(true);
        localStorage.setItem('admin-auth', JSON.stringify({
          isAuthenticated: true,
          username: loginUsername,
          loginTime: new Date().toISOString()
        }));
      } else {
        setLoginError('Invalid username or password');
      }
    } catch (error) {
      setLoginError('Login failed. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin-auth');
    setLoginUsername('');
    setLoginPassword('');
  };

  const loadUserProducts = async () => {
    try {
      const products = await getUserProducts();
      setUserProducts(products);
    } catch (error) {
      console.error('Failed to load products:', error);
      setUserProducts([]);
    }
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    processImageFiles(files);
  };

  const processImageFiles = (files: File[]) => {
    const imageUrls: string[] = [];
    const imageFiles: File[] = [];

    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        imageUrls.push(url);
        imageFiles.push(file);
      }
    });

    setSelectedImages(prev => [...prev, ...imageUrls]);
    setFormData(prev => ({ ...prev, images: [...prev.images, ...imageFiles] }));
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || formData.price <= 0) {
      setUploadStatus('error');
      setStatusMessage('Please fill in all required fields');
      return;
    }

    if (formData.images.length === 0) {
      setUploadStatus('error');
      setStatusMessage('Please select at least one image');
      return;
    }

    setIsUploading(true);
    setUploadStatus('idle');
    setStatusMessage('');

    try {
      const result = await createProduct(formData, (stage, progress) => {
        setUploadProgress({ stage, progress });
      });

      if (result.success) {
        setUploadStatus('success');
        setStatusMessage('Product uploaded successfully!');
        
        // Reset form
        setFormData({
          name: '',
          description: '',
          price: 0,
          originalPrice: undefined,
          category: 'watches',
          subcategory: '',
          material: '',
          brand: '',
          gender: 'unisex',
          inStock: true,
          featured: false,
          isNew: true,
          isOnSale: false,
          images: []
        });
        setSelectedImages([]);
        
        // Reload products
        loadUserProducts();
        
        // Clear status after 3 seconds
        setTimeout(() => {
          setUploadStatus('idle');
          setStatusMessage('');
        }, 3000);
      } else {
        setUploadStatus('error');
        setStatusMessage(result.error || 'Failed to upload product');
      }
    } catch (error) {
      setUploadStatus('error');
      setStatusMessage('An error occurred while uploading');
    } finally {
      setIsUploading(false);
      setUploadProgress({ stage: '', progress: 0 });
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const success = deleteUserProduct(productId);
      if (success) {
        loadUserProducts();
      }
    }
  };

  // Get current category subcategories
  const currentCategoryData = CATEGORIES.find(cat => cat.id === formData.category);
  const availableSubcategories = currentCategoryData?.subcategories || [];

  // Handle category change and reset subcategory
  const handleCategoryChange = (newCategory: 'watches' | 'jewelry' | 'announcements') => {
    setFormData({ 
      ...formData, 
      category: newCategory,
      subcategory: '' // Reset subcategory when category changes
    });
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
    <>
      {!isAuthenticated ? (
        // Login Screen
        <div className="min-h-screen bg-gradient-to-br from-mustard via-yellow-400 to-orange-300 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            {/* Logo/Header */}
            <div className="text-center mb-8">
              <div className="bg-black text-mustard p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Lock size={32} />
              </div>
              <h1 className="text-3xl font-bold text-black mb-2">ARHAMA KI DUKAN</h1>
              <p className="text-black/80">Admin Panel</p>
            </div>

            {/* Login Form */}
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <form onSubmit={handleLogin} className="space-y-6">
                {/* Username Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={loginUsername}
                      onChange={(e) => setLoginUsername(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mustard focus:border-transparent"
                      placeholder="Enter your username"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mustard focus:border-transparent"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Error Message */}
                {loginError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                    <span className="text-red-700 text-sm">{loginError}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full bg-mustard text-black py-3 px-4 rounded-lg font-medium hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-mustard focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoggingIn ? 'Signing in...' : 'Sign In'}
                </button>
              </form>

              {/* Footer */}
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                  Authorized personnel only
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Admin Dashboard (existing content)
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-4xl mx-auto px-4">
            {/* Header with Logout */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">Product Management</h1>
                  <p className="text-gray-600">Upload and manage your products</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
                >
                  <span>Logout</span>
                </button>
              </div>
              
              {/* Demo Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-medium text-blue-900 mb-2">📍 How it works:</h3>
                <div className="text-sm text-blue-700 space-y-1">
                  <p><strong>1. Upload:</strong> Add products using the form below</p>
                  <p><strong>2. Storage:</strong> Products saved to GitHub repository</p>
                  <p><strong>3. Display:</strong> Products appear on Products page and Manage tab</p>
                </div>
                <div className="mt-3 text-xs text-blue-600">
                  Currently stored: <strong>{userProducts.length}</strong> products
                </div>
              </div>
            </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('upload')}
                className={`px-6 py-3 text-sm font-medium border-b-2 ${
                  activeTab === 'upload'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Plus className="inline w-4 h-4 mr-2" />
                Upload Product
              </button>
              <button
                onClick={() => setActiveTab('manage')}
                className={`px-6 py-3 text-sm font-medium border-b-2 ${
                  activeTab === 'manage'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Package className="inline w-4 h-4 mr-2" />
                Manage Products ({userProducts.length})
              </button>
            </nav>
          </div>

          {/* Upload Tab */}
          {activeTab === 'upload' && (
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Status Messages */}
                {uploadStatus === 'success' && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-green-700">{statusMessage}</span>
                  </div>
                )}
                
                {uploadStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
                    <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
                    <span className="text-red-700">{statusMessage}</span>
                  </div>
                )}

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Images *
                  </label>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <button
                      type="button"
                      onClick={() => cameraInputRef.current?.click()}
                      className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-400 transition-colors"
                    >
                      <Camera className="w-8 h-8 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-600">Take Photo</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-400 transition-colors"
                    >
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-600">Choose Files</span>
                    </button>
                  </div>

                  <input
                    ref={cameraInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    multiple
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageSelect}
                    className="hidden"
                  />

                  {/* Image Preview */}
                  {selectedImages.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                      {selectedImages.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={image}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Enter product name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price (PKR) *
                    </label>
                    <input
                      type="number"
                      value={formData.price || ''}
                      onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="0"
                      min="0"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Original Price (PKR)
                    </label>
                    <input
                      type="number"
                      value={formData.originalPrice || ''}
                      onChange={(e) => setFormData({ ...formData, originalPrice: parseInt(e.target.value) || undefined })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Optional"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleCategoryChange(e.target.value as 'watches' | 'jewelry' | 'announcements')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="watches">Watches</option>
                      <option value="jewelry">Jewelry</option>
                      <option value="announcements">Announcements</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subcategory
                    </label>
                    <select
                      value={formData.subcategory}
                      onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="">Select a subcategory</option>
                      {availableSubcategories.map(subcat => (
                        <option key={subcat.id} value={subcat.slug}>
                          {subcat.name}
                        </option>
                      ))}
                    </select>
                    {formData.category && availableSubcategories.length === 0 && (
                      <p className="text-sm text-gray-500 mt-1">No subcategories available for this category</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Brand
                    </label>
                    <input
                      type="text"
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Enter brand name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Material
                    </label>
                    <input
                      type="text"
                      value={formData.material}
                      onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="e.g., Gold, Silver, Steel"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'male' | 'female' | 'unisex' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="unisex">Unisex</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Describe your product..."
                    required
                  />
                </div>

                {/* Checkboxes */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.inStock}
                      onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                      className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">In Stock</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Featured</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.isNew}
                      onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                      className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">New</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.isOnSale}
                      onChange={(e) => setFormData({ ...formData, isOnSale: e.target.checked })}
                      className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">On Sale</span>
                  </label>
                </div>

                {/* Progress Bar */}
                {isUploading && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-blue-700">{uploadProgress.stage}</span>
                      <span className="text-sm text-blue-600">{uploadProgress.progress}%</span>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isUploading}
                  className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {isUploading ? 'Uploading...' : 'Upload Product'}
                </button>
              </form>
            </div>
          )}

          {/* Manage Tab */}
          {activeTab === 'manage' && (
            <div className="p-6">
              {userProducts.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg mb-2">No products uploaded yet</p>
                  <p className="text-gray-400">Start by uploading your first product!</p>
                  <button
                    onClick={() => setActiveTab('upload')}
                    className="mt-4 bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700"
                  >
                    Upload Product
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {userProducts.map((product) => (
                    <div key={product.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start space-x-4">
                        
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          {product.images && product.images.length > 0 ? (
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                          ) : (
                            <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                              <span className="text-gray-400 text-xs">No Image</span>
                            </div>
                          )}
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-medium text-gray-900">
                            {product.name}
                          </h3>
                          
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {product.description}
                          </p>

                          <div className="flex flex-wrap items-center gap-2 mt-2">
                            <span className="text-lg font-semibold text-green-600">
                              {formatPKR(product.price)}
                            </span>
                            
                            {product.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">
                                {formatPKR(product.originalPrice)}
                              </span>
                            )}

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

                            {product.isNew && (
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                New
                              </span>
                            )}
                          </div>

                          <div className="text-xs text-gray-500 mt-2">
                            {product.category} → {product.subcategory}
                            {product.brand && ` • ${product.brand}`}
                            {product.material && ` • ${product.material}`}
                          </div>

                          <div className="text-xs text-gray-400 mt-1">
                            Created: {new Date(product.createdAt).toLocaleDateString()}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
      )}
    </>
  );
};

export default Admin;
