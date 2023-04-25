import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import BasketItem from './basket-item';
import { makeFakeCamera } from '../../utils/mocks';


const mockStore = configureMockStore();
describe('Component: LoadingScreen', () => {

  const fakeHandler = jest.fn();
  test('should render correctly', () => {
    const data = {...makeFakeCamera(), price: 100500, vendorCode: 'abc123'};

    const store = mockStore({
      DATA: {camerasInBasket: [1, 2, 3],}
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <BasketItem data={data} handleDeleteProductButtonClick={fakeHandler}/>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/100500/i)).toBeInTheDocument();
    expect(screen.getByText(/abc123/i)).toBeInTheDocument();

  });
});
