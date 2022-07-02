import { ProductProvider } from "./productContext";
import { Outlet } from "react-router-dom";

export const ProductRoute = () => {
  return (
    <ProductProvider>
      <Outlet />
    </ProductProvider>
  );
}