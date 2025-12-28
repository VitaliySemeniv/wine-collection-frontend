import { HomeHero } from './components/HomeHero';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <div className={styles.home}>
      <div className={styles.home__main}>
        <HomeHero />
      </div>
    </div>
  );
};
