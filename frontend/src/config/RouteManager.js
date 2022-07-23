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
import MainBusinessPage from "../pages/BusinessParticular/MainBusinessPage";
import RequireAuth from "../components/RequireAuth";
import MainStoreLayoutPage from "../pages/Store/MainStoreLayoutPage";
import DisplayStores from "../pages/Store/DisplayStores";
import DisplayIndividualStore from "../pages/Store/DisplayIndividualStore";
import InputProductSales from "../pages/Recommendation/InputProductSales";
import MainRecommendationPage from "../pages/Recommendation/MainRecommendationPage";
import MyRecommendations from "../pages/Recommendation/MyRecommendations";

export default function RouteManager() {
  return (
    <Routes>
      <Route element={<AuthRoute />}>
        <Route path="/" element={<App />}>
          <Route index element={<Landing />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          <Route element={<RequireAuth />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route element={<BusinessRoute />}>
              <Route element={<ProductRoute />}>
                <Route path="business" element={<MainBusinessPage />}>
                  <Route path="recommendation" element={<MainRecommendationPage />}>
                    <Route path="sales" element={<InputProductSales />} />
                    <Route path="my-recommendations" element={<MyRecommendations />} />
                  </Route>
                  <Route path="addProduct" element={<AddProduct />} />
                  <Route path="" element={<DisplayBusinessParticular />} />
                  <Route path="add" element={<AddBusiness />} />
                  <Route
                    path=":business_id"
                    element={<DisplayIndividualBusiness />}
                  >
                    <Route path="" element={<MainStoreLayoutPage />}>
                      <Route path="" element={<DisplayStores />} />
                      <Route
                        path=":store_id"
                        element={<DisplayIndividualStore />}
                      >
                        <Route path="" element={<Products />} />
                      </Route>
                    </Route>
                  </Route>
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
