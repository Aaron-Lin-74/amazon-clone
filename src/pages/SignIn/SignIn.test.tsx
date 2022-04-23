import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SignIn from './SignIn';

jest.mock('../../firebase', () => {
  return {
    auth: 'mockAuth',
    createUserWithEmailAndPassword: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
  };
});
describe('SignIn component', () => {
  test('should render the component', () => {
    render(<SignIn />, { wrapper: BrowserRouter });
    screen.getByRole('img', {
      name: /logo/i,
    });
    screen.getByRole('heading', {
      name: /sign-in/i,
    });
    screen.getByText(/e-mail/i);
    screen.getByRole('textbox', {
      name: /e-mail/i,
    });
    screen.getByText(/password/i);
    screen.getByLabelText(/password/i);
    screen.getByRole('button', {
      name: /sign in/i,
    });
    screen.getByRole('button', {
      name: /create your amazon account/i,
    });
  });
});
