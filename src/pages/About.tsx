import React from 'react';
import { Award, Shield, Users, Clock, MapPin, Phone, Mail } from 'lucide-react';

/**
 * About page for ARHAMA KI DUKAN
 * Highlighting trust, heritage, and commitment to Pakistani market
 */
const About: React.FC = () => {
  const stats = [
    { label: 'Years of Excellence', value: '9+', icon: Clock },
    { label: 'Happy Customers', value: '5000+', icon: Users },
    { label: 'Authentic Products', value: '100%', icon: Shield },
    { label: 'Customer Satisfaction', value: '98%', icon: Award }
  ];

  const values = [
    {
      title: 'Authenticity Guaranteed',
      description: 'Every piece in our collection comes with certification and warranty, ensuring you receive only genuine luxury items.',
      icon: Shield
    },
    {
      title: 'Pakistani Heritage',
      description: 'Proudly serving Pakistan since 2015, we understand the local market and cultural preferences of our customers.',
      icon: MapPin
    },
    {
      title: 'Expert Curation',
      description: 'Our team carefully selects each piece, ensuring the highest quality and craftsmanship for discerning Pakistani customers.',
      icon: Award
    },
    {
      title: 'Personal Service',
      description: 'From WhatsApp consultations to doorstep delivery, we provide personalized service that exceeds expectations.',
      icon: Users
    }
  ];

  

  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-black via-gray-900 to-black text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              ARHAMA KI DUKAN
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300">
              Pakistan's Trusted Name in Luxury Jewelry & Watches
            </p>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Since 2015, we've been committed to bringing authentic luxury to Pakistani customers, 
              combining international standards with local understanding and personal service.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="text-white" size={32} />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Founded in the heart of Karachi, ARHAMA KI DUKAN began as a vision to make luxury accessible 
                to Pakistani customers who appreciate quality and authenticity.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <img
                  src="https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg"
                  alt="ARHAMA KI DUKAN Store"
                  className="w-full h-80 object-cover rounded-lg shadow-lg"
                />
              </div>
              
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  Bringing Luxury to Pakistan
                </h3>
                
                <p className="text-gray-700 leading-relaxed">
                  What started as a small jewelry shop in Karachi has evolved into Pakistan's premier 
                  destination for luxury jewelry and watches. We recognized the need for authentic, 
                  certified luxury products in the Pakistani market.
                </p>
                
                <p className="text-gray-700 leading-relaxed">
                  Today, we serve customers across Pakistan, from bustling cities like Karachi and Lahore 
                  to smaller towns, always maintaining our commitment to authenticity, quality, and 
                  exceptional customer service.
                </p>
                
                <p className="text-gray-700 leading-relaxed">
                  Our WhatsApp-first approach reflects our understanding of how Pakistani customers 
                  prefer to shop - with personal interaction, detailed consultation, and trust-based relationships.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These core values guide everything we do and shape the experience we create for our customers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-6">
                    <IconComponent className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      
      
      {/* Why Choose Us */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose ARHAMA KI DUKAN?</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              We're more than just a luxury retailer - we're your trusted partner in finding the perfect piece.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">100% Authentic</h3>
              <p className="text-gray-300">
                Every product comes with international certification and warranty
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Pakistan-Wide Delivery</h3>
              <p className="text-gray-300">
                Secure delivery to all major cities and towns across Pakistan
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Personal Service</h3>
              <p className="text-gray-300">
                WhatsApp consultations and personal shopping assistance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Find Your Perfect Piece?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Our team is here to help you discover the perfect luxury jewelry or watch. 
            Contact us for personalized recommendations and expert guidance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                const message = encodeURIComponent('السلام علیکم! I would like to learn more about ARHAMA KI DUKAN and get personalized recommendations for luxury jewelry or watches.');
                window.open(`https://wa.me/+923445801446?text=${message}`, '_blank');
              }}
              className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold"
            >
              Chat on WhatsApp
            </button>
            
            <a
              href="tel:+92 344 5801446"
              className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors font-semibold"
            >
              Call Us Now
            </a>
          </div>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-6 justify-center items-center text-gray-600">
            <div className="flex items-center space-x-2">
              <Phone size={18} />
              <span>+92 344 5801446</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail size={18} />
              <span>info@arhamakidukan.pk</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin size={18} />
              <span>Karachi, Pakistan</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;