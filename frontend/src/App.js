import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <ChakraProvider>
      <div className="container">
        {/* Make the header bar always appears in every page */}
        <Header />
        {/* Render the page based on the routing specified */}
        <Outlet />
      </div>
    </ChakraProvider>
  );
}

export default App;
