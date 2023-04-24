import { CameraCategory, MAX_PRODUCT_QUANTITY_IN_BASKET, MIN_PRODUCT_QUANTITY_IN_BASKET } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCamerasInBasket } from '../../store/app-data/app-data-selectors';
import { addCameraInBasket, changeQuantityInBasket } from '../../store/app-data/app-data-slice';
import { Product } from '../../types/types';

type BasketItemProps = {
  data: Product;
  handleDeleteProductButtonClick: (data: Product) => void;
}

function BasketItem({data, handleDeleteProductButtonClick}: BasketItemProps) {
  const dispatch = useAppDispatch();

  const camerasIdsInBasket = useAppSelector(getCamerasInBasket);
  const quantity = camerasIdsInBasket.filter((it) => it === data.id).length;

  const handleDecreaseButtonClick = (value: number, id: number) => {
    dispatch(changeQuantityInBasket({value, id}));
  };

  const handleIncreaseButtonClick = () => {
    dispatch(addCameraInBasket(data.id));
  };

  const handleInputChange = (value: number, id: number) => {
    if(value <= MAX_PRODUCT_QUANTITY_IN_BASKET && value >= MIN_PRODUCT_QUANTITY_IN_BASKET) {
      dispatch(changeQuantityInBasket({value, id}));
    }
  };

  return (
    <li className="basket-item">
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
        <p className="basket-item__title">{data.category} {data.name}</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item">
            <span className="basket-item__article">Артикул:</span>{' '}
            <span className="basket-item__number">{data.vendorCode}</span>
          </li>
          <li className="basket-item__list-item">
            {data.type} {data.category === CameraCategory.Photo ? 'фотокамера' : data.category.toLowerCase()}
          </li>
          <li className="basket-item__list-item">
            {data.level} уровень
          </li>
        </ul>
      </div>
      <p className="basket-item__price">
        <span className="visually-hidden">Цена:</span>{data.price} ₽
      </p>
      <div className="quantity">
        <button
          className="btn-icon btn-icon--prev"
          aria-label="уменьшить количество товара"
          onClick={() => handleDecreaseButtonClick((quantity - 1), data.id)}
          disabled={quantity <= MIN_PRODUCT_QUANTITY_IN_BASKET}
        >
          <svg width={7} height={12} aria-hidden="true">
            <use xlinkHref="#icon-arrow" />
          </svg>
        </button>
        <label className="visually-hidden" htmlFor="counter1" />
        <input
          type="number"
          id="counter1"
          value={quantity}
          min={1}
          max={99}
          aria-label="количество товара"
          onChange={(evt) => handleInputChange(Number(evt.target.value), data.id)}
        />
        <button
          className="btn-icon btn-icon--next"
          aria-label="увеличить количество товара"
          onClick={handleIncreaseButtonClick}
          disabled={quantity >= MAX_PRODUCT_QUANTITY_IN_BASKET}
        >
          <svg width={7} height={12} aria-hidden="true">
            <use xlinkHref="#icon-arrow" />
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price">
        <span className="visually-hidden">Общая цена:</span>{data.price * quantity} ₽
      </div>
      <button
        className="cross-btn"
        type="button"
        aria-label="Удалить товар"
        onClick={() => handleDeleteProductButtonClick(data)}
      >
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
      </button>
    </li>
  );
}

export default BasketItem;
