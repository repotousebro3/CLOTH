import React from 'react';
import { navigateToPage } from '../utils/navigation';

const NewDealsSection = () => {
  const deals = [
    {
      id: 1,
      title: 'Summer Deal',
      subtitle: 'UP TO 60% OFF',
      price: '₹699',
      label: 'EVERYTHING UNDER',
      image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      buttonText: 'SHOP NOW'
    },
    {
      id: 2,
      title: 'hello',
      subtitle: 'SUMMER',
      description: 'MUST HAVE FOR HOT DAYS',
      image: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      buttonText: 'SHOP NOW'
    },
    {
      id: 3,
      title: 'Our',
      subtitle: 'EXPERTEES',
      description: 'HITTING EVERY VIBE',
      image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      buttonText: 'SHOP NOW'
    }
  ];

  const handleShopNowClick = () => {
    navigateToPage('new-arrivals');
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">New Deals, New Trends</h2>
          <div className="w-16 h-1 bg-red-500 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {deals.map((deal) => (
            <div
              key={deal.id}
              className="relative overflow-hidden rounded-lg group cursor-pointer"
            >
              <div className="aspect-[4/3] relative">
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                
                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-6">
                  {deal.label && (
                    <div className="bg-black text-white px-3 py-1 text-xs font-bold rounded mb-2">
                      {deal.label}
                    </div>
                  )}
                  {deal.price && (
                    <div className="text-4xl font-bold text-red-500 mb-4">
                      {deal.price}
                    </div>
                  )}
                  <h3 className="text-2xl lg:text-3xl font-bold mb-2">
                    {deal.title}
                  </h3>
                  <h4 className="text-3xl lg:text-4xl font-black mb-2">
                    {deal.subtitle}
                  </h4>
                  {deal.description && (
                    <p className="text-sm mb-4 text-center">
                      {deal.description}
                    </p>
                  )}
                  <button 
                    onClick={handleShopNowClick}
                    className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors duration-200 text-sm"
                  >
                    {deal.buttonText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewDealsSection;