import React, { useEffect, useRef, useState, KeyboardEvent } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ProductCard from '../../components/product-card/product-card';
import StarsRating from '../../components/stars-rating/stars-rating';
import { AppRoute, INTERSECTION_DELAY, PRODUCTS_PER_SLIDER, REVIEWS_COUNT } from '../../constants';
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

const data: ProductType = {
  id: 1,
  name: 'Ретрокамера Dus Auge lV',
  vendorCode: 'DA4IU67AD5',
  type: 'Коллекционная',
  category: 'Видеокамера',
  description: 'Немецкий концерн BRW разработал видеокамеру Das Auge IV в начале 80-х годов, однако она до сих пор пользуется популярностью среди коллекционеров и яростных почитателей старинной техники. Вы тоже можете прикоснуться к волшебству аналоговой съёмки, заказав этот чудо-аппарат. Кто знает, может с Das Auge IV начнётся ваш путь к наградам всех престижных кинофестивалей.',
  previewImg: 'img/content/das-auge.jpg',
  level: 'Любительский',
  rating: 4,
  price: 73450,
  previewImg2x: 'img/content/das-auge@2x.jpg',
  previewImgWebp: 'img/content/das-auge.webp',
  previewImgWebp2x: 'img/content/das-auge@2x.webp',
  reviewCount: 10
};

