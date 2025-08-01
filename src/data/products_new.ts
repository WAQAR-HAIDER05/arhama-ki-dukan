import { Product, Category, Announcement } from '../types';

/**
 * Real product data for ARHAMA KI DUKAN
 * Using actual product images from local folders
 * All prices in PKR (Pakistani Rupees)
 */

export const SAMPLE_PRODUCTS: Product[] = [
  // Rolex Watches
  {
    id: 'RLX001',
    name: 'Rolex Submariner Classic',
    description: 'Premium Rolex Submariner watch with stainless steel case and bracelet. Water resistant and perfect for diving enthusiasts.',
    price: 2500000,
    originalPrice: 2800000,
    currency: 'PKR',
    images: [
      '/Rolex/rolex_1.jpg',
      '/Rolex/rolex_2.jpg',
      '/Rolex/rolex_3.jpg'
    ],
    category: 'watches',
    subcategory: 'luxury-watches',
    inStock: true,
    featured: true,
    isOnSale: true,
    isNew: false,
    tags: ['luxury', 'rolex', 'diving watch', 'swiss made', 'automatic'],
    specifications: {
      'Movement': 'Automatic',
      'Case Material': 'Stainless Steel',
      'Water Resistance': '300m',
      'Dial Color': 'Black',
      'Crystal': 'Sapphire'
    },
    material: 'Stainless Steel',
    brand: 'Rolex',
    gender: 'male',
    warranty: '2 Years International Warranty',
    rating: 4.9,
    reviewCount: 45,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20'
  },
  {
    id: 'RLX002',
    name: 'Rolex Datejust Steel',
    description: 'Elegant Rolex Datejust with steel case and jubilee bracelet. Perfect for business and formal occasions.',
    price: 2200000,
    currency: 'PKR',
    images: [
      '/Rolex/rolex_4.jpg',
      '/Rolex/rolex_5.jpg',
      '/Rolex/rolex_6.jpg'
    ],
    category: 'watches',
    subcategory: 'luxury-watches',
    inStock: true,
    featured: true,
    tags: ['rolex', 'datejust', 'steel', 'jubilee', 'automatic'],
    specifications: {
      'Movement': 'Automatic',
      'Case Material': 'Stainless Steel',
      'Bracelet': 'Jubilee',
      'Functions': 'Date Display',
      'Crystal': 'Sapphire'
    },
    material: 'Stainless Steel',
    brand: 'Rolex',
    gender: 'unisex',
    warranty: '2 Years International Warranty',
    rating: 4.8,
    reviewCount: 32,
    createdAt: '2024-01-12',
    updatedAt: '2024-01-18'
  },

  // Patek Philippe Watches
  {
    id: 'PP001',
    name: 'Patek Philippe Calatrava',
    description: 'Exquisite Patek Philippe Calatrava with rose gold case. The epitome of elegance and Swiss watchmaking excellence.',
    price: 3500000,
    originalPrice: 3800000,
    currency: 'PKR',
    images: [
      '/Patek Philippe/Patek Philippe new1.jpg',
      '/Patek Philippe/Patek Philippe new2.jpg',
      '/Patek Philippe/Patek Philippe new3.jpg'
    ],
    category: 'watches',
    subcategory: 'luxury-watches',
    inStock: true,
    featured: true,
    isOnSale: true,
    tags: ['patek philippe', 'calatrava', 'rose gold', 'luxury', 'manual wind'],
    specifications: {
      'Movement': 'Manual Wind',
      'Case Material': 'Rose Gold',
      'Dial Color': 'White',
      'Crystal': 'Sapphire',
      'Thickness': '8.1mm'
    },
    material: 'Rose Gold',
    brand: 'Patek Philippe',
    gender: 'male',
    warranty: '2 Years Manufacturer Warranty',
    rating: 5.0,
    reviewCount: 18,
    createdAt: '2024-01-20',
    updatedAt: '2024-01-25'
  },
  {
    id: 'PP002',
    name: 'Patek Philippe Nautilus',
    description: 'Iconic Patek Philippe Nautilus sports luxury watch. Steel case with integrated bracelet and blue dial.',
    price: 4200000,
    currency: 'PKR',
    images: [
      '/Patek Philippe/Patek Philippe new4.jpg',
      '/Patek Philippe/Patek Philippe new5.jpg',
      '/Patek Philippe/Patek Philippe new6.jpg'
    ],
    category: 'watches',
    subcategory: 'luxury-watches',
    inStock: true,
    featured: true,
    isNew: true,
    tags: ['patek philippe', 'nautilus', 'sports luxury', 'steel', 'automatic'],
    specifications: {
      'Movement': 'Automatic',
      'Case Material': 'Stainless Steel',
      'Dial Color': 'Blue',
      'Water Resistance': '120m',
      'Power Reserve': '45 hours'
    },
    material: 'Stainless Steel',
    brand: 'Patek Philippe',
    gender: 'unisex',
    warranty: '2 Years Manufacturer Warranty',
    rating: 4.9,
    reviewCount: 24,
    createdAt: '2024-01-22',
    updatedAt: '2024-01-28'
  },
  {
    id: 'PP003',
    name: 'Patek Philippe Complications',
    description: 'Sophisticated Patek Philippe with multiple complications including moon phase and annual calendar.',
    price: 5500000,
    currency: 'PKR',
    images: [
      '/Patek Philippe/Patek Philippe new7.jpg',
      '/Patek Philippe/Patek Philippe new8.jpg',
      '/Patek Philippe/Patek Philippe new9.jpg'
    ],
    category: 'watches',
    subcategory: 'luxury-watches',
    inStock: true,
    featured: true,
    tags: ['patek philippe', 'complications', 'moon phase', 'calendar', 'automatic'],
    specifications: {
      'Movement': 'Automatic',
      'Case Material': 'White Gold',
      'Complications': 'Moon Phase, Annual Calendar',
      'Dial Color': 'Slate Gray',
      'Crystal': 'Sapphire'
    },
    material: 'White Gold',
    brand: 'Patek Philippe',
    gender: 'male',
    warranty: '2 Years Manufacturer Warranty',
    rating: 5.0,
    reviewCount: 12,
    createdAt: '2024-01-25',
    updatedAt: '2024-01-30'
  },

  // Female Guess Watches
  {
    id: 'GW001',
    name: 'Guess Glamour Rose Gold',
    description: 'Stylish Guess watch with rose gold plating and crystal accents. Perfect for the modern Pakistani woman.',
    price: 45000,
    originalPrice: 55000,
    currency: 'PKR',
    images: [
      '/Female-Guess/Guess_1.jpg',
      '/Female-Guess/Guess_2.jpg',
      '/Female-Guess/Guess_3.jpg'
    ],
    category: 'watches',
    subcategory: 'female-watches',
    inStock: true,
    featured: true,
    isOnSale: true,
    tags: ['guess', 'rose gold', 'crystals', 'fashion', 'quartz'],
    specifications: {
      'Movement': 'Quartz',
      'Case Material': 'Rose Gold Plated',
      'Dial Color': 'White',
      'Crystal': 'Mineral',
      'Water Resistance': '50m'
    },
    material: 'Rose Gold Plated',
    brand: 'Guess',
    gender: 'female',
    warranty: '1 Year Manufacturer Warranty',
    rating: 4.5,
    reviewCount: 89,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-15'
  },
  {
    id: 'GW002',
    name: 'Guess Steel Bracelet Watch',
    description: 'Elegant Guess watch with stainless steel bracelet and silver dial. Contemporary design for everyday wear.',
    price: 38000,
    currency: 'PKR',
    images: [
      '/Female-Guess/Guess_4.jpg',
      '/Female-Guess/Guess_5.jpg',
      '/Female-Guess/Guess_6.jpg'
    ],
    category: 'watches',
    subcategory: 'female-watches',
    inStock: true,
    featured: false,
    tags: ['guess', 'steel', 'bracelet', 'silver', 'casual'],
    specifications: {
      'Movement': 'Quartz',
      'Case Material': 'Stainless Steel',
      'Dial Color': 'Silver',
      'Bracelet': 'Steel Links',
      'Water Resistance': '30m'
    },
    material: 'Stainless Steel',
    brand: 'Guess',
    gender: 'female',
    warranty: '1 Year Manufacturer Warranty',
    rating: 4.3,
    reviewCount: 67,
    createdAt: '2024-01-08',
    updatedAt: '2024-01-12'
  },
  {
    id: 'GW003',
    name: 'Guess Diamond Collection',
    description: 'Premium Guess watch with genuine diamond markers and leather strap. Luxury meets affordability.',
    price: 75000,
    originalPrice: 85000,
    currency: 'PKR',
    images: [
      '/Female-Guess/Guess_7.jpg',
      '/Female-Guess/Guess_8.jpg',
      '/Female-Guess/Guess_9.jpg'
    ],
    category: 'watches',
    subcategory: 'female-watches',
    inStock: true,
    featured: true,
    isOnSale: true,
    isNew: true,
    tags: ['guess', 'diamond', 'leather', 'premium', 'elegant'],
    specifications: {
      'Movement': 'Quartz',
      'Case Material': 'Gold Plated',
      'Dial Features': 'Diamond Markers',
      'Strap': 'Genuine Leather',
      'Water Resistance': '50m'
    },
    material: 'Gold Plated',
    brand: 'Guess',
    gender: 'female',
    warranty: '1 Year Manufacturer Warranty',
    rating: 4.7,
    reviewCount: 43,
    createdAt: '2024-01-18',
    updatedAt: '2024-01-22'
  },

  // More Guess Collection
  {
    id: 'GW004',
    name: 'Guess Sport Chronograph',
    description: 'Sporty Guess chronograph with multifunction display and silicon strap. Perfect for active lifestyle.',
    price: 52000,
    currency: 'PKR',
    images: [
      '/Female-Guess/Guess_10.jpg',
      '/Female-Guess/Guess_11.jpg',
      '/Female-Guess/Guess_12.jpg'
    ],
    category: 'watches',
    subcategory: 'female-watches',
    inStock: true,
    featured: false,
    tags: ['guess', 'chronograph', 'sport', 'silicon', 'multifunction'],
    specifications: {
      'Movement': 'Quartz Chronograph',
      'Case Material': 'Stainless Steel',
      'Functions': 'Chronograph, Date',
      'Strap': 'Silicon',
      'Water Resistance': '100m'
    },
    material: 'Stainless Steel',
    brand: 'Guess',
    gender: 'female',
    warranty: '1 Year Manufacturer Warranty',
    rating: 4.4,
    reviewCount: 56,
    createdAt: '2024-01-14',
    updatedAt: '2024-01-18'
  },
  {
    id: 'GW005',
    name: 'Guess Classic Elegance',
    description: 'Timeless Guess watch with classic design and mother of pearl dial. Elegant choice for special occasions.',
    price: 68000,
    originalPrice: 75000,
    currency: 'PKR',
    images: [
      '/Female-Guess/Guess_13.jpg',
      '/Female-Guess/Guess_14.jpg',
      '/Female-Guess/Guess_15.jpg'
    ],
    category: 'watches',
    subcategory: 'female-watches',
    inStock: true,
    featured: true,
    isOnSale: true,
    tags: ['guess', 'classic', 'mother of pearl', 'elegant', 'formal'],
    specifications: {
      'Movement': 'Quartz',
      'Case Material': 'Gold Plated',
      'Dial': 'Mother of Pearl',
      'Strap': 'Leather',
      'Crystal': 'Mineral'
    },
    material: 'Gold Plated',
    brand: 'Guess',
    gender: 'female',
    warranty: '1 Year Manufacturer Warranty',
    rating: 4.6,
    reviewCount: 38,
    createdAt: '2024-01-16',
    updatedAt: '2024-01-20'
  },

  // Cartier Chains (Jewelry)
  {
    id: 'CC001',
    name: 'Cartier Love Chain Necklace',
    description: 'Authentic Cartier Love chain necklace in 18k gold. Iconic design with signature screw motifs.',
    price: 850000,
    originalPrice: 950000,
    currency: 'PKR',
    images: [
      '/Cartier Chain/Cartier_Chain_1.jpg',
      '/Cartier Chain/Cartier_Chain_2.jpg',
      '/Cartier Chain/Cartier_Chain_3.jpg'
    ],
    category: 'jewelry',
    subcategory: 'necklaces',
    inStock: true,
    featured: true,
    isOnSale: true,
    tags: ['cartier', 'love', 'chain', 'gold', 'necklace'],
    specifications: {
      'Material': '18k Yellow Gold',
      'Length': '45cm',
      'Clasp': 'Lobster Clasp',
      'Width': '3mm',
      'Weight': '15g'
    },
    material: '18k Gold',
    brand: 'Cartier',
    gender: 'unisex',
    warranty: '1 Year Manufacturer Warranty',
    rating: 4.8,
    reviewCount: 27,
    createdAt: '2024-01-14',
    updatedAt: '2024-01-19'
  },
  {
    id: 'CC002',
    name: 'Cartier Trinity Chain',
    description: 'Elegant Cartier Trinity chain with three interlocking rings in three different golds.',
    price: 1200000,
    currency: 'PKR',
    images: [
      '/Cartier Chain/Cartier_Chain_4.jpg',
      '/Cartier Chain/Cartier_Chain_5.jpg',
      '/Cartier Chain/Cartier_Chain_1.jpg'
    ],
    category: 'jewelry',
    subcategory: 'necklaces',
    inStock: true,
    featured: true,
    isNew: true,
    tags: ['cartier', 'trinity', 'three gold', 'chain', 'luxury'],
    specifications: {
      'Material': '18k Three-Color Gold',
      'Length': '42cm',
      'Design': 'Trinity Rings',
      'Clasp': 'Spring Ring',
      'Weight': '18g'
    },
    material: '18k Gold',
    brand: 'Cartier',
    gender: 'unisex',
    warranty: '1 Year Manufacturer Warranty',
    rating: 4.9,
    reviewCount: 15,
    createdAt: '2024-01-20',
    updatedAt: '2024-01-25'
  },

  // Tissot Watches
  {
    id: 'TS001',
    name: 'Tissot PRC 200 Chronograph',
    description: 'Swiss made Tissot PRC 200 with chronograph function. Sporty design with excellent water resistance.',
    price: 125000,
    originalPrice: 145000,
    currency: 'PKR',
    images: [
      '/Tissot/Tissot new1.jpg'
    ],
    category: 'watches',
    subcategory: 'sport-watches',
    inStock: true,
    featured: false,
    isOnSale: true,
    tags: ['tissot', 'chronograph', 'sport', 'swiss made', 'quartz'],
    specifications: {
      'Movement': 'Swiss Quartz Chronograph',
      'Case Material': 'Stainless Steel',
      'Water Resistance': '200m',
      'Functions': 'Chronograph, Date',
      'Crystal': 'Sapphire'
    },
    material: 'Stainless Steel',
    brand: 'Tissot',
    gender: 'male',
    warranty: '2 Years International Warranty',
    rating: 4.6,
    reviewCount: 54,
    createdAt: '2024-01-05',
    updatedAt: '2024-01-10'
  },

  // Bestwin Watches
  {
    id: 'BW001',
    name: 'Bestwin Classic Leather',
    description: 'Affordable luxury with Bestwin classic leather watch. Perfect balance of style and value.',
    price: 15000,
    originalPrice: 18000,
    currency: 'PKR',
    images: [
      '/Bestwin/bestwin_1.jpg',
      '/Bestwin/bestwin_2.jpg',
      '/Bestwin/bestwin_3.jpg'
    ],
    category: 'watches',
    subcategory: 'casual-watches',
    inStock: true,
    featured: false,
    isOnSale: true,
    tags: ['bestwin', 'leather', 'casual', 'affordable', 'classic'],
    specifications: {
      'Movement': 'Quartz',
      'Case Material': 'Alloy',
      'Strap': 'Genuine Leather',
      'Water Resistance': '30m',
      'Dial Color': 'White'
    },
    material: 'Leather',
    brand: 'Bestwin',
    gender: 'male',
    warranty: '6 Months Warranty',
    rating: 4.1,
    reviewCount: 128,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-05'
  },
  {
    id: 'BW002',
    name: 'Bestwin Sport Digital',
    description: 'Digital sports watch by Bestwin with multiple functions including stopwatch and alarm.',
    price: 8500,
    currency: 'PKR',
    images: [
      '/Bestwin/bestwin_4.jpg',
      '/Bestwin/bestwin_5.jpg',
      '/Bestwin/bestwin_6.jpg'
    ],
    category: 'watches',
    subcategory: 'sport-watches',
    inStock: true,
    featured: false,
    tags: ['bestwin', 'digital', 'sport', 'budget', 'waterproof'],
    specifications: {
      'Movement': 'Digital',
      'Case Material': 'Resin',
      'Functions': 'Stopwatch, Alarm, Backlight',
      'Water Resistance': '50m',
      'Battery Life': '2 Years'
    },
    material: 'Resin',
    brand: 'Bestwin',
    gender: 'unisex',
    warranty: '6 Months Warranty',
    rating: 3.9,
    reviewCount: 95,
    createdAt: '2024-01-03',
    updatedAt: '2024-01-08'
  },
  {
    id: 'BW003',
    name: 'Bestwin Business Formal',
    description: 'Professional business watch with steel case and elegant design. Perfect for office wear.',
    price: 12000,
    currency: 'PKR',
    images: [
      '/Bestwin/bestwin_7.jpg',
      '/Bestwin/bestwin_8.jpg',
      '/Bestwin/bestwin_9.jpg'
    ],
    category: 'watches',
    subcategory: 'business-watches',
    inStock: true,
    featured: false,
    tags: ['bestwin', 'business', 'formal', 'steel', 'professional'],
    specifications: {
      'Movement': 'Quartz',
      'Case Material': 'Stainless Steel',
      'Dial Color': 'Blue',
      'Strap': 'Steel Bracelet',
      'Water Resistance': '30m'
    },
    material: 'Stainless Steel',
    brand: 'Bestwin',
    gender: 'male',
    warranty: '6 Months Warranty',
    rating: 4.2,
    reviewCount: 76,
    createdAt: '2024-01-06',
    updatedAt: '2024-01-11'
  }
];

