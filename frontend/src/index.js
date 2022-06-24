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
import AddBusiness from "./pages/AddBusiness";
import DisplayBusinessParticular from "./pages/BusinessParticular/DisplayBusinessParticular";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="add_business" element={<AddBusiness />} />
            <Route path="landing" element={<Landing />} />
            <Route path="business" element={<DisplayBusinessParticular />} />

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
    </AuthProvider>
  </React.StrictMode>
);
