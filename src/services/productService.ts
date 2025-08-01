/**
 * GitHub Product Service - Store both images AND product data in GitHub
 * Complete free solution for small e-commerce sites
 */

import { Product } from '../types';
import { uploadImagesToGitHub, GitHubUploadResult } from './githubStorage';
import { getGitHubConfig, isGitHubConfigured } from '../config/github';

export interface CreateProductData {
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: 'watches' | 'jewelry' | 'announcements';
  subcategory: string;
  material?: string;
  brand?: string;
  gender: 'male' | 'female' | 'unisex';
  inStock: boolean;
  featured: boolean;
  isNew: boolean;
  isOnSale: boolean;
  images: File[];
}

export interface CreateProductResult {
  success: boolean;
  product?: Product;
  error?: string;
}

const GITHUB_API_BASE = 'https://api.github.com';

/**
 * Upload product with images to GitHub
 */
export const createProduct = async (
  productData: CreateProductData,
  onProgress?: (stage: string, progress: number) => void
): Promise<CreateProductResult> => {
  try {
    // Check if GitHub is configured
    if (!isGitHubConfigured()) {
      return {
        success: false,
        error: 'GitHub configuration is incomplete. Please check config/github.ts'
      };
    }

    const githubConfig = getGitHubConfig();
    
    // Stage 1: Upload images to GitHub (40% progress)
    onProgress?.('Uploading images...', 0);
    
    const imageUploadResults = await uploadImagesToGitHub(
      productData.images,
      githubConfig,
      (fileIndex: number, fileProgress: number, totalProgress: number) => {
        onProgress?.('Uploading images...', totalProgress * 0.4); // 40% for images
      }
    );
    
    // Check if any image upload failed
    const failedUploads = imageUploadResults.filter((result: GitHubUploadResult) => !result.success);
    if (failedUploads.length > 0) {
      return {
        success: false,
        error: `Failed to upload ${failedUploads.length} image(s)`
      };
    }
    
    onProgress?.('Processing product data...', 50);
    
    // Stage 2: Get uploaded image URLs
    const imageUrls = imageUploadResults
      .map((result: GitHubUploadResult) => result.url!)
      .filter((url: string) => url);
    
    // Stage 3: Create product object
    const newProduct: Product = {
      id: generateProductId(),
      name: productData.name,
      description: productData.description,
      price: productData.price,
      originalPrice: productData.originalPrice,
      currency: 'PKR',
      images: imageUrls,
      category: productData.category,
      subcategory: productData.subcategory,
      material: productData.material,
      brand: productData.brand,
      gender: productData.gender,
      inStock: productData.inStock,
      featured: productData.featured,
      isNew: productData.isNew,
      isOnSale: productData.isOnSale,
      tags: generateTags(productData),
      specifications: generateSpecifications(productData),
      rating: 0,
      reviewCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    onProgress?.('Saving product to database...', 70);
    
    // Stage 4: Save product to GitHub JSON file or localStorage as fallback
    let saveResult = false;
    try {
      saveResult = await saveProductToGitHub(newProduct, githubConfig);
    } catch (error) {
      console.warn('GitHub save failed, using localStorage fallback:', error);
      // Fallback to localStorage
      const existingProducts = JSON.parse(localStorage.getItem('user-products') || '[]');
      existingProducts.push(newProduct);
      localStorage.setItem('user-products', JSON.stringify(existingProducts));
      saveResult = true;
    }
    
    if (!saveResult) {
      // Final fallback to localStorage
      console.warn('Using localStorage as final fallback');
      const existingProducts = JSON.parse(localStorage.getItem('user-products') || '[]');
      existingProducts.push(newProduct);
      localStorage.setItem('user-products', JSON.stringify(existingProducts));
    }
    
    onProgress?.('Product created successfully!', 100);
    
    return {
      success: true,
      product: newProduct
    };
    
  } catch (error) {
    console.error('Error creating product:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    };
  }
};

/**
 * Generates relevant tags based on product data
 */
const generateTags = (productData: CreateProductData): string[] => {
  const tags: string[] = [];
  
  // Add category tags
  if (productData.category === 'watches') {
    tags.push('timepiece', 'watch', 'luxury watch');
    if (productData.subcategory.includes('smart')) {
      tags.push('smart watch', 'technology');
    }
  } else if (productData.category === 'jewelry') {
    tags.push('jewelry', 'accessory', 'luxury jewelry');
    if (productData.subcategory.includes('bridal')) {
      tags.push('wedding', 'bridal', 'pakistani wedding');
    }
  }
  
  // Add material tags
  if (productData.material) {
    tags.push(productData.material.toLowerCase());
    if (productData.material.toLowerCase().includes('gold')) {
      tags.push('precious metal', 'luxury');
    }
  }
  
  // Add brand tags
  if (productData.brand) {
    tags.push(productData.brand.toLowerCase(), 'branded');
  }
  
  // Add gender tags
  tags.push(productData.gender);
  if (productData.gender === 'female') {
    tags.push('women', 'ladies');
  } else if (productData.gender === 'male') {
    tags.push('men', 'gents');
  }
  
  // Add Pakistani market tags
  tags.push('pakistan', 'karachi', 'lahore', 'islamabad', 'authentic');
  
  return [...new Set(tags)]; // Remove duplicates
};

/**
 * Generates specifications based on product data
 */
const generateSpecifications = (productData: CreateProductData): { [key: string]: string } => {
  const specs: { [key: string]: string } = {};
  
  if (productData.material) {
    specs['Material'] = productData.material;
  }
  
  if (productData.brand) {
    specs['Brand'] = productData.brand;
  }
  
  specs['Gender'] = productData.gender.charAt(0).toUpperCase() + productData.gender.slice(1);
  specs['Category'] = productData.category.charAt(0).toUpperCase() + productData.category.slice(1);
  specs['Condition'] = 'New';
  specs['Warranty'] = 'Available';
  specs['Origin'] = 'Authentic';
  
  if (productData.category === 'watches') {
    specs['Type'] = 'Analog'; // Default, can be customized
    specs['Water Resistance'] = 'Yes'; // Default
  }
  
  return specs;
};

/**
 * Get all products from GitHub JSON file
 */
export const getUserProducts = async (): Promise<Product[]> => {
  try {
    console.log('🔧 getUserProducts called');
    console.log('⚙️ GitHub configured:', isGitHubConfigured());
    
    if (!isGitHubConfigured()) {
      console.warn('⚠️ GitHub not configured, using localStorage');
      // Fallback to localStorage for testing
      const products = localStorage.getItem('user-products');
      const parsedProducts = products ? JSON.parse(products) : [];
      console.log('💾 LocalStorage products:', parsedProducts);
      return parsedProducts;
    }

    const githubConfig = getGitHubConfig();
    console.log('🔧 GitHub config:', { owner: githubConfig.owner, repo: githubConfig.repo });
    
    const productsJson = await getProductsFromGitHub(githubConfig);
    console.log('🐙 GitHub products:', productsJson);
    
    return productsJson || [];
  } catch (error) {
    console.error('❌ Error fetching products, falling back to localStorage:', error);
    // Fallback to localStorage
    const products = localStorage.getItem('user-products');
    const parsedProducts = products ? JSON.parse(products) : [];
    console.log('💾 Fallback localStorage products:', parsedProducts);
    return parsedProducts;
  }
};

/**
 * Delete a product from GitHub
 */
export const deleteUserProduct = async (productId: string): Promise<boolean> => {
  try {
    if (!isGitHubConfigured()) {
      return false;
    }

    const githubConfig = getGitHubConfig();
    
    // Get current products
    const currentProducts = await getProductsFromGitHub(githubConfig);
    if (!currentProducts) return false;
    
    // Remove the product
    const updatedProducts = currentProducts.filter((p: Product) => p.id !== productId);
    
    // Save updated list
    return await saveProductsToGitHub(updatedProducts, githubConfig);
  } catch (error) {
    console.error('Error deleting product:', error);
    return false;
  }
};

/**
 * Save a single product to GitHub JSON file
 */
const saveProductToGitHub = async (product: Product, config: any): Promise<boolean> => {
  try {
    // Get existing products
    const existingProducts = await getProductsFromGitHub(config) || [];
    
    // Add new product
    const updatedProducts = [...existingProducts, product];
    
    // Save back to GitHub
    return await saveProductsToGitHub(updatedProducts, config);
  } catch (error) {
    console.error('Error saving product:', error);
    return false;
  }
};

/**
 * Save products array to GitHub JSON file
 */
const saveProductsToGitHub = async (products: Product[], config: any): Promise<boolean> => {
  try {
    const filePath = 'data/products.json';
    const content = JSON.stringify(products, null, 2);
    const base64Content = btoa(unescape(encodeURIComponent(content)));
    
    // Get current file SHA (required for update)
    let fileSha = '';
    try {
      const getResponse = await fetch(
        `${GITHUB_API_BASE}/repos/${config.owner}/${config.repo}/contents/${filePath}`,
        {
          headers: {
            'Authorization': `Bearer ${config.token}`,
            'Accept': 'application/vnd.github.v3+json',
          },
        }
      );
      
      if (getResponse.ok) {
        const fileInfo = await getResponse.json();
        fileSha = fileInfo.sha;
      }
    } catch (e) {
      // File doesn't exist yet, that's okay
    }
    
    // Update or create file
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${config.owner}/${config.repo}/contents/${filePath}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${config.token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.github.v3+json',
        },
        body: JSON.stringify({
          message: `Update products database - ${new Date().toISOString()}`,
          content: base64Content,
          sha: fileSha || undefined,
          branch: config.branch || 'main',
        }),
      }
    );
    
    return response.ok;
  } catch (error) {
    console.error('Error saving products to GitHub:', error);
    return false;
  }
};

