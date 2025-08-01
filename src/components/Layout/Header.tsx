import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, Phone, MapPin } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useSearch } from '../../contexts/SearchContext';
import { CATEGORIES } from '../../data/products';

/**
 * Header component optimized for Pakistani mobile users
 * Features: sticky navigation, mobile-first design, WhatsApp integration
 */
const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const { itemCount } = useCart();
  const { searchQuery, setSearchQuery, performSearch, clearSearch } = useSearch();
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effect for header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      performSearch(searchQuery);
      navigate('/products');
      setIsSearchOpen(false);
    }
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isSearchOpen) setIsSearchOpen(false);
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  // WhatsApp contact function for Pakistani customers
  const handleWhatsAppContact = () => {
    const message = encodeURIComponent('السلام علیکم! I would like to inquire about your products at ARHAMA KI DUKAN.');
    window.open(`https://wa.me/92 344 5801446?text=${message}`, '_blank');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
    }`}>
      {/* Top bar with contact info - Hidden on mobile to save space */}
      <div className="hidden md:block bg-black text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Phone size={14} />
              <span>+92 344 5801446</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin size={14} />
              <span>Karachi, Pakistan</span>
            </div>
          </div>
          <div className="text-sm">
            <span>Free delivery across Pakistan on orders above PKR 50,000</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <div className="text-2xl md:text-3xl font-bold text-black">
                ARHAMA KI DUKAN
              </div>
              <div className="text-xs text-gray-600 -mt-1">STEP INTO LEGACY</div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link to="/" className="text-gray-800 hover:text-black transition-colors font-medium">
                Home
              </Link>
              
              {/* Watches Dropdown */}
              <div className="relative group">
                <Link to="/products/watches" className="text-gray-800 hover:text-black transition-colors font-medium">
                  Watches
                </Link>
                <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="p-4">
                    {CATEGORIES.find(cat => cat.id === 'watches')?.subcategories.map(sub => (
                      <Link
                        key={sub.id}
                        to={`/products/watches/${sub.slug}`}
                        className="block py-2 text-gray-700 hover:text-black transition-colors"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Jewelry Dropdown */}
              <div className="relative group">
                <Link to="/products/jewelry" className="text-gray-800 hover:text-black transition-colors font-medium">
                  Jewelry
                </Link>
                <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="p-4 grid grid-cols-2 gap-2">
                    {CATEGORIES.find(cat => cat.id === 'jewelry')?.subcategories.map(sub => (
                      <Link
                        key={sub.id}
                        to={`/products/jewelry/${sub.slug}`}
                        className="block py-2 text-gray-700 hover:text-black transition-colors text-sm"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <Link to="/announcements" className="text-gray-800 hover:text-black transition-colors font-medium">
                Announcements
              </Link>
              <Link to="/about" className="text-gray-800 hover:text-black transition-colors font-medium">
                About
              </Link>
              <Link to="/contact" className="text-gray-800 hover:text-black transition-colors font-medium">
                Contact
              </Link>
            </nav>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              
              {/* Search Icon */}
              <button
                onClick={handleSearchToggle}
                className="p-2 text-gray-600 hover:text-black transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              {/* WhatsApp Contact - Desktop */}
              <button
                onClick={handleWhatsAppContact}
                className="hidden md:flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                <Phone size={16} />
                <span className="hidden lg:inline">WhatsApp</span>
              </button>

              {/* Cart */}
              <Link to="/cart" className="relative p-2 text-gray-600 hover:text-black transition-colors">
                <ShoppingCart size={20} />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={handleMenuToggle}
                className="lg:hidden p-2 text-gray-600 hover:text-black transition-colors"
                aria-label="Menu"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="border-t border-gray-100 bg-white">
            <div className="container mx-auto px-4 py-4">
              <form onSubmit={handleSearch} className="flex space-x-4">
                <input
                  type="text"
                  placeholder="Search for jewelry, watches, brands..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Search
                </button>
                <button
                  type="button"
                  onClick={() => {
                    clearSearch();
                    setIsSearchOpen(false);
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-black transition-colors"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white">
            <div className="container mx-auto px-4 py-4">
              <nav className="space-y-4">
                <Link to="/" className="block text-gray-800 hover:text-black font-medium">
                  Home
                </Link>
                
                <div>
                  <Link to="/products/watches" className="block text-gray-800 hover:text-black font-medium mb-2">
                    Watches
                  </Link>
                  <div className="ml-4 space-y-2">
                    {CATEGORIES.find(cat => cat.id === 'watches')?.subcategories.map(sub => (
                      <Link
                        key={sub.id}
                        to={`/products/watches/${sub.slug}`}
                        className="block text-gray-600 hover:text-black text-sm"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <Link to="/products/jewelry" className="block text-gray-800 hover:text-black font-medium mb-2">
                    Jewelry
                  </Link>
                  <div className="ml-4 space-y-2">
                    {CATEGORIES.find(cat => cat.id === 'jewelry')?.subcategories.map(sub => (
                      <Link
                        key={sub.id}
                        to={`/products/jewelry/${sub.slug}`}
                        className="block text-gray-600 hover:text-black text-sm"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <Link to="/announcements" className="block text-gray-800 hover:text-black font-medium">
                  Announcements
                </Link>
                <Link to="/about" className="block text-gray-800 hover:text-black font-medium">
                  About
                </Link>
                <Link to="/contact" className="block text-gray-800 hover:text-black font-medium">
                  Contact
                </Link>

                {/* Mobile WhatsApp Contact */}
                <button
                  onClick={handleWhatsAppContact}
                  className="w-full flex items-center justify-center space-x-2 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors"
                >
                  <Phone size={16} />
                  <span>Contact via WhatsApp</span>
                </button>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;