import React, { useState } from 'react';
import { useProducts } from '../contexts/ProductContext';
import { Upload, X, Plus, Image as ImageIcon } from 'lucide-react';
import { Product, ProductSpecifications } from '../types/Product';
import CustomAlert from './CustomAlert';

const ProductForm = () => {
  const { addProduct, loading } = useProducts();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    originalPrice: '',
    category: 'shirts' as Product['category'],
    description: '',
    image: '',
    images: [] as string[],
    sizes: [] as string[],
    colors: [] as string[],
    sleeves: 'full-sleeves' as 'full-sleeves' | 'half-sleeves',
    isNewArrival: false,
    inStock: true,
    specifications: {
      fit: '',
      occasion: '',
      fabric: '',
      collar: '',
      pattern: '',
      care: '',
      weight: '',
      transparency: '',
      stretchability: '',
      lining: '',
      closure: '',
      pockets: '',
      hemline: '',
      neckline: '',
      waistline: '',
      length: '',
      rise: '',
      leg: '',
      wash: '',
      brand: 'NIKZONE',
      countryOfOrigin: 'India',
      manufacturer: 'Nikzone Fashion Pvt Ltd',
      marketedBy: 'Nikzone Fashion Pvt Ltd',
      importedBy: '',
      packedBy: 'Nikzone Fashion Pvt Ltd'
    } as ProductSpecifications
  });

  const [newSize, setNewSize] = useState('');
  const [newColor, setNewColor] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [success, setSuccess] = useState(false);
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

  const categories = [
    { value: 't-shirts', label: 'T-Shirts' },
    { value: 'shirts', label: 'Shirts' },
    { value: 'bottoms', label: 'Bottoms' },
    { value: 'jackets', label: 'Jackets' },
    { value: 'accessories', label: 'Accessories' }
  ];

  const commonSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '2XL', '3XL', '4XL', '5XL', '28', '30', '32', '34', '36', '38', '40', '42'];
  const commonColors = [
    'Black', 'White', 'Blue', 'Navy Blue', 'Light Blue', 'Red', 'Green', 'Yellow', 
    'Orange', 'Purple', 'Pink', 'Brown', 'Grey', 'Beige', 'Maroon', 'Teal', 'Olive', 
    'Lime', 'Aqua', 'Silver', 'Navy', 'Fuchsia', 'Coral', 'Indigo'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSpecificationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [name]: value
      }
    }));
  };

  const addSize = (size: string) => {
    if (size && !formData.sizes.includes(size)) {
      setFormData(prev => ({
        ...prev,
        sizes: [...prev.sizes, size]
      }));
    }
    setNewSize('');
  };

  const removeSize = (size: string) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.filter(s => s !== size)
    }));
  };

  const addColor = (color: string) => {
    if (color && !formData.colors.includes(color)) {
      setFormData(prev => ({
        ...prev,
        colors: [...prev.colors, color]
      }));
    }
    setNewColor('');
  };

  const removeColor = (color: string) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.filter(c => c !== color)
    }));
  };

  const addImage = (imageUrl: string) => {
    if (imageUrl && !formData.images.includes(imageUrl)) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, imageUrl]
      }));
    }
    setNewImageUrl('');
  };

  const removeImage = (imageUrl: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(img => img !== imageUrl)
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real application, you would upload this to a cloud service
      // For now, we'll create a placeholder URL
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        if (!formData.image) {
          setFormData(prev => ({ ...prev, image: imageUrl }));
        } else {
          addImage(imageUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.image || formData.sizes.length === 0 || formData.colors.length === 0) {
      setAlert({
        isOpen: true,
        title: 'Missing Information',
        message: 'Please fill in all required fields including name, price, image, sizes, and colors.',
        type: 'warning'
      });
      return;
    }

    const productData: Omit<Product, '_id'> = {
      name: formData.name,
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
      discount: formData.originalPrice ? `${Math.round((1 - parseFloat(formData.price) / parseFloat(formData.originalPrice)) * 100)}% OFF` : undefined,
      category: formData.category,
      description: formData.description,
      image: formData.image,
      images: formData.images,
      sizes: formData.sizes,
      colors: formData.colors,
      sleeves: formData.sleeves,
      isNewArrival: formData.isNewArrival,
      inStock: formData.inStock,
      specifications: formData.specifications
    };

    try {
      await addProduct(productData);
      setSuccess(true);
      
      // Reset form
      setFormData({
        name: '',
        price: '',
        originalPrice: '',
        category: 'shirts',
        description: '',
        image: '',
        images: [],
        sizes: [],
        colors: [],
        sleeves: 'full-sleeves',
        isNewArrival: false,
        inStock: true,
        specifications: {
          fit: '',
          occasion: '',
          fabric: '',
          collar: '',
          pattern: '',
          care: '',
          weight: '',
          transparency: '',
          stretchability: '',
          lining: '',
          closure: '',
          pockets: '',
          hemline: '',
          neckline: '',
          waistline: '',
          length: '',
          rise: '',
          leg: '',
          wash: '',
          brand: 'NIKZONE',
          countryOfOrigin: 'India',
          manufacturer: 'Nikzone Fashion Pvt Ltd',
          marketedBy: 'Nikzone Fashion Pvt Ltd',
          importedBy: '',
          packedBy: 'Nikzone Fashion Pvt Ltd'
        }
      });

      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error adding product:', error);
      setAlert({
        isOpen: true,
        title: 'Error',
        message: 'Error adding product. Please try again.',
        type: 'error'
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      {success && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-800">Product added successfully!</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                required
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (₹) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Original Price (₹)
              </label>
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sleeves
              </label>
              <select
                name="sleeves"
                value={formData.sleeves}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              >
                <option value="full-sleeves">Full Sleeves</option>
                <option value="half-sleeves">Half Sleeves</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
        </div>

        {/* Images Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Images</h3>
          
          {/* Main Image */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Main Image *
            </label>
            <div className="space-y-3">
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="https://example.com/image.jpg"
                required
              />
              <div className="text-center">
                <span className="text-sm text-gray-500">OR</span>
              </div>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-4 text-gray-500" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> main image
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 5MB)</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Additional Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Images
            </label>
            <div className="flex items-center space-x-2 mb-3">
              <input
                type="url"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="Additional image URL"
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
              />
              <button
                type="button"
                onClick={() => addImage(newImageUrl)}
                className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center space-x-1"
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {formData.images.map((imageUrl, index) => (
                <div key={index} className="relative group">
                  <img
                    src={imageUrl}
                    alt={`Additional ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(imageUrl)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fit</label>
              <select
                name="fit"
                value={formData.specifications.fit}
                onChange={handleSpecificationChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
              >
                <option value="">Select Fit</option>
                <option value="Regular Fit">Regular Fit</option>
                <option value="Slim Fit">Slim Fit</option>
                <option value="Relaxed Fit">Relaxed Fit</option>
                <option value="Oversized">Oversized</option>
                <option value="Tailored Fit">Tailored Fit</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Occasion</label>
              <select
                name="occasion"
                value={formData.specifications.occasion}
                onChange={handleSpecificationChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
              >
                <option value="">Select Occasion</option>
                <option value="Casual">Casual</option>
                <option value="Formal">Formal</option>
                <option value="Semi-Formal">Semi-Formal</option>
                <option value="Party">Party</option>
                <option value="Sports">Sports</option>
                <option value="Travel">Travel</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fabric</label>
              <input
                type="text"
                name="fabric"
                value={formData.specifications.fabric}
                onChange={handleSpecificationChange}
                placeholder="e.g., 100% Cotton"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Collar</label>
              <select
                name="collar"
                value={formData.specifications.collar}
                onChange={handleSpecificationChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
              >
                <option value="">Select Collar</option>
                <option value="Spread Collar">Spread Collar</option>
                <option value="Button Down">Button Down</option>
                <option value="Mandarin Collar">Mandarin Collar</option>
                <option value="Round Neck">Round Neck</option>
                <option value="V-Neck">V-Neck</option>
                <option value="Crew Neck">Crew Neck</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pattern</label>
              <select
                name="pattern"
                value={formData.specifications.pattern}
                onChange={handleSpecificationChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
              >
                <option value="">Select Pattern</option>
                <option value="Solid">Solid</option>
                <option value="Striped">Striped</option>
                <option value="Checked">Checked</option>
                <option value="Printed">Printed</option>
                <option value="Embroidered">Embroidered</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Care Instructions</label>
              <input
                type="text"
                name="care"
                value={formData.specifications.care}
                onChange={handleSpecificationChange}
                placeholder="e.g., Machine Wash"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
              <input
                type="text"
                name="brand"
                value={formData.specifications.brand}
                onChange={handleSpecificationChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country of Origin</label>
              <input
                type="text"
                name="countryOfOrigin"
                value={formData.specifications.countryOfOrigin}
                onChange={handleSpecificationChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Manufacturer</label>
              <input
                type="text"
                name="manufacturer"
                value={formData.specifications.manufacturer}
                onChange={handleSpecificationChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>
          </div>
        </div>

        {/* Sizes */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Sizes *</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            {commonSizes.map(size => (
              <button
                key={size}
                type="button"
                onClick={() => addSize(size)}
                className={`px-3 py-1 text-sm border rounded-lg transition-colors duration-200 ${
                  formData.sizes.includes(size)
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-black'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newSize}
              onChange={(e) => setNewSize(e.target.value)}
              placeholder="Custom size"
              className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
            />
            <button
              type="button"
              onClick={() => addSize(newSize)}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.sizes.map(size => (
              <span
                key={size}
                className="inline-flex items-center px-2 py-1 text-xs bg-black text-white rounded-full"
              >
                {size}
                <button
                  type="button"
                  onClick={() => removeSize(size)}
                  className="ml-1 hover:text-gray-300"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Colors *</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            {commonColors.map(color => (
              <button
                key={color}
                type="button"
                onClick={() => addColor(color)}
                className={`px-3 py-1 text-sm border rounded-lg transition-colors duration-200 ${
                  formData.colors.includes(color)
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-black'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newColor}
              onChange={(e) => setNewColor(e.target.value)}
              placeholder="Custom color"
              className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
            />
            <button
              type="button"
              onClick={() => addColor(newColor)}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.colors.map(color => (
              <span
                key={color}
                className="inline-flex items-center px-2 py-1 text-xs bg-black text-white rounded-full"
              >
                {color}
                <button
                  type="button"
                  onClick={() => removeColor(color)}
                  className="ml-1 hover:text-gray-300"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isNewArrival"
              checked={formData.isNewArrival}
              onChange={handleInputChange}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">Mark as New Arrival</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              name="inStock"
              checked={formData.inStock}
              onChange={handleInputChange}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">In Stock</span>
          </label>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Adding Product...' : 'Add Product'}
          </button>
        </div>
      </form>
      
      <CustomAlert
        isOpen={alert.isOpen}
        onClose={() => setAlert(prev => ({ ...prev, isOpen: false }))}
        title={alert.title}
        message={alert.message}
        type={alert.type}
      />
    </div>
  );
};

export default ProductForm;