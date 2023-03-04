import {render, screen} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { makeFakeCamera } from '../../utils/mocks';
import userEvent from '@testing-library/user-event';
import ProductCard from './product-card';


describe('Component: ProductPreview', () => {

  const fakeHandler = jest.fn();
  test('should render correctly', () => {
    const data = {...makeFakeCamera(), reviewCount: 100500, price: 123123123,};

    render(
      <BrowserRouter>
        <ProductCard data={data} handleBuyButtonClick={fakeHandler}/>
      </BrowserRouter>
    );

    expect(screen.getByText(/100500/i)).toBeInTheDocument();
    expect(screen.getByText(/123123123/i)).toBeInTheDocument();
  });

  test('should invoke handler with buy button click', async () => {
    const data = {...makeFakeCamera(), reviewCount: 100500, price: 123123123,};

    render(
      <BrowserRouter>
        <ProductCard data={data} handleBuyButtonClick={fakeHandler}/>
      </BrowserRouter>
    );

    expect(screen.getByText(/100500/i)).toBeInTheDocument();
    expect(screen.getByText(/123123123/i)).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('buyButton'));

    expect(fakeHandler).toBeCalled();
  });
});
