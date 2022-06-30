import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import RouteManager from "./config/RouteManager";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Fix this mess in next stage.
root.render(
  <React.StrictMode>
    <RouteManager />
  </React.StrictMode>
);
