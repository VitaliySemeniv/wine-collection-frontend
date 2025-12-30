import { useEffect, useState } from 'react';
import { getProducts } from '../api/products';
import type { ProductsParams } from '../api/products';
import type { Product } from '../../../types/Product';

export const useProducts = (params: ProductsParams) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    setError(false);

    getProducts(params)
      .then(({ products, total }) => {
        setProducts(products);
        setTotal(total);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [params]);

  return { products, total, loading, error };
};
