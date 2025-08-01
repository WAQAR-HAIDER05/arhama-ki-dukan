import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Product } from '../../types';
import { formatPKR } from '../../data/products';

interface WhatsAppOrderButtonProps {
  product: Product;
  quantity?: number;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

/**
 * WhatsApp order button component for individual products
 * Generates culturally appropriate messages for Pakistani customers
 */
const WhatsAppOrderButton: React.FC<WhatsAppOrderButtonProps> = ({
  product,
  quantity = 1,
  className = '',
  variant = 'primary',
  size = 'md'
}) => {
  
  const generateWhatsAppMessage = () => {
    const totalPrice = product.price * quantity;
    const productUrl = `${window.location.origin}/product/${product.id}`;
    
    let message = `السلام علیکم! I'm interested in this beautiful piece from ARHAMA KI DUKAN:\n\n`;
    
    message += `📿 Product: ${product.name}\n`;
    message += `💰 Price: ${formatPKR(product.price)}`;
    
    if (quantity > 1) {
      message += ` x ${quantity} = ${formatPKR(totalPrice)}`;
    }
    message += `\n`;
    
    if (product.material) {
      message += `✨ Material: ${product.material}\n`;
    }
    
    if (product.brand) {
      message += `🏷️ Brand: ${product.brand}\n`;
    }
    
    message += `🔗 Product Link: ${productUrl}\n\n`;
    
    message += `Please provide me with:\n`;
    message += `• Availability confirmation\n`;
    message += `• Delivery details to my city in Pakistan\n`;
    message += `• Payment options\n`;
    message += `• Any current offers or discounts\n\n`;
    
    message += `JazakAllah for your time! Looking forward to your response.`;
    
    return encodeURIComponent(message);
  };

  const handleWhatsAppOrder = () => {
    const message = generateWhatsAppMessage();
    const url = `https://wa.me/+923445801446?text=${message}`;
    console.log('WhatsApp message:', decodeURIComponent(message));
    console.log('WhatsApp URL:', url);
    window.open(url, '_blank');
  };

  const getButtonClasses = () => {
    const baseClasses = `inline-flex items-center justify-center font-medium transition-all duration-200 ${className}`;
    
    const sizeClasses = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2.5 text-base',
      lg: 'px-6 py-3 text-lg'
    };

    const variantClasses = {
      primary: 'bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg',
      secondary: 'bg-mustard text-black hover:bg-yellow-400 shadow-md hover:shadow-lg',
      outline: 'border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white'
    };

    return `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} rounded-lg`;
  };

  return (
    <button
      onClick={handleWhatsAppOrder}
      className={getButtonClasses()}
      type="button"
    >
      <MessageCircle className="mr-2" size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} />
      <span>Order via WhatsApp</span>
    </button>
  );
};

export default WhatsAppOrderButton;