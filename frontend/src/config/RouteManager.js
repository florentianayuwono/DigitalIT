import App from "../App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Landing from "../pages/Landing";
import { AuthProvider } from "../features/auth/authContext";
import AddBusiness from "../pages/BusinessParticular/AddBusiness";
import DisplayBusinessParticular from "../pages/BusinessParticular/DisplayBusinessParticular";
import { BusinessProvider } from "../features/business/businessContext";

export default function RouteManager() {
  return (
    <AuthProvider>
      <BusinessProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Landing />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />

              <Route path="dashboard" element={<Dashboard />} />
              <Route
                path="business"
                element={<DisplayBusinessParticular />}
              ></Route>
              <Route path="business/add" element={<AddBusiness />} />

              {/* For routes that doesn't exist*/}
              <Route
                path="*"
                element={
                  <main style={{ padding: "1rem" }}>
                    <p>Ohnoes this place is empty</p>
                  </main>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </BusinessProvider>
    </AuthProvider>
  );
}
