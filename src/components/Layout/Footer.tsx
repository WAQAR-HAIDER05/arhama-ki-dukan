import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Facebook, 
  Instagram,
  MessageCircle,
  Shield,
  Truck,
  Award
} from 'lucide-react';

/**
 * Footer component for ARHAMA KI DUKAN
 * Optimized for Pakistani market with local contact information
 * Includes trust signals and local delivery information
 */
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent('السلام علیکم! I need assistance with ARHAMA KI DUKAN products.');
    window.open(`https://wa.me/+923001234567?text=${message}`, '_blank');
  };

  return (
    <footer className="bg-black text-white">
      {/* Trust Signals Section */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                <Shield className="text-white" size={24} />
              </div>
              <h3 className="font-semibold">100% Authentic</h3>
              <p className="text-gray-400 text-sm">Certified genuine products with international warranties</p>
            </div>
            
            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                <Truck className="text-white" size={24} />
              </div>
              <h3 className="font-semibold">Pakistan-wide Delivery</h3>
              <p className="text-gray-400 text-sm">Free secure delivery on orders above PKR 50,000</p>
            </div>
            
            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                <Award className="text-white" size={24} />
              </div>
              <h3 className="font-semibold">Trusted Since 2015</h3>
              <p className="text-gray-400 text-sm">9+ years serving Pakistani luxury market</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Information */}
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">ARHAMA KI DUKAN</h2>
              <p className="text-gray-400 text-sm">STEP INTO LEGACY</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="text-gray-400 mt-1 flex-shrink-0" size={16} />
                <div className="text-sm">
                  <p>Shop # 45, Tariq Road</p>
                  <p>Karachi, Sindh 75400</p>
                  <p>Pakistan</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="text-gray-400 flex-shrink-0" size={16} />
                <a href="tel:+92 344 5801446" className="text-sm hover:text-white transition-colors">
                  +92 344 5801446
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="text-gray-400 flex-shrink-0" size={16} />
                <a href="mailto:info@arhamakidukan.pk" className="text-sm hover:text-white transition-colors">
                  info@arhamakidukan.pk
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <nav className="space-y-2">
              <Link to="/" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Home
              </Link>
              <Link to="/products/watches" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Watches Collection
              </Link>
              <Link to="/products/jewelry" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Jewelry Collection
              </Link>
              <Link to="/announcements" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Latest Offers
              </Link>
              <Link to="/about" className="block text-gray-400 hover:text-white transition-colors text-sm">
                About Us
              </Link>
              <Link to="/contact" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Contact
              </Link>
            </nav>
          </div>

          {/* Product Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Categories</h3>
            <nav className="space-y-2">
              <Link to="/products/watches/male-watches" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Men's Watches
              </Link>
              <Link to="/products/watches/female-watches" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Women's Watches
              </Link>
              <Link to="/products/jewelry/rings" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Rings
              </Link>
              <Link to="/products/jewelry/necklaces" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Necklaces
              </Link>
              <Link to="/products/jewelry/earrings" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Earrings
              </Link>
              <Link to="/products/jewelry/bracelets" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Bracelets
              </Link>
            </nav>
          </div>

          {/* Business Hours & Social */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Business Hours</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-start space-x-2">
                  <Clock className="text-gray-400 mt-0.5 flex-shrink-0" size={14} />
                  <div>
                    <p className="text-gray-400">Monday - Saturday</p>
                    <p>10:00 AM - 10:00 PM (PST)</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Clock className="text-gray-400 mt-0.5 flex-shrink-0" size={14} />
                  <div>
                    <p className="text-gray-400">Sunday</p>
                    <p>2:00 PM - 10:00 PM (PST)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com/arhamakidukan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="https://instagram.com/arhamakidukan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <Instagram size={18} />
                </a>
                <button
                  onClick={handleWhatsAppContact}
                  className="w-10 h-10 bg-mustard text-black rounded-full flex items-center justify-center hover:bg-yellow-400 transition-colors"
                >
                  <MessageCircle size={18} />
                </button>
              </div>
            </div>

            {/* WhatsApp Contact Button */}
            <button
              onClick={handleWhatsAppContact}
              className="w-full bg-mustard text-black py-3 px-4 rounded-lg hover:bg-yellow-400 transition-colors flex items-center justify-center space-x-2"
            >
              <MessageCircle size={18} />
              <span>Chat on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              <p>&copy; {currentYear} ARHAMA KI DUKAN. All rights reserved.</p>
              <p className="mt-1">Luxury jewelry and watches for Pakistan since 2015</p>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm text-gray-400">
              <Link to="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms & Conditions
              </Link>
              <Link to="/shipping" className="hover:text-white transition-colors">
                Shipping Info
              </Link>
              <Link to="/returns" className="hover:text-white transition-colors">
                Returns
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;