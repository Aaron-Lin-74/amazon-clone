import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

jest.mock('./firebase', () => {
  return {
    auth: 'mockAuth',
    onAuthStateChanged: jest.fn(),
  };
});
test('renders learn react link', () => {
  render(<App />, { wrapper: BrowserRouter });
});
