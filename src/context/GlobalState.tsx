import React, { createContext, useContext, useEffect, useReducer } from 'react';

import reducers from '../store/Reducers';
import { getData } from '../utils/fetchData';

const initialState: GlobalState = {
  notify: {},
  cart: [],
};

const GlobalStateContext = createContext<
  { state: GlobalState; dispatch: Dispatch } | undefined
>(undefined);

function GlobalStateProvider({
  children,
}: React.ReactElement | React.ReactElement[] | any): JSX.Element {
  const [state, dispatch] = useReducer(reducers, initialState);
  const { cart } = state;

  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin');
    if (firstLogin) {
      getData('auth/accessToken').then((response) => {
        if (response.error) return localStorage.removeItem('firstLogin');

        dispatch({
          type: 'AUTH',
          payload: { token: response.accessToken, user: response.user },
        });
      });
    }
  }, []);

  useEffect(() => {
    const localStorageCart = JSON.parse(
      localStorage.getItem('nextjs-ecommerce-cart') || ''
    );

    if (localStorageCart)
      dispatch({ type: 'ADD_TO_CART', payload: localStorageCart });
  }, []);

  useEffect(() => {
    localStorage.setItem('nextjs-ecommerce-cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
}

function useGlobalState(): {
  state: GlobalState;
  dispatch: Dispatch;
} {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
}

export { GlobalStateProvider, useGlobalState };
