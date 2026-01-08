import { useFeaturedProducts } from '../shared/hooks/useFeaturedProducts';
import { AboutUs } from './components/AboutUs';
import { HomeHero } from './components/HomeHero';
import { ProductSlider } from './components/ProductSlider';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  const { products, loading } = useFeaturedProducts();

  if (loading) return null;

  return (
    <div className={styles.home}>
      <div className={styles.home__main}>
        <HomeHero />

        <div className={styles['home__slider-wrapper']}>
          <ProductSlider products={products} header="Новинки" />
        </div>

        <AboutUs />
      </div>
    </div>
  );
};
