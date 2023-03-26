import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCurrentPage } from '../../store/app-process/app-process-selectors';
import { setCurrentPage } from '../../store/app-process/app-process-slice';

type PaginationProps = {
  pagesCount: number;
  pageNumbers: number[];
}

function Pagination({pagesCount, pageNumbers}: PaginationProps) {

  const currentPage = useAppSelector(getCurrentPage);
  const dispatch = useAppDispatch();

  if (pagesCount <= 1) {
    return null;
  }

  return (
    <div className="pagination">
      <ul className="pagination__list" style={{cursor: 'pointer'}}>
        {currentPage > 1
          ?
          <li className="pagination__item pagination__link pagination__link--text" onClick={() => dispatch(setCurrentPage(currentPage - 1))}>
            Назад
          </li>
          : ''}

        {pageNumbers.map((it) => (
          <li
            className={`pagination__item pagination__link ${it === currentPage ? 'pagination__link--active' : ''}`}
            onClick={() => dispatch(setCurrentPage(it))}
            key={it}
          >
            {it}
          </li>
        ))}

        {currentPage !== pagesCount
          ?
          <li
            className="pagination__item pagination__link pagination__link--text"
            onClick={() => dispatch(setCurrentPage(currentPage + 1))}
          >
            Далее
          </li>
          :
          <div style={{width: 99}}></div>}
      </ul>
    </div>
  );
}

export default Pagination;
