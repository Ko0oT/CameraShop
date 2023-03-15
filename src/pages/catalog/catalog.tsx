import { useEffect, useMemo, useState } from 'react';
import Banner from '../../components/banner/banner';
import Pagination from '../../components/pagination/pagination';
import ProductCard from '../../components/product-card/product-card';
import { AppRoute, PRODUCTS_PER_PAGE, SortDirection, SortType } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCurrentPage, getCurrentSortDirection, getCurrentSortType } from '../../store/app-process/app-process-selectors';
import { Product } from '../../types/types';
import { resetPage, setCurrentPage, setCurrentSortDirection, setCurrentSortType } from '../../store/app-process/app-process-slice';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getPageNumbers, sortCameras } from '../../utils/utils';
import { Helmet } from 'react-helmet-async';
import ProductPreview from '../../components/product-preview/product-preview';
import { getCameras } from '../../store/app-data/app-data-selectors';

function Catalog() {

  const cameras = useAppSelector(getCameras);
  const currentSortType = useAppSelector(getCurrentSortType);
  const currentSortDirection = useAppSelector(getCurrentSortDirection);
  const currentPage = useAppSelector(getCurrentPage);

  const [sortedCameras, setSortedCameras] = useState<Product[]>(cameras);

  useEffect(() => {
    const sortedCams = sortCameras(cameras, currentSortType, currentSortDirection);
    setSortedCameras(sortedCams);
  }, [cameras, currentSortType, currentSortDirection]);


  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const {pageId, sortType, sortDirection} = useParams();

  useEffect(() => {
    if(sortType && sortType === SortType.Price) {
      dispatch(setCurrentSortType(SortType.Price));
    }

    if(sortType && sortType === SortType.Rating) {
      dispatch(setCurrentSortType(SortType.Rating));
    }

    if(sortType && sortType === SortType.Default) {
      dispatch(setCurrentSortType(SortType.Default));
    }

    if(sortDirection && sortDirection === SortDirection.Ascending) {
      dispatch(setCurrentSortDirection(SortDirection.Ascending));
    }

    if(sortDirection && sortDirection === SortDirection.Descending) {
      dispatch(setCurrentSortDirection(SortDirection.Descending));
    }
  }, [sortType, sortDirection, dispatch]);

  const pagesCount = Math.ceil(cameras?.length / PRODUCTS_PER_PAGE);
  const pageNumbers: number[] = useMemo(() => getPageNumbers(pagesCount), [pagesCount]);

  useEffect(() => {
    if (pageId && pageNumbers.includes(Number(pageId))) {
      dispatch(setCurrentPage(Number(pageId)));
    }

    if (pageId && !pageNumbers.includes(Number(pageId))) {
      navigate(AppRoute.NotFound);
    }
  }, [pageId, pageNumbers, navigate, dispatch]);


  const lastProductIndex = currentPage * PRODUCTS_PER_PAGE;
  const firstProductIndex = lastProductIndex - PRODUCTS_PER_PAGE;
  const currentProducts = sortedCameras.slice(firstProductIndex, lastProductIndex);


  const [modalIsActive, setModalActive] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>({} as Product);

  const handleBuyButtonClick = (data: Product) => {
    setModalActive(true);
    setSelectedProduct(data);
  };

  const handleCloseButtonClick = () => {
    setModalActive(false);
  };


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
                <Link className="breadcrumbs__link" to={AppRoute.Root} onClick={() => dispatch(resetPage())}>
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
                  <form action="#">
                    <h2 className="visually-hidden">Фильтр</h2>
                    <fieldset className="catalog-filter__block">
                      <legend className="title title--h5">Цена, ₽</legend>
                      <div className="catalog-filter__price-range">
                        <div className="custom-input">
                          <label>
                            <input type="number" name="price" placeholder="от" />
                          </label>
                        </div>
                        <div className="custom-input">
                          <label>
                            <input
                              type="number"
                              name="priceUp"
                              placeholder="до"
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
                            name="photocamera"
                          />
                          <span className="custom-checkbox__icon" />
                          <span className="custom-checkbox__label">
                          Фотокамера
                          </span>
                        </label>
                      </div>
                      <div className="custom-checkbox catalog-filter__item">
                        <label>
                          <input type="checkbox" name="videocamera" />
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
                            name="digital"
                          />
                          <span className="custom-checkbox__icon" />
                          <span className="custom-checkbox__label">Цифровая</span>
                        </label>
                      </div>
                      <div className="custom-checkbox catalog-filter__item">
                        <label>
                          <input type="checkbox" name="film" />
                          <span className="custom-checkbox__icon" />
                          <span className="custom-checkbox__label">
                          Плёночная
                          </span>
                        </label>
                      </div>
                      <div className="custom-checkbox catalog-filter__item">
                        <label>
                          <input type="checkbox" name="snapshot" />
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
                            name="collection"
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
                          <input type="checkbox" name="zero" />
                          <span className="custom-checkbox__icon" />
                          <span className="custom-checkbox__label">Нулевой</span>
                        </label>
                      </div>
                      <div className="custom-checkbox catalog-filter__item">
                        <label>
                          <input type="checkbox" name="non-professional" />
                          <span className="custom-checkbox__icon" />
                          <span className="custom-checkbox__label">
                          Любительский
                          </span>
                        </label>
                      </div>
                      <div className="custom-checkbox catalog-filter__item">
                        <label>
                          <input type="checkbox" name="professional" />
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
                            checked={currentSortType === SortType.Price}
                            onChange={() => {
                              dispatch(setCurrentSortType(SortType.Price));
                              navigate(`${AppRoute.Root}${currentPage}/${SortType.Price}/${currentSortDirection}`);
                            }}
                          />
                          <label htmlFor="sortPrice">по цене</label>
                        </div>
                        <div className="catalog-sort__btn-text">
                          <input
                            type="radio"
                            id="sortPopular"
                            name="sort"
                            checked={currentSortType === SortType.Rating}
                            onChange={() => {
                              dispatch(setCurrentSortType(SortType.Rating));
                              navigate(`${AppRoute.Root}${currentPage}/${SortType.Rating}/${currentSortDirection}`);
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
                            checked={currentSortDirection === SortDirection.Ascending}
                            aria-label="По возрастанию"
                            onChange={() => {
                              dispatch(setCurrentSortDirection(SortDirection.Ascending));
                              navigate(`${AppRoute.Root}${currentPage}/${currentSortType}/${SortDirection.Ascending}`);
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
                            checked={currentSortDirection === SortDirection.Descending}
                            onChange={() => {
                              if(currentSortType === SortType.Default) {
                                dispatch(setCurrentSortType(SortType.Price));
                              }
                              dispatch(setCurrentSortDirection(SortDirection.Descending));
                              navigate(`${AppRoute.Root}${currentPage}/${currentSortType === SortType.Default ? SortType.Price : currentSortType}/${SortDirection.Descending}`);
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
                  <p style={{fontSize: 30, marginTop: 50}}>Нет подходящих товаров</p>}
              </div>
            </div>
          </div>
        </section>
      </div>
      <ProductPreview data={selectedProduct} isActive={modalIsActive} handleCloseButtonClick={handleCloseButtonClick}/>
    </>
  );
}

export default Catalog;
