import React from 'react';
import { Product } from '../../types/types';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../constants';
import StarsRating from '../stars-rating/stars-rating';

const isInTheBasket = false;

type ProductCardProps = {
  data: Product;
  handleBuyButtonClick: (data: Product) => void;
}

function ProductCard({data, handleBuyButtonClick}: ProductCardProps) {
  return (
    <div className="product-card" style={{height: '100%', alignItems: 'stretch', flexDirection: 'column'}} data-testid="card">
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
      <div className="product-card__info" style={{alignItems: 'stretch', flexDirection: 'column'}}>
        <div className="rate product-card__rate">
          <StarsRating rating={data.rating}/>
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
