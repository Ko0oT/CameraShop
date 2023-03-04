import {render, screen} from '@testing-library/react';
import Header from './header';

describe('Component: LoadingScreen', () => {
  test('should render correctly', () => {
    render(<Header />);

    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
    expect(screen.getByText(/Гарантии/i)).toBeInTheDocument();
    expect(screen.getByText(/Доставка/i)).toBeInTheDocument();
  });
});
