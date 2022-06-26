import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import { AuthProvider } from "./features/auth/authContext";
import AddBusiness from "./pages/BusinessParticular/AddBusiness";
import DisplayBusinessParticular from "./pages/BusinessParticular/DisplayBusinessParticular";
import { BusinessProvider } from "./features/business/businessContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Fix this mess in next stage.
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BusinessProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />

              <Route path="dashboard" element={<Dashboard />} />
              <Route path="landing" element={<Landing />} />
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
  </React.StrictMode>
);
