import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Checkout from './Checkout';

describe('Checkout component', () => {
  test('should render the component', () => {
    render(<Checkout />, { wrapper: BrowserRouter });
    screen.getByRole('heading', {
      name: /shopping cart/i,
    });
    expect(screen.getAllByText(/subtotal \(0 item \):/i)).toHaveLength(2);
    screen.getByText(
      /the price and availability of items at amazon\.com\.au are subject to change\. the shopping cart is a temporary place to store a list of your items and reflects each item's most recent price\./i
    );
    screen.getByText(
      /do you have a promotional code\? we'll ask you to enter your claim code when it's time to pay\./i
    );
  });
});
