import React from 'react';
import { navigateToPage } from '../utils/navigation';

const CategoryCollections = () => {
  const categories = [
    {
      id: 1,
      title: 'T-SHIRTS',
      image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      page: 't-shirts'
    },
    {
      id: 2,
      title: 'SHIRTS',
      image: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      page: 'shirts'
    },
    {
      id: 3,
      title: 'BOTTOMS',
      image: 'https://images.pexels.com/photos/2043590/pexels-photo-2043590.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      page: 'bottoms'
    },
    {
      id: 4,
      title: 'JACKETS',
      image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      page: 'jackets'
    },
    {
      id: 5,
      title: 'JEANS & CARGO',
      image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      page: 'bottoms'
    },
    {
      id: 6,
      title: 'SUPER DEALS',
      image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      page: 'new-arrivals',
      isSpecial: true,
      price: '₹699'
    }
  ];

  const handleCategoryClick = (page: string) => {
    navigateToPage(page);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Category Collections</h2>
          <div className="w-16 h-1 bg-red-500 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.page)}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-square">
                {category.isSpecial && (
                  <div className="absolute top-3 left-3 z-10">
                    <div className="bg-black text-white px-3 py-1 text-xs font-bold rounded">
                      EVERYTHING UNDER
                    </div>
                    <div className="bg-red-600 text-white px-2 py-1 text-2xl font-bold rounded mt-1">
                      {category.price}
                    </div>
                  </div>
                )}
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-sm font-bold text-gray-900 tracking-wide">{category.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCollections;