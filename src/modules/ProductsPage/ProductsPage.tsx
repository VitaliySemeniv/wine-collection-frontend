import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { mockProducts } from '../shared/mocks/products';

import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { ProductsList } from '../shared/components/ProductList';
import { DropDown } from '../shared/components/DropDown/DropDown';
import { Loader } from '../shared/components/Loader';
import { Filters } from '../shared/components/Filters';

import styles from './ProductsPage.module.scss';
import { Chip, IconButton, InputAdornment, TextField } from '@mui/material';
import { useTheme, useMediaQuery, Button, Drawer } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

import debounce from 'lodash.debounce';

export const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [wineOpen, setWineOpen] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);

  const params = useMemo(() => Object.fromEntries(searchParams.entries()), [searchParams]);
  const [searchValue, setSearchValue] = useState(params.query ?? '');
  const [filtersOpen, setFiltersOpen] = useState(false);

  // const { products, total, loading } = useProducts(params);
  const products = mockProducts;
  const total = mockProducts.length;
  const loading = false;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const updateQuery = useMemo(
    () =>
      debounce((value: string) => {
        const nextParams = new URLSearchParams(searchParams);

        if (value) {
          nextParams.set('query', value);
        } else {
          nextParams.delete('query');
        }

        nextParams.set('page', '1');
        setSearchParams(nextParams);
      }, 500),
    [searchParams, setSearchParams],
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSearchValue(params.query ?? '');
  }, [params.query]);

  useEffect(() => {
    return () => {
      updateQuery.cancel();
    };
  }, [updateQuery]);

  const toggleParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    const current = params.getAll(key);

    if (current.includes(value)) {
      params.delete(key);
      current.filter((v) => v !== value).forEach((v) => params.append(key, v));
    } else {
      params.append(key, value);
    }

    params.set('page', '1');
    setSearchParams(params);
  };

  const resetAll = () => {
    setSearchParams({});
  };

  const filterLabels: Record<string, string> = {
    gift: '🎁 На подарунок',
    dinner: '🍽️ До вечері',
    celebration: '🎉 Святкування',
    romantic: '💖 Романтичний',
    festive: '🎄 Святковий',
    relaxed: '😌 Розслаблений',
  };

  const sortLabels: Record<string, string> = {
    age: 'Новинки',
    title: 'Назва',
    price: 'Від дешевих → дорогих',
  };

  const priceMin = searchParams.get('priceMin');
  const priceMax = searchParams.get('priceMax');

  const hasSelectedFilters =
    priceMin || priceMax || Object.keys(params).some((key) => key !== 'query' && key !== 'page');

  if (loading) {
    return <Loader />;
  }

  return (
    <section className={styles.products}>
      <div className={styles.products__wrapper}>
        <Breadcrumbs firstPath="Каталог вин" secondPath="" />

        <h1 className={styles.products__header}>Колекція вин</h1>

        <div className={styles.products__container}>
          {!isMobile && (
            <Filters
              wineOpen={wineOpen}
              setWineOpen={setWineOpen}
              countryOpen={countryOpen}
              setCountryOpen={setCountryOpen}
              toggleParam={toggleParam}
            />
          )}

          {isMobile && (
            <Drawer
              anchor="left"
              open={filtersOpen}
              onClose={() => setFiltersOpen(false)}
              PaperProps={{
                sx: {
                  width: '85%',
                  maxWidth: 360,
                  padding: 2,
                },
              }}
            >
              <Filters
                wineOpen={wineOpen}
                setWineOpen={setWineOpen}
                countryOpen={countryOpen}
                setCountryOpen={setCountryOpen}
                toggleParam={toggleParam}
              />
            </Drawer>
          )}

          <div className={styles.products__items}>
            <TextField
              fullWidth
              size="small"
              placeholder="Пошук вина…"
              value={searchValue}
              onChange={(e) => {
                const value = e.target.value;
                setSearchValue(value);
                updateQuery(value);
              }}
              sx={{
                mb: 4,
                '& .MuiOutlinedInput-root': { borderRadius: '20px' },
                '& .MuiInputBase-input': {
                  fontFamily: '"Playfair Display", "Times New Roman", serif',
                },
                '& .MuiInputBase-input::placeholder': {
                  fontFamily: '"Playfair Display", "Times New Roman", serif',
                  opacity: 0.6,
                },
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  endAdornment: searchValue ? (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={() => {
                          setSearchValue('');
                          updateQuery('');
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </InputAdornment>
                  ) : null,
                },
              }}
            />

            {isMobile && (
              <Button
                variant="outlined"
                startIcon={<FilterListIcon />}
                onClick={() => setFiltersOpen(true)}
                sx={{
                  mb: 2,
                  borderRadius: '20px',
                  fontFamily: '"Playfair Display", serif',
                  color: '#7a1e2d',
                  borderColor: '#7a1e2d',
                }}
              >
                Фільтри
              </Button>
            )}

            <div className={styles['products__items-header']}>
              <div className={styles['products__title-wrapper']}>
                <h2 className={styles.products__title}>Вина</h2>

                <p className={styles.products__count}>
                  {total} товар{total !== 1 && 'ів'}
                </p>
              </div>

              <div className={styles['products__drop-downs']}>
                <div className={styles['products__drop-down']}>
                  <DropDown
                    label="Сортувати за:"
                    paramKey="sort"
                    defaultValue="age"
                    options={[
                      { value: 'age', label: 'Новинки' },
                      { value: 'title', label: 'Назва' },
                      { value: 'price', label: 'Від дешевих → дорогих' },
                    ]}
                  />
                </div>

                <div className={styles['products__drop-down']}>
                  <DropDown
                    label="Товарів на сторінці:"
                    paramKey="perPage"
                    defaultValue="8"
                    options={[
                      { value: '4', label: '4' },
                      { value: '8', label: '8' },
                      { value: '16', label: '16' },
                    ]}
                  />
                </div>
              </div>
            </div>

            {hasSelectedFilters && (
              <div className={styles['products__selected-filters']}>
                {priceMin && priceMax && (
                  <Chip
                    label={`₴ ${priceMin} – ${priceMax}`}
                    onDelete={() => {
                      const nextParams = new URLSearchParams(searchParams);
                      nextParams.delete('priceMin');
                      nextParams.delete('priceMax');
                      setSearchParams(nextParams);
                    }}
                    variant="outlined"
                    sx={{
                      fontFamily: '"Playfair Display", serif',
                      fontSize: '14px',
                      border: '1px solid #000',
                      mr: 1,
                      mb: 1,
                    }}
                  />
                )}

                {Object.keys(params).map((key) =>
                  key !== 'query' && key !== 'page' && key !== 'priceMin' && key !== 'priceMax'
                    ? searchParams.getAll(key).map((value) => (
                        <Chip
                          key={`${key}-${value}`}
                          label={
                            key === 'sort'
                              ? (sortLabels[value] ?? value)
                              : (filterLabels[value] ?? value)
                          }
                          onDelete={() => toggleParam(key, value)}
                          variant="outlined"
                          sx={{
                            fontFamily: '"Playfair Display", serif',
                            fontSize: '14px',
                            border: '1px solid #000',
                            mr: 1,
                            mb: 1,
                          }}
                        />
                      ))
                    : null,
                )}

                <button className={styles.products__reset} onClick={resetAll}>
                  Скинути
                </button>
              </div>
            )}

            <ProductsList products={products} />
          </div>
        </div>
      </div>
    </section>
  );
};