/**
 * Get products from GitHub JSON file
 */
const getProductsFromGitHub = async (config: any): Promise<Product[] | null> => {
  try {
    const filePath = 'data/products.json';
    
    // Try using GitHub API first to avoid CORS issues
    const apiUrl = `${GITHUB_API_BASE}/repos/${config.owner}/${config.repo}/contents/${filePath}`;
    console.log('🌐 Fetching from GitHub API:', apiUrl);
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${config.token}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });
    
    console.log('📡 Response status:', response.status);
    console.log('📡 Response ok:', response.ok);
    
    if (!response.ok) {
      console.log('❌ Products file does not exist yet, returning empty array');
      return [];
    }
    
    const fileData = await response.json();
    
    // Decode base64 content
    const content = atob(fileData.content);
    const products = JSON.parse(content);
    
    console.log('✅ Successfully fetched products via API:', products);
    return Array.isArray(products) ? products : [];
    
  } catch (error) {
    console.log('❌ GitHub API failed, trying raw URL fallback');
    console.error('API Error details:', error);
    
    // Fallback to raw URL without headers
    try {
      const rawUrl = `https://raw.githubusercontent.com/${config.owner}/${config.repo}/${config.branch || 'main'}/data/products.json`;
      console.log('🌐 Fallback to raw URL:', rawUrl);
      
      const response = await fetch(rawUrl, {
        method: 'GET',
        cache: 'no-cache'
      });
      
      if (!response.ok) {
        console.log('❌ Raw URL also failed, returning empty array');
        return [];
      }
      
      const products = await response.json();
      console.log('✅ Successfully fetched products via raw URL:', products);
      return Array.isArray(products) ? products : [];
      
    } catch (fallbackError) {
      console.log('❌ Both API and raw URL failed, returning empty array');
      console.error('Fallback error:', fallbackError);
      return [];
    }
  }
};

// Helper functions
const generateProductId = (): string => {
  return `product_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
