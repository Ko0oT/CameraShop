import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../constants';
import { useAppDispatch } from '../../hooks';
import { resetPage } from '../../store/app-process/app-process-slice';
import { scrollToContent } from '../../utils/utils';

function Footer() {
  const dispatch = useAppDispatch();

  const handleLinkClick = () => {
    scrollToContent();
    dispatch(resetPage());
  };


  const {pathname} = useLocation();

  const isRoot = pathname === AppRoute.Root;

  return (
    <footer className="footer" data-testid="footer">
      <div className="container">
        <div className="footer__info">
          {isRoot
            ?
            <span className="footer__logo">
              <svg width={100} height={36} aria-hidden="true">
                <use xlinkHref="#icon-logo-mono" />
              </svg>
            </span>
            :
            <Link
              className="footer__logo"
              to={AppRoute.Root}
              aria-label="Переход на главную"
              onClick={handleLinkClick}
            >
              <svg width={100} height={36} aria-hidden="true">
                <use xlinkHref="#icon-logo-mono" />
              </svg>
            </Link>}
          <p className="footer__description">
      Интернет-магазин фото- и видеотехники
          </p>
          <ul className="social">
            <li className="social__item">
              <a
                className="link"
                href="#"
                aria-label="Переход на страницу вконтатке"
              >
                <svg width={20} height={20} aria-hidden="true">
                  <use xlinkHref="#icon-vk" />
                </svg>
              </a>
            </li>
            <li className="social__item">
              <a
                className="link"
                href="#"
                aria-label="Переход на страницу pinterest"
              >
                <svg width={20} height={20} aria-hidden="true">
                  <use xlinkHref="#icon-pinterest" />
                </svg>
              </a>
            </li>
            <li className="social__item">
              <a
                className="link"
                href="#"
                aria-label="Переход на страницу reddit"
              >
                <svg width={20} height={20} aria-hidden="true">
                  <use xlinkHref="#icon-reddit" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
        <ul className="footer__nav">
          <li className="footer__nav-item">
            <p className="footer__title">Навигация</p>
            <ul className="footer__list">
              <li className="footer__item">
                <Link
                  className="link"
                  to={AppRoute.Root}
                  onClick={handleLinkClick}
                >
                Каталог
                </Link>
              </li>
              <li className="footer__item">
                <a className="link" href="#">
            Гарантии
                </a>
              </li>
              <li className="footer__item">
                <a className="link" href="#">
            Доставка
                </a>
              </li>
              <li className="footer__item">
                <a className="link" href="#">
            О компании
                </a>
              </li>
            </ul>
          </li>
          <li className="footer__nav-item">
            <p className="footer__title">Ресурсы</p>
            <ul className="footer__list">
              <li className="footer__item">
                <a className="link" href="#">
            Курсы операторов
                </a>
              </li>
              <li className="footer__item">
                <a className="link" href="#">
            Блог
                </a>
              </li>
              <li className="footer__item">
                <a className="link" href="#">
            Сообщество
                </a>
              </li>
            </ul>
          </li>
          <li className="footer__nav-item">
            <p className="footer__title">Поддержка</p>
            <ul className="footer__list">
              <li className="footer__item">
                <a className="link" href="#">
            FAQ
                </a>
              </li>
              <li className="footer__item">
                <a className="link" href="#">
            Задать вопрос
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
