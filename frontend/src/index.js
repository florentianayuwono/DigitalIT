import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { ContextProvider } from "./features/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="dashboard" element={<Dashboard />} />

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
    </ContextProvider>
  </React.StrictMode>
);
