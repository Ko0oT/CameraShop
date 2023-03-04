import {render, screen} from '@testing-library/react';
import Footer from './footer';

describe('Component: LoadingScreen', () => {
  test('should render correctly', () => {
    render(<Footer />);

    expect(screen.getByText(/Интернет-магазин фото- и видеотехники/i)).toBeInTheDocument();
    expect(screen.getByText(/FAQ/i)).toBeInTheDocument();
    expect(screen.getByText(/Задать вопрос/i)).toBeInTheDocument();

  });
});
