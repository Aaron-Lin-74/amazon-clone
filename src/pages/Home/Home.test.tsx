import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HEROIMAGES from '../../constants/heroImages';
import Home from './Home';

describe('Home component', () => {
  test('should render the component', () => {
    render(<Home />, { wrapper: BrowserRouter });
    expect(
      screen.getAllByRole('img', {
        name: /hero/i,
      })
    ).toHaveLength(HEROIMAGES.length);
  });
});
