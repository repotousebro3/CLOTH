import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types/Product';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, '_id'>) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  getProductsByCategory: (category: string) => Product[];
  loading: boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // Initialize with enhanced sample products
  useEffect(() => {
    const sampleProducts: Product[] = [
      {
        _id: '1',
        name: 'Light Blue Plain Regular Fit Shirt',
        price: 1299,
        image: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop',
        images: [
          'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop',
          'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop'
        ],
        category: 'shirts',
        description: 'A classic light blue shirt perfect for both casual and semi-formal occasions. Made with premium cotton fabric for ultimate comfort.',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Light Blue'],
        sleeves: 'full-sleeves',
        isNewArrival: true,
        rating: 4.0,
        reviews: 2,
        inStock: true,
        specifications: {
          fit: 'Regular Fit',
          occasion: 'Casual',
          fabric: '100% Cotton',
          collar: 'Spread Collar',
          pattern: 'Solid',
          care: 'Machine Wash Cold',
          brand: 'NIKZONE',
          countryOfOrigin: 'India',
          manufacturer: 'Nikzone Fashion Pvt Ltd',
          marketedBy: 'Nikzone Fashion Pvt Ltd',
          packedBy: 'Nikzone Fashion Pvt Ltd'
        }
      },
      {
        _id: '2',
        name: 'Blue Ombre Structured Shirt',
        price: 999,
        originalPrice: 1299,
        discount: '23% OFF',
        image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop',
        images: [
          'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop'
        ],
        category: 'shirts',
        description: 'Trendy blue ombre shirt with a modern structured design. Perfect for making a style statement.',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Blue'],
        sleeves: 'half-sleeves',
        isNewArrival: true,
        inStock: true,
        specifications: {
          fit: 'Slim Fit',
          occasion: 'Casual',
          fabric: '65% Cotton, 35% Polyester',
          collar: 'Button Down',
          pattern: 'Ombre',
          care: 'Machine Wash Cold, Do Not Bleach',
          brand: 'NIKZONE',
          countryOfOrigin: 'India',
          manufacturer: 'Nikzone Fashion Pvt Ltd',
          marketedBy: 'Nikzone Fashion Pvt Ltd',
          packedBy: 'Nikzone Fashion Pvt Ltd'
        }
      },
      {
        _id: '3',
        name: 'Rust Lightweight Oxford Shirt',
        price: 1199,
        originalPrice: 1599,
        discount: '25% OFF',
        image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop',
        category: 'shirts',
        description: 'Premium rust-colored Oxford shirt with lightweight fabric. Ideal for both office and weekend wear.',
        sizes: ['M', 'L', 'XL'],
        colors: ['Rust', 'Orange'],
        sleeves: 'full-sleeves',
        isNewArrival: true,
        inStock: true,
        specifications: {
          fit: 'Regular Fit',
          occasion: 'Semi-Formal',
          fabric: '100% Cotton Oxford',
          collar: 'Button Down',
          pattern: 'Solid',
          care: 'Machine Wash, Iron Medium Heat',
          brand: 'NIKZONE',
          countryOfOrigin: 'India',
          manufacturer: 'Nikzone Fashion Pvt Ltd',
          marketedBy: 'Nikzone Fashion Pvt Ltd',
          packedBy: 'Nikzone Fashion Pvt Ltd'
        }
      },
      {
        _id: '4',
        name: 'Navy Flannel Checks Shirt',
        price: 1199,
        image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop',
        category: 'shirts',
        description: 'Cozy navy flannel shirt with classic check pattern. Perfect for cooler weather and casual outings.',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Navy Blue', 'Black'],
        sleeves: 'full-sleeves',
        isNewArrival: true,
        inStock: true,
        specifications: {
          fit: 'Relaxed Fit',
          occasion: 'Casual',
          fabric: '100% Cotton Flannel',
          collar: 'Button Down',
          pattern: 'Checked',
          care: 'Machine Wash Warm, Tumble Dry Low',
          brand: 'NIKZONE',
          countryOfOrigin: 'India',
          manufacturer: 'Nikzone Fashion Pvt Ltd',
          marketedBy: 'Nikzone Fashion Pvt Ltd',
          packedBy: 'Nikzone Fashion Pvt Ltd'
        }
      },
      {
        _id: '5',
        name: 'Classic White Cotton T-Shirt',
        price: 699,
        originalPrice: 999,
        discount: '30% OFF',
        image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop',
        category: 't-shirts',
        description: 'Essential white cotton t-shirt with premium quality fabric. A wardrobe staple for every man.',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['White'],
        sleeves: 'half-sleeves',
        isNewArrival: false,
        inStock: true,
        specifications: {
          fit: 'Regular Fit',
          occasion: 'Casual',
          fabric: '100% Combed Cotton',
          collar: 'Round Neck',
          pattern: 'Solid',
          care: 'Machine Wash Cold, Do Not Bleach',
          brand: 'NIKZONE',
          countryOfOrigin: 'India',
          manufacturer: 'Nikzone Fashion Pvt Ltd',
          marketedBy: 'Nikzone Fashion Pvt Ltd',
          packedBy: 'Nikzone Fashion Pvt Ltd'
        }
      },
      {
        _id: '6',
        name: 'Black Graphic T-Shirt',
        price: 799,
        image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop',
        category: 't-shirts',
        description: 'Stylish black t-shirt with modern graphic design. Perfect for casual wear and street style.',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Black'],
        sleeves: 'half-sleeves',
        isNewArrival: true,
        inStock: true,
        specifications: {
          fit: 'Regular Fit',
          occasion: 'Casual',
          fabric: '100% Cotton',
          collar: 'Round Neck',
          pattern: 'Printed',
          care: 'Machine Wash Cold, Turn Inside Out',
          brand: 'NIKZONE',
          countryOfOrigin: 'India',
          manufacturer: 'Nikzone Fashion Pvt Ltd',
          marketedBy: 'Nikzone Fashion Pvt Ltd',
          packedBy: 'Nikzone Fashion Pvt Ltd'
        }
      },
      {
        _id: '7',
        name: 'Blue Denim Jeans',
        price: 1599,
        originalPrice: 2199,
        discount: '27% OFF',
        image: 'https://images.pexels.com/photos/2043590/pexels-photo-2043590.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop',
        category: 'bottoms',
        description: 'Classic blue denim jeans with perfect fit and premium quality. A timeless addition to your wardrobe.',
        sizes: ['28', '30', '32', '34', '36'],
        colors: ['Blue'],
        isNewArrival: false,
        inStock: true,
        specifications: {
          fit: 'Slim Fit',
          occasion: 'Casual',
          fabric: '98% Cotton, 2% Elastane',
          pattern: 'Solid',
          care: 'Machine Wash Cold, Do Not Bleach',
          rise: 'Mid Rise',
          leg: 'Straight',
          brand: 'NIKZONE',
          countryOfOrigin: 'India',
          manufacturer: 'Nikzone Fashion Pvt Ltd',
          marketedBy: 'Nikzone Fashion Pvt Ltd',
          packedBy: 'Nikzone Fashion Pvt Ltd'
        }
      },
      {
        _id: '8',
        name: 'Black Leather Jacket',
        price: 3999,
        originalPrice: 5999,
        discount: '33% OFF',
        image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop',
        category: 'jackets',
        description: 'Premium black leather jacket with modern design. Perfect for adding edge to your style.',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black'],
        sleeves: 'full-sleeves',
        isNewArrival: true,
        inStock: true,
        specifications: {
          fit: 'Regular Fit',
          occasion: 'Casual',
          fabric: 'Genuine Leather',
          pattern: 'Solid',
          care: 'Professional Leather Cleaning Only',
          closure: 'Zipper',
          lining: 'Polyester Lining',
          brand: 'NIKZONE',
          countryOfOrigin: 'India',
          manufacturer: 'Nikzone Fashion Pvt Ltd',
          marketedBy: 'Nikzone Fashion Pvt Ltd',
          packedBy: 'Nikzone Fashion Pvt Ltd'
        }
      }
    ];

    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      const parsedProducts = JSON.parse(storedProducts);
      // Update existing products with specifications if they don't have them
      const updatedProducts = parsedProducts.map((product: Product) => {
        if (!product.specifications) {
          // Add default specifications based on category
          const defaultSpecs = getDefaultSpecifications(product.category);
          return { ...product, specifications: defaultSpecs };
        }
        return product;
      });
      setProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
    } else {
      setProducts(sampleProducts);
      localStorage.setItem('products', JSON.stringify(sampleProducts));
    }
  }, []);

  const getDefaultSpecifications = (category: string) => {
    const baseSpecs = {
      brand: 'NIKZONE',
      countryOfOrigin: 'India',
      manufacturer: 'Nikzone Fashion Pvt Ltd',
      marketedBy: 'Nikzone Fashion Pvt Ltd',
      packedBy: 'Nikzone Fashion Pvt Ltd'
    };

    switch (category) {
      case 't-shirts':
        return {
          ...baseSpecs,
          fit: 'Regular Fit',
          occasion: 'Casual',
          fabric: '100% Cotton',
          collar: 'Round Neck',
          pattern: 'Solid',
          care: 'Machine Wash Cold'
        };
      case 'shirts':
        return {
          ...baseSpecs,
          fit: 'Regular Fit',
          occasion: 'Casual',
          fabric: '100% Cotton',
          collar: 'Spread Collar',
          pattern: 'Solid',
          care: 'Machine Wash Cold'
        };
      case 'bottoms':
        return {
          ...baseSpecs,
          fit: 'Regular Fit',
          occasion: 'Casual',
          fabric: '100% Cotton',
          pattern: 'Solid',
          care: 'Machine Wash Cold',
          rise: 'Mid Rise'
        };
      case 'jackets':
        return {
          ...baseSpecs,
          fit: 'Regular Fit',
          occasion: 'Casual',
          fabric: 'Cotton Blend',
          pattern: 'Solid',
          care: 'Machine Wash Cold',
          closure: 'Zipper'
        };
      case 'accessories':
        return {
          ...baseSpecs,
          occasion: 'Casual',
          fabric: 'Mixed Materials',
          care: 'Spot Clean Only'
        };
      default:
        return baseSpecs;
    }
  };

  const addProduct = async (product: Omit<Product, '_id'>) => {
    setLoading(true);
    const newProduct: Product = {
      ...product,
      _id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setLoading(false);
  };

  const updateProduct = async (id: string, productUpdate: Partial<Product>) => {
    setLoading(true);
    const updatedProducts = products.map(product =>
      product._id === id 
        ? { ...product, ...productUpdate, updatedAt: new Date() }
        : product
    );
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setLoading(false);
  };

  const deleteProduct = async (id: string) => {
    setLoading(true);
    const updatedProducts = products.filter(product => product._id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setLoading(false);
  };

  const getProductsByCategory = (category: string) => {
    return products.filter(product => product.category === category);
  };

  return (
    <ProductContext.Provider value={{
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      getProductsByCategory,
      loading
    }}>
      {children}
    </ProductContext.Provider>
  );
};