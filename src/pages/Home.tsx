import React, { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Truck, Award } from 'lucide-react';
import { getFeaturedProducts, getNewProducts, formatPKR, ANNOUNCEMENTS } from '../data/products';
import LoadingSpinner from '../components/UI/LoadingSpinner';

// Lazy load heavy components for better performance
const ProductCard = lazy(() => import('../components/Product/ProductCard'));
const CategoryCard = lazy(() => import('../components/Category/CategoryCard'));

/**
 * Home page component for ARHAMA KI DUKAN
 * Optimized for Pakistani mobile users with cultural considerations
 */
const Home: React.FC = () => {
  const featuredProducts = getFeaturedProducts().slice(0, 8);
  const newProducts = getNewProducts().slice(0, 6);
  const activeAnnouncements = ANNOUNCEMENTS.filter(ann => ann.isActive && ann.featured).slice(0, 3);

  const categories = [
    {
      id: 'watches',
      name: 'Luxury Watches',
      description: 'Premium timepieces from world-renowned brands',
      image: 'Tissot/Tissot new2.jpg',
      link: '/products/watches'
    },
    {
      id: 'jewelry',
      name: 'Fine Jewelry',
      description: 'Exquisite jewelry for every special occasion',
      image: 'data:image/jpeg;base64,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',
      link: '/products/jewelry'
    },
    {
      id: 'bridal',
      name: 'Bridal Collection',
      description: 'Complete sets for Pakistani weddings',
      image: 'https://images.pexels.com/photos/1454169/pexels-photo-1454169.jpeg',
      link: '/products/jewelry/combos'
    }
  ];

  const testimonials = [
    {
      name: 'Fatima Ahmed',
      location: 'Karachi',
      rating: 5,
      text: 'Bought my engagement ring from ARHAMA KI DUKAN. Exceptional quality and authentic pieces. The WhatsApp service made ordering so convenient!',
      product: 'Diamond Solitaire Ring'
    },
    {
      name: 'Ali Hassan',
      location: 'Lahore',
      rating: 5,
      text: 'Amazing collection of watches! Got my Rolex with complete authenticity certificate. Delivery to Lahore was quick and secure.',
      product: 'Rolex Submariner'
    },
    {
      name: 'Ayesha Khan',
      location: 'Islamabad',
      rating: 5,
      text: 'Perfect bridal jewelry set for my wedding. Traditional designs with modern touch. Highly recommended for Pakistani brides!',
      product: 'Kundan Bridal Set'
    }
  ];

  return (
    <div className="min-h-screen">
      
      {/* Hero Section - Mobile Optimized */}
      <section
        className="relative bg-gradient-to-r from-black via-gray-900 to-black text-white min-h-[80vh] flex items-center"
        style={{
          backgroundImage: "url('/images/watches-bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          // Headings: Playfair Display, Body: Montserrat
          fontFamily: 'Montserrat, Arial, sans-serif',
        }}
      >
        {/* NOTE: For best results, ensure Google Fonts are loaded in index.html:
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet">
        */}
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium mb-6 leading-tight" style={{ fontFamily: 'Montserrat, Arial, sans-serif', fontWeight: 500 }}>
              ARHAMA KI DUKAN
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto" style={{ fontFamily: 'Montserrat, Arial, sans-serif' }}>
              Pakistan's Premier Destination for Luxury Jewelry & Watches
            </p>
            <p className="text-lg md:text-xl mb-10 text-gray-400 max-w-3xl mx-auto" style={{ fontFamily: 'Montserrat, Arial, sans-serif' }}>
              Discover authentic luxury pieces from world-renowned brands. Serving Pakistan with excellence since 2015.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                to="/products"
                className="bg-mustard text-black px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-400 transition-colors flex items-center space-x-2 w-full sm:w-auto justify-center"
              >
                <span>Shop Collection</span>
                <ArrowRight size={20} />
              </Link>
              
              <Link
                to="/announcements"
                className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-black transition-colors w-full sm:w-auto text-center"
              >
                View Offers
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Announcements Banner */}
      {activeAnnouncements.length > 0 && (
        <section className="bg-gradient-to-r from-mustard to-yellow-500 text-black py-4">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <p className="font-semibold text-lg">
                🎉 {activeAnnouncements[0].title} - Limited Time Offer!
              </p>
              <Link 
                to="/announcements" 
                className="underline hover:no-underline font-medium"
              >
                View Details
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Trust Signals */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
                <Shield className="text-white" size={32} />
              </div>
              <h3 className="font-semibold text-lg">100% Authentic</h3>
              <p className="text-gray-600 text-sm">Certified genuine products with warranties</p>
            </div>
            
            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
                <Truck className="text-white" size={32} />
              </div>
              <h3 className="font-semibold text-lg">Pakistan Delivery</h3>
              <p className="text-gray-600 text-sm">Free secure delivery nationwide</p>
            </div>
            
            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
                <Award className="text-white" size={32} />
              </div>
              <h3 className="font-semibold text-lg">9+ Years Trusted</h3>
              <p className="text-gray-600 text-sm">Serving Pakistani luxury market since 2015</p>
            </div>
            
            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">WA</span>
              </div>
              <h3 className="font-semibold text-lg">WhatsApp Orders</h3>
              <p className="text-gray-600 text-sm">Easy ordering via WhatsApp</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our curated collections of luxury jewelry and watches, carefully selected for the Pakistani market
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Suspense fallback={<LoadingSpinner />}>
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </Suspense>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Handpicked luxury pieces that exemplify elegance and craftsmanship
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <Suspense fallback={<LoadingSpinner />}>
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </Suspense>
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 bg-mustard text-black px-8 py-3 rounded-lg hover:bg-yellow-400 transition-colors"
            >
              <span>View All Products</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      {newProducts.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">New Arrivals</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Latest additions to our luxury collection
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <Suspense fallback={<LoadingSpinner />}>
                {newProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </Suspense>
            </div>
          </div>
        </section>
      )}

      {/* Customer Testimonials */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Trusted by customers across Pakistan for authentic luxury products
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current" size={20} />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.location}</p>
                  <p className="text-gray-500 text-xs mt-1">Purchased: {testimonial.product}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Customer Reviews Videos */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Live Customer Reviews</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Watch real customers share their experiences with ARHAMA KI DUKAN
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="aspect-w-16 aspect-h-9 w-full">
              <iframe
                src="https://www.youtube.com/embed/VIDEO_ID_1"
                title="Customer Review 1"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-64 rounded-lg shadow-lg border"
              ></iframe>
            </div>
            <div className="aspect-w-16 aspect-h-9 w-full">
              <iframe
                src="https://www.youtube.com/embed/VIDEO_ID_2"
                title="Customer Review 2"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-64 rounded-lg shadow-lg border"
              ></iframe>
            </div>
            <div className="aspect-w-16 aspect-h-9 w-full">
              <iframe
                src="https://www.youtube.com/embed/VIDEO_ID_3"
                title="Customer Review 3"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-64 rounded-lg shadow-lg border"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp CTA Section */}
      <section className="py-16 bg-green-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need Personal Assistance?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Chat with our experts on WhatsApp for personalized recommendations and instant support
          </p>
          
          <button
            onClick={() => {
              const message = encodeURIComponent('السلام علیکم! I need assistance choosing the perfect piece from ARHAMA KI DUKAN. Please help me with product recommendations based on my preferences.');
              window.open(`https://wa.me/+923445801446?text=${message}`, '_blank');
            }}
            className="bg-white text-green-500 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Chat on WhatsApp Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;