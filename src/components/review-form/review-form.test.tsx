import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../constants';
import ReviewForm from './review-form';
import userEvent from '@testing-library/user-event';

describe('Component: ReviewForm', () => {
  test('should render correctly', () => {
    render(
      <MemoryRouter initialEntries={[`${AppRoute.Product}/1`]}>
        <Routes>
          <Route path={`${AppRoute.Product}/:id`} element={<ReviewForm handleReviewsChange={jest.fn()}/>}>
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Ваше имя/i)).toBeInTheDocument();
  });

  test('should validate fields', async () => {
    render(
      <MemoryRouter initialEntries={[`${AppRoute.Product}/1`]}>
        <Routes>
          <Route path={`${AppRoute.Product}/:id`} element={<ReviewForm handleReviewsChange={jest.fn()}/>}>
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('submit')).toBeDisabled();

    const starButton = screen.getByDisplayValue('5');

    await userEvent.click(starButton);
    await userEvent.type(screen.getByTestId('userName'), 'keks');
    await userEvent.type(screen.getByTestId('advantage'), 'хорошо');
    await userEvent.type(screen.getByTestId('disadvantage'), 'их нет');
    await userEvent.type(screen.getByTestId('review'), 'в целом замечательно');

    expect(screen.getByDisplayValue(/keks/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/хорошо/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/их нет/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/в целом замечательно/i)).toBeInTheDocument();

    expect(screen.getByTestId('submit')).not.toBeDisabled();
  });
});
