import { useState } from 'react';
import { Product } from '../types/Product';

export const useProductModal = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  return {
    selectedProduct,
    openProductModal,
    closeProductModal
  };
};