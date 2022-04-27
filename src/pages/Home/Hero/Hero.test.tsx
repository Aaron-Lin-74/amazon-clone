import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Hero from './Hero';

describe('Home component', () => {
  test('should render the component', () => {
    act(() => {
      render(<Hero />, { wrapper: BrowserRouter });
    });
    screen.getByRole('button', {
      name: /previous hero/i,
    });
    screen.getByRole('button', {
      name: /next hero/i,
    });
  });
});
