/* eslint-disable react/jsx-props-no-spreading */
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import reducer, { initializer, initialState } from '../../store/reducer';
import { StateProvider } from '../StateProvider';
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
  const mockProps = {
    id: '111',
    title: 'mock title',
    price: 100.0,
    price_id: 'mock price id',
    rating: 2.5,
    image: 'http://mockimage',
    comments: 200,
    stock: 10,
    slug: 'mock slug',
  };
  function renderProductCard() {
    return render(
      <StateProvider
        initialState={initialState}
        reducer={reducer}
        initializer={initializer}
      >
        <ProductCard {...mockProps} />
      </StateProvider>,
      { wrapper: BrowserRouter }
    );
  }
  test('should render the component', () => {
    renderProductCard();
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
