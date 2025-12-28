import { Link } from 'react-router-dom';
import styles from './HomeHero.module.scss';

export const HomeHero = () => {
  return (
    <section className={styles['home-hero']}>
      <div className={styles['home-hero__container']}>
        <img
          src="./images/home-page-picture.png"
          alt="Wine"
          className={styles['home-hero__photo']}
        />

        <div className={styles['home-hero__content']}>
          <h1 className={styles['home-hero__title']}>
            Знайди своє ідеальне вино для особливих моментів
          </h1>

          <p className={styles['home-hero__description']}>
            Подарунок, затишна вечеря чи особлива подія — наш віртуальний сомельє допоможе підібрати
            вино за ціною, стилем і настроєм усього за кілька кліків.
          </p>

          <Link to="/wines" className={styles['home-hero__button']}>
            Перейти до каталогу
          </Link>
        </div>
      </div>
    </section>
  );
};
