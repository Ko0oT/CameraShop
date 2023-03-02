import {screen, render} from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import NotFound from './not-found';


describe('Component: NotFound', () => {
  test('should render correctly', () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <NotFound/>
        </BrowserRouter>
      </HelmetProvider>
    );

    const headerElement = screen.getByText('404 Not Found');
    const linkElement = screen.getByText('Вернуться на главную');

    expect(headerElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });

});
