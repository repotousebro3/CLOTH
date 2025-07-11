import React from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const HappyCustomers = () => {
  const reviews = [
    {
      id: 1,
      rating: 5,
      title: 'love the shirt',
      review: 'material,colour was excellent',
      customerName: 'Sam',
      productName: 'Blue And Orange Checks Regular Fit Full Sleeves Shirt',
      date: '2025-07-07'
    },
    {
      id: 2,
      rating: 5,
      title: 'Fabric was excellent',
      review: 'love the colour and material',
      customerName: 'Sam',
      productName: 'Dark Sky Knitted Cord Shirt',
      date: '2025-07-07'
    },
    {
      id: 3,
      rating: 5,
      title: 'review',
      review: 'The quality is top notch and the size fits perfectly.',
      customerName: 'Siddartha',
      productName: 'Blue Corduroy Regular Fit Full Sleeves Shirt',
      date: '2025-07-07'
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-green-500 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Happy Customers</h2>
          <div className="w-16 h-1 bg-red-500 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Section - Overall Rating */}
          <div className="lg:col-span-1">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">OUR CUSTOMERS</h3>
              <p className="text-lg font-medium text-gray-600 mb-4">OUR INFLUENCERS —</p>
              
              <div className="flex items-center justify-center lg:justify-start space-x-2 mb-2">
                <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">4.77</span>
                <span className="text-gray-600">/5</span>
                <span className="text-gray-500 text-sm">based on 5866 reviews.</span>
              </div>
              
              <div className="flex justify-center lg:justify-start mb-6">
                {renderStars(5)}
              </div>
              
              <button className="border-2 border-red-500 text-red-500 px-6 py-2 rounded font-medium hover:bg-red-500 hover:text-white transition-colors duration-200 flex items-center space-x-2">
                <span>SEE MORE</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Right Section - Reviews */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white p-6 rounded-lg border border-gray-100">
                  <div className="flex items-center mb-3">
                    {renderStars(review.rating)}
                  </div>
                  
                  <h4 className="font-bold text-gray-900 mb-2">{review.title}</h4>
                  <p className="text-gray-700 mb-4 text-sm leading-relaxed">{review.review}</p>
                  
                  <div className="border-t pt-4">
                    <p className="font-bold text-gray-900 mb-1">{review.customerName}</p>
                    <p className="text-xs text-gray-500 mb-2">{review.productName}</p>
                    <p className="text-xs text-gray-400">{review.date}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Navigation Arrows */}
            <div className="flex justify-center space-x-4 mt-8">
              <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors duration-200">
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors duration-200">
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HappyCustomers;