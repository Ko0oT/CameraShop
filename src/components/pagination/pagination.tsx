import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setNextPage, setPreviousPage, setCurrentPage } from '../../store/app-process/app-process-slice';
import { Product } from '../../types/types';
import { Link } from 'react-router-dom';
import { getCurrentPage } from '../../store/app-process/app-process-selectors';
import { PRODUCTS_PER_PAGE } from '../../constants';

type PaginationProps = {
  data: Product[];
}


function Pagination({data}: PaginationProps) {

  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(getCurrentPage);

  function handlePaginationClick (pageNumber: number) {
    dispatch(setCurrentPage(pageNumber));
  }

  function handleBackClick () {
    dispatch(setPreviousPage());
  }

  function handleNextClick () {
    dispatch(setNextPage());
  }

  const pagesCount = Math.ceil(data.length / PRODUCTS_PER_PAGE);
  const pageNumbers: number[] = [];

  for (let i = 1; i <= pagesCount; i++) {
    pageNumbers.push(i);
  }

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
              to={`${currentPage - 1}`}
              onClick={handleBackClick}
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
              to={`${it}`}
              onClick={() => handlePaginationClick(it)}
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
              to={`${currentPage + 1}`}
              onClick={handleNextClick}
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
