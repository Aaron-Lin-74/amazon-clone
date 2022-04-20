import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';

jest.mock('../../firebase', () => {
  return {
    signOutUser: jest.fn(),
  };
});
describe('Header component', () => {
  test('should render the component', () => {
    render(<Header />, { wrapper: BrowserRouter });
    screen.getByAltText('logo');
    screen.getByText(/\.com\.au/i);
    screen.getByRole('button', {
      name: /hello select your address/i,
    });
    screen.getByRole('combobox', {
      name: /search in/i,
    });
    screen.getByRole('textbox', {
      name: /search/i,
    });
    screen.getByRole('button', {
      name: /go/i,
    });
    screen.getByRole('button', {
      name: /hello, sign in account & lists/i,
    });
    screen.getByRole('button', {
      name: /returns & orders/i,
    });
    screen.getByRole('button', {
      name: '0',
    });
  });
});
