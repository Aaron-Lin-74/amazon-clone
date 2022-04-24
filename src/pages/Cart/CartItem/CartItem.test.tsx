import { screen, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CartItem from './CartItem';

describe('CheckoutProduct component', () => {
  const mockProduct = {
    id: '1',
    image: 'http://mockimge',
    title: 'mock title',
    price: 100,
    quantity: 1,
    stock: 10,
    freeShipping: true,
  };
  test('should render the component', () => {
    // eslint-disable-next-line react/jsx-props-no-spreading
    render(<CartItem {...mockProduct} />, { wrapper: BrowserRouter });
    screen.getByRole('img', {
      name: /mock title/i,
    });
    screen.getByText('mock title');
    screen.getByText('In stock.');
    screen.getByText('Eligible for FREE Shipping');
    screen.getByText('This will be a gift');
    expect(
      (screen.getByRole('option', { name: '1' }) as HTMLOptionElement).selected
    ).toBe(true);
    screen.getByText('$100.00');
  });
});