const similar: ProductType[] = [
  {
    id: 5,
    name: 'Van Shot',
    vendorCode: 'YU7RT5GH76',
    type: 'Коллекционная',
    category: 'Видеокамера',
    description: 'Крайне редкое наименование не потеряло актуальность не смотря на сможество альтернатив. После съёмок на данную камеру фильм не стыдно показать в рамках кинофестиваля. Первые 4К настройки, высочайшее разрешение, уникальная цветопередача.',
    previewImg: 'img/content/van-shot.jpg',
    level: 'Профессиональный',
    rating: 5,
    price: 149990,
    previewImg2x: 'img/content/van-shot@2x.jpg',
    previewImgWebp: 'img/content/van-shot.webp',
    previewImgWebp2x: 'img/content/van-shot@2x.webp',
    reviewCount: 16
  },
  {
    id: 11,
    name: 'SP 520',
    vendorCode: 'JQ756',
    type: 'Коллекционная',
    category: 'Видеокамера',
    description: 'Делайте лучшие фильмы в высоком разрешении. Лёгкая в управлении, мощная начинка, реалистичная цветопередача, возможность просмотра отснятого материала через поворотный ЖК-экран и передача видео через систему Bluetooth.',
    previewImg: 'img/content/sp-520.jpg',
    level: 'Профессиональный',
    rating: 5,
    price: 105590,
    previewImg2x: 'img/content/sp-520@2x.jpg',
    previewImgWebp: 'img/content/sp-520.webp',
    previewImgWebp2x: 'img/content/sp-520@2x.webp',
    reviewCount: 14
  },
  {
    id: 33,
    name: 'Amazing Go',
    vendorCode: 'AD345J',
    type: 'Коллекционная',
    category: 'Видеокамера',
    description: 'Прикрепить камеру на шлем, сделать множество крутых видео под водой или записать свой полёт на тарзанке - благодаря усовершенствованной камере семейства Go ваши приключения останутся навсегда в памяти.',
    previewImg: 'img/content/amazing-go.jpg',
    level: 'Профессиональный',
    rating: 4,
    price: 79000,
    previewImg2x: 'img/content/amazing-go@2x.jpg',
    previewImgWebp: 'img/content/amazing-go.webp',
    previewImgWebp2x: 'img/content/amazing-go@2x.webp',
    reviewCount: 14
  },
  {
    id: 17,
    name: 'Look Identify',
    vendorCode: 'LD2000',
    type: 'Коллекционная',
    category: 'Фотоаппарат',
    description: 'Среднеформатная 40-мегапиксельная камера обладет уникальным непоторимым дизайном и ручной росписью корпуса. Ориентирована на студийную съёмку, имеет полный кадр --  35-мм сенсор ',
    previewImg: 'img/content/look-identify.jpg',
    level: 'Любительский',
    rating: 5,
    price: 126000,
    previewImg2x: 'img/content/look-identify@2x.jpg',
    previewImgWebp: 'img/content/look-identify.webp',
    previewImgWebp2x: 'img/content/look-identify@2x.webp',
    reviewCount: 0
  },
  {
    id: 12,
    name: 'Look Shot',
    vendorCode: 'NB569SH',
    type: 'Цифровая',
    category: 'Видеокамера',
    description: 'Гибридный автофокус и динамический стабилизатор по приятной цене. Светочувствительная матрица  без шумов. 8-кратный выездной зум в стильной упаковке.',
    previewImg: 'img/content/look-shot.jpg',
    level: 'Любительский',
    rating: 4,
    price: 18590,
    previewImg2x: 'img/content/look-shot@2x.jpg',
    previewImgWebp: 'img/content/look-shot.webp',
    previewImgWebp2x: 'img/content/look-shot@2x.webp',
    reviewCount: 14
  },
  {
    id: 19,
    name: 'Pro Look 4',
    vendorCode: 'PL4CD',
    type: 'Цифровая',
    category: 'Видеокамера',
    description: 'Камера для любителей запечатлеть каждый момент жизни! Слот для SD-карты и возможность смотреть свои записи сразу на TV.',
    previewImg: 'img/content/pro-look-4.jpg',
    level: 'Любительский',
    rating: 5,
    price: 34590,
    previewImg2x: 'img/content/pro-look-4@2x.jpg',
    previewImgWebp: 'img/content/pro-look-4.webp',
    previewImgWebp2x: 'img/content/pro-look-4@2x.webp',
    reviewCount: 3
  },
  {
    id: 20,
    name: 'Pro Look 56F',
    vendorCode: 'PL67T56F',
    type: 'Цифровая',
    category: 'Видеокамера',
    description: '6-кратный зум, чтобы выделить важные подробности. Простые настройки, ЖК-экран, лёгко помещается в руке - всегда можно брать с собой, Li-Ion аккамулятор.',
    previewImg: 'img/content/pro-look-56f.jpg',
    level: 'Любительский',
    rating: 3,
    price: 27990,
    previewImg2x: 'img/content/pro-look-56f@2x.jpg',
    previewImgWebp: 'img/content/pro-look-56f.webp',
    previewImgWebp2x: 'img/content/pro-look-56f@2x.webp',
    reviewCount: 10
  },
  {
    id: 26,
    name: 'GQ Lite',
    vendorCode: 'GO89L',
    type: 'Цифровая',
    category: 'Видеокамера',
    description: 'Небольшая, лёгкая камера с функционалом для начинающего режиссёра. Многократный зум, отличная матрица, усовершенствованный стабилизатор, возможность съёмки по принципц го-про. Для данной камеры можно приобрести водоатталкивающий чехол. а в комплекте штатив. ',
    previewImg: 'img/content/gq-lite.jpg',
    level: 'Любительский',
    rating: 5,
    price: 71900,
    previewImg2x: 'img/content/gq-lite@2x.jpg',
    previewImgWebp: 'img/content/gq-lite.webp',
    previewImgWebp2x: 'img/content/gq-lite@2x.webp',
    reviewCount: 8
  },
  {
    id: 27,
    name: 'Life Pro',
    vendorCode: 'PH67F9R',
    type: 'Коллекционная',
    category: 'Фотоаппарат',
    description: 'Фотокамера премиум класса, позволяет зависывать видео в качестве 4К, обладет 53-кратным зумом, поворотный ЖК-экран, улучшенная матрица, мощный процессор. Линейка выпущена в ограниченном количестве, даже без дополнительного объектива позволит создавать великолепный фотографии за один миг.',
    previewImg: 'img/content/life-pro.jpg',
    level: 'Профессиональный',
    rating: 5,
    price: 199000,
    previewImg2x: 'img/content/life-pro@2x.jpg',
    previewImgWebp: 'img/content/life-pro.webp',
    previewImgWebp2x: 'img/content/life-pro@2x.webp',
    reviewCount: 10
  }
];

