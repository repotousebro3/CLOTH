import React from 'react';
import { X, Package, Palette, Ruler, Shirt, Info } from 'lucide-react';
import { Product } from '../types/Product';

interface ProductViewModalProps {
  product: Product;
  onClose: () => void;
}

const ProductViewModal: React.FC<ProductViewModalProps> = ({ product, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Product Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="space-y-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
              {product.images && product.images.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {product.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg border border-gray-200"
                    />
                  ))}
                </div>
              )}
            </div>
            
            {/* Product Information */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
                  {product.originalPrice && (
                    <>
                      <span className="text-lg text-gray-500 line-through">₹{product.originalPrice}</span>
                      {product.discount && (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                          {product.discount}
                        </span>
                      )}
                    </>
                  )}
                </div>
                <div className="flex items-center space-x-2 mb-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize ${
                    product.inStock
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                  {product.isNewArrival && (
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      New Arrival
                    </span>
                  )}
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800 capitalize">
                    {product.category.replace('-', ' ')}
                  </span>
                </div>
              </div>
              
              {product.description && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Description</h4>
                  <p className="text-gray-600">{product.description}</p>
                </div>
              )}
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Available Sizes */}
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Ruler className="w-5 h-5 text-gray-500" />
                    <h4 className="text-lg font-semibold text-gray-900">Available Sizes</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(size => (
                      <span
                        key={size}
                        className="px-3 py-1 bg-gray-100 text-gray-800 rounded-lg text-sm font-medium"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Available Colors */}
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Palette className="w-5 h-5 text-gray-500" />
                    <h4 className="text-lg font-semibold text-gray-900">Available Colors</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map(color => (
                      <span
                        key={color}
                        className="px-3 py-1 bg-gray-100 text-gray-800 rounded-lg text-sm font-medium"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Sleeve Type */}
              {product.sleeves && (
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Shirt className="w-5 h-5 text-gray-500" />
                    <h4 className="text-lg font-semibold text-gray-900">Sleeve Type</h4>
                  </div>
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-lg text-sm font-medium capitalize">
                    {product.sleeves.replace('-', ' ')}
                  </span>
                </div>
              )}

              {/* Specifications */}
              {product.specifications && (
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Info className="w-5 h-5 text-gray-500" />
                    <h4 className="text-lg font-semibold text-gray-900">Specifications</h4>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      {product.specifications.fit && (
                        <div>
                          <span className="font-medium text-gray-700">Fit:</span>
                          <span className="ml-2 text-gray-600">{product.specifications.fit}</span>
                        </div>
                      )}
                      {product.specifications.occasion && (
                        <div>
                          <span className="font-medium text-gray-700">Occasion:</span>
                          <span className="ml-2 text-gray-600">{product.specifications.occasion}</span>
                        </div>
                      )}
                      {product.specifications.fabric && (
                        <div>
                          <span className="font-medium text-gray-700">Fabric:</span>
                          <span className="ml-2 text-gray-600">{product.specifications.fabric}</span>
                        </div>
                      )}
                      {product.specifications.collar && (
                        <div>
                          <span className="font-medium text-gray-700">Collar:</span>
                          <span className="ml-2 text-gray-600">{product.specifications.collar}</span>
                        </div>
                      )}
                      {product.specifications.pattern && (
                        <div>
                          <span className="font-medium text-gray-700">Pattern:</span>
                          <span className="ml-2 text-gray-600">{product.specifications.pattern}</span>
                        </div>
                      )}
                      {product.specifications.care && (
                        <div>
                          <span className="font-medium text-gray-700">Care:</span>
                          <span className="ml-2 text-gray-600">{product.specifications.care}</span>
                        </div>
                      )}
                      {product.specifications.brand && (
                        <div>
                          <span className="font-medium text-gray-700">Brand:</span>
                          <span className="ml-2 text-gray-600">{product.specifications.brand}</span>
                        </div>
                      )}
                      {product.specifications.countryOfOrigin && (
                        <div>
                          <span className="font-medium text-gray-700">Country of Origin:</span>
                          <span className="ml-2 text-gray-600">{product.specifications.countryOfOrigin}</span>
                        </div>
                      )}
                      {product.specifications.manufacturer && (
                        <div>
                          <span className="font-medium text-gray-700">Manufacturer:</span>
                          <span className="ml-2 text-gray-600">{product.specifications.manufacturer}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Product Meta */}
              <div className="pt-4 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Product ID:</span>
                    <span className="ml-2 font-medium">{product._id}</span>
                  </div>
                  {product.createdAt && (
                    <div>
                      <span className="text-gray-500">Created:</span>
                      <span className="ml-2 font-medium">
                        {new Date(product.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductViewModal;