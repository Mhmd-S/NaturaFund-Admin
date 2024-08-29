import { useMemo, useReducer, createContext, useContext } from 'react';
import { initialState, contextReducer } from './reducer';
import contextActions from './actions';

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(contextReducer, initialState);
  const value = useMemo(() => [state, dispatch], [state]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within a AuthContextProvider');
  }
  const [state, dispatch] = context;
  const authContextAction = contextActions(dispatch);
  // const appContextSelector = contextSelectors(state);
  return { state, authContextAction };
}

export { AuthContextProvider, useAuthContext };