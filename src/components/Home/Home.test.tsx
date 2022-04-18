import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Home from './Home';

describe('Home component', () => {
  test('should render the component', () => {
    render(<Home />, { wrapper: BrowserRouter });
    screen.getByRole('img', {
      name: /hero/i,
    });
  });
});
