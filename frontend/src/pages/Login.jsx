import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import { useAuthContext } from "../features/auth/authContext";
import { loginUser } from "../features/auth/authServices";

export default function Login(props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const { user, dispatch } = useAuthContext();
  const [message, setMessage] = useState("");

  const nav = useNavigate();

  useEffect(() => {
    if (user.user) {
      nav("/dashboard");
    }
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password,
    };

    try {
      const response = await loginUser(dispatch, loginData);
      if (!response || !response.user_id) return;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setMessage(user.message);

    return () => setMessage("");
  }, [user.message]);


  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>

        {message === "" ? <p>Login</p> : message}
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="enter your email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="enter your password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
