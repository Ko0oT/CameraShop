import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { makeFakeCameras, makeFakePromo } from '../../utils/mocks';
import Header from './header';

const mockStore = configureMockStore();
describe('Component: LoadingScreen', () => {
  test('should render correctly', () => {
    const store = mockStore({
      DATA: {cameras: makeFakeCameras(30), isCamerasDataLoading: false, promo: makeFakePromo(), isPromoDataLoading: false,},
      APP: {currentPage: 1,}
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
    expect(screen.getByText(/Гарантии/i)).toBeInTheDocument();
    expect(screen.getByText(/Доставка/i)).toBeInTheDocument();
  });
});
