import { useEffect, useState } from 'react';
import { getProducts } from '../api/products';
import type { ProductsParams } from '../api/products';
import type { Product } from '../../../types/Product';
import { mockProducts } from '../mocks/products';

export const useProducts = (params: ProductsParams, useMocks = false) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (useMocks) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProducts(mockProducts);
      setTotal(mockProducts.length);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(false);

    getProducts(params)
      .then(({ products, total }) => {
        if (cancelled) return;
        setProducts(products);
        setTotal(total);
      })
      .catch(() => !cancelled && setError(true))
      .finally(() => !cancelled && setLoading(false));

    return () => {
      cancelled = true;
    };
  }, [params, useMocks]);

  return { products, total, loading, error };
};
