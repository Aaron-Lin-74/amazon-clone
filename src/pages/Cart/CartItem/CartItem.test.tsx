/* eslint-disable react/jsx-props-no-spreading */
import { screen, render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { StateProvider } from '../../../components/StateProvider';
import reducer, { initializer } from '../../../store/reducer';
import CartItem from './CartItem';

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
describe('CheckoutProduct component', () => {
  const mockProduct = {
    id: '1',
    image: 'http://mockimge',
    title: 'mock title',
    price: 100,
    price_id: 'mock price id',
    quantity: 1,
    stock: 20,
    freeShipping: true,
  };
  const mockInitialState = {
    cart: [{ ...mockProduct }],
    user: null,
  };
  function renderCartItem() {
    return render(
      <StateProvider
        initialState={mockInitialState}
        reducer={reducer}
        initializer={initializer}
      >
        <CartItem {...mockProduct} />
      </StateProvider>,
      { wrapper: BrowserRouter }
    );
  }
  test('should render the component', () => {
    renderCartItem();
    screen.getByRole('img', {
      name: /mock title/i,
    });
    screen.getByText('mock title');
    screen.getByText('In stock.');
    screen.getByText('Eligible for FREE Shipping');
    screen.getByText('This will be a gift');
    expect(
      (screen.getByRole('option', { name: '1' }) as HTMLOptionElement).selected
    ).toBe(true);
    screen.getByText('$100.00');
  });

  test('should the quantity-change-select switch to input when select 10+', async () => {
    renderCartItem();
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      screen.getByRole('option', { name: '10+' })
    );
    expect(
      await screen.findByRole('spinbutton', {
        name: /quantity/i,
      })
    ).toBeInTheDocument();
  });
  test('should quantity input switch back to select when user input is less than 10', async () => {
    renderCartItem();
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      screen.getByRole('option', { name: '10+' })
    );
    expect(
      await screen.findByRole('spinbutton', {
        name: /quantity/i,
      })
    ).toBeInTheDocument();
    fireEvent.change(screen.getByRole('spinbutton', { name: /quantity/i }), {
      target: { value: '5' },
    });
    userEvent.click(screen.getByRole('button', { name: /update/i }));
    expect(await screen.findByRole('combobox')).toBeInTheDocument();
  });

  test('quantity change input should only accept non-negative number', async () => {
    renderCartItem();
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      screen.getByRole('option', { name: '10+' })
    );
    expect(
      await screen.findByRole('spinbutton', {
        name: /quantity/i,
      })
    ).toBeInTheDocument();
    fireEvent.change(screen.getByRole('spinbutton', { name: /quantity/i }), {
      target: { value: '-5' },
    });
    userEvent.click(screen.getByRole('button', { name: /update/i }));
    expect(await screen.findByRole('combobox')).toHaveValue('1');
  });
});
