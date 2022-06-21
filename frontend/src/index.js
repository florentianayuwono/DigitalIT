import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BroserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BroserRouter>
      <Route path="/" element={<App />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

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
    </BroserRouter>
    <App />
  </React.StrictMode>
);
