import React, {
  createContext,
  Reducer,
  useContext,
  useReducer,
  useEffect,
  useMemo,
} from 'react';
import { initialState as defaultState } from '../store/reducer';
import { CartAction, UserAction, InitialState } from '../store/types';

export const StateContext = createContext<
  [InitialState, React.Dispatch<CartAction | UserAction>]
>([defaultState, () => null]);

export function StateProvider({
  reducer,
  initialState,
  initializer,
  children,
}: {
  reducer: Reducer<InitialState, CartAction | UserAction>;
  initialState: InitialState;
  initializer: () => InitialState;
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, initialState, initializer);

  useEffect(() => {
    window.localStorage.setItem('localCart', JSON.stringify(state.cart));
  }, [state.cart]);

  const value: [InitialState, React.Dispatch<CartAction | UserAction>] =
    useMemo(() => [state, dispatch], [state]);
  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
}

export const useStateValue = () => useContext(StateContext);
