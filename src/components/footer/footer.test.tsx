import {render, screen} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from './footer';

describe('Component: LoadingScreen', () => {
  test('should render correctly', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    expect(screen.getByText(/Интернет-магазин фото- и видеотехники/i)).toBeInTheDocument();
    expect(screen.getByText(/FAQ/i)).toBeInTheDocument();
    expect(screen.getByText(/Задать вопрос/i)).toBeInTheDocument();

  });
});
