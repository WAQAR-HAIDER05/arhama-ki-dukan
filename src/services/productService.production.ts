// Production version of productService.ts
// Replace the existing productService.ts with this for live website

import { Product } from '../types';
import { uploadImages, UploadResult } from '../utils/imageUpload';

export interface CreateProductData {
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: 'watches' | 'jewelry';
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

// Your backend API URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://your-backend-api.com/api';

/**
 * PRODUCTION VERSION - Creates a new product with image uploads
 * This version sends data to your actual backend server
 */
export const createProduct = async (
  productData: CreateProductData,
  onProgress?: (stage: string, progress: number) => void
): Promise<CreateProductResult> => {
  try {
    // Stage 1: Upload images to your cloud storage (Cloudinary, AWS S3, etc.)
    onProgress?.('Uploading images...', 0);
    
    const formData = new FormData();
    
    // Add product data to FormData
    formData.append('name', productData.name);
    formData.append('description', productData.description);
    formData.append('price', productData.price.toString());
    if (productData.originalPrice) {
      formData.append('originalPrice', productData.originalPrice.toString());
    }
    formData.append('category', productData.category);
    formData.append('subcategory', productData.subcategory);
    formData.append('material', productData.material || '');
    formData.append('brand', productData.brand || '');
    formData.append('gender', productData.gender);
    formData.append('inStock', productData.inStock.toString());
    formData.append('featured', productData.featured.toString());
    formData.append('isNew', productData.isNew.toString());
    formData.append('isOnSale', productData.isOnSale.toString());
    
    // Add image files
    productData.images.forEach((file, index) => {
      formData.append(`images`, file);
    });
    
    onProgress?.('Creating product...', 50);
    
    // Stage 2: Send to your backend API
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      body: formData,
      // Don't set Content-Type header - let browser set it for FormData
      headers: {
        // Add authentication if needed
        // 'Authorization': `Bearer ${authToken}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    onProgress?.('Product created successfully!', 100);
    
    return {
      success: true,
      product: result.product
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
 * PRODUCTION VERSION - Gets products from backend API
 */
export const getUserProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add authentication if needed
        // 'Authorization': `Bearer ${authToken}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

/**
 * PRODUCTION VERSION - Deletes a product from backend
 */
export const deleteUserProduct = async (productId: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // Add authentication if needed
        // 'Authorization': `Bearer ${authToken}`,
      },
    });
    
    return response.ok;
  } catch (error) {
    console.error('Error deleting product:', error);
    return false;
  }
};

// Helper functions remain the same
const generateTags = (productData: CreateProductData): string[] => {
  const tags: string[] = [];
  
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
  
  if (productData.material) {
    tags.push(productData.material.toLowerCase());
    if (productData.material.toLowerCase().includes('gold')) {
      tags.push('precious metal', 'luxury');
    }
  }
  
  if (productData.brand) {
    tags.push(productData.brand.toLowerCase(), 'branded');
  }
  
  tags.push(productData.gender);
  if (productData.gender === 'female') {
    tags.push('women', 'ladies');
  } else if (productData.gender === 'male') {
    tags.push('men', 'gents');
  }
  
  tags.push('pakistan', 'karachi', 'lahore', 'islamabad', 'authentic');
  
  return [...new Set(tags)];
};

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
    specs['Type'] = 'Analog';
    specs['Water Resistance'] = 'Yes';
  }
  
  return specs;
};
