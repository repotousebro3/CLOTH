import React, { useState } from 'react';
import { Facebook, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log('Subscribing email:', email);
    setEmail('');
  };

  const companyLinks = [
    'About us',
    'Careers',
    'Press',
    'Blog',
    'Contact us'
  ];

  const helpLinks = [
    'Returns, Exchange & Refunds',
    'Size Guide',
    'Care Instructions',
    'Terms & Conditions',
    'Privacy Policy'
  ];

  const supportInfo = [
    'support@nikzone.in',
    '+91 9876543210',
    'Mon-Sat: 10AM-7PM',
    'Admin Login'
  ];

  const handleSupportClick = (info: string) => {
    if (info === 'Admin Login') {
      // Navigate to admin page
      window.location.hash = '#/admin';
      window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'admin' } }));
    }
  };

  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Newsletter Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Get Coupons & Offers</h3>
            <p className="text-gray-600 mb-6">
              You may unsubscribe at any moment. For that purpose, please find our contact 
              info in the legal notice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
              <button
                type="submit"
                onClick={handleSubscribe}
                className="bg-red-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-red-600 transition-colors duration-200"
              >
                SUBSCRIBE
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-3">* Don't worry we don't spam</p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company */}
            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-6">COMPANY</h4>
              <ul className="space-y-3">
                {companyLinks.map((link, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Need Help */}
            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-6">NEED HELP FROM NIKZONE</h4>
              <ul className="space-y-3">
                {helpLinks.map((link, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-6">SUPPORT</h4>
              <ul className="space-y-3">
                {supportInfo.map((info, index) => (
                  <li key={index}>
                    {info === 'Admin Login' ? (
                      <button
                        onClick={() => handleSupportClick(info)}
                        className="text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium text-left"
                      >
                        {info}
                      </button>
                    ) : (
                      <span className="text-gray-600">{info}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Registered Office */}
            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-6">REGISTERED OFFICE ADDRESS</h4>
              <div className="text-gray-600">
                <p className="mb-2">Nikzone Fashion Pvt Ltd</p>
                <p className="mb-2">123 Fashion Street</p>
                <p className="mb-2">Mumbai, Maharashtra 400001</p>
                <p className="mb-2">India</p>
                <p>GST: 27AABCN1234A1Z5</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Payment Methods and Social Media */}
          <div className="flex flex-col lg:flex-row justify-between items-center mb-8">
            {/* Payment Methods */}
            <div className="flex items-center space-x-4 mb-4 lg:mb-0">
              <span className="text-sm font-medium text-gray-900">100% Secure Payment</span>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-6 bg-red-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">MC</span>
                </div>
                <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">VISA</span>
                </div>
                <div className="w-10 h-6 bg-gradient-to-r from-blue-500 to-green-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">G</span>
                </div>
                <div className="w-12 h-6 bg-purple-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">UPI</span>
                </div>
                <div className="w-12 h-6 bg-green-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">COD</span>
                </div>
              </div>
            </div>
            
            {/* Social Media */}
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-900">Join The Power Squad</span>
              <div className="flex items-center space-x-2">
                <button className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center hover:bg-blue-700 transition-colors duration-200">
                  <Facebook className="w-4 h-4 text-white" />
                </button>
                <button className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-colors duration-200">
                  <Instagram className="w-4 h-4 text-white" />
                </button>
                <button className="w-8 h-8 bg-red-500 rounded flex items-center justify-center hover:bg-red-600 transition-colors duration-200">
                  <div className="w-3 h-3 bg-white rounded-sm flex items-center justify-center">
                    <span className="text-red-500 text-xs font-bold">P</span>
                  </div>
                </button>
                <button className="w-8 h-8 bg-red-600 rounded flex items-center justify-center hover:bg-red-700 transition-colors duration-200">
                  <Youtube className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="text-center">
            <div className="text-gray-600 text-sm">
              © 2025 www.powerlook.in. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;