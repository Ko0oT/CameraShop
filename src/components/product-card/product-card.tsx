import React from 'react';
import { Product } from '../../types/types';

const isInTheBasket = false;

const fullStarIcon = (
  <svg width={17} height={16} aria-hidden="true">
    <use xlinkHref="#icon-full-star" />
  </svg>);

const emptyStarIcon = (
  <svg width={17} height={16} aria-hidden="true">
    <use xlinkHref="#icon-star" />
  </svg>);

type ProductCardProps = {
  data: Product;
}

function ProductCard({data}: ProductCardProps) {
  return (
    <div className="product-card">
      <div className="product-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`${data.previewImgWebp}, ${data.previewImgWebp2x} 2x`}
          />
          <img
            src={data.previewImg}
            srcSet={`${data.previewImg2x} 2x`}
            width={280}
            height={240}
            alt={data.name}
          />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          {Array.from({length: data.rating}).map(() => fullStarIcon)}
          {Array.from({length: 5 - data.rating}).map(() => emptyStarIcon)}
          <p className="visually-hidden">Рейтинг: {data.rating}</p>
          <p className="rate__count">
            <span className="visually-hidden">Всего оценок:</span>{data.reviewCount}
          </p>
        </div>
        <p className="product-card__title">
          {data.name}
        </p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>{data.price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        {isInTheBasket
          ?
          <a
            className="btn btn--purple-border product-card__btn product-card__btn--in-cart"
            href="#"
          >
            <svg width={16} height={16} aria-hidden="true">
              <use xlinkHref="#icon-basket" />
            </svg>
            В корзине
          </a>
          :
          <button
            className="btn btn--purple product-card__btn"
            type="button"
          >
            Купить
          </button>}
        <a className="btn btn--transparent" href="#">
          Подробнее
        </a>
      </div>
    </div>
  );
}

export default ProductCard;
