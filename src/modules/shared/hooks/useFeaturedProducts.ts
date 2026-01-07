import { useEffect, useState } from 'react';
import type { Product } from '../../../types/Product';
import { fetchProducts } from '../mocks/productsApi';

export const useFeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);

    fetchProducts({ sort: 'age', perPage: 6, inStock: true })
      .then(({ products }) => setProducts(products))
      .finally(() => setLoading(false));
  }, []);

  return { products, loading };
};
