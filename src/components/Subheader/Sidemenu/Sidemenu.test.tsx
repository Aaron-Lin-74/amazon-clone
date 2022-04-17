import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Sidemenu from './Sidemenu';

describe('Sidemenu component', () => {
  const mockCloseSidemenu = jest.fn();
  test('should render the component', () => {
    render(
      <Sidemenu isSidemenuOpen={false} closeSidemenu={mockCloseSidemenu} />,
      { wrapper: BrowserRouter }
    );
    screen.getByRole('link', {
      name: /hello, sign in/i,
    });
    screen.getByText(/trending/i);
    screen.getByRole('link', { name: /best sellers/i });
    screen.getByRole('link', { name: /new releases/i });
    screen.getByRole('link', { name: /movers and shakers/i });
    screen.getByText(/digital content and devices/i);
    screen.getByRole('link', { name: /echo & alexa/i });
    screen.getByRole('link', { name: /kindle e-readers & books/i });
    screen.getByRole('link', { name: /amazon fire tv/i });
    screen.getByRole('link', { name: /amazon prime video/i });
    screen.getByRole('link', { name: /amazon music/i });
    screen.getByRole('link', { name: /audible audiobooks/i });
  });
  test('should close sidemenu when a link is clicked', () => {
    render(
      <Sidemenu isSidemenuOpen={false} closeSidemenu={mockCloseSidemenu} />,
      { wrapper: BrowserRouter }
    );
    const signInLink = screen.getByRole('link', {
      name: /hello, sign in/i,
    });
    userEvent.click(signInLink);
    expect(mockCloseSidemenu).toHaveBeenCalled();
    expect(mockCloseSidemenu).toHaveBeenCalledTimes(1);
  });
  test('should close sidemenu when close button is clicked', () => {
    render(
      <Sidemenu isSidemenuOpen={false} closeSidemenu={mockCloseSidemenu} />,
      { wrapper: BrowserRouter }
    );
    userEvent.click(screen.getByTitle('close sidemenu'));
    expect(mockCloseSidemenu).toHaveBeenCalled();
    expect(mockCloseSidemenu).toHaveBeenCalledTimes(1);
  });
});
