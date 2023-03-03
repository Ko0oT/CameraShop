import {render, screen} from '@testing-library/react';
import LoadingScreen from './loading-screen';

describe('Component: LoadingScreen', () => {
  test('should render correctly', () => {
    render(<LoadingScreen />);

    expect(screen.getByText(/Загрузка.../i)).toBeInTheDocument();
  });
});
