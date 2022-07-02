import { createContext, useReducer, useContext } from "react";
import { initialProductState, productReducer } from "./productReducer";

export const ProductContext = createContext();

export const useProductContext = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const [products, dispatch] = useReducer(productReducer, initialProductState);

  return (
    <ProductContext.Provider value={{ products, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};