export const CATEGORIES: Category[] = [
  {
    id: 'watches',
    name: 'Watches',
    slug: 'watches',
    description: 'Luxury timepieces for the discerning Pakistani customer',
    image: '/images/watches-bg.jpg',
    subcategories: [
      {
        id: 'luxury-watches',
        name: 'Luxury Watches',
        slug: 'luxury-watches',
        description: 'Premium Swiss and luxury brand timepieces'
      },
      {
        id: 'female-watches',
        name: 'Women\'s Watches',
        slug: 'female-watches',
        description: 'Elegant timepieces designed for women'
      },
      {
        id: 'sport-watches',
        name: 'Sport Watches',
        slug: 'sport-watches',
        description: 'Athletic and sport-oriented timepieces'
      },
      {
        id: 'casual-watches',
        name: 'Casual Watches',
        slug: 'casual-watches',
        description: 'Everyday wear timepieces'
      },
      {
        id: 'business-watches',
        name: 'Business Watches',
        slug: 'business-watches',
        description: 'Professional timepieces for business'
      }
    ]
  },
  {
    id: 'jewelry',
    name: 'Jewelry',
    slug: 'jewelry',
    description: 'Exquisite jewelry pieces for special occasions',
    image: '/images/watches-bg.jpg',
    subcategories: [
      {
        id: 'necklaces',
        name: 'Necklaces',
        slug: 'necklaces',
        description: 'Beautiful necklaces and chains'
      },
      {
        id: 'earrings',
        name: 'Earrings',
        slug: 'earrings',
        description: 'Elegant earrings for all occasions'
      },
      {
        id: 'rings',
        name: 'Rings',
        slug: 'rings',
        description: 'Stunning rings and bands'
      },
      {
        id: 'bracelets',
        name: 'Bracelets',
        slug: 'bracelets',
        description: 'Stylish bracelets and bangles'
      }
    ]
  },
  {
    id: 'announcements',
    name: 'Announcements',
    slug: 'announcements',
    description: 'Latest news and announcements',
    image: '/images/watches-bg.jpg',
    subcategories: [
      {
        id: 'sales',
        name: 'Sales & Offers',
        slug: 'sales',
        description: 'Special sales and promotional offers'
      },
      {
        id: 'new-arrivals',
        name: 'New Arrivals',
        slug: 'new-arrivals',
        description: 'Latest product arrivals'
      },
      {
        id: 'events',
        name: 'Events',
        slug: 'events',
        description: 'Store events and exhibitions'
      }
    ]
  }
];

