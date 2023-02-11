import React, { useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/product-card/product-card';
import StarsRating from '../../components/stars-rating/stars-rating';
import { AppRoute, PRODUCTS_PER_SLIDER } from '../../constants';
import { Product as ProductType } from '../../types/types';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import './product.css';

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

  //TODO: показать модальное окно.
  // const [modalIsActive, setModalActive] = useState<boolean>(false);
  const handleBuyButtonClick = () => null;

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

                {/* При выборе продукта каждая вкладка — таб имеет свой уникальный URL с сохранением текстовой информации. */}
                <div className="tabs product__tabs">
                  <div className="tabs__controls product__tabs-controls">
                    <button
                      className={`tabs__control ${!descriptionTabIsActive ? 'is-active' : ''}`} type="button"
                      onClick={() => setDescriptionTabIsActive(false)}
                    >
                    Характеристики
                    </button>
                    <button
                      className={`tabs__control ${descriptionTabIsActive ? 'is-active' : ''}`} type="button"
                      onClick={() => setDescriptionTabIsActive(true)}
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
                <button className="btn" type="button">
                Оставить свой отзыв
                </button>
              </div>
              <ul className="review-block__list">
                <li className="review-card">
                  <div className="review-card__head">
                    <p className="title title--h4">Сергей Горский</p>
                    <time className="review-card__data" dateTime="2022-04-13">
                    13 апреля
                    </time>
                  </div>
                  <div className="rate review-card__rate">
                    <svg width={17} height={16} aria-hidden="true">
                      <use xlinkHref="#icon-full-star" />
                    </svg>
                    <svg width={17} height={16} aria-hidden="true">
                      <use xlinkHref="#icon-full-star" />
                    </svg>
                    <svg width={17} height={16} aria-hidden="true">
                      <use xlinkHref="#icon-full-star" />
                    </svg>
                    <svg width={17} height={16} aria-hidden="true">
                      <use xlinkHref="#icon-full-star" />
                    </svg>
                    <svg width={17} height={16} aria-hidden="true">
                      <use xlinkHref="#icon-full-star" />
                    </svg>
                    <p className="visually-hidden">Оценка: 5</p>
                  </div>
                  <ul className="review-card__list">
                    <li className="item-list">
                      <span className="item-list__title">Достоинства:</span>
                      <p className="item-list__text">
                      Надёжная, хорошо лежит в руке, необычно выглядит
                      </p>
                    </li>
                    <li className="item-list">
                      <span className="item-list__title">Недостатки:</span>
                      <p className="item-list__text">
                      Тяжеловата, сложно найти плёнку
                      </p>
                    </li>
                    <li className="item-list">
                      <span className="item-list__title">Комментарий:</span>
                      <p className="item-list__text">
                      Раз в полгода достаю из-под стекла, стираю пыль, заряжаю —
                      работает как часы. Ни у кого из знакомых такой нет, все
                      завидуют) Теперь это жемчужина моей коллекции, однозначно
                      стоит своих денег!
                      </p>
                    </li>
                  </ul>
                </li>
                <li className="review-card">
                  <div className="review-card__head">
                    <p className="title title--h4">Пётр Матросов</p>
                    <time className="review-card__data" dateTime="2022-03-02">
                    2 марта
                    </time>
                  </div>
                  <div className="rate review-card__rate">
                    <svg width={17} height={16} aria-hidden="true">
                      <use xlinkHref="#icon-full-star" />
                    </svg>
                    <svg width={17} height={16} aria-hidden="true">
                      <use xlinkHref="#icon-star" />
                    </svg>
                    <svg width={17} height={16} aria-hidden="true">
                      <use xlinkHref="#icon-star" />
                    </svg>
                    <svg width={17} height={16} aria-hidden="true">
                      <use xlinkHref="#icon-star" />
                    </svg>
                    <svg width={17} height={16} aria-hidden="true">
                      <use xlinkHref="#icon-star" />
                    </svg>
                    <p className="visually-hidden">Оценка: 1</p>
                  </div>
                  <ul className="review-card__list">
                    <li className="item-list">
                      <span className="item-list__title">Достоинства:</span>
                      <p className="item-list__text">Хорошее пресс-папье</p>
                    </li>
                    <li className="item-list">
                      <span className="item-list__title">Недостатки:</span>
                      <p className="item-list__text">
                      Через 3 дня развалилась на куски
                      </p>
                    </li>
                    <li className="item-list">
                      <span className="item-list__title">Комментарий:</span>
                      <p className="item-list__text">
                      При попытке вставить плёнку сломался механизм открытия
                      отсека, пришлось заклеить его изолентой. Начал настраивать
                      фокус&nbsp;— линза провалилась внутрь корпуса. Пока
                      доставал — отломилось несколько лепестков диафрагмы. От
                      злости стукнул камеру об стол, и рукоятка треснула
                      пополам. Склеил всё суперклеем, теперь прижимаю ей бумагу.
                      НЕ РЕКОМЕНДУЮ!!!
                      </p>
                    </li>
                  </ul>
                </li>
                <li className="review-card">
                  <div className="review-card__head">
                    <p className="title title--h4">Татьяна Кузнецова </p>
                    <time className="review-card__data" dateTime="2021-12-30">
                    30 декабря
                    </time>
                  </div>
                  <div className="rate review-card__rate">
                    <svg width={17} height={16} aria-hidden="true">
                      <use xlinkHref="#icon-full-star" />
                    </svg>
                    <svg width={17} height={16} aria-hidden="true">
                      <use xlinkHref="#icon-full-star" />
                    </svg>
                    <svg width={17} height={16} aria-hidden="true">
                      <use xlinkHref="#icon-full-star" />
                    </svg>
                    <svg width={17} height={16} aria-hidden="true">
                      <use xlinkHref="#icon-full-star" />
                    </svg>
                    <svg width={17} height={16} aria-hidden="true">
                      <use xlinkHref="#icon-star" />
                    </svg>
                    <p className="visually-hidden">Оценка: 4</p>
                  </div>
                  <ul className="review-card__list">
                    <li className="item-list">
                      <span className="item-list__title">Достоинства:</span>
                      <p className="item-list__text">Редкая</p>
                    </li>
                    <li className="item-list">
                      <span className="item-list__title">Недостатки:</span>
                      <p className="item-list__text">Высокая цена</p>
                    </li>
                    <li className="item-list">
                      <span className="item-list__title">Комментарий:</span>
                      <p className="item-list__text">
                      Дорого для портативной видеокамеры, но в моей коллекции
                      как раз не хватало такого экземпляра. Следов использования
                      нет, доставили в заводской упаковке, выглядит шикарно!
                      </p>
                    </li>
                  </ul>
                </li>
              </ul>
              <div className="review-block__buttons">
                <button className="btn btn--purple" type="button">
                Показать больше отзывов
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
      <a className="up-btn" href="#header">
        <svg width={12} height={18} aria-hidden="true">
          <use xlinkHref="#icon-arrow2" />
        </svg>
      </a>
    </>
  );
}

export default Product;
