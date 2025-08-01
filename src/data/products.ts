import { Product, Category, Announcement } from '../types';

/**
 * Sample product data for ARHAMA KI DUKAN
 * Optimized for Pakistani luxury jewelry and watch market
 * All prices in PKR (Pakistani Rupees)
 */

export const SAMPLE_PRODUCTS: Product[] = [
  // Male Watches
  // {
  //   id: 'MW001',
  //   name: 'Rolex Submariner Black',
  //   description: 'Authentic Rolex Submariner with black dial and ceramic bezel. Perfect for the modern Pakistani gentleman.',
  //   price: 2500000,
  //   originalPrice: 2800000,
  //   currency: 'PKR',
  //   images: [
  //     'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg',
  //     'https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg'
  //   ],
  //   category: 'watches',
  //   subcategory: 'male-watches',
  //   inStock: true,
  //   featured: true,
  //   isOnSale: true,
  //   tags: ['luxury', 'rolex', 'diving watch', 'swiss made', 'automatic'],
  //   specifications: {
  //     'Movement': 'Automatic',
  //     'Case Material': 'Stainless Steel',
  //     'Water Resistance': '300m',
  //     'Dial Color': 'Black',
  //     'Crystal': 'Sapphire'
  //   },
  //   material: 'Stainless Steel',
  //   brand: 'Rolex',
  //   gender: 'male',
  //   warranty: '2 Years International Warranty',
  //   rating: 4.9,
  //   reviewCount: 28,
  //   createdAt: '2024-01-15',
  //   updatedAt: '2024-01-20'
  // },
  // {
  //   id: 'MW002',
  //   name: 'Omega Speedmaster Professional',
  //   description: 'The legendary Moonwatch. A symbol of precision and adventure, perfect for Pakistani watch enthusiasts.',
  //   price: 1200000,
  //   currency: 'PKR',
  //   images: [
  //     'https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg',
  //     'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg'
  //   ],
  //   category: 'watches',
  //   subcategory: 'male-watches',
  //   inStock: true,
  //   featured: true,
  //   tags: ['omega', 'chronograph', 'moonwatch', 'swiss made', 'manual wind'],
  //   specifications: {
  //     'Movement': 'Manual Wind',
  //     'Case Material': 'Stainless Steel',
  //     'Functions': 'Chronograph',
  //     'Dial Color': 'Black',
  //     'Crystal': 'Hesalite'
  //   },
  //   material: 'Stainless Steel',
  //   brand: 'Omega',
  //   gender: 'male',
  //   warranty: '2 Years Manufacturer Warranty',
  //   rating: 4.8,
  //   reviewCount: 19,
  //   createdAt: '2024-01-10',
  //   updatedAt: '2024-01-18'
  // },

  // Female Watches
  // {
  //   id: 'FW001',
  //   name: 'Cartier Tank Française Gold',
  //   description: 'Elegant Cartier Tank in 18k gold. A timeless piece for the sophisticated Pakistani woman.',
  //   price: 1800000,
  //   currency: 'PKR',
  //   images: [
  //     'https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg',
  //     'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg'
  //   ],
  //   category: 'watches',
  //   subcategory: 'female-watches',
  //   inStock: true,
  //   featured: true,
  //   isNew: true,
  //   tags: ['cartier', 'gold', 'dress watch', 'luxury', 'quartz'],
  //   specifications: {
  //     'Movement': 'Quartz',
  //     'Case Material': '18k Gold',
  //     'Dial Color': 'White',
  //     'Crystal': 'Sapphire',
  //     'Strap': 'Gold Bracelet'
  //   },
  //   material: '18k Gold',
  //   brand: 'Cartier',
  //   gender: 'female',
  //   warranty: '2 Years International Warranty',
  //   rating: 4.9,
  //   reviewCount: 15,
  //   createdAt: '2024-01-20',
  //   updatedAt: '2024-01-25'
  // },

  // Pre-owned Luxury Watches
  // {
  //   id: 'PW001',
  //   name: 'Pre-owned Patek Philippe Calatrava',
  //   description: 'Certified pre-owned Patek Philippe Calatrava in excellent condition. A collector\'s dream piece.',
  //   price: 4500000,
  //   originalPrice: 5200000,
  //   currency: 'PKR',
  //   images: [
  //     'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg',
  //     'https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg'
  //   ],
  //   category: 'watches',
  //   subcategory: 'pre-owned-luxury',
  //   inStock: true,
  //   featured: true,
  //   isOnSale: true,
  //   tags: ['patek philippe', 'pre-owned', 'dress watch', 'swiss made', 'manual wind'],
  //   specifications: {
  //     'Movement': 'Manual Wind',
  //     'Case Material': '18k Rose Gold',
  //     'Condition': 'Excellent',
  //     'Year': '2018',
  //     'Box & Papers': 'Complete Set'
  //   },
  //   material: '18k Rose Gold',
  //   brand: 'Patek Philippe',
  //   gender: 'male',
  //   warranty: '1 Year Store Warranty',
  //   rating: 4.7,
  //   reviewCount: 8,
  //   createdAt: '2024-01-05',
  //   updatedAt: '2024-01-22'
  // },
// New Rolex Collection
  {
    id: 'RX001',
    name: 'Rolex  Professional',
    description: 'Rolex Quartz Movement. Iconic diving watch with exceptional Swiss craftsmanship, perfect for the Pakistani luxury market.',
    price: 4850,
    currency: 'PKR',
    images: [
      '/Rolex/rolex_1.jpg',
      '/Rolex/rolex_2.jpg',
      '/Rolex/rolex_3.jpg',
      
    ],
    category: 'watches',
    subcategory: 'male-watches',
    inStock: true,
    featured: true,
    isNew: true,
    tags: ['rolex', 'quartz', 'luxury', 'diving watch', 'swiss made'],
    specifications: {
      'Movement': 'Automatic',
      'Case Material': 'Stainless Steel',
      'Water Resistance': '300m',
      'Dial Color': 'Black',
      'Crystal': 'Sapphire',
      'Bezel': 'Unidirectional Rotating'
    },
    material: 'Stainless Steel',
    brand: 'Rolex',
    gender: 'male',
    warranty: '2 Years International Warranty',
    rating: 4.9,
    reviewCount: 67,
    createdAt: '2025-07-23',
    updatedAt: '2025-07-23'
  },
  {
    id: 'RX002',
    name: 'Rolex ',
    description: 'Rolex  Quartz Movement. Professional GMT watch with dual time zone functionality, ideal for international business.',
    price: 4850,
    currency: 'PKR',
    images: [
      '/Rolex/rolex_4.jpg',
      '/Rolex/rolex_5.jpg',
      '/Rolex/rolex_6.jpg',
      
    ],
    category: 'watches',
    subcategory: 'male-watches',
    inStock: true,
    featured: true,
    tags: ['rolex', 'gmt-master', 'automatic', 'luxury', 'travel watch', 'professional'],
    specifications: {
      'Movement': 'Automatic',
      'Case Material': 'Stainless Steel',
      'Water Resistance': '100m',
      'Dial Color': 'Blue/Red',
      'Crystal': 'Sapphire',
      'Functions': 'GMT, Date'
    },
    material: 'Stainless Steel',
    brand: 'Rolex',
    gender: 'male',
    warranty: '2 Years International Warranty',
    rating: 4.8,
    reviewCount: 52,
    createdAt: '2025-07-23',
    updatedAt: '2025-07-23'
  },
  // New Rolex Submariner Collection
  {
    id: 'RS001',
    name: 'Rolex Submariner ',
    description: 'Rolex Quartz Movement. Classic Submariner with black dial and unidirectional rotating bezel, perfect for diving and luxury wear.',
    price: 4650,
    currency: 'PKR',
    images: [
      '/Rolex Submariner/rolex_submariner_1.jpg',
      '/Rolex Submariner/rolex_submariner_2.jpg',
      '/Rolex Submariner/rolex_submariner_3.jpg',
      '/Rolex Submariner/rolex_submariner_4.jpg',

    ],
    category: 'watches',
    subcategory: 'male-watches',
    inStock: true,
    featured: true,
    isNew: true,
    tags: ['rolex', 'submariner', 'quartz', 'luxury', 'diving watch', 'swiss made', 'black dial'],
    specifications: {
      'Movement': 'Quartz',
      'Case Material': 'Stainless Steel',
      'Water Resistance': '300m',
      'Dial Color': 'Black',
      'Crystal': 'Sapphire',
      'Bezel': 'Unidirectional Rotating',
      'Case Size': '40mm'
    },
    material: 'Stainless Steel',
    brand: 'Rolex',
    gender: 'male',
    warranty: '2 Years International Warranty',
    rating: 4.9,
    reviewCount: 78,
    createdAt: '2025-07-23',
    updatedAt: '2025-07-23'
  },
  // New Patek Philippe Collection
  {
    id: 'PP001',
    name: 'Patek Philippe ',
    description: 'Automatic Movement. Exceptional Swiss craftsmanship in this luxury sports watch from Patek Philippe.',
    price: 8500,
    currency: 'PKR',
    images: [
      '/Patek Philippe/IMG-20250722-WA0042.jpg',
      '/Patek Philippe/IMG-20250722-WA0043.jpg'
    ],
    category: 'watches',
    subcategory: 'male-watches',
    inStock: true,
    featured: true,
    isNew: true,
    tags: ['patek philippe', 'automatic', 'luxury', 'swiss made', 'nautilus'],
    specifications: {
      'Movement': 'Automatic',
      'Case Material': 'Stainless Steel',
      'Water Resistance': '120m',
      'Dial Color': 'Blue',
      'Crystal': 'Sapphire'
    },
    material: 'Stainless Steel',
    brand: 'Patek Philippe',
    gender: 'male',
    warranty: '2 Years International Warranty',
    rating: 4.9,
    reviewCount: 12,
    createdAt: '2025-07-23',
    updatedAt: '2025-07-23'
  },
  {
    id: 'PP002',
    name: 'Patek Philippe Aquanaut',
    description: 'Automatic Movement. Modern luxury sports watch with distinctive octagonal case and elegant design.',
    price: 8500,
    currency: 'PKR',
    images: [
      '/Patek Philippe/IMG-20250722-WA0044.jpg',
      '/Patek Philippe/IMG-20250722-WA0045.jpg'
    ],
    category: 'watches',
    subcategory: 'male-watches',
    inStock: true,
    featured: true,
    tags: ['patek philippe', 'automatic', 'luxury', 'swiss made', 'aquanaut'],
    specifications: {
      'Movement': 'Automatic',
      'Case Material': 'Rose Gold',
      'Water Resistance': '120m',
      'Dial Color': 'Black',
      'Crystal': 'Sapphire'
    },
    material: 'Rose Gold',
    brand: 'Patek Philippe',
    gender: 'male',
    warranty: '2 Years International Warranty',
    rating: 4.8,
    reviewCount: 8,
    createdAt: '2025-07-23',
    updatedAt: '2025-07-23'
  },
  {
    id: 'PP003',
    name: 'Patek Philippe Calatrava Automatic',
    description: 'Automatic Movement. Classic dress watch embodying the pure tradition of Patek Philippe watchmaking.',
    price: 8500,
    currency: 'PKR',
    images: [
      '/Patek Philippe/IMG-20250722-WA0046.jpg',
      '/Patek Philippe/IMG-20250722-WA0047.jpg'
    ],
    category: 'watches',
    subcategory: 'male-watches',
    inStock: true,
    featured: true,
    tags: ['patek philippe', 'automatic', 'luxury', 'swiss made', 'calatrava', 'dress watch'],
    specifications: {
      'Movement': 'Automatic',
      'Case Material': '18k Yellow Gold',
      'Water Resistance': '30m',
      'Dial Color': 'White',
      'Crystal': 'Sapphire'
    },
    material: '18k Yellow Gold',
    brand: 'Patek Philippe',
    gender: 'male',
    warranty: '2 Years International Warranty',
    rating: 4.9,
    reviewCount: 15,
    createdAt: '2025-07-23',
    updatedAt: '2025-07-23'
  },
  {
    id: 'PP004',
    name: 'Patek Philippe Grand Complications Automatic',
    description: 'Automatic Movement. Sophisticated complications showcase the pinnacle of horological artistry.',
    price: 8500,
    currency: 'PKR',
    images: [
      '/Patek Philippe/IMG-20250722-WA0048.jpg',
      '/Patek Philippe/IMG-20250722-WA0042.jpg'
    ],
    category: 'watches',
    subcategory: 'male-watches',
    inStock: true,
    featured: true,
    isNew: true,
    tags: ['patek philippe', 'automatic', 'luxury', 'swiss made', 'complications'],
    specifications: {
      'Movement': 'Automatic',
      'Case Material': 'Platinum',
      'Functions': 'Perpetual Calendar, Moon Phase',
      'Dial Color': 'Silver',
      'Crystal': 'Sapphire'
    },
    material: 'Platinum',
    brand: 'Patek Philippe',
    gender: 'male',
    warranty: '2 Years International Warranty',
    rating: 4.9,
    reviewCount: 6,
    createdAt: '2025-07-23',
    updatedAt: '2025-07-23'
  },
  {
    id: 'PP005',
    name: 'Patek Philippe Quartz Movement',
    description: 'Quartz Movement. Exceptional Swiss craftsmanship in this luxury sports watch from Patek Philippe.',
    price: 5250,
    currency: 'PKR',
    images: [
      '/Patek Philippe/Patek Philippe new1.jpg',
      '/Patek Philippe/Patek Philippe new2.jpg',
      '/Patek Philippe/Patek Philippe new3.jpg',
      '/Patek Philippe/Patek Philippe new4.jpg',
    ],
    category: 'watches',
    subcategory: 'male-watches',
    inStock: true,
    featured: true,
    isNew: true,
    tags: ['patek philippe', 'automatic', 'luxury', 'swiss made', 'nautilus'],
    specifications: {
      'Movement': 'Quartz',
      'Case Material': 'Stainless Steel',
      'Water Resistance': '120m',
      'Dial Color': 'Blue, Black, White,Brown',
      'Crystal': 'Sapphire'
    },
    material: 'Stainless Steel',
    brand: 'Patek Philippe',
    gender: 'male',
    warranty: '2 Years International Warranty',
    rating: 4.9,
    reviewCount: 12,
    createdAt: '2025-07-23',
    updatedAt: '2025-07-23'
  },
    {
    id: 'PP006',
    name: 'Patek Philippe Quartz Movement',
    description: 'Quartz Movement. Exceptional Swiss craftsmanship in this luxury sports watch from Patek Philippe.',
    price: 4850,
    currency: 'PKR',
    images: [
      '/Patek Philippe/Patek Philippe new5.jpg',
      '/Patek Philippe/Patek Philippe new6.jpg',
      '/Patek Philippe/Patek Philippe new7.jpg',
      '/Patek Philippe/Patek Philippe new8.jpg',
      '/Patek Philippe/Patek Philippe new9.jpg',
    ],
    category: 'watches',
    subcategory: 'male-watches',
    inStock: true,
    featured: true,
    isNew: true,
    tags: ['patek philippe', 'quartz', 'luxury', 'swiss made', 'nautilus'],
    specifications: {
      'Movement': 'Quartz',
      'Case Material': 'Stainless Steel',
      'Water Resistance': '120m',
      'Dial Color': 'Blue, Black, White,Brown',
      'Crystal': 'Sapphire'
    },
    material: 'Stainless Steel',
    brand: 'Patek Philippe',
    gender: 'male',
    warranty: '2 Years International Warranty',
    rating: 4.9,
    reviewCount: 12,
    createdAt: '2025-07-23',
    updatedAt: '2025-07-23'
  },
  {
    id: 'PP007',
    name: 'Black Aura Patek Philippe   Quartz Movement(Limited Edition)',
    description: 'Quartz Movement. Exceptional Swiss craftsmanship in this luxury sports watch from Patek Philippe.',
    price: 4250,
    currency: 'PKR',
    images: [
      '/Patek Philippe/Patek Philippe new11.jpg',
      
    ],
    category: 'watches',
    subcategory: 'male-watches',
    inStock: true,
    featured: true,
    isNew: true,
    tags: ['patek philippe', 'quartz', 'luxury', 'swiss made', 'nautilus'],
    specifications: {
      'Movement': 'Quartz',
      'Case Material': 'Stainless Steel',
      'Water Resistance': '120m',
      'Dial Color': 'Blue, Black, White,Brown',
      'Crystal': 'Sapphire'
    },
    material: 'Stainless Steel',
    brand: 'Patek Philippe',
    gender: 'male',
    warranty: '2 Years International Warranty',
    rating: 4.9,
    reviewCount: 12,
    createdAt: '2025-07-23',
    updatedAt: '2025-07-23'
  },
  {
    id: 'PP008',
    name: ' Patek Philippe   Quartz Movement',
    description: 'Quartz Movement. Exceptional Swiss craftsmanship in this luxury sports watch from Patek Philippe.',
    price: 4850,
    currency: 'PKR',
    images: [
      '/Patek Philippe/Patek Philippe new12.jpg',
      '/Patek Philippe/Patek Philippe new13.jpg',
      '/Patek Philippe/Patek Philippe new14.jpg',
      
    ],
    category: 'watches',
    subcategory: 'male-watches',
    inStock: true,
    featured: true,
    isNew: true,
    tags: ['patek philippe', 'quartz', 'luxury', 'swiss made', 'nautilus'],
    specifications: {
      'Movement': 'Quartz',
      'Case Material': 'Stainless Steel',
      'Water Resistance': '120m',
      'Dial Color': 'Blue, Black, White,Brown',
      'Crystal': 'Sapphire'
    },
    material: 'Stainless Steel',
    brand: 'Patek Philippe',
    gender: 'male',
    warranty: '2 Years International Warranty',
    rating: 4.9,
    reviewCount: 12,
    createdAt: '2025-07-23',
    updatedAt: '2025-07-23'
  },
// New Tissot Collection
   {
    id: 'TS001',
    name: 'Tissot Classic Quartz',
    description: 'Tissot Quartz Movement. Swiss precision and elegance in a timeless design perfect for everyday wear.',
    price: 5999,
    currency: 'PKR',
    images: [
      '/Tissot/Tissot1.jpg',
      '/Tissot/Tissot1.2.jpg',
      '/Tissot/Tissot1.1.jpg',
      
    ],
    category: 'watches',
    subcategory: 'male-watches',
    inStock: true,
    featured: true,
    isNew: true,
    tags: ['tissot', 'quartz', 'swiss made', 'classic', 'affordable luxury'],
    specifications: {
      'Movement': 'Quartz',
      'Case Material': 'Stainless Steel',
      'Water Resistance': '50m',
      'Dial Color': 'White',
      'Crystal': 'Sapphire'
    },
    material: 'Stainless Steel',
    brand: 'Tissot',
    gender: 'male',
    warranty: '2 Years International Warranty',
    rating: 4.7,
    reviewCount: 25,
    createdAt: '2025-07-23',
    updatedAt: '2025-07-23'
  },
  {
    id: 'TS011',
    name: 'Tissot Sport Quartz',
    description: 'Tissot Quartz Movement. Sporty design with Swiss quartz movement, perfect for active lifestyle and daily wear.',
    price: 5999,
    currency: 'PKR',
    images: [
      '/Tissot/Tissot1.1.jpg',
      '/Tissot/Tissot1.2.jpg'
    ],
    category: 'watches',
    subcategory: 'male-watches',
    inStock: true,
    featured: true,
    tags: ['tissot', 'quartz', 'swiss made', 'sport', 'casual'],
    specifications: {
      'Movement': 'Quartz',
      'Case Material': 'Stainless Steel',
      'Water Resistance': '100m',
      'Dial Color': 'Black',
      'Crystal': 'Sapphire'
    },
    material: 'Stainless Steel',
    brand: 'Tissot',
    gender: 'male',
    warranty: '2 Years International Warranty',
    rating: 4.8,
    reviewCount: 32,
    createdAt: '2025-07-23',
    updatedAt: '2025-07-23'
  },
  {
    id: 'TS012',
    name: 'Tissot Heritage Quartz',
    description: 'Tissot Quartz Movement. Classic heritage design with modern Swiss quartz precision and reliability.',
    price: 5999,
    currency: 'PKR',
    images: [
      '/Tissot/Tissot1.2.jpg',
      '/Tissot/Tissot1.jpg'
    ],
    category: 'watches',
    subcategory: 'male-watches',
    inStock: true,
    featured: true,
    tags: ['tissot', 'quartz', 'swiss made', 'heritage', 'vintage style'],
    specifications: {
      'Movement': 'Quartz',
      'Case Material': 'Stainless Steel',
      'Water Resistance': '30m',
      'Dial Color': 'Silver',
      'Crystal': 'Mineral'
    },
    material: 'Stainless Steel',
    brand: 'Tissot',
    gender: 'male',
    warranty: '2 Years International Warranty',
    rating: 4.6,
    reviewCount: 18,
    createdAt: '2025-07-23',
    updatedAt: '2025-07-23'
  },
  {
    id: 'TS002',
    name: 'Tissot Business Quartz',
    description: 'Tissot Quartz Movement. Professional grade Swiss timepiece with superior build quality and elegant finish.',
    price: 5299,
    currency: 'PKR',
    images: [
      '/Tissot/Tissot2.jpg',
      '/Tissot/Tissot2.1.jpg',
      '/Tissot/Tissot2.2.jpg'
    ],
    category: 'watches',
    subcategory: 'male-watches',
    inStock: true,
    featured: true,
    tags: ['tissot', 'quartz', 'swiss made', 'business', 'professional'],
    specifications: {
      'Movement': 'Quartz',
      'Case Material': 'Stainless Steel',
      'Water Resistance': '50m',
      'Dial Color': 'Blue',
      'Crystal': 'Sapphire'
    },
    material: 'Stainless Steel',
    brand: 'Tissot',
    gender: 'male',
    warranty: '2 Years International Warranty',
    rating: 4.7,
    reviewCount: 28,
    createdAt: '2025-07-23',
    updatedAt: '2025-07-23'
  },
  {
    id: 'TS021',
    name: 'Tissot Professional Quartz',
    description: 'Tissot Quartz Movement. Sophisticated business watch with Swiss precision, ideal for professional settings.',
    price: 5299,
    currency: 'PKR',
    images: [
      '/Tissot/Tissot2.1.jpg',
      '/Tissot/Tissot2.2.jpg'
    ],
    category: 'watches',
    subcategory: 'male-watches',
    inStock: true,
    featured: true,
    tags: ['tissot', 'quartz', 'swiss made', 'professional', 'formal'],
    specifications: {
      'Movement': 'Quartz',
      'Case Material': 'Stainless Steel',
      'Water Resistance': '30m',
      'Dial Color': 'White',
      'Crystal': 'Mineral'
    },
    material: 'Stainless Steel',
    brand: 'Tissot',
    gender: 'male',
    warranty: '2 Years International Warranty',
    rating: 4.6,
    reviewCount: 22,
    createdAt: '2025-07-23',
    updatedAt: '2025-07-23'
  },
  {
    id: 'TS022',
    name: 'Tissot Dress Quartz',
    description: 'Tissot Quartz Movement. Elegant dress watch with refined Swiss craftsmanship for formal occasions.',
    price: 5299,
    currency: 'PKR',
    images: [
      '/Tissot/Tissot2.3.jpg',
      '/Tissot/Tissot2.2.jpg'
    ],
    category: 'watches',
    subcategory: 'male-watches',
    inStock: true,
    featured: true,
    tags: ['tissot', 'quartz', 'swiss made', 'dress watch', 'elegant'],
    specifications: {
      'Movement': 'Quartz',
      'Case Material': 'Stainless Steel',
      'Water Resistance': '30m',
      'Dial Color': 'Gold',
      'Crystal': 'Sapphire'
    },
    material: 'Stainless Steel',
    brand: 'Tissot',
    gender: 'male',
    warranty: '2 Years International Warranty',
    rating: 4.8,
    reviewCount: 19,
    createdAt: '2025-07-23',
    updatedAt: '2025-07-23'
  },
{
    id: 'TS031',
    name: 'Tissot Heritage Quartz',
    description: 'Tissot Quartz Movement. Classic heritage design with modern Swiss quartz precision and reliability.',
    price: 5250,
    currency: 'PKR',
    images: [
      '/Tissot/Tissot new1.jpg',
      '/Tissot/Tissot new2.jpg',
      '/Tissot/Tissot new3.jpg',
      
    ],
    category: 'watches',
    subcategory: 'male-watches',
    inStock: true,
    featured: true,
    tags: ['tissot', 'quartz', 'swiss made', 'heritage', 'vintage style'],
    specifications: {
      'Movement': 'Quartz',
      'Case Material': 'Stainless Steel',
      'Water Resistance': '30m',
      'Dial Color': 'Silver',
      'Crystal': 'Mineral'
    },
    material: 'Stainless Steel',
    brand: 'Tissot',
    gender: 'male',
    warranty: '2 Years International Warranty',
    rating: 4.6,
    reviewCount: 18,
    createdAt: '2025-07-23',
    updatedAt: '2025-07-23'
  },
  // Universe - Watches - Premium/Luxury
  {
    id: 'UV001',
    name: 'Universe Point Watch',
    description: 'Tissot Quartz Movement. Swiss precision and elegance in a timeless design perfect for everyday wear.',
    price: 4150,
    currency: 'PKR',
    images: [
      '/Universe/universe_1.jpg',
      '/Universe/universe_2.jpg',
      '/Universe/universe_3.jpg'
    ],
    category: 'watches',
    subcategory: 'male-watches',
    inStock: true,
    featured: true,
    isNew: true,
    tags: ['Universe', 'quartz', 'swiss made', 'classic', 'affordable luxury'],
    specifications: {
      'Movement': 'Quartz',
      'Case Material': 'Stainless Steel',
      'Water Resistance': '50m',
      'Dial Color': 'White',
      'Crystal': 'Sapphire'
    },
    material: 'Stainless Steel',
    brand: 'Tissot',
    gender: 'male',
    warranty: '2 Years International Warranty',
    rating: 4.7,
    reviewCount: 25,
    createdAt: '2025-07-23',
    updatedAt: '2025-07-23'
  },
  // New Cartier Male Watch Collection
  {
    id: 'CW001',
    name: 'Cartier  Chain Bracelet Watch',
    description: 'Cartier Automatic Movement. Iconic Santos design with luxury chain bracelet, perfect for the sophisticated Pakistani gentleman.',
    price: 6500,
    currency: 'PKR',
    images: [
      '/Cartier Chain/Cartier_Chain_1.jpg',
      '/Cartier Chain/Cartier_Chain_2.jpg',
      '/Cartier Chain/Cartier_Chain_3.jpg',
      '/Cartier Chain/Cartier_Chain_4.jpg',
      '/Cartier Chain/Cartier_Chain_5.jpg'
    ],
    category: 'watches',
    subcategory: 'male-watches',
    inStock: true,
    featured: true,
    isNew: true,
    tags: ['cartier', 'santos', 'chain bracelet', 'luxury', 'automatic', 'swiss made'],
    specifications: {
      'Movement': 'Automatic',
      'Case Material': 'Stainless Steel',
      'Water Resistance': '100m',
      'Dial Color': 'White',
      'Crystal': 'Sapphire',
      'Strap': 'Steel Chain Bracelet'
    },
    material: 'Stainless Steel',
    brand: 'Cartier',
    gender: 'male',
    warranty: '2 Years International Warranty',
    rating: 4.8,
    reviewCount: 45,
    createdAt: '2025-07-23',
    updatedAt: '2025-07-23'
  },
  {
    id: 'CW004',
    name: 'Cartier Sport Rubber Strap Watch',
    description: 'Cartier Quartz Movement. Sporty design with premium rubber strap, perfect for active lifestyle and casual wear.',
    price: 5500,
    currency: 'PKR',
    images: [
      '/Cartier Rubber Strap/cartier_rubber_1.jpg',
      '/Cartier Rubber Strap/cartier_rubber_2.jpg',
      '/Cartier Rubber Strap/cartier_rubber_3.jpg',
      '/Cartier Rubber Strap/cartier_rubber_4.jpg',
      '/Cartier Rubber Strap/cartier_rubber_5.jpg'
    ],
    category: 'watches',
    subcategory: 'male-watches',
    inStock: true,
    featured: true,
    tags: ['cartier', 'sport', 'rubber strap', 'casual', 'quartz', 'water resistant'],
    specifications: {
      'Movement': 'Quartz',
      'Case Material': 'Stainless Steel',
      'Water Resistance': '200m',
      'Dial Color': 'Blue',
      'Crystal': 'Sapphire',
      'Strap': 'Premium Rubber'
    },
    material: 'Stainless Steel',
    brand: 'Cartier',
    gender: 'male',
    warranty: '2 Years International Warranty',
    rating: 4.6,
    reviewCount: 34,
    createdAt: '2025-07-23',
    updatedAt: '2025-07-23'
  },

// New Bestwish Male Watch Collection


  {
    id: 'BW001',
    name: 'Bestwin Chain Bracelet Watch',
    description: 'Bestwin Automatic Movement. Premium design with luxury chain bracelet, perfect for the sophisticated Pakistani gentleman.',
    price: 4850,
    currency: 'PKR',
    images: [
      '/Bestwin/bestwin_1.jpg',
      '/Bestwin/bestwin_2.jpg',
      '/Bestwin/bestwin_3.jpg',
      '/Bestwin/bestwin_4.jpg',
      '/Bestwin/bestwin_5.jpg'
    ],
    category: 'watches',
    subcategory: 'male-watches',
    inStock: true,
    featured: true,
    isNew: true,
    tags: ['bestwin', 'chain bracelet', 'luxury', 'automatic', 'premium'],
    specifications: {
      'Movement': 'Automatic',
      'Case Material': 'Stainless Steel',
      'Water Resistance': '100m',
      'Dial Color': 'White',
      'Crystal': 'Sapphire',
      'Strap': 'Steel Chain Bracelet'
    },
    material: 'Stainless Steel',
    brand: 'Bestwin',
    gender: 'male',
    warranty: '2 Years International Warranty',
    rating: 4.8,
    reviewCount: 45,
    createdAt: '2025-07-23',
    updatedAt: '2025-07-23'
  },
  {
    id: 'BW002',
    name: 'Bestwin Chain Bracelet Watch',
    description: 'Bestwin Automatic Movement. Premium design with luxury chain bracelet, perfect for the sophisticated Pakistani gentleman.',
    price: 4850,
    currency: 'PKR',
    images: [
      '/Bestwin/bestwin_6.jpg',
      '/Bestwin/bestwin_7.jpg',
      '/Bestwin/bestwin_8.jpg',
      '/Bestwin/bestwin_9.jpg',
      '/Bestwin/bestwin_10.jpg',
      '/Bestwin/bestwin_11.jpg'
    ],
    category: 'watches',
    subcategory: 'male-watches',
    inStock: true,
    featured: true,
    isNew: true,
    tags: ['bestwin', 'chain bracelet', 'luxury', 'automatic', 'premium'],
    specifications: {
      'Movement': 'Automatic',
      'Case Material': 'Stainless Steel',
      'Water Resistance': '100m',
      'Dial Color': 'White',
      'Crystal': 'Sapphire',
      'Strap': 'Steel Chain Bracelet'
    },
    material: 'Stainless Steel',
    brand: 'Bestwin',
    gender: 'male',
    warranty: '2 Years International Warranty',
    rating: 4.8,
    reviewCount: 45,
    createdAt: '2025-07-23',
    updatedAt: '2025-07-23'
  },
  // New Female Guess Watch Collection
  {
    id: 'GW001',
    name: 'Guess Collection Ladies Watch',
    description: 'Guess Quartz Movement. Sophisticated rose gold timepiece with crystal accents, perfect for the modern Pakistani woman.',
    price: 8999,
    currency: 'PKR',
    images: [
      '/Female-Guess/Guess_1.jpg',
      '/Female-Guess/Guess_2.jpg',
      '/Female-Guess/Guess_3.jpg',
      '/Female-Guess/Guess_4.jpg',
      '/Female-Guess/Guess_5.jpg'
    ],
    category: 'watches',
    subcategory: 'female-watches',
    inStock: true,
    featured: true,
    isNew: true,
    tags: ['guess', 'female', 'rose gold', 'quartz', 'crystal', 'elegant'],
    specifications: {
      'Movement': 'Quartz',
      'Case Material': 'Rose Gold Plated Stainless Steel',
      'Water Resistance': '30m',
      'Dial Color': 'White with Crystals',
      'Crystal': 'Mineral',
      'Strap': 'Rose Gold Bracelet'
    },
    material: 'Rose Gold Plated Stainless Steel',
    brand: 'Guess',
    gender: 'female',
    warranty: '2 Years International Warranty',
    rating: 4.7,
    reviewCount: 42,
    createdAt: '2025-07-23',
    updatedAt: '2025-07-23'
  },
  {
    id: 'GW002',
    name: 'Guess  Collection Ladies Watch',
    description: 'Guess Quartz Movement. Stunning crystal-embellished watch with premium finish, ideal for Pakistani formal occasions.',
    price: 9499,
    currency: 'PKR',
    images: [
      '/Female-Guess/Guess_6.jpg',
      '/Female-Guess/Guess_7.jpg',
      '/Female-Guess/Guess_8.jpg',
      '/Female-Guess/Guess_9.jpg',
      '/Female-Guess/Guess_10.jpg'
    ],
    category: 'watches',
    subcategory: 'female-watches',
    inStock: true,
    featured: true,
    tags: ['guess', 'female', 'crystal', 'quartz', 'luxury', 'formal'],
    specifications: {
      'Movement': 'Quartz',
      'Case Material': 'Stainless Steel',
      'Water Resistance': '50m',
      'Dial Color': 'Mother of Pearl',
      'Crystal': 'Sapphire',
      'Strap': 'Steel Bracelet'
    },
    material: 'Stainless Steel',
    brand: 'Guess',
    gender: 'female',
    warranty: '2 Years International Warranty',
    rating: 4.8,
    reviewCount: 35,
    createdAt: '2025-07-23',
    updatedAt: '2025-07-23'
  },
  {
    id: 'GW003',
    name: 'Guess Fashion Ladies Watch',
    description: 'Guess Quartz Movement. Trendy fashion watch with contemporary design, perfect for everyday Pakistani lifestyle.',
    price: 7999,
    currency: 'PKR',
    images: [
      '/Female-Guess/Guess_11.jpg',
      '/Female-Guess/Guess_12.jpg',
      '/Female-Guess/Guess_13.jpg',
      '/Female-Guess/Guess_14.jpg',
      '/Female-Guess/Guess_15.jpg'
    ],
    category: 'watches',
    subcategory: 'female-watches',
    inStock: true,
    featured: true,
    tags: ['guess', 'female', 'fashion', 'quartz', 'trendy', 'casual'],
    specifications: {
      'Movement': 'Quartz',
      'Case Material': 'Alloy',
      'Water Resistance': '30m',
      'Dial Color': 'Silver',
      'Crystal': 'Mineral',
      'Strap': 'Metal Chain'
    },
    material: 'Alloy',
    brand: 'Guess',
    gender: 'female',
    warranty: '1 Year Manufacturer Warranty',
    rating: 4.6,
    reviewCount: 28,
    createdAt: '2025-07-23',
    updatedAt: '2025-07-23'
  },
  {
    id: 'GW004',
    name: 'Guess Collection Ladies Watch',
    description: 'Guess Quartz Movement. Premium gold-tone watch with sophisticated design, ideal for Pakistani business women.',
    price: 10999,
    currency: 'PKR',
    images: [
      '/Female-Guess/Guess_16.jpg',
      '/Female-Guess/Guess_17.jpg',
      '/Female-Guess/Guess_18.jpg',
      '/Female-Guess/Guess_19.jpg',
      '/Female-Guess/Guess_20.jpg'
    ],
    category: 'watches',
    subcategory: 'female-watches',
    inStock: true,
    featured: true,
    isNew: true,
    tags: ['guess', 'female', 'gold', 'quartz', 'luxury', 'business'],
    specifications: {
      'Movement': 'Quartz',
      'Case Material': 'Gold Plated Stainless Steel',
      'Water Resistance': '50m',
      'Dial Color': 'Champagne',
      'Crystal': 'Sapphire',
      'Strap': 'Gold Plated Bracelet'
    },
    material: 'Gold Plated Stainless Steel',
    brand: 'Guess',
    gender: 'female',
    warranty: '2 Years International Warranty',
    rating: 4.9,
    reviewCount: 53,
    createdAt: '2025-07-23',
    updatedAt: '2025-07-23'
  },
  {
    id: 'GW005',
    name: 'Guess  Ladies Watch',
    description: 'Guess Quartz Movement. Athletic-inspired design with durability and style, perfect for active Pakistani women.',
    price: 6999,
    currency: 'PKR',
    images: [
      '/Female-Guess/Guess_21.jpg',
      '/Female-Guess/Guess_22.jpg',
      '/Female-Guess/Guess_23.jpg',
      '/Female-Guess/Guess_24.jpg',
      '/Female-Guess/Guess_25.jpg'
    ],
    category: 'watches',
    subcategory: 'female-watches',
    inStock: true,
    featured: true,
    tags: ['guess', 'female', 'sport', 'quartz', 'athletic', 'durable'],
    specifications: {
      'Movement': 'Quartz',
      'Case Material': 'Stainless Steel',
      'Water Resistance': '100m',
      'Dial Color': 'Black',
      'Crystal': 'Mineral',
      'Strap': 'Silicone'
    },
    material: 'Stainless Steel',
    brand: 'Guess',
    gender: 'female',
    warranty: '2 Years International Warranty',
    rating: 4.5,
    reviewCount: 31,
    createdAt: '2025-07-23',
    updatedAt: '2025-07-23'
  },
  {
    id: 'GW006',
    name: 'Guess Classic Ladies Watch',
    description: 'Guess Quartz Movement. Timeless classic design with modern functionality, suitable for all Pakistani occasions.',
    price: 8499,
    currency: 'PKR',
    images: [
      '/Female-Guess/Guess_26.jpg',
      '/Female-Guess/Guess_27.jpg',
      '/Female-Guess/Guess_28.jpg',
      '/Female-Guess/Guess_29.jpg',
      '/Female-Guess/Guess_1.jpg'
    ],
    category: 'watches',
    subcategory: 'female-watches',
    inStock: true,
    featured: true,
    tags: ['guess', 'female', 'classic', 'quartz', 'timeless', 'versatile'],
    specifications: {
      'Movement': 'Quartz',
      'Case Material': 'Stainless Steel',
      'Water Resistance': '30m',
      'Dial Color': 'White',
      'Crystal': 'Mineral',
      'Strap': 'Leather'
    },
    material: 'Stainless Steel',
    brand: 'Guess',
    gender: 'female',
    warranty: '2 Years International Warranty',
    rating: 4.7,
    reviewCount: 39,
    createdAt: '2025-07-23',
    updatedAt: '2025-07-23'
  },

  

  // ...existing products continue...
];

