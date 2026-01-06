import type { ProductsResponse } from '../../../types/ProductsResponse';
import { get } from '../utils/fetchClient';

export type ProductsParams = {
  query?: string;
  sort?: string;
  page?: number;
  perPage?: number;
  wine?: string[];
  country?: string[];
  priceMin?: string;
  priceMax?: string;
};

export const getProducts = (params: ProductsParams) => {
  return get<ProductsResponse>('/products', params);
};
