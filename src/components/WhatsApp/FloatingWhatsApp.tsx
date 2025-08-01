import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

/**
 * Floating WhatsApp button optimized for Pakistani users
 * Includes culturally appropriate messaging and local phone formatting
 */
const FloatingWhatsApp: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Show button after page loads and user scrolls a bit
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  // Show tooltip periodically to encourage engagement
  useEffect(() => {
    if (isVisible) {
      const tooltipTimer = setInterval(() => {
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 3000);
      }, 15000);

      return () => clearInterval(tooltipTimer);
    }
  }, [isVisible]);

  const handleWhatsAppClick = () => {
    // Pakistani cultural greeting with business inquiry
    const message = encodeURIComponent(
      `السلام علیکم! I'm browsing ARHAMA KI DUKAN's collection and would like to know more about your luxury jewelry and watches. Please assist me with:\n\n` +
      `• Product availability\n` +
      `• Current offers and prices\n` +
      `• Delivery to my city in Pakistan\n\n` +
      `JazakAllah!`
    );
    
    // Pakistani WhatsApp Business number
    window.open(`https://wa.me/+923445801446?text=${message}`, '_blank');
    setShowTooltip(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full right-0 mb-2 w-64 bg-white rounded-lg shadow-lg border p-4 animate-fade-in">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
          <div className="pr-6">
            <h4 className="font-semibold text-gray-800 mb-1">Need Help?</h4>
            <p className="text-sm text-gray-600 mb-3">
              Chat with us on WhatsApp for instant assistance with your jewelry and watch inquiries!
            </p>
            <div className="flex items-center text-xs text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              Online now • Typically replies in minutes
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        className="group relative bg-mustard text-black hover:bg-yellow-400 rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle size={24} className="animate-pulse" />
        
        {/* Ripple effect */}
        <div className="absolute inset-0 rounded-full bg-green-400 opacity-75 animate-ping"></div>
        
        {/* Online indicator */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
      </button>

      {/* Mobile-optimized call-to-action */}
      <div className="md:hidden absolute bottom-full right-0 mb-2 bg-green-500 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap">
        Chat Now!
      </div>
    </div>
  );
};

export default FloatingWhatsApp;