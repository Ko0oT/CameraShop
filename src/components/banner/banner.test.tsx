import { configureMockStore } from '@jedmao/redux-mock-store';
import {screen, render} from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { makeFakePromo } from '../../utils/mocks';
import Banner from './banner';

const mockStore = configureMockStore();

describe('Component: Banner', () => {
  test('should render correctly', () => {
    const store = mockStore({
      DATA: {cameras: {}, isCamerasDataLoading: false, promo: {...makeFakePromo(), name: 'Зенит'}, isPromoDataLoading: false,},
    });

    render(
      <Provider store={store}>
        <HelmetProvider>
          <BrowserRouter>
            <Banner />
          </BrowserRouter>
        </HelmetProvider>
      </Provider>
    );

    expect(screen.getByText(/Зенит/i)).toBeInTheDocument();
  });

});
