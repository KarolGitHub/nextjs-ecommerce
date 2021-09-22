import React, { createContext, useContext, useEffect, useReducer } from 'react';

import reducers from '../store/Reducers';
import { getData } from '../utils/fetchData';

const initialState: GlobalState = {
  notify: {},
  modal: {},
  cart: [],
  auth: { user: {}, token: '' },
  orders: [],
};

const GlobalStateContext = createContext<
  { state: GlobalState; dispatch: Dispatch } | undefined
>(undefined);

function GlobalStateProvider({
  children,
}: React.ReactElement | React.ReactElement[] | any): JSX.Element {
  const [state, dispatch] = useReducer(reducers, initialState);
  const { auth, cart } = state;

  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin');
    if (firstLogin) {
      getData('auth/accessToken').then((res) => {
        if (res.err) {
          localStorage.removeItem('firstLogin');
          return dispatch({
            type: 'NOTIFY',
            payload: { error: res.err },
          });
        }

        dispatch({
          type: 'AUTH',
          payload: { token: res.accessToken, user: res.user },
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

  useEffect(() => {
    if (auth.token) {
      getData('order', auth.token).then((res) => {
        if (res.err) {
          return dispatch({ type: 'NOTIFY', payload: { error: res.err } });
        }

        dispatch({ type: 'ADD_ORDERS', payload: res.orders });
      });
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.token]);

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
