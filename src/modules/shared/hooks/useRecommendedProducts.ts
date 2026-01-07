import { useEffect, useState } from 'react';
import type { Product } from '../../../types/Product';
import { fetchRecommendedProducts } from '../mocks/productsApi';

export const useRecommendedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);

    fetchRecommendedProducts(6)
      .then(({ products }) => setProducts(products))
      .finally(() => setLoading(false));
  }, []);

  return { products, loading };
};
