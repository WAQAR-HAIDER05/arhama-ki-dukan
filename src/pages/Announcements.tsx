import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Tag, ArrowRight, Gift, Sparkles, Clock } from 'lucide-react';
import { ANNOUNCEMENTS } from '../data/products';

/**
 * Announcements page for promotional offers and news
 * Optimized for Pakistani market with cultural considerations
 */
const Announcements: React.FC = () => {
  const activeAnnouncements = ANNOUNCEMENTS.filter(ann => ann.isActive);
  const featuredAnnouncements = activeAnnouncements.filter(ann => ann.featured);
  const regularAnnouncements = activeAnnouncements.filter(ann => !ann.featured);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'sale':
        return <Tag className="text-red-500" size={24} />;
      case 'new-arrival':
        return <Sparkles className="text-blue-500" size={24} />;
      case 'promotion':
        return <Gift className="text-purple-500" size={24} />;
      default:
        return <Calendar className="text-gray-500" size={24} />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'sale':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'new-arrival':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'promotion':
        return 'bg-purple-50 border-purple-200 text-purple-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-PK', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isExpiring = (endDate?: string) => {
    if (!endDate) return false;
    const end = new Date(endDate);
    const now = new Date();
    const timeDiff = end.getTime() - now.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff <= 7 && daysDiff > 0;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Latest Announcements & Offers
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with our exclusive offers, new arrivals, and special promotions for Pakistani customers
          </p>
        </div>

        {/* Featured Announcements */}
        {featuredAnnouncements.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Offers</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredAnnouncements.map((announcement) => (
                <div
                  key={announcement.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {announcement.image && (
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={announcement.image}
                        alt={announcement.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      
                      {/* Discount Badge */}
                      {announcement.discount && (
                        <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-lg">
                          {announcement.discount}% OFF
                        </div>
                      )}
                      
                      {/* Expiring Soon Badge */}
                      {isExpiring(announcement.endDate) && (
                        <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                          <Clock size={14} />
                          <span>Ending Soon</span>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      {getTypeIcon(announcement.type)}
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getTypeColor(announcement.type)}`}>
                        {announcement.type.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {announcement.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {announcement.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        <p>Started: {formatDate(announcement.startDate)}</p>
                        {announcement.endDate && (
                          <p>Ends: {formatDate(announcement.endDate)}</p>
                        )}
                      </div>
                      
                      {announcement.appliesTo && (
                        <Link
                          to={`/products/${announcement.appliesTo[0]}`}
                          className="inline-flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                        >
                          <span>Shop Now</span>
                          <ArrowRight size={16} />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Regular Announcements */}
        {regularAnnouncements.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">All Announcements</h2>
            <div className="space-y-6">
              {regularAnnouncements.map((announcement) => (
                <div
                  key={announcement.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        {getTypeIcon(announcement.type)}
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(announcement.type)}`}>
                          {announcement.type.replace('-', ' ').toUpperCase()}
                        </span>
                        
                        {announcement.discount && (
                          <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                            {announcement.discount}% OFF
                          </span>
                        )}
                        
                        {isExpiring(announcement.endDate) && (
                          <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center space-x-1">
                            <Clock size={12} />
                            <span>Ending Soon</span>
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {announcement.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-3">
                        {announcement.description}
                      </p>
                      
                      <div className="text-sm text-gray-500">
                        <span>Started: {formatDate(announcement.startDate)}</span>
                        {announcement.endDate && (
                          <span className="ml-4">Ends: {formatDate(announcement.endDate)}</span>
                        )}
                      </div>
                    </div>
                    
                    {announcement.image && (
                      <div className="md:ml-6 flex-shrink-0">
                        <img
                          src={announcement.image}
                          alt={announcement.title}
                          className="w-full md:w-32 h-32 object-cover rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                  
                  {announcement.appliesTo && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <Link
                        to={`/products/${announcement.appliesTo[0]}`}
                        className="inline-flex items-center space-x-2 text-black hover:text-gray-700 font-medium"
                      >
                        <span>Shop {announcement.appliesTo[0].replace('-', ' ')}</span>
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* WhatsApp CTA */}
        <section className="mt-16 bg-green-500 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">
            Want Exclusive Offers?
          </h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Join our WhatsApp list to receive exclusive offers, early access to sales, and personalized recommendations for Pakistani customers.
          </p>
          <button
            onClick={() => {
              const message = encodeURIComponent('السلام علیکم! I would like to join your WhatsApp list for exclusive offers and updates from ARHAMA KI DUKAN.');
              window.open(`https://wa.me/+923445801446?text=${message}`, '_blank');
            }}
            className="bg-white text-green-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Join WhatsApp List
          </button>
        </section>

        {/* Empty State */}
        {activeAnnouncements.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="text-gray-400" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No Active Announcements</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              There are no active announcements at the moment. Check back soon for exciting offers and updates!
            </p>
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <span>Browse Products</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcements;