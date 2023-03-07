import {render, screen} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './header';

describe('Component: LoadingScreen', () => {
  test('should render correctly', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
    expect(screen.getByText(/Гарантии/i)).toBeInTheDocument();
    expect(screen.getByText(/Доставка/i)).toBeInTheDocument();
  });
});
