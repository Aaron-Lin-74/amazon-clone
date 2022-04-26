import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Cart from './Cart';

describe('Checkout component', () => {
  test('should render the component', () => {
    render(<Cart />, { wrapper: BrowserRouter });
    screen.getByRole('heading', {
      name: 'Your Amazon Cart is empty.',
    });
    expect(screen.getAllByText(/subtotal \(0 item \):/i)).toHaveLength(1);
    screen.getByText(
      /the price and availability of items at amazon\.com\.au are subject to change\. the shopping cart is a temporary place to store a list of your items and reflects each item's most recent price\./i
    );
    screen.getByText(
      /do you have a promotional code\? we'll ask you to enter your claim code when it's time to pay\./i
    );
  });
});