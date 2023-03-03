import {render, screen} from '@testing-library/react';
import StarsRating from './stars-rating';


describe('Component: StarsRating', () => {
  it('should render correctly', () => {
    const rating = 3;

    render(<StarsRating rating={rating} />);

    expect(screen.getAllByTestId('fullStarIcon').length).toBe(rating);
    expect(screen.getAllByTestId('emptyStarIcon').length).toBe(5 - rating);
  });
});
