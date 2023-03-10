import { useEffect, useMemo, useState } from 'react';
import Banner from '../../components/banner/banner';
import Pagination from '../../components/pagination/pagination';
import ProductCard from '../../components/product-card/product-card';
import { AppRoute, PRODUCTS_PER_PAGE } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCurrentPage } from '../../store/app-process/app-process-selectors';
import { Product } from '../../types/types';
import { resetPage, setCurrentPage } from '../../store/app-process/app-process-slice';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getPageNumbers } from '../../utils/utils';
import { Helmet } from 'react-helmet-async';
import ProductPreview from '../../components/product-preview/product-preview';
import { getCameras } from '../../store/app-data/app-data-selectors';

function Catalog() {

  const cameras = useAppSelector(getCameras);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const {pageId} = useParams();

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


  const currentPage = useAppSelector(getCurrentPage);
  const lastProductIndex = currentPage * PRODUCTS_PER_PAGE;
  const firstProductIndex = lastProductIndex - PRODUCTS_PER_PAGE;
  const currentProducts = cameras.slice(firstProductIndex, lastProductIndex);


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
        <title>?????????????? - ??????????????</title>
      </Helmet>
      <Banner />
      <div className="page-content">
        <div className="breadcrumbs">
          <div className="container">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link className="breadcrumbs__link" to={AppRoute.Root} onClick={() => dispatch(resetPage())}>
                ??????????????
                  <svg width={5} height={8} aria-hidden="true">
                    <use xlinkHref="#icon-arrow-mini" />
                  </svg>
                </Link>
              </li>
              <li className="breadcrumbs__item">
                <span className="breadcrumbs__link breadcrumbs__link--active">
                ??????????????
                </span>
              </li>
            </ul>
          </div>
        </div>
        <section className="catalog">
          <div className="container">
            <h1 className="title title--h2">?????????????? ????????- ?? ????????????????????????</h1>
            <div className="page-content__columns">
              <div className="catalog__aside">
                <div className="catalog-filter">
                  <form action="#">
                    <h2 className="visually-hidden">????????????</h2>
                    <fieldset className="catalog-filter__block">
                      <legend className="title title--h5">????????, ???</legend>
                      <div className="catalog-filter__price-range">
                        <div className="custom-input">
                          <label>
                            <input type="number" name="price" placeholder="????" />
                          </label>
                        </div>
                        <div className="custom-input">
                          <label>
                            <input
                              type="number"
                              name="priceUp"
                              placeholder="????"
                            />
                          </label>
                        </div>
                      </div>
                    </fieldset>
                    <fieldset className="catalog-filter__block">
                      <legend className="title title--h5">??????????????????</legend>
                      <div className="custom-checkbox catalog-filter__item">
                        <label>
                          <input
                            type="checkbox"
                            name="photocamera"
                          />
                          <span className="custom-checkbox__icon" />
                          <span className="custom-checkbox__label">
                          ????????????????????
                          </span>
                        </label>
                      </div>
                      <div className="custom-checkbox catalog-filter__item">
                        <label>
                          <input type="checkbox" name="videocamera" />
                          <span className="custom-checkbox__icon" />
                          <span className="custom-checkbox__label">
                          ??????????????????????
                          </span>
                        </label>
                      </div>
                    </fieldset>
                    <fieldset className="catalog-filter__block">
                      <legend className="title title--h5">?????? ????????????</legend>
                      <div className="custom-checkbox catalog-filter__item">
                        <label>
                          <input
                            type="checkbox"
                            name="digital"
                          />
                          <span className="custom-checkbox__icon" />
                          <span className="custom-checkbox__label">????????????????</span>
                        </label>
                      </div>
                      <div className="custom-checkbox catalog-filter__item">
                        <label>
                          <input type="checkbox" name="film" />
                          <span className="custom-checkbox__icon" />
                          <span className="custom-checkbox__label">
                          ??????????????????
                          </span>
                        </label>
                      </div>
                      <div className="custom-checkbox catalog-filter__item">
                        <label>
                          <input type="checkbox" name="snapshot" />
                          <span className="custom-checkbox__icon" />
                          <span className="custom-checkbox__label">
                          ????????????????????????
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
                          ??????????????????????????
                          </span>
                        </label>
                      </div>
                    </fieldset>
                    <fieldset className="catalog-filter__block">
                      <legend className="title title--h5">??????????????</legend>
                      <div className="custom-checkbox catalog-filter__item">
                        <label>
                          <input type="checkbox" name="zero" />
                          <span className="custom-checkbox__icon" />
                          <span className="custom-checkbox__label">??????????????</span>
                        </label>
                      </div>
                      <div className="custom-checkbox catalog-filter__item">
                        <label>
                          <input type="checkbox" name="non-professional" />
                          <span className="custom-checkbox__icon" />
                          <span className="custom-checkbox__label">
                          ????????????????????????
                          </span>
                        </label>
                      </div>
                      <div className="custom-checkbox catalog-filter__item">
                        <label>
                          <input type="checkbox" name="professional" />
                          <span className="custom-checkbox__icon" />
                          <span className="custom-checkbox__label">
                          ????????????????????????????????
                          </span>
                        </label>
                      </div>
                    </fieldset>
                    <button
                      className="btn catalog-filter__reset-btn"
                      type="reset"
                    >
                    ???????????????? ??????????????
                    </button>
                  </form>
                </div>
              </div>
              <div className="catalog__content">
                <div className="catalog-sort">
                  <form action="#">
                    <div className="catalog-sort__inner">
                      <p className="title title--h5">??????????????????????:</p>
                      <div className="catalog-sort__type">
                        <div className="catalog-sort__btn-text">
                          <input
                            type="radio"
                            id="sortPrice"
                            name="sort"
                            defaultChecked
                          />
                          <label htmlFor="sortPrice">???? ????????</label>
                        </div>
                        <div className="catalog-sort__btn-text">
                          <input type="radio" id="sortPopular" name="sort" />
                          <label htmlFor="sortPopular">???? ????????????????????????</label>
                        </div>
                      </div>
                      <div className="catalog-sort__order">
                        <div className="catalog-sort__btn catalog-sort__btn--up">
                          <input
                            type="radio"
                            id="up"
                            name="sort-icon"
                            defaultChecked
                            aria-label="???? ??????????????????????"
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
                            aria-label="???? ????????????????"
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
                  <p style={{fontSize: 30, marginTop: 50}}>?????? ???????????????????? ??????????????</p>}
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
