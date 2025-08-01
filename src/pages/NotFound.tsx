import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';

/**
 * 404 Not Found page with Pakistani cultural context
 */
const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-8xl font-bold text-gray-300 mb-4">404</div>
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
            <Search className="text-gray-400" size={32} />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          Sorry, we couldn't find the page you're looking for. The page might have been moved, 
          deleted, or the URL might be incorrect.
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-mustard text-black px-6 py-3 rounded-lg hover:bg-yellow-400 transition-colors font-medium"
          >
            <Home size={20} />
            <span>Back to Home</span>
          </Link>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-black transition-colors"
            >
              <Search size={18} />
              <span>Browse Products</span>
            </Link>
            
            <Link
              to="/contact"
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-black transition-colors"
            >
              <span>Contact Support</span>
            </Link>
          </div>
        </div>

        {/* WhatsApp Help */}
        <div className="mt-12 p-6 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2">Need Help?</h3>
          <p className="text-green-700 text-sm mb-4">
            If you were looking for a specific product or page, our team can help you find it.
          </p>
          <button
            onClick={() => {
              const message = encodeURIComponent('السلام علیکم! I was looking for something on ARHAMA KI DUKAN website but couldn\'t find it. Can you help me?');
              window.open(`https://wa.me/+923445801446?text=${message}`, '_blank');
            }}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
          >
            Ask on WhatsApp
          </button>
        </div>

        {/* Popular Pages */}
        <div className="mt-8 text-left">
          <h3 className="font-semibold text-gray-900 mb-4">Popular Pages:</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <Link to="/products/watches" className="text-gray-600 hover:text-black transition-colors">
              • Watch Collection
            </Link>
            <Link to="/products/jewelry" className="text-gray-600 hover:text-black transition-colors">
              • Jewelry Collection
            </Link>
            <Link to="/announcements" className="text-gray-600 hover:text-black transition-colors">
              • Latest Offers
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-black transition-colors">
              • About Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;