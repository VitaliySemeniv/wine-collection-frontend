import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { FC } from 'react';
import type { Product } from '../../../../types/Product';

import { ProductCard } from '../../../shared/components/ProductCard';
import { IconButton } from '../../../shared/components/IconButton';

import styles from './ProductSlider.module.scss';

import 'swiper/css';
import 'swiper/css/navigation';

type Props = {
  products: Product[];
  header: string;
  displayType?: 'regular' | 'discount';
};

export const ProductSlider: FC<Props> = ({ products, header, displayType = 'discount' }) => {
  return (
    <section className={styles.slider}>
      <div className={styles.slider__wrapper}>
        <div className={styles.slider__header}>
          <h2 className={styles.slider__title}>{header}</h2>

          <div className={styles.slider__buttons}>
            <IconButton icon="arrow_left" className="swiper-prev" />
            <IconButton icon="arrow_right" className="swiper-next" />
          </div>
        </div>

        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView="auto"
          navigation={{
            prevEl: '.swiper-prev',
            nextEl: '.swiper-next',
          }}
          breakpoints={{
            0: {
              slidesPerView: 1.5,
            },
            640: {
              slidesPerView: 2.5,
            },
            1200: {
              slidesPerView: 4,
            },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id} style={{ width: 'auto' }}>
              <ProductCard product={product} displayType={displayType} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
