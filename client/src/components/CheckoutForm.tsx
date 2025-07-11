import React, { useState } from 'react';
import { X, CreditCard, Truck, Shield } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import emailjs from '@emailjs/browser';
import CustomAlert from './CustomAlert';
import { navigateToPage } from '../utils/navigation';

interface CheckoutFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: 'cod' | 'online';
}

interface ValidationErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ isOpen, onClose }) => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'cod'
  });
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState<{
    orderId: string;
    totalAmount: number;
    estimatedDelivery: string;
  } | null>(null);
  const [alert, setAlert] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  }>({
    isOpen: false,
    title: '',
    message: '',
    type: 'info'
  });

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let filteredValue = value;
    
    // Apply input filtering based on field type
    if (name === 'phone') {
      // Only allow digits and limit to 10 characters
      filteredValue = value.replace(/\D/g, '').slice(0, 10);
    } else if (name === 'pincode') {
      // Only allow digits and limit to 6 characters
      filteredValue = value.replace(/\D/g, '').slice(0, 6);
    } else if (name === 'firstName' || name === 'lastName' || name === 'city' || name === 'state') {
      // Only allow letters and spaces
      filteredValue = value.replace(/[^a-zA-Z\s]/g, '');
    }
    
    setCustomerInfo(prev => ({
      ...prev,
      [name]: filteredValue
    }));
    
    // Clear validation error for this field when user starts typing
    if (validationErrors[name as keyof ValidationErrors]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = () => {
    const errors: ValidationErrors = {};
    let isValid = true;
    
    // Required field validations
    if (!customerInfo.firstName.trim()) {
      errors.firstName = 'First name is required';
      isValid = false;
    }
    
    if (!customerInfo.lastName.trim()) {
      errors.lastName = 'Last name is required';
      isValid = false;
    }
    
    if (!customerInfo.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else {
      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(customerInfo.email)) {
        errors.email = 'Please enter a valid email address';
        isValid = false;
      }
    }
    
    if (!customerInfo.phone.trim()) {
      errors.phone = 'Phone number is required';
      isValid = false;
    } else if (customerInfo.phone.length !== 10) {
      errors.phone = 'Phone number must be exactly 10 digits';
      isValid = false;
    }
    
    if (!customerInfo.address.trim()) {
      errors.address = 'Address is required';
      isValid = false;
    }
    
    if (!customerInfo.city.trim()) {
      errors.city = 'City is required';
      isValid = false;
    }
    
    if (!customerInfo.state.trim()) {
      errors.state = 'State is required';
      isValid = false;
    }
    
    if (!customerInfo.pincode.trim()) {
      errors.pincode = 'Pincode is required';
      isValid = false;
    } else if (customerInfo.pincode.length !== 6) {
      errors.pincode = 'Pincode must be exactly 6 digits';
      isValid = false;
    }
    
    setValidationErrors(errors);
    return isValid;
  };

  const getEstimatedDeliveryDate = () => {
    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + 5); // 5 days from now
    
    return deliveryDate.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setAlert({
        isOpen: true,
        title: 'Invalid Information',
        message: 'Please correct the errors in the form and try again.',
        type: 'warning'
      });
      return;
    }

    if (cartItems.length === 0) {
      setAlert({
        isOpen: true,
        title: 'Empty Cart',
        message: 'Your cart is empty. Please add items before checkout.',
        type: 'warning'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare order data for email
      const orderId = `ORD-${Date.now()}`;
      const totalAmount = getTotalPrice();
      const estimatedDelivery = getEstimatedDeliveryDate();
      
      const orderData = {
        orderId,
        customer: customerInfo,
        items: cartItems,
        totalAmount,
        orderDate: new Date().toLocaleString(),
        paymentMethod: customerInfo.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'
      };

      // Prepare email template parameters
      const templateParams = {
        to_email: 'admin@nikzone.com', // Replace with your admin email
        order_id: orderData.orderId,
        customer_name: `${customerInfo.firstName} ${customerInfo.lastName}`,
        customer_email: customerInfo.email,
        customer_phone: customerInfo.phone,
        customer_address: `${customerInfo.address}, ${customerInfo.city}, ${customerInfo.state} - ${customerInfo.pincode}`,
        payment_method: orderData.paymentMethod,
        total_amount: `₹${totalAmount.toLocaleString()}`,
        order_date: orderData.orderDate,
        items_list: cartItems.map(item => 
          `${item.product.name} (Size: ${item.size}, Qty: ${item.quantity}, Price: ₹${item.product.price})`
        ).join('\n'),
        items_count: cartItems.length,
        total_items: cartItems.reduce((sum, item) => sum + item.quantity, 0)
      };

      // Send email using EmailJS
      const serviceId = localStorage.getItem('emailjs_service_id');
      const templateId = localStorage.getItem('emailjs_template_id');
      const publicKey = localStorage.getItem('emailjs_public_key');

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS configuration not found. Please configure EmailJS in admin settings.');
      }

      await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      // Clear cart and show success message
      clearCart();
      
      // Set order details for success modal
      setOrderDetails({
        orderId,
        totalAmount,
        estimatedDelivery
      });

      // Reset form
      setCustomerInfo({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        paymentMethod: 'cod'
      });
      setValidationErrors({});

      // Show success modal
      setShowSuccessModal(true);

    } catch (error) {
      console.error('Error sending order email:', error);
      setAlert({
        isOpen: true,
        title: 'Order Failed',
        message: 'There was an error processing your order. Please try again or contact support.',
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    setOrderDetails(null);
    onClose();
    // Navigate to home page
    navigateToPage('home');
    // Scroll to top
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'auto' }), 100);
  };
  const subtotal = getTotalPrice();
  const shipping = 0; // Free shipping
  const tax = Math.round(subtotal * 0.18); // 18% GST
  const total = subtotal + shipping + tax;

  // Success Modal Component
  const SuccessModal = () => {
    if (!showSuccessModal || !orderDetails) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
          {/* Success Header */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Order Placed Successfully!</h2>
            <p className="text-green-100">Thank you for shopping with NIKZONE</p>
          </div>
          
          {/* Order Details */}
          <div className="p-6">
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-gray-600 text-sm">Order ID</p>
                <p className="font-bold text-lg text-gray-900">{orderDetails.orderId}</p>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Total Amount</span>
                  <span className="font-bold text-xl text-gray-900">₹{orderDetails.totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Payment Method</span>
                  <span className="text-gray-900">Cash on Delivery</span>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Truck className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-900">Estimated Delivery</span>
                </div>
                <p className="text-blue-800 text-sm">{orderDetails.estimatedDelivery}</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">What's Next?</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• You'll receive a confirmation email shortly</li>
                  <li>• We'll notify you when your order is shipped</li>
                  <li>• Track your order status via email updates</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 space-y-3">
              <button
                onClick={handleSuccessModalClose}
                className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => {
                  // Copy order ID to clipboard
                  navigator.clipboard.writeText(orderDetails.orderId);
                  setAlert({
                    isOpen: true,
                    title: 'Copied!',
                    message: 'Order ID copied to clipboard',
                    type: 'success'
                  });
                }}
                className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
              >
                Copy Order ID
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Customer Information Form */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Shipping Information</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={customerInfo.firstName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent ${
                        validationErrors.firstName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      required
                    />
                    {validationErrors.firstName && (
                      <p className="mt-1 text-sm text-red-600">{validationErrors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={customerInfo.lastName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent ${
                        validationErrors.lastName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      required
                    />
                    {validationErrors.lastName && (
                      <p className="mt-1 text-sm text-red-600">{validationErrors.lastName}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={customerInfo.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent ${
                      validationErrors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  />
                  {validationErrors.email && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                    placeholder="10-digit mobile number"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent ${
                      validationErrors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    maxLength={10}
                    required
                  />
                  {validationErrors.phone && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address *
                  </label>
                  <textarea
                    name="address"
                    value={customerInfo.address}
                    onChange={handleInputChange}
                    rows={3}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent ${
                      validationErrors.address ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  />
                  {validationErrors.address && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.address}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={customerInfo.city}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent ${
                        validationErrors.city ? 'border-red-500' : 'border-gray-300'
                      }`}
                      required
                    />
                    {validationErrors.city && (
                      <p className="mt-1 text-sm text-red-600">{validationErrors.city}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={customerInfo.state}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent ${
                        validationErrors.state ? 'border-red-500' : 'border-gray-300'
                      }`}
                      required
                    />
                    {validationErrors.state && (
                      <p className="mt-1 text-sm text-red-600">{validationErrors.state}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={customerInfo.pincode}
                    onChange={handleInputChange}
                    placeholder="6-digit pincode"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent ${
                      validationErrors.pincode ? 'border-red-500' : 'border-gray-300'
                    }`}
                    maxLength={6}
                    required
                  />
                  {validationErrors.pincode && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.pincode}</p>
                  )}
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Payment Method *
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={customerInfo.paymentMethod === 'cod'}
                        onChange={handleInputChange}
                        className="mr-3"
                      />
                      <Truck className="w-5 h-5 mr-3 text-gray-600" />
                      <div>
                        <div className="font-medium">Cash on Delivery</div>
                        <div className="text-sm text-gray-500">Pay when you receive your order</div>
                      </div>
                    </label>
                    
                    <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 opacity-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="online"
                        checked={customerInfo.paymentMethod === 'online'}
                        onChange={handleInputChange}
                        className="mr-3"
                        disabled
                      />
                      <CreditCard className="w-5 h-5 mr-3 text-gray-600" />
                      <div>
                        <div className="font-medium">Online Payment</div>
                        <div className="text-sm text-gray-500">Coming Soon</div>
                      </div>
                    </label>
                  </div>
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h3>
              
              <div className="bg-gray-50 rounded-lg p-6">
                {/* Cart Items */}
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.product.name}</h4>
                        <p className="text-sm text-gray-600">Size: {item.size}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">GST (18%)</span>
                    <span className="font-medium">₹{tax.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>₹{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4" />
                  <span>Secure checkout protected by SSL encryption</span>
                </div>

                {/* Place Order Button */}
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || cartItems.length === 0}
                  className="w-full mt-6 bg-black text-white py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Processing Order...' : `Place Order - ₹${total.toLocaleString()}`}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Alert */}
        <CustomAlert
          isOpen={alert.isOpen}
          onClose={() => setAlert(prev => ({ ...prev, isOpen: false }))}
          title={alert.title}
          message={alert.message}
          type={alert.type}
        />
      </div>
    </div>
    
    {/* Success Modal */}
    <SuccessModal />
    </>
  );
};

export default CheckoutForm;