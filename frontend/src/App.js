import React from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

function App() {
  return (
      <div className="container">
        {/* Make the header bar always appears in every page */}
        <Header />
        {/* Render the page based on the routing specified */}
        <Outlet />
      </div>
  );
}

export default App;
