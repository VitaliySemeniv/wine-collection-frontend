import { useParams } from 'react-router-dom';
import { mockProducts } from '../shared/mocks/products';

import styles from './ProductDetailsPage.module.scss';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { Back } from '../shared/components/Back';
import { Icon } from '../shared/components/Icon';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import type { Product } from '../../types/Product';
import { ProductSlider } from '../HomePage/components/ProductSlider';

export const ProductDetailsPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [suggested, setSuggested] = useState<Product[]>([]);

  const { itemId } = useParams<{ itemId: string }>();

  const product = mockProducts.find((p) => p.id === Number(itemId));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [itemId]);

  useEffect(() => {
    if (!product) return;

    const sameCategory = mockProducts.filter((p) => p.id !== product.id);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSuggested([...sameCategory].sort(() => Math.random() - 0.5).slice(0, 6));
  }, [product]);

  if (!product) {
    return <p>Товар не знайдено</p>;
  }

  return (
    <section className={styles['product-details']}>
      <div className={styles['product-details__wrapper']}>
        <Breadcrumbs firstPath="Phones" secondPath={product.name} />

        <Back />

        <div className={styles['product-details__main']}>
          <div className={styles['product-details__main-info']}>
            <div className={styles['product-details__main-image-container']}>
              <img
                src={product.image}
                alt={product.name}
                className={styles['product-details__image']}
              />
            </div>

            <div className={styles['product-details__content']}>
              <h1 className={styles['product-details__title']}>{product.name}</h1>

              <p className={styles['product-details__description']}>{product.description}</p>

              <div className={styles['product-details__purchase']}>
                <span className={styles['product-details__price']}>{product.price}₴</span>

                <div className={styles['product-details__actions']}>
                  <div className={styles['product-details__controls']}>
                    <div className={styles['product-details__buttons']}>
                      <button
                        className={classNames(styles['product-details__icon-button'], {
                          [styles.disabled]: quantity === 1,
                        })}
                        disabled={quantity === 1}
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      >
                        <Icon name="minus" />
                      </button>

                      <div className={styles['product-details__count']}>{quantity}</div>

                      <button
                        className={classNames(styles['product-details__icon-button'])}
                        onClick={() => setQuantity((q) => q + 1)}
                      >
                        <Icon name="plus" />
                      </button>
                    </div>
                  </div>

                  <button className={styles['product-details__button']}>Додати до кошика</button>
                </div>
              </div>

              <div className={styles['product-details__characteristics']}>
                <h2 className={styles['product-details__characteristics-title']}>Характеристики</h2>

                <div className={styles['product-details__characteristics-wrapper']}>
                  <ul className={styles['product-details__characteristics-list']}>
                    <li className={styles['product-details__characteristics-list-item']}>
                      <span>Категорія</span>

                      <span>{product.type}</span>
                    </li>

                    <li className={styles['product-details__characteristics-list-item']}>
                      <span>Країна</span>

                      <span>{product.country}</span>
                    </li>

                    <li className={styles['product-details__characteristics-list-item']}>
                      <span>Обʼєм</span>

                      <span>{product.volume} мл</span>
                    </li>
                  </ul>

                  <ul className={styles['product-details__characteristics-list']}>
                    <li className={styles['product-details__characteristics-list-item']}>
                      <span>Настрій</span>

                      <span>{product.mood}</span>
                    </li>

                    <li className={styles['product-details__characteristics-list-item']}>
                      <span>Категорія</span>

                      <span>{product.category}</span>
                    </li>

                    <li className={styles['product-details__characteristics-list-item']}>
                      <span>Наявність</span>

                      <span>{product.inStock ? 'В наявності' : 'Немає'}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {suggested.length > 0 && <ProductSlider products={suggested} header="Рекомендації" />}
        </div>
      </div>
    </section>
  );
};
