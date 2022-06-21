import { useReducer, createContext } from "react";

const user = JSON.parse(localStorage("user"));

const initialAuth = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  message: "",
};

const authContext = createContext(initialAuth);

const authReducer = (state, action) => {
  switch (action.type) {
    case "login":
      return state;
    case "logout":
      return state;
    default:
      throw new Error("Unrecognized action");
  }
};

const AuthContextProvider = ({ children }) => {
  const [state, action] = useReducer(authReducer, initialAuth);

  return (
    <authContext.Provider value={{ state, action }}>
      {children}
    </authContext.Provider>
  );
};

export { authContext, AuthContextProvider };
