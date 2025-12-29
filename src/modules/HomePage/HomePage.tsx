import { useMemo } from 'react';
import { AboutUs } from './components/AboutUs';
import { HomeHero } from './components/HomeHero';
import { ProductSlider } from './components/ProductSlider';
import { useProducts } from '../shared/hooks/useProducts';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  const { products, error } = useProducts();

  const newProducts = useMemo(() => {
    return [...products].slice(0, 10);
  }, [products]);

  return (
    <div className={styles.home}>
      <div className={styles.home__main}>
        <HomeHero />

        {products.length > 0 && !error && (
          <ProductSlider products={newProducts} header="" displayType="regular" />
        )}

        <AboutUs />
      </div>
    </div>
  );
};
