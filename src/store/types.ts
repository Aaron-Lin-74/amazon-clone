export type Item = {
  id: string;
  title: string;
  price: number;
  rating: number;
  image: string;
  comments: number;
  quantity: number;
  stock: string;
  freeShipping: boolean;
};

export type User = null | {
  id: string;
  firstName: string;
  lastName: string;
  address?: string;
};

export type Cart = Item[];

export type InitialState = {
  cart: Item[];
  user: User;
};

export enum CartActions {
  ADD = 'ADD_TO_CART',
  ADD_AGAIN = 'ADD_AGAIN',
  CHANGE_QUANTITY = 'CHANGE_QUANTITY',
  DELETE = 'DELETE',
}

export type CartAction =
  | { type: CartActions.ADD; payload: { item: Item } }
  | { type: CartActions.ADD_AGAIN; payload: { id: string } }
  | {
      type: CartActions.CHANGE_QUANTITY;
      payload: { id: string; quantity: number };
    }
  | { type: CartActions.DELETE; payload: { id: string } };

export enum UserActions {
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SING_OUT',
  SIGN_UP = 'SIGN_UP',
  DELETE_USER = 'DELETE_USER',
  UPDATE = 'UPDATE',
}
