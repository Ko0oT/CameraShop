import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Footer from './footer';

const mockStore = configureMockStore();
describe('Component: LoadingScreen', () => {
  test('should render correctly', () => {
    const store = mockStore({
      APP: {currentPage: 1,}
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Footer />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/Интернет-магазин фото- и видеотехники/i)).toBeInTheDocument();
    expect(screen.getByText(/FAQ/i)).toBeInTheDocument();
    expect(screen.getByText(/Задать вопрос/i)).toBeInTheDocument();

  });
});
