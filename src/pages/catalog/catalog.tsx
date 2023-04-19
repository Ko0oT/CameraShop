import { useEffect, useMemo, useState, useRef, ChangeEvent, KeyboardEvent } from 'react';
import Banner from '../../components/banner/banner';
import Pagination from '../../components/pagination/pagination';
import ProductCard from '../../components/product-card/product-card';
import { AppRoute, CameraCategory, CameraFilterFields, CameraLevel, CameraType, PRODUCTS_PER_PAGE, SortDirection, SortType } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCurrentPage, getIsNeedToUpdate } from '../../store/app-process/app-process-selectors';
import { Filter, Price, Product } from '../../types/types';
import { setCurrentPage, setNeedToUpdate } from '../../store/app-process/app-process-slice';
import { Link, useSearchParams } from 'react-router-dom';
import { filterCamerasByOtherOptions, filterCamerasByPrice, findMinAndMaxPrice, getPageNumbers, sortCameras } from '../../utils/utils';
import { Helmet } from 'react-helmet-async';
import { getCameras } from '../../store/app-data/app-data-selectors';
import FocusTrap from 'focus-trap-react';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { addCameraInBasket } from '../../store/app-data/app-data-slice';


function Catalog() {

  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const priceQuery = searchParams.get('price') || '';
    const filterQuery = searchParams.get('filter') || '';
    const sortTypeQuery = searchParams.get('sortType') || '';
    const sortDirectionQuery = searchParams.get('sortDirection') || '';
    const pageIdQuery = searchParams.get('pageId') || '';

    if(priceQuery) {
      setPrice(JSON.parse(priceQuery) as Price);
    }
    if(filterQuery) {
      setFilter(JSON.parse(filterQuery) as Filter);
    }
    if(sortTypeQuery) {
      setSortType(sortTypeQuery as SortType);
    }
    if(sortDirectionQuery) {
      setSortDirection(sortDirectionQuery as SortDirection);
    }
    if(pageIdQuery) {
      dispatch(setCurrentPage(Number(pageIdQuery)));
    }

  }, []);


  const allCameras = useAppSelector(getCameras);

  const currentPage = useAppSelector(getCurrentPage);
  const [sortType, setSortType] = useState(SortType.Default);
  const [sortDirection, setSortDirection] = useState(SortDirection.Default);
  const initialPriceState: Price = {
    minPrice: '',
    maxPrice: '',
  };
  const [price, setPrice] = useState(initialPriceState);
  const initialFilterState: Filter = {
    [CameraFilterFields.Category]: [],
    [CameraFilterFields.Type]: [],
    [CameraFilterFields.Level]: [],
  };
  const [filter, setFilter] = useState(initialFilterState);


  const [cameras, setCameras] = useState(allCameras);

  const [filteredCamerasForPlaceholder, setFilteredCamerasForPlaceholder] = useState(allCameras);

  const [minCatalogPrice, maxCatalogPrice] = useMemo(() => findMinAndMaxPrice(filteredCamerasForPlaceholder), [filteredCamerasForPlaceholder]);

  const isNeedToUpdate = useAppSelector(getIsNeedToUpdate);

  useEffect(() => {
    if(isNeedToUpdate) {
      setSortType(SortType.Default);
      setSortDirection(SortDirection.Default);
      setPrice(initialPriceState);
      setFilter(initialFilterState);
      dispatch(setNeedToUpdate(false));
    }
  }, [isNeedToUpdate]);


  useEffect(() => {
    const filteredCamerasByPrice = filterCamerasByPrice(allCameras, price);
    const filteredCameras = filterCamerasByOtherOptions(filteredCamerasByPrice, filter);

    if (filteredCameras.length !== 0) {
      setFilteredCamerasForPlaceholder(filteredCameras);
    }

    const sortedCams = sortCameras(filteredCameras, sortType, sortDirection);

    setSearchParams({sortType: sortType, sortDirection: sortDirection, price: JSON.stringify(price), filter: JSON.stringify(filter), pageId: String(currentPage)});

    if(JSON.stringify(filter) !== searchParams.get('filter') || JSON.stringify(price) !== searchParams.get('price')) {
      dispatch(setCurrentPage(1));
    }

    setCameras(sortedCams);
  }, [sortType, sortDirection, filter, price, currentPage]);


  const pagesCount = Math.ceil(cameras?.length / PRODUCTS_PER_PAGE);
  const pageNumbers: number[] = useMemo(() => getPageNumbers(pagesCount), [pagesCount]);

  const lastProductIndex = currentPage * PRODUCTS_PER_PAGE;
  const firstProductIndex = lastProductIndex - PRODUCTS_PER_PAGE;
  const currentProducts = cameras.slice(firstProductIndex, lastProductIndex);


  const [modalIsActive, setModalActive] = useState<boolean>(false);
  const [successModalIsActive, setSuccessModalIsActive] = useState<boolean>(false);
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

  const handleBuyButtonClick = (data: Product) => {
    setModalActive(true);
    setSelectedProduct(data);
  };

  const handleCloseButtonClick = () => {
    if (modalIsActive) {
      setModalActive(false);
    }
    if (successModalIsActive) {
      setSuccessModalIsActive(false);
    }
  };

  const handleAddButtonClick = () => {
    setModalActive(false);
    dispatch(addCameraInBasket(selectedProduct.id));
    setSuccessModalIsActive(true);
  };

  const handleEscKeydown = (evt: KeyboardEvent<HTMLDivElement>) => {
    if(evt.key === 'Escape') {
      handleCloseButtonClick();
    }
  };


  function handleFilterChange({target: {name, id}}: ChangeEvent<HTMLInputElement>) {

    if(id === CameraFilterFields.Category) {
      const currentIndex = filter.category.indexOf(name as CameraCategory);
      if(currentIndex === -1) {
        setFilter((prev) => ({...prev, category: [name as CameraCategory]}));
      } else {
        setFilter((prev) => ({...prev, category: []}));
      }
      return;
    }

    const currentIndex = filter[id as keyof Filter].indexOf(name as never);
    const newChecked = [...filter[id as keyof Filter]];

    if(currentIndex === -1) {
      newChecked.push(name as never);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setFilter((prev) => ({...prev, [id]: newChecked}));
  }


  return (
    <>
      <Helmet>
        <title>Каталог - Фотошоп</title>
      </Helmet>
      <Banner />
      <div className="page-content">
        <div className="breadcrumbs">
          <div className="container">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link
                  className="breadcrumbs__link"
                  to={AppRoute.Root}
                  onClick={() => {
                    dispatch(setNeedToUpdate(true));
                  }}
                >
                Главная
                  <svg width={5} height={8} aria-hidden="true">
                    <use xlinkHref="#icon-arrow-mini" />
                  </svg>
                </Link>
              </li>
              <li className="breadcrumbs__item">
                <span className="breadcrumbs__link breadcrumbs__link--active">
                Каталог
                </span>
              </li>
            </ul>
          </div>
        </div>
        <section className="catalog">
          <div className="container">
            <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
            <div className="page-content__columns">
              <div className="catalog__aside">
                <div className="catalog-filter">
                  <form action="#" autoComplete='off'>
                    <h2 className="visually-hidden">Фильтр</h2>
                    <fieldset className="catalog-filter__block">
                      <legend className="title title--h5">Цена, ₽</legend>
                      <div className="catalog-filter__price-range">
                        <div className="custom-input">
                          <label>
                            <input
                              type="number"
                              name="price"
                              placeholder={String(minCatalogPrice)}
                              onChange={(evt) => {
                                if (Number(evt.target.value) === 0) {
                                  setPrice((prev) => ({...prev, minPrice: ''}));
                                  return;
                                }
                                setPrice((prev) => ({...prev, minPrice: Number(evt.target.value)}));
                              }}
                              onBlur={(evt) => {
                                if (Number(evt.target.value) < minCatalogPrice && price.minPrice !== '') {
                                  setPrice((prev) => ({...prev, minPrice: minCatalogPrice}));
                                }
                                if (price.maxPrice && Number(evt.target.value) > price.maxPrice) {
                                  setPrice((prev) => ({...prev, minPrice: prev.maxPrice}));
                                  return;
                                }
                                if (Number(evt.target.value) > maxCatalogPrice) {
                                  setPrice((prev) => ({...prev, minPrice: maxCatalogPrice}));
                                }
                              }}
                              value={price.minPrice}
                              min={0}
                            />
                          </label>
                        </div>
                        <div className="custom-input">
                          <label>
                            <input
                              type="number"
                              name="priceUp"
                              placeholder={String(maxCatalogPrice)}
                              onChange={(evt) => {
                                if (Number(evt.target.value) === 0) {
                                  setPrice((prev) => ({...prev, maxPrice: ''}));
                                  return;
                                }
                                setPrice((prev) => ({...prev, maxPrice: Number(evt.target.value)}));
                              }}
                              onBlur={(evt) => {
                                if (Number(evt.target.value) > maxCatalogPrice) {
                                  setPrice((prev) => ({...prev, maxPrice: maxCatalogPrice}));
                                  return;
                                }
                                if (price.minPrice && Number(evt.target.value) < price.minPrice && price.maxPrice !== '') {
                                  setPrice((prev) => ({...prev, maxPrice: prev.minPrice}));
                                  return;
                                }
                                if (Number(evt.target.value) < minCatalogPrice && price.maxPrice !== '') {
                                  setPrice((prev) => ({...prev, maxPrice: minCatalogPrice}));
                                }
                              }}
                              value={price.maxPrice}
                              min={0}
                            />
                          </label>
                        </div>
                      </div>
                    </fieldset>
                    <fieldset className="catalog-filter__block">
                      <legend className="title title--h5">Категория</legend>
                      <div className="custom-checkbox catalog-filter__item">
                        <label>
                          <input
                            type="checkbox"
                            name={CameraCategory.Photo}
                            id={CameraFilterFields.Category}
                            checked={filter.category.includes(CameraCategory.Photo)}
                            onChange={handleFilterChange}
                          />
                          <span className="custom-checkbox__icon" />
                          <span className="custom-checkbox__label">
                          Фотокамера
                          </span>
                        </label>
                      </div>
                      <div className="custom-checkbox catalog-filter__item">
                        <label>
                          <input
                            type="checkbox"
                            name={CameraCategory.Video}
                            id={CameraFilterFields.Category}
                            checked={filter.category.includes(CameraCategory.Video)}
                            onChange={handleFilterChange}
                            disabled={filter.type.includes(CameraType.Film) || filter.type.includes(CameraType.Snapshot)}
                          />
                          <span className="custom-checkbox__icon" />
                          <span className="custom-checkbox__label">
                          Видеокамера
                          </span>
                        </label>
                      </div>
                    </fieldset>
                    <fieldset className="catalog-filter__block">
                      <legend className="title title--h5">Тип камеры</legend>
                      <div className="custom-checkbox catalog-filter__item">
                        <label>
                          <input
                            type="checkbox"
                            name={CameraType.Digital}
                            id={CameraFilterFields.Type}
                            onChange={handleFilterChange}
                            checked={filter.type.includes(CameraType.Digital)}
                          />
                          <span className="custom-checkbox__icon" />
                          <span className="custom-checkbox__label">Цифровая</span>
                        </label>
                      </div>
                      <div className="custom-checkbox catalog-filter__item">
                        <label>
                          <input
                            type="checkbox"
                            name={CameraType.Film}
                            id={CameraFilterFields.Type}
                            onChange={handleFilterChange}
                            disabled={filter.category.includes(CameraCategory.Video)}
                            checked={filter.type.includes(CameraType.Film)}
                          />
                          <span className="custom-checkbox__icon" />
                          <span className="custom-checkbox__label">
                          Плёночная
                          </span>
                        </label>
                      </div>
                      <div className="custom-checkbox catalog-filter__item">
                        <label>
                          <input
                            type="checkbox"
                            name={CameraType.Snapshot}
                            id={CameraFilterFields.Type}
                            onChange={handleFilterChange}
                            disabled={filter.category.includes(CameraCategory.Video)}
                            checked={filter.type.includes(CameraType.Snapshot)}
                          />
                          <span className="custom-checkbox__icon" />
                          <span className="custom-checkbox__label">
                          Моментальная
                          </span>
                        </label>
                      </div>
                      <div className="custom-checkbox catalog-filter__item">
                        <label>
                          <input
                            type="checkbox"
                            name={CameraType.Collection}
                            id={CameraFilterFields.Type}
                            onChange={handleFilterChange}
                            checked={filter.type.includes(CameraType.Collection)}
                          />
                          <span className="custom-checkbox__icon" />
                          <span className="custom-checkbox__label">
                          Коллекционная
                          </span>
                        </label>
                      </div>
                    </fieldset>
                    <fieldset className="catalog-filter__block">
                      <legend className="title title--h5">Уровень</legend>
                      <div className="custom-checkbox catalog-filter__item">
                        <label>
                          <input
                            type="checkbox"
                            name={CameraLevel.Zero}
                            id={CameraFilterFields.Level}
                            onChange={handleFilterChange}
                            checked={filter.level.includes(CameraLevel.Zero)}
                          />
                          <span className="custom-checkbox__icon" />
                          <span className="custom-checkbox__label">Нулевой</span>
                        </label>
                      </div>
                      <div className="custom-checkbox catalog-filter__item">
                        <label>
                          <input
                            type="checkbox"
                            name={CameraLevel.Amateur}
                            id={CameraFilterFields.Level}
                            onChange={handleFilterChange}
                            checked={filter.level.includes(CameraLevel.Amateur)}
                          />
                          <span className="custom-checkbox__icon" />
                          <span className="custom-checkbox__label">
                          Любительский
                          </span>
                        </label>
                      </div>
                      <div className="custom-checkbox catalog-filter__item">
                        <label>
                          <input
                            type="checkbox"
                            name={CameraLevel.Professional}
                            id={CameraFilterFields.Level}
                            onChange={handleFilterChange}
                            checked={filter.level.includes(CameraLevel.Professional)}
                          />
                          <span className="custom-checkbox__icon" />
                          <span className="custom-checkbox__label">
                          Профессиональный
                          </span>
                        </label>
                      </div>
                    </fieldset>
                    <button
                      className="btn catalog-filter__reset-btn"
                      type="reset"
                      onClick={() => {
                        setFilter(initialFilterState);
                        setPrice(initialPriceState);
                      }}
                    >
                    Сбросить фильтры
                    </button>
                  </form>
                </div>
              </div>
              <div className="catalog__content">
                <div className="catalog-sort">
                  <form action="#">
                    <div className="catalog-sort__inner">
                      <p className="title title--h5">Сортировать:</p>
                      <div className="catalog-sort__type">
                        <div className="catalog-sort__btn-text">
                          <input
                            type="radio"
                            id="sortPrice"
                            name="sort"
                            checked={sortType === SortType.Price}
                            onChange={() => {
                              if(sortDirection === SortDirection.Default) {
                                setSortDirection(SortDirection.Ascending);
                              }
                              setSortType(SortType.Price);
                            }}
                          />
                          <label htmlFor="sortPrice">по цене</label>
                        </div>
                        <div className="catalog-sort__btn-text">
                          <input
                            type="radio"
                            id="sortPopular"
                            name="sort"
                            checked={sortType === SortType.Rating}
                            onChange={() => {
                              if(sortDirection === SortDirection.Default) {
                                setSortDirection(SortDirection.Ascending);
                              }
                              setSortType(SortType.Rating);
                            }}
                          />
                          <label htmlFor="sortPopular">по популярности</label>
                        </div>
                      </div>
                      <div className="catalog-sort__order">
                        <div className="catalog-sort__btn catalog-sort__btn--up">
                          <input
                            type="radio"
                            id="up"
                            name="sort-icon"
                            checked={sortDirection === SortDirection.Ascending}
                            aria-label="По возрастанию"
                            onChange={() => {
                              if(sortType === SortType.Default) {
                                setSortType(SortType.Price);
                              }
                              setSortDirection(SortDirection.Ascending);
                            }}
                          />
                          <label htmlFor="up">
                            <svg width={16} height={14} aria-hidden="true">
                              <use xlinkHref="#icon-sort" />
                            </svg>
                          </label>
                        </div>
                        <div className="catalog-sort__btn catalog-sort__btn--down">
                          <input
                            type="radio"
                            id="down"
                            name="sort-icon"
                            aria-label="По убыванию"
                            checked={sortDirection === SortDirection.Descending}
                            onChange={() => {
                              if(sortType === SortType.Default) {
                                setSortType(SortType.Price);
                              }
                              setSortDirection(SortDirection.Descending);
                            }}
                          />
                          <label htmlFor="down">
                            <svg width={16} height={14} aria-hidden="true">
                              <use xlinkHref="#icon-sort" />
                            </svg>
                          </label>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                {currentProducts.length >= 1
                  ?
                  <>
                    <div className="cards catalog__cards">
                      {currentProducts.map((it) => <ProductCard data={it} key={it.id} handleBuyButtonClick={handleBuyButtonClick}/>)}
                    </div>
                    <Pagination pagesCount={pagesCount} pageNumbers={pageNumbers}/>
                  </>
                  :
                  <p style={{fontSize: 30, marginTop: 50}}>По вашему запросу ничего не найдено</p>}
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
              <div className="modal__overlay" onClick={handleCloseButtonClick} data-testid="overlay"/>
              <div className="modal__content">
                <p className="title title--h4">Добавить товар в корзину</p>
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
                      <li className="basket-item__list-item">{selectedProduct.category}</li>
                      <li className="basket-item__list-item">{selectedProduct.level} уровень</li>
                    </ul>
                    <p className="basket-item__price">
                      <span className="visually-hidden">Цена:</span>{selectedProduct.price} ₽
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
                  <button
                    className="btn btn--transparent modal__btn"
                    onClick={handleCloseButtonClick}
                  >
              Продолжить покупки
                  </button>
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

export default Catalog;
