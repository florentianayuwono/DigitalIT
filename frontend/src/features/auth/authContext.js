import { createContext, useContext, useReducer } from "react";
import { initialAuthState, authReducer } from "./authReducer";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [user, dispatch] = useReducer(authReducer, initialAuthState);

  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
