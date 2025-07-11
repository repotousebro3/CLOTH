import React, { useState } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import PriceRangeSlider from './PriceRangeSlider';

interface FilterOptions {
  colors: string[];
  sizes: string[];
  sleeves: string[];
  priceRanges: {
    min: number;
    max: number;
    label: string;
  }[];
  minPrice: number;
  maxPrice: number;
}

interface ProductFilterProps {
  filterOptions: FilterOptions;
  selectedColors: string[];
  selectedSizes: string[];
  selectedSleeves: string[];
  selectedPriceRanges: string[];
  priceRange: [number, number];
  onColorToggle: (color: string) => void;
  onSizeToggle: (size: string) => void;
  onSleevesToggle: (sleeve: string) => void;
  onPriceRangeToggle: (range: string) => void;
  onPriceRangeChange: (range: [number, number]) => void;
  onRemoveFilter: (type: string, value: string) => void;
  onResetFilters: () => void;
  showSleeves?: boolean;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  filterOptions,
  selectedColors,
  selectedSizes,
  selectedSleeves,
  selectedPriceRanges,
  priceRange,
  onColorToggle,
  onSizeToggle,
  onSleevesToggle,
  onPriceRangeToggle,
  onPriceRangeChange,
  onRemoveFilter,
  onResetFilters,
  showSleeves = true
}) => {
  const [showAllColors, setShowAllColors] = useState(false);

  // All available colors (7 shown by default, +15 more)
  const allColors = ['Brown', 'Blue', 'Navy Blue', 'Light Blue', 'Black', 'Orange', 'Yellow',
    'Red', 'Green', 'Purple', 'Pink', 'Gray', 'Maroon', 'Teal', 'Olive',
    'Lime', 'Aqua', 'Silver', 'Navy', 'Fuchsia', 'Coral', 'Indigo', 'White'];

  const displayColors = showAllColors ? allColors : allColors.slice(0, 7);

  // Toggle showing all colors
  const toggleShowAllColors = () => {
    setShowAllColors(!showAllColors);
  };

  // Helper function to get color hex values
  const getColorHex = (color: string): string => {
    const colorMap: Record<string, string> = {
      'Brown': '#964B00',
      'Blue': '#0000FF',
      'Navy Blue': '#000080',
      'Light Blue': '#ADD8E6',
      'Black': '#000000',
      'Orange': '#FFA500',
      'Yellow': '#FFFF00',
      'White': '#FFFFFF',
      'Red': '#FF0000',
      'Green': '#008000',
      'Purple': '#800080',
      'Pink': '#FFC0CB',
      'Gray': '#808080',
      'Maroon': '#800000',
      'Teal': '#008080',
      'Olive': '#808000',
      'Lime': '#00FF00',
      'Aqua': '#00FFFF',
      'Silver': '#C0C0C0',
      'Navy': '#000080',
      'Fuchsia': '#FF00FF',
      'Coral': '#FF7F50',
      'Indigo': '#4B0082'
    };
    return colorMap[color] || '#CCCCCC';
  };

  return (
    <div className="w-full md:w-64 flex-shrink-0">
      <div className="bg-gray-50 p-4 rounded-lg sticky top-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">FILTERS</h2>
          <button
            onClick={onResetFilters}
            className="text-sm text-red-600 hover:text-red-800 font-bold"
          >
            RESET
          </button>
        </div>

        {/* Color Filter with checkboxes and color swatches */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">COLOR</h3>
          <div className="space-y-2">
            {displayColors.map(color => (
              <div key={color} className="flex items-center">
                <input
                  type="checkbox"
                  id={`color-${color}`}
                  checked={selectedColors.includes(color)}
                  onChange={() => onColorToggle(color)}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <div className="flex items-center ml-2">
                  <span
                    className="w-4 h-4 rounded-full border border-gray-300 mr-2"
                    style={{ backgroundColor: getColorHex(color) }}
                  />
                  <label htmlFor={`color-${color}`} className="text-sm text-gray-700">
                    {color}
                  </label>
                </div>
              </div>
            ))}
          </div>
          {allColors.length > 7 && (
            <button
              onClick={toggleShowAllColors}
              className="text-sm text-blue-600 hover:text-blue-800 mt-2 flex items-center"
            >
              {showAllColors ? (
                <>
                  <ChevronUp size={16} className="mr-1" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown size={16} className="mr-1" />
                  +{allColors.length - 7} more
                </>
              )}
            </button>
          )}
        </div>

        {/* Size Filter */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">SIZE</h3>
          <div className="flex flex-wrap gap-2">
            {filterOptions.sizes.map(size => (
              <button
                key={size}
                onClick={() => onSizeToggle(size)}
                className={`px-3 py-1 text-sm border rounded-md ${selectedSizes.includes(size) ? 'bg-black text-white border-black' : 'bg-white text-gray-700 border-gray-300'}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Sleeves Filter */}
        {showSleeves && (
          <div className="mb-6">
            <h3 className="font-medium mb-2">SLEEVES</h3>
            <div className="space-y-1">
              {filterOptions.sleeves.map(sleeveType => (
                <div key={sleeveType} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`sleeves-${sleeveType}`}
                    checked={selectedSleeves.includes(sleeveType)}
                    onChange={() => onSleevesToggle(sleeveType)}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor={`sleeves-${sleeveType}`} className="ml-2 text-sm text-gray-700">
                    {sleeveType}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Price Filter with Slider */}
        <div className="mb-6">
          <h3 className="font-medium mb-3">PRICE RANGE</h3>
          
          {/* Price Range Slider */}
          <PriceRangeSlider
            min={filterOptions.minPrice}
            max={filterOptions.maxPrice}
            value={priceRange}
            onChange={onPriceRangeChange}
            step={Math.max(10, Math.floor((filterOptions.maxPrice - filterOptions.minPrice) / 10))}
          />
          
          {/* Predefined Price Ranges */}
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Quick Select</h4>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {filterOptions.priceRanges.map(range => (
                <div key={range.label} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`price-${range.label}`}
                    checked={selectedPriceRanges.includes(range.label)}
                    onChange={() => onPriceRangeToggle(range.label)}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor={`price-${range.label}`} className="ml-2 text-sm text-gray-700">
                    {range.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;