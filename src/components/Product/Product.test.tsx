import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Product from './Product';

describe('Product component', () => {
  test('should render the component', () => {
    render(
      <Product
        id='112'
        title='mock title'
        price={100.0}
        rating={2.5}
        image='http://mockimage'
        comments={200}
      />,
      { wrapper: BrowserRouter }
    );
    screen.getByRole('img', {
      name: /mock title/i,
    });
    screen.getByRole('link', {
      name: /mock title/i,
    });
    screen.getByTitle(/2\.5 out of 5 stars/i);
    screen.getByText(/100/i);
    screen.getByText(/200/i);
    screen.getByRole('button', { name: /add to cart/i });
  });
});
