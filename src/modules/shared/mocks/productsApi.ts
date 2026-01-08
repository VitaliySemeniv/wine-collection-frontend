import type { Product } from '../../../types/Product';
import { mockProducts } from './products';

const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchProducts = async (params?: {
  sort?: string;
  perPage?: number;
  category?: string;
  inStock?: boolean;
}) => {
  await delay();

  let data: Product[] = [...mockProducts];

  if (params?.inStock) {
    data = data.filter((p) => p.inStock);
  }

  if (params?.category) {
    data = data.filter((p) => p.category === params.category);
  }

  if (params?.sort === 'age') {
    data = data.reverse();
  }

  if (params?.sort === 'price') {
    data.sort((a, b) => a.price - b.price);
  }

  if (params?.perPage) {
    data = data.slice(0, params.perPage);
  }

  return {
    products: data,
    total: data.length,
  };
};

export const fetchRecommendedProducts = async (limit = 6) => {
  await delay();

  return {
    products: [...mockProducts].sort(() => Math.random() - 0.5).slice(0, limit),
  };
};
