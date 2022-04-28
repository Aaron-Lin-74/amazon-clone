import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Sidemenu from './Sidemenu';

jest.mock('@sanity/client', () => {
  return function sanityClient() {
    return {
      fetch: () => {
        return Promise.resolve([
          {
            id: 0,
            src: 'mock src',
            description: 'mock desc',
            href: 'mock href',
          },
        ]);
      },
    };
  };
});
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
    screen.findByText(/trending/i);
    screen.findByRole('link', { name: /best sellers/i });
    screen.findByRole('link', { name: /new releases/i });
    screen.findByRole('link', { name: /movers and shakers/i });
    screen.findByText(/digital content and devices/i);
    screen.findByRole('link', { name: /echo & alexa/i });
    screen.findByRole('link', { name: /kindle e-readers & books/i });
    screen.findByRole('link', { name: /amazon fire tv/i });
    screen.findByRole('link', { name: /amazon prime video/i });
    screen.findByRole('link', { name: /amazon music/i });
    screen.findByRole('link', { name: /audible audiobooks/i });
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
