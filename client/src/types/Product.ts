export interface ProductSpecifications {
  fit?: string;
  occasion?: string;
  fabric?: string;
  collar?: string;
  pattern?: string;
  care?: string;
  weight?: string;
  transparency?: string;
  stretchability?: string;
  lining?: string;
  closure?: string;
  pockets?: string;
  hemline?: string;
  neckline?: string;
  waistline?: string;
  length?: string;
  rise?: string;
  leg?: string;
  wash?: string;
  brand?: string;
  countryOfOrigin?: string;
  manufacturer?: string;
  marketedBy?: string;
  importedBy?: string;
  packedBy?: string;
}

export interface Product {
  _id?: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  image: string;
  images?: string[];
  category: 't-shirts' | 'shirts' | 'bottoms' | 'jackets' | 'accessories';
  description?: string;
  specifications?: ProductSpecifications;
  sizes: string[];
  colors: string[];
  sleeves?: 'full-sleeves' | 'half-sleeves';
  isNewArrival?: boolean;
  rating?: number;
  reviews?: number;
  inStock: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductFilter {
  colors: string[];
  priceRanges: string[];
  sizes: string[];
  sleeves: string[];
}