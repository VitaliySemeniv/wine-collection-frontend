import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useState } from 'react';
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
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <section className={styles.slider}>
      <div className={styles.slider__header}>
        <h2 className={styles.slider__title}>{header}</h2>

        <div className={styles.slider__buttons}>
          <IconButton
            icon={isBeginning ? 'arrow_left_disabled' : 'arrow_left'}
            className="swiper-prev"
            disabled={isBeginning}
          />

          <IconButton
            icon={isEnd ? 'arrow_right_disabled' : 'arrow_right'}
            className="swiper-next"
            disabled={isEnd}
          />
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        slidesPerView="auto"
        spaceBetween={16}
        navigation={{
          prevEl: '.swiper-prev',
          nextEl: '.swiper-next',
        }}
        onSwiper={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} displayType={displayType} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
