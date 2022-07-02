/* The idea is to use this file as a component for routing so that
  every component that's routed under this empty component will be able 
  to access the authentication context provider.
  */
import { Outlet } from "react-router-dom";
import { AuthProvider } from "./authContext";

export const AuthRoute = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};
