import React, { useState, useEffect } from 'react';
import { X, Heart, ShoppingBag, Star, ChevronLeft, ChevronRight, Plus, Minus } from 'lucide-react';
import { Product } from '../types/Product';
import { useProducts } from '../contexts/ProductContext';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { products } = useProducts();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('specifications');

  // Use product images if available, otherwise generate some sample images
  const productImages = product.images && product.images.length > 0 
    ? [product.image, ...product.images]
    : [
        product.image,
        'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
        'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
        'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
        'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop'
      ];

  // Get similar products from the same category
  const similarProducts = products
    .filter(p => p.category === product.category && p._id !== product._id)
    .slice(0, 12);

  // All available sizes for this category
  const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '2XL', '3XL'];
  
  const handlePrevImage = () => {
    setSelectedImageIndex(prev => 
      prev === 0 ? productImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex(prev => 
      prev === productImages.length - 1 ? 0 : prev + 1
    );
  };

  const handleQuantityChange = (change: number) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-7xl w-full max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Home</span>
            <ChevronRight className="w-4 h-4" />
            <span className="capitalize">{product.category.replace('-', ' ')}</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">{product.name}</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-[4/5] bg-gray-100 rounded-lg overflow-hidden">
                {product.isNewArrival && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-black text-white px-3 py-1 text-sm font-bold rounded">
                      NEW ARRIVAL
                    </span>
                  </div>
                )}
                <img
                  src={productImages[selectedImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              
              {/* Thumbnail Images */}
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-24 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      selectedImageIndex === index
                        ? 'border-black'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Information */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <p className="text-gray-600 mb-4">SKU: {product._id}</p>
                
                {/* Rating */}
                {product.rating && (
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex items-center">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-sm text-gray-600">
                      {product.rating} ({product.reviews || 0} reviews)
                    </span>
                  </div>
                )}
                
                {/* Price */}
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
                  {product.originalPrice && (
                    <>
                      <span className="text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
                      {product.discount && (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                          {product.discount}
                        </span>
                      )}
                    </>
                  )}
                </div>
                
                <p className="text-green-600 text-sm font-medium mb-6">Inclusive of all taxes</p>
                
                {/* Offer */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold text-sm">%</span>
                    </div>
                    <div>
                      <p className="text-green-800 font-medium">Get this for ₹{Math.round(product.price * 0.85)}</p>
                      <p className="text-green-600 text-sm">Buy 2 and get Rs 200 Off*</p>
                      <p className="text-green-600 text-xs">Code: B2G200</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Size Selection */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">Select Size</h3>
                  <button className="text-red-500 text-sm font-medium hover:underline">
                    Size Chart
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {allSizes.map(size => {
                    const isAvailable = product.sizes.includes(size);
                    return (
                      <button
                        key={size}
                        onClick={() => isAvailable && setSelectedSize(size)}
                        disabled={!isAvailable}
                        className={`py-3 px-4 border rounded-lg text-center font-medium transition-all duration-200 ${
                          !isAvailable
                            ? 'border-gray-200 text-gray-400 line-through cursor-not-allowed bg-gray-50'
                            : selectedSize === size
                            ? 'border-black bg-black text-white'
                            : 'border-gray-300 text-gray-700 hover:border-black'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
              
              {/* Quantity */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Quantity</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="p-2 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 font-medium">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="p-2 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="space-y-3">
                <button className="w-full bg-black text-white py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center space-x-2">
                  <ShoppingBag className="w-5 h-5" />
                  <span>ADD TO BAG</span>
                </button>
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`w-full border-2 py-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2 ${
                    isFavorite
                      ? 'border-red-500 text-red-500 bg-red-50'
                      : 'border-gray-300 text-gray-700 hover:border-black'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                  <span>{isFavorite ? 'ADDED TO WISHLIST' : 'ADD TO WISHLIST'}</span>
                </button>
              </div>
              
              {/* Model Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  The model (Height 5'11") is wearing a size M
                </p>
              </div>
              
              {/* Delivery Options */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Delivery Options</h3>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Enter Pincode"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                  <button className="bg-red-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-600 transition-colors duration-200">
                    CHECK
                  </button>
                </div>
                <div className="mt-3 space-y-1 text-sm text-gray-600">
                  <p>Please enter the PIN code to check cash/card delivery available.</p>
                  <p>Return and Exchange will be available for 7 days from the date of order delivery.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Product Details Tabs */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">More Details</h2>
            
            <div className="border border-gray-200 rounded-lg">
              <div className="border-b border-gray-200">
                <button
                  onClick={() => setActiveTab(activeTab === 'specifications' ? '' : 'specifications')}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors duration-200"
                >
                  <div>
                    <h3 className="font-semibold text-gray-900">Specifications</h3>
                    <p className="text-sm text-gray-600">Technical details and features</p>
                  </div>
                  <ChevronRight className={`w-5 h-5 transition-transform duration-200 ${
                    activeTab === 'specifications' ? 'rotate-90' : ''
                  }`} />
                </button>
                {activeTab === 'specifications' && (
                  <div className="px-4 pb-4">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Fit</h4>
                        <p className="text-gray-700">{product.specifications?.fit || 'Regular Fit'}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Occasion</h4>
                        <p className="text-gray-700">{product.specifications?.occasion || 'Casual'}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Sleeves</h4>
                        <p className="text-gray-700 capitalize">{product.sleeves?.replace('-', ' ') || 'Half Sleeves'}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Collar</h4>
                        <p className="text-gray-700">{product.specifications?.collar || 'Round Neck'}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Fabric</h4>
                        <p className="text-gray-700">{product.specifications?.fabric || '100% Cotton'}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Colors</h4>
                        <p className="text-gray-700">{product.colors.join(', ')}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="border-b border-gray-200">
                <button
                  onClick={() => setActiveTab(activeTab === 'description' ? '' : 'description')}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors duration-200"
                >
                  <div>
                    <h3 className="font-semibold text-gray-900">Description</h3>
                    <p className="text-sm text-gray-600">Product overview</p>
                  </div>
                  <ChevronRight className={`w-5 h-5 transition-transform duration-200 ${
                    activeTab === 'description' ? 'rotate-90' : ''
                  }`} />
                </button>
                {activeTab === 'description' && (
                  <div className="px-4 pb-4">
                    <p className="text-gray-700">{product.description || 'No description available.'}</p>
                  </div>
                )}
              </div>
              
              <div className="border-b border-gray-200">
                <button
                  onClick={() => setActiveTab(activeTab === 'return' ? '' : 'return')}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors duration-200"
                >
                  <div>
                    <h3 className="font-semibold text-gray-900">Return & refund policy</h3>
                    <p className="text-sm text-gray-600">Return and refund policies</p>
                  </div>
                  <ChevronRight className={`w-5 h-5 transition-transform duration-200 ${
                    activeTab === 'return' ? 'rotate-90' : ''
                  }`} />
                </button>
                {activeTab === 'return' && (
                  <div className="px-4 pb-4">
                    <div className="space-y-3 text-sm text-gray-700">
                      <p>• Easy returns within 7 days of delivery</p>
                      <p>• Free return pickup available</p>
                      <p>• Refund will be processed within 5-7 business days</p>
                      <p>• Items should be in original condition with tags</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div>
                <button
                  onClick={() => setActiveTab(activeTab === 'manufacturer' ? '' : 'manufacturer')}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors duration-200"
                >
                  <div>
                    <h3 className="font-semibold text-gray-900">Manufactured By</h3>
                    <p className="text-sm text-gray-600">Company and Manufacturer Information</p>
                  </div>
                  <ChevronRight className={`w-5 h-5 transition-transform duration-200 ${
                    activeTab === 'manufacturer' ? 'rotate-90' : ''
                  }`} />
                </button>
                {activeTab === 'manufacturer' && (
                  <div className="px-4 pb-4">
                    <div className="space-y-2 text-sm text-gray-700">
                      <p><span className="font-medium">Brand:</span> {product.specifications?.brand || 'NIKZONE'}</p>
                      <p><span className="font-medium">Manufacturer:</span> {product.specifications?.manufacturer || 'Nikzone Fashion Pvt Ltd'}</p>
                      <p><span className="font-medium">Country of Origin:</span> {product.specifications?.countryOfOrigin || 'India'}</p>
                      <p><span className="font-medium">Marketed By:</span> {product.specifications?.marketedBy || 'Nikzone Fashion Pvt Ltd'}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Similar Products */}
          {similarProducts.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Similar Products</h2>
              <div className="border-b-2 border-red-500 w-16 mx-auto mb-8"></div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                {similarProducts.map(similarProduct => (
                  <div key={similarProduct._id} className="group cursor-pointer">
                    <div className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden mb-3">
                      {similarProduct.isNewArrival && (
                        <div className="absolute top-2 left-2 z-10">
                          <span className="bg-black text-white px-2 py-1 text-xs font-bold rounded">
                            NEW ARRIVAL
                          </span>
                        </div>
                      )}
                      <button className="absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors duration-200">
                        <Heart className="w-4 h-4 text-gray-600" />
                      </button>
                      <img
                        src={similarProduct.image}
                        alt={similarProduct.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="font-medium text-sm text-gray-900 mb-1 line-clamp-2">
                      {similarProduct.name}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-gray-900">₹{similarProduct.price}</span>
                      {similarProduct.originalPrice && (
                        <>
                          <span className="text-xs text-gray-500 line-through">₹{similarProduct.originalPrice}</span>
                          {similarProduct.discount && (
                            <span className="text-xs text-green-600">{similarProduct.discount}</span>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;