import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, MessageCircle } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { formatPKR } from '../data/products';

/**
 * Shopping cart page with WhatsApp checkout for Pakistani customers
 * Note: This is UI-only cart, final orders are placed via WhatsApp
 */
const Cart: React.FC = () => {
  const { 
    items, 
    total, 
    itemCount, 
    updateQuantity, 
    removeFromCart, 
    clearCart,
    generateWhatsAppMessage 
  } = useCart();

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;
    
    const message = generateWhatsAppMessage();
    window.open(`https://wa.me/+923445801446?text=${message}`, '_blank');
  };

  const deliveryThreshold = 50000; // PKR 50,000 for free delivery
  const deliveryFee = total >= deliveryThreshold ? 0 : 2500; // PKR 2,500 delivery fee
  const finalTotal = total + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="text-gray-400" size={32} />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added anything to your cart yet. Explore our luxury collection!
            </p>
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 bg-mustard text-black px-8 py-3 rounded-lg hover:bg-yellow-400 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Shopping Cart</h1>
            <p className="text-gray-600 mt-1">
              {itemCount} item{itemCount !== 1 ? 's' : ''} in your cart
            </p>
          </div>
          
          <Link
            to="/products"
            className="hidden md:flex items-center space-x-2 text-gray-600 hover:text-black transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Continue Shopping</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-lg shadow-sm">
              {items.map((item, index) => (
                <div key={item.id} className={`p-6 ${index !== items.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <div className="flex items-start space-x-4">
                    
                    {/* Product Image */}
                    <Link to={`/product/${item.id}`} className="flex-shrink-0">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg"
                      />
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <Link to={`/product/${item.id}`}>
                        <h3 className="font-semibold text-gray-800 hover:text-black transition-colors mb-1">
                          {item.name}
                        </h3>
                      </Link>
                      
                      {item.brand && (
                        <p className="text-sm text-gray-500 mb-2">{item.brand}</p>
                      )}
                      
                      {item.material && (
                        <p className="text-sm text-gray-600 mb-2">Material: {item.material}</p>
                      )}

                      {/* Price and Quantity Controls */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={14} />
                          </button>
                          
                          <span className="font-medium min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                          
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <div className="text-right">
                          <div className="font-semibold text-lg">
                            {formatPKR(item.price * item.quantity)}
                          </div>
                          {item.quantity > 1 && (
                            <div className="text-sm text-gray-500">
                              {formatPKR(item.price)} each
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/products"
                className="flex items-center justify-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft size={18} />
                <span>Continue Shopping</span>
              </Link>
              
              <button
                onClick={clearCart}
                className="flex items-center justify-center space-x-2 px-6 py-3 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
              >
                <Trash2 size={18} />
                <span>Clear Cart</span>
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal ({itemCount} items)</span>
                  <span className="font-medium">{formatPKR(total)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="font-medium">
                    {deliveryFee === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      formatPKR(deliveryFee)
                    )}
                  </span>
                </div>
                
                {total < deliveryThreshold && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm text-blue-800">
                      Add {formatPKR(deliveryThreshold - total)} more for free delivery!
                    </p>
                  </div>
                )}
                
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>{formatPKR(finalTotal)}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Including all taxes</p>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full bg-green-500 text-white py-4 px-6 rounded-lg hover:bg-green-600 transition-colors font-semibold flex items-center justify-center space-x-2"
              >
                <MessageCircle size={20} />
                <span>Order via WhatsApp</span>
              </button>

              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Complete your order by chatting with us on WhatsApp. 
                  We'll confirm availability and arrange secure delivery across Pakistan.
                </p>
              </div>

              {/* Trust Signals */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full flex-shrink-0"></div>
                    <span>100% Authentic Products</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-blue-500 rounded-full flex-shrink-0"></div>
                    <span>Secure Packaging & Delivery</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-purple-500 rounded-full flex-shrink-0"></div>
                    <span>7-Day Return Policy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;