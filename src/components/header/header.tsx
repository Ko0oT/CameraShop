import { useState, KeyboardEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCameras, getCamerasInBasket } from '../../store/app-data/app-data-selectors';
import { setNeedToUpdate } from '../../store/app-process/app-process-slice';

function Header() {
  const dispatch = useAppDispatch();

  const handleLinkClick = () => {
    dispatch(setNeedToUpdate(true));
  };

  const {pathname} = useLocation();

  const isRoot = pathname === AppRoute.Root;


  const cameras = useAppSelector(getCameras);
  const camerasInBasket = useAppSelector(getCamerasInBasket);
  const [formInputValue, setFormInputValue] = useState<string>('');
  const foundCameras = formInputValue ? cameras.filter((camera) => camera.name.toLowerCase().includes(formInputValue.toLowerCase())) : [];


  const handleKeyDown = (evt: KeyboardEvent) => {
    const target = evt.target as HTMLLIElement;
    if(evt.code === 'ArrowDown' && target.nextElementSibling) {
      const previous = target.nextElementSibling as HTMLLIElement;
      previous.focus();
    }
    if(evt.code === 'ArrowUp' && target.previousElementSibling) {
      const next = target.previousElementSibling as HTMLLIElement;
      next.focus();
    }
    if(evt.code === 'Enter' && target.firstChild) {
      const link = target.firstChild as HTMLAnchorElement;
      link.click();
    }
  };

  return (
    <header className="header" id="header" data-testid="header">
      <div className="container">
        {isRoot
          ?
          <span className="header__logo">
            <svg width={100} height={36} aria-hidden="true">
              <use xlinkHref="#icon-logo" />
            </svg>
          </span>
          :
          <Link
            className="header__logo"
            to={AppRoute.Root}
            aria-label="Переход на главную"
          >
            <svg width={100} height={36} aria-hidden="true">
              <use xlinkHref="#icon-logo" />
            </svg>
          </Link>}
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link
                className="main-nav__link"
                to={AppRoute.Root}
                onClick={handleLinkClick}
              >
              Каталог
              </Link>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#">
          Гарантии
              </a>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#">
          Доставка
              </a>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#">
          О компании
              </a>
            </li>
          </ul>
        </nav>
        <div className={`form-search ${foundCameras.length ? 'list-opened' : ''}`}>
          <form>
            <label>
              <svg
                className="form-search__icon"
                width={16}
                height={16}
                aria-hidden="true"
              >
                <use xlinkHref="#icon-lens" />
              </svg>
              <input
                className="form-search__input"
                type="text"
                autoComplete="off"
                placeholder="Поиск по сайту"
                onChange={(evt) => setFormInputValue(evt.target.value)}
                value={formInputValue}
              />
            </label>
            <ul className="form-search__select-list scroller" onKeyDown={handleKeyDown}>
              {foundCameras.map((it) => (
                <li
                  className="form-search__select-item"
                  tabIndex={0}
                  key={it.id}
                  onClick={() => setFormInputValue('')}
                >
                  <Link
                    to={`${AppRoute.Product}/${it.id}`}
                    tabIndex={-1}
                  >
                    {it.name}
                  </Link>
                </li>))}
            </ul>
          </form>
          <button
            className="form-search__reset"
            type="reset"
            onClick={() => setFormInputValue('')}
          >
            <svg width={10} height={10} aria-hidden="true">
              <use xlinkHref="#icon-close" />
            </svg>
            <span className="visually-hidden">Сбросить поиск</span>
          </button>
        </div>
        <Link
          className="header__basket-link"
          to={AppRoute.Basket}
        >
          <svg width={16} height={16} aria-hidden="true">
            <use xlinkHref="#icon-basket" />
          </svg>
          {camerasInBasket.length > 0
            ?
            <span className="header__basket-count">{camerasInBasket.length}</span>
            : ''}
        </Link>
      </div>
    </header>
  );
}

export default Header;