const reviews: ReviewType[] = [
  {
    id: '426d46ed-4202-49b6-8b78-4cfdec71b3bd',
    userName: 'Кирилл',
    advantage: 'Рекомендую данный аппарат',
    disadvantage: 'Не рекомендую!',
    review: 'Приобрела камеру ориентируясь на отзывы, но выявила множество несоответствий. Цена не оправдала ожидания',
    rating: 2,
    createAt: '2022-11-15T21:00:06.945Z',
    cameraId: 1
  },
  {
    id: 'ffde46b0-6b53-4ac3-9e36-b99e14e841a8',
    userName: 'Ксения',
    advantage: 'Легкая в плане веса, удобная в интерфейсе, зарядка',
    disadvantage: 'Нет.',
    review: 'В целом для домашнего использования в самый раз!',
    rating: 2,
    createAt: '2022-09-07T21:00:06.960Z',
    cameraId: 1
  },
  {
    id: 'a53021c1-9282-4feb-9dec-12c199bc59af',
    userName: 'Анастасия',
    advantage: 'Цена соответствует качеству.',
    disadvantage: 'Тяжелая. Рука быстро устаёт',
    review: 'Это моя первая камера. Я в восторге, нареканий нет',
    rating: 5,
    createAt: '2022-08-04T21:00:06.960Z',
    cameraId: 1
  },
  {
    id: 'b0252c64-f382-4cea-b771-d264c7512ecd',
    userName: 'Дарья Артюхова',
    advantage: 'аовоаооа',
    disadvantage: 'алалалала',
    cameraId: 1,
    review: 'ккккккк',
    rating: 4,
    createAt: '2023-02-18T06:38:36.094Z'
  },
  {
    id: '8a2fc712-c381-405b-ba55-6e014125ab45',
    userName: 'Дарья Артюхова',
    advantage: 'аовоаооа',
    disadvantage: 'алалалала',
    cameraId: 1,
    review: 'eeeeee',
    rating: 3,
    createAt: '2023-02-18T06:41:53.725Z'
  },
  {
    id: 'd19a3fce-588d-4b56-b5b9-bb4c240061a2',
    rating: 4,
    cameraId: 1,
    userName: 'Вася',
    advantage: 'Все хорошо',
    disadvantage: 'Нет',
    review: 'Все отлично',
    createAt: '2023-02-18T15:18:43.666Z'
  },
  {
    id: '31225948-b9c6-4f1f-b5df-7fa3e6e8d8f9',
    userName: 'Ксения',
    advantage: 'Покупали недавно. Пока нареканий нет.',
    disadvantage: 'Тяжелая. Рука быстро устаёт',
    review: 'Отличная камера. Великолепные снимки, проста в управлении. Полностью оправдывает стоимость',
    rating: 2,
    createAt: '2023-01-13T21:00:06.286Z',
    cameraId: 3
  },
  {
    id: 'e5a3708f-937f-4fb8-a361-c5e43ef63c0f',
    userName: 'Александр',
    advantage: 'Легкая в плане веса, удобная в интерфейсе, зарядка',
    disadvantage: 'Нет.',
    review: 'Это моя первая камера. Я в восторге, нареканий нет',
    rating: 3,
    createAt: '2023-01-15T21:00:06.286Z',
    cameraId: 3
  },
  {
    id: '09cc47f7-f7e8-4c04-b0b7-a436c2bb0321',
    userName: 'Дарья',
    advantage: 'Легкая в плане веса, удобная в интерфейсе, зарядка',
    disadvantage: 'Не рекомендую!',
    review: 'Не возможно найти дополнительные аккамуляторы. К сожалению, те, что идут в комплекте не держут более 7 часов?',
    rating: 1,
    createAt: '2023-01-12T21:00:06.286Z',
    cameraId: 3
  },
  {
    id: '5f6d10c6-aad0-44d4-8207-a43249d66991',
    userName: 'Александр',
    advantage: 'Цена соответствует качеству.',
    disadvantage: 'Без объектива',
    review: 'Это моя первая камера. Я в восторге, нареканий нет',
    rating: 3,
    createAt: '2022-10-18T21:00:06.286Z',
    cameraId: 3
  },
  {
    id: '1df94e5e-b476-47c5-8767-37720600ad64',
    userName: 'Ольга',
    advantage: 'Смущает цена',
    disadvantage: 'Плохая камера, не рекомендую',
    review: 'Подарила сыну на первое сентября прошлого года. Пришла целой. Для начала камера хорошая.',
    rating: 4,
    createAt: '2022-08-13T21:00:06.286Z',
    cameraId: 3
  },
  {
    id: '95d24d9d-7bb2-4de0-8cd7-163010c5de05',
    userName: 'Ксения',
    advantage: 'Недорогая, за такую цену отличный вариант.',
    disadvantage: 'Пришла поврежденная упаковка. Нет теперь понимая со внутренностями',
    review: 'Подарила сыну на первое сентября прошлого года. Пришла целой. Для начала камера хорошая.',
    rating: 4,
    createAt: '2022-11-15T21:00:06.286Z',
    cameraId: 3
  },
  {
    id: '1556edee-e4b7-4d9f-8b2d-1a2a182a99eb',
    userName: 'Дарья',
    advantage: 'Недорогая, за такую цену отличный вариант.',
    disadvantage: 'Странные звуки при переключении режимов',
    review: 'Камера для начинающих, самое то. Но урезанный комплект и многое придётся докупать',
    rating: 3,
    createAt: '2022-10-18T21:00:06.286Z',
    cameraId: 3
  },
  {
    id: '0ef52048-605a-4421-9e6f-82e672ea6a0d',
    userName: 'Павел',
    advantage: 'Легкая в плане веса, удобная в интерфейсе, зарядка',
    disadvantage: 'Не удобный интерфейс и кнопки',
    review: 'В целом для домашнего использования в самый раз!',
    rating: 4,
    createAt: '2022-12-16T21:00:06.286Z',
    cameraId: 3
  },
  {
    id: 'b561fc00-1ddf-437d-92c0-2b514c2be20e',
    userName: 'Ольга',
    advantage: 'Недорогая, за такую цену отличный вариант.',
    disadvantage: 'Плохая камера, не рекомендую',
    review: 'Камера для начинающих, самое то. Но урезанный комплект и многое придётся докупать',
    rating: 5,
    createAt: '2022-09-08T21:00:06.286Z',
    cameraId: 3
  },
  {
    id: '1937dcde-e87c-40bf-8433-1b09dcc6021f',
    userName: 'Анастасия',
    advantage: 'Смущает цена',
    disadvantage: 'Странные звуки при переключении режимов',
    review: 'Хорошая камера. Лучше за эти деньги не найти.',
    rating: 2,
    createAt: '2023-02-04T21:00:06.286Z',
    cameraId: 3
  },
  {
    id: '5aebfdfc-5f08-43f2-a28a-f4170e6750d1',
    userName: 'Анастасия',
    advantage: 'Смущает цена',
    disadvantage: 'Плохая камера, не рекомендую',
    review: 'Отличная камера. Великолепные снимки, проста в управлении. Полностью оправдывает стоимость',
    rating: 4,
    createAt: '2023-01-04T21:00:06.286Z',
    cameraId: 3
  },
  {
    id: '80ae485b-2370-401d-9c3e-d4bd1fa36dd4',
    userName: 'Дарья',
    advantage: 'Недорогая, за такую цену отличный вариант.',
    disadvantage: 'Не рекомендую!',
    review: 'Приобрела камеру ориентируясь на отзывы, но выявила множество несоответствий. Цена не оправдала ожидания',
    rating: 2,
    createAt: '2023-01-10T21:00:06.286Z',
    cameraId: 3
  }
];

