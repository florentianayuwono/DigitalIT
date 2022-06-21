import React, { Fragment } from "react";

// Components
import LoginForm from "./components/LoginForm";
import InputBusinessParticular from "./components/InputBusinessParticular";

function App() {
  return (
    <Fragment>
      <div className="container">
        <InputBusinessParticular></InputBusinessParticular>
        <LoginForm></LoginForm>
      </div>
    </Fragment>
  );
}

export default App;
