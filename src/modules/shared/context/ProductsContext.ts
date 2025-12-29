import { createContext } from 'react';
import type { Product } from '../../../types/Product';

type ProductsContextType = {
  products: Product[];
  loading: boolean;
  error: boolean;
};

export const ProductsContext = createContext<ProductsContextType | undefined>(undefined);
