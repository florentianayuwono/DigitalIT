import React, { Fragment } from "react";
import Header from "./components/Header";
import { Outlet, Link } from "react-router-dom";

function App() {
  return (
    <div className="container">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;