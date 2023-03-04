import React from 'react';
import { Product } from '../../types/types';

type ProductPreviewProps = {
  data: Product;
  isActive: boolean;
  handleCloseButtonClick: () => void;
}

function ProductPreview({data, isActive, handleCloseButtonClick}: ProductPreviewProps) {
  return (
    <div className={`modal ${isActive ? 'is-active' : ''}`}>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={handleCloseButtonClick} data-testid="overlay"/>
        <div className="modal__content">
          <p className="title title--h4">Добавить товар в корзину</p>
          <div className="basket-item basket-item--short">
            <div className="basket-item__img">
              <picture>
                <source
                  type="image/webp"
                  srcSet={`${data.previewImgWebp}, ${data.previewImgWebp2x} 2x`}
                />
                <img
                  src={data.previewImg}
                  srcSet={`${data.previewImg2x} 2x`}
                  width={140}
                  height={120}
                  alt={data.name}
                />
              </picture>
            </div>
            <div className="basket-item__description">
              <p className="basket-item__title">{data.name}</p>
              <ul className="basket-item__list">
                <li className="basket-item__list-item">
                  <span className="basket-item__article">Артикул:</span>{' '}
                  <span className="basket-item__number">{data.vendorCode}</span>
                </li>
                <li className="basket-item__list-item">{data.category}</li>
                <li className="basket-item__list-item">{data.level} уровень</li>
              </ul>
              <p className="basket-item__price">
                <span className="visually-hidden">Цена:</span>{data.price} ₽
              </p>
            </div>
          </div>
          <div className="modal__buttons">
            <button
              className="btn btn--purple modal__btn modal__btn--fit-width"
              type="button"
            >
              <svg width={24} height={16} aria-hidden="true">
                <use xlinkHref="#icon-add-basket" />
              </svg>
              Добавить в корзину
            </button>
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={handleCloseButtonClick}
            data-testid="closeButton"
          >
            <svg width={10} height={10} aria-hidden="true">
              <use xlinkHref="#icon-close" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductPreview;
