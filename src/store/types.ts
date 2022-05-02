import { User } from 'firebase/auth';

export type CartItem = {
  id: string;
  title: string;
  price: number;
  price_id: string;
  image: string;
  quantity: number;
  stock: number;
};

export type Cart = CartItem[];

export type InitialState = {
  cart: Cart;
  user: User | null;
};

export enum CartActions {
  ADD = 'ADD_TO_CART',
  ADD_AGAIN = 'ADD_AGAIN',
  CHANGE_QUANTITY = 'CHANGE_QUANTITY',
  DELETE = 'DELETE',
}

export enum UserActions {
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SING_OUT',
  SIGN_UP = 'SIGN_UP',
  DELETE_USER = 'DELETE_USER',
  UPDATE = 'UPDATE',
}

export type CartAction =
  | { type: CartActions.ADD; payload: { item: CartItem } }
  | { type: CartActions.ADD_AGAIN; payload: { id: string; quantity: number } }
  | {
      type: CartActions.CHANGE_QUANTITY;
      payload: { id: string; quantity: number };
    }
  | { type: CartActions.DELETE; payload: { id: string } };

export type UserAction =
  | { type: UserActions.SIGN_IN; payload: { user: User } }
  | { type: UserActions.SIGN_UP; payload: { user: User } }
  | { type: UserActions.SIGN_OUT };
