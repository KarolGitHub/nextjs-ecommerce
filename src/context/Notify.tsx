import React, { createContext, useContext, useReducer } from 'react';

import reducers from '../store/Reducers';

const initialState: GlobalState = {
  notify: {},
};

const NotifyContext = createContext<
  { state: GlobalState; dispatch: Dispatch } | undefined
>(undefined);

function NotifyProvider({
  children,
}: React.ReactElement | React.ReactElement[] | any): JSX.Element {
  const [state, dispatch] = useReducer(reducers, initialState);
  const value = { state, dispatch };

  return (
    <NotifyContext.Provider value={value}>{children}</NotifyContext.Provider>
  );
}

function useNotify(): {
  state: GlobalState;
  dispatch: Dispatch;
} {
  const context = useContext(NotifyContext);
  if (context === undefined) {
    throw new Error('useNotify must be used within a NotifyProvider');
  }
  return context;
}

export { NotifyProvider, useNotify };
