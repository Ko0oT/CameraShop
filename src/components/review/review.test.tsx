import {render, screen} from '@testing-library/react';
import { makeFakeReview } from '../../utils/mocks';
import Review from './review';


describe('Component: Review', () => {
  it('should render correctly', () => {
    const data = {...makeFakeReview(), advantage: 'Четкая', disadvantage: 'Дорогая',};

    render(<Review data={data}/>);

    expect(screen.getByText(/Четкая/i)).toBeInTheDocument();
    expect(screen.getByText(/Дорогая/i)).toBeInTheDocument();
  });
});
