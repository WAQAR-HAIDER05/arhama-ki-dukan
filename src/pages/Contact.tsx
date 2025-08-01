import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from 'lucide-react';

/**
 * Contact page with Pakistani business information
 * WhatsApp-first approach with local contact details
 */
const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    // Use template literals without leading/trailing newlines
    const message = [
      'السلام علیکم 👋',
      'New inquiry from *ARHAMA KI DUKAN*:',
      '',
      `👤 *Name:* ${formData.name}`,
      `📧 *Email:* ${formData.email}`,
      `📱 *Phone:* ${formData.phone}`,
      `🏷️ *Subject:* ${formData.subject}`,
      '',
      `💬 *Message:*`,
      formData.message,
      '',
      '📞 Please respond at your earliest convenience.',
      'جزاک اللہ 🙏'
    ].join('\n'); // safer than multiline template literal
  
    const encodedMessage = encodeURIComponent(message.trim()); // make sure no leading space/newline
  
    // Open WhatsApp with encoded message
    window.open(`https://wa.me/923445801446?text=${encodedMessage}`, '_blank');
  
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };
  
  const handleDirectWhatsApp = () => {
    const message = encodeURIComponent(
      'السلام علیکم! I would like to get in touch with ARHAMA KI DUKAN for assistance with your luxury jewelry and watches.'
    );
    window.open(`https://wa.me/923445801446?text=${message}`, '_blank');
  };
  

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header */}
      <section className="bg-black text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Get in touch with our team for personalized assistance with luxury jewelry and watches
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* Store Information */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Visit Our Store</h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="text-gray-500 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h3 className="font-semibold text-gray-900">Address</h3>
                    <p className="text-gray-600">
                      Shop # 45, Tariq Road<br />
                      Karachi, Sindh 75400<br />
                      Pakistan
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Phone className="text-gray-500 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h3 className="font-semibold text-gray-900">Phone</h3>
                    <a href="tel:+923001234567" className="text-gray-600 hover:text-black">
                      +92 344 5801446
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Mail className="text-gray-500 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <a href="mailto:info@arhamakidukan.pk" className="text-gray-600 hover:text-black">
                      info@arhamakidukan.pk
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Business Hours</h2>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Clock className="text-gray-500 flex-shrink-0" size={20} />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monday - Saturday</span>
                      <span className="font-medium">10:00 AM - 10:00 PM</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Clock className="text-gray-500 flex-shrink-0" size={20} />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sunday</span>
                      <span className="font-medium">2:00 PM - 10:00 PM</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-500 mt-4">
                  * All times are in Pakistan Standard Time (PST)
                </p>
                
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-800 font-medium text-sm">Currently Open</span>
                  </div>
                  <p className="text-green-700 text-sm mt-1">
                    Available for WhatsApp consultations 24/7
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Contact */}
            <div className="bg-green-500 text-white rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Need Immediate Help?</h2>
              <p className="mb-4">
                Chat with us on WhatsApp for instant assistance with your jewelry and watch inquiries.
              </p>
              <button
                onClick={handleDirectWhatsApp}
                className="w-full bg-mustard text-black py-3 px-4 rounded-lg hover:bg-yellow-400 transition-colors font-semibold flex items-center justify-center space-x-2"
              >
                <MessageCircle size={20} />
                <span>Chat on WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="+92-XXX-XXXXXXX"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    >
                      <option value="">Select a subject</option>
                      <option value="Product Inquiry">Product Inquiry</option>
                      <option value="Custom Order">Custom Order</option>
                      <option value="Pricing Information">Pricing Information</option>
                      <option value="Delivery Query">Delivery Query</option>
                      <option value="Return/Exchange">Return/Exchange</option>
                      <option value="General Question">General Question</option>
                      <option value="Feedback">Feedback</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-vertical"
                    placeholder="Please describe your inquiry in detail..."
                  />
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 text-sm">
                    <strong>Note:</strong> This form will send your message via WhatsApp to ensure quick response. 
                    We typically respond within 30 minutes during business hours.
                  </p>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-mustard text-black py-4 px-6 rounded-lg hover:bg-yellow-400 transition-colors font-semibold flex items-center justify-center space-x-2"
                >
                  <Send size={20} />
                  <span>Send Message via WhatsApp</span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg p-6 shadow-sm text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="text-blue-600" size={24} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">WhatsApp Support</h3>
            <p className="text-gray-600 text-sm">
              Get instant responses to your queries through our WhatsApp business number
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="text-green-600" size={24} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Phone Consultation</h3>
            <p className="text-gray-600 text-sm">
              Schedule a call with our experts for detailed product discussions
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="text-purple-600" size={24} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Store Visit</h3>
            <p className="text-gray-600 text-sm">
              Visit our showroom in Karachi to see our complete collection in person
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;