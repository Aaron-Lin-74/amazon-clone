import { InitialState, Cart, Item, CartActions, CartAction } from './types';

export const initialState: InitialState = {
  cart: [],
  user: null,
};

// Selector
export const getCartTotal = (cart: Cart): number =>
  cart?.reduce(
    (amount: number, item) => item.price * item.quantity + amount,
    0
  );

export const getCartItemNumber = (cart: Cart): number =>
  cart?.reduce((number: number, item) => item.quantity + number, 0);

const reducer = (state: InitialState, action: CartAction) => {
  switch (action.type) {
    case CartActions.ADD:
      return { ...state, cart: [...state.cart, action.payload.item] };
    case CartActions.ADD_AGAIN:
      return {
        ...state,
        cart: state.cart.map((item: Item) => {
          if (item.id === action.payload.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        }),
      };

    case CartActions.CHANGE_QUANTITY:
      return {
        ...state,
        cart: state.cart.map((item: Item) => {
          if (item.id === action.payload.id) {
            return { ...item, quantity: action.payload.quantity };
          }
          return item;
        }),
      };
    case CartActions.DELETE:
      return {
        ...state,
        cart: state.cart.filter((item: Item) => item.id !== action.payload.id),
      };
    default:
      return state;
  }
};

export default reducer;