function Product() {

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

  const navigate = useNavigate();


  const [reviewModalIsActive, setReviewModalActive] = useState<boolean>(false);
  const [successModalIsActive, setSuccessModalIsActive] = useState<boolean>(false);


  const reviewModalRef = useRef(null);
  const successModalRef = useRef(null);

  useEffect(() => {
    if (reviewModalRef.current) {
      disableBodyScroll(reviewModalRef.current);
    } else if (successModalRef.current) {
      disableBodyScroll(successModalRef.current);
    } else {
      clearAllBodyScrollLocks();
    }
    return () => {
      clearAllBodyScrollLocks();
    };
  }, [reviewModalIsActive, successModalIsActive]);


  const closeReviewModal = () => {
    setReviewModalActive(false);
  };

  const closeSuccessModal = () => {
    setSuccessModalIsActive(false);
  };

  const handleEscKeydown = (evt: KeyboardEvent<HTMLDivElement>) => {
    if(evt.key === 'Escape') {
      closeReviewModal();
      closeSuccessModal();
    }
  };

  const handleReviewsChange = (newReview: ReviewType): void => {
    closeReviewModal();
    // setOfferData({
    //   ...offerData,
    //   comments: newComments
    // });

    setSuccessModalIsActive(true);
  };


  // TODO добавить хендлер кнопки покупки
  const handleBuyButtonClick = () => null;


  const [reviewsCount, setReviewsCount] = useState(REVIEWS_COUNT);
  const slicedReviews = reviews.slice(0, reviewsCount);

  const { ref, inView } = useInView({
    threshold: 1,
    delay: INTERSECTION_DELAY
  });

  useEffect(() => {
    if (inView) {
      setReviewsCount((prev) => prev + REVIEWS_COUNT);
    }
  }, [inView]);

  return (
    <>
      <Helmet>
        <title>{data.name}</title>
      </Helmet>
      <div className="page-content">
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
                  {data.name}
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
                    srcSet={`${data.previewImgWebp}, ${data.previewImgWebp2x} 2x`}
                  />
                  <img
                    src={data.previewImg}
                    srcSet={`${data.previewImg2x} 2x`}
                    width={560}
                    height={480}
                    alt={data.name}
                  />
                </picture>
              </div>
              <div className="product__content">
                <h1 className="title title--h3">{data.name}</h1>
                <div className="rate product__rate">
                  <StarsRating rating={data.rating}/>
                  <p className="visually-hidden">Рейтинг: {data.rating}</p>
                  <p className="rate__count">
                    <span className="visually-hidden">Всего оценок:</span>{data.reviewCount}
                  </p>
                </div>
                <p className="product__price">
                  <span className="visually-hidden">Цена:</span>{data.price} ₽
                </p>

                {/* TODO добавить хендлер */}
                <button className="btn btn--purple" type="button">
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
                        navigate(`${AppRoute.Product}/${data.id}/${AppRoute.Characteristics}`);
                      }}
                    >
                    Характеристики
                    </button>
                    <button
                      className={`tabs__control ${descriptionTabIsActive ? 'is-active' : ''}`} type="button"
                      onClick={() => {
                        setDescriptionTabIsActive(true);
                        navigate(`${AppRoute.Product}/${data.id}/${AppRoute.Description}`);
                      }}
                    >
                    Описание
                    </button>
                  </div>
                  <div className="tabs__content">
                    <div className={`tabs__element ${!descriptionTabIsActive ? 'is-active' : ''}`}>
                      <ul className="product__tabs-list">
                        <li className="item-list">
                          <span className="item-list__title">Артикул:</span>
                          <p className="item-list__text"> {data.vendorCode}</p>
                        </li>
                        <li className="item-list">
                          <span className="item-list__title">Категория:</span>
                          <p className="item-list__text">{data.category}</p>
                        </li>
                        <li className="item-list">
                          <span className="item-list__title">Тип камеры:</span>
                          <p className="item-list__text">{data.type}</p>
                        </li>
                        <li className="item-list">
                          <span className="item-list__title">Уровень:</span>
                          <p className="item-list__text">{data.level}</p>
                        </li>
                      </ul>
                    </div>
                    <div className={`tabs__element ${descriptionTabIsActive ? 'is-active' : ''}`}>
                      <div className="product__tabs-text">
                        <p>
                          {data.description}
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
                    {similar.map((it) => <ProductCard data={it} key={it.id} handleBuyButtonClick={handleBuyButtonClick}/>)}
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
                  disabled={activeSlide >= (similar.length - PRODUCTS_PER_SLIDER)}
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
                {slicedReviews.map((it) => <Review data={it} key={it.id}/>)}
              </ul>
              {reviewsCount < reviews.length
                ?
                <div className="review-block__buttons" ref={ref}>
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
                onClick={closeReviewModal}
              />
              <div className="modal__content">
                <p className="title title--h4">Оставить отзыв</p>
                <ReviewForm handleReviewsChange={handleReviewsChange}/>
                <button
                  className="cross-btn"
                  type="button"
                  aria-label="Закрыть попап"
                  onClick={closeReviewModal}
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
            onKeyDown={handleEscKeydown}
            ref={successModalRef}
          >
            <div className="modal__wrapper">
              <div
                className="modal__overlay"
                onClick={closeSuccessModal}
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
                    onClick={closeSuccessModal}
                  >
                  Вернуться к покупкам
                  </button>
                </div>
                <button
                  className="cross-btn"
                  type="button"
                  aria-label="Закрыть попап"
                  onClick={closeSuccessModal}
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

export default Product;
