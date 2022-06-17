import React, { Fragment, useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("input your email");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("empty status"); 

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const body = { "email": email, "password": password };
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      // For testing purposes
      const data = await response.json();
      setStatus(JSON.stringify(data));

      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center mt-5">(!!˃ᆺ˂) This is a funny login page (˃ᆺ˂)</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-success">Login</button>
      </form>
      <div>
        <h2>{status}</h2>
      </div>
    </Fragment>
  );
};

export default LoginForm;
