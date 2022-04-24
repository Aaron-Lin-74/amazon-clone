import {
  InitialState,
  Cart,
  CartItem,
  CartActions,
  CartAction,
  UserActions,
  UserAction,
} from './types';

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

const reducer = (state: InitialState, action: CartAction | UserAction) => {
  switch (action.type) {
    case CartActions.ADD:
      return { ...state, cart: [...state.cart, action.payload.item] };
    case CartActions.ADD_AGAIN:
      return {
        ...state,
        cart: state.cart.map((item: CartItem) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              quantity: item.quantity + action.payload.quantity,
            };
          }
          return item;
        }),
      };
    case CartActions.CHANGE_QUANTITY:
      return {
        ...state,
        cart: state.cart.map((item: CartItem) => {
          if (item.id === action.payload.id) {
            return { ...item, quantity: action.payload.quantity };
          }
          return item;
        }),
      };
    case CartActions.DELETE:
      return {
        ...state,
        cart: state.cart.filter(
          (item: CartItem) => item.id !== action.payload.id
        ),
      };
    case UserActions.SIGN_IN:
      return {
        ...state,
        user: action.payload.user,
      };
    case UserActions.SIGN_UP:
      return {
        ...state,
        user: action.payload.user,
      };
    case UserActions.SIGN_OUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default reducer;
