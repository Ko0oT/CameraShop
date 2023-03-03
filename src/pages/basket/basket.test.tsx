import {screen, render} from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import Basket from './basket';


describe('Component: Basket', () => {
  test('should render correctly', () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <Basket/>
        </BrowserRouter>
      </HelmetProvider>
    );

    expect(screen.getAllByText(/Корзина/i).length).toBe(2);
    expect(screen.getByText(/Если у вас есть промокод на скидку, примените его в этом поле/i)).toBeInTheDocument();
  });

});
