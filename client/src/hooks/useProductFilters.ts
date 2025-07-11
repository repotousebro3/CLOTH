import { useState, useEffect, useMemo, useCallback } from 'react';
import { Product } from '../types/Product';

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

interface UseProductFiltersProps {
  products: Product[];
}

export const useProductFilters = ({ products }: UseProductFiltersProps) => {
  // Basic filter states
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedSleeves, setSelectedSleeves] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>('default');
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  // Calculate min/max prices - stable memoization
  const priceInfo = useMemo(() => {
    if (products.length === 0) {
      return { minPrice: 0, maxPrice: 10000 };
    }
    const prices = products.map(p => p.price);
    return {
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices)
    };
  }, [products]);

  // Price range state with stable initialization
  const [priceRange, setPriceRange] = useState<[number, number]>([priceInfo.minPrice, priceInfo.maxPrice]);

  // Update price range when products change
  useEffect(() => {
    setPriceRange([priceInfo.minPrice, priceInfo.maxPrice]);
  }, [priceInfo.minPrice, priceInfo.maxPrice]);

  // Generate price ranges - stable memoization
  const priceRanges = useMemo(() => {
    const ranges = [];
    const { minPrice, maxPrice } = priceInfo;
    
    if (minPrice < 500) {
      ranges.push({ min: 0, max: 499, label: '₹0 - ₹499' });
    }
    if (maxPrice >= 500) {
      ranges.push({ min: 500, max: 999, label: '₹500 - ₹999' });
    }
    if (maxPrice >= 1000) {
      ranges.push({ min: 1000, max: 1999, label: '₹1000 - ₹1999' });
    }
    if (maxPrice >= 2000) {
      ranges.push({ min: 2000, max: 2999, label: '₹2000 - ₹2999' });
    }
    if (maxPrice >= 3000) {
      ranges.push({ min: 3000, max: 4999, label: '₹3000 - ₹4999' });
    }
    if (maxPrice >= 5000) {
      ranges.push({ min: 5000, max: 7999, label: '₹5000 - ₹7999' });
    }
    if (maxPrice >= 8000) {
      ranges.push({ min: 8000, max: 14999, label: '₹8000 - ₹14999' });
    }
    if (maxPrice >= 15000) {
      ranges.push({ min: 15000, max: 24999, label: '₹15000 - ₹24999' });
    }
    if (maxPrice >= 25000) {
      ranges.push({ min: 25000, max: 49999, label: '₹25000 - ₹49999' });
    }
    
    const highestRangeStart = Math.max(5000, Math.ceil(maxPrice / 5000) * 5000);
    if (maxPrice >= 5000) {
      ranges.push({ 
        min: highestRangeStart, 
        max: Infinity, 
        label: `₹${highestRangeStart.toLocaleString()} & Above` 
      });
    }
    
    return ranges;
  }, [priceInfo]);

  const dynamicStep = useMemo(() => {
    const range = priceInfo.maxPrice - priceInfo.minPrice;
    if (range <= 200) return 10; // For small ranges like 699-799
    if (range <= 500) return 25;
    if (range <= 1000) return 50;
    return Math.max(50, Math.floor(range / 20));
  }, [priceInfo.minPrice, priceInfo.maxPrice]);

  // Filter options - stable object
  const filterOptions: FilterOptions = useMemo(() => ({
    colors: ['Brown', 'Blue', 'Navy Blue', 'Light Blue', 'Black', 'Orange', 'Yellow',
      'Red', 'Green', 'Purple', 'Pink', 'Gray', 'Maroon', 'Teal', 'Olive',
      'Lime', 'Aqua', 'Silver', 'Navy', 'Fuchsia', 'Coral', 'Indigo', 'White'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL', '28', '30', '32', '34', '36', '38', '40', '42'],
    sleeves: ['Full Sleeves', 'Half Sleeves', 'Sleeveless'],
    priceRanges,
    minPrice: priceInfo.minPrice,
    maxPrice: priceInfo.maxPrice
  }), [priceRanges, priceInfo.minPrice, priceInfo.maxPrice]);

  // Apply filters and sorting - memoized computation
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Color filter
    if (selectedColors.length > 0) {
      result = result.filter(product => 
        product.colors.some(color => selectedColors.includes(color))
      );
    }

    // Size filter
    if (selectedSizes.length > 0) {
      result = result.filter(product =>
        product.sizes.some(size => selectedSizes.includes(size))
      );
    }

    // Sleeves filter
    if (selectedSleeves.length > 0) {
      result = result.filter(product => {
        const sleeveMap: { [key: string]: string } = {
          'Full Sleeves': 'full-sleeves',
          'Half Sleeves': 'half-sleeves',
          'Sleeveless': 'sleeveless'
        };
        return selectedSleeves.some(sleeve => 
          product.sleeves === sleeveMap[sleeve]
        );
      });
    }

    // Price range filter (slider) - only apply if range is different from min/max
    const isCustomRange = priceRange[0] !== priceInfo.minPrice || priceRange[1] !== priceInfo.maxPrice;
    if (isCustomRange) {
      result = result.filter(product => 
        product.price >= priceRange[0] && product.price <= priceRange[1]
      );
    }

    // Price range filter (predefined ranges)
    if (selectedPriceRanges.length > 0) {
      result = result.filter(product => {
        return selectedPriceRanges.some(rangeLabel => {
          const range = priceRanges.find(r => r.label === rangeLabel);
          if (!range) return false;
          
          if (range.max === Infinity) {
            return product.price >= range.min;
          }
          return product.price >= range.min && product.price <= range.max;
        });
      });
    }

    // Sorting
    switch(sortOption) {
      case 'price-low-high':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => (b._id || '').localeCompare(a._id || ''));
        break;
      default:
        break;
    }

    return result;
  }, [
    products,
    selectedColors,
    selectedSizes,
    selectedSleeves,
    selectedPriceRanges,
    priceRange,
    sortOption,
    priceRanges,
    priceInfo.minPrice,
    priceInfo.maxPrice
  ]);

  // Handler functions - all memoized to prevent recreation
  const handleColorToggle = useCallback((color: string) => {
    setSelectedColors(prev =>
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
    // Reset price range slider when using checkbox filters
    setPriceRange([priceInfo.minPrice, priceInfo.maxPrice]);
  }, [priceInfo.minPrice, priceInfo.maxPrice]);

  const handleSizeToggle = useCallback((size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
    // Reset price range slider when using checkbox filters
    setPriceRange([priceInfo.minPrice, priceInfo.maxPrice]);
  }, [priceInfo.minPrice, priceInfo.maxPrice]);

  const handleSleevesToggle = useCallback((sleeveType: string) => {
    setSelectedSleeves(prev =>
      prev.includes(sleeveType)
        ? prev.filter(s => s !== sleeveType)
        : [...prev, sleeveType]
    );
    // Reset price range slider when using checkbox filters
    setPriceRange([priceInfo.minPrice, priceInfo.maxPrice]);
  }, [priceInfo.minPrice, priceInfo.maxPrice]);

  const handlePriceRangeToggle = useCallback((rangeLabel: string) => {
    setSelectedPriceRanges(prev =>
      prev.includes(rangeLabel)
        ? prev.filter(r => r !== rangeLabel)
        : [...prev, rangeLabel]
    );
    // Reset price range slider when using checkbox filters
    setPriceRange([priceInfo.minPrice, priceInfo.maxPrice]);
  }, [priceInfo.minPrice, priceInfo.maxPrice]);

  const handlePriceRangeChange = useCallback((range: [number, number]) => {
    setPriceRange(range);
    // Clear checkbox price ranges when using slider
    setSelectedPriceRanges([]);
  }, []);

  const removeFilter = useCallback((type: string, value: string) => {
    switch (type) {
      case 'color':
        setSelectedColors(prev => prev.filter(c => c !== value));
        break;
      case 'size':
        setSelectedSizes(prev => prev.filter(s => s !== value));
        break;
      case 'sleeves':
        setSelectedSleeves(prev => prev.filter(s => s !== value));
        break;
      case 'price':
        setSelectedPriceRanges(prev => prev.filter(r => r !== value));
        break;
    }
    // Reset price range slider when removing any filter
    setPriceRange([priceInfo.minPrice, priceInfo.maxPrice]);
  }, [priceInfo.minPrice, priceInfo.maxPrice]);

  const resetFilters = useCallback(() => {
    setSelectedColors([]);
    setSelectedSizes([]);
    setSelectedSleeves([]);
    setSelectedPriceRanges([]);
    setSortOption('default');
    setPriceRange([priceInfo.minPrice, priceInfo.maxPrice]);
  }, [priceInfo.minPrice, priceInfo.maxPrice]);

  return {
    filteredProducts,
    selectedColors,
    selectedSizes,
    selectedSleeves,
    selectedPriceRanges,
    priceRange,
    sortOption,
    hoveredProduct,
    filterOptions,
    setSortOption,
    setHoveredProduct,
    handleColorToggle,
    handleSizeToggle,
    handleSleevesToggle,
    handlePriceRangeToggle,
    handlePriceRangeChange,
    removeFilter,
    resetFilters
  };
};