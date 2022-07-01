import App from "../App";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Landing from "../pages/Landing";
import AddBusiness from "../pages/BusinessParticular/AddBusiness";
import DisplayBusinessParticular from "../pages/BusinessParticular/DisplayBusinessParticular";
import { AuthRoute } from "../features/auth/authRoute";
import InvalidLink from "../components/InvalidLink";
import { BusinessRoute } from "../features/business/businessRoute";

export default function RouteManager() {
  return (
    <Routes>
      <Route element={<AuthRoute />}>
        <Route path="/" element={<App />}>
          <Route index element={<Landing />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          <Route path="dashboard" element={<Dashboard />} />

          <Route element={<BusinessRoute />}>
            <Route path="business" element={<DisplayBusinessParticular />} />
            <Route path="business/add" element={<AddBusiness />} />
          </Route>

          {/* For routes that doesn't exist*/}
          <Route path="*" element={InvalidLink} />
        </Route>
      </Route>
    </Routes>
  );
}
