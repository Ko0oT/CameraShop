import { useAppSelector } from '../../hooks';
import { Link } from 'react-router-dom';
import { getCurrentPage, getCurrentSortDirection, getCurrentSortType } from '../../store/app-process/app-process-selectors';
import { AppRoute } from '../../constants';

type PaginationProps = {
  pagesCount: number;
  pageNumbers: number[];
}

function Pagination({pagesCount, pageNumbers}: PaginationProps) {

  const currentPage = useAppSelector(getCurrentPage);
  const currentSortType = useAppSelector(getCurrentSortType);
  const currentSortDirection = useAppSelector(getCurrentSortDirection);

  if (pagesCount <= 1) {
    return null;
  }

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {currentPage > 1
          ?
          <li className="pagination__item">
            <Link
              className="pagination__link pagination__link--text"
              to={`${AppRoute.Root}${ currentPage - 1}/${currentSortType}/${currentSortDirection}`}
            >
              Назад
            </Link>
          </li>
          : ''}

        {pageNumbers.map((it) => (
          <li
            className="pagination__item"
            key={it}
          >
            <Link
              className={`pagination__link ${it === currentPage ? 'pagination__link--active' : ''}`}
              to={`${AppRoute.Root}${it}/${currentSortType}/${currentSortDirection}`}
            >
              {it}
            </Link>
          </li>
        ))}

        {currentPage !== pagesCount
          ?
          <li className="pagination__item">
            <Link
              className="pagination__link pagination__link--text"
              to={`${AppRoute.Root}${currentPage + 1}/${currentSortType}/${currentSortDirection}`}
            >
            Далее
            </Link>
          </li>
          :
          <div style={{width: 99}}></div>}
      </ul>
    </div>
  );
}

export default Pagination;
