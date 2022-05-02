import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Hero from './Hero';
import { StateProvider } from '../../../components/StateProvider';
import reducer, { initializer, initialState } from '../../../store/reducer';

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
jest.mock('react-hot-toast', () => {
  return {
    __esModule: true,
    default: { remove: jest.fn() },
    Toaster: () => {
      // eslint-disable-next-line react/jsx-no-useless-fragment
      return <></>;
    },
  };
});
describe('Home component', () => {
  function renderHero() {
    return render(
      <StateProvider
        initialState={initialState}
        reducer={reducer}
        initializer={initializer}
      >
        <Hero />
      </StateProvider>,
      { wrapper: BrowserRouter }
    );
  }
  test('should render the component', async () => {
    act(() => {
      renderHero();
    });
    screen.getByRole('button', {
      name: /previous hero/i,
    });
    screen.getByRole('button', {
      name: /next hero/i,
    });
    screen.findByAltText('mock desc');
    expect(await screen.findByRole('img')).toHaveAttribute('src', 'mock src');
    expect(await screen.findByRole('link')).toHaveAttribute(
      'href',
      '/mock href'
    );
  });
});
