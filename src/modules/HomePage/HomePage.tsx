import { Loader } from '../shared/components/Loader';
import { useFeaturedProducts } from '../shared/hooks/useFeaturedProducts';
import { AboutUs } from './components/AboutUs';
import { HomeHero } from './components/HomeHero';
import { ProductSlider } from './components/ProductSlider';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  const { products, loading } = useFeaturedProducts({
    purpose: 'celebration',
    limit: 6,
  });

  return (
    <div className={styles.home}>
      <div className={styles.home__main}>
        <HomeHero />

        {loading && <Loader />}

        {!loading && products.length > 0 && (
          <div className={styles['home__slider-wrapper']}>
            <ProductSlider products={products} header="Святкові вина" />
          </div>
        )}

        <AboutUs />
      </div>
    </div>
  );
};
