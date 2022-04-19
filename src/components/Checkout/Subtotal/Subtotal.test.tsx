import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Subtotal from './Subtotal';

describe('Subtotal component', () => {
  test('should render the component', () => {
    render(<Subtotal />, { wrapper: BrowserRouter });
    screen.getByText(/your order qualifies for free delivery/i);
    screen.getByText(/choose this option at checkout\./i);
    screen.getByText(/this order contains a gift/i);
    screen.getByText(/subtotal \(0 item \):/i);
    screen.getByRole('button', {
      name: /proceed to checkout/i,
    });
  });
});
