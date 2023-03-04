import { configureMockStore } from '@jedmao/redux-mock-store';
import {screen, render} from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PRODUCTS_PER_PAGE } from '../../constants';
import { makeFakeCameras, makeFakePromo } from '../../utils/mocks';
import Catalog from './catalog';

const mockStore = configureMockStore();

describe('Component: Catalog', () => {
  test('should render correctly when cameras is not empty', () => {
    const store = mockStore({
      DATA: {cameras: makeFakeCameras(30), isCamerasDataLoading: false, promo: makeFakePromo(), isPromoDataLoading: false,},
      APP: {currentPage: 1,}
    });

    render(
      <Provider store={store}>
        <HelmetProvider>
          <BrowserRouter>
            <Catalog />
          </BrowserRouter>
        </HelmetProvider>
      </Provider>
    );

    expect(screen.getAllByTestId('card')).toBeInstanceOf(Array);
    expect(screen.getByText(/Далее/i)).toBeInTheDocument();
  });

  test('should render correctly when cameras is empty', () => {
    const store = mockStore({
      DATA: {cameras: [], isCamerasDataLoading: false, promo: makeFakePromo(), isPromoDataLoading: false,},
      APP: {currentPage: 1,}
    });

    render(
      <Provider store={store}>
        <HelmetProvider>
          <BrowserRouter>
            <Catalog />
          </BrowserRouter>
        </HelmetProvider>
      </Provider>
    );

    expect(screen.getByText(/Нет подходящих товаров/i)).toBeInTheDocument();
    expect(screen.queryByTestId('card')).not.toBeInTheDocument();
    expect(screen.queryByText(/Далее/i)).not.toBeInTheDocument();
  });

  test('should\'t render pagination when cameras less or equal product per page', () => {
    const store = mockStore({
      DATA: {cameras: makeFakeCameras(PRODUCTS_PER_PAGE), isCamerasDataLoading: false, promo: makeFakePromo(), isPromoDataLoading: false,},
      APP: {currentPage: 1,}
    });

    render(
      <Provider store={store}>
        <HelmetProvider>
          <BrowserRouter>
            <Catalog />
          </BrowserRouter>
        </HelmetProvider>
      </Provider>
    );

    expect(screen.getAllByTestId('card')).toBeInstanceOf(Array);
    expect(screen.queryByText('1')).not.toBeInTheDocument();
    expect(screen.queryByText(/Назад/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Далее/i)).not.toBeInTheDocument();
  });

});
