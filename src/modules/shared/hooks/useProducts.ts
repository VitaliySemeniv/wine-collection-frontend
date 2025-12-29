import { useContext } from 'react';
import { ProductsContext } from '../context/ProductsContext';

export const useProducts = () => {
  const productsContext = useContext(ProductsContext);

  if (!productsContext) {
    throw new Error('useProducts must be used within ProductsProvider');
  }

  return productsContext;
};
