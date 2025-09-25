'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../../contexts/CartContext';
import { cartService } from '../../lib/cartService';
import { authService } from '../../lib/authService';
import { Button } from '@/components/ui/button';

export default function CartPage() {
  const router = useRouter();
  const { items, itemCount, totalAmount, updateQuantity, removeItem, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderData, setOrderData] = useState({
    paymentMethod: 'card',
    shippingAddress: ''
  });

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    await updateQuantity(itemId, newQuantity);
  };

  const handleRemoveItem = async (itemId: string) => {
    await removeItem(itemId);
  };

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handlePlaceOrder = async () => {
    const user = authService.getCurrentUser();
    if (!user || !orderData.shippingAddress.trim()) return;

    setLoading(true);
    try {
      await cartService.createOrder({
        userId: user.uid,
        items,
        totalAmount,
        status: 'pending',
        paymentMethod: orderData.paymentMethod,
        shippingAddress: orderData.shippingAddress,
        createdAt: new Date()
      });
      
      alert('Order placed successfully!');
      router.push('/buyer');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <header className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-gray-200/50">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <Button variant="outline" onClick={() => router.push('/buyer')} className="text-sm">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                <span className="hidden sm:inline">Continue Shopping</span>
                <span className="sm:hidden">Back</span>
              </Button>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Shopping Cart</h1>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-3 sm:px-6 py-8 sm:py-16 text-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <svg className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"></path>
            </svg>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Your cart is empty</h2>
          <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 px-4">Add some amazing handcrafted products to get started!</p>
          <Button onClick={() => router.push('/buyer')} className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-xl text-sm sm:text-base">
            Start Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <header className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
              <Button variant="outline" onClick={() => router.push('/buyer')} className="text-sm">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                <span className="hidden sm:inline">Continue Shopping</span>
                <span className="sm:hidden">Back</span>
              </Button>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Shopping Cart</h1>
                <p className="text-xs sm:text-sm text-gray-600">{itemCount} items in your cart</p>
              </div>
            </div>
            <Button variant="outline" onClick={clearCart} className="text-red-600 border-red-300 hover:bg-red-50 text-sm self-end sm:self-auto">
              Clear Cart
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
        {!showCheckout ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-3 sm:space-y-4">
              {items.map((item) => {
                const finalPrice = item.price - (item.price * item.discount / 100);
                return (
                  <div key={item.id} className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-3 sm:p-6">
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full sm:w-20 md:w-24 h-32 sm:h-20 md:h-24 object-cover rounded-lg sm:rounded-xl"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-base sm:text-lg text-gray-900 mb-1 sm:mb-2">{item.name}</h3>
                        <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">by {item.sellerName}</p>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <span className="text-lg sm:text-xl font-bold text-gray-900">₹{finalPrice.toLocaleString()}</span>
                            {item.discount > 0 && (
                              <span className="text-xs sm:text-sm text-gray-500 line-through">₹{item.price.toLocaleString()}</span>
                            )}
                          </div>
                          <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3">
                            <div className="flex items-center border border-gray-300 rounded-lg">
                              <button 
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                className="p-1.5 sm:p-2 hover:bg-gray-100 transition-colors"
                              >
                                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                                </svg>
                              </button>
                              <span className="px-2 sm:px-4 py-1.5 sm:py-2 font-medium text-sm sm:text-base">{item.quantity}</span>
                              <button 
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                className="p-1.5 sm:p-2 hover:bg-gray-100 transition-colors"
                              >
                                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                                </svg>
                              </button>
                            </div>
                            <button 
                              onClick={() => handleRemoveItem(item.id)}
                              className="p-1.5 sm:p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 sticky top-8">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Order Summary</h3>
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  <div className="flex justify-between">
                    <span className="text-sm sm:text-base text-gray-600">Subtotal ({itemCount} items)</span>
                    <span className="font-medium text-sm sm:text-base">₹{totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm sm:text-base text-gray-600">Shipping</span>
                    <span className="font-medium text-green-600 text-sm sm:text-base">Free</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 sm:pt-4">
                    <div className="flex justify-between">
                      <span className="text-base sm:text-lg font-bold text-gray-900">Total</span>
                      <span className="text-base sm:text-lg font-bold text-gray-900">₹{totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <Button 
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 sm:py-3 rounded-xl font-semibold text-sm sm:text-base"
                >
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Shipping Address *
                  </label>
                  <textarea
                    value={orderData.shippingAddress}
                    onChange={(e) => setOrderData({...orderData, shippingAddress: e.target.value})}
                    rows={3}
                    className="w-full p-4 border border-gray-300 rounded-xl bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your complete shipping address"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Payment Method
                  </label>
                  <div className="space-y-3">
                    {[
                      { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
                      { id: 'upi', name: 'UPI Payment', icon: '📱' },
                      { id: 'cod', name: 'Cash on Delivery', icon: '💵' }
                    ].map((method) => (
                      <label key={method.id} className="flex items-center p-4 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={orderData.paymentMethod === method.id}
                          onChange={(e) => setOrderData({...orderData, paymentMethod: e.target.value})}
                          className="mr-3"
                        />
                        <span className="text-2xl mr-3">{method.icon}</span>
                        <span className="font-medium">{method.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Order Total: ₹{totalAmount.toLocaleString()}</h4>
                  <p className="text-sm text-gray-600">{itemCount} items • Free shipping</p>
                </div>

                <div className="flex gap-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowCheckout(false)}
                    className="flex-1"
                  >
                    Back to Cart
                  </Button>
                  <Button 
                    onClick={handlePlaceOrder}
                    disabled={loading || !orderData.shippingAddress.trim()}
                    className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                  >
                    {loading ? 'Placing Order...' : 'Place Order'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}