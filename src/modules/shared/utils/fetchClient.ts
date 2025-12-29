import type { Product } from '../../../types/Product';

export const BASE_URL = '';

function wait(delay: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

export async function get<T>(url: string): Promise<T> {
  const response = await wait(300).then(() => fetch(`${BASE_URL}${url}`));

  if (!response.ok) {
    throw new Error('Failed to load data');
  }

  return response.json();
}

export const getProducts = () => {
  return get<Product[]>('/products');
};
