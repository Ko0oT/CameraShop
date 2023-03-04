import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Pagination from './pagination';

const mockStore = configureMockStore();

describe('Component: Catalog', () => {
  test('should render active pagination button correctly', () => {
    const store = mockStore({
      APP: {currentPage: 2,}
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Pagination pagesCount={3} pageNumbers={[1,2,3]}/>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('2')).toHaveClass('pagination__link--active');
    expect(screen.getByText(/Назад/i)).toBeInTheDocument();
    expect(screen.getByText(/Далее/i)).toBeInTheDocument();
  });

  test('should\'t render pagination when page is single', () => {
    const store = mockStore({
      APP: {currentPage: 1,}
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Pagination pagesCount={1} pageNumbers={[1]}/>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.queryByText('1')).not.toBeInTheDocument();
    expect(screen.queryByText(/Назад/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Далее/i)).not.toBeInTheDocument();
  });

  test('should\'t render \'next\' pagination button when current page is last', () => {
    const store = mockStore({
      APP: {currentPage: 3,}
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Pagination pagesCount={3} pageNumbers={[1, 2, 3]}/>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('3')).toHaveClass('pagination__link--active');
    expect(screen.getByText(/Назад/i)).toBeInTheDocument();
    expect(screen.queryByText(/Далее/i)).not.toBeInTheDocument();
  });

  test('should\'t render \'previous\' pagination button when current page is first', () => {
    const store = mockStore({
      APP: {currentPage: 1,}
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Pagination pagesCount={3} pageNumbers={[1, 2, 3]}/>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('1')).toHaveClass('pagination__link--active');
    expect(screen.getByText(/Далее/i)).toBeInTheDocument();
    expect(screen.queryByText(/Назад/i)).not.toBeInTheDocument();
  });

});
