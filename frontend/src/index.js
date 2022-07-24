import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import RouteManager from "./config/RouteManager";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  /* Activate additional checks and warnings for components */
  <React.StrictMode>
    <ChakraProvider resetCSS={false}>
      {/* Keep UI in sync with the URL */}
      <BrowserRouter>
        <RouteManager />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
