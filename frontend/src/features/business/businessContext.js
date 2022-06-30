import { createContext, useReducer, useContext } from "react";
import { initialBusinessState, businessReducer } from "./businessReducer";

export const BusinessContext = createContext();

/*
// No longer used. See comment on ./businessReducer.js
const combineDispatch = (...dispatches) => {
  return (action) => {
    dispatches.forEach((dispatch) => dispatch(action));
  };
};
*/
export const useBusinessContext = () => {
  return useContext(BusinessContext);
};

export const BusinessProvider = ({ children }) => {
  const [businesses, dispatch] = useReducer(
    businessReducer,
    initialBusinessState
  );

  return (
    <BusinessContext.Provider value={{ businesses, dispatch }}>
      {children}
    </BusinessContext.Provider>
  );
};
