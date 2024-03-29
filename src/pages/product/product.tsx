import { useEffect, useRef, useState, KeyboardEvent } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import ProductCard from '../../components/product-card/product-card';
import StarsRating from '../../components/stars-rating/stars-rating';
import { APIRoute, AppRoute, INTERSECTION_DELAY, PRODUCTS_PER_SLIDER, REVIEWS_COUNT } from '../../constants';
import { Product as ProductType, Review as ReviewType } from '../../types/types';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import './product.css';
import Review from '../../components/review/review';
import { useInView } from 'react-intersection-observer';
import FocusTrap from 'focus-trap-react';
import ReviewForm from '../../components/review-form/review-form';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { createAPI } from '../../services/api';
import LoadingScreen from '../../components/loading-screen/loading-screen';
import { addCameraInBasket } from '../../store/app-data/app-data-slice';
import { useAppDispatch } from '../../hooks';


function Product() {
  const api = createAPI();
  const {id} = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [productData, setProductData] = useState<ProductType | null>(null);
  const [similarData, setSimilarData] = useState<ProductType[] | null>(null);
  const [reviewsData, setReviewsData] = useState<ReviewType[] | null>(null);

  useEffect(() => {
    api.get<ProductType>(`${APIRoute.Cameras}/${id as string}`)
      .then((response) => setProductData(response.data))
      .catch(() => navigate(AppRoute.NotFound, { replace: true }));
    api.get<ProductType[]>(`${APIRoute.Cameras}/${id as string}/${APIRoute.Similar}`)
      .then((response) => setSimilarData(response.data))
      .catch(() => navigate(AppRoute.NotFound, { replace: true }));
    api.get<ReviewType[]>(`${APIRoute.Cameras}/${id as string}${APIRoute.Reviews}`)
      .then((response) => setReviewsData(response.data.sort((a, b) => Date.parse(b.createAt) - Date.parse(a.createAt))))
      .catch(() => navigate(AppRoute.NotFound, { replace: true }));
    return () => {
      setProductData(null);
      setSimilarData(null);
      setReviewsData(null);
      setReviewsCount(REVIEWS_COUNT);
      setActiveSlide(0);
      setDescriptionTabIsActive(true);
    };
  }, [id]);


  const slider = useRef<Slider>(null);

  const [activeSlide, setActiveSlide] = useState<number>(0);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
    beforeChange: (_: number, next: number) => setActiveSlide(next),
  };


  const [descriptionTabIsActive, setDescriptionTabIsActive] = useState<boolean>(true);

  const {pathname} = useLocation();

  useEffect(() => {
    if (pathname.includes(AppRoute.Description)) {
      setDescriptionTabIsActive(true);
    }

    if (pathname.includes(AppRoute.Characteristics)) {
      setDescriptionTabIsActive(false);
    }
  }, [pathname]);


  const [reviewModalIsActive, setReviewModalActive] = useState<boolean>(false);
  const [successReviewModalIsActive, setSuccessReviewModalIsActive] = useState<boolean>(false);
  const [modalIsActive, setModalActive] = useState<boolean>(false);
  const [successModalIsActive, setSuccessModalIsActive] = useState<boolean>(false);

  const reviewModalRef = useRef(null);
  const successReviewModalRef = useRef(null);
  const modalRef = useRef(null);
  const successModalRef = useRef(null);

  useEffect(() => {
    if (reviewModalRef.current) {
      disableBodyScroll(reviewModalRef.current);
    } else if (successReviewModalRef.current) {
      disableBodyScroll(successReviewModalRef.current);
    } else if (modalRef.current) {
      disableBodyScroll(modalRef.current);
    } else if (successModalRef.current) {
      disableBodyScroll(successModalRef.current);
    } else {
      clearAllBodyScrollLocks();
    }
    return () => {
      clearAllBodyScrollLocks();
    };
  }, [reviewModalIsActive, successReviewModalIsActive, modalIsActive, successModalIsActive]);

  const handleCloseButtonClick = () => {
    if(reviewModalIsActive) {
      setReviewModalActive(false);
    }
    if(successReviewModalIsActive) {
      setSuccessReviewModalIsActive(false);
    }
    if (modalIsActive) {
      setModalActive(false);
    }
    if (successModalIsActive) {
      setSuccessModalIsActive(false);
    }
  };

  const handleBuyButtonClick = () => {
    setModalActive(true);
  };

  const handleAddButtonClick = () => {
    if (productData) {
      setModalActive(false);
      dispatch(addCameraInBasket(productData.id));
      setSuccessModalIsActive(true);
    }
  };

  const handleEscKeydown = (evt: KeyboardEvent<HTMLDivElement>) => {
    if(evt.key === 'Escape') {
      handleCloseButtonClick();
    }
  };

  const handleReviewsChange = (newReview: ReviewType): void => {
    setReviewModalActive(false);
    if(reviewsData) {
      setReviewsData([newReview, ...reviewsData]);
    }
    setSuccessReviewModalIsActive(true);
  };

  const [reviewsCount, setReviewsCount] = useState(REVIEWS_COUNT);
  const slicedReviews = reviewsData?.slice(0, reviewsCount);

  const { ref, inView } = useInView({
    threshold: 1,
    delay: INTERSECTION_DELAY
  });

  useEffect(() => {
    if (inView) {
      setReviewsCount((prev) => prev + REVIEWS_COUNT);
    }
  }, [inView]);


  if (productData === null || similarData === null || reviewsData === null) {
    return (<LoadingScreen />);
  }

  return (
    <>
      <Helmet>
        <title>{productData.name}</title>
      </Helmet>
      <div className="page-content" data-testid="product">
        <div className="breadcrumbs">
          <div className="container">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link className="breadcrumbs__link" to={AppRoute.Root}>
                Главная
                  <svg width={5} height={8} aria-hidden="true">
                    <use xlinkHref="#icon-arrow-mini" />
                  </svg>
                </Link>
              </li>
              <li className="breadcrumbs__item">
                <Link className="breadcrumbs__link" to={AppRoute.Root}>
                Каталог
                  <svg width={5} height={8} aria-hidden="true">
                    <use xlinkHref="#icon-arrow-mini" />
                  </svg>
                </Link>
              </li>
              <li className="breadcrumbs__item">
                <span className="breadcrumbs__link breadcrumbs__link--active">
                  {productData.name}
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="page-content__section">
          <section className="product">
            <div className="container">
              <div className="product__img">
                <picture>
                  <source
                    type="image/webp"
                    srcSet={`${productData.previewImgWebp}, ${productData.previewImgWebp2x} 2x`}
                  />
                  <img
                    src={productData.previewImg}
                    srcSet={`${productData.previewImg2x} 2x`}
                    width={560}
                    height={480}
                    alt={productData.name}
                  />
                </picture>
              </div>
              <div className="product__content">
                <h1 className="title title--h3">{productData.name}</h1>
                <div className="rate product__rate">
                  <StarsRating rating={productData.rating}/>
                  <p className="visually-hidden">Рейтинг: {productData.rating}</p>
                  <p className="rate__count">
                    <span className="visually-hidden">Всего оценок:</span>{reviewsData.length}
                  </p>
                </div>
                <p className="product__price">
                  <span className="visually-hidden">Цена:</span>{productData.price} ₽
                </p>
                <button
                  className="btn btn--purple"
                  type="button"
                  onClick={handleBuyButtonClick}
                >
                  <svg width={24} height={16} aria-hidden="true">
                    <use xlinkHref="#icon-add-basket" />
                  </svg>
                Добавить в корзину
                </button>
                <div className="tabs product__tabs">
                  <div className="tabs__controls product__tabs-controls">
                    <button
                      className={`tabs__control ${!descriptionTabIsActive ? 'is-active' : ''}`} type="button"
                      onClick={() => {
                        setDescriptionTabIsActive(false);
                        navigate(`${AppRoute.Product}/${productData.id}/${AppRoute.Characteristics}`);
                      }}
                    >
                    Характеристики
                    </button>
                    <button
                      className={`tabs__control ${descriptionTabIsActive ? 'is-active' : ''}`} type="button"
                      onClick={() => {
                        setDescriptionTabIsActive(true);
                        navigate(`${AppRoute.Product}/${productData.id}/${AppRoute.Description}`);
                      }}
                    >
                    Описание
                    </button>
                  </div>
                  <div className="tabs__content">
                    <div className={`tabs__element ${!descriptionTabIsActive ? 'is-active' : ''}`} data-testid="characteristics-tab">
                      <ul className="product__tabs-list">
                        <li className="item-list">
                          <span className="item-list__title">Артикул:</span>
                          <p className="item-list__text"> {productData.vendorCode}</p>
                        </li>
                        <li className="item-list">
                          <span className="item-list__title">Категория:</span>
                          <p className="item-list__text">{productData.category}</p>
                        </li>
                        <li className="item-list">
                          <span className="item-list__title">Тип камеры:</span>
                          <p className="item-list__text">{productData.type}</p>
                        </li>
                        <li className="item-list">
                          <span className="item-list__title">Уровень:</span>
                          <p className="item-list__text">{productData.level}</p>
                        </li>
                      </ul>
                    </div>
                    <div className={`tabs__element ${descriptionTabIsActive ? 'is-active' : ''}`} data-testid="description-tab">
                      <div className="product__tabs-text">
                        <p>
                          {productData.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>
        </div>
        <div className="page-content__section">
          <section className='similar'>
            <div className="container">
              <h2 className="title title--h3">Похожие товары</h2>

              <div className='similar__slider'>
                <div className='similar__slider-list'>
                  <Slider ref={slider} {...settings}>
                    {similarData.map((it) => <ProductCard data={it} key={it.id} handleBuyButtonClick={handleBuyButtonClick}/>)}
                  </Slider>
                </div>
                <button
                  className="slider-control slider-control--prev"
                  type="button"
                  aria-label="Предыдущий слайд"
                  onClick={() => slider?.current?.slickPrev()}
                  disabled={activeSlide === 0}
                >
                  <svg width={7} height={12} aria-hidden="true">
                    <use xlinkHref="#icon-arrow" />
                  </svg>
                </button>
                <button
                  className="slider-control slider-control--next"
                  type="button"
                  aria-label="Следующий слайд"
                  onClick={() => slider?.current?.slickNext()}
                  disabled={activeSlide >= (similarData.length - PRODUCTS_PER_SLIDER)}
                >
                  <svg width={7} height={12} aria-hidden="true">
                    <use xlinkHref="#icon-arrow" />
                  </svg>
                </button>
              </div>

            </div>
          </section>
        </div>
        <div className="page-content__section">
          <section className="review-block">
            <div className="container">
              <div className="page-content__headed">
                <h2 className="title title--h3">Отзывы</h2>
                <button
                  className="btn"
                  type="button"
                  onClick={() => setReviewModalActive(true)}
                >
                  Оставить свой отзыв
                </button>
              </div>
              <ul className="review-block__list">
                {slicedReviews?.map((it) => <Review data={it} key={it.id}/>)}
              </ul>
              {reviewsCount < reviewsData.length
                ?
                <div
                  className="review-block__buttons"
                  ref={ref}
                >
                  <button
                    className="btn btn--purple"
                    type="button"
                    onClick={() => setReviewsCount((prev) => prev + REVIEWS_COUNT)}
                  >
                    Показать больше отзывов
                  </button>
                </div>
                : ''}
            </div>
          </section>
        </div>
      </div>
      <button
        className="up-btn"
        onClick={() => {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
        }}
      >
        <svg width={12} height={18} aria-hidden="true">
          <use xlinkHref="#icon-arrow2" />
        </svg>
      </button>
      {reviewModalIsActive
        ?
        <FocusTrap>
          <div
            className="modal is-active"
            onKeyDown={handleEscKeydown}
            ref={reviewModalRef}
          >
            <div className="modal__wrapper">
              <div
                className="modal__overlay"
                onClick={handleCloseButtonClick}
              />
              <div className="modal__content">
                <p className="title title--h4">Оставить отзыв</p>
                <ReviewForm handleReviewsChange={handleReviewsChange}/>
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
      {successReviewModalIsActive
        ?
        <FocusTrap>
          <div
            className="modal is-active modal--narrow"
            onKeyDown={handleEscKeydown}
            ref={successReviewModalRef}
          >
            <div className="modal__wrapper">
              <div
                className="modal__overlay"
                onClick={handleCloseButtonClick}
              />
              <div className="modal__content">
                <p className="title title--h4">Спасибо за отзыв</p>
                <svg className="modal__icon" width={80} height={78} aria-hidden="true">
                  <use xlinkHref="#icon-review-success" />
                </svg>
                <div className="modal__buttons">
                  <button
                    className="btn btn--purple modal__btn modal__btn--fit-width"
                    type="button"
                    onClick={handleCloseButtonClick}
                  >
                  Вернуться к покупкам
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
      {modalIsActive
        ?
        <FocusTrap>
          <div
            className="modal is-active"
            ref={modalRef}
            onKeyDown={handleEscKeydown}
          >
            <div className="modal__wrapper">
              <div className="modal__overlay" onClick={handleCloseButtonClick} data-testid="overlay"/>
              <div className="modal__content">
                <p className="title title--h4">Добавить товар в корзину</p>
                <div className="basket-item basket-item--short">
                  <div className="basket-item__img">
                    <picture>
                      <source
                        type="image/webp"
                        srcSet={`${productData.previewImgWebp}, ${productData.previewImgWebp2x} 2x`}
                      />
                      <img
                        src={productData.previewImg}
                        srcSet={`${productData.previewImg2x} 2x`}
                        width={140}
                        height={120}
                        alt={productData.name}
                      />
                    </picture>
                  </div>
                  <div className="basket-item__description">
                    <p className="basket-item__title">{productData.name}</p>
                    <ul className="basket-item__list">
                      <li className="basket-item__list-item">
                        <span className="basket-item__article">Артикул:</span>{' '}
                        <span className="basket-item__number">{productData.vendorCode}</span>
                      </li>
                      <li className="basket-item__list-item">{productData.category}</li>
                      <li className="basket-item__list-item">{productData.level} уровень</li>
                    </ul>
                    <p className="basket-item__price">
                      <span className="visually-hidden">Цена:</span>{productData.price} ₽
                    </p>
                  </div>
                </div>
                <div className="modal__buttons">
                  <button
                    className="btn btn--purple modal__btn modal__btn--fit-width"
                    type="button"
                    onClick={handleAddButtonClick}
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
              <div className="modal__overlay" onClick={handleCloseButtonClick}></div>
              <div className="modal__content">
                <p className="title title--h4">Товар успешно добавлен в корзину</p>
                <svg className="modal__icon" width="86" height="80" aria-hidden="true">
                  <use xlinkHref="#icon-success"></use>
                </svg>
                <div className="modal__buttons">
                  <Link
                    className="btn btn--transparent modal__btn"
                    to={AppRoute.Root}
                  >
              Продолжить покупки
                  </Link>
                  <Link
                    className="btn btn--purple modal__btn modal__btn--fit-width"
                    to={AppRoute.Basket}
                  >
              Перейти в корзину
                  </Link>
                </div>
                <button
                  className="cross-btn"
                  type="button"
                  aria-label="Закрыть попап"
                  onClick={handleCloseButtonClick}
                >
                  <svg width="10" height="10" aria-hidden="true">
                    <use xlinkHref="#icon-close"></use>
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

export default Product;