export const CATEGORIES: Category[] = [
  {
    id: 'watches',
    name: 'Watches',
    slug: 'watches',
    description: 'Luxury timepieces for the discerning Pakistani customer',
    image: 'public\watches\IMG-20250722-WA0042.jpg',
    featured: true,
    subcategories: [
      {
        id: 'male-watches',
        name: 'Male Watches',
        slug: 'male-watches',
        description: 'Premium watches for men',
        image: 'public\watches\IMG-20250722-WA0042.jpg'
      },
      {
        id: 'female-watches',
        name: 'Female Watches',
        slug: 'female-watches',
        description: 'Elegant timepieces for women',
        image: 'https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg'
      },
      {
        id: 'pre-owned-luxury',
        name: 'Pre-owned Watches',
        slug: 'pre-owned-luxury',
        description: 'Certified pre-owned watches',
        image: 'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg'
      },
      {
        id: 'premium-luxury',
        name: 'Premium/Luxury Watches',
        slug: 'premium-luxury',
        description: 'Exclusive premium and luxury watches collection',
        image: 'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg'
      }
    ]
  },
  {
    id: 'jewelry',
    name: 'Jewelry',
    slug: 'jewelry',
    description: 'Exquisite jewelry collection for Pakistani occasions',
    image: 'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg',
    featured: true,
    subcategories: [
      {
        id: 'rings',
        name: 'Rings',
        slug: 'rings',
        description: 'Beautiful rings for every occasion',
        image: 'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg'
      },
      {
        id: 'earrings',
        name: 'Earrings',
        slug: 'earrings',
        description: 'Elegant earrings in traditional and modern styles',
        image: 'https://images.pexels.com/photos/1454169/pexels-photo-1454169.jpeg'
      },
      {
        id: 'necklaces',
        name: 'Necklaces',
        slug: 'necklaces',
        description: 'Stunning necklaces for Pakistani formal wear',
        image: 'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg'
      },
      {
        id: 'bracelets',
        name: 'Bracelets',
        slug: 'bracelets',
        description: 'Sophisticated bracelets and bangles',
        image: 'https://images.pexels.com/photos/1454169/pexels-photo-1454169.jpeg'
      },
      {
        id: 'handcuffs',
        name: 'Handcuffs',
        slug: 'handcuffs',
        description: 'Traditional Pakistani handcuff jewelry',
        image: 'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg'
      },
      {
        id: 'combos',
        name: 'Combos',
        slug: 'combos',
        description: 'Complete jewelry sets for special occasions',
        image: 'https://images.pexels.com/photos/1454169/pexels-photo-1454169.jpeg'
      },
      {
        id: 'locket-sets',
        name: 'Locket Sets',
        slug: 'locket-sets',
        description: 'Beautiful locket sets with chains',
        image: 'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg'
      },
      {
        id: 'anklets',
        name: 'Anklets',
        slug: 'anklets',
        description: 'Traditional and modern anklet designs',
        image: 'https://images.pexels.com/photos/1454169/pexels-photo-1454169.jpeg'
      }
    ]
  },
  {
    id: 'announcements',
    name: 'Announcements',
    slug: 'announcements',
    description: 'Special announcements and promotional content',
    image: 'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg',
    featured: true,
    subcategories: [
      {
        id: 'general',
        name: 'General Announcements',
        slug: 'general',
        description: 'General store announcements',
        image: 'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg'
      },
      {
        id: 'promotions',
        name: 'Promotions',
        slug: 'promotions',
        description: 'Special promotions and offers',
        image: 'https://images.pexels.com/photos/1454169/pexels-photo-1454169.jpeg'
      },
      {
        id: 'events',
        name: 'Events',
        slug: 'events',
        description: 'Store events and launches',
        image: 'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg'
      },
      {
        id: 'news',
        name: 'News',
        slug: 'news',
        description: 'Latest news and updates',
        image: 'https://images.pexels.com/photos/1454169/pexels-photo-1454169.jpeg'
      }
    ]
  }
];

export const ANNOUNCEMENTS: Announcement[] = [];

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