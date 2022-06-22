import { AuthContext } from "../features/auth/authContext";
import { registerUser } from "../features/auth/authServices";
import { FaUser } from "react-icons/fa";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const { user, dispatch } = useContext(AuthContext);
  // Message to be shown (if there's error or something)
  const [message, setMessage] = useState("");
  const nav = useNavigate();

  // If already logged in, then go straight to dashboard
  useEffect(() => {
    if (user.user) {
      nav("/dashboard");
    }
  });

  const { name, email, password, phoneNumber } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const registrationData = {
      fullName: name,
      email,
      password,
      phoneNumber,
    };

    try {
      const response = await registerUser(dispatch, registrationData);
      if (!response || !response.user_id) return;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setMessage(user.message);

    return setMessage("");
  }, [user.message]);

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        
        {message === "" ? <p>Create an account</p> : message}
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              placeholder="enter your name"
              onChange={onChange}
            />
          </div>
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
            <input
              type="number"
              className="form-control"
              id="phoneNumber"
              name="phoneNumber"
              value={phoneNumber}
              placeholder="enter your phone number"
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
