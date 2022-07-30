import React from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="container">
      {/* Make the header bar always appears in every page */}
      <Header />
      {/* Render the page based on the routing specified */}
      <Outlet />
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
