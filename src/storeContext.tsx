import React, { createContext } from 'react';
import store from './store';

export const StoreContext = createContext(store);

export const StoreProvider: React.FC<React.PropsWithChildren> = ({ children }) => (
  <StoreContext.Provider value={store}>
    {children}
  </StoreContext.Provider>
);
