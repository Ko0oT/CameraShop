import { render, screen } from '@testing-library/react';
import Layout from './layout';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../constants';

describe('Component: Layout', () => {

  test('should render correctly', () => {

    render(
      <MemoryRouter initialEntries={[`${AppRoute.Root}`]}>
        <Routes>
          <Route path={`${AppRoute.Root}`} element={<Layout />}>
            <Route index element={<h1>Я содержимое</h1>}/>
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByText(/Я содержимое/i)).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

});
