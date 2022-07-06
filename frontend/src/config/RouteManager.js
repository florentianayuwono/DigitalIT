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
import Products from "../pages/Product/Products";
import { ProductRoute } from "../features/product/productRoute";
import { DisplayIndividualBusiness } from "../pages/BusinessParticular/DisplayIndividualBusiness";
import AddProduct from "../pages/Product/AddProduct";

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
            <Route element={<ProductRoute />}>
              <Route path="business" element={<DisplayBusinessParticular />}>
                <Route path="add" element={<AddBusiness />} />
                <Route element={<DisplayIndividualBusiness />}>
                  <Route path=":business_id" element={<Products />}></Route>
                  <Route path="addProduct" element={<AddProduct />} />
                </Route>
              </Route>
            </Route>
          </Route>

          {/* For routes that doesn't exist*/}
          <Route path="*" element={<InvalidLink />} />
        </Route>
      </Route>
    </Routes>
  );
}
