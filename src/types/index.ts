// Core types for ARHAMA KI DUKAN e-commerce platform

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number; // For discounted items
  currency: 'PKR';
  images: string[];
  category: 'watches' | 'jewelry' | 'announcements';
  subcategory: string;
  inStock: boolean;
  featured?: boolean;
  isNew?: boolean;
  isOnSale?: boolean;
  tags?: string[];
  specifications?: { [key: string]: string };
  material?: string;
  brand?: string;
  gender?: 'male' | 'female' | 'unisex';
  size?: string;
  weight?: string;
  warranty?: string;
  seoTitle?: string;
  seoDescription?: string;
  rating?: number;
  reviewCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  subcategories: Subcategory[];
  featured: boolean;
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export interface FilterOptions {
  category?: string;
  subcategory?: string;
  priceRange?: [number, number];
  material?: string;
  brand?: string;
  gender?: string;
  inStock?: boolean;
  sortBy?: 'price-low' | 'price-high' | 'newest' | 'featured' | 'name';
}

export interface WhatsAppConfig {
  businessNumber: string; // Pakistani format: +92-XXX-XXXXXXX
  businessName: string;
  welcomeMessage: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  city: string;
  country: string;
  businessHours: {
    weekdays: string;
    weekends: string;
    timezone: string;
  };
  socialMedia: {
    facebook?: string;
    instagram?: string;
    whatsapp?: string;
  };
}

export interface Announcement {
  id: string;
  title: string;
  description: string;
  image?: string;
  type: 'sale' | 'new-arrival' | 'promotion' | 'news';
  startDate: string;
  endDate?: string;
  isActive: boolean;
  featured: boolean;
  discount?: number;
  appliesTo?: string[]; // Product IDs or category names
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonicalUrl?: string;
}

export interface PerformanceMetrics {
  loadTime: number;
  imageOptimization: boolean;
  bundleSize: number;
  mobileOptimized: boolean;
}

// Pakistani market specific types
export interface PakistaniLocalization {
  currency: 'PKR';
  locale: 'en-PK';
  timezone: 'Asia/Karachi';
  phoneFormat: '+92-XXX-XXXXXXX';
  businessHours: 'PST'; // Pakistan Standard Time
}

export interface DeliveryInfo {
  cities: string[]; // Major Pakistani cities
  estimatedDays: number;
  freeDeliveryThreshold?: number;
  charges: { [city: string]: number };
}