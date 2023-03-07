import { render, screen } from '@testing-library/react';
import Layout from './layout';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../constants';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';

const mockStore = configureMockStore();

describe('Component: Layout', () => {

  test('should render correctly', () => {
    const store = mockStore({
      APP: {currentPage: 1,}
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`${AppRoute.Root}`]}>
          <Routes>
            <Route path={`${AppRoute.Root}`} element={<Layout />}>
              <Route index element={<h1>Я содержимое</h1>}/>
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByText(/Я содержимое/i)).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

});
