import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useProducts } from '../shared/hooks/useProducts';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { ProductsList } from '../shared/components/ProductList';
import { DropDown } from '../shared/components/DropDown/DropDown';
import { Loader } from '../shared/components/Loader';

import styles from './ProductsPage.module.scss';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

import debounce from 'lodash.debounce';

export const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') ?? 'age';
  const perPageParam = searchParams.get('perPage');
  const pageParam = Number(searchParams.get('page')) || 1;

  const query = searchParams.get('query')?.toLowerCase() || '';

  const perPage = !perPageParam || perPageParam === 'all' ? null : Number(perPageParam);

  const currentPage = Math.max(1, pageParam);

  const { products } = useProducts();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);

    return () => clearTimeout(timer);
  }, [products]);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    if (query) {
      filtered = products.filter((product) => product.name.toLowerCase().includes(query));
    }

    if (sort) {
      switch (sort) {
        case 'price':
          filtered = [...filtered].sort((p1, p2) => p1.price - p2.price);
          break;
        case 'title':
          filtered = [...filtered].sort((p1, p2) => p1.name.localeCompare(p2.name));
          break;
      }
    }

    return filtered;
  }, [products, sort, query]);

  const updateQuery = useMemo(
    () =>
      debounce((value: string) => {
        const params = new URLSearchParams(searchParams);

        if (value) {
          params.set('query', value);
        } else {
          params.delete('query');
        }

        params.set('page', '1');
        setSearchParams(params);
      }, 400),
    [searchParams, setSearchParams],
  );

  const handleQueryChange = (value: string) => {
    updateQuery(value);
  };

  useEffect(() => {
    return () => {
      updateQuery.cancel();
    };
  }, [updateQuery]);

  if (loading) {
    return <Loader />;
  }

  const startIndex = perPage ? (currentPage - 1) * perPage : 0;
  const endIndex = perPage ? startIndex + perPage : filteredAndSortedProducts.length;
  const currentItems = filteredAndSortedProducts.slice(startIndex, endIndex);

  return (
    <section className={styles.products}>
      <div className={styles.products__wrapper}>
        <Breadcrumbs firstPath="Каталог вин" secondPath="" />

        <h1 className={styles.products__header}>Колекція вин</h1>

        <div className={styles.products__container}>
          <div className={styles.products__items}>
            <TextField
              fullWidth
              size="small"
              placeholder="Пошук вина…"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              sx={{ mb: 4, '& .MuiOutlinedInput-root': { borderRadius: '20px' } }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  endAdornment: query ? (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => handleQueryChange('')}>
                        <CloseIcon />
                      </IconButton>
                    </InputAdornment>
                  ) : null,
                },
              }}
            />

            <div className={styles['products__items-header']}>
              <div className={styles['products__title-wrapper']}>
                <h2 className={styles.products__title}>Вина</h2>

                <p className={styles.products__count}>
                  {currentItems.length} товар{currentItems.length !== 1 && 'ів'}
                </p>
              </div>

              <div className={styles['products__drop-downs']}>
                <div className={styles['products__drop-down']}>
                  <DropDown
                    label="Сортувати за:"
                    paramKey="sort"
                    defaultValue="age"
                    options={[
                      { value: 'age', label: 'Newest' },
                      { value: 'title', label: 'Alphabetically' },
                      { value: 'price', label: 'Cheapest' },
                    ]}
                  />
                </div>

                <div className={styles['products__drop-down']}>
                  <DropDown
                    label="Товарів на сторінці:"
                    paramKey="perPage"
                    defaultValue="all"
                    options={[
                      { value: 'all', label: 'All' },
                      { value: '4', label: '4' },
                      { value: '8', label: '8' },
                      { value: '16', label: '16' },
                    ]}
                  />
                </div>
              </div>
            </div>

            <ProductsList products={currentItems} />
          </div>
        </div>
      </div>
    </section>
  );
};
