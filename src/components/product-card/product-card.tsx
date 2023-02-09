import React from 'react';
import { Product } from '../../types/types';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../constants';

const isInTheBasket = false;

const FullStarIcon = () => (
  <svg width={17} height={16} aria-hidden="true">
    <use xlinkHref="#icon-full-star" />
  </svg>);

const EmptyStarIcon = () => (
  <svg width={17} height={16} aria-hidden="true">
    <use xlinkHref="#icon-star" />
  </svg>);

type ProductCardProps = {
  data: Product;
  handleBuyButtonClick: (data: Product) => void;
}

function ProductCard({data, handleBuyButtonClick}: ProductCardProps) {
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
          {Array.from({length: data.rating}, (_, i) => i).map((it) => <FullStarIcon key={it}/>)}
          {Array.from({length: 5 - data.rating}, (_, i) => i).map((it) => <EmptyStarIcon key={it}/>)}
          <p className="visually-hidden">Рейтинг: {data.rating}</p>
          <p className="rate__count">
            <span className="visually-hidden">Всего оценок:</span>{data.reviewCount}
          </p>
        </div>
        <p className="product-card__title">
          {data.category} {data.name}
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
            onClick={() => handleBuyButtonClick(data)}
          >
            Купить
          </button>}
        <Link className="btn btn--transparent" to={`${AppRoute.Product}/${data.id}`}>
          Подробнее
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
