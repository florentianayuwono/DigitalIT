import React, { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";

function App() {
  return (
    <div className="container">
      <h1>Main Page</h1>
      <nav 
        style={{
        borderBottom: "solid 1px",
        paddingBottom: "1rem"
        }}
      >
        <Link to="/login">Login</Link> | {" "}
        <Link to="/register">Register</Link> | {" "}
        <Link to="/dashboard">Dashboard</Link>
      </nav> 
      <Outlet />
    </div>
  );
}

export default App;