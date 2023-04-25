import {render, screen} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { makeFakeCamera } from '../../utils/mocks';
import userEvent from '@testing-library/user-event';
import ProductCard from './product-card';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';

const mockStore = configureMockStore();

describe('Component: ProductPreview', () => {

  const fakeHandler = jest.fn();
  test('should render correctly', () => {
    const data = {...makeFakeCamera(), reviewCount: 100500, price: 123123123,};

    const store = mockStore({
      DATA: {camerasInBasket: [1, 2, 3],}
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductCard data={data} handleBuyButtonClick={fakeHandler}/>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/100500/i)).toBeInTheDocument();
    expect(screen.getByText(/123123123/i)).toBeInTheDocument();
  });

  test('should invoke handler with buy button click', async () => {
    const data = {...makeFakeCamera(), reviewCount: 100500, price: 123123123,};

    const store = mockStore({
      DATA: {camerasInBasket: [1, 2, 3],}
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductCard data={data} handleBuyButtonClick={fakeHandler}/>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/100500/i)).toBeInTheDocument();
    expect(screen.getByText(/123123123/i)).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('buyButton'));

    expect(fakeHandler).toBeCalled();
  });
});
