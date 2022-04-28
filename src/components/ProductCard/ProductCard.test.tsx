import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from './ProductCard';

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

describe('Product component', () => {
  test('should render the component', () => {
    render(
      <ProductCard
        id='112'
        title='mock title'
        price={100.0}
        rating={2.5}
        image='http://mockimage'
        comments={200}
        stock={10}
        slug='mock slug'
      />,
      { wrapper: BrowserRouter }
    );
    screen.getByRole('img', {
      name: /mock title/i,
    });
    screen.getByText(/mock title/i);
    screen.getByTitle(/2\.5 out of 5 stars/i);
    screen.getByText(/100/i);
    screen.getByText(/200/i);
    screen.getByRole('button', { name: /add to cart/i });
  });
});
