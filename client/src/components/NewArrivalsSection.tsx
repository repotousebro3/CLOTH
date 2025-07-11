import React from 'react';
import { Heart } from 'lucide-react';
import { useProducts } from '../contexts/ProductContext';

const NewArrivalsSection = () => {
  const { products } = useProducts();
  
  // Filter products to only show new arrivals
  const newArrivalProducts = products.filter(product => product.isNewArrival);

  const handleProductClick = (product: any) => {
    window.location.hash = `#/product/${product._id}`;
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">New Arrivals</h2>
          <div className="w-16 h-1 bg-red-500 mx-auto"></div>
        </div>
        
        {newArrivalProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No new arrivals at the moment.</p>
            <p className="text-gray-400 text-sm mt-2">Check back soon for the latest additions!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {newArrivalProducts.slice(0, 8).map((product) => (
              <div
                key={product._id}
                className="group cursor-pointer"
                onClick={() => handleProductClick(product)}
              >
                <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-[3/4]">
                  {/* New Arrival Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-red-600 text-white px-2 py-1 text-xs font-bold rounded">
                      NEW ARRIVAL
                    </span>
                  </div>
                  
                  <button className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors duration-200">
                    <Heart className="w-4 h-4 text-gray-600" />
                  </button>

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                </div>
                
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2">{product.name}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
                    {product.originalPrice && (
                      <>
                        <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                        {product.discount && (
                          <span className="text-sm text-green-600 font-medium">{product.discount}</span>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {newArrivalProducts.length > 8 && (
          <div className="text-center mt-8">
            <button 
              onClick={() => {
                window.location.hash = '#/new-arrivals';
                window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'new-arrivals' } }));
              }}
              className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors duration-200"
            >
              View All New Arrivals ({newArrivalProducts.length})
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewArrivalsSection;