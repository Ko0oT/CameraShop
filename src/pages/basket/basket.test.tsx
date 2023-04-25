import {screen, render} from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import Basket from './basket';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { makeFakeCameras, makeFakePromo } from '../../utils/mocks';

const mockStore = configureMockStore();
describe('Component: Basket', () => {
  test('should render correctly', () => {

    const store = mockStore({
      DATA: {cameras: makeFakeCameras(30), isCamerasDataLoading: false, promo: makeFakePromo(), isPromoDataLoading: false, camerasInBasket: [1, 2, 3],},
      APP: {currentPage: 1,}
    });

    render(
      <Provider store={store}>
        <HelmetProvider>
          <BrowserRouter>
            <Basket/>
          </BrowserRouter>
        </HelmetProvider>
      </Provider>
    );

    expect(screen.getAllByText(/Корзина/i).length).toBe(2);
    expect(screen.getByText(/Если у вас есть промокод на скидку, примените его в этом поле/i)).toBeInTheDocument();
  });

});
