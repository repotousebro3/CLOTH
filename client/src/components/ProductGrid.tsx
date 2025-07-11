import React, { useState } from 'react';
import { Heart, Star } from 'lucide-react';
import { Product } from '../types/Product';

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-3 h-3 ${
          index < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const handleProductClick = (product: Product) => {
    window.location.hash = `#/product/${product._id}`;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="group cursor-pointer">
            <div 
              className="relative overflow-hidden rounded-lg bg-gray-100 aspect-[3/4]"
              onClick={() => handleProductClick(product)}
            >
              {/* New Arrival Badge */}
              {product.isNewArrival && (
                <div className="absolute top-3 left-3 z-10">
                  <span className="bg-red-600 text-white px-2 py-1 text-xs font-bold rounded">
                    NEW ARRIVAL
                  </span>
                </div>
              )}
              
              {/* Favorite Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(product._id!);
                }}
                className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors duration-200"
              >
                <Heart 
                  className={`w-4 h-4 ${
                    favorites.includes(product._id!) 
                      ? 'text-red-500 fill-current' 
                      : 'text-gray-600'
                  }`} 
                />
              </button>

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
            </div>
            
            <div className="mt-4" onClick={() => handleProductClick(product)}>
              {/* Rating */}
              {product.rating && (
                <div className="flex items-center space-x-1 mb-2">
                  <div className="flex items-center">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviews || 0})
                  </span>
                </div>
              )}
              
              <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2">
                {product.name}
              </h3>
              
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
  );
};

export default ProductGrid;