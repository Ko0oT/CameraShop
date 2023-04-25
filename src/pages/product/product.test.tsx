import { render, screen, cleanup } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { APIRoute, AppRoute } from '../../constants';
import { createAPI } from '../../services/api';
import { makeFakeCamera, makeFakeCameras, makeFakeReviews } from '../../utils/mocks';
import Product from './product';
import 'intersection-observer';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';

const api = createAPI();
const mockAPI = new MockAdapter(api, { onNoMatch: 'throwException' });

beforeAll(() => {
  mockAPI.reset();
});

afterEach(cleanup);

const mockStore = configureMockStore();
describe('Component: Product', () => {
  test('should render correctly while fetching data', async () => {
    mockAPI
      .onGet(`${APIRoute.Cameras}/1`)
      .reply(200, makeFakeCamera());
    mockAPI
      .onGet(`${APIRoute.Cameras}/1/${APIRoute.Similar}`)
      .reply(200, makeFakeCameras(9));
    mockAPI
      .onGet(`${APIRoute.Cameras}/1${APIRoute.Reviews}`)
      .reply(200, makeFakeReviews(3));

    const store = mockStore({
      DATA: {camerasInBasket: [1, 2, 3],}
    });

    render(
      <Provider store={store}>
        <HelmetProvider>
          <MemoryRouter initialEntries={[`${AppRoute.Product}/1`]}>
            <Routes>
              <Route path={`${AppRoute.Product}/:id`} element={<Product />}>
              </Route>
            </Routes>
          </MemoryRouter>
        </HelmetProvider>
      </Provider>
    );

    expect(screen.getByText(/Загрузка/i)).toBeInTheDocument();
    expect(await screen.findByText(/Описание/i)).toBeInTheDocument();
    expect(screen.getByTestId('description-tab')).toHaveClass('is-active');
    expect(screen.queryByText(/Загрузка/i)).not.toBeInTheDocument();
  });

  test('should render characteristics tab', async () => {
    mockAPI
      .onGet(`${APIRoute.Cameras}/1`)
      .reply(200, makeFakeCamera());
    mockAPI
      .onGet(`${APIRoute.Cameras}/1/${APIRoute.Similar}`)
      .reply(200, makeFakeCameras(9));
    mockAPI
      .onGet(`${APIRoute.Cameras}/1${APIRoute.Reviews}`)
      .reply(200, makeFakeReviews(3));

    const store = mockStore({
      DATA: {camerasInBasket: [1, 2, 3],}
    });

    render(
      <Provider store={store}>
        <HelmetProvider>
          <MemoryRouter initialEntries={[`${AppRoute.Product}/1/${AppRoute.Characteristics}`]}>
            <Routes>
              <Route path={`${AppRoute.Product}/:id`} element={<Product />}>
                <Route path={AppRoute.Description} element={<Product/>}/>
                <Route path={AppRoute.Characteristics} element={<Product/>}/>
              </Route>
            </Routes>
          </MemoryRouter>
        </HelmetProvider>
      </Provider>
    );

    expect(screen.getByText(/Загрузка/i)).toBeInTheDocument();
    expect(await screen.findByText(/Артикул/i)).toBeInTheDocument();
    expect(screen.getByTestId('characteristics-tab')).toHaveClass('is-active');
    expect(screen.queryByText(/Загрузка/i)).not.toBeInTheDocument();
  });

  test('should render review modal', async () => {
    mockAPI
      .onGet(`${APIRoute.Cameras}/1`)
      .reply(200, makeFakeCamera());
    mockAPI
      .onGet(`${APIRoute.Cameras}/1/${APIRoute.Similar}`)
      .reply(200, makeFakeCameras(9));
    mockAPI
      .onGet(`${APIRoute.Cameras}/1${APIRoute.Reviews}`)
      .reply(200, makeFakeReviews(3));

    const store = mockStore({
      DATA: {camerasInBasket: [1, 2, 3],}
    });

    render(
      <Provider store={store}>
        <HelmetProvider>
          <MemoryRouter initialEntries={[`${AppRoute.Product}/1`]}>
            <Routes>
              <Route path={`${AppRoute.Product}/:id`} element={<Product />}>
              </Route>
            </Routes>
          </MemoryRouter>
        </HelmetProvider>
      </Provider>
    );

    expect(await screen.findByText(/Описание/i)).toBeInTheDocument();
    const reviewButton = screen.getByText(/Оставить свой отзыв/i);
    await userEvent.click(reviewButton);
    expect(screen.getByText(/Ваше имя/i)).toBeInTheDocument();
  });
});
