import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NotFound from './NotFound';

describe('NotFound component', () => {
  test('should render the component', () => {
    render(<NotFound />, { wrapper: BrowserRouter });
    screen.getByText(/go to amazon\.com's page/i);
    expect(
      screen.getByRole('link', {
        name: /home/i,
      })
    ).toHaveAttribute('href', '/');
  });
});
