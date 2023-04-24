import { Helmet } from 'react-helmet-async';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCameras, getCamerasInBasket } from '../../store/app-data/app-data-selectors';
import { Link } from 'react-router-dom';
import { APIRoute, AppRoute, CameraCategory, USEFORM_MODE } from '../../constants';
import BasketItem from '../../components/basket-item/basket-item';
import FocusTrap from 'focus-trap-react';
import { useEffect, useRef, useState, KeyboardEvent } from 'react';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { Product } from '../../types/types';
import { clearBasket, deleteCameraFromBasket } from '../../store/app-data/app-data-slice';
import { createAPI } from '../../services/api';
import { useForm } from 'react-hook-form';

function Basket() {
  const api = createAPI();
  const dispatch = useAppDispatch();
  const allCameras = useAppSelector(getCameras);
  const camerasIdsInBasket = useAppSelector(getCamerasInBasket);
  const camerasInBasket = allCameras.filter((it) => camerasIdsInBasket.includes(it.id));

  const [modalIsActive, setModalActive] = useState<boolean>(false);
  const [successModalIsActive, setSuccessModalActive] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>({} as Product);

  const modalRef = useRef(null);
  const successModalRef = useRef(null);

  useEffect(() => {
    if (modalRef.current) {
      disableBodyScroll(modalRef.current);
    } else if (successModalRef.current) {
      disableBodyScroll(successModalRef.current);
    } else {
      clearAllBodyScrollLocks();
    }
    return () => {
      clearAllBodyScrollLocks();
    };
  }, [modalIsActive, successModalIsActive]);


  const handleDeleteProductButtonClick = (data: Product) => {
    setModalActive(true);
    setSelectedProduct(data);
  };

  const handleCloseButtonClick = () => {
    if (modalIsActive) {
      setModalActive(false);
    }
    if (successModalIsActive) {
      setSuccessModalActive(false);
    }
  };

  const handleEscKeydown = (evt: KeyboardEvent<HTMLDivElement>) => {
    if(evt.key === 'Escape') {
      handleCloseButtonClick();
    }
  };

  const handleConfirmDeleteButtonClick = () => {
    setModalActive(false);
    dispatch(deleteCameraFromBasket(selectedProduct.id));
  };

  const [isFormDisabled, setIsFormDisabled] = useState<boolean>(false);
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [couponApproved, setCouponApproved] = useState<boolean | null>(null);
  const [coupon, setCoupon] = useState<string | null>(null);

  const {
    register,
    formState: {
      isValid,
    },
    handleSubmit,
  } = useForm<FormInput>({
    mode: USEFORM_MODE,
  });

  type FormInput = {
    coupon: string;
  }

  const onSubmit = async (data: FormInput) => {
    setIsFormDisabled(true);
    try {
      const response = await api.post(`${APIRoute.Coupons}`, data);
      setCouponApproved(true);
      setCoupon(data.coupon);
      setDiscountPercent(response.data as number);
    } catch {
      setCouponApproved(false);
    } finally {
      setIsFormDisabled(false);
    }
  };

  const totalPrice = camerasIdsInBasket.reduce((acc, cur) => {
    const price = allCameras.find((it) => it.id === cur)?.price;
    if (price) {
      return acc + price;
    }
    return 0;
  }, 0);

  const discount = Math.floor(totalPrice * (discountPercent / 100));

  const finalPrice = totalPrice - discount;

  const handleOrderClick = async () => {
    setIsFormDisabled(true);
    try {
      await api.post(`${APIRoute.Order}`, {camerasIds: camerasIdsInBasket, coupon: coupon});
      setSuccessModalActive(true);
      dispatch(clearBasket());
    } finally {
      setIsFormDisabled(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Корзина - Фотошоп</title>
      </Helmet>
      <div className="page-content">
        <div className="breadcrumbs">
          <div className="container">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link
                  className="breadcrumbs__link"
                  to={AppRoute.Root}
                >
                Главная
                  <svg width={5} height={8} aria-hidden="true">
                    <use xlinkHref="#icon-arrow-mini" />
                  </svg>
                </Link>
              </li>
              <li className="breadcrumbs__item">
                <Link
                  className="breadcrumbs__link"
                  to={AppRoute.Root}
                >
                Каталог
                  <svg width={5} height={8} aria-hidden="true">
                    <use xlinkHref="#icon-arrow-mini" />
                  </svg>
                </Link>
              </li>
              <li className="breadcrumbs__item">
                <span className="breadcrumbs__link breadcrumbs__link--active">
                Корзина
                </span>
              </li>
            </ul>
          </div>
        </div>
        <section className="basket">
          <div className="container">
            <h1 className="title title--h2">Корзина</h1>
            <ul className="basket__list">
              {camerasInBasket.map((it) => <BasketItem key={it.id} data={it} handleDeleteProductButtonClick={handleDeleteProductButtonClick}/>)}
            </ul>
            <div className="basket__summary">
              <div className="basket__promo">
                <p className="title title--h4">
                Если у вас есть промокод на скидку, примените его в этом поле
                </p>
                <div className="basket-form">
                  <form
                    method="post"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className={`custom-input ${couponApproved === true ? 'is-valid' : ''} ${couponApproved === false ? 'is-invalid' : ''}`}>
                      <label>
                        <span className="custom-input__label">Промокод</span>
                        <input
                          {...register('coupon', {
                            required: 'Поле обязателько к заполнению',
                            pattern: /^camera-(\d){3}$/,
                          })}
                          type="text"
                          placeholder="Введите промокод"
                          disabled={isFormDisabled}
                        />
                      </label>
                      <p className="custom-input__error">Промокод неверный</p>
                      <p className="custom-input__success">Промокод принят!</p>
                    </div>
                    <button
                      className="btn"
                      type="submit"
                      disabled={isFormDisabled || !isValid}
                    >
                    Применить
                    </button>
                  </form>
                </div>
              </div>
              <div className="basket__summary-order">
                <p className="basket__summary-item">
                  <span className="basket__summary-text">Всего:</span>
                  <span className="basket__summary-value">{totalPrice} ₽</span>
                </p>
                <p className="basket__summary-item">
                  <span className="basket__summary-text">Скидка:</span>
                  <span className="basket__summary-value basket__summary-value--bonus">
                    {discount} ₽
                  </span>
                </p>
                <p className="basket__summary-item">
                  <span className="basket__summary-text basket__summary-text--total">
                  К оплате:
                  </span>
                  <span className="basket__summary-value basket__summary-value--total">
                    {finalPrice} ₽
                  </span>
                </p>
                <button
                  className="btn btn--purple"
                  type="submit"
                  onClick={handleOrderClick}
                  disabled={isFormDisabled || camerasIdsInBasket.length === 0}
                >
                Оформить заказ
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
      {modalIsActive
        ?
        <FocusTrap>
          <div
            className="modal is-active"
            ref={modalRef}
            onKeyDown={handleEscKeydown}
          >
            <div className="modal__wrapper">
              <div className="modal__overlay" onClick={handleCloseButtonClick}/>
              <div className="modal__content">
                <p className="title title--h4">Удалить этот товар?</p>
                <div className="basket-item basket-item--short">
                  <div className="basket-item__img">
                    <picture>
                      <source
                        type="image/webp"
                        srcSet={`${selectedProduct.previewImgWebp}, ${selectedProduct.previewImgWebp2x} 2x`}
                      />
                      <img
                        src={selectedProduct.previewImg}
                        srcSet={`${selectedProduct.previewImg2x} 2x`}
                        width={140}
                        height={120}
                        alt={selectedProduct.name}
                      />
                    </picture>
                  </div>
                  <div className="basket-item__description">
                    <p className="basket-item__title">{selectedProduct.name}</p>
                    <ul className="basket-item__list">
                      <li className="basket-item__list-item">
                        <span className="basket-item__article">Артикул:</span>{' '}
                        <span className="basket-item__number">{selectedProduct.vendorCode}</span>
                      </li>
                      <li className="basket-item__list-item">{selectedProduct.type} {selectedProduct.category === CameraCategory.Photo ? 'фотокамера' : selectedProduct.category.toLowerCase()}</li>
                      <li className="basket-item__list-item">{selectedProduct.level} уровень</li>
                    </ul>
                  </div>
                </div>
                <div className="modal__buttons">
                  <button
                    className="btn btn--purple modal__btn modal__btn--half-width"
                    type="button"
                    onClick={handleConfirmDeleteButtonClick}
                  >
              Удалить
                  </button>
                  <button
                    className="btn btn--transparent modal__btn modal__btn--half-width"
                    onClick={handleCloseButtonClick}
                  >
              Продолжить покупки
                  </button>
                </div>
                <button
                  className="cross-btn"
                  type="button"
                  aria-label="Закрыть попап"
                  onClick={handleCloseButtonClick}
                >
                  <svg width={10} height={10} aria-hidden="true">
                    <use xlinkHref="#icon-close" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </FocusTrap>
        : ''}
      {successModalIsActive
        ?
        <FocusTrap>
          <div
            className="modal is-active modal--narrow"
            ref={successModalRef}
            onKeyDown={handleEscKeydown}
          >
            <div className="modal__wrapper">
              <div className="modal__overlay" onClick={handleCloseButtonClick}/>
              <div className="modal__content">
                <p className="title title--h4">Спасибо за покупку</p>
                <svg className="modal__icon" width={80} height={78} aria-hidden="true">
                  <use xlinkHref="#icon-review-success" />
                </svg>
                <div className="modal__buttons">
                  <Link
                    className="btn btn--purple modal__btn modal__btn--fit-width"
                    type="button"
                    to={AppRoute.Root}
                  >
                    Вернуться к покупкам
                  </Link>
                </div>
                <button
                  className="cross-btn"
                  type="button"
                  aria-label="Закрыть попап"
                  onClick={handleCloseButtonClick}
                >
                  <svg width={10} height={10} aria-hidden="true">
                    <use xlinkHref="#icon-close" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </FocusTrap>
        : ''}
    </>
  );
}

export default Basket;
