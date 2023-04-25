import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import App from './app';
import { MemoryRouter } from 'react-router-dom';
import { makeFakeCameras, makeFakePromo } from '../../utils/mocks';
import { AppRoute } from '../../constants';
import 'intersection-observer';

global.scrollTo = jest.fn();

const mockStore = configureMockStore();

const store = mockStore({
  DATA: {cameras: makeFakeCameras(30), isCamerasDataLoading: false, promo: makeFakePromo(), isPromoDataLoading: false, camerasInBasket: [1, 2, 3]},
  APP: {currentPage: 1,}
});


const fakeApp = (path: string) => (
  <Provider store={store}>
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  </Provider>
);


describe('Application Routing', () => {
  test('should render "Catalog" when user navigate to "/"', () => {

    render(fakeApp(AppRoute.Root));

    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
    expect(screen.getAllByTestId('card')).toBeInstanceOf(Array);
  });

  test('should render "Product" when user navigate to "/product/2"', () => {

    render(fakeApp(`${AppRoute.Product}/2`));

    expect(screen.getByText(/Загрузка/i)).toBeInTheDocument();
  });

  test('should render "Product" when user navigate to "/product/2/characteristics"', () => {

    render(fakeApp(`${AppRoute.Product}/2/${AppRoute.Characteristics}`));

    expect(screen.getByText(/Загрузка/i)).toBeInTheDocument();
  });

  test('should render "Product" when user navigate to "/product/2/description"', () => {

    render(fakeApp(`${AppRoute.Product}/2/${AppRoute.Description}`));

    expect(screen.getByText(/Загрузка/i)).toBeInTheDocument();
  });

  test('should render "Basket" when user navigate to "/basket"', () => {

    render(fakeApp(`${AppRoute.Basket}`));

    expect(screen.getByText(/Если у вас есть промокод на скидку, примените его в этом поле/i)).toBeInTheDocument();
  });

  test('should render "NotFound" when user navigate to "/not_found"', () => {

    render(fakeApp(`${AppRoute.NotFound}`));

    const headerElement = screen.getByText('404 Not Found');
    const linkElement = screen.getByText('Вернуться на главную');

    expect(headerElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });

  test('should render "NotFound" when user navigate to non-existent route', () => {

    render(fakeApp('/non-existent-route'));

    const headerElement = screen.getByText('404 Not Found');
    const linkElement = screen.getByText('Вернуться на главную');

    expect(headerElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
});
