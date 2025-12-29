import type { FC } from 'react';
import { Link } from 'react-router-dom';

import type { Product } from '../../../../types/Product';
import styles from './ProductCard.module.scss';

type Props = {
  product: Product;
  displayType?: 'regular' | 'discount';
};

export const ProductCard: FC<Props> = ({ product }) => {
  return (
    <article className={styles['product-card']}>
      <div className={styles['product-card__container']}>
        <Link
          to={`/${product.category}/${product.itemId}`}
          className={styles['product-card__link']}
        >
          <img className={styles['product-card__image']} src={product.image} alt={product.name} />
        </Link>

        <Link
          className={styles['product-card__title']}
          to={`/${product.category}/${product.itemId}`}
        >
          {product.name}
        </Link>

        <div className={styles['product-card__price']}>
          <span className={styles['product-card__price-discount']}>${product.price}</span>
        </div>

        <div className={styles['product-card__line']}></div>

        <div className={styles['product-card__properties']}></div>
      </div>
    </article>
  );
};
