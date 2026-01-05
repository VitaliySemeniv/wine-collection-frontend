import { useLocation, useParams } from 'react-router-dom';
import { mockProducts } from '../shared/mocks/products';

import styles from './ProductDetailsPage.module.scss';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { Back } from '../shared/components/Back';
import { Icon } from '../shared/components/Icon';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import type { Product } from '../../types/Product';
import { ProductSlider } from '../HomePage/components/ProductSlider';
import { useCart } from '../shared/context/CartContext';

export const ProductDetailsPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [suggested, setSuggested] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { addToCart } = useCart();
  const { itemId } = useParams<{ itemId: string }>();
  const location = useLocation();

  const product = mockProducts.find((p) => p.id === Number(itemId));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [itemId]);

  useEffect(() => {
    if (!product) return;

    const imageIndex = location.state?.imageIndex ?? 0;

    if (product.images[imageIndex]) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedImage(product.images[imageIndex]);
    } else {
      setSelectedImage(product.images[0]);
    }
    const sameCategory = mockProducts.filter((p) => p.id !== product.id);

    setSuggested([...sameCategory].sort(() => Math.random() - 0.5).slice(0, 6));
  }, [product, location.state]);

  if (!product) {
    return <p>Товар не знайдено</p>;
  }

  const isAvailable = product.inStock;

  return (
    <section className={styles['product-details']}>
      <div className={styles['product-details__wrapper']}>
        <Breadcrumbs firstPath="wines" secondPath={product.name} />

        <Back />

        <div className={styles['product-details__main']}>
          <div className={styles['product-details__main-info']}>
            <div className={styles['product-details__images-container']}>
              <div className={styles['product-details__images-column']}>
                {product.images.map((image, i) => (
                  <div
                    key={i}
                    className={`${styles['product-details__image-container']} ${
                      selectedImage === image
                        ? styles['product-details__image-container--active']
                        : ''
                    }`}
                    onClick={() => setSelectedImage(image)}
                  >
                    <img
                      className={styles['product-details__image']}
                      src={image}
                      alt={`${product.name} – image ${i + 1}`}
                    />
                  </div>
                ))}
              </div>

              {selectedImage && (
                <div className={styles['product-details__main-image-container']}>
                  <img
                    className={styles['product-details__main-image']}
                    src={selectedImage}
                    alt={product.name}
                  />
                </div>
              )}
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

                  <button
                    className={styles['product-details__button']}
                    disabled={!isAvailable}
                    onClick={() => addToCart(product.id, quantity)}
                  >
                    {isAvailable ? 'Додати до кошика' : 'Немає в наявності'}
                  </button>
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