export const SAMPLE_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ANN001',
    title: 'Eid Special Sale - Up to 30% Off',
    description: 'Celebrate Eid with amazing discounts on luxury watches and jewelry. Limited time offer!',
    image: '/images/watches-bg.jpg',
    type: 'promotion',
    startDate: '2024-04-10',
    endDate: '2024-04-25',
    isActive: true,
    featured: true,
    appliesTo: ['watches', 'jewelry']
  },
  {
    id: 'ANN002',
    title: 'New Rolex Collection Arrival',
    description: 'Discover the latest Rolex timepieces now available at Arhama Ki Dukan. Authentic Swiss craftsmanship.',
    image: '/images/watches-bg.jpg',
    type: 'announcement',
    startDate: '2024-03-15',
    endDate: '2024-06-15',
    isActive: true,
    featured: true,
    appliesTo: ['watches']
  }
];

// Helper functions for Pakistani market
export const formatPKR = (amount: number): string => {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount).replace('PKR', 'PKR ');
};

export const getProductsByCategory = (category: string, subcategory?: string): Product[] => {
  return SAMPLE_PRODUCTS.filter(product => {
    if (subcategory) {
      return product.category === category && product.subcategory === subcategory;
    }
    return product.category === category;
  });
};

export const getFeaturedProducts = (): Product[] => {
  return SAMPLE_PRODUCTS.filter(product => product.featured);
};

export const getNewProducts = (): Product[] => {
  return SAMPLE_PRODUCTS.filter(product => product.isNew);
};

export const getSaleProducts = (): Product[] => {
  return SAMPLE_PRODUCTS.filter(product => product.isOnSale);
};
