import React, { createContext, Reducer, useContext, useReducer } from 'react';
import { initialState as defaultState } from '../store/reducer';
import { CartAction, UserAction, InitialState } from '../store/types';

export const StateContext = createContext<
  [InitialState, React.Dispatch<CartAction | UserAction>]
>([defaultState, () => null]);

export function StateProvider({
  reducer,
  initialState,
  children,
}: {
  reducer: Reducer<InitialState, CartAction | UserAction>;
  initialState: InitialState;
  children: React.ReactNode;
}) {
  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
}

export const useStateValue = () => useContext(StateContext);
