import {render, screen} from '@testing-library/react';
import { makeFakeCamera } from '../../utils/mocks';
import ProductPreview from './product-preview';
import userEvent from '@testing-library/user-event';


describe('Component: ProductPreview', () => {

  const fakeHandler = jest.fn();
  test('should render correctly', () => {
    const data = {...makeFakeCamera(), vendorCode: '4 8 15 16 23 42', level: 'Гигачад',};

    render(<ProductPreview data={data} isActive handleCloseButtonClick={fakeHandler}/>);

    expect(screen.getByText(/4 8 15 16 23 42/i)).toBeInTheDocument();
    expect(screen.getByText(/Гигачад/i)).toBeInTheDocument();
  });

  test('should close modal with X button click', async () => {
    const data = {...makeFakeCamera(), vendorCode: '4 8 15 16 23 42'};

    render(<ProductPreview data={data} isActive handleCloseButtonClick={fakeHandler}/>);

    expect(screen.getByText(/4 8 15 16 23 42/i)).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('closeButton'));

    expect(fakeHandler).toBeCalled();
  });

  test('should close modal with overlay click', async () => {
    const data = {...makeFakeCamera(), vendorCode: '4 8 15 16 23 42'};

    render(<ProductPreview data={data} isActive handleCloseButtonClick={fakeHandler}/>);

    expect(screen.getByText(/4 8 15 16 23 42/i)).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('overlay'));

    expect(fakeHandler).toBeCalled();
  });
});
