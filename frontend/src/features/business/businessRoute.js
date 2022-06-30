import { BusinessProvider } from "./businessContext";
import { Outlet } from "react-router-dom";

export const BusinessRoute = () => {
  return (
    <BusinessProvider>
      <Outlet />
    </BusinessProvider>
  );
}