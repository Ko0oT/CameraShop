import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../constants';
import ScrollToTop from './scroll-to-top';

describe('Component: ScrollToTop', () => {

  test('should scroll page to the top', () => {
    global.scrollTo = jest.fn();

    render(
      <MemoryRouter initialEntries={[`${AppRoute.Root}`]}>
        <Routes>
          <Route path={`${AppRoute.Root}`} element={<ScrollToTop />}>
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(global.scrollTo).toBeCalledTimes(1);
  });

  test('should scroll page up 500px below the top when pathname has digit', () => {
    global.scrollTo = jest.fn();

    render(
      <MemoryRouter initialEntries={[`${AppRoute.Root}1`]}>
        <Routes>
          <Route path={`${AppRoute.Root}/:id`} element={<ScrollToTop />}>
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(global.scrollTo).toBeCalledTimes(1);
    expect(global.scrollTo).toHaveBeenCalledWith({
      top: 500,
      left: 0,
      behavior: 'smooth',
    });
  });

  test('should scroll page up 500px below the top when pathname has /characteristics', () => {
    global.scrollTo = jest.fn();

    render(
      <MemoryRouter initialEntries={[`${AppRoute.Product}/1/${AppRoute.Characteristics}`]}>
        <Routes>
          <Route path={`${AppRoute.Product}/:id/${AppRoute.Characteristics}`} element={<ScrollToTop />}>
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(global.scrollTo).toBeCalledTimes(1);
    expect(global.scrollTo).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  });

  test('should scroll page up 500px below the top when pathname has /description', () => {
    global.scrollTo = jest.fn();

    render(
      <MemoryRouter initialEntries={[`${AppRoute.Product}/1/${AppRoute.Description}`]}>
        <Routes>
          <Route path={`${AppRoute.Product}/:id/${AppRoute.Description}`} element={<ScrollToTop />}>
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(global.scrollTo).toBeCalledTimes(1);
    expect(global.scrollTo).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  });

});